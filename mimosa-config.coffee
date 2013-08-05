exports.config =
  minMimosaVersion:'0.14.6'

  modules: ['server', 'require', 'minify', 'live-reload', 'combine', 'requirebuild-textplugin-include', 'web-package', 'bower']

  combine:
    folders: [
      {
        folder:'Content'
        output:'Content/styles.css'
        order: ['bower/bootstrap/bootstrap.css', 'bower/bootstrap/bootstrap-responsive.css']
        exclude: [/[\\\/]font[\\\/]/, /[\\\/]images[\\\/]/]
      }
      {
        folder:'Scripts'
        output:'Scripts/vendor.js'
        order: ['bower/jquery/jquery.js', 'bower/knockout.js/knockout.js']
      }
    ]

  watch:
    javascriptDir: 'App'

  vendor:
    javascripts:"Scripts"
    stylesheets:"Content"

  server:
    path: "server.js"
    views:
      compileWith: 'handlebars'
      extension: 'hbs'

  requireBuildTextPluginInclude:
    pluginPath: 'text'
    extensions: ['html']

  require:
    optimize:
      overrides:
        name: 'durandal/amd/almond-custom'
        inlineText: true
        stubModules: ['text']
        paths:
          text: 'durandal/amd/text'

  bower:
    copy:
      outRoot: "bower"
      forceLatest:true
      mainOverrides:
        sammy:["lib/sammy.js"]
        bootstrap:["docs/assets/js/bootstrap.js", "docs/assets/css/bootstrap.css", "docs/assets/css/bootstrap-responsive.css"]