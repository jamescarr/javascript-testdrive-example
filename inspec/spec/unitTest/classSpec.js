describe("Inspec.Class", function(){
  beforeEach(function(){
    this.Foo = Inspec.Class.extend({
      init : function(){this.fooInit = true;},
      override : function(){this.overriden = false},
      overrideWithSuper : function(){this.ary=[1]}
    })

    this.Bar = Inspec.Class.extend({
      init : function(){this.barInit = true;},
      test1 : function(){},
      test2 : function(){}
    })

    this.ExtFoo = this.Foo.extend({
      init : function(){this.extFooInit = true;},
      override : function(){this.overriden = true},
      overrideWithSuper : function(){this._super();this.ary.push(2)}
    })
   
    this.ExtFoo2 = this.Foo.extend({
      init : function(){this._super();this.extFooInit = true;}
    })
   
    this.foo = new this.Foo()
    this.bar = new this.Bar()
    this.extFoo = new this.ExtFoo()
    this.extFoo2 = new this.ExtFoo2()
  })
 
  it("should allow extension", function(){
    expect(this.foo).to(beA, Inspec.Class)
    expect(this.bar).to(beA, Inspec.Class)
    expect(this.extFoo).to(beA, Inspec.Class)
  })
 
  it("should allow extension from extened classes", function(){
    expect(this.extFoo).to(beA, this.Foo)
  })
 
  it("should run #init", function(){
    expect(this.foo.fooInit).to(beTrue)
  })

  it("should not run #init of parent class", function(){
    expect(this.extFoo.fooInit).toNot(beTrue)
    expect(this.extFoo.extFooInit).to(beTrue)
  })
 
  it("should not run #init of parent class with #_super", function(){
    expect(this.extFoo2.fooInit).to(beTrue)
    expect(this.extFoo2.extFooInit).to(beTrue)
  })
 
  it("should allow override", function(){
    this.foo.override();
    this.extFoo.override();
    expect(this.foo.overriden).to(beFalse)
    expect(this.extFoo.overriden).to(beTrue)
  })
 
  it("should allow override with #_super", function(){
    this.foo.overrideWithSuper();
    this.extFoo.overrideWithSuper();
    expect(this.extFoo.ary).to(be, [1,2])
  })
})