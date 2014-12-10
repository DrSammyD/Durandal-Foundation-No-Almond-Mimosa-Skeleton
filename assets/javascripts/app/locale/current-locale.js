define(['knockout', 'jquery', 'moment', 'text!locale/supported.json', 'i18next','datetimepicker'], function (ko, $, moment, supportedLangs) {
    supportedLangs= JSON.parse(supportedLangs);
    var locale = ko.observable($.i18n.lng());
    locale.equalityComparer = function(val1, val2) {
         return JSON.stringify(val1) == JSON.stringify(val2);
    };
    var setlng = $.i18n.setLng;
    moment.locale($.i18n.lng());
    $.i18n.setLng = function (lng, options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }
        var othercb = function () {
            moment.locale(lng);
            cb.apply(this, arguments);
            locale(lng);
        };
        options = options || {};
        cb = cb || function () { };
        setlng(lng, options, othercb);
    };
    $.i18n.init({
        preload: ['en'],
        customLoad: function (lng, ns, cb, loadComplete) {
            var loadcb = function (data) {
                var jsData = JSON.parse(data);
                moment.locale(lng);
                if (!$.fn.datetimepicker.dates[lng]) {
                    jsData.datetimepicker = jsData.datetimepicker || {};
                    jsData.datetimepicker["months"] = moment.months();
                    jsData.datetimepicker["monthsShort"] = moment.monthsShort();
                    jsData.datetimepicker["days"] = moment.weekdays();
                    jsData.datetimepicker["daysShort"] = moment.weekdaysShort();
                    jsData.datetimepicker["daysMin"] = moment.weekdaysMin();
                    $.fn.datetimepicker.dates[lng] = jsData.datetimepicker;
                }
                loadComplete(null, jsData[ns] || jsData);
            };
            lng = (supportedLangs.base.indexOf(lng) != -1) ?
                lng :
                (supportedLangs.base.indexOf(lng.split('-')[0]) != -1) ?
                    lng.split('-')[0] :
                    'en';
            deps=['text!locale/' + lng + '.json'];

            if(supportedLangs.moment.indexOf(lng)!=-1)
                deps.push('../vendor/moment/locale/'+lng);
            require(deps, loadcb);
        },
        fallbackLng: 'en'
    });
    locale($.i18n.lng());
    return locale;
});