module.exports = function (grunt) {
  // load grunt tasks automatically
  require('load-grunt-tasks')(grunt, {
    pattern: [
      'grunt-*'
    ]
  });

  grunt.initConfig({
    pkg:    grunt.file.readJSON('package.json')
  });

  grunt.loadTasks('grunt');

  grunt.registerTask('default', 'Running development environment…', [
    'connect',
    'watch'
  ]);

};
