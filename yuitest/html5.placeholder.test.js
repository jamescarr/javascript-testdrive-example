var placeholderTestCase = (function(){
  var assert = YAHOO.util.Assert;
  var PLACEHOLDER_TEXT = "Enter Your Name";

  var test = new YAHOO.tool.TestCase({
    name:"HTML5 Placeholder Emulator Test",
    setup:function(){
      var sandbox = $('<div><input type="text" id="foo" placeholder="'+PLACEHOLDER_TEXT+'"></div>');
      this.emulator = new jamescarr.tddexample.Html5Emulator(sandbox);
      this.input = $('#foo', sandbox);
    },
    tearDown:function(){
      delete this.emulator;
      delete this.input;
    },
    testValueIsPopulatedWithPlaceholderAttribute:function(){
      this.emulator.emulatePlaceholders();
      
      assert.areEqual(PLACEHOLDER_TEXT, this.input.val());
    }
  });
  return test;
})();

