define(['knockout'],function(ko) {
    var ctor = function () {
        this.displayName = 'DisplayName';
        this.description = 'Description';
        this.date = 'Dates.date';
        this.features = [
            'Features.Clean',
            'Features.Modular',
            'Features.Lifecycle',
            'Features.Event',
            'Features.Navigation',
            'Features.Async',
            'Features.Optimization',
            'Features.Backend',
            'Features.Libraries',
            'Features.Integrates',
            'Features.Widgets'
        ];
    };

    //Note: This module exports a function. That means that you, the developer, can create multiple instances.
    //This pattern is also recognized by Durandal so that it can create instances on demand.
    //If you wish to create a singleton, you should export an object instead of a function.
    //See the "flickr" module for an example of object export.

    return ctor;
});