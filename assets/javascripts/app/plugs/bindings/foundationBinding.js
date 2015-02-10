define(['knockout','jquery','zurb/foundation'],function(ko,$){
    var req =require;
    ko.bindingHandlers.foundation={
        init:function(element,valueAccessor,allBindings){
            req(['zurb/foundation.'+ko.unwrap(valueAccessor())],function(){
                $(element).foundation();
            });
        }
    };
});