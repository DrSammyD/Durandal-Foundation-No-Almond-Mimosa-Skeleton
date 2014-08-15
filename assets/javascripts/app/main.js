define(['durandal/app','durandal/viewLocator','durandal/system','knockout','koplugs','jqplugs'],function(app, viewLocator, system, ko) {

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