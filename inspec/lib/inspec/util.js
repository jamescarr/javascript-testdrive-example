(function(){var mod=function(require, exports){
  var util = {};
  
  util.Messenger = require('./util/messenger').Messenger;
  util.TreeNode = require('./util/treeNode').TreeNode;
  util.print = require('./util/print').print;
  
  var misc = require('./util/misc');
  for(var key in misc) util[key] = misc[key];
  
  exports.util = util;
  
};require.install ? require.install('Inspec.util',mod) : mod(require, exports);})();