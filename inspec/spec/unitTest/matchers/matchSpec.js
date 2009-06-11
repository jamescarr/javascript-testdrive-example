describe("Matchers", function(){
  describe("match", function(){
    var matcher = Inspec.Matchers.match;
    var expected = /^hello/;
    var actualPass = "hello world";
    var actualFail = "Hello world";
    var errMsg = 'expected "Hello world" to match /^hello/'
    var negativeErrMsg = 'expected "hello world" to not match /^hello/'
    
    itShouldBehaveLike("a standard matcher")
  })  
})
