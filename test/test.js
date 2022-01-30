const {expect, assert} = require('chai');
const Selector = require('../dist/index')
const {stringify} = require("mocha/lib/utils");


describe('match 正向测试 包含某个属性 1',function(){
    it('Selector 1-1 包含某个属性',function(){

        assert( Selector.match("[test]", { test : "test" }) )

    });

    it('Selector 1-2 包含某个属性',function(){

        assert( Selector.match("['test']", { test : "test" }) )

    });

    it('Selector 1-3 包含某个属性',function(){

        assert( Selector.match("[\"test\"]", { test : "test" }) )

    });

    it('Selector 1-4 包含某个属性',function(){

        assert( Selector.match("[/test/]", { test : "test" }) )

    });

});



describe('match 异常测试 包含某个属性 2',function(){
    it('Selector 2-1 包含某个属性',function(){

        assert( ! Selector.match("[test]", { testx : "test" }) )

    });

    it('Selector 2-2 包含某个属性',function(){

        assert( ! Selector.match("['test']", { testx : "test" }) )

    });

    it('Selector 2-3 包含某个属性',function(){

        assert( ! Selector.match("[\"test\"]", { testx : "test" }) )

    });

    it('Selector 2-4 包含某个属性',function(){

        assert( ! Selector.match("[/test/]", { testx : "test" }) )

    });

});



describe('match 异常测试 不包含某个属性 3',function(){
    it('Selector 3-1 不包含某个属性',function(){

        assert( Selector.match("[test=undefined]", { testx : "test" }) )

    });

    it('Selector 3-2 不包含某个属性',function(){

        assert( Selector.match("['test'=undefined]", { testx : "test" }) )

    });

    it('Selector 3-3 不包含某个属性',function(){

        assert( Selector.match("[\"test\"=undefined]", { testx : "test" }) )

    });

    it('Selector 3-4 不包含某个属性',function(){

        assert( Selector.match("[/test/=undefined]", {}) )

    });

});

describe('match 异常测试 不包含某个属性 4',function(){
    it('Selector 4-1 不包含某个属性',function(){

        assert( ! Selector.match("[test=undefined]", { test : "test" }) )

    });

    it('Selector 4-2 不包含某个属性',function(){

        assert( ! Selector.match("['test=undefined']", { test : "test" }) )

    });

    it('Selector 4-3 不包含某个属性',function(){

        assert( ! Selector.match("[\"test\"=undefined]", { test : "test" }) )

    });

    it('Selector 4-4 不包含某个属性',function(){

        assert( ! Selector.match("[/test/=undefined]", { test : "test" }) )

    });

});


describe('match 匹配 5',function(){
    it('Selector 5-1 *=',function(){

        assert( Selector.match("[test*=t]", { test : "test" }) )

    });

    it('Selector 5-2 *=',function(){

        assert( ! Selector.match("[test*=a]", { test : "test" }) )

    });

    it('Selector 5-3 -=',function(){

        assert( Selector.match("[test-=t]", { test : "t-test" }) )

    });

    it('Selector 5-4 -=',function(){

        assert( ! Selector.match("[test-=t]", { test : "test" }) )

    });

    it('Selector 5-5 ^=',function(){

        assert( Selector.match("[test^=t]", { test : "test" }) )

    });

    it('Selector 5-6 ^=',function(){

        assert( ! Selector.match("[test^=a]", { test : "test" }) )

    });

    it('Selector 5-7 $=',function(){

        assert( Selector.match("[test$=t]", { test : "test" }) )

    });

    it('Selector 5-8 $=',function(){

        assert( ! Selector.match("[test$=a]", { test : "test" }) )

    });

    it('Selector 5-9 $=',function(){

        assert( ! Selector.match("[test$=t]", { testx : "test" }) )

    });

    it('Selector 5-10 $=',function(){

        assert( ! Selector.match("[test$=a]", { test : "test" }) )

    });

    it('Selector 5-11 !=',function(){

        assert( Selector.match("[test!=t]", { test : "test" }) )

    });

    it('Selector 5-12 !=',function(){

        assert( Selector.match("[test!=test]", { testx : "test" }) )

    });

    it('Selector 5-13 !=',function(){

        assert( ! Selector.match("[test!=test]", { test : "test" }) )

    });

});



describe('match 匹配 6',function(){
    it('Selector 6-1 |=',function(){

        assert( Selector.match("[test|=vue]", { test : "test,vue,xxx" }) )

    });

    it('Selector 6-2 |=',function(){

        assert( Selector.match("[test|=vue]", { test : "vue,xxx" }) )

    });

    it('Selector 6-3 |=',function(){

        assert( Selector.match("[test|=vue]", { test : "xxx,vue" }) )

    });

    it('Selector 6-4 |=',function(){

        assert( Selector.match("[test|=vue]", { test : "vue" }) )

    });

    it('Selector 6-5 |=',function(){

        assert( ! Selector.match("[test|=vue]", { test : "vue-1" }) )

    });

    it('Selector 6-6 |=',function(){

        assert( ! Selector.match("[test|=vue]", { test : "eee,vue-1" }) )

    });


    it('Selector 6-7 |=',function(){

        assert( ! Selector.match("[test|=vue]", { test : "" }) )

    });

    it('Selector 6-7 |=',function(){

        assert( ! Selector.match("[test|=vue]", {  }) )

    });
});
