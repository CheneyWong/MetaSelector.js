(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.MetaSelector = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/**
 * 属性匹配检查
 * @param rule
 * @param attrs
 * return true/false
 */
function match( rule , attrs) {
    // rule 必须是字符串
    if( ! _isString( rule ) ) {
        throw 'rule 必须是字符串, rule=' + rule
    }

    // attrs 支持单层 map 或者 url
    if ( _isString( attrs ) ) {
        attrs = _getUrlParams( attrs )
    }

    // 将 rule 按照 , 切开, 逻辑或
    let selectors = rule.split(",")
    for ( let selector of selectors ) {
        let item = selector.trim()
        // 正则提取 attr opt value
        let re = /^\[((?<attr1>\/.+\/)|(?<attr2>".+")|(?<attr3>'.+')|(?<attr4>[^\-\*\|\^\$\!=]+)?)((?<opt>[\-\*\|\^\$\!]?=)((?<value1>\/.+\/)|(?<value2>".+")|(?<value3>'.+')|(?<value4>.+)))?]$/
        let m = item.match( re );
        if ( !m || !m.groups ) {
            console.error( "规则解析失败", m.groups )
            return false
        }

        let { attr1, attr2, attr3, attr4, opt, value1, value2, value3, value4 } = m.groups
        let attr = _toTypedValue( attr1, attr2 || attr3, attr4 )
        let value = _toTypedValue( value1, value2 || value3, value4 )

        // 属性是正则，要对所有属性进行遍历
        if ( _isRegExp( attr ) ) {
            if ( "undefined" === value ) {
                // undefined 特殊处理
                // 期望所有匹配的属性都不存在，有任何一个属性存在都算不匹配。
                // 全部都是 false ，return true
                // 任何一个 true ， return false
                for ( let k in attrs ) {
                    let v = attrs[k]
                    if( attr.test( k ) &&                           // key 匹配
                        _match(undefined, opt, v)  // v 有值
                    ){                                              // ||
                        return false                                // 逻辑不匹配
                    }
                }
                return true
            } else {
                // 任何一个 true ， return true
                for ( let k in attrs ) {
                    let v = attr[k]
                    if( _match( opt, value, v ) ){
                        return true
                    }
                }
                return false
            }
        } else {
            // 属性是值
            let v = attrs[ attr ]
            if( _match( opt, value, v ) ){
                return true
            }
            return false
        }
    }
    return false
}


/**
 *
 * @param rule
 * @param objs 要求是数组,内部的元素要求需要 id 属性
 * @param pick
 * return 被选中的对象数组
 */
function select( rule , objs , pick ) {
    let array = []

    // objs 要求是数组
    if ( _isArray( objs ) ) {
        throw 'objs 要求是数组, objs=' + objs
    }

    for ( let obj of objs ) {
        // TODO rule 每次都会被解析一遍，能不能优化。
        let ret  = match( rule, obj )
        if ( ret ) {
            // 默认返回 id, 如果有 pick 则返回 pick 的执行结果。
            if ( pick && _isFunction( pick )) {
                array.push(  pick( obj ) )
            } else {
                array.push( obj.id )
            }
        }
    }
    return array;
}


/**
 *
 * @param opt 操作符
 * @param value 值表达式
 * @param v 当前值
 * @returns {boolean}
 * @private
 */
function _match(opt, value, v){

    switch ( opt ) {
        case undefined : {
            // 没有操作符，也没有 value, 只要 v 存在就行
            return "undefined" !== v && undefined !== v
        }
        case "=" : {
            if ( value === "undefined" ) {
                return "undefined" === v || undefined === v
            }
            else if ( _isRegExp( value ) ) {
                return value.test( v )
            }
            else {
                return value === v
            }
        }
        case "!=" : {
            if ( value === "undefined" ) {
                return "undefined" !== v && undefined !== v
            }
            else {
                return value !== v
            }
        }
        case "*=" : {
            return v.indexOf(value) >= 0
        }
        case "|=" : {
            if ( undefined === value || "" === value.toString().trim()) return false
            if ( undefined === v || "" === v.trim()) return false
            return v.toString().split(",").indexOf( value ) >= 0;
        }
        case "-=" : {
            return new RegExp( "^" + value + "\\W", "mg").test( v );
        }
        case "^=" : {
            return new RegExp( "^" + value, "mg").test( v );
        }
        case "$=" : {
            return new RegExp( value + "$", "mg").test( v );
        }
    }
    return false;
}

function _toTypedValue(value1, value23, value4){
    if ( value4 ) {
        return value4
    }
    if ( value23 ) {
        return value23.substr(1, value23.length -2 )
    }
    if ( value1 ) {
        return new RegExp(value1.substr(1, value1.length -2 ), "mg");
    }
}


function _isRegExp(value) {
    return Object.prototype.toString.call(value) === '[object RegExp]'
}

function _isArray(value) {
    return Object.prototype.toString.call(objs) !== '[object Array]'
}

function _isString(value) {
    return typeof(value) === 'string'
}

function _isFunction(value) {
    return typeof value === "function"
}

function _getUrlParams(url){
    let params = url.split("#")[0].split("?")[1].split("&")
    let obj = {}
    params.map(function (item){
        obj[ decodeURIComponent( item.split("=")[0]) ] = decodeURIComponent(item.split("=")[1])
    })
    return obj
}





module.exports = {
    match , select
}

},{}]},{},[1])(1)
});
