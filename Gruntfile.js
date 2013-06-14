module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      p: {
        files: {
          "target/css/compiled.css": "app/css/*.less",
          "app/css/compiled.css": "app/css/*.less"
        }
      }
    },
    watch: {
      less: {
        files: ['app/css/*.less'],
        tasks: ['less'],
        options: {
          nospawn: false,
          livereload: true
        }
      },
      partials: {
        tasks: ['copy'],
        files: ['app/*/*.html'],
        options: {
          nospawn: false,
          livereload: true
        }
      },
      index: {
        tasks: ['preprocess:all'],
        files: ['app/index.html'],
        options: {
          nospawn: false,
          livereload: true
        }
      },
      uglify: {
        tasks: ['uglify'],
        files: ['app/js/**/*.js', 'app/lib/**/*.js'],
        options: {
          nospawn: false,
          livereload: true
        }
      }
    },
    uglify: {
      options: {
        // mangle: false,
        // compress: false,
        // beautify: true
      },
      t: {
        files: {
          'target/app.min.js': ['app/js/**/*.js', 'app/lib/**/*.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['*/*.html'], dest: 'target/', cwd:'app/'},
          {expand: true, src: ['**/*'], dest: 'target/components', cwd:'app/components'}
        ]
      }
    },
    clean: ['target/**'],
    compress: {
      main:{
        options: {
          archive: 'dist.zip'
        },
        files: [
          {cwd: 'target/', src:['**/*'], expand:true }
        ]
      }
    },
    preprocess:{
      all: {
        src: './app/index.html',
        dest: './target/index.html'
      }
    },
    env: {
      dev:{
        NODE_ENV: 'DEVELOPMENT'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');

  grunt.registerTask('default', ['clean', 'less', 'uglify', 'copy', 'preprocess:all', 'compress']);
  grunt.registerTask('dev', ['clean', 'less', 'uglify', 'copy', 'env:dev', 'preprocess:all']);
  grunt.registerTask('go', ['clean', 'less', 'uglify', 'copy', 'env:dev', 'preprocess:all', 'watch']);
};