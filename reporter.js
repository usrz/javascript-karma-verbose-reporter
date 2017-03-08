require('colors');
var util = require('util');

function VerboseReporter(logger, config) {

  /*
   * Known events:
   *
   * - run_start
   * - run_complete
   *
   * - browser_complete
   * - browser_error
   * - browser_log
   * - browser_process_failure
   * - browser_register
   * - browser_start
   * - browsers_change
   * - exit
   * - file_list_modified
   * - spec_complete
   */

  var _log = logger.create('report');
  var _browsers = null;
  var _tests = null;

  /* ======================================================================== */
  /* INTERNAL FUNCTIONS                                                       */
  /* ======================================================================== */

  function print() {
    process.stdout.write(util.format.apply(this, arguments));
    process.stdout.write('\n');
  }

  function forBrowser(browser) {
    /* onBrowserLog might arrive before onBrowserStart, sooo */
    if (_browsers[browser.id]) return _browsers[browser.id];
    return _browsers[browser.id] = {
      "name": browser.name,
      "successes": 0,
      "failures": 0,
      "skipped": 0,
      "total": 0,
      "log": []
    };
  }

  function message(result) {
    if (result.total > 0) {
      if (result.total == 1) {
        var message = [];
        if (result.successes) message.push("ok".green);
        if (result.failures)  message.push("failed".red);
        if (result.skipped)   message.push("skipped".yellow);
        return message.join(' ');
      } else {
        var message = [];
        if (result.successes) message.push((result.successes + " ok").green);
        if (result.failures)  message.push((result.failures  + " failed").red);
        if (result.skipped)   message.push((result.skipped   + " skipped").yellow);
        return message.join(', ');
      }
    } else {
      return "no tests".magenta;
    }
  }

  function report(tests, indent) {
    if (! tests) return;
    indent = indent || '';

    if (tests.results) {
      var results = Object.keys(tests.results);
      for (var i in results) {
        var result = tests.results[results[i]];
        print(indent, '*', results[i], ':', message(result));
      }
    }

    if (tests.suites) {
      var suites = Object.keys(tests.suites);
      for (var i in suites) {
        print(indent, '-', suites[i].bold, ':');
        report(tests.suites[suites[i]], '  ' + indent);
      }
    }

  };

  /* ======================================================================== */
  /* RUN START/COMPLETE                                                       */
  /* ======================================================================== */

  this.onRunStart = function(browsers) {
    _browsers = {};
    _tests = {suites: {}};
  };

  this.onRunComplete = function(browsers, results) {

    for (var i in _browsers) {
      var browser = _browsers[i];
      var log = logger.create(browser.name);
      browser.log.forEach(function(entry) {
        (log[entry.level] || log.info).call(log, entry.message);
      });
      browser.log = [];
    }

    print("\n");
    print("Suites and tests results:".bold.underline);
    print();
    report(_tests);

    print();
    print("Browser results:".bold.underline)
    print();

    for (var i in _browsers) {
      var browser = _browsers[i];
      print(" - " + browser.name.bold + ": " + browser.total + " tests");
      print("   - " + message(browser));
    }

    print();
  };

  /* ======================================================================== */
  /* BROWSER START/LOG/ERROR                                                  */
  /* ======================================================================== */

  this.onBrowserStart = function(browser) {
    logger.create(browser.name).info("Starting tests", browser.id);
  };

  this.onBrowserLog = function(browser, message, level) {
    if (level == 'log') level = 'info';
    if (config && config.immediateLogs) {
      var log = logger.create(browser.name);
      (log[level] || log.info).call(log, message);
    } else {
      forBrowser(browser).log.push({level: level, message: message});
    }
  };

  this.onBrowserError = function(browser, error) {
    logger.create(browser.name).error(error);
  };

  this.onSpecComplete = function(browser, result) {
    var suite = '';
    var tests = _tests;
    var b = forBrowser(browser);

    for (var i in result.suite) {
      var suiteName = result.suite[i];
      suite += (', ' + suiteName);

      if (! tests.suites) tests.suites = {};
      if (! tests.suites[suiteName]) tests.suites[suiteName] = {};
      tests = tests.suites[suiteName];
    }

    suite = suite.length > 2 ? ' | ' + suite.substring(2) + ' | ' : ' | ';

    var log = logger.create(browser.name + suite + result.description);

    b.log.forEach(function(entry) {
      (log[entry.level] || log.info).call(log, entry.message);
    });
    b.log = [];

    if (! tests.results) tests.results = {};
    if (! tests.results[result.description]) {
      tests.results[result.description] = {
        "successes": 0,
        "failures": 0,
        "skipped": 0,
        "total": 0
      };
    }
    var results = tests.results[result.description];

    b.total ++;
    results.total ++;

    if (result.skipped) {
      b.skipped ++;
      results.skipped ++;
      log.warn('Test skipped');
    } else if (result.success) {
      b.successes ++;
      results.successes ++;
      log.info('Success: ' + result.time + ' ms');
    } else {
      b.failures ++;
      results.failures ++;
      for (var i in result.log) {
        log.error(result.log[i]);
      }
    }
  };

  this.adapters = [];
}

/* ========================================================================== */
/* MODULE DECLARATION                                                         */
/* ========================================================================== */

VerboseReporter.$inject = ['logger', 'config.verboseReporter'];

module.exports = {
  'reporter:verbose': ['type', VerboseReporter]
};
