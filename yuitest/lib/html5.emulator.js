var jamescarr = {tddexample:{}};

jamescarr.tddexample.Html5Emulator = function(dom){
  this.dom = dom
};

jamescarr.tddexample.Html5Emulator.prototype = {
  emulatePlaceholders:function(){
    this.dom.find('input').each(function(){
      $(this).val($(this).attr('placeholder'));
      $(this).focus(function(){
        if($(this).val() == $(this).attr('placeholder')){
          $(this).val('');
        }
      }).blur(function(){
        if($(this).val() == ''){
          $(this).val($(this).attr('placeholder'));
        }
      });
    })
  }
};
