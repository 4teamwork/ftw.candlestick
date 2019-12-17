module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    browserify: {
      options: {
        browserifyOptions: {
          standalone: "<%= pkg.name %>"
        }
      },
      dist: {
        options: {
          paths: ["./ftw/candlestick/js/src", "./ftw/candlestick/js/test/spec"],
          transform: [
            ["babelify", {
              presets: "es2015"
            }],
            "browserify-shim"
          ]
        },
        files: {
          "./ftw/candlestick/resources/<%= pkg.name %>.js": ["./ftw/candlestick/js/src/<%= pkg.name %>.js"]
        }
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "./ftw/candlestick/resources",
          paths: {
              jquery: "empty:",
          },
          name: "main",
          out: "./ftw/candlestick/resources/candlestick-compiled.js",
        },
      },
    },

    karma: {
      options: {
        configFile: "karma.conf.js"
      },
      dev: {
        browsers: ["PhantomJS", "Chrome"]
      },
      ci: {
        browsers: ["PhantomJS"],
        autoWatch: false,
        singleRun: true
      }
    },

    watch: {
      scripts: {
        files: [
          "./ftw/candlestick/js/src/**/*.js",
          "./ftw/candlestick/resources/*.js",
          "!./ftw/candlestick/resources/candlestick-compiled.js",
          "!./ftw/candlestick/resources/ftw.candlestick.js",
        ],
        tasks: ["browserify", "requirejs" ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-karma");
  grunt.loadNpmTasks("grunt-contrib-requirejs");

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["browserify", "requirejs"]);
  grunt.registerTask("compile", ["requirejs"]);
  grunt.registerTask("test", ["karma:dev"]);
  grunt.registerTask("test-ci", ["karma:ci"]);

};
