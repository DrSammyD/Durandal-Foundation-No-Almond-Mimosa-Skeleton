define(['knockout','text!./vcard.html'],function(ko,template){
    return {
        viewModel: function(params) {
            if(params.viewModel)
                ko.utils.extend(this,params.viewModel);
            else
                ko.utils.extend(this,params);
        },
        template:template
    };
});