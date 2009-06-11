describe("Matchers", function(){
  describe("be", function(){
    it("should be an alias of equal matcher", function(){
      expect(Inspec.Matchers.be).to(be, Inspec.Matchers.equal)
    })
  })
})