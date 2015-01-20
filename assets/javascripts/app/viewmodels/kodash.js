define(['plugins/http', 'durandal/app', 'knockout', 'moment', 'maskBinding', 'zurb/foundation.tab'], function(http, app, ko, moment) {
    var vm = function() {
        var that = this;
        var x = ko.observableArray([{
            thing: 1
        }, {
            thing: 2
        }, {
            thing: 3
        }, {
            thing: 4
        }]);
        var y = ko.observableArray([x()[2]]);
        var arr = x._().chain().filter(function(item) {
            return item.thing > 1;
        });
        var arr2 = arr.first().pick('thing');
        arr = arr.difference(y);
        ko.utils.extend(that, {
            arr: arr.observe(),
            arr2: arr2.observe()
        });
        this.interval = setInterval(function() {
            y([that.first()]);
        }, 2000);

        that.first = arr.first().observe();
    };

    vm.prototype.activate = function() {
        return this.vm;
    };
    vm.prototype.deactivate = function() {
        clearInterval(this.interval);
    };
    return vm;
});