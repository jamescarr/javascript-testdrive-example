function blankPlaceholder(){
  if($(this).val() == $(this).attr('placeholder')){
    $(this).val('')
  }
}

function restorePlaceholderIfBlank(){
  if($(this).val() == ''){
    $(this).val($(this).attr('placeholder'))
  }
}

carrcraft = {}
carrcraft.Html5Emulator = function(){}

carrcraft.Html5Emulator.prototype.emulateInputs = function(context){
  $('input', context).each(function(){
    var input = $(this)
    input.val(input.attr('placeholder'))
    input.focus(blankPlaceholder).blur(restorePlaceholderIfBlank);
  });
}
