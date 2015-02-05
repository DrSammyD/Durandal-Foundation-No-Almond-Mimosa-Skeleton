<!--export name:'vcard.header'-->
#{{ko.t('webcomponent:Header')}}

{{ko.t('webcomponent:Summary')}}

###{{ko.t('webcomponent:Vcard')}}

{{ko.t('webcomponent:VcardExample')}}
<!-- export name:'vcard.example' -->
###{{ko.t('webcomponent:Creation')}}

{{ko.t('webcomponent:HtmlExample')}}
```html
<ul class="vcard">
    <li class="fn">{{'{{Name}}'}}</li>
    <li class="street-address">{{'{{Street}}'}}</li>
    <li class="locality">{{'{{City}}'}}</li>
    <li><span class="state">{{'{{State}}'}}</span>, <span class="zip">{{'{{Zip}}'}}</span></li>
    <li class="text-large">
        <span class="fa-lg">
            <a class="hvr-grow" href="mailto:{{'{{Email}}'}}"><i class="fa fa-envelope"></i></a>
            <a class="hvr-grow" href="{{'{{Github}}'}}"><i class="fa fa-lg fa-github"></i></a>
            <a class="hvr-grow" href="{{'{{Linkedin}}'}}"><i class="fa fa-lg fa-linkedin"></i></a>
            <a class="hvr-grow" href="{{'{{Stackoverflow}}'}}"><i class="fa fa-lg fa-stack-overflow"></i></a>
        </span>
    </li>
</ul>
```
{{ko.t('webcomponent:JavascriptExample')}}
```javascript
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
```
###{{ko.t('webcomponent:Register')}}

{{ko.t('webcomponent:RegisterExample')}}
```javascript
define(['knockout'],function(ko){
    ko.components.register('vcard', { require: 'components/vcard/vcard' });
});
```

###{{ko.t('webcomponent:Usage')}}

{{ko.t('webcomponent:UsageExample')}}
```html
<vcard params="viewModel:vcard"></vcard>
```
```javascript
vm.vcard={
    Name:"John Rego",
    Street:"123 Main St",
    City:"Houston",
    State:"Texas",
    Zip:"77004",
    Email:"JRego@sharklasers.com",
    Github:"http://www.github.com/JRego",
    Linkedin:"http://www.linkedin.com/JRego",
    Stackoverflow:"http://www.stackoverflow.com/JRego"
};
```