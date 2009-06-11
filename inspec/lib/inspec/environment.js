(function(){var mod=function(require, exports){
  
  var Class = require('./class').Class;
  var Messenger = require('./util/messenger').Messenger;
  var ExampleGroupManager = require('./exampleGroupManager').ExampleGroupManager;
  var Runner = require('./runner').Runner;
  var createImplementation = require('./util/misc').createImplementation;
  var NotImplemented = require('./exceptions').exceptions.NotImplemented;
  var UnkownEnvironment = require('./exceptions').exceptions.UnkownEnvironment;
  
  var Environment = Class.extend({
    init : function(){
      this.initFacility();
    },

    initFacility : function(){
      this.messenger = new Messenger();
      this.exampleGroupManager = new ExampleGroupManager();
      var reporter = this.reporterClass();
      this.reporter = new reporter(this.messenger);
      this.runner = new Runner(this.exampleGroupManager.behaviorRoot, this.exampleGroupManager.exampleGroupRoot, this.messenger);
    },

    getExampleGroupManager : function(){
      return this.exampleGroupManager;
    },

    getMessenger : function(){
      return this.messenger;
    },

    getReporter : function(){
      return this.reporter;
    },

    getRunner : function(){
      return this.runner;
    },

    run : function(){
      this.runner.execute();
    },

    load : function(location){
      var fn = createImplementation(this.loadFile(location));
      var matchers = require('./matchers').matchers;
      var bdd = require('./dsl/bdd').BDD;
      
      fn.call({}, bdd, matchers);
    },

    reporterClass : function(){
      throw new NotImplemented();
    },

    loadFile : function(location){
      throw new NotImplemented();
    },

    log : function(msg){
      throw new NotImplemented();
    }
  });
  
  var _instance = null;

  Environment.getInstance = function(){
    if(typeof _instance === "undefined" || _instance === null){
      var env;

    	if( typeof navigator !== "undefined" && navigator !== null )
  		  env = require('./environments/browserEnvironment').BrowserEnvironment;
  	  else if(typeof load !== "undefined" && load !== null )
  	    env = require('./environments/rhinoEnvironment').RhinoEnvironment;
  	  else if(typeof WScript !== "undefined" && WScript !== null)
  	    env = require('./environments/wscriptEnvironment').WScriptEnvironment;
  		else
  		  throw new UnkownEnvironment();

		  _instance = new env();

    }
    return _instance;
  };
  
  exports.Environment = Environment;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
