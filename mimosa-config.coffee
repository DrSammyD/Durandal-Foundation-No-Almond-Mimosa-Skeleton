path = require('path')
exports.config =
  
  minMimosaVersion:'2.0.0'
  liveReload:
    enabled:true

  modules: [
    'bower'
    'combine'
    'copy'
    'csslint'
    'jshint'
    'live-reload'
    'markdown'
    'minify-css'
    'minify-js'
    'require'
    'require-commonjs'
    'requirebuild-include'
    'requirebuild-textplugin-include'
    'sass'
    'server'
    'web-package'
  ]

  watch:
    javascriptDir: 'javascripts/app'

  sass:
    lib: require('node-sass')
    extensions: ["sass", "scss"]
    includePaths: ['stylesheets/vendor/foundation','stylesheets/vendor/Hover/scss','stylesheets/vendor/font-awesome']
    
  requireBuildTextPluginInclude:
    pluginPath: 'text'
    extensions: ['html']

  requireBuildInclude:
    folder:"javascripts"
    patterns: ['app/**/*.js', 'vendor/durandal/**/*.js']

  bower:
    trackChange: true
    copy:
      mainOverrides:
        "knockout":[
          "dist/knockout.debug.js"
        ]
        "knockout-es5":[
          "dist/knockout-es5.js"
        ]
        "durandal": [
          {
            js: "durandal"
            css: "durandal"
          }
        ]
        "datetimepicker":[
            "dist/javascripts/jquery.moment.datetimepicker.js"
            'stylesheets/'            
        ]
        "foundation":[
            "js/foundation"
            'scss/normalize.scss'
            "scss/foundation/":'/foundation/'
        ]
        "hover":[
          "scss/effects":'/hover/effects'
          "scss/_hacks.scss":'/hover/_hacks.scss'
          "scss/_mixins.scss":'/hover/_mixins.scss'
          "scss/_options.scss":'/hover/_options.scss'
        ],
        "knockout.punches":['build/output/knockout.punches.js']
        "knockout.deferred":['knockout.punches.js']
        "i18next":['i18next.amd.withJQuery.js'],
        "modernizr":['modernizr.js']
        "jquery-placeholder":['jquery.placeholder.js']
        'toastr':['toastr.js','toastr.css']
        "font-awesome": [
          'fonts': "../../fonts/vendor/font-awesome"
          "scss/_animated.scss"
          "scss/_bordered-pulled.scss"
          "scss/_core.scss"
          "scss/_fixed-width.scss"
          "scss/_icons.scss"
          "scss/_larger.scss"
          "scss/_list.scss"
          "scss/_mixins.scss"
          "scss/_path.scss"
          "scss/_rotated-flipped.scss"
          "scss/_stacked.scss"
          "scss/_variables.scss"
        ]
        "knockout-es5":[
          'dist'
        ]
        "lodash":[
          'lodash.js'
        ]
        "moment":[
          "locale/":"moment/locale/"
          "moment.js"
        ]
        "velocity":[
          "velocity.js"
          "velocity.ui.js"
        ]
        "require-texport":[
          "text.js":"requirejs-text/"
        ]

  combine:
    folders: [
      {
        folder:'stylesheets'
        output:'stylesheets/styles.css'
        order: [
          'vendor/durandal/durandal.css'
          'starterkit.css'
        ]
      }
    ]

  require:
    commonConfig: "ref"
    optimize:
      inferConfig:true 
      overrides: (infered)->
        infered.name='main'
        infered.include=['requireLib', 'main']
        infered.insertRequire=['main']
        infered.paths ={'requireLib':'../vendor/requirejs/require'}
        infered.baseUrl= process.cwd()+'/public/javascripts/app'.split('/').join(path.sep)
        #infered.out= process.cwd()+'/public/javascripts/app/main-built.js'.split('/').join(path.sep)
        infered.pragmas= build: true
        infered.optimize='uglify2'
        return infered

  server:
    path: "server.js"
    views:
      name: 'main'
      optimize:'uglify2'
      compileWith: 'handlebars'
      extension: 'hbs'
      pragmas: build: true

  csslint:
    exclude:[
      'stylesheets/app/site.scss'
      'stylesheets/starterkit.css'
      '/stylesheets/vendor/hover/scss/hover.scss'
   ]