describe("Matchers", function(){
  describe("beUndefined", function(){
    var matcher = Inspec.Matchers.beUndefined;
    var actualPass, expected;
    var actualFail = 'foo';
    
    var errMsg = 'expected "foo" to be undefined'
    var negativeErrMsg = 'expected undefined to not be undefined'

    itShouldBehaveLike("a standard matcher")
  })
})