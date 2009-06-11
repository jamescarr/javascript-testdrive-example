(function(){var mod=function(require, exports){
  
  var Class = require("./class").Class;

  var getFunctionContent = require("./util/misc").getFunctionContent;
  var createImplementation = require("./util/misc").createImplementation;
  
  var ExampleGroupManager = Class.extend({
    // creates an exmaple group manager
    init : function(){
      var Behavior = require("./behavior").Behavior;
      var ExampleGroup = require("./exampleGroup").ExampleGroup;
      
      this.sharedExampleGroups = {};
      this.behaviorRoot = new Behavior('root');
      this.exampleGroupRoot = new ExampleGroup('root');
      this.currentBehavior = this.behaviorRoot;
      this.currentExampleGroup = this.exampleGroupRoot;
    },

    // Add an example group to shared for later use if the example group is
    // shared. Add an example group to standard if it is not shared. If the
    // added example group is concrete, we initialize it. If the added example
    // group is not concrete, it will later be solidified using a shared example
    // group.
    add : function(description, exampleGroup){
      if(exampleGroup.isShared()){
        this.sharedExampleGroups[description] = exampleGroup;
      } else {
        var behavior = this.findOrCreateBehavior(description);
        behavior.addExampleGroup(exampleGroup);
        this.currentExampleGroup.add(exampleGroup);
        this.initExampleGroup(exampleGroup);
      }
    },

    findOrCreateBehavior : function(description){
      var Behavior = require("./behavior").Behavior;
      return (this.currentBehavior.get(description) || this.currentBehavior.add(new Behavior(description)));
    },

    solidify : function(implementation){
      var implementationContent = getFunctionContent(implementation);
      var regex = /itShouldBehaveLike\s*[(]\s*(?:['"])(.*?)(?:['"])\s*[)]\s*;*/m;
      if(!regex.test(implementationContent)) return implementation;

      var results, sharedExampleGroup, match, description, sharedContent;
      while(results = regex.exec(implementationContent)){
        match = results[0];
        description = results[1];
        sharedExampleGroup = this.sharedExampleGroups[description];

        if(!sharedExampleGroup)
          throw new Error("Shared Behavior: '" + description + "' not found! Did you include it before this script?");

        sharedContent = getFunctionContent(sharedExampleGroup.getImplementation());
        implementationContent = implementationContent.replace(match, sharedContent);
      }

      return function(){
        var bdd = require("./dsl/bdd").BDD;
        var matchers = require("./matchers").matchers;
        createImplementation(implementationContent).call(this, bdd, matchers);
      };
    },

    // initializes an example group. Do nothing if the example group is not
    // concrete. Because it doesn't have an implementation. It sets the current
    // exaple group first, then runs the implementation of the example group,
    // finally, it sets the current example group to the parent example group.
    initExampleGroup : function(exampleGroup){
      if(!exampleGroup.isConcrete())
        return;

      this.currentBehavior = exampleGroup.getBehavior();
      this.currentExampleGroup = exampleGroup;

      exampleGroup.setImplementation(this.solidify(exampleGroup.getImplementation()));
      exampleGroup.getImplementation().call(exampleGroup.defaultScope);

      this.currentBehavior = exampleGroup.getBehavior().getParent();
      this.currentExampleGroup = exampleGroup.getParent();
    },

    // returns the current example group
    currentExampleGroup : function(){
      return this.current.getContent();
    }
  });
  
  exports.ExampleGroupManager = ExampleGroupManager;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
