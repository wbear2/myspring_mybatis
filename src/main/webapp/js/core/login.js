/*
 * Arko爱客智能报告系统 v2.1 - Login JS
 * This file is part of Arko爱客智能报告系统, an Admin template build for sale at ThemeForest.
 * All copyright to this file is hold by Mairel Theafila <maimairel@yahoo.com> a.k.a nagaemas on ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 */
 
asyncLoadCallback = function(){
	var container = $(".mws-form-row:eq(2)").hide();
	
	if($(".mws-form-row:eq(2) ul").html().length){
		container.show();
	}
	
	$("#mws-login-form form").validate({
		invalidHandler: function(form, validator) {
			if($.fn.effect) {
				$("#mws-login").effect("shake", {distance: 6, times: 2}, 35);
			}
		},
		errorContainer: container,
		errorLabelContainer: $("ul", container),
		wrapper: "li"
	});
	
	$.fn.placeholder && $('[placeholder]').placeholder();
}