define(['knockout', 'i18next', 'locale/current-locale'], function(ko, i18next, locale) {
    
    var keys=[];
    var requestKey=function(key){
        if(!~keys.indexOf(key))
        {
            i18next.loadNamespace(key);
            keys.push(key);
        }
    };
    ko['t'] = function(key, options) {
        locale();
        if (!i18next.exists(key)){
            var ns=key.split(':')[0];
            (locale.ns[ns]=locale.ns[ns]||ko.observable(0))();
            requestKey(ns);
        }
        var unwrapped = {};
        if (options) {
            var opts = ko.toJS(options);
            for (var optName in opts) {
                if (opts.hasOwnProperty(optName)) {
                    var opt = opts[optName];
                    unwrapped[optName] = ko.isObservable(opt) ? opt() : opt;
                }
            }
        }
        return i18next.t(key, unwrapped);
    };

    ko['translate'] = function(key, options) {
        return ko.computed(function() {
            locale();
            if (!i18next.exists(key)){
                var ns=key.split(':')[0];
                (locale.ns[ns]=locale.ns[ns]||ko.observable(0))();
                requestKey(ns);
            }
            var unwrapped = {};
            if (options) {
                var opts = ko.toJS(options);
                for (var optName in opts) {
                    if (opts.hasOwnProperty(optName)) {
                        var opt = opts[optName];
                        unwrapped[optName] = ko.isObservable(opt) ? opt() : opt;
                    }
                }
            }
            return i18next.t(key, unwrapped);
        });
    };
});