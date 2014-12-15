define(['plugins/http', 'durandal/app', 'knockout','moment', 'maskBinding','zurb/foundation.tab'], function (http, app, ko, moment) {
    var vm = function(){
        var that = this;
        that.tab = 'dates';
        that.setTab=function(tab){that.tab=tab};
        that['datetimeAmerican']=Date();
        that['datetime12American']=Date();
        that['dd/mm/yyyy']=Date();
        that['date']=Date();
        that['mm/dd/yyyy']=Date();
        that['yyyy/mm/dd']=Date();
        that['dd.mm.yyyy']=Date();
        that['dd-mm-yyyy']=Date();
        that['mm.dd.yyyy']=Date();
        that['mm-dd-yyyy']=Date();
        that['yyyy.mm.dd']=Date();
        that['yyyy-mm-dd']=Date();
        that['datetime']=Date();
        that['datetime12']=Date();
        that['hh:mm t']=Date();
        that['h:s t']=Date();
        that['hh:mm:ss']=Date();
        that['hh:mm']=Date();
        that['mm/yyyy']=Date();
        that['percentage'] = 12;
        that['percentageBase100'] = 12;
        that['intSuffix'] = 12;
        that['floatSuffix'] = 12;
        that['USD'] = 12;
        that['EUR'] = 12;
        that['phone']= '2126549987';
        ko.track(that,[
            'tab',
            'datetimeAmerican',
            'datetime12American',
            'dd/mm/yyyy',
            'date',
            'mm/dd/yyyy',
            'yyyy/mm/dd',
            'dd.mm.yyyy',
            'dd-mm-yyyy',
            'mm.dd.yyyy',
            'mm-dd-yyyy',
            'yyyy.mm.dd',
            'yyyy-mm-dd',
            'datetime',
            'datetime12',
            'hh:mm t',
            'h:s t',
            'hh:mm:ss',
            'hh:mm',
            'mm/yyyy',
            'percentage',
            'percentageBase100',
            'intSuffix',
            'floatSuffix',
            'USD',
            'EUR',
            'phone'
            ]);
    };
    return vm;  
});