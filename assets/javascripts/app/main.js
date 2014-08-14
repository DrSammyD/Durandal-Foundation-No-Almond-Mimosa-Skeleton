requirejs.config({
    paths: {
        'text': '../vendor/requirejs-text/text',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'jquery': '../vendor/jquery/jquery',
        'toastr': '../vendor/toastr/toastr',
        'durandal':'../vendor/durandal',
        'plugins' : '../vendor/durandal/plugins',
        'transitions' : '../vendor/durandal/transitions',
        'foundation' : '../vendor/foundation'
    },
    shim: {
        'koplugins': 'knockout'
    }
});

define(['durandal/app','durandal/viewLocator','durandal/system','knockout','koplugins'],function(app, viewLocator, system, ko) {

    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");
    ko.punches.enableAll();
    app.title = 'Durandal Starter Kit';


    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});