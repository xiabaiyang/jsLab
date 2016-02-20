(function(namespace) {
    "use strict";

    /**
     * Observer Subject
     * @constructor
     */
    var ObserverSubject = function() {

        this._map = Object.create(null);

        /*
        * The Object.freeze() method freezes an object: 
        * 它就是，防止添加新属性、防止已有属性被移除以及存在属性的enumerability, configurability, or writability被修改。
        * 本质就是这个对象被不可修改的创建出来。该方法返回这个被冻结的对象.
        */
        Object.freeze(this);
    };

    ObserverSubject.prototype = Object.freeze({

        // 发布一个订阅
        notify: function(aTopic, aData) {
            if (!aTopic) {
                throw new Error("Not specified any topic.");
            }

            var list = this._map[aTopic];
            if (!list) {
                return;
            }

            // Create a static observer list.
            // `remove()` does not change this list.
            var staticList = list.concat();
            for (var i = 0, l = staticList.length; i < l; ++i) {
                staticList[i].handleMessage(aTopic, aData);
            }
        },

        // 注册一个订阅
        add: function(aTopic, aObserver) {
            if (!aTopic || !aObserver) {
                throw new Error("Aruguments are not passed fully.");
            }

            // We accept that `aObserver` inherits `handleMessage` from its ancestor.
            if (!("handleMessage" in aObserver) || typeof aObserver.handleMessage !== "function") {
                throw new Error("Not implement observer interface.");
            }

            var list = this._map[aTopic];
            if (!list) {
                list = [];
            }

            // check whether it has been regisetered
            var index = list.indexOf(aObserver);
            var isInList = index !== -1;
            if (isInList) {
                return;
            }

            list.push(aObserver);
            this._map[aTopic] = list;
        },

        // 删除一个订阅
        remove: function(aTopic, aObserver) {
            if (!aTopic || !aObserver) {
                throw new Error("Arguments are not passed fully.");
            }

            // We don't have to check `aObserver` implements `handleMessage` method
            // at this. Even if `aObserver` does not implement it, this method will
            // answer that `aObserver` is not registered to this subject.
            var list = this._map[aTopic];
            if (!list) {
                return;
            }

            var index = list.indexOf(aObserver);
            if (index === -1) {
                return;
            }

            list.splice(index, 1);

            // if the list doesn't have any object,
            // this remove the message id related to it.
            if (list.length === 0) {
                delete this._map[aTopic];
            }
        },

        // 移除一个topic
        _removeTopic: function(aTopic) {
            var list = this._map[aTopic];
            for (var i = 0, l = list.length; i < l; ++i) {
                list[i] = null;
            }

            delete this._map[aTopic];
        },

        // 销毁一个ObserverSubject
        destroy: function() {
            var map = this._map;
            for (var topic in map) {
                this._removeTopic(topic);
            }

            Object.freeze(this._map);
        }

    });

    // export
    if (typeof module !== "undefined" && !!module.exports) {
        module.exports = ObserverSubject;
    } else {
        namespace.ObserverSubject = ObserverSubject;
    }

})(this);