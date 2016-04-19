window.onload = function () {

	var canvas = document.getElementById("myCanvas");

	if(canvas.getContext){  

	    var ctx = canvas.getContext("2d");

		var img1 = new Image();
		img1.src = "canvas.bmp";

		img1.onload = function() {

			console.log('img1 ready');
			var img2 = new Image();
			img2.src = 'canvas2.bmp';

			img2.onload = function() {

				console.log('img2 ready');
				var flag = 1;
				var count = 1;

				setInterval(function() {
					console.log( count );
					count += 1;
					if ( flag === 1 ) {
						console.log('1');
						ctx.drawImage( img1, 10, 10 );
						flag = 2;
					}
					else {
						console.log('2');
						ctx.drawImage( img2, 10, 10 );
						flag = 1;
					}

				}, 50);
			};
		};
	}
}