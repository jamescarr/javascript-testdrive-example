(function(){var mod=function(require, exports){
  
  var Class = require('./class').Class;
  var Environment = require('./environment').Environment;
  var NotImplemented = require('./exceptions').exceptions.NotImplemented;
  
  var Reporter = Class.extend({
    init : function(messenger){
      this.messenger = messenger;
      this.subscribeMessages();
    },

    log : function(msg){
      Environment.getInstance().log(msg);
    },

    subscribeMessages : function(){
      this.messenger.on("beginTest", this.onStartTest, this);
      this.messenger.on("endTest", this.onEndTest, this);
      this.messenger.on("beginExampleGroup", this.onStartExampleGroup, this);
      this.messenger.on("endExampleGroup", this.onEndExampleGroup, this);
      this.messenger.on("beginExample", this.onStartExample, this);
      this.messenger.on("endExample", this.onEndExample, this);
    },

    getExampleGroupDescription : function(exampleGroup){
      var parent = exampleGroup.getParent();
      var behavior = exampleGroup.getBehavior();

      var description = behavior ? behavior.getDescription() : "";

      if(parent)
        description = this.getExampleGroupDescription(parent) + " " + description;
      return description;
    },

    getDescription : function(example){
      var desc =  this.getExampleGroupDescription(example.exampleGroup)
        + " " + example.getDescription();
      return desc;
    },

    onStartTest : function(message){
      throw new NotImplemented();
    },

    onEndTest : function(message){
      throw new NotImplemented();
    },

    onStartExampleGroup : function(message){
      throw new NotImplemented();
    },

    onEndExampleGroup : function(message){
      throw new NotImplemented();
    },

    onStartExample : function(message){
      throw new NotImplemented();
    },

    onEndExample : function(message){
      throw new NotImplemented();
    }
  });
  
  exports.Reporter = Reporter;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
