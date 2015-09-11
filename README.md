# JS
>此库主要存放我写的一些JS类库


##db.js
>用于操作浏览器数据库 indexedDB

###如何创建数据库
```js
 var nowDb=dbHelp("myDB");
 //方法一 通过JSON建立
 var collection=[];
     collection.push(
             {
                 name:"message",
                 key:{name:"id",other:{autoIncrement:true}},
                 field:[
                     {name:"content",other:{unique:false}},
                     {name:"date",other:{unique:false}},
                     {name:"isOk",other:{unique:false}}
                 ]
             },
             {
                 name:"tag",
                 key:{name:"id",other:{autoIncrement:true}},
                 field:[
                     {name:"name",other:{unique:false}},
                     {name:"color",other:{unique:false}}
                 ]
             }
     );
 nowDb.init(collection);
 //方法二 自行操作
 nowDb.init(function(db){
         var _$db=db;
         console.log(db.objectStoreNames);
         if(!db.objectStoreNames.contains("message")){
             var _message=_$db.createObjectStore("message",{keyPath:"id", autoIncrement: true});
             var _tag=_$db.createObjectStore("tag",{keyPath:"id", autoIncrement: true});
             _message.createIndex("content","content",{unique: false});
             _message.createIndex("date","date",{unique: false});
             _message.createIndex("isOk","isOk",{unique: false});
         }
     });
```