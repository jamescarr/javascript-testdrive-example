(function(){var mod=function(require, exports){
  
  var Environment = require('../environment').Environment;
  var ConsoleReporter = require('../reporters/consoleReporter').ConsoleReporter;
  
  var RhinoEnvironment = Environment.extend({
    reporterClass : function(){
      return ConsoleReporter;
    },

    loadFile : function(location){
      return readFile(location);
    },

    log : function(msg){
      print(msg);
    }
  });
  
  exports.RhinoEnvironment = RhinoEnvironment;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
