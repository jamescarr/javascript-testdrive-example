(function(){var mod=function(require, exports){

  var ExampleGroup = require('../exampleGroup').ExampleGroup;
  var Example = require('../example').Example;
  var BDD = {};
  
  BDD.describe = function(description, implementation){
    ExampleGroup.createExampleGroup(description, implementation);
  };

  BDD.shareExamplesFor = function(description, implementation){
    ExampleGroup.createExampleGroup(description, implementation, {shared : true});
  };

  BDD.it = function(description, implementation){
    Example.createExample(description, implementation);
  };

  BDD.beforeEach = function(implementation){
    ExampleGroup.addBeforeEach(implementation);
  };

  BDD.afterEach = function(implementation){
    ExampleGroup.addAfterEach(implementation);
  };

  BDD.beforeAll = function(implementation){
    ExampleGroup.addBeforeAll(implementation);
  };

  BDD.afterAll = function(implementation){
    ExampleGroup.addAfterAll(implementation);
  };
  
  // alias
  BDD.context = BDD.describe;
  BDD.sharedExamplesFor = BDD.shareExamplesFor;
  
  exports.BDD = BDD;
};require.install ? require.install('Inspec.dsl.BDD',mod) : mod(require, exports);})();