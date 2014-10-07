cache = {};
cache.productGroup = [];
cache.storeGroup = [];

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
	
	$(".mws-datatable-fn").delegate("a.btn", "click", function(){
		
		var element = $(this);
		var target = element.parent().parent().parent();
		var propertyId = element.parent().attr("data");
		
		if(element.find(".icon-trash").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此属性?");
			var buttons = {
				"确定": function(){
					$(this).dialog("close");
					$.getJSON("/arko/property/"+propertyId+"/delete.do", function(json){
						var buttons = {
								"关闭": function(){
									$(this).dialog("close");
								}
						};
						if(json.status=="OK"){
							target.remove();
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 属性删除成功!");
							openDialog(elements, buttons);
						}else{
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 属性删除失败!");
							openDialog(elements, buttons);
						}
					});
				},
				"取消": function(){
					$(this).dialog("close");
				}
			};
			
			openDialog(elements, buttons);	
		} else if(element.find(".icon-edit").length){
		}
	});
	
	$(".mws-form").length && $(".mws-form input[type=button]").on("click", function(){
		var name = $(".mws-form input[name=name]").val();
		var desc = $(".mws-form input[name=desc]").val();
		var type = $(".mws-form select option:checked").val();
		
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
			url: "/arko/property/create.do",
			type: "POST",
			data: {name:name,type:type,desc:desc},
			dataType: "json",
			success: function(json) {
				if(json.status=="OK"){
					var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 属性创建成功!");

					var buttons = {
					    "关闭": function () {
							window.location.href='/arko/property/list.do';
						    $(this).dialog("close");
						}
					};
					
					openDialog(elements, buttons);
				}
			}
		});
	});
	
	$.getJSON("/arko/property/getjson.do",function(data){
		$.fn.pickList5 && $("#tab-1 .picklist").length && $("#tab-1 .picklist").pickList5({
			data: data.productGroup,
			sourceListLabel: "» 可选组",
			targetListLabel: "» 产品组",
			cache: cache.productGroup
		});
		
		$.fn.pickList5 && $("#tab-2 .picklist").length && $('#tab-2 .picklist').pickList5({
			data: data.storeGroup,
			sourceListLabel: "» 可选组",
			targetListLabel: "» 区域组",
		    cache: cache.storeGroup
		});
	});
	
	$("#tab-1 .btn.btn-normal").on("click", function(){
    	$.ajax({
    		url : "/arko/property/downloadfile.do",
    		type : "POST",
    		data : {jsonData:JSON.stringify(cache.productGroup),type:1},
    		success : function (data) {
    			_download("/arko/file/download/"+data.filename);
    	    }
    	});
	});
	
	$("#tab-2 .btn.btn-normal").on("click", function(){
    	$.ajax({
    		url : "/arko/property/downloadfile.do",
    		type : "POST",
    		data : {jsonData:JSON.stringify(cache.storeGroup),type:2},
    		success : function (data) {
    			_download("/arko/file/download/"+data.filename);
    	    }
    	});
	});
	
	function _download(url, target) {
		if(!target) target = "_self";
		var formObj = document.createElement("form");
		formObj.action = url;
		formObj.target = target;
		document.documentElement.appendChild(formObj);
		formObj.submit();
	}

	$('.mws-table').length && $('.mws-table').dataTable( {
		"bProcessing": true,
		"sAjaxSource": "/arko/property/getlist.do",
		"aoColumns": [
			{ "mData": "id" },
			{ "mData": "name", bSortable: 0 },
			{ "mData": "typeName", bSortable: 0 },
			{"mData": null, bSortable: 0, fnRender: function(item){
				var date = moment(item.aData.createDate.time);
				return date.format("YYYY-MM-DD HH:mm");
			}},
			{ "mData": "account.userName", bSortable: 0 },
			{ "mData": "desc", bSortable: 0 },
			{ "mData": null, bSortable: 0, fnRender: make_button }
		]
	});
    function make_button(oObj) {  
        var id = oObj.aData.id; 
        return '<span class="btn-group" data="'+id+'"><a href="#" class="btn btn-small"><i class="icon-trash"></i>删除</a><a href="#" class="btn btn-small"><i class="icon-edit"></i>编辑</a></span>';
    }
};