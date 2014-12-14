define(['plugins/http', 'durandal/app', 'knockout','moment', 'maskBinding','zurb/foundation.tab'], function (http, app, ko, moment) {
    var vm = function(){
        var self = this;
        self.tab = 'dates';
        self.setTab=function(tab){self.tab=tab};
        self['datetimeAmerican']=Date();
        self['datetime12American']=Date();
        self['dd/mm/yyyy']=Date();
        self['date']=Date();
        self['mm/dd/yyyy']=Date();
        self['yyyy/mm/dd']=Date();
        self['dd.mm.yyyy']=Date();
        self['dd-mm-yyyy']=Date();
        self['mm.dd.yyyy']=Date();
        self['mm-dd-yyyy']=Date();
        self['yyyy.mm.dd']=Date();
        self['yyyy-mm-dd']=Date();
        self['datetime']=Date();
        self['datetime12']=Date();
        self['hh:mm t']=Date();
        self['h:s t']=Date();
        self['hh:mm:ss']=Date();
        self['hh:mm']=Date();
        self['mm/yyyy']=Date();
        self['percentage'] = 12;
        self['percentageBase100'] = 12;
        self['intSuffix'] = 12;
        self['floatSuffix'] = 12;
        self['USD'] = 12;
        self['EUR'] = 12;
        self['phone']= '2126549987';
        ko.track(self,[
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