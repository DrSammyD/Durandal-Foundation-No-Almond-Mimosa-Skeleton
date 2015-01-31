define(['jquery','knockout','plugins/router','durandal/composition','maskBinding','jqplugs'],function($,ko,rootRouter,composition){
    ko.utils.arrayForEach(
        ['datetimepicker'],
        function(item) {
            ko.bindingHandlers.mask.register(item);
        });
    rootRouter.install = function(){
        var lastActiveItem=null;
        ko.bindingHandlers.router = {
            init: function() {
                return { controlsDescendantBindings: true };
            },
            update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var settings = ko.utils.unwrapObservable(valueAccessor()) || {};

                if (settings.__router__) {
                    settings = {
                        model:settings.activeItem(),
                        attached:settings.attached,
                        compositionComplete:settings.compositionComplete,
                        activate: false
                    };
                } else {
                    var theRouter = ko.utils.unwrapObservable(settings.router || viewModel.router) || rootRouter;
                    settings.model = theRouter.activeItem();
                    settings.attached = theRouter.attached;
                    settings.compositionComplete = theRouter.compositionComplete;
                    settings.activate = false;
                }
                if(lastActiveItem!=settings.model)
                    composition.compose(element, settings, bindingContext);
                lastActiveItem = settings.model;
            }
        };

        ko.virtualElements.allowedBindings.router = true;
    };
});