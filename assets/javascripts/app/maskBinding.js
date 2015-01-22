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
        var getBindingNames = function(allBindingsAccessor) {
            var names = [];
            for (var key in allBindingsAccessor()) {
                if (~((ko.bindingHandlers[key] || {}).after || []).indexOf('mask')) {
                    ko.utils.shimBindingHandlers(key);
                    names.push(key);
                }
            }
            return names;
        };

        var createMaskObservable = function($el, allBindingsAccessor, virtualInput) {
            var composite={};
            var computed = ko.computed(function() {
                composite.virtualInput=$('<input>');
                var maskOptions = ko.unwrap(allBindingsAccessor.get('mask'));
                composite.virtualInput.inputmask(maskOptions);
                var mask =  composite.virtualInput.data('_inputmask').opts;
                delete mask.alias;
                return ko.utils.extend(ko.utils.extend({}, defaultMask), mask);
            });
            ko.utils.extend( composite, {virtualMask:computed,currentMask:ko.observable(computed())});
            ko.utils.extend(
                allBindingsAccessor,
                ko.utils.injectBinding(allBindingsAccessor,
                    'maskObs',
                    composite)
            );
        };
        ko.bindingHandlers.mask = {
            init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var $virtualInput, bindingNames, $el = $(element);
                allBindingsAccessor.get = allBindingsAccessor.get || getFallback;

                $el.closest('form').on('submit', function() {
                    $el.triggerHandler('mouseenter');
                });
                $el.on('focus',function(){$el.val($el.val());});

                createMaskObservable($el, allBindingsAccessor);

                var exact = 0;
                var stuff;
                bindingNames = getBindingNames(allBindingsAccessor);
                ko.utils.arrayForEach(bindingNames, function(bindingName) {
                    var valToUse, morphToUse;
                    var getOrig = allBindingsAccessor.get;
                    var bindingToIntercept = allBindingsAccessor.get(bindingName);
                    if (bindingToIntercept) {
                        exact = 0;
                        ko.utils.arrayForEach(ko.bindingHandlers.mask.replace, function(item) {
                            stuff = (exact !== 1) &&
                                (exact = runTest(item.test, bindingName)) &&
                                (valToUse = function(){return item.valToUse(bindingName, getOrig.call(allBindingsAccessor,bindingName) );},
                                    morphToUse = item.morph);
                        });
                    }
                    var read = function() {
                        var mask,
                            val = valToUse(),
                            maskObs= allBindingsAccessor.get('maskObs');
                        maskObs.virtualInput.val((mask = ko.unwrap(maskObs.currentMask)).write(element, ko.unwrap(val), mask)).triggerHandler('mouseenter');
                        return maskObs.virtualInput[0].value;
                    };
                    var write = function(newValue) {
                        var mask;
                        var val = valToUse();
                        if (ko.isWriteableObservable(val)) {
                            newValue = (mask = ko.unwrap(allBindingsAccessor.get('maskObs').currentMask)).read(element, newValue, mask);
                            val(newValue);
                        }
                    };

                    var interceptor = (ko.pureComputed || ko.computed)({
                        read: read,
                        write: write
                    }).extend({
                        notify: 'always'
                    });
                    interceptor.deferUpdates=false;
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
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    $el.inputmask('remove');
                    allBindingsAccessor.get('maskObs').virtualInput.inputmask('remove');
                });
            },
            update: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext){
                var $el = $(element);
                var mask = ko.unwrap(allBindingsAccessor.get('maskObs').virtualMask);
                $el.inputmask('remove');
                allBindingsAccessor.get('maskObs').currentMask(mask);
                setTimeout(function(){$el.inputmask(mask);},0);
            },
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
                var bindings = {
                    mask: 'numeric'
                };
                if ($(element).is('input'))
                    bindings.value = valueAccessor();
                else
                    bindings.text = valueAccessor();
                ko.applyBindingsToNode(element, bindings);
            }
        };
        ko.bindingHandlers.percentage = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                var bindings = {
                    mask: 'percentage'
                };
                if ($(element).is('input'))
                    bindings.value = valueAccessor();
                else
                    bindings.text = valueAccessor();
                ko.applyBindingsToNode(element, bindings);
            }
        };
        ko.bindingHandlers.mask.register = function(name) {
            ((ko.bindingHandlers[name] || {}).after = (ko.bindingHandlers[name] || {}).after || []).push('mask');
        };

        ko.utils.arrayForEach(
            ['text',
                'value',
                'textinput',
                'textInput'
            ],
            function(item) {
                ko.bindingHandlers.mask.register(item);
            });
    });