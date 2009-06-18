var placeholderTestCase = (function(){
  var PLACEHOLDER_TEXT = "Enter Your Name";
  var assert = YAHOO.util.Assert;
  
  var test = new YAHOO.tool.TestCase({
    name:"HTML5 Placeholder Emulator Test",
    setUp:function(){
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
    },
    testRemovePlaceholderOnFocus:function(){
      this.emulator.emulatePlaceholders();
      
      this.input.focus();
      
      assert.areEqual("",this.input.val());
    },
    testThatPlaceholderIsPutBackIfValueIsEmptyOnBlur:function(){
      this.emulator.emulatePlaceholders();
      
      this.input.val("");
      this.input.blur();
      
      assert.areEqual(PLACEHOLDER_TEXT,this.input.val());
    },
    testShouldNotReplaceWithPlaceholderTextIfDifferentValueIsPresentOnBlur:function(){
      this.emulator.emulatePlaceholders();
      
      this.input.val("My name is James");
      this.input.blur();
      
      assert.areEqual("My name is James",this.input.val());
    },
    testShouldNotBlankValueIfItIsSetToSomethingDifferentThanPlaceholder:function(){
      this.emulator.emulatePlaceholders();
      
      this.input.val("My name is James");
      this.input.focus();
      
      assert.areEqual("My name is James",this.input.val());
    }
  });
  return test;
})();

