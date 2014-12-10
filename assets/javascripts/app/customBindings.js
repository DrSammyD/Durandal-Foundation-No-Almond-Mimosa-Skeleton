define(['knockout', 'locale/current-locale', 'lodash', 'jquery', 'moment' ], function (ko, locale,_, $, moment) {
    ko.bindingHandlers.datetimepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datetimepicker with some optional options
            var options = allBindingsAccessor().datetimepickerOptions || {};
            options.language = locale;
            ko.toJSON(options);
            $(element).datetimepicker(ko.toJS(options));

            //when a user changes the date, update the view model
            $(element).on("change", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(moment($(element).datetimepicker("getDate")).toISOString());
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datetimepickerOptions || {};
            options.language = locale();
            $(element).datetimepicker('remove');
            $(element).datetimepicker(ko.toJS(options));

            $(element).data().datetimepicker.dates.pop();
            var startDate = moment(ko.utils.unwrapObservable(options.startDate));
            var endDate = moment(ko.utils.unwrapObservable(options.endDate));
            var valDate = moment(ko.utils.unwrapObservable(valueAccessor()));
            if (options.startDate && startDate.isValid()) {
                $(element).datetimepicker('setStartDate', startDate.toDate());
            }
            if (options.endDate && endDate.isValid()) {
                $(element).datetimepicker('setEndDate', endDate.toDate());
            }
            if (valDate.isValid()) {
                $(element).datetimepicker('update', valDate.toDate());
            }
        }
    };
});