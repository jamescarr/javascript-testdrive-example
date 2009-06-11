(function(){var mod=function(require, exports){
  
  var TreeNode = require('./treeNode').TreeNode;
  var Environment = require('./environment').Environment;

  var Behavior = TreeNode.extend({
    init : function(description){
      this._super(description, []);
    },

    getExampleGroup : function(index){
      return this.getExampleGroups()[index];
    },

    addExampleGroup : function(exampleGroup){
      exampleGroup.setBehavior(this);
      return this.getExampleGroups().push(exampleGroup);
    }
  });

  Behavior.prototype.getExampleGroups = Behavior.prototype.getContent;
  Behavior.prototype.getDescription = Behavior.prototype.getName;

  Behavior.current = function(){
    return Environment.getInstance().getExampleGroupManager().currentBehavior;
  };
  
  exports.Behavior = Behavior;

};require.install ? require.install('Inspec',mod) : mod(require, exports);})();
