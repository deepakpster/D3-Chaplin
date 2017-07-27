exports.config = {
  files: {
    javascripts: {
      joinTo: {
        'javascripts/app.js': /^app/,
        'javascripts/vendor.js': /^(?!app)/
      }
    },
    stylesheets: {
      joinTo: 'stylesheets/app.css'
    },
    templates: {
      joinTo: 'javascripts/app.js'
    }
  },
  plugins: {
    copycat: {
      "css": ["bower_components/bootstrap/dist/css/bootstrap.css", "bower_components/bootstrap/dist/css/bootstrap.css.map"],
      verbose: true, //shows each file that is copied to the destination directory 
      onlyChanged: true //only copy a file if it's modified time has changed (only effective when using brunch watch) 
    },
    sass: {
      debug: 'comments',
      options: {
        includePaths: [
          'app/views/styles/scss'
        ]
      }
    }
  },
  npm: {
    aliases: {
      backbone: 'exoskeleton'
    },
    globals: {
      _cp: 'console-polyfill',
      $: 'jquery'
    }//,
    // styles: {
    //   'normalize.css': ['normalize.css']
    // }
  }
};
