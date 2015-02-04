define(['plugins/http', 'durandal/app', 'knockout', 'moment', 'maskBinding', 'zurb/foundation.tab'], function(http, app, ko, moment) {
    var vm = function() {
        var vm = this;
        var x = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        vm.observableFilter = x._().filter(function(item) {
            return item % 2;
        }).observe();
        setInterval(function() {
            x((Math.random() > 0.5) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
        }, 2000);

        var modOb = ko.observable(2);
        var dependentFilter = function(item) {
            return item % modOb();
        };
        var y = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        vm.depFilterArray = y._().filter(dependentFilter).observe();
        setInterval(function() {
            modOb(Math.round(Math.random() * 10));
        }, 2000);

        vm.observableIntersection= vm.observableFilter._().map(function(item){return item%10;}).intersection(vm.depFilterArray).observe();

        vm.compRunCount = ko.observable(0);
        vm.kodashRunCount = ko.observable(0);
        var baseArr = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        var mapFunc = function(item) {
            vm.compRunCount(vm.compRunCount.peek() + 1);
            return item * 7;
        };
        var filterFunc = function(item) {
            vm.compRunCount(vm.compRunCount.peek() + 1);
            return item % modOb();
        };
        var mapKoFunc = function(item) {
            vm.kodashRunCount(vm.kodashRunCount.peek() + 1);
            return item * 7;
        };
        var filterKoFunc = function(item) {
            vm.kodashRunCount(vm.kodashRunCount.peek() + 1);
            return item % modOb();
        };
        vm.comp = ko.computed(function() {
            return _(baseArr()).map(mapFunc).filter(filterFunc).value();
        });
        vm.kod = baseArr._().map(mapKoFunc).filter(filterKoFunc).observe();
    };

    vm.prototype.activate = function() {
        return this.vm;
    };
    vm.prototype.deactivate = function() {
        clearInterval(this.interval);
    };
    return vm;
});