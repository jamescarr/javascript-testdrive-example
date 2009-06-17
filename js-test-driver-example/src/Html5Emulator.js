function Html5Emulator(dom){
	this.emulatePlaceholders = function(){
		$('input', dom).each(function(){
			setValueToPlaceholder.call(this);
			$(this).focus(blankPlaceholder).blur(setValueToPlaceholder);
			
		});
	};
	
	//-- private
	function setValueToPlaceholder(){
		if($(this).val() == ""){
			$(this).val($(this).attr('placeholder'))
		}		
	}
	function blankPlaceholder(){
		if($(this).val() == $(this).attr('placeholder')){
			$(this).val("")
		}		
	}
}