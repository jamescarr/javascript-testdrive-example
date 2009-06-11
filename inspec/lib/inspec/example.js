(function(){var mod=function(require, exports){
  
  var Class = require('./class').Class;
  var ExampleGroup = require('./exampleGroup').ExampleGroup;
  
  var Example = Class.extend({
    // constructor
    init : function(exampleGroup, description, implementation, options){
      this.exampleGroup = exampleGroup;
      this.description = description;
      this.implementation = implementation;
      this.options = options;
    },

    // returns the description of this example
    getDescription : function(){
      return this.description;
    } 
  });

  // creates a new example and adds it to the current example group
  Example.createExample = function(description, implementation){
    var currentExampleGroup = ExampleGroup.current();
    if(!currentExampleGroup){
      throw new Error("Cannot Create examples outside of ExampleGroup!");
    }
    var example = new Example(currentExampleGroup, description, implementation);
    currentExampleGroup.addExample(example);
  };
  
  exports.Example = Example;
};require.install ? require.install('Inspec.dsl',mod) : mod(require, exports);})();
