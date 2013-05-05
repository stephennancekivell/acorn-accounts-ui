module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      p: {
        files: {
          "app/css/compiled.css": "app/css/*.less"
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less']);
  grunt.registerTask('go', ['less', 'watch']);
};