/**
 * Created by Administrator on 2015/9/10.
 * description:对于indexedDB的操作
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
     * @param name  数据库名
     */
    dbHelp = function(name){
        var _db=$db.open(name);
        var tempDB;

        _db.onerror=function(event){
            throw "打开数据库失败!";
        };

        //异步打开的，让我好困惑。。。怎么办？？？
        _db.onsuccess=function(){
            tempDB=_db.result;
            tempDB.prototype=Object.create(dbHelp.prototype);
        };
        return tempDB;
    };


    dbHelp.prototype={
        /**
         * 获取一个数据
         * @param table 表名
         * @param where 获取条件
         */
        get:function(table,where){

        },

        getTable:function(table){

        }
    };

    _.dbHelp=dbHelp;
}(window));
