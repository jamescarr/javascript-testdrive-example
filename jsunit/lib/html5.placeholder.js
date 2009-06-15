function Html5Emulator(){
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


