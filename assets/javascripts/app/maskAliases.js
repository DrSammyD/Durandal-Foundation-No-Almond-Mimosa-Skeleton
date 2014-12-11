define(['jquery', 'moment','numeral','mathRound10',
        '../vendor/jquery.inputmask/jquery.inputmask',
        '../vendor/jquery.inputmask/jquery.inputmask.date.extensions',
        '../vendor/jquery.inputmask/jquery.inputmask.extensions',
        '../vendor/jquery.inputmask/jquery.inputmask.numeric.extensions',
        '../vendor/jquery.inputmask/jquery.inputmask.phone.extensions',
        '../vendor/jquery.inputmask/jquery.inputmask.regex.extensions'], function ($, moment, numeral) {
    var numericMask = $.inputmask.defaults.aliases.numeric;
    $.extend(numericMask,
        {
            rightAlign: false,
            offset:0,
            integerDigits:21,
            'onBeforePaste': function(input, inputValue, opts) {
                return Math.round10(numeral(inputValue).value(), -opts.digits);
            },
            'read': function(input, inputValue, opts) {
                return Math.round10(numeral(inputValue).value(), -opts.digits - opts.offset);
            },
            'write': function(input, inputValue, opts) {
                return opts.onBeforePaste(input, inputValue * Math.pow(10,opts.offset), opts);
            }
        });

    var datetimeAmerican = $.extend({},$.inputmask.defaults.aliases['datetime']);
    datetimeAmerican.alias='mm/dd/yyyy';
    $.extend($.inputmask.defaults.aliases, {
        'percentage':{
            'alias': 'numeric',
            'groupSeparator': ',',
            'autoGroup': true,
            'digitsOptional': false,
            'digits': 0,
            'suffix': '% ',
            'placeholder': '0',
            'clearMaskOnLostFocus': false,
            'selectOnClick': true,
            'offset': 2
        },
        'percentageBase100':{
            'alias': 'percentage',
            'offset':0,
            'read': function(input, inputValue, opts) {
                return Math.round10(numeral(inputValue).value()*100, -opts.digits);
            }
        },
        'intSuffix':{
            'alias': 'numeric',
            'groupSeparator': ',',
            'autoGroup': true,
            'suffix': '',
            'digits': 0,
            'clearMaskOnLostFocus': false,
            'selectOnClick': true,
        },
        'floatSuffix':{
            'alias': 'intSuffix',
            'digits': 2,
            'digitsOptional':false,
            'placeholder': '0'
        },
        'USD':{
            'alias': 'floatSuffix',
            'suffix': ' USD'
        },
        'EUR':{
            'alias': 'floatSuffix',
            'suffix': ' EUR'
        },
        'datetimeAmerican':datetimeAmerican,
        'datetime12American':{
            "mask": "1/2/y h:s t\\m",
            "placeholder": "mm/dd/yyyy hh:mm xm",
            "alias": "datetime12",
            "leapday": "02/29/"
        }
    });
    var readWriteDateFuncs = {
        read: function(input, inputValue, opts) {
            return moment(inputValue || null,opts.momentFormat).toDate();
        },
        write: function(input, inputValue, opts) {
            inputValue=moment(inputValue || null);
            return inputValue.isValid()? inputValue.format(opts.momentFormat) : '';
        },
        clearMaskOnLostFocus: false
    };
    
    $.extend($.inputmask.defaults.aliases['datetimeAmerican'], readWriteDateFuncs, {
        momentFormat: 'MM/DD/YYYY HH:mm'
    });
    $.extend($.inputmask.defaults.aliases['datetime12American'], readWriteDateFuncs, {
        momentFormat: 'MM/DD/YYYY hh:mm a'
    });
    $.extend($.inputmask.defaults.aliases['dd/mm/yyyy'], readWriteDateFuncs, {
        momentFormat: 'DD/MM/YYYY'
    });
    $.extend($.inputmask.defaults.aliases['date'], readWriteDateFuncs, {
        momentFormat: 'DD/MM/YYYY'
    });
    $.extend($.inputmask.defaults.aliases['mm/dd/yyyy'], readWriteDateFuncs, {
        momentFormat: 'MM/DD/YYYY'
    });
    $.extend($.inputmask.defaults.aliases['yyyy/mm/dd'], readWriteDateFuncs, {
        momentFormat: 'YYYY/MM/DD'
    });
    $.extend($.inputmask.defaults.aliases['dd.mm.yyyy'], readWriteDateFuncs, {
        momentFormat: 'DD.MM.YYYY'
    });
    $.extend($.inputmask.defaults.aliases['dd-mm-yyyy'], readWriteDateFuncs, {
        momentFormat: 'DD-MM-YYYY'
    });
    $.extend($.inputmask.defaults.aliases['mm.dd.yyyy'], readWriteDateFuncs, {
        momentFormat: 'MM.DD.YYYY'
    });
    $.extend($.inputmask.defaults.aliases['mm-dd-yyyy'], readWriteDateFuncs, {
        momentFormat: 'MM-DD-YYYY'
    });
    $.extend($.inputmask.defaults.aliases['yyyy.mm.dd'], readWriteDateFuncs, {
        momentFormat: 'YYYY.MM.DD'
    });
    $.extend($.inputmask.defaults.aliases['yyyy-mm-dd'], readWriteDateFuncs, {
        momentFormat: 'YYYY-MM-DD'
    });
    $.extend($.inputmask.defaults.aliases['datetime'], readWriteDateFuncs, {
        momentFormat: 'DD/MM/YYYY hh:mm'
    });
    $.extend($.inputmask.defaults.aliases['datetime12'], readWriteDateFuncs, {
        momentFormat: 'DD/MM/YYYY hh:mm a'
    });
    $.extend($.inputmask.defaults.aliases['hh:mm t'], readWriteDateFuncs, {
        momentFormat: 'hh:mm a'
    });
    $.extend($.inputmask.defaults.aliases['h:s t'], readWriteDateFuncs, {
        momentFormat: 'h:s a'
    });
    $.extend($.inputmask.defaults.aliases['hh:mm:ss'], readWriteDateFuncs, {
        momentFormat: 'HH:mm:ss'
    });
    $.extend($.inputmask.defaults.aliases['hh:mm'], readWriteDateFuncs, {
        momentFormat: 'HH:mm'
    });
    $.extend($.inputmask.defaults.aliases['mm/yyyy'], readWriteDateFuncs, {
        momentFormat: 'MM/YYYY'
    });
    return $.inputmask.defaults.aliases;
});