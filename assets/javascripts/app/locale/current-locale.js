define(['knockout', 'i18next', 'moment', 'text!locale/supported.json','datetimepicker'], function (ko, i18next, moment, supportedLangs) {
    var req=require;
    supportedLangs= JSON.parse(supportedLangs);
    var locale = ko.observable(i18next.lng());
    locale.extend({ notify: 'always' });
    locale.ns={shell:ko.observable(0)};
    locale.equalityComparer = function(val1, val2) {
         return JSON.stringify(val1) == JSON.stringify(val2);
    };
    var setlng = i18next.setLng;
    i18next.setLng = function (lng, options, cb) {
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
    i18next.init({
        customLoad: function (lng, ns, cb, loadComplete) {
            var loadcb = function (data) {
                var jsData = JSON.parse(data);
                moment.locale(i18next.lng());
                loadComplete(null, jsData[ns] || jsData);
                setTimeout(function(){locale.ns[ns](locale.ns[ns]()+1);},0);
            };
            lng = (supportedLangs.base.indexOf(lng) != -1) ?
                lng :
                (supportedLangs.base.indexOf(lng.split('-')[0]) != -1) ?
                    lng.split('-')[0] :
                    'en';
            deps=['text!locale/' + ns +'/'+ lng + '.json'];

            if(supportedLangs.moment.indexOf(lng)!=-1)
                deps.push('../vendor/moment/locale/'+lng);
            req(deps, loadcb);
        },
        ns:'shell'
    });

    comp=ko.computed({
        read: function(){
            return locale();
        }, 
        write: function(lng){
            i18next.setLng(lng);
        } 
    });
    locale(i18next.lng());
    moment.locale(i18next.lng());
    comp.ns=locale.ns;
    return comp;
});