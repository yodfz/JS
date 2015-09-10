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
    var dbHelp              = {};

    if (!$db) {
        throw "浏览器不支持indexedDB!";
    }


    /**
     * 打开数据库链接
     * @param opt
     *              opt.name:数据库名
     *              opt.ver: 版本号
     */
    dbHelp = function(opt){
        if(typeof opt === "string"){
            var _name=opt;
            opt={};
            opt.name=_name;
            opt.ver=1;
        }

        var _db=Object.create(dbHelp.prototype);//$db.open(name);
        var tempDb=$db.open(opt.name,opt.ver);
        _db.dbName=opt.name;
        _db.isOpen=false;
        tempDb.onerror=function(event){
            throw "打开数据库失败!";
        };

        //异步打开的，让我好困惑。。。怎么办？？？
        //先将对象地址传递出去，等异步打开完成之后在对象上再挂接一个数据库对象
        tempDb.onsuccess=function(event){
            _db.dbResult=event.target.result;
            _db.isOpen=true;
        };
        return _db;
    };


    dbHelp.prototype={
        /**
         * 初始化表结构
         * @param callback
         */
        init:function(callback){
            if(this.isOpen){
                //初始化各种表结构
                this.dbResult.onupgradeneeded=function(event) {
                    callback(event.target.result);
                };
            }
            else{
                throw "数据库未打开!";
            }
        },
        _get:function(name,mode){
            return this.dbResult.transaction([name],(mode == 1 ? 'readwrite' : 'readonly')).objectStore(name);
        },
        /**
         * 获取一个数据
         * @param table 表名
         * @param where 获取条件
         */
        get:function(table,id,callback){
            var _table=this._get(table);
            _table.onsucess = function(event){
                callback(event.target.result);
            };
        },
        delete:function(){
            if(arguments.length==0){
                //删除数据库
                var _del=$db.deleteDatabase(this.dbName);
                _del.onsuccess=function(){
                    console.log("删除数据库[" + this.dbName + "]成功");
                }

                _del.onerror=function(event){
                    console.log(event);
                    console.log("删除数据库[" + this.dbName + "]失败");
                }
            }
        }
    };

    _.dbHelp=dbHelp;
}(window));
