describe("Matchers", function(){
  describe("beA", function(){
    var matcher = Inspec.Matchers.beA;
    var expected = Inspec.Class.extend({
      
    });
    
    var actualPass = new expected(); 
    var actualFail = 'foo';
    
    var errMsg = 'expected \"foo\" to be an instance of function Class()'
    var negativeErrMsg = 'expected {} to not be an instance of function Class()'

    itShouldBehaveLike("a standard matcher")
  })
})