define(['locale/current-locale','i18next','knockout'],function(locale,i18next, ko) {
    var ctor = function () {
        this.displayName = 'Welcome.DisplayName';
        this.description = 'Welcome.Description';
        this.features = [
            'Welcome.Features.Clean',
            'Welcome.Features.Modular',
            'Welcome.Features.Lifecycle',
            'Welcome.Features.Event',
            'Welcome.Features.Navigation',
            'Welcome.Features.Async',
            'Welcome.Features.Optimization',
            'Welcome.Features.Backend',
            'Welcome.Features.Libraries',
            'Welcome.Features.Integrates',
            'Welcome.Features.Widgets'
        ];
        this.switchLang=function(){
            locale()=="fr"?i18next.setLng("en"):i18next.setLng("fr")
        };
        this.date=ko.observable();
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});