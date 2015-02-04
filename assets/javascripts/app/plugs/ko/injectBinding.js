define(['knockout'],function(ko){
    var getFallback = function(key) {
        return this()[key];
    };
    ko.utils.injectBinding = function (allBindings, key, value) {
        //https://github.com/knockout/knockout/pull/932#issuecomment-26547528
        allBindings.get = allBindings.get|| getFallback;
        var has = allBindings.has;
        var get = allBindings.get;
        return {
            has: function (bindingKey) {
                return (bindingKey == key) || has.call(allBindings, bindingKey);
            },
            get: function (bindingKey) {
                var binding = get.call(allBindings, bindingKey);
                if (bindingKey == key) {
                    binding = value;
                }
                return binding;
            }
        };
    };
    var shimmedlersList = [];
    ko.utils.shimBindingHandlers=function(bindingName){
        if(!~shimmedlersList.indexOf(bindingName)){
            var valInit=ko.bindingHandlers[bindingName].init;
            var valUpdate=ko.bindingHandlers[bindingName].update;
            
            ko.bindingHandlers[bindingName].init= valInit &&
                function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
                    //This binding is a shim for the mask bindingHandler
                    allBindingsAccessor.get = allBindingsAccessor.get|| getFallback;
                    valueAccessor= function(){return allBindingsAccessor.get(bindingName);};
                    //Look into valInit for your actual binding
                    var ret = valInit(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                    
                    return ret;
                };
            ko.bindingHandlers[bindingName].update= valUpdate &&
                function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext){
                    //This binding is a shim for the mask bindingHandler
                    allBindingsAccessor.get = allBindingsAccessor.get|| getFallback;
                    valueAccessor= function(){return allBindingsAccessor.get(bindingName);};
                    //Look into valInit for your actual binding
                    var ret = valUpdate(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
                    
                    return ret;
                };
            shimmedlersList.push(bindingName);
        }
    };
});