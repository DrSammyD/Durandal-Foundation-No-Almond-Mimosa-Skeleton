define(['knockout', 'locale/current-locale', 'lodash', 'jquery', 'moment' ], function (ko, locale,_, $, moment) {
    ko.bindingHandlers.datepicker = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            //initialize datepicker with some optional options
            var options = allBindingsAccessor().datepickerOptions || {};
            options.language = locale;
            ko.toJSON(options);
            $(element).datepicker(ko.toJS(options));

            //when a user changes the date, update the view model
            $(element).on("change", function (event) {
                var value = valueAccessor();
                if (ko.isObservable(value)) {
                    value(moment($(element).datepicker("getDate")).toISOString());
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            var options = allBindingsAccessor().datepickerOptions || {};
            options.language = locale();
            $(element).datepicker('remove');
            $(element).datepicker(ko.toJS(options));

            $(element).data().datepicker.dates.pop();
            var startDate = moment(ko.utils.unwrapObservable(options.startDate));
            var endDate = moment(ko.utils.unwrapObservable(options.endDate));
            var valDate = moment(ko.utils.unwrapObservable(valueAccessor()));
            if (options.startDate && startDate.isValid()) {
                $(element).datepicker('setStartDate', startDate.toDate());
            }
            if (options.endDate && endDate.isValid()) {
                $(element).datepicker('setEndDate', endDate.toDate());
            }
            if (valDate.isValid()) {
                $(element).datepicker('update', valDate.toDate());
            }
        }
    };
});