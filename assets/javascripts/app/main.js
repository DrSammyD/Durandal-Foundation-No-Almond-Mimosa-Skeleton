requirejs.config({
    paths: {
        'text': '../vendor/requirejs-text/text',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'kodash':'../vendor/kodash/kodash',
        'lodash':'../vendor/lodash/lodash',
        'jquery': '../vendor/jquery/jquery',
        'moment':'../vendor/moment/moment',
        'numeral':'../vendor/numeral/numeral',
        'i18next':'../vendor/i18next/i18next.amd.withJQuery',
        'toastr': '../vendor/toastr/toastr',
        'durandal':'../vendor/durandal',
        'plugins' : '../vendor/durandal/plugins',
        'transitions' : '../vendor/durandal/transitions',
        'foundation' : '../vendor/foundation',
        'datepicker': '../vendor/bootstrap-datepicker/bootstrap-datepicker',
        'q': '../vendoor/q/q'
    },
    shim: {
        'koplugins': 'knockout',
        'jqplugins': 'jquery'
    }
});

define(['durandal/app','durandal/viewLocator','durandal/system','knockout','koplugins','jqplugins'],function(app, viewLocator, system, ko) {

    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");
    ko.punches.enableAll();
    app.title = 'Bitcadia';


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