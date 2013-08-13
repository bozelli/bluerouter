/* jslint node: true */
'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'gruntfile.js',
                'app.js',

                'package.json',
                'configuration.json'
            ]
        },
        mochacli: {
            options: {
                require: ['chai'],
                recursive: true,
                bail: true,
                ui: 'tdd',
                files: 'tests/**/*.test.js'
            }
        }
    });

    // Load the plugin.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mochacli']);
};