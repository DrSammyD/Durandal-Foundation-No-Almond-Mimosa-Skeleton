define(['jquery','knockout','maskBinding','jqplugs'],function($,ko){
    console.log($.fn.jquery);
        var dpglobal=$.fn.datetimepicker.DPGlobal;
        dpglobal.headTemplate= '<thead><tr><th class="fa fa-chevron-left "></th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>'
    
    ko.utils.arrayForEach(
        ['datetimepicker'],
        function(item) {
            ko.bindingHandlers.mask.register(item);
        });
})