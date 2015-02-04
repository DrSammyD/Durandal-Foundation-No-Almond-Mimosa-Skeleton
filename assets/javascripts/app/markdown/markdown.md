<!-- export name="explanation" -->
{{ko.t('markdown:Markdown')}}!!!
===========
{{ko.t('markdown:MdIntro')}}

{{ko.t('markdown:MdExample')}} `{{ko.t('markdown:ModuleName')}}.md`
```
<!-- {{ko.t('markdown:Export')}} name="obj.prop"-->
{{ko.t('markdown:SecondProperty')}}
=========
{{ko.t('markdown:SecondSentence')}}
<!-- {{ko.t('markdown:Export')}} name="obj.otherProp"-->
{{ko.t('markdown:FirstProperty')}}
==========
{{ko.t('markdown:FirstSentence')}}

```

{{ko.t('markdown:HtmlExample')}}
```
<div class="markdown-body">
    <!-- {{ko.t('markdown:Import')}} name="text!{{ko.t('markdown:ModuleName')}}.html!export" path="obj.otherProp" -->
    <!-- {{ko.t('markdown:Import')}} name="text!{{ko.t('markdown:ModuleName')}}.html!export" path="obj.prop" -->
</div>
```
{{ko.t('markdown:OutExample')}}

<!-- export name="obj.prop"-->
{{ko.t('markdown:SecondProperty')}}
=========
{{ko.t('markdown:SecondSentence')}}
<!-- export name="obj.otherProp"-->
{{ko.t('markdown:FirstProperty')}}
==========
{{ko.t('markdown:FirstSentence')}}