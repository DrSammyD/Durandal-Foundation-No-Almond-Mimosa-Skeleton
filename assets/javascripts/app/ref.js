requirejs.config({
    paths: {
        'datepicker': '../vendor/bootstrap-datepicker/bootstrap-datepicker',
        'durandal':'../vendor/durandal',
        'zurb' : '../vendor/foundation',
        'i18next':'../vendor/i18next/i18next.amd.withJQuery',
        'jquery': '../vendor/jquery/jquery',
        'knockout': '../vendor/knockout.js/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'knockout-es5':'../vendor/knockout-es5/knockout-es5',
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
        'fastclick': '../vendor/fastclick/fastclick'
    },
    shim: {
        'jquery':{exports:['jQuery','$']},
        'koplugs': 'knockout',
        'jqplugs': 'jquery',
        'datepicker':'jquery',
        'fastclick':{exports:['FastClick']},
        '../vendor/foundation/foundation':{exports:['Foundation'],deps:['jquery','fastclick']},
        '../vendor/foundation/foundation.abide':'foundation',
        '../vendor/foundation/foundation.accordion':'foundation',
        '../vendor/foundation/foundation.alert':'foundation',
        '../vendor/foundation/foundation.clearing':'foundation',
        '../vendor/foundation/foundation.dropdown':'foundation',
        '../vendor/foundation/foundation.equalizer':'foundation',
        '../vendor/foundation/foundation.interchange':'foundation',
        '../vendor/foundation/foundation.joyride':'foundation',
        '../vendor/foundation/foundation.magellan':'foundation',
        '../vendor/foundation/foundation.offcanvas':'foundation',
        '../vendor/foundation/foundation.orbit':'foundation',
        '../vendor/foundation/foundation.reveal':'foundation',
        '../vendor/foundation/foundation.tab':'foundation',
        '../vendor/foundation/foundation.tooltip':'foundation',
        '../vendor/foundation/foundation.topbar':'foundation'
    },
    map:{
        '*':{
            'knockout-es5':'koES5Mod',
            'underscore':'lodash'
        },
        'koES5Mod':{'koES5Mod':'knockout-es5'}
    }
})(['main'],function(){});