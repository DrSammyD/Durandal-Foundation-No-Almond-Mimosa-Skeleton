define(['knockout', 'jquery', 'locale/current-locale'], function(ko, $, locale) {
    ko['t'] = function(key, options) {
        locale();
        locale.ns();
        if (!$.i18n.exists(key))
            $.i18n.loadNamespace(key.split(':')[0]);
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
        return $.i18n.t(key, unwrapped);
    };

    ko['translate'] = function(key, options) {
        return ko.computed(function() {
            locale();
            locale.ns();
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
            return $.i18n.t(key, unwrapped);
        });
    };
});