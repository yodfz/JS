/**
 * Created by Administrator on 2015/9/10.
 * description:对于indexedDB的操作
 *
 * 参考资料:
 * https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB
 * https://github.com/aaronpowell/db.js/blob/master/tests/specs/indexes.js#L15
 * https://github.com/Yixi/chrome-note-app/blob/master/app%2Flibs%2FDB.js
 */

;
(function(_){

    var $db                 = _.indexedDB || _.mozIndexedDB || _.webkitIndexedDB || _.msIndexedDB;
    var $dbIDBTransaction   = _.IDBTransaction || _.webkitIDBTransaction || _.msIDBTransaction;
    var $dbIDBKeyRange      = _.IDBKeyRange || _.webkitIDBKeyRange || _.msIDBKeyRange;
    var $dbHelp              = {};

    if (!$db) {
        throw "浏览器不支持indexedDB!";
    }


    /**
     * 打开数据库链接
     * @param opt
     *              opt.name:数据库名
     *              opt.ver: 版本号
     */
    $dbHelp = function(opt){
        if(typeof opt === "string"){
            var _name=opt;
            opt={};
            opt.name=_name;
            opt.ver=1;
        }

        var _db=Object.create($dbHelp.prototype);//$db.open(name);
        _db.dbName=opt.name;
        _db.dbVer=opt.ver;
        _db.isOpen=false;

        return _db;
    };


    $dbHelp.prototype={
        /**
         * 私有方法 获取表
         * @param name 表名
         * @param mode 模式 1 读写 0只读
         * @returns 返回一个表对象
         * @private
         */
        _get:function(name,mode){
            return this.dbResult.transaction([name],(mode == 1 ? 'readwrite' : 'readonly')).objectStore(name);
        },



        /**
         * 初始化数据库
         * @param callback
         */
        init:function(_){
            var isOpen=arguments.length==0;
            !isOpen&&this.delete();
            var _tempDb=$db.open(this.dbName,this.dbVer);
            _tempDb.onerror = function(event){
                throw "打开数据库失败!";
            };

            if(!isOpen){
                //初始化各种表结构
                _tempDb.onupgradeneeded = function(event) {
                    var _$db=event.target.result;
                    switch(_.constructor){
                        case Function:{
                            _(_$db);
                        }break;
                        case Object:{
                            for(var i= 0,item;item=_[i++];){

                                var _key=item.key.other;
                                _key.keyPath=item.key.name;
                                var _obj=_$db.createObjectStore(item.name,_key);

                                for(var k= 0,field;field=item.field[k++];){
                                    _obj.createIndex(field.name,field.name,field.other);
                                }
                            }
                        }break;
                        default:{
                            throw "不支持的初始化!";
                        }break;
                    }
                };
            }


            //先将对象地址传递出去，等异步打开完成之后在对象上再挂接一个数据库对象
            _tempDb.onsuccess = function(event){
                this.dbResult=event.target.result;
                this.isOpen=true;
            };
        },
        /**
         * 打开数据库
         */
        open:function(){
            this.init();
        },

        /**
         * 获取一个数据
         * @param table 表名
         * @param id 获取条件 ID
         * @param callback 回调函数
         */
        get:function(table,id,callback){
            var _table=this._get(table,0).get(id);
            _table.onsuccess = function(event){
                //TODO 根据ID获取对象
                callback(event.target.result);
            };
        },
        /**
         * 获取表所有数据
         * @param table     表名
         * @param callback  回调
         */
        getAll:function(table,callback){

        },
        /**
         * 获取表数据 分页模式
         * @param table         表名
         * @param pageIndex     当前页码 1开始
         * @param pageSize      每页大小
         * @param callback      回调
         */
        getPage:function(table,pageIndex,pageSize,callback){

        },
        set:function(table,obj,callback){

        },
        setRange:function(table,objs,callback){

        },
        delete:function(){
            var _type=typeof arguments[0] === "function";
            if(arguments.length==0||_type){
                //删除数据库
                var _del=$db.deleteDatabase(this.dbName);
                var _dbName=this.dbName;
                _del.onsuccess=function(){
                    console.log("删除数据库[" + _dbName + "]成功");
                    _type&&argumenst[0]();
                }

                _del.onerror=function(event){
                    console.log(event);
                    console.log("删除数据库[" + _dbName + "]失败");
                }
            }
            else{
                //查看是删一条，还是根据条件删
                //如果为table,string 删一条
                //如果为table,object 根据条件删除
            }
        }
    };

    _.dbHelp=$dbHelp;
}(window));
