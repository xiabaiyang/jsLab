/**
 * thunkify 多参数函数转单参数函数
 * author maybexia
 * date 2016.5.31
 */
var assert = require('assert');

module.exports = thunkify;

/**
 * @param {Function} fn
 * @return {Function} 
 * @api public
 */
function thunkify(fn) {
	assert('function' === typeof fn, 'function required');

	return function() {
		//这里就是将所有的参数放进了一个新的数组，这里之所以不用[].slice。是因为有人在bluebird docs发现，如果直接这样泄露arguments，v8的一些优化的编译会被搁置，就会有性能上的损失。
		var args = new Array(arguments.length);
		var ctx = this;

		for(var i = 0; i < args.length; ++i) {
			args[i] = arguments[i];
		}

		return function(done) {
			var called;

			args.push(function() {
				if (called) {
					return;
				}
				called = true;
				done.apply(null, arguments);
			})

			try {
				fn.apply(ctx, args);
			} catch (err) {
				done(err);
			}
		};
	};
}