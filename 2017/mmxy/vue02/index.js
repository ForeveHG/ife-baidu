let watchers = {};
class Observer {
    constructor(data) {
        this.data = data;
        this.walk (this.data);
    }
    walk (data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                var val = data[key]
                if (typeof val == 'object') {
                    new Observer(val)
                }
                this.changeObj(key,val)
            }
        }
    }
    changeObj(key,val){
        var self = this;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                console.log("你访问了" + key, val)
                return val
            },
            set: function (newval) {
                if(newval == val) return
                //属性变化时执行回调函数(触发事件)
                if(watchers[key]) watchers[key]();
                //如果设置新的值是一个对象，继续添加get set响应
                if(typeof newval == 'object') new Observer(newval)
                val = newval
                console.log("你设置了"+key)
            }
        })
    }
    $watch(key,callback){
        watchers[key] = callback;
    }
}

window.Observer = Observer;
