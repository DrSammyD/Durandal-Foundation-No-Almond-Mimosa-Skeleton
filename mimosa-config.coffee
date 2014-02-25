exports.config =

  minMimosaVersion:'2.0.0'

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
    'web-package'
    'copy'
  ]

  watch:
    javascriptDir: 'javascripts/app'

  sass:
    lib: require('node-sass')
    extensions: ["sass", "scss"]
    includePaths: ['bower_components/foundation/scss']

  requireBuildTextPluginInclude:
    pluginPath: 'text'
    extensions: ['html']

  requireBuildInclude:
    folder:"javascripts"
    patterns: ['app/**/*.js', 'vendor/durandal/**/*.js']

  bower:
    copy:
      mainOverrides:
        "knockout.js":["knockout.js","knockout-2.3.0.debug.js"]
        
        "durandal": [
          {
            img: "../../images"
            js: "durandal"
            css: "durandal"
          }
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

  server:
    path: "server.js"
    views:
      compileWith: 'handlebars'
      extension: 'hbs'

  require:
    optimize:
      overrides:
        name: '../vendor/almond-custom'
        inlineText: true
        stubModules: ['text']
        pragmas:
          build: true