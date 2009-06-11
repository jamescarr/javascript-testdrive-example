describe("Inspec.Example", function(){
  var klass = Inspec.Example;
  
  describe("createExample", function(){
    beforeEach(function(){
      // mocking Inspec.ExampleGroup.current()
      this.temp = Inspec.ExampleGroup.current
      
      Inspec.ExampleGroup.current = (function(scope){
        return function(){
          // mocking Inspec.ExampleGroup.current().addExample()
          // we also need to bind the current scope. that's why it looks so ugly
          var fn = (function(scope){
            return function(example){
              scope.addedExample = example;
            }
          })(scope)
        
          return {addExample : fn}
        }
      })(this)
    })
    
    afterEach(function(){
      Inspec.ExampleGroup.current = this.temp
    })
    
    it("should create a new example and add it to current example group", function(){
      this.fn = function(){}
      klass.createExample("test", this.fn)
      expect(this.addedExample.description).to(be, "test")
      expect(this.addedExample.implementation).to(be, this.fn)
    })
  })
  
  describe("instance methods", function(){
    beforeEach(function(){
      this.exampleGroup = "mock example group"
      this.description = "test example"
      this.implementation = function(){}
      this.options = {}
      this.example = new klass(this.exampleGroup, this.description, this.implementation, this.options)      
    })
    
    it("#constructor should initialize all instance variables", function(){
      expect(this.example.exampleGroup).to(be, this.exampleGroup)
      expect(this.example.description).to(be, this.description)
      expect(this.example.implementation).to(be, this.implementation)
      expect(this.example.options).to(be, this.options)
    })
    
    it("#getDescription should return description", function(){
      expect(this.example.getDescription()).to(be, this.description)
    })
  })
})