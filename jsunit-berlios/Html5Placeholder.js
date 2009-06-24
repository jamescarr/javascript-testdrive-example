function Html5Emulator(dom){
  this.dom = dom;
}
Html5Emulator.prototype.emulatePlaceholders = function(){
    $('input', this.dom).each(function(){
        $(this).val($(this).attr('placeholder'));    
    });
}
