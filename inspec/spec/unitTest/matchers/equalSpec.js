describe("Matchers", function(){
  describe("equal", function(){
    describe("when comparing two strings", function(){
      var matcher = Inspec.Matchers.equal;
      var expected = "pizza";
      var actualPass = "pizza";
      var actualFail = "pie";
      var errMsg = 'expected "pie" to equal "pizza"'
      var negativeErrMsg = 'expected "pizza" to not equal "pizza"'

      itShouldBehaveLike("a standard matcher")
    })
  })  
})
