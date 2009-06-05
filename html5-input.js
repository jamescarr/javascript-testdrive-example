carrcraft = {};
carrcraft.Html5Emulator = function(){
  
}
carrcraft.Html5Emulator.prototype.emulateInputs = function(){
  $('input').each(function(){
    var input = $(this);
    if(input.attr('placeholder')){
      input.val(input.attr('placeholder'))
      input.focus(function(){
        if(input.val() == input.attr('placeholder')){
          $(input).val("");      
        }
      }).blur(function(){
        if(input.val()==""){
          input.val(input.attr('placeholder'));      
        }
      })
    }
  });
}
