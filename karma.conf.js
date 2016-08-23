"use strict";

module.exports = function(karma) {

  karma.set({

    frameworks: [ "jasmine", "browserify", "chai", "fixture" ],

    files: [
      { pattern: "./ftw/candlestick/js/test/spec/**/*.js", watched: false, included: true, served: true },
      { pattern: "./ftw/candlestick/js/test/fixtures/**/*.html" }
    ],

    reporters: ['mocha'],

    mochaReporter: {
      showDiff: true
    },

    colors: true,

    preprocessors: {
      "./ftw/candlestick/js/test/**/*.js": "browserify",
      "./ftw/candlestick/js/test/fixtures/**/*.html": "html2js"
    },

    browserify: {
      debug: true,
      paths: ["./ftw/candlestick/js/src", "./ftw/candlestick/js/test/spec"],
      transform: [
        ["babelify", {
            presets: ["es2015"],
            sourceRoot: "../../src"
        }]
      ]
    },

    browsers: [ "PhantomJS" ],

    singleRun: false,
    autoWatch: true
  });
};
