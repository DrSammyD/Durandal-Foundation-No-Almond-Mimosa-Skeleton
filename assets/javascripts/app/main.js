require(['ref'], function (common) {
    require(['setImmediate'],function(){
        var stOrig=setTimeout;
        setTimeout=function(){
            if(arguments[1]===0){
                setImmediate.apply(this,arguments);
            }
            else{
                stOrig.apply(this,arguments);
            }
        };
        require(['start']);
    });
});