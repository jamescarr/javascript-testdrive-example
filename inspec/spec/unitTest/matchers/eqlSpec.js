describe("Matchers", function(){
  describe("eql", function(){
    it("should be an alias of equal matcher", function(){
      expect(Inspec.Matchers.eql).to(eql, Inspec.Matchers.equal)
    })
  })
})