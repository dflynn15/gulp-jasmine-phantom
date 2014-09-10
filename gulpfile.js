'use strict';
var gulp = require('gulp'),
  jasmine = require('./'),
  watch = require('gulp-watch');

// Default unit test
gulp.task('default', function () {
	return gulp.src('specs/unit/**.js').pipe(jasmine());
});

// Passing options in specifying integration tests
gulp.task('test-integration', function() {
  return gulp.src('specs/integration.js')
    .pipe(jasmine({
      integration: true,
      keepRunner: false
    }));
});

gulp.task('dev', function() {
    gulp.watch('./*.js', ['test-integration']);
});
