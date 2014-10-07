
//(function($){
	var department = {};
	department.company = 0;
	department.name = "";
	department.productGroup = [];
	department.storeGroup = [];
	
	$.getJSON("/arko/admin/getcompany.do", function(json){
		$.each(json, function(index,item){
			var option = $("<option>",{text:item.companyName,value:item.companyId});
			$(".mws-form-row:eq(0) select").append(option);
		});
		if(json&&json.length)
			department.company = json[0].companyId;
	});
	
	$(".mws-form-row:eq(0) select").on("change", function(){
		department.company = $(this).val();
	});
	
	$(".mws-form-row:eq(1) input").on("change", function(){
		department.name = $(this).val();
	});
	
	$.getJSON("/arko/property/getjson.do",function(json){
		$.fn.pickList6 && $(".product_pickList").length && $(".product_pickList").pickList6({
			data: json.productGroup,
			sourceListLabel: "» 可选组",
			targetListLabel: "» 产品组",
			cache: department.productGroup
		});
		/*
		$.fn.pickList6 && $(".store_pickList").length && $(".store_pickList").pickList6({
			data: json.storeGroup,
			sourceListLabel: "» 可选组",
			targetListLabel: "» 产品组",
			cache: department.storeGroup
		});*/
	});
	
	$.getJSON("/arko/data/test.do",function(json){
		$.fn.pickList6 && $(".store_pickList").length && $(".store_pickList").pickList6({
			data: json.storeGroup,
			sourceListLabel: "» 可选组",
			targetListLabel: "» 产品组",
			cache: department.storeGroup
		});
	});
	
	$(".mws-button-row input").on("click", function(){
		$.ajax({
			url: "/arko/admin/department/docreate.do",
			type: "POST",
			data: {jsonData:JSON.stringify(department)},
			dataType: "json",
			success: function(data) {
				window.location.href='/arko/admin/list.do';
			}
		});
	});
//})(jQuery);