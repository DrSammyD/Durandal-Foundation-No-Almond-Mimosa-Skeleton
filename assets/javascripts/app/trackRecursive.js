(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['underscore','knockout','knockout-es5'], factory);
    } else {
        factory(_,ko);
    }
})(function (_,ko) {
    var opts = {
        clone: true
    };
    _.mixin({
        track: function (obj, optsParam) {
            var options = optsParam !== undefined ? optsParam : {};
            _.defaults(options, _.track.prototype.opts);
            obj = options.clone && _.cloneDeep ? _.clone(obj, true) : obj;
            var objs = [{}];

            function trk(s) {
                // we care naught about primitives
                if (!_.isObject(s)) {
                    return true;
                }
                var replacementObj = {};

                if (!~objs.indexOf(s)) {
                    objs.push(s);
                    var observe = [];
                    _.chain(s).pairs().each(function (pair) {
                        if(trk(pair[1]))
                            observe.push(pair[0]);
                    });
                    ko.track(s,observe);
                }
                return false;
            }

            if(_.isArray(obj)){
                return _.chain(obj).map(function(arrObj){
                    return trk(arrObj);
                }).value();
            }else{
                return trk(obj);
            }
        }
    });
    _.chain(_.track.prototype).extend({ opts: opts });
});