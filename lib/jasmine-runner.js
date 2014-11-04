var system = require('system');

if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}

var page = require('webpage').create();
var failureRegEx = /, \d+ failure/;
var finishRegEx = /^Finished in \d*\.\d* second/;
var pass = true;

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);

    if(msg.match(failureRegEx) !== null) {
      pass = false;
    }

    if(msg.match(finishRegEx) !== null) {
      phantom.exit(pass ? 0 : 1);
    }
};

page.open(system.args[1], function(status) {
    if (status !== "success") {
      console.log("Couldn't load the page");
    }
    system.stdout.writeLine("");
});

