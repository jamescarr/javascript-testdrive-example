function Html5EmulatorTest(name)
{
    TestCase.call( this, name );
}
Html5EmulatorTest.prototype = new TestCase();
Html5EmulatorTest.prototype.setUp = function(){
  var sandbox = $('<div></div>')
  this.emulator = new Html5Emulator(sandbox);
  this.PLACEHOLDER_TEXT = "placeholder text is here";
   sandbox.append('<input id="foo" type="text" value="" placeholder="'+this.PLACEHOLDER_TEXT+'"');
   this.input = $('#foo', sandbox);
}
Html5EmulatorTest.prototype.testValueIsPopulatedByPlaceholder = function(){
  this.emulator.emulatePlaceholders();
  
  this.assertEquals(this.PLACEHOLDER_TEXT, this.input.val());
}

Html5EmulatorTest.prototype.testValueIsBlankedOnFocus = function(){
  this.emulator.emulatePlaceholders();
  
  this.input.focus()
  
  this.assertEquals("", this.input.val());
}

Html5EmulatorTest.prototype.testValueIsNotBlankedOnFocusIfNotPlaceholder = function(){
  this.emulator.emulatePlaceholders();
  
  this.input.val("Foobar")
  this.input.focus()
  
  this.assertEquals("Foobar", this.input.val());
}

Html5EmulatorTest.prototype.testPlaceholderIsReturnedOnBlur = function(){
  this.emulator.emulatePlaceholders();
  
  this.input.focus()
  this.input.blur()
  
  this.assertEquals(this.PLACEHOLDER_TEXT, this.input.val());
}

Html5EmulatorTest.prototype.testPlaceholderIsNotReturnedOnBlurIfNonEmptyValue = function(){
  this.emulator.emulatePlaceholders();
  
  this.input.focus()
  this.input.val("hello")
  this.input.blur()
  
  this.assertEquals("hello", this.input.val());
}
