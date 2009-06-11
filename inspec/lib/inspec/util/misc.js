(function(){var mod=function(require, exports){

  var clone = function(a) {
    var rv = {};
    for(var i in a) rv[i] = a[i];
    return rv;
  };

  var merge = function(a, b){
    var rv = clone(a);
    for(var i in b) rv[i] = b[i];
    return rv;
  };

  var getFunctionContent = function(fn){
    return fn.toString().match(/^[^\{]*{((.*\n*)*)}/m)[1];
  };

  var createImplementation = function(fnContent){
    return new Function("dsl", "matchers", "with (dsl){ with(matchers) {" + fnContent + " } }");
  };
  
  exports.merge = merge;
  exports.clone = clone;
  exports.getFunctionContent = getFunctionContent;
  exports.createImplementation = createImplementation;
  

};require.install ? require.install('Inspec.util',mod) : mod(require, exports);})();