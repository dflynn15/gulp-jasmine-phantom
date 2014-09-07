'use strict'
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function (options) {
  options = options || {};
  
  var miniJasmineLib = require('minijasminenode2');
  
  return through.obj(
      // -----------------
      // Transform function
      // Takes in each file and adds it to the list of specs
      //
      // TODO: seperate unit tests from integration tests
      // -----------------
      function(file, encoding, callback) {
        // If file is null exit with callback
        if (file.isNull()) {
          callback(null, file);
          return;
        }
        
        // -----------------
        // Currently do not support streams
        // -----------------
        if (file.isStream()) {
			    callback(new gutil.PluginError('gulp-jasmine-phantom', 'Streaming not supported'));
			    return;
		    }
        
        // If they are integration tests than use phantom
        if(!!options.integration) {
           
        } else {
          miniJasmineLib.addSpecs(file.path);
        }
        callback(null, file);
    }, 
    // -----------------
    // Flush function
    // Finishes up the stream and runs all the test cases that have been provided
    //
    // TODO: Run unit tests and integration tests seperately
    // -----------------
    function(callback) {
      try {
        miniJasmineLib.executeSpecs({
          isVerbose: true,
          includeStackTrace: true,
          onComplete: function(passed) {
            if(passed) {
              callback(null);
            } else {
              callback(new gutil.PluginError('gulp-jasmine-phantom', 'Tests failed', {showStack: false}));
            }
          }
        });
      } catch(error) {
        callback(new gutil.PluginError('gulp-jasmine-phantom', err));
      }
    }
  );
};
