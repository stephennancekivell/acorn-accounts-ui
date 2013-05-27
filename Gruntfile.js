module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      p: {
        files: {
          "target/compiled.css": "app/css/*.less"
        }
      }
    },
    watch: {
      less: {
        files: ['app/css/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      copy: {
        tasks: ['copy'],
        files: ['app/**/*.html'],
        options: {
          nospawn: true
        }
      },
      uglify: {
        tasks: ['uglify'],
        files: ['app/**/*.js'],
        options: {
          nospawn: true
        }
      },
      bower: {
        tasks: ['bower'],
        files: ['components/**/*'],
        options: {
          nospawn: true
        }
      }
    },
    uglify: {
      t: {
        files: {
          'target/app.min.js': ['app/**/*.js']
        }
      }
    },
    bower: {
      dev: {
        dest: 'target/components'
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['**/*.html'], dest: 'target/', cwd:'app/'} // includes files in path and its subdirs
        ]
      }
    },
    clean: ['target/**']
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'less', 'bower', 'uglify', 'copy']);
  grunt.registerTask('go', ['clean', 'less', 'bower', 'uglify', 'copy', 'watch']);
};