define(['jquery','jqplugs'],function($,ish){
    console.log($.fn.jquery);
    if(ish){
        var dpglobal=$.fn.datepicker.DPGlobal;
        dpglobal.headTemplate= '<thead><tr><th class="fa fa-chevron-left "></th><th colspan="5" class="datepicker-switch"></th><th class="next">&raquo;</th></tr></thead>'
    }
})