gulp-jasmine-phantom
=============

A gulp plugin that runs Jasmine tests with either PhantomJS or minijasminenode2.

Install
-----

```
$ npm install --save-dev gulp-jasmine-phantom
```

Usage
-----
```
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function () {
      return gulp.src('spec/test.js')
          .pipe(jasmine());
          });
```

Technologies Used
-----------------

* Node
* Gulp

Team Members
------------

* Daniel Flynn
* You!
