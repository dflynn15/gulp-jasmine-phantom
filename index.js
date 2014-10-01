'use strict'
var path = require('path'),
    gutil = require('gulp-util'),
    through = require('through2'),
    handlebar = require('handlebars'),
    fs = require('fs'),
    execFile = require('child_process').execFile,
    jasmineCss = path.join(__dirname, '/vendor/jasmine-2.0/jasmine.css'),
    jasmineJs = [
      path.join(__dirname, '/vendor/jasmine-2.0/jasmine.js'),
      path.join(__dirname, '/vendor/jasmine-2.0/jasmine-html.js'),
      path.join(__dirname, '/vendor/jasmine-2.0/console.js'),
      path.join(__dirname, '/vendor/jasmine-2.0/boot.js')
    ],
    specPath = path.join(__dirname, '/lib/specRunner.html'),
    specRunner = path.join(__dirname, '/lib/specRunner.js');

module.exports = function (options) {
  options = options || {};

  /**
   * Removes the specRunner.html file
   **/
  var cleanup = function(path) {
    fs.unlink(path);
  };

  /**
   * Executes Phantom with the specified arguments
   * 
   * childArguments: Array of options to pass Phantom
   * [jasmine-runner.js, specRunner.html]
   **/
  var runPhantom = function(childArguments) {
      execFile('phantomjs', childArguments, function(error, stdout, stderr) {
        gutil.log('Start running specs');
        console.log(stdout);

        if (stderr !== '') {
            gutil.log('gulp-jasmine-phantom: Failed to open test runner ' + gutil.colors.blue(childArguments[1]));
            gutil.log(gutil.colors.red('error: '), stderr);
        }

        if(options.keepRunner === undefined || options.keepRunner === false) {
          cleanup(childArguments[1]);
        }
      }.bind(this));
  };

  // Write out the spec runner file
  var createRunner = function(newSpecPath, specCompiled, runFile) {
    fs.writeFile(newSpecPath, specCompiled ,function(error) {
      if (error) throw error;
      
      if(runFile) {
        var childArgs = [
          path.join(__dirname, '/lib/jasmine-runner.js'),
          newSpecPath
        ];
        runPhantom(childArgs);
      }
    });
  };

  var compileRunner = function(integrationTest) {
    fs.readFile(path.join(__dirname, '/lib/specRunner.handlebars'), 'utf8', function(error, data) {
      if (error) throw error;

      // Create the compile version of the specRunner from Handlebars
      var specData = handlebar.compile(data),
          specCompiled = specData({
            files: filePaths, 
            jasmine_css: jasmineCss, 
            jasmine_js: jasmineJs,
            spec_runner: specRunner 
          });
      
      if(options.keepRunner !== undefined && typeof options.keepRunner === 'string') {
        specPath = path.join(path.resolve(options.keepRunner), '/specRunner.html');
      }

      createRunner(specPath, specCompiled, integrationTest);
    });
  };
 
  /**
  * If we are processing integration tests with phantomjs
  **/
  if(!!options.integration) {

    // Reference to the file paths piped in
    gutil.log('Running Jasmine with PhantomJS');
    var filePaths = []; 
    return through.obj(
      function (file, encoding, callback) {
        
        if (file.isNull()) {
          callback(null, file);
          return;
        }
        
        // Currently not supporting streams
        if (file.isStream()) {
          callback(new gutil.PluginError('gulp-jasmine-phantom', 'Streaming not supported'));
        }
        
        filePaths.push(file.path);
        callback(null, file);
      }, function (callback) {
        try {
          compileRunner(true);
        } catch(error) {
          callback(new gutil.PluginError('gulp-jasmine-phantom', error));
        }
      } 
    );
  }

  var miniJasmineLib = require('minijasminenode2'),
      terminalReporter = require('./lib/terminal-reporter.js').TerminalReporter;

  gutil.log('Running Jasmine with minijasminenode2');
  var filePaths = [];
  return through.obj(
      function(file, encoding, callback) {
        if (file.isNull()) {
          callback(null, file);
          return;
        }
        
        if (file.isStream()) {
          callback(new gutil.PluginError('gulp-jasmine-phantom', 'Streaming not supported'));
          return;
        }
        
      miniJasmineLib.addSpecs(file.path);
      filePaths.push(file.path);
      callback(null, file);
    }, 
    function(callback) {
      try {
        miniJasmineLib.executeSpecs({
          reporter: new terminalReporter({}),
          showColors: true,
          includeStackTrace: true,
          onComplete: function(passed) {
            if(passed) {
              callback(null);
            } else {
              callback(new gutil.PluginError('gulp-jasmine-phantom', 'Tests failed', {showStack: false}));
            }
          }
        });

        if(options.keepRunner) {
          compileRunner();
        }
        
      } catch(error) {
        callback(new gutil.PluginError('gulp-jasmine-phantom', error));
      }
    }
  );
};
