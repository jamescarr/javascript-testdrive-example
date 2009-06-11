(function(){var mod=function(require, exports){var Inspec = exports;
  Inspec.dsl  = require("./inspec/dsl").dsl;
  Inspec.util = require("./inspec/util").util;
  Inspec.Matchers = require("./inspec/matchers").matchers;
  Inspec.exceptions = require("./inspec/exceptions").exceptions;
  
  Inspec.Environment = require("./inspec/environment").Environment;
  Inspec.RhinoEnvironment = require("./inspec/environments/rhinoEnvironment").RhinoEnvironment;
  
  Inspec.Reporter = require("./inspec/reporter").Reporter;
  Inspec.ConsoleReporter = require("./inspec/reporters/consoleReporter").ConsoleReporter;
  
  Inspec.Class = require("./inspec/class").Class;
  Inspec.TreeNode = require("./inspec/treeNode").TreeNode;
  Inspec.Behavior = require("./inspec/behavior").Behavior;
  Inspec.Example = require("./inspec/example").Example;
  Inspec.ExampleGroup = require("./inspec/exampleGroup").ExampleGroup;
  Inspec.ExampleGroupManager = require("./inspec/exampleGroupManager").ExampleGroupManager;
  Inspec.Runner = require("./inspec/runner").Runner;
  Inspec.Expectation = require("./inspec/expectation").Expectation;
  
  
  Inspec.defaultOptions = require("./inspec/defaultOptions").defaultOptions;
  
  Inspec.load = function(){
    var files = [];
    while(arguments.length){
      var temp = Array.prototype.shift.call(arguments);
      if(temp.length && temp.length > 0){
        files = files.concat(temp);
      } else if(typeof temp == "string"){
        files.push(temp);
      }
    }
    var env = Inspec.Environment.getInstance();
    for(var i=0; i< files.length; i++){
      env.load(files[i]);
    }
    return this;
  };
  
  Inspec.run = function(){
    var env = Inspec.Environment.getInstance();
    env.run();
  }
};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
