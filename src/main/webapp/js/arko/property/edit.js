
asyncLoadComplete = function(){
	var dialog = $("<div>").appendTo($("body"));

	function openDialog(elements, buttons){
		dialog.empty();
		dialog.append(elements);
		
		dialog.dialog({
		    autoOpen: true,
		    closeOnEscape: false,
		    resizable: false,
		    modal: true,
		    title: "友情提示",
		    width: "550",
		    buttons: buttons
		});
	}
	
	var propertyId = request.QueryString("id");
	$.getJSON("/arko/property/getproperty.do",{id:propertyId},function(json){
		$(".mws-form input[name=name]").val(json.name);
		$(".mws-form input[name=desc]").val(json.desc);
		$(".mws-form input[name=type]").val(arko.getPropertyType(json.type));
		
	});
	
	$(".mws-form").length && $(".mws-form input[type=button]").on("click", function(){
		var name = $(".mws-form input[name=name]").val();
		var desc = $(".mws-form input[name=desc]").val();
		
		if(!name.length){
			var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 属性名不能为空!");

			var buttons = {
			    "关闭": function () {
				    $(this).dialog("close");
				}
			};
			
			openDialog(elements, buttons);
			return false;
		}
		
		$.ajax({
			url: "/arko/property/save.do",
			type: "POST",
			data: {name:name,desc:desc,id:propertyId},
			dataType: "json",
			success: function(json) {
				if(json.status=="OK"){
					var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 属性修改成功!");

					var buttons = {
					    "关闭": function () {
							window.location.href='/arko/property/list.do';
						    $(this).dialog("close");
						}
					};
					
					openDialog(elements, buttons);
				}else{
					var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" "+json.msg);

					var buttons = {
					    "关闭": function () {
						    $(this).dialog("destroy");
						}
					};
					
					openDialog(elements, buttons);
				}
			}
		});
	});
};