describe("Matchers", function(){
  describe("haveLength", function(){
    describe("while testing Array", function(){
      var matcher = Inspec.Matchers.haveLength;
      var expected = 3

      var actualPass = [1, 2, 3];
      var actualFail = [1, 2];

      var errMsg = 'expected [ 1, 2 ] to have length 3'
      var negativeErrMsg = 'expected [ 1, 2, 3 ] to not have length 3'

      itShouldBehaveLike("a standard matcher")      
    })
    describe("while testing String", function(){
      var matcher = Inspec.Matchers.haveLength;
      var expected = 3

      var actualPass = 'foo';
      var actualFail = 'f';

      var errMsg = 'expected "f" to have length 3'
      var negativeErrMsg = 'expected "foo" to not have length 3'

      itShouldBehaveLike("a standard matcher")      
    })

  })
})