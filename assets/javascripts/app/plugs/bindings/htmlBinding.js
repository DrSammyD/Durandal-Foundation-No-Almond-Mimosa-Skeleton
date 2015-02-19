define(['knockout', 'virtual-dom', 'vdom-virtualize', 'injectBinding', 'ko-punches'], function(ko, vdom, virtualize) {
    ko.bindingHandlers.html['init'] = function(element, valueAccessor, allBindings) {
        ko.utils.extend(allBindings, ko.utils.injectBinding(allBindings, 'lastHtml', {
            value: ''
        }));
        return { 'controlsDescendantBindings': true };
    };
    var defaultBindings = ko.bindingHandlers;
    ko.bindingHandlers.html.approvedBindings={
            attr: defaultBindings.attr,
            checked: defaultBindings.checked,
            checkedValue: defaultBindings.checkedValue,
            component: defaultBindings.component,
            css: defaultBindings.css,
            disable: defaultBindings.disable,
            enable: defaultBindings.enable,
            event: defaultBindings.event,
            hasfocus: defaultBindings.hasfocus,
            options: defaultBindings.options,
            selectedOptions: defaultBindings.selectedOptions,
            style: defaultBindings.style,
            submit: defaultBindings.submit,
            text: defaultBindings.text,
            textInput: defaultBindings.textInput,
            textinput: defaultBindings.textinput,
            uniqueName: defaultBindings.uniqueName,
            value: defaultBindings.value,
            visible: defaultBindings.visible,
            wholeText: defaultBindings.wholeText
        };
    ko.bindingHandlers.html.update = function(element, valueAccessor, allBindings, viewModel, context) {
        var innerHTML, oldHtml, currentValueTree, newValueTree, patch, last = allBindings.get('lastHtml'),
            tempEl, cbs;
        oldHtml = last.value;
        last.value = ko.unwrap(valueAccessor());
        //ko.bindingHandlers=ko.bindingHandlers.html.approvedBindings;        
        if (element.nodeType === 8) {
            tempEl = createVirtualValueElements(ko.virtualElements.childNodes(element), last.value, oldHtml);
            cbs=createVirtualTrees(tempEl,context);
            var end = element.nextSibling;
            while(tempEl.current.childNodes.length) {
                ko.cleanNode(tempEl.current.childNodes[0]);
                (element.parentElement||element.parentNode).insertBefore(tempEl.current.childNodes[0],end);
            }
        } else {
            tempEl = createVirtualValueElements(element.childNodes, last.value, oldHtml);
            cbs=createVirtualTrees(tempEl,context);
            while(tempEl.current.childNodes.length) {
                ko.cleanNode(tempEl.current.childNodes[0]);
                element.appendChild(tempEl.current.childNodes[0]);
            }
        }
        ko.applyBindingsToDescendants(context,element);
        //ko.bindingHandlers=defaultBindings;
    };
    var createVirtualValueElements = function(childNodes, newHtml, oldHtml) {
        //var oldValueElement = document.createElement('div'),
            newValueElement = document.createElement('div'),
            currentValueElement = document.createElement('div');
        newValueElement.innerHTML = newHtml;
        //oldValueElement.innerHTML = oldHtml;
        ko.utils.arrayForEach(childNodes,
            function(item) {
                currentValueElement.appendChild(item);
            });
        return {
            //old: oldValueElement,
            new: newValueElement,
            current: currentValueElement
        };
    };
    var createVirtualTrees = function(tempEl,context) {
        var newValueTree, currentToNew, currentValueTree = virtualize(tempEl.current);
            //oldValueTree = virtualize(tempEl.old),
            //oldToCurrent = vdom.diff(oldValueTree, currentValueTree);
        
        //vdom.patch(tempEl.new, oldToCurrent);
        newValueTree=virtualize(tempEl.new);
        currentToNew= vdom.diff(currentValueTree,newValueTree);
        var cbs = [];
        vdom.patch(tempEl.current,currentToNew);
        return cbs;
    };
});