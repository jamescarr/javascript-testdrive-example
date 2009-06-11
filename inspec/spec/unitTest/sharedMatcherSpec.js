sharedExamplesFor("a standard matcher",function(){
  var passArgs, failArgs
  beforeAll(function(){
    if(typeof matcher == 'undefined' || typeof errMsg== 'undefined' ||
        typeof negativeErrMsg == 'undefined'){
      throw Error("matcher, expected, actualPass, actualFail, errMsg, and negativeErrMsg must be specified")
    }
    passArgs = [expected, actualPass]
    failArgs = [expected, actualFail]
  })
  
  describe("#match", function(){
    it("should respond to #match", function(){
      expect(matcher).to(respondTo, 'match')
    })
    
    it("should return true if pass", function(){
      expect(matcher.match.apply(matcher, passArgs)).to(beTrue)
    })
    
    it("should return false if fail", function(){
      expect(matcher.match.apply(matcher, failArgs)).to(beFalse)
    })
  })
  
  describe("#failureMessage", function(){
    it("should respond to #failureMessage", function(){
      expect(matcher).to(respondTo, 'failureMessage')
    })

    it("should return correct message", function(){
      var msg = matcher.failureMessage.apply(matcher, failArgs)
      expect(msg).to(eql, errMsg)
    })
    
    it("should return correct message with negation", function(){
      var msg = matcher.failureMessage.apply(matcher, passArgs.concat([true]));
      expect(msg).to(eql, negativeErrMsg)
    })
  })
})
