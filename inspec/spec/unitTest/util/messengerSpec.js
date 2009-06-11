describe("Inspec.util.Messenger", function(){
  var klass = Inspec.util.Messenger

  beforeEach(function(){
    this.messenger = new klass()
  })
    
  describe("#constructor", function(){
    it("should initialize instance variables", function(){
      expect(this.messenger.events).to(be, {});
    })
  })

  describe("member functions", function(){
    beforeEach(function(){
      this.messageFn = function(message){message.called = true;message.ary.push("first");}
      this.messenger.on("test", this.messageFn, this)      
      this.messageFn2 = function(message){message.called2 = true;message.ary.push("second");}
      this.messenger.on("test", this.messageFn2, this)
    })
    
    describe("#on", function(){
      it("should register a handler", function(){
        expect(this.messenger.events["test"][0]).to(equal, {fn : this.messageFn, scope : this})
      })

      it("should allow register multiple handlers", function(){
        expect(this.messenger.events["test"][1]).to(equal, {fn : this.messageFn2, scope : this})
      })      
    })
    
    describe("#un", function(){
      beforeEach(function(){
        this.messenger.un("test", this.messageFn, this)
      })

      it("should unregister a handler", function(){
        expect(this.messenger.events["test"].length).to(equal, 1)
        expect(this.messenger.events["test"][0]).to(equal, {fn : this.messageFn2, scope : this})
      })
    })
    
    describe("#send", function(){
      it("should call registered functions in order", function(){
        var message = {
          called : false,
          called2 : false,
          ary : []
        }
        this.messenger.send('test', message)

        expect(message.called).to(equal, true)
        expect(message.called2).to(equal, true)
        expect(message.ary).to(equal, ["first", "second"])
      })
    })
  })
})