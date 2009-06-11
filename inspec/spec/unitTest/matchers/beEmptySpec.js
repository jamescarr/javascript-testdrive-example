describe("Matchers", function(){
  describe("beEmpty", function(){
    describe("while testing arrays", function(){
      var matcher = Inspec.Matchers.beEmpty;
      var expected = 'dummy value';

      var actualPass = [];
      var actualFail = [1,2,3];

      var errMsg = 'expected [ 1, 2, 3 ] to be empty'
      var negativeErrMsg = 'expected [] to not be empty'

      itShouldBehaveLike("a standard matcher")
    })
    
    describe("while testing objects", function(){
      var matcher = Inspec.Matchers.beEmpty;
      var expected = 'dummy value';

      var actualPass = {};
      var actualFail = {
        a : 1,
        b : 2,
        c : 3
      };

      var errMsg = 'expected { a: 1, b: 2, c: 3 } to be empty'
      var negativeErrMsg = 'expected {} to not be empty'

      itShouldBehaveLike("a standard matcher")
    })

  })
})