kodash
======

Knockout dependency detection in chained lodash calls.

It's a simple extension of KnockoutJS which allows you to call lodash functions on observableArrays and observables.

Making observable filters
==================
```javascript
var vm = this;
var x = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
vm.observableFilter = x._().filter(function(item) {
    return item % 2;
}).observe();
setInterval(function() {
    x((Math.random() > 0.5) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
}, 2000);
```
- vm.observableFilter = {{JSON.stringify(observableFilter())}}

```javascript
var modOb = ko.observable(2);
var dependentFilter = function(item) {
    return item % modOb();
};
var y = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
vm.depFilterArray = y._().filter(dependentFilter).observe();
setInterval(function() {
    modOb(Math.round(Math.random() * 10));
}, 2000);
```
- vm.depFilterArray {{JSON.stringify(depFilterArray())}}

Chaining dependencies
=====================
```javascript
vm.observableDiff= vm.observableFilter._().map(function(item){return item%10;}).intersection(vm.depFilterArray).observe();
```
- vm.observableDiff {{JSON.stringify(observableDiff())}}

Efficient
=========
Only runs at the point of an observable change. It doesn't recalculate lodash calls before that point.

```
vm.compRunCount = ko.observable(0);
vm.kodashRunCount = ko.observable(0);
var baseArr = ko.observableArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
//var modOb = ko.observable(2);
var mapFunc = function(item) {
    vm.compRunCount(vm.compRunCount.peek() + 1);
    return item * 6;
};
var filterFunc = function(item) {
    vm.compRunCount(vm.compRunCount.peek() + 1);
    return item % modOb();
};
var mapKoFunc = function(item) {
    vm.kodashRunCount(vm.kodashRunCount.peek() + 1);
    return item * 6;
};
var filterKoFunc = function(item) {
    vm.kodashRunCount(vm.kodashRunCount.peek() + 1);
    return item % modOb();
};
vm.comp = ko.computed(function() {
    return _(baseArr()).map(mapFunc).filter(filterFunc).value();
});
vm.kod = baseArr._().map(mapKoFunc).filter(filterKoFunc).observe();
setInterval(function() {
    modOb(Math.round(Math.random() * 10));
}, 2000);
```
- vm.compRunCount = {{compRunCount}}
- vm.kodashRunCount = {{kodashRunCount}}
- vm.comp = {{ko.toJSON(comp())}}
- vm.kod = {{ko.toJSON(kod())}}
