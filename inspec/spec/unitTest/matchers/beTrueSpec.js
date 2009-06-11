describe("Matchers", function(){
  describe("beTrue", function(){
    var matcher = Inspec.Matchers.beTrue;
    var expected = 'dummy value';
    
    var actualPass = true;
    var actualFail = false;
    
    var errMsg = 'expected false to be true'
    var negativeErrMsg = 'expected true to not be true'

    itShouldBehaveLike("a standard matcher")
  })
})