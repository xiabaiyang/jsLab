/**
 * Created by xby on 16/2/11.
 */

/**
 * 函数提升在变量提升之前
 */
(function() {
	foo(); // 执行foo函数

	var foo;

	function foo() {
		alert('虽然变量申明在函数申明之前，但它是重复的申明，被忽略。因此函数申明会被提升到普通变量之前。');
	}

	foo = function() {
		alert('变量定义执行');
	};
})();

/**
 * 尽管重复的var申明会被忽略到，但出现在后面的函数申明还是会覆盖之前的
 */
(function() {
	foo(); // 执行foo函数

	function foo() {
		alert('函数定义执行');
	}

	var foo = function() {
		alert('变量定义执行');
	};

	function foo() {
		alert('尽管重复的var申明会被忽略到，但出现在后面的函数申明还是会覆盖之前的。');
	}
})();

/**
 * 一个普通块内部的函数申明会被提升到所在作用域的顶部，这个不过不会被条件判断所控制
 */
(function() {
	foo(); // 执行foo函数

	var a = true;

	if(a) {
		function foo() {
			alert('条件为真时');
		}
	}else {
		function foo() {
			alert('条件为假时。一个普通块内部的函数申明会被提升到所在作用域的顶部，这个不过不会被条件判断所控制');
		}
	}
})();