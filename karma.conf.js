// Karma configuration
// Generated on Thu Nov 03 2016 22:41:07 GMT-0400 (Hora de verano del Este)

module.exports = function (karma) {
  karma.set({

    // frameworks to use
    frameworks: [ 'browserify', 'jasmine' ],

    // list of files/patterns to load in the browser
		files: [
			// our test files
			'libs/test/**/*.js'
    ],

    // preprocess matching files before serving them to the browser
		preprocessors: {
			'libs/test/**/*.js': [ 'browserify' ]
    },

    // test results reporter to use
		// - added by karma-spec-reporter module
    reporters: ['spec'],

    // level of logging
    logLevel: karma.LOG_INFO,

    // enable/disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Continuous Integration mode		
		singleRun: true,

    // start these browsers
    browsers: ['Firefox'],
  });
};
