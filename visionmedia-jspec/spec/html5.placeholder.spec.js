
describe 'Html5 Emulator'
  describe 'placeholder attribute behavior'
    it 'should set value to the same text as placeholder'
      input = sandbox()
      input.append("<input type='text' placeholder='Enter your name' id='first_name'/>")
      
      field_with_placeholder = $('#first_name', input)
      
      emulator = new carrcraft.Html5Emulator()
      emulator.emulateInputs(input)      
      
      field_with_placeholder.should.have_value 'Enter yourz name'
    end
  end
end
    before
      input.append("<input type='text' id='no_placeholder'/>")
      input.append("<input type='text' id='placeholder_with_existing_value' value='foo'/>")
      
      field_without_placeholder = $('#no_placeholder', input)      
      field_with_existing_value = $('#placeholder_with_existing_value', input)
    end
    
    before_each
    end
    

    
    it 'should not set the value to placeholder if a value was pre-existing'    
      field_with_existing_value.should.have_value 'foo'
    end        
    it 'should not populate the value field if placeholder is not defined'
      field_without_placeholder.should.have_value ''
    end
    
    it 'should blank the value on focus'
      field_with_placeholder.focus()
      
      field_with_placeholder.should.have_value ''
    end
    
    it 'should not blank the input on focus if the value is different from placeholder'
      field_with_placeholder.val("James")
      field_with_placeholder.focus()
      
      field_with_placeholder.should.have_value "James"
    end 
    
    it 'should return the placeholder value on blur if the value is empty'
       field_with_placeholder.focus()
       field_with_placeholder.blur()
       
       field_with_placeholder.should.have_value field_with_placeholder.attr("placeholder")
    end
  end
end
