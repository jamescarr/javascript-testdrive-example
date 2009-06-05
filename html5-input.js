carrcraft = {};
carrcraft.Html5Emulator = function(){
  
}
carrcraft.Html5Emulator.prototype.emulateInputs = function(){
  $('input').each(function(){
    if($(this).attr('placeholder')){
      var input = $(this);
      input.val(input.attr('placeholder'))
      input.focus(function(){
        if(input.val() == input.attr('placeholder')){
          $(this).val("");      
        }
      })
    }
  });
}
