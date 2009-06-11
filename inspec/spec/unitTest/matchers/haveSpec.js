describe("Matchers", function(){
  describe("have", function(){
    describe("while testing an Object", function(){
      var matcher = Inspec.Matchers.have;
      var expected = 2;

      var actualPass = {a:1, b:2, c:3};
      var actualFail = {a:1, b:3, c:4};

      var errMsg = 'expected { a: 1, b: 3, c: 4 } to have 2'
      var negativeErrMsg = 'expected { a: 1, b: 2, c: 3 } to not have 2'

      itShouldBehaveLike("a standard matcher")      
    })
    describe("while testing an Array", function(){
      var matcher = Inspec.Matchers.have;
      var expected = 2;

      var actualPass = [1,2,3];
      var actualFail = [1,3,4];

      var errMsg = 'expected [ 1, 3, 4 ] to have 2'
      var negativeErrMsg = 'expected [ 1, 2, 3 ] to not have 2'

      itShouldBehaveLike("a standard matcher")      
    })
  })
})