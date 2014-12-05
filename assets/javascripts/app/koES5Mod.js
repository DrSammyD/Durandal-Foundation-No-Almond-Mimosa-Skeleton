define(['knockout', 'knockout-es5'], function(ko) {
    var vals=[];
    var o={};
    o.objs = [];
    ko.track(o,'objs');
    var goOrig = ko.getObservable;
    var getObservable = function(obj){
        if(arguments[1])
            return goOrig.apply(this,arguments);
        o.objs.push(obj);
        return obj;
    };
    var trackOrig=ko.track;
    var track = function (obj, propertyNames) {
        trackOrig.apply(ko,arguments);
        propertyNames.forEach(function(propertyName) {
            var observable = ko.getObservable(obj,propertyName);
            var get = ko.pureComputed(function(){
                var index=-1;
                if(o.objs.length && ~(index =o.objs.indexOf(obj)))
                    return o.objs.splice(index,1) && observable;
                return observable();
            });

            Object.defineProperty(obj, propertyName, {
                configurable: true,
                enumerable: true,
                get: get,
                set: ko.isWriteableObservable(observable) ? observable : undefined
            });
        });

        return obj;
    };

    ko.track = track;
    ko.go=getObservable;
    ko.getObservable=ko.go;
});