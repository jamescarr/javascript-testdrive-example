describe("Matchers", function(){
  describe("beFalse", function(){
    var matcher = Inspec.Matchers.beFalse;
    var expected = 'dummy value';
    
    var actualPass = false;
    var actualFail = "pie";
    
    var errMsg = 'expected "pie" to be false'
    var negativeErrMsg = 'expected false to not be false'

    itShouldBehaveLike("a standard matcher")
  })
})