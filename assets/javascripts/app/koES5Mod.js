define(['knockout', 'knockout-es5'], function(ko) {
    var goObj;
    var goOrig = ko.getObservable;
    var getObservable = function(obj,prop){
        goObj=obj;
        return prop?obj[prop]:obj;
    };
    var trackOrig=ko.track;
    var track = function (obj, propertyNames) {
        trackOrig.apply(ko,arguments);
        propertyNames.forEach(function(propertyName) {
            var observable = goOrig.apply(ko,[obj,propertyName]);
            var get = function(){
                if(goObj==obj)
                    return (goObj=null,observable);
                return observable();
            };

            Object.defineProperty(obj, propertyName, {
                configurable: true,
                enumerable: true,
                get: get,
                set: ko.isWriteableObservable(observable) ? observable : undefined
            });
        });

        return obj;
    };

    var propOrig=ko.defineProperty;
    var defineProperty = function (obj, propertyName, computed) {
        propOrig.apply(this,arguments);
        var observable=goOrig.apply(ko,[obj,propertyName]);
        var get = function(){
            if(goObj==obj)
                return (goObj=null,observable);
            return observable();
        };

        Object.defineProperty(obj, propertyName, {
            configurable: true,
            enumerable: true,
            get: get,
            set: ko.isWriteableObservable(observable) ? observable : undefined
        });

        return obj;
    };

    ko.track = track;
    ko.go=getObservable;
    ko.getObservable=ko.go;
    return ko;
});