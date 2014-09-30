'use strict';

// Jasmine references the index.js in this repository
var gulp = require('gulp'),
  jasmine = require('../'),
  watch = require('gulp-watch');

// Default unit test
gulp.task('default', function () {
	return gulp.src('specs/unit/**.js').pipe(jasmine());
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

gulp.task('dev', function() {
    gulp.watch('./*.js', ['test-integration']);
});
