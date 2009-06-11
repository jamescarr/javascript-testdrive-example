(function(){var mod=function(require, exports){
  var dsl = {};
  dsl.BDD = require('./dsl/bdd').BDD;
  
  exports.dsl = dsl;
};require.install ? require.install('Inspec.dsl',mod) : mod(require, exports);})();
