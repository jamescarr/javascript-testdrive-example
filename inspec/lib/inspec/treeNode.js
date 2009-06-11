(function(){var mod=function(require, exports){
  
  var Class = require('./class').Class;
  var TreeNode = require('./util/treeNode').TreeNode;
  
  // classify TreeNode
  var TreeNodeClass = Class.extend(TreeNode.prototype);
  TreeNodeClass.prototype.init = TreeNode;
  
  exports.TreeNode = TreeNodeClass;
  
};require.install ? require.install('Inspec.dsl',mod) : mod(require, exports);})();

