define(['knockout','jquery','locale/current-locale'],function (ko, $,locale) {
    ko['t'] = function(key, options) {
        locale();
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
});