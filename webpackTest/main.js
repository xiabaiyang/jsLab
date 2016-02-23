require('./module.js')();
// 多个loader的话，数据流向是从右向左的，也就是从style.css开始，依次经过css-loader和style-loader
require('style!css!./style.css'); 