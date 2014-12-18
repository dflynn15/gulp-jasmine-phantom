var system = require('system'),
    hasTestFailures = false,
    page = require('webpage').create(),
    errorRegEx = /^\d+ specs.*failure/,
    finishRegEx = /^Finished in \d*\.\d* second/;

if (system.args.length !== 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit(1);
}


// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);

    if(msg.match(errorRegEx) !== null) {
      hasTestFailures = true;
    }

    if(msg.match(finishRegEx) !== null) {
      phantom.exit(hasTestFailures ? 1 : 0);
    }
};

page.open(system.args[1], function(status) {
    if (status !== "success") {
      console.log("Couldn't load the page");
    }
    system.stdout.writeLine("");
});

