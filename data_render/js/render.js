var CRender = (function(root,factory){
    return factory.call(root);
})(this,function(root){
    var __META__ = {
        init: function(data){  //初始化
            this.fetch(data);  //填充
            this.render();  //渲染
        },
        reset: function(data){  //重置
            this.fetch(data);  //填充
            this.render();  //渲染
        },
        fetch: function(data){  //填充数据到对应模块
            for(var module in __MODULE__){
                if(data[module]){
                    __MODULE__[module].data = data[module];
                    __MODULE__[module].lock = true;
                }
            }
        },
        render: function(){
            for(var module in __MODULE__){
                if(__MODULE__[module].lock){
                    __MODULE__[module].before && __MODULE__[module].before();
                    __MODULE__[module].render();
                    __MODULE__[module].after && __MODULE__[module].after();
                    __MODULE__[module].lock = false;
                }
            }
        }
    };
    var __MODULE__ = {
        "nav": {
            data: null,  //当前子模块的元数据
            view: $('#nav'),  //当前子模块的视图
            lock: false,  //当前子模块是否需要渲染
            before: function(){  //渲染前

            },
            render: function(){  //当前模块的渲染函数
                for(var prop in this.data){
                    this.view.find(".nav_"+prop).text(this.data[prop]);
                }
            },
            after: function(){  //渲染后

            }
        },
        "list": {
            data: null,
            view: $('#list'),
            lock: false,
            before: function(){

            },
            render: function(){
                var $row = '';
                for(var list in this.data){
                    $row += '<li>id:'+this.data[list].id+'/title:'+this.data[list].title+'/content:'+this.data[list].content+'</li>'
                }
                this.view.html($row);
            },
            after: function(){  //渲染后

            }
        }
    }
    return __META__;
})