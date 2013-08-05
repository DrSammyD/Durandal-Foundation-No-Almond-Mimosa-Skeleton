exports.config =
  minMimosaVersion:'0.14.6'

  modules: ['server', 'require', 'minify', 'live-reload', 'combine', 'requirebuild-textplugin-include']

  combine:
    folders: [
      {
        folder:'Content'
        output:'Content/styles.css'
        order: ['bootstrap.css', 'bootstrap-responsive.css']
        exclude: [/[\\\/]font[\\\/]/, /[\\\/]images[\\\/]/]
      }
      {
        folder:'Scripts'
        output:'Scripts/vendor.js'
        order: ['jquery-1.9.1.js', 'knockout-2.2.1.js']
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