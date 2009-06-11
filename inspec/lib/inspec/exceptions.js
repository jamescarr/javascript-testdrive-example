(function(){var mod=function(require, exports){
  var Class = require('./class').Class;

  var exceptions = {};
    
  exceptions.Exception = Class.extend({
    init : function(message){
      if(message)
        this.message = message.toString();
    },

    toString : function(){
      return this.message;
    }
  });

  exceptions.ExpectationFailure = exceptions.Exception.extend({});
  exceptions.ExamplePending = exceptions.Exception.extend({});
  exceptions.NotImplemented = exceptions.Exception.extend({});
  exceptions.UnkownEnvironment = exceptions.Exception.extend({});
  
  exports.exceptions = exceptions;
};require.install ? require.install('Inspec',mod) : mod(require, exports);})();