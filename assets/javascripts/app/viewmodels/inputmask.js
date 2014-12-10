define(['plugins/http', 'durandal/app', 'knockout','moment', 'maskBinding'], function (http, app, ko, moment) {
    var vm = function(){
        var self = this;
        self.date=Date();
        self.datetime = Date();
        self.time= Date();
        ko.track(self,['date','datetime','time']);
    };
    return vm;  
});