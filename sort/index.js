// ---------- 一些排序算法
var Sort = {}
Sort.prototype = {
    // 利用sort进行排序  
    systemSort: function(array) {
        return array.sort(function(a, b) {
            return a - b;
        });
    },
    // 冒泡排序  
    bubbleSort: function(array) {
        var d;
        for (var i = 0, len = array.length; i < len; i++) {
            for (var j = 0; j < len; j++) {
                if (array[i] < array[j]) {
                    d = array[j];
                    array[j] = array[i];
                    array[i] = d;
                }
            }
        }
        return array;
    },
    // 快速排序  
    quickSort: function(arr) {
　　　　　if (arr.length <= 1) { 
            return arr; 
        }
　　　　 var pivotIndex = Math.floor(arr.length / 2);
　　　　 var pivot = arr.splice(pivotIndex, 1)[0];
　　　　 var left = [];
　　　　 var right = [];
　　　　 for (var i = 0; i < arr.length; i++){
　　　　    if (arr[i] < pivot) {
　　　　　　      left.push(arr[i]);
　　　　　　 } else {
　　　　　　      right.push(arr[i]);
　　　　　　 }
　　　　 }
　　　　 return quickSort(left).concat([pivot], quickSort(right));
    },
    // 插入排序  
    insertSort: function(array) {
        // http://baike.baidu.com/image/d57e99942da24e5dd21b7080  
        // http://baike.baidu.com/view/396887.htm  
        // var array = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7];  
        var i = 1,
            j, temp, key, len = array.length;
        for (; i < len; i++) {
            temp = j = i;
            key = array[j];
            while (--j > -1) {
                if (array[j] > key) {
                    array[j + 1] = array[j];
                } else {
                    break;
                }
            }
            array[j + 1] = key;
        }
        return array;
    }
}