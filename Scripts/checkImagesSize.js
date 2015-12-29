var fs=require("fs");
var colors = require('colors');
var imgSize=require("image-size");
var arguments = process.argv.splice(2);
var $path="/Users/yodfz/Documents/project/threeds-server/bos/src/main/webapp/Web.src/OtherViews/Tuangou/images/";
fs.readdir($path,function(err,files){
    files.forEach(function(x){
        var states = fs.statSync($path+'/'+x);
        var fileSize=states.size/1024;
        var $img=imgSize($path+'/'+x);
        if($img.width!=$img.height&&$img.width/2!=$img.height){
            console.log(("image name:" + x + " width != height!!!" + $img.width +"," + $img.height).blue);
        }
        if(fileSize>40){
            console.log(("image name:" + x +",file size:" + Math.ceil(fileSize) +"kb").green);
        }
    });
});