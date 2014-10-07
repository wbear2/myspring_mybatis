
	var account = {
			userName:"",
			loginName:"",
			password:"",
			email:"",
			expDate:"",
			company:1,
			department:1,
			status:1,
			role:1
	};
	
(function($){
	
	$("input:text:not(.select2-input)").on("change", function(){
		var element = $(this);
		var field = element.attr("name");
		var value = element.val();
		account[field] = value;
		
	});
	
	$("select").on("change", function(){
		var element = $(this);
		var field = element.attr("name");
		var value = element.val();
		account[field] = value;
		
		if(field=="company"){
			$.getJSON('/arko/admin/getdepartment.do', {company:value}, function(json){
				var target = $("select[name=department]").empty();
				$.each(json, function(index,item){
					target.append($("<option>",{text:item.departmentName,value:item.departmentId}));
				});
			});
		}
	});
	
	$(".mws-select2").select2();
	
	$.getJSON('/arko/admin/getcompany.do', function(json){
		var target = $("select[name=company]").empty();
		$.each(json, function(index,item){
			target.append($("<option>",{text:item.companyName,value:item.companyId}));
		});
	});
	
	$(":button").on("click", function(){
		$.ajax({
			url: "/arko/admin/account/docreate.do",
			type: "POST",
			data: account,
			dataType: "json",
			success: function(data) {
				window.location.href='/arko/admin/list.do';
			}
		});
	});
	
})(jQuery);