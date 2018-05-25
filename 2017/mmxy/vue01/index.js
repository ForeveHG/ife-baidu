class Observer {
    constructor(data) {
        this.data = data;
        this.addObserver(this.data);
    }
    addObserver(data) {
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
                console.log("你设置了"+key)
                val = newval
            }
        })
    }
    on(key,handler){

    }
    $watch(key,callback){
        callback();
    }
}

window.Observer = Observer;