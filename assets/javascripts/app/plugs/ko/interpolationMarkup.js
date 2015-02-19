define(['knockout','ko-punches'], function(ko,ko_punches) {

    ko_punches.enableAll = function() {    
        var ko_punches_namespacedBinding = ko_punches.namespacedBinding,
            ko_punches_preprocessBindingProperty = ko_punches.preprocessBindingProperty,
            ko_punches_textFilter = ko_punches.textFilter,
            ko_punches_wrappedCallback = ko_punches.wrappedCallback,
            ko_punches_interpolationMarkup=ko_punches.interpolationMarkup,
            ko_punches_attributeInterpolationMarkup=ko_punches.attributeInterpolationMarkup;
        // Enable interpolation markup
        ko_punches_interpolationMarkup.enable();
        ko_punches_attributeInterpolationMarkup.enable();

        // Enable auto-namspacing of attr, css, event, and style
        ko_punches_namespacedBinding.enableForBinding('attr');
        ko_punches_namespacedBinding.enableForBinding('css');
        ko_punches_namespacedBinding.enableForBinding('event');
        ko_punches_namespacedBinding.enableForBinding('style');

        // Make sure that Knockout knows to bind checked after attr.value (see #40)
        ko.bindingHandlers.checked.after.push('attr.value');

        // Enable filter syntax for text, html, and attr
        ko_punches_textFilter.enableForBinding('text');
        ko_punches_textFilter.enableForBinding('html');
        ko_punches_namespacedBinding.addDefaultBindingPreprocessor('attr', ko_punches_textFilter.preprocessor);

        // Enable wrapped callbacks for click, submit, event, optionsAfterRender, and template options
        ko_punches_wrappedCallback.enableForBinding('click');
        ko_punches_wrappedCallback.enableForBinding('submit');
        ko_punches_wrappedCallback.enableForBinding('optionsAfterRender');
        ko_punches_namespacedBinding.addDefaultBindingPreprocessor('event', ko_punches_wrappedCallback.preprocessor);
        ko_punches_preprocessBindingProperty.addPreprocessor('template', 'beforeRemove', ko_punches_wrappedCallback.preprocessor);
        ko_punches_preprocessBindingProperty.addPreprocessor('template', 'afterAdd', ko_punches_wrappedCallback.preprocessor);
        ko_punches_preprocessBindingProperty.addPreprocessor('template', 'afterRender', ko_punches_wrappedCallback.preprocessor);
    };
    var ko_punches_interpolationMarkup = ko_punches.interpolationMarkup;
    function parseInterpolationMarkup(textToParse, outerTextCallback, expressionCallback, node) {
        function innerParse(text) {
            var innerMatch = text.match(/^([\s\S]*)}}([\s\S]*?)\{\{([\s\S]*)$/);
            if (innerMatch) {
                innerParse(innerMatch[1]);
                outerTextCallback(innerMatch[2]);
                expressionCallback(innerMatch[3]);
            } else {
                expressionCallback(text);
            }
        }
        var outerMatch = textToParse.match(/^([\s\S]*?)\{\{([\s\S]*)}}([\s\S]*)$/);
        if (outerMatch) {
            outerTextCallback(outerMatch[1]);
            innerParse(outerMatch[2]);
            outerTextCallback(outerMatch[3]);
        } else {
            var current = node,
                siblings = [node],
                search = true;
            while ((siblings.push(current = current.nextSibling), current) && search) {
                if (current.nodeType === 3 && current.nodeValue && ~current.nodeValue.indexOf('}}') && (current.parentNode || {}).nodeName != "TEXTAREA") {
                    search = false;
                    middle = siblings.slice(1, -1);
                    siblings = [];
                    siblings.push(node.nodeValue);
                    for (var i = 0; i < middle.length; i++) {
                        siblings.push(middle[i].outerHTML);
                    }
                    siblings.push(current.nodeValue);
                    textToParse = siblings.join('');
                    outerMatch = textToParse.match(/^([\s\S]*?)\{\{([\s\S]*)}}([\s\S]*)$/);
                    if (outerMatch) {
                        for (i = middle.length - 1; i >= 0; i--) {
                            (node.parentElement||node.parentNode).removeChild(middle[i]);
                        }
                        (node.parentElement||node.parentNode).removeChild(current);
                        outerTextCallback(outerMatch[1]);
                        innerParse(outerMatch[2]);
                        outerTextCallback(outerMatch[3]);
                    }
                }
            }
        }
    }

    function interpolationMarkupPreprocessor(node) {
        // only needs to work with text nodes
        if (node.nodeType === 3 && node.nodeValue && node.nodeValue.indexOf('{{') !== -1 && (node.parentNode || {}).nodeName != "TEXTAREA") {
            var nodes = [];

            function addTextNode(text) {
                if (text)
                    nodes.push(document.createTextNode(text));
            }

            function wrapExpr(expressionText) {
                if (expressionText)
                    nodes.push.apply(nodes, ko_punches_interpolationMarkup.wrapExpression(expressionText, node));
            }
            parseInterpolationMarkup(node.nodeValue, addTextNode, wrapExpr, node);

            if (nodes.length) {
                if (node.parentNode) {
                    for (var i = 0, n = nodes.length, parent = node.parentNode; i < n; ++i) {
                        parent.insertBefore(nodes[i], node);
                    }
                    parent.removeChild(node);
                }
                return nodes;
            }
        }
    }
    ko_punches.interpolationMarkup.preprocessor = interpolationMarkupPreprocessor;
    ko_punches.interpolationMarkup.enable = function enableAttributeInterpolationMarkup() {
        ko_punches.utils.addNodePreprocessor(interpolationMarkupPreprocessor);
    };
});