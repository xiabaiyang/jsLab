var slice = Array.prototype.slice;

// 这里写的这么古怪就只是想在es6的模块引入时更加舒服一些:http://www.jianshu.com/p/e9640b41c4cd
module.exports = co['default'] = co.co = co;

// 这是一个独立的方法，就是将传入的函数包装成了co执行前的形式
co.wrap = function(fn) {
    createPromise.__generatorFunction__ = fn;
    return createPromise;

    function createPromise() {
        // 返回的方法调用就会直接执行co。
        return co.call(this, fn.apply(this, arguments));
    }
};

function co(gen) {
    var ctx = this;
    var args = slice.call(arguments, 1)

    // 将所有的东西放到一个promise里面，来防止引起内存泄露错误的promise chaining
    // https://github.com/tj/co/issues/180
    // https://github.com/promises-aplus/promises-spec/issues/179
    return new Promise(function(resolve, reject) {
        if (typeof gen === 'function') gen = gen.apply(ctx, args);
        if (!gen || typeof gen.next !== 'function') return resolve(gen);

        onFulfilled();

        function onFulfilled(res) {
            var ret;
            try {
                ret = gen.next(res);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        // 这里在promise错误的时候，就会尝试向外throw err。
        // Genertor的属性，可以内部抛出，外部不活。
        // 如果我们对这个yield进行了try catch，就会被捕获，不处理的话，就会reject出去，在co的catch语句中co(*fn).catch处理。
        function onRejected(err) {
            var ret;
            try {
                ret = gen.throw(err);
            } catch (e) {
                return reject(e);
            }
            next(ret);
        }

        function next(ret) {
            if (ret.done) return resolve(ret.value);
            var value = toPromise.call(ctx, ret.value);
            // 如果成功转化为了promise，就在这个promise执行完了再调用onFulfilled方法
            if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
            return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, ' + 'but the following object was passed: "' + String(ret.value) + '"'));
        }
    });
}

// 将yield后面的东西转化成一个promise
function toPromise(obj) {
    if (!obj) return obj;

    if (isPromise(obj)) return obj;

    // 判断传入的是不是generator，或者generator function，是的话，继续调用co函数进行循环
    if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);

    if ('function' == typeof obj) return thunkToPromise.call(this, obj);

    if (Array.isArray(obj)) return arrayToPromise.call(this, obj);

    if (isObject(obj)) return objectToPromise.call(this, obj);

    return obj;
}

// 将thunk转化成了promise，thunk就是调用的时候传入一个error和res的function，在最外面包了个promise就行了
function thunkToPromise(fn) {
    var ctx = this;
    return new Promise(function(resolve, reject) {
        fn.call(ctx, function(err, res) {
            if (err) return reject(err);
            if (arguments.length > 2) res = slice.call(arguments, 1);
            resolve(res);
        });
    });
}

function arrayToPromise(obj) {
    return Promise.all(obj.map(toPromise, this));
}

function objectToPromise(obj) {
    var results = new obj.constructor();
    var keys = Object.keys(obj);
    var promises = [];
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var promise = toPromise.call(this, obj[key]);
        if (promise && isPromise(promise)) defer(promise, key);
        else results[key] = obj[key];
    }
    return Promise.all(promises).then(function() {
        return results;
    });

    function defer(promise, key) {
        // predefine the key in the result
        results[key] = undefined;
        promises.push(promise.then(function(res) {
            results[key] = res;
        }));
    }
}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function isGenerator(obj) {
    return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

function isGeneratorFunction(obj) {
    var constructor = obj.constructor;
    //这里是为了解决没有constructor的对象，比如Object.create(null)
    if (!constructor) return false;
    //这里两种情况会返回true，一种是名字正确地，一种是他的prototype是generator
    if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

function isObject(val) {
    return Object == val.constructor;
}
