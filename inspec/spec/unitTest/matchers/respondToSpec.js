describe("Matchers", function(){
  describe("respondTo", function(){
    var matcher = Inspec.Matchers.respondTo;
    var expected = "abc";
    var actualPass = {abc : function(){}};
    var actualFail = {abc : []};

    var errMsg = 'expected { abc: [] } to respond to "abc"'
    var negativeErrMsg = 'expected { abc: function () } to not respond to "abc"'

    itShouldBehaveLike("a standard matcher")      
  })
})