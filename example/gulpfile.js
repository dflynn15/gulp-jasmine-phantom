'use strict';

// Jasmine references the index.js in this repository
var gulp = require('gulp'),
    minijasmine = require('gulp-jasmine'),
    jasmine = require('../');


gulp.task('unit', function() {
    return gulp.src('specs/unit/**.js').pipe(jasmine());
});

gulp.task('jasmine', function() {
    return gulp.src('specs/unit/**.js').pipe(minijasmine());
});

gulp.task('test-unit-path', function() {
  return gulp.src('specs/unit/**.js')
    .pipe(jasmine({
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


gulp.task('dev', function() {
    gulp.watch('specs/unit/*.js', ['unit']);
});

gulp.task('multiple', ['default', 'test-integration']);

gulp.task('all', ['unit', 'test-unit-path', 'test-integration', 'test-path', 'multiple']);

gulp.task('default', []);
