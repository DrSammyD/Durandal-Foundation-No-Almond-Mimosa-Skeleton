define(['durandal/app','durandal/viewLocator','durandal/system','knockout','koplugs','jqplugs', 'viewmodels/shell'],function(app, viewLocator, system, ko) {

    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");
    require({baseUrl:'./javascripts/app'})
    ko.punches.enableAll();
    app.title = 'Durandal';


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