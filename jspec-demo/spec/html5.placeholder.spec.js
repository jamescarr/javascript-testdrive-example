describe "Html5 Placeholder Attribute"
  before_each
    emulator = new Html5Emulator();
    dom = sandbox();
  end
  
  describe "Initial behavior on load"
    it "should populate input value with placeholder text"
      var placeholderText = 'enter your name please';
      dom.append("<input id='name' name='name' placeholder='"+placeholderText+"'/>");
      
      emulator.emulatePlaceholders(dom);
      
      var value = $('#name', dom).val()
      value.should.equal placeholderText
    end
  end
  
  describe "interactions by user"
    before_each
      placeholderText = 'enter your name please';
      dom.append("<input id='name' name='name' placeholder='"+placeholderText+"'/>");
    end
    it "should clear placeholder text on focus"   
      emulator.emulatePlaceholders(dom);
          
      $('#name', dom).focus();
      
      var value = $('#name', dom).val()
      value.should.be_empty
    end
    it "should return placeholder text on blur if empty"
      emulator.emulatePlaceholders(dom);
      
      $('#name', dom).focus();            
      $('#name', dom).blur();
      
      var value = $('#name', dom).val()
      value.should.equal placeholderText
    end
    
    it "should not return placeholder text on blur if not empty"
      emulator.emulatePlaceholders(dom);
      
      $('#name', dom).focus();            
      $('#name', dom).val('My Name')
      $('#name', dom).blur();
      
      var value = $('#name', dom).val()
      value.should.equal 'My Name'
    end    
    
    it "should give me stuff from the server"
      var responseFromServer = "Howdy!";
      jQuery.post = function(url, param, callback){
        callback(responseFromServer);
      };
      
      emulator.giveMeValuesFromTheServer();
      
      emulator.getValues().should.equal "Howdy!"
    end
  end
end
