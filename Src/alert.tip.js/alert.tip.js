(function(){
    var $that=this;
    var $alertTip=function(message){
        if(document.querySelector('.js-alert')){
            var $removeDiv=document.querySelector('.js-alert');
            document.body.removeChild($removeDiv);
        }
        var div=document.createElement('div');
        div.className="js-alert";
        div.innerText=message;
        document.body.appendChild(div);
    };
    $that.alertTip=$alertTip;
}).call(this);