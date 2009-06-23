/*
JsUnit - a JUnit port for JavaScript
Copyright (C) 1999,2000,2001,2002,2003,2007 Joerg Schaible

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * Some simple tests.
 */
function Html5EmulatorTest(name)
{
    TestCase.call( this, name );
}
function Html5EmulatorTest_setUp(){
  var sandbox = $('<div></div>')
  this.emulator = new Html5Emulator(sandbox);
  this.PLACEHOLDER_TEXT = "placeholder text is here";
  this.input = sandbox.append('<input type="text" value="" placeholder="'+this.PLACEHOLDER_TEXT+'"');
}
function Html5EmulatorTest_testValueIsPopulatedByPlaceholder(){
  this.emulator.emulatePlaceholders();
  
  this.assertEquals(this.PLACEHOLDER_TEXT, this.input.val());
}
Html5EmulatorTest.prototype = new TestCase();
Html5EmulatorTest.glue();


function Html5EmulatorTestSuite()
{
    TestSuite.call( this, "Html5EmulatorTest" );
    this.addTestSuite( Html5EmulatorTest );
}
Html5EmulatorTestSuite.prototype = new TestSuite();
Html5EmulatorTestSuite.prototype.suite = function () { return new Html5EmulatorTestSuite(); }

