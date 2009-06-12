function Html5Emulator(){
  this.values = ""
  this.getValues = function(){
    return this.values;
  }
}

Html5Emulator.prototype.giveMeValuesFromTheServer = function(){
  var self = this;
  $.post('blah.cfx', {name:'james'}, function(data){
    self.values = data;
  });
}
Html5Emulator.prototype.emulatePlaceholders = function(dom){
  $('input', dom).each(function(){
    $(this).val($(this).attr('placeholder'))
    $(this).focus(function(){
      $(this).val('')
    }).blur(function(){
      var value = $(this).val();
      if(value == ''){
        $(this).val($(this).attr('placeholder'))
      }
    });
  });
}


