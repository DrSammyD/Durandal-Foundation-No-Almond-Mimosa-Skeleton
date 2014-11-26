requirejs.config({
    paths: {
        'datepicker': '../vendor/bootstrap-datepicker/bootstrap-datepicker',
        'durandal':'../vendor/durandal',
        'foundation' : '../vendor/foundation',
        'i18next':'../vendor/i18next/i18next.amd.withJQuery',
        'jquery': '../vendor/jquery/jquery',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'kodash':'../vendor/kodash/kodash',
        'lodash':'../vendor/lodash/lodash',
        'moment':'../vendor/moment/moment',
        'numeral':'../vendor/numeral/numeral',
        'plugins' : '../vendor/durandal/plugins',
        'q': '../vendor/q/q',
        'selectize': '../vendor/selectize/selectize',
        'microplugin': '../vendor/microplugin/microplugin',
        'sifter': '../vendor/sifter/sifter',
        'text': '../vendor/requirejs-text/text',
        'toastr': '../vendor/toastr/toastr',
        'transitions' : '../vendor/durandal/transitions'
    },
    shim: {
        'jquery':{exports:['jQuery']},
        'koplugs': 'knockout',
        'jqplugs': 'jquery',
        'datepicker':'jquery'
    }
})(['main'],function(){});