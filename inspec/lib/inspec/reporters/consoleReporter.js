(function(){var mod=function(require, exports){
  
  var Reporter = require('../reporter').Reporter
  var ExpectationFailure = require('../exceptions').exceptions.ExpectationFailure;
  
  var ConsoleReporter = Reporter.extend({
    onStartTest : function(message){
      this.log("Start Test");
    },

    onEndTest : function(message){
      this.log("End Test");
    },

    onStartExampleGroup : function(message){
    },

    onEndExampleGroup : function(message){
      var exampleGroup = message.exampleGroup;
      var error = message.error;
      if(error){
        this.log(this.getExampleGroupDescription(exampleGroup));
        if(error instanceof ExpectationFailure){
          this.log("Failure : " + error);
        } else if(error instanceof Error){
          this.log("Error : " + error);
        }
      }
    },

    onStartExample : function(message){
       this.log(this.getDescription(message.example));
    },

    onEndExample : function(message){
      var example = message.example;
      var success = message.success;
      var error = message.error;
      if(success)
        this.log("success");
      else{
        if(error instanceof ExpectationFailure){
          this.log("Failure : " + error);
        } else if(error instanceof Error){
          this.log("Error : " + error);
        }
      }
    }
  });
  
  exports.ConsoleReporter = ConsoleReporter;

};require.install ? require.install('Inspec.dsl',mod) : mod(require, exports);})();
