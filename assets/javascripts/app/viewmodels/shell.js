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
                { route: '', title:ko.translate("shell:Welcome"), moduleId: 'viewmodels/welcome', nav: true },
                { route: 'durandal', title:ko.translate("shell:Durandal"), moduleId: 'viewmodels/durandal', nav: true },
                { route: 'inputmask', title:ko.translate("shell:Inputmasks"), moduleId: 'viewmodels/inputmask', nav: true },
                { route: 'kodash', title:ko.translate("shell:Kodash"), moduleId: 'viewmodels/kodash', nav: true },
                { route: 'markdown', title:ko.translate("shell:Markdown"), moduleId: 'viewmodels/markdown', nav: true },
                { route: 'webcomponent', title:ko.translate("shell:Webcomponent"), moduleId: 'viewmodels/webcomponent', nav: true },
                { route: 'i18n', title:ko.translate("shell:I18n"), moduleId: 'viewmodels/i18n', nav: true }
            ]).buildNavigationModel();
            
            return router.activate();
        },
        switchLang:function(){
            locale()=="fr"?i18next.setLng("en"):i18next.setLng("fr");
        }
    };
});