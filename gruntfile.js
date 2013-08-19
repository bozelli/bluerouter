/* jslint node: true */
'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'gruntfile.js',
                'server.js',

                'package.json',
                'configuration.json'
            ]
        },
        mochacli: {
            options: {
                require: ['chai'],
                recursive: true,
                bail: true,
                ui: 'tdd'
            },
            unit: {
                options: {
                    files: 'tests/**/*.test.js'
                }
            }
        }
    });

    // Load the plugin.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'mochacli:unit']);
};