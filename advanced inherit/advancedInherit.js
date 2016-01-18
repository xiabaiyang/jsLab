/**
 * Created by xby on 16/1/15.
 */
(function() {
	var initializing = false,
		superPattern =
		/xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;

	this.Class = function() {}; // 全局的Class

	Class.extend = function(properties) {
		var _super = this.prototype; // （继承自的对象的）原型--->父类

		initializing = true;
		var prototype = new this(); // 继承自的对象--->子类
		initializing = false;

		for (var name in properties) {
			prototype[name] = typeof properties[name] === 'function' &&
				typeof _super[name] === 'function' &&
				superPattern.test(properties[name]) ?
				(function(name, fn) { // 定义一个重载函数
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);

						this._super = tmp;

						return ret;
					}
				})(name, properties[name]) :
				properties[name];
		}

		/**
		 * 创建一个仿真的类构造器
		 * @returns {Class}
		 * @constructor
		 */
		function Class() {
			// 所有的构造器会在初始化方法里完成
			if (!initializing && this.init) {
				this.init.apply(this, arguments);
			}
		}

		Class.prototype = prototype; // 设置类的原型

		Class.constructor = Class; // 调整构造器的引用

		Class.extend = arguments.callee; // 让类继续可扩展

		return Class;
	};
})();

// 原始的继承方式
//function Person() {}
//function Ninja() {}
//Ninja.prototype = new Person();

// 高级的继承方式
var Person = Class.extend({
	init: function(isSleep) {
		this.isSleep = isSleep;
	},
	sleep: function() {
		return this.isSleep;
	}
});

var Ninja = Person.extend({
	init: function() {
		this._super(false);
	},
	swingSword: function() {
		return true;
	}
});

var p = new Person(false);
alert('人可以舞剑吗？' + p.sleep());

var n = new Ninja();
alert('忍者可以舞剑吗？' + n.swingSword());