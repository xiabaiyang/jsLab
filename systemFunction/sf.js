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
            var aArgs = [].slice.call(arguments, 1) // 保存除需要绑定this之外的参数
            var fnToBind = this,
                var fnNOP = function() {}, // 临时中转函数，防止继承函数的prototye改变，被继承函数的prototye也被改变
                    var fnBound = function() {
                        return fnToBind.apply(
                            // 判断硬绑定函数是否是被new调用，如果是的话就会使用新创建的this替换赢绑定的this
                            (this instanceof fnNOP && oThis ? this : oThis), // new修改this的代码1
                            aArgs.concat([].slice.call(arguments)));
                    };
            // fnNOP.prototype = this.prototype; // new修改this的代码2
            // fnBound.prototype = new FnNOP();
            fnBound.prototype = Object.create(fnToBind.prototype);
            return fnBound;
        }
    },
    // softBind
    // 使用赢绑定之后就无法使用隐绑定或者显式绑定修改this的值，降低了灵活性
    softBind: function(obj) {
        if (typeof this !== 'function') {
            throw new TypeError("Function.prototype.bind - what is tring" + "to be bound is not callable");
        }
        var curried = [].slice().call(arguments, 1);
        var fnToBound = this;
        var bound = function() {
            return fnToBound.apply(
                // 如果this绑定到全局对象或者undefined，那就把指定的默认对象obj绑定到this，否则就不会修改this
                (!this || this === (window || global)) ? obj : this, curried.concat([].slice().call(arguments)));
        };
        bound.prototype = Object.create(fnToBound.prototype);
        return bound;
    },
    // 数组去重
    unique: function(array) {
        var l = array.length;
        if (l === 1) {
            return array;
        } else {
            var temp = array.slice(0, 1);
            array.forEach(function(item, index) {
                var flag = false;
                for (var i = 0, len = temp.length; i < len; i++) {
                    if (item === temp[i]) {
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    temp.push(item);
                }
            });
            return temp;
        }
    },
    // 采取hashTable的方式
    quickUnique: function(array) {
        var hash = {},
            len = array.length,
            result = [];
        for (var i = 0; i < len; i++) {
            if (!hash[array[i]]) {
                hash[array[i]] = true;
                result.push(array[i]);
            }
        }
        return result;
    },
    /**
     * [trim 去除字符串前后的空格]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    trim: function(str) {
        if(str && typeof str === "string") {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    },
    /**
     * [clone 支持 Number、String、Object、Array、Boolean类型的克隆]
     * @param  {[type]} obj [description]
     * @return {[type]}     [description]
     */
    function clone(obj) {
        var o;
        switch (typeof obj) {
            case "undefined":
                break;
            case "string":
                o = obj + "";
                break;
            case "number":
                o = obj - 0;
                break;
            case "boolean":
                o = obj;
                break;
            case "object": // object 分为两种情况 对象（Object）或数组（Array）
                if (obj === null) {
                    o = null;
                } else {
                    if (Object.prototype.toString.call(obj).slice(8, -1) === "Array") { // [object Array]
                        o = [];
                        for (var i = 0; i < obj.length; i++) {
                            o.push(clone(obj[i]));
                        }
                    } else {
                        o = {};
                        for (var k in obj) {
                            o[k] = clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;
                break;
        }
        return o;
    },
    /**
     * [calculateMostCharCount 计算一个字符串中出现次数最多的字符数]
     * @param  {[type]} str [description]
     * @return {[type]}     [description]
     */
    calculateMostCharCount: function(str) {
        var obj = {};
        for(var i = 0; i < str.length; i++){
            var v = str.charAt(i);
            if(obj[v] && obj[v].value == v){
                obj[v].count = ++ obj[v].count;
            }else{
                obj[v] = {};
                obj[v].count = 1;
                obj[v].value = v;
            }
        }
        for(key in obj){
            console.log(obj[key].value + '=' + obj[key].count + ' '); // a=4  b=3  c=4  d=2  f=1  g=1  h=1
        }
    }

























};