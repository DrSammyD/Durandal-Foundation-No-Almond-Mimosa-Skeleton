requirejs.config({
    baseUrl: './javascripts/app',
    paths: {
        'ublic':'../../',
        'text': '../vendor/requirejs-text/text',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'kodash':'../vendor/kodash/kodash',
        'lodash':'../vendor/lodash/lodash',
        'jquery': '../vendor/jquery/jquery',
        'moment':'../vendor/moment/moment',
        'numeral':'../vendor/numeral/numeral',
        'i18next':'../vendor/i18next/i18next.amd.withJQuery',
        'toastr': '../vendor/toastr/toastr',
        'durandal':'../vendor/durandal',
        'plugins' : '../vendor/durandal/plugins',
        'transitions' : '../vendor/durandal/transitions',
        'foundation' : '../vendor/foundation',
        'datepicker': '../vendor/bootstrap-datepicker/bootstrap-datepicker',
        'q': '../vendor/q/q'
    },
    shim: {
        'koplugs': 'knockout',
        'jqplugs': 'jquery'
    }
});