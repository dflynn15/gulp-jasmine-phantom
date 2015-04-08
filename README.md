gulp-jasmine-phantom
=============

A gulp plugin that runs Jasmine tests with either PhantomJS or minijasminenode2.

Dependencies
------------

Before you install `gulp-jasmine-phantom` please enusre that you have PhantomJS
installed on your machine. The plugin assumes that the `phantomjs` binary is
available in the PATH and executable from the command line.

**If you do not have `phantomjs` installed please install following
[these directions.](http://phantomjs.org/download.html)

Install
-----

```
$ npm install --save-dev gulp-jasmine-phantom
```

Usage
-----
By default `gulp-jasmine-phantom` runs your tests with `minijasminenode` and
not `phantomjs`.
This is in an effort to keep your tasks running as quickly as possible!

Basic useage:
```javascript
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function () {
  return gulp.src('spec/test.js')
          .pipe(jasmine());
});
```
To use `phantomjs` for tests (ie: integration tests) use the following setup:

```javascript
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('default', function() {
  return gulp.src('spec/test.js')
          .pipe(jasmine({
            integration: true
          }));
});
```

Also, remember you can always run any multitude of tests using different Gulp
tasks. For example, running unit tests and integration tests asynchronously.

```javascript
var gulp = require('gulp');
var jasmine = require('gulp-jasmine-phantom');

gulp.task('unitTests', function () {
  return gulp.src('spec/test.js')
          .pipe(jasmine());
});

gulp.task('integrationTests', function() {
  return gulp.src('spec/test.js')
          .pipe(jasmine({
            integration: true
          }));
});
```

Options
-------

#### integration
Type: `boolean` <br />
Default: false

Run your tests with `phantomjs`

#### keepRunner
Type: `boolean | string` <br />
Default: false

Keep the `specRunner.html` file after build. If given a string, it will keep
the runner at the string path.

#### includeStackTrace
Type: `boolean` <br />
Default: false

Prints out a longer stack trace for errors.

#### abortOnFail
Type: `boolean`<br />
Default: false

**Currently built with integration mode only** <br />
Exits Gulp with an status of 1 that will halt any further Gulp tasks.

#### specHtml
Type: `string` <br />
Default: null

**Only use in combination with `integration: true`**

Allows you to specify the HTML runner that Jasmine uses **only** during
integration tests.

#### vendor
Type: `string|array` <br />
Default: null

**Only use in combination with `integration: true`**

A list of vendor scripts to import into the HTML runner, either as file 
globs (e.g. `"**/*.js"`) or fully-qualified URLs (e.g. 
`"http://my.cdn.com/jquery.js"`).

This option accepts either a single string or an array of strings (e.g. 
`["test/*.js", "http://my.cdn.com/underscore.js"]`).

Technologies Used
-----------------

* Node
* Gulp
