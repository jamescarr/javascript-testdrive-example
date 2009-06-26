function Html5Emulator(dom){
  this.dom = dom;
}
Html5Emulator.prototype.emulatePlaceholders = function(){
    $('input', this.dom).each(function(){
      var placeholder = $(this).attr('placeholder');
      $(this).val(placeholder);    
      $(this).focus(function(){
        if(placeholder == $(this).val())
          $(this).val('');
      }).blur(function(){
        if($(this).val() == '')
          $(this).val(placeholder);
      });
    });
}
