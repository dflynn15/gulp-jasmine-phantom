gulp-jasmine-phantom
=============

A gulp plugin that runs Jasmine tests with either PhantomJS or minijasminenode2.

Dependencies
------------

Before you install `gulp-jasmine-phantom` please enusre that you have PhantomJS
installed on your machine. The plugin assumes that the `phantomjs` binary is
available in the PATH and executable from the command line.


Install
-----

```
$ npm install --save-dev gulp-jasmine-phantom
```

Usage
-----

Basic useage:
```
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function () {
  return gulp.src('spec/test.js')
          .pipe(jasmine());
});
```

For integrations tests:
```
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function() {
  return gulp.src('spec/test.js')
          .pipe(jasmine({
            integration: true
          }));
});
```

Technologies Used
-----------------

* Node
* Gulp

Team Members
------------

* Daniel Flynn
* Rob Tarr
* You!
