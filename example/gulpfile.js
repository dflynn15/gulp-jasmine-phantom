'use strict';

// Jasmine references the index.js in this repository
var gulp = require('gulp'),
    minijasmine = require('gulp-jasmine'),
    jasmine = require('../');


// Default unit test
gulp.task('unit', function() {
    return gulp.src('specs/unit/**.js').pipe(jasmine());
});

gulp.task('unit-random', function() {
  return gulp.src('specs/unit/**.js').pipe(jasmine({
    random: true
  }));
});

// Unit test and keep the specRunner
gulp.task('test-unit-path', function() {
  return gulp.src('specs/unit/**.js')
    .pipe(jasmine({
      keepRunner: './'
    }));
});

// Throw a gulp error when tests fail
gulp.task('test-integration-abort', function() {
  return gulp.src('specs/unit/**.js')
    .pipe(jasmine({
      keepRunner: './',
      integration: true,
      abortOnFail: true
    }));
});

// Unit test with longer stack traces
gulp.task('test-unit-trace', function() {
  return gulp.src('specs/unit/**.js')
    .pipe(jasmine({
      includeStackTrace: true,
      keepRunner: './'
    }));
});

// Passing options in specifying integration tests
gulp.task('test-integration', function() {
  return gulp.src('specs/integration/integration.js')
    .pipe(jasmine({
      integration: true,
      keepRunner: false
    }));
});

//Keeps spec runner at a specific path
gulp.task('test-path', function() {
  return gulp.src('specs/integration/integration.js')
    .pipe(jasmine({
      integration: true,
      keepRunner: './'
    }));
});

//Use require in an integration test
gulp.task('test-vendor', function() {
  return gulp.src('specs/integration/require-integration.js')
    .pipe(jasmine({
      integration: true,
      vendor: 'vendor/*.js',
      keepRunner: './'
    }));
});


gulp.task('test-runner', function() {
  return gulp.src('specs/integration/require-integration.js')
    .pipe(jasmine({
      integration: true,
      specHtml: 'specRunner.html'
    }));
});

gulp.task('test-runner-abort', function() {
  return gulp.src('specs/integration/require-integration.js')
    .pipe(jasmine({
      integration: true,
      specHtml: 'specRunner.html',
      abortOnFail: true
    }));
});

gulp.task('jasmine-version', function() {
  return gulp.src('specs/integration/integration.js')
    .pipe(jasmine({
      jasmineVersion: '2.3',
      integration: true,
      abortOnFail: true
    }));
});

//Watch task
gulp.task('dev', function() {
    gulp.watch('specs/unit/*.js', ['test-vendor']);
});

gulp.task('multiple', ['default', 'test-integration']);

gulp.task('all', ['unit', 'test-unit-path', 'test-integration', 'test-path', 'multiple']);

gulp.task('default', []);
