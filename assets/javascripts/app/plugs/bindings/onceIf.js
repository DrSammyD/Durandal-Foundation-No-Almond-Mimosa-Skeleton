define(['knockout', 'injectBinding'], function (ko) {
    ko.bindingHandlers.onceIf={
        init:function(){
            return ko.bindingHandlers.if.init.apply(this,arguments);
        },
        update:function(element,valueAccessor,allBindingsAccessor){
            if(ko.unwrap(allBindingsAccessor.get('onceIf')))
                ko.utils.extend(
                    allBindingsAccessor,
                    ko.utils.injectBinding(allBindingsAccessor,
                        'onceIf',
                        true)
                );
        }
    };
});