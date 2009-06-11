(function(){var mod=function(require, exports){
  
  var TreeNode = require('./treeNode').TreeNode;
  var Environment = require('./environment').Environment;
  var merge = require('./util/misc').merge;
  
  var ExampleGroup = TreeNode.extend({
    // constructor
    // An example group is concrete if implementation is given. Example groups that
    // are not concrete will later be solidified with the matching shared example 
    // groups. An example group is shared if the shared flag is set. Shared example
    // groups cannot be run directly, and will later become solidified.
    init : function(implementation, shared){
      this._super(ExampleGroup.getId(), implementation);
      this.examples = [];
      this.shared = false;
      if(shared)
        this.shared = true;
      this.defaultScope = {};
      this.behavior = null;
      this.before = {each : [], all : []};
      this.after  = {each : [], all : []};
    },

    setBehavior : function(behavior){
      this.behavior = behavior;
    },

    getBehavior : function(behavior){
      return this.behavior;
    },

    add : function(exampleGroup){
      this._super(exampleGroup);
      exampleGroup.initDefaultScope(exampleGroup);
    },

    //recursively sets the scope from it's parents
    initDefaultScope: function(exampleGroup){
      var parent = exampleGroup.getParent();

      if(parent)
        this.initDefaultScope(parent);

      this.defaultScope = merge(this.defaultScope, exampleGroup.defaultScope);
    },

    // returns the before each function
    getBeforeEach : function(index){
      return this.before.each[index];
    },

    // returns the after each function
    getAfterEach : function(index){
      return this.after.each[index];
    },

    // returns the before all function
    getBeforeAll : function(index){
      return this.before.all[index];
    },

    // return the after all function
    getAfterAll : function(index){
      return this.after.all[index];
    },

    // add before each for this example group
    addBeforeEach : function(fn){
      this.before.each.push(fn);
    },

    // add after each for this example group
    addAfterEach : function(fn){
      this.after.each.push(fn);
    },

    // add before all for tis example group
    addBeforeAll : function(fn){
      this.before.all.push(fn);
    },

    // add after all for this example group
    addAfterAll : function(fn){
      this.after.all.push(fn);
    },

    // add an example to this example group
    addExample : function(example){
      this.examples.push(example);
    },

    // indicates if this example group is shared
    isShared : function(){
      return this.shared;
    },

    // indicates if this example group is concrete
    isConcrete : function(){
      return (this.getImplementation() && typeof this.getImplementation() == 'function');
    },  

    //indicates if this example group has any examples
    hasExamples : function(){
      return (this.isConcrete() && this.examples.length > 0);
    }
  });

  // returns the implementation of the example group
  ExampleGroup.prototype.getImplementation  = ExampleGroup.prototype.getContent;
  ExampleGroup.prototype.setImplementation  = ExampleGroup.prototype.setContent;

  ExampleGroup._AUTO_ID = 0;

  ExampleGroup.getId = function(){
    return this._AUTO_ID++;
  }

  // returns current example group
  ExampleGroup.current = function(){
    return Environment.getInstance().getExampleGroupManager().currentExampleGroup;
  };

  // sets before each for current example group
  ExampleGroup.addBeforeEach = function(implementation){
    this.current().addBeforeEach(implementation);
  };

  // sets after each for current example group
  ExampleGroup.addAfterEach = function(implementation){
    this.current().addAfterEach(implementation);
  };

  // sets before all for current example group
  ExampleGroup.addBeforeAll = function(implementation){
    this.current().addBeforeAll(implementation);
  };

  // sets after all for current example group
  ExampleGroup.addAfterAll = function(implementation){
    this.current().addAfterAll(implementation);  
  };

  // creates an exmaple gorup and add it into examplegroup manager
  ExampleGroup.createExampleGroup = function(description, implementation, shared){
    var exampleGroup = new ExampleGroup(implementation, shared);
    Environment.getInstance().getExampleGroupManager().add(description, exampleGroup);
  };
  
  exports.ExampleGroup = ExampleGroup;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
