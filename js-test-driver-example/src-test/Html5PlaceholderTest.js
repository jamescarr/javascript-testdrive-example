Html5PlaceholderTest = TestCase("Html5PlaceholderTest");

Html5PlaceholderTest.prototype.setUp = function(){
	var sandbox = $('<div></div>');
	sandbox.append('<input type="text" name="firstName" id="name" placeholder="Enter Your Name">');
	
	this.inputWithPlaceholder = sandbox.find('#name');
	this.emulator = new Html5Emulator(sandbox);
}

Html5PlaceholderTest.prototype.testInputValueIsPopulatedByPlaceholderAttribute = function(){
	this.emulator.emulatePlaceholders();
	
	assertEquals("Enter Your Name", this.inputWithPlaceholder.val());
}

Html5PlaceholderTest.prototype.testPlaceholderIsBlankedOnFocus = function(){
	this.emulator.emulatePlaceholders();
	
	this.inputWithPlaceholder.focus();
	
	assertEquals("", this.inputWithPlaceholder.val());
}

Html5PlaceholderTest.prototype.testShouldNotBlankValueIfItIsDifferentFromPlaceholder = function(){
	this.emulator.emulatePlaceholders();
	
	this.inputWithPlaceholder.val("James Carr")
	this.inputWithPlaceholder.focus();
	
	assertEquals("James Carr", this.inputWithPlaceholder.val());
}

Html5PlaceholderTest.prototype.testShouldReturnPlaceholderOnBlurIfEmpty = function(){
	this.emulator.emulatePlaceholders();
	
	this.inputWithPlaceholder.focus();
	this.inputWithPlaceholder.blur();
	
	assertEquals("Enter Your Name", this.inputWithPlaceholder.val());
}

Html5PlaceholderTest.prototype.testShouldNotSetValueIfItIsNonEmpty = function(){
	this.inputWithPlaceholder.val("Existing Value");
	
	this.emulator.emulatePlaceholders();
	
	assertEquals("Existing Value", this.inputWithPlaceholder.val());
}