define(['jquery', 'knockout',
        'injectBinding',
        'maskAliases'
    ],
    function($, ko, injectBinding, masks) {
        var getFallback = function(key) {
        return this()[key];
    };
    var defaultMask = {
        read: function(input, inputValue, opts) {
            return inputValue;
        },
        write: function(input, inputValue, opts) {
            return inputValue;
        }
    };
    var runTest = function(test, bindingName) {
        if ($.isFunction(test))
            return test(bindingName) ? true : false;
        else
            return (test === bindingName) ? 1 : false;
    };
    var getBindingNames= function(allBindingsAccessor){
        var names=[];
        for(var key in allBindingsAccessor()){
            if(~((ko.bindingHandlers[key]||{}).after||[]).indexOf('mask')){
                ko.utils.shimBindingHandlers(key);
                names.push(key);
            }
        }
        return names;
    };
    
    ko.bindingHandlers.mask = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var valToUse, morphToUse, bindingNames, $el = $(element);
            allBindingsAccessor.get = allBindingsAccessor.get || getFallback;
            
            bindingNames = getBindingNames(allBindingsAccessor);
            var maskOptions = allBindingsAccessor.get('mask');
            $el.inputmask(maskOptions);
            var $virtualInput = !$el.data()._inputmask;
            $virtualInput = $virtualInput? $('<input></input>').inputmask(maskOptions):false;            
            
            var alias = maskOptions.alias || maskOptions;
            var mask = ko.utils.extend(ko.utils.extend({}, defaultMask), masks[alias] || {});
            
            var opts = !$virtualInput?
                $el.data()._inputmask.opts : $virtualInput.data()._inputmask.opts;
            
            mask = ko.utils.extend(mask,opts);            
            if (mask.selectOnClick) {
                var selectFunc = function() {
                    if($el.is(':focus'))
                        $el.select();
                };
                var timeout = function() {                    
                    setTimeout(selectFunc, 3);
                };
                $el.on('focus', timeout);
            }
            $el.closest('form').on('submit',function(){$el.triggerHandler('mouseenter');});
            var exact = 0;
            var stuff;
            ko.utils.arrayForEach(bindingNames,function(bindingName){
                var bindingToIntercept = allBindingsAccessor.get(bindingName);
                if (bindingToIntercept) {
                    exact=0;
                    ko.utils.arrayForEach(ko.bindingHandlers.mask.replace, function(item) {
                        stuff=(exact !== 1) &&
                            (exact = runTest(item.test, bindingName)) &&
                            (valToUse = item.valToUse(bindingName, bindingToIntercept),
                             morphToUse = item.morph);                    
                    });
                }
                var read = (!$virtualInput) ? function(){
                    return mask.write(element, ko.unwrap(valToUse), mask);
                }:function(){
                    $virtualInput.val(mask.write(element, ko.unwrap(valToUse), mask)).triggerHandler('mouseenter');
                    return $virtualInput[0].value;
                };
                var write = (!$virtualInput) ? function(newValue) {
                        if (ko.isWriteableObservable(valToUse)) {
                            newValue = mask.read(element, newValue, mask);
                            valToUse(newValue);
                        }
                    }:undefined;
                
                var interceptor =(ko.pureComputed||ko.computed)({
                    read: read,
                    write: write
                }).extend({
                    notify: 'always'
                });
                var binding = morphToUse(bindingName, bindingToIntercept, interceptor);
                for (var key in binding) {
                    ko.utils.extend(
                        allBindingsAccessor,
                        ko.utils.injectBinding(allBindingsAccessor,
                                               key,
                                               binding[key])
                    );
                }
            });
        },
        before: ['value'],
        replace: [{
            test: function(bindingName) {
                return true;
            },
            valToUse: function(bindingName, val) {
                return val;
            },
            morph: function(bindingName, val, interceptor) {
                bindings = {};
                bindings[bindingName] = interceptor;
                return bindings;
            }
        }]
    };
    
    ko.bindingHandlers.number = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var bindings={mask:'intSuffix'};
            if($(element).is('input'))
                bindings.value=valueAccessor();
            else
                bindings.text=valueAccessor();
            ko.applyBindingsToNode(element, bindings);
        }
    };
    ko.bindingHandlers.percentage = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var bindings={mask:'percentage'};
            if($(element).is('input'))
                bindings.value=valueAccessor();
            else
                bindings.text=valueAccessor();
            ko.applyBindingsToNode(element, bindings);
        }
    };
    ko.bindingHandlers.mask.register=function(name){
        (ko.bindingHandlers[name]||{}).after=[];
        ((ko.bindingHandlers[name]||{}).after||[]).push('mask');
    };
    
    ko.utils.arrayForEach(
        ['text',
         'value',
         'textinput',
         'textInput'],
        function(item){
            ko.bindingHandlers.mask.register(item);
        });
    });