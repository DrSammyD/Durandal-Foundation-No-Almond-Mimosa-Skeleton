path = require('path')
exports.config =

  minMimosaVersion:'2.0.0'
  liveReload:
    enabled:true

  amdify:
    globals: {'fastclick':['FastClick'],'jquery':['jQuery','$'], 'lodash':['_'],'foundation':['Foundation'],'modernizr':['Modernizr']}
    shim:
      '../vendor/modernizr/modernizr.js':
        export: ['Modernizr']

  modules: [
    'server'
    'require'
    'minify-js'
    'minify-css'
    'sass'
    'live-reload'
    'jshint'
    'csslint'
    'combine'
    'requirebuild-include'
    'requirebuild-textplugin-include'
    'bower'
    'require-commonjs'
    'web-package'
    'copy'
  ]

  watch:
    javascriptDir: 'javascripts/app'

  sass:
    lib: require('node-sass')
    extensions: ["sass", "scss"]
    includePaths: ['stylesheets/vendor/foundation/scss']
    
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
            img: "../../img"
            js: "durandal"
            css: "durandal"
          }
        ]
        "foundation":[          
            "js/foundation"
            scss: "foundation"
        ]
        "knockout.punches":['knockout.punches.js']
        "knockout.deferred":['knockout.punches.js']
        "i18next":['i18next.amd.withJQuery.js'],
        "modernizr":['modernizr.js']
        "jquery-placeholder":['jquery.placeholder.js']
        'toastr':['toastr.js','toastr.css']
        "font-awesome": [
          { font: "../../font" }
          "css/font-awesome.css"
          "css/font-awesome-ie7.css"
        ]
        "lodash":[
          'dist':'lodash'
        ]
        "smalot-bootstrap-datetimepicker":[
          'js':'smalot-bootstrap-datetimepicker'
        ]
        "knockout-es5":[
          'dist'
        ]
        "moment":[
          "locale/":"moment/locale/"
          "moment.js"
        ]
        "velocity":[
          "velocity.js"
          "velocity.ui.js"
        ]
        "bootstrap":[]
        "knockout.js":[]
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
    optimize:
      inferConfig:true 
      overrides: (infered)->
        infered.mainConfigFile='./public/javascripts/app/ref.js'
        infered.name='main'
        infered.include=['requireLib', 'main']
        infered.insertRequire=['main']
        infered.paths ={'requireLib':'../vendor/requirejs/require'}
        infered.baseUrl= process.cwd()+'/public/javascripts/app'.split('/').join(path.sep)
        infered.out= process.cwd()+'/public/javascripts/app/main-built.js'.split('/').join(path.sep)
        infered.optimize = 'none'
        return infered

  server:
    path: "server.js"
    views:
      name: 'main'
      optimize:'uglify2'
      compileWith: 'handlebars'
      extension: 'hbs'

  csslint:
    exclude:[
      'stylesheets/site.scss'
      'stylesheets/starterkit.css'
   ]