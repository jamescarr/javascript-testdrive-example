Html5Emulator = (function(){
  function clearIfEmpty(){
    var input = $(this)
    if(input.val() == input.attr('placeholder')){
      input.val('')
    }
  }
  function replaceValueWithPlaceholderIfBlank(){
    var value = $(this).val();
    if(value == ''){
      $(this).val($(this).attr('placeholder'))
    }
  
  }
  var klass = function(){
  
  }
  klass.prototype = {
    emulatePlaceholders: function(dom){
      $('input', dom).each(function(){
        $(this).val($(this).attr('placeholder'))
        $(this).focus(clearIfEmpty).blur(replaceValueWithPlaceholderIfBlank);
      });
    }
  }
  return klass;
})();
Html5Emulator

