var systemFunction = {
    // create
    create: function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    },
    // 基本的绑定Bind
    easyBind: function(obj, fn) {
        return function() {
            fn.apply(obj, arguments);
        }
    },
    // MDN实现的polyfill绑定
    bind: function(oThis) { // 实参还会有很多，oThis只是需要绑定的必须参数
        if (!Function.prototype.bind) {
            if (typeof this !== 'function') { // 这里的this是调用bind函数的那个对象
                throw new TypeError("Function.prototype.bind - what is tring" + "to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1) // 保存除需要绑定this之外的参数
                fnToBind = this,
                fnNOP = function() {}, // 临时中转函数，防止继承函数的prototye改变，被继承函数的prototye也被改变
                fnBound = function() {
                    return fnToBind.apply(
                        // 判断硬绑定函数是否是被new调用，如果是的话就会使用新创建的this替换赢绑定的this
                        (this instanceof fnNOP && oThis ? this : oThis), // new修改this的代码1
                        aArgs.concat(Array.prototype.slice(arguments))
                    );
                };
            fnNOP.prototype = this.prototype; // new修改this的代码2
            fnBound.prototype = new FnNOP();
            return fnBound;
        }
    },
    // softBind
    // 使用赢绑定之后就无法使用隐绑定或者显式绑定修改this的值，降低了灵活性
    softBind: function(obj) {
        var fn = this;
        var curried = [].slice().call(arguments, 1);
        var bound = function() {
            return fn.apply(
                // 如果this绑定到全局对象或者undefined，那就把指定的默认对象obj绑定到this，否则就不会修改this
                (!this || this === (window || global)) ? obj : this, 
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    }
};
// e.g
function foo(p1, p2) {
    this.val = p1 + p2:
}
var bar = foo.bind(null, 'p1');
var baz = new bar('p2');
baz.val; // p1p2