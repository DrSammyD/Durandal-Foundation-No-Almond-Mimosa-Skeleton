(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['knockout','jquery','selectize'], factory);
    } else {
        factory(ko,$,selectize||$('<select>').selectize().data('selectize').constructor);
    }
})(function (ko,$,selectize) {
    
    var _key= null;
    for(_key in ko.bindingHandlers.options){
        if(typeof ko.bindingHandlers.options[_key] =='string' && ko.bindingHandlers.options[_key].match('__ko__'))
            break;
    }
    
    var inject_binding = function (allBindings, key, value) {
        //https://github.com/knockout/knockout/pull/932#issuecomment-26547528
        var has = allBindings.has;
        var get = allBindings.get;
        return {
            has: function (bindingKey) {
                return (bindingKey == key) || has.call(allBindings,bindingKey);
            },
            get: function (bindingKey) {
                var binding = get.call(allBindings,bindingKey);
                if (bindingKey == key) {
                    binding = binding ? [].concat(binding, value) : value;
                }
                return binding;
            }
        };
    }
    var setOptionNodeSelectionState =function (optionNode, isSelected) {
                optionNode.selected = isSelected;
        } 
    selectize.prototype.updateOriginalInput=function(){        
        var i, n, options, self = this;
 
 
        if (self.$input[0].tagName.toLowerCase() === 'select') {
            options = [];
            ko.utils.arrayForEach(self.$input.get(0).getElementsByTagName("option"),function(node){
                var isSelected = self.items.indexOf(node[ko.bindingHandlers.options[_key].slice(1)]) !=-1
                setOptionNodeSelectionState(node, isSelected);
            })
        } else {
            self.$input.val(self.getValue());
        }
 
        self.$input.trigger('propertychange');
        if (self.isSetup) {
            self.trigger('change', self.$input.val());
        }
    }
    selectize.prototype.destroy=function(){
        var self = this;
        var eventNS = self.eventNS;
 
        self.trigger('destroy');
        self.off();
        self.$wrapper.remove();
        self.$dropdown.remove();
 
        $(window).off(eventNS);
        $(document).off(eventNS);
        $(document.body).off(eventNS);
 
        delete self.$input[0].selectize;
    }
        
    ko.bindingHandlers.selectizeOptions={
        init:function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $.extend(allBindingsAccessor, inject_binding(allBindingsAccessor,'optionsAfterRender',function(el){
                $(el).attr('value', el[ko.bindingHandlers.options[_key].slice(1)])
            }));
            var ret= ko.bindingHandlers.options.init(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);
 
            $(element).selectize({
                placeholder: ko.unwrap(allBindingsAccessor.get('optionsCaption'))
            });
            return ret;
        },
        update:function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var ret= ko.bindingHandlers.options.update(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            var $el= $(element);
            $el.data('selectize').destroy();
            var $chi=$el.children();
            $el.selectize({
                placeholder: ko.unwrap(allBindingsAccessor.get('optionsCaption'))
            });
            $el.append($chi);
            return ret;
        }
    }
    ko.bindingHandlers.selectizeCaption = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $.extend(allBindingsAccessor, inject_binding(allBindingsAccessor, 'optionsCaption', valueAccessor()));
            $(element).data('selectize').settings.placeholder= ko.unwrap(valueAccessor());
            $(element).data('selectize').updatePlaceholder();
        }
    }
    ko.bindingHandlers.selectize = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.value.init(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);            
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.value.update(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            $el=$(element);
            $el.data('selectize').setValue(
                $el.find(":selected")
                .map(function(i,el){
                    return el[ko.bindingHandlers.options[_key].slice(1)]
                }).get()[0]
            );
        }
    }
    ko.bindingHandlers.selectizeMultiple = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            $(element).prop('multiple',true);
            ko.bindingHandlers.selectedOptions.init(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);            
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            ko.bindingHandlers.selectedOptions.update(element,valueAccessor, allBindingsAccessor, viewModel, bindingContext);
            $el=$(element);
            $el.data('selectize').setValue(
                $el.find(":selected")
                .map(function(i,el){
                    return el[ko.bindingHandlers.options[_key].slice(1)]
                }).get()
            );
        }
    }
});