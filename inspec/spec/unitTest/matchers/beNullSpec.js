describe("Matchers", function(){
  describe("beNull", function(){
    var matcher = Inspec.Matchers.beNull;
    var expected = 'dummy value';
    
    var actualPass = null;
    var actualFail = "pie";
    
    var errMsg = 'expected "pie" to be null'
    var negativeErrMsg = 'expected null to not be null'

    itShouldBehaveLike("a standard matcher")
  })
})