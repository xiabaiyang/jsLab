var AjaxService = function() {
    var xmlhttprequest;
    if (window.XMLHttpRequest) {
        xmlhttprequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xmlhttprequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //用户发送请求的方法  
    AjaxService.prototype.send = function(method, url, data, callback, failback) {
        if (this.xmlhttprequest !== = undefined && this.xmlhttprequest !== = null) {
            method = method.toUpperCase();
            if (method !== = "GET" && method !== = "POST") {
                alert("请求方法必须需为GET或POST");
                return;
            }
            if (url === null || url === undefined) {
                alert("HTTP的请求地址必须设置！");
                return;
            }
            var tempxmlhttp = this.xmlhttprequest;
            this.xmlhttprequest.onreadystatechange = function() {
                if (tempxmlhttp.readyState === 4) {
                    if (temxmlhttp.status === 200) {
                        var responseText = temxmlhttp.responseText;
                        var responseXML = temxmlhttp.reponseXML;
                        if (callback === undefined || callback === null) {
                            alert("没有设置处理数据正确返回的方法");
                            alert("返回的数据：" + responseText);
                        } else {
                            callback(responseText, responseXML);
                        }
                    } else {
                        if (failback === undefined || failback === null) {
                            alert("没有设置处理数据返回失败的处理方法！");
                            alert("HTTP的响应码：" + tempxmlhttp.status + ",响应码的文本信息：" + tempxmlhttp.statusText);
                        } else {
                            failback(tempxmlhttp.status, tempxmlhttp.statusText);
                        }
                    }
                }
            }
            this.xmlhttprequest.open(method, url, true);
            //如果是POST方式，需要设置请求头  
            if (method === "POST") {
                this.xmlhttprequest.setRequestHeader("Content-type", "application/x-www-four-urlencoded");
            }
            this.xmlhttprequest.send(data);
        } else {
            alert("XMLHttpRequest对象创建失败，无法发送数据！");
        }
        AjaxService.prototype.abort = function() {
            this.xmlhttprequest.abort();
        }
    }
}