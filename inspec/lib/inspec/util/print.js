(function(){var mod=function(require, exports){
  
  var merge = require('./misc').merge;
    
  var printArray = function(obj, opts) {
    var result = [];
    for (var i = 0; i < Math.min(opts.maxArray, obj.length); i++)
      result.push(print(obj[i], merge(opts, { maxArray: 3, maxString: 40 })));

    if (obj.length > opts.maxArray)
      result.push((obj.length - opts.maxArray) + ' more...');
    if (result.length == 0) return "[]"
      return "[ " + result.join(", ") + " ]";
  };

  var printElement = function(obj) {
    if (obj.nodeType == 1) {
      var result = [];
      var properties = [ 'className', 'id' ];
      var extra = {
        'input': ['type', 'name', 'value'],
        'a': ['href', 'target'],
        'form': ['method', 'action']
      };

      var extraProperties = extra[obj.tagName.toLowerCase()] || [];
      var allProperties = properties.concat(extraProperties);

      for(var i=0; i < allProperties.length; i++) {
        var property = allProperties[i];
        if(obj[property]){
          result.push(' ' + property.replace('className', 'class') + "=" + print(obj[property]))
        }
      }

      return "<" + obj.tagName.toLowerCase()
              + result.join('') + ">";
    }
  };

  var inArray = function(e, ary) {
    for(var i=0; i < ary.length; i++){
      if(ary[i] == e)
        return i;
    }
    return -1;
  };

  var printObject = function(obj, opts) {
    var seen = opts.seen || [];

    var result = [], key, value;
    for (var k in obj) {
      if (obj.hasOwnProperty(k) && inArray(obj[k], seen) < 0) {
        seen.push(obj[k]);
        value = print(obj[k], merge(opts, { maxArray: 6, maxString: 40, seen: seen }));
      } else
        value = "...";
      result.push(k + ": " + value);
    }
    if (result.length == 0) return "{}";
    return "{ " + result.join(", ") + " }";
  };

  var printString = function(value, opts) {
    var characterSubstitutions = {
      '\b': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"' : '\\"',
      '\\': '\\\\'
    };
    
    var r = /["\\\x00-\x1f\x7f-\x9f]/g;

    var str = r.test(value)
      ? '"' + value.replace(r, function (a) {
          var c = characterSubstitutions[a];
          if (c) return c;
          c = a.charCodeAt();
          return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
        }) + '"'
      : '"' + value + '"';
    if (str.length > opts.maxString)
      return str.slice(0, opts.maxString + 1) + '..."';
    else
      return str;
  };

  var print = function(obj, options) {
    var opts = merge({ maxArray: 10, maxString: 100 }, options);

    if (typeof obj == 'undefined')
      return "undefined";
    else if (typeof obj == 'boolean')
      return obj.toString();
    else if (!obj && typeof obj == 'number')
      return 'NaN';
    else if (!obj)
      return "null";
    else if (typeof obj == 'string')
      return printString(obj, opts);
    else if (obj instanceof RegExp)
      return obj.toString();
    else if (typeof obj == 'function' || obj instanceof Function)
      return obj.toString().match(/^([^)]*\))/)[1];
    else if (obj instanceof Array)
      return printArray(obj, opts);
    else if (obj.nodeType)
      return printElement(obj);
    else if (obj instanceof Error)
      return printObject(obj, merge(options, { maxString: 200 }));
    else if (obj instanceof Object)
      return printObject(obj, opts);
    else
      return obj.toString().replace(/\n\s*/g, '');
  };
  
  // exporting print function
  exports.print = print;
};require.install ? require.install('Inspec.util',mod) : mod(require, exports);})();