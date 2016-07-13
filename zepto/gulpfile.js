var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('testLess', function() {
	gulp.src('src/less/style.less') // 该任务针对的文件
		.pipe(less()) // 该任务调用的模块
		.pipe(gulp.dest('dev/css')); // 自动在其dev/css目录下生成index.css
});

gulp.task('testHtml', function() {
	gulp.src('src/html/index.html')
		.pipe(gulp.dest('dev/html'));
});

gulp.task('testJs', function() {
	gulp.src('src/js/*')
		.pipe(gulp.dest('dev/js'));
});

gulp.task('default', ['testLess', 'testHtml', 'testJs']);