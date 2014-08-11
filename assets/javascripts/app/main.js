requirejs.config({
    paths: {
        'text': '../vendor/requirejs-text/text',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout.debug',
        'jquery': '../vendor/jquery/jquery',
        'jquery': '../vendor/toastr/toastr',
        'durandal':'../vendor/durandal',
        'plugins' : '../vendor/durandal/plugins',
        'transitions' : '../vendor/durandal/transitions',
        'foundation' : '../vendor/foundation/js'
    },
    shim: {
    }
});

define(['durandal/app','durandal/viewLocator','durandal/system'],function(app, viewLocator, system) {

    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");

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