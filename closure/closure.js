/**
 * Created by xby on 16/2/12.
 */
'use strict';

for (var i = 0; i < 3; i++) {
	setTimeout(function () {
		alert(i)
	}, i * 1000);
}

/**
 * 利用IIFE
 */
for (var i = 0; i < 3; i++) {
	(function (j) {
		setTimeout(function timer() {
			alert(j)
		}, j * 1000);
	})(i);
}

/**
 * 利用let
 */
for (let i = 0; i < 3; i++) {
	setTimeout(function timer() {
		alert(i)
	}, i * 1000);
}
