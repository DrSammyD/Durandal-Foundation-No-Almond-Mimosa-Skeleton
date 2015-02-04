define(['plugins/router', 'durandal/app','i18next','locale/current-locale','knockout'], function (router, app, i18next, locale,ko) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', title:ko.translate("Welcome"), moduleId: 'viewmodels/welcome', nav: true },
                { route: 'inputmask', title:ko.translate("Inputmasks"), moduleId: 'viewmodels/inputmask', nav: true },
                { route: 'kodash', title:ko.translate("Kodash"), moduleId: 'viewmodels/kodash', nav: true },
                { route: 'markdown', title:ko.translate("Markdown"), moduleId: 'viewmodels/markdown', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        },
        switchLang:function(){
            locale()=="fr"?i18next.setLng("en"):i18next.setLng("fr");
        }
    };
});