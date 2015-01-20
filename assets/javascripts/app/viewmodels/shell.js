define(['plugins/router', 'durandal/app','i18next','locale/current-locale'], function (router, app, i18next, locale) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: true },
                { route: 'inputmask', moduleId: 'viewmodels/inputmask', nav: true },
                { route: 'kodash', moduleId: 'viewmodels/kodash', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        },
        switchLang:function(){
            locale()=="fr"?i18next.setLng("en"):i18next.setLng("fr");
        }
    };
});