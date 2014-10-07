var cache = {};
cache.productGroup = [];
cache.storeGroup = [];

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

asyncLoadComplete = function(){
    // jQuery-UI Tabs
    $.fn.tabs && $(".mws-tabs").tabs();
	
	if( $.fn.select2 ) {
        $("select.mws-select2").select2();
    }
	
	$.getJSON(arko.getUrl("/arko/property/getlist.do"),function(json){
		$.each(json.aaData, function(index, item){
			var option = $("<option>",{text:item.name,value:item.id});
			
			if(item.type==1){
				$("#tab-1 select.mws-select2").append(option);
			}else if(item.type==2){
				$("#tab-2 select.mws-select2").append(option);
			}
		});
	});
	
	$.getJSON(arko.getUrl("/arko/property/getjson.do"),function(data){
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
		var properties = $("#tab-1 select.mws-select2").val();
		if(properties){
			properties = properties.join(",");
		}else{
			properties = "";
		}
		var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 请稍候，正在生成下载文件...");
		openDialog(elements,null); 
    	$.ajax({
    		url : arko.getUrl("/arko/property/downloadfile.do"),
    		type : "POST",
    		data : {jsonData:JSON.stringify(cache.productGroup),type:1,properties:properties},
    		success : function (data) {
    			$(dialog).dialog("destroy");
    			_download("/arko/file/download/"+data.filename);
    	    }
    	});
	});
	
	$("#tab-2 .btn.btn-normal").on("click", function(){
		var properties = $("#tab-2 select.mws-select2").val();
		if(properties){
			properties = properties.join(",");
		}else{
			properties = "";
		}
		var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 请稍候，正在生成下载文件...");
		openDialog(elements,null); 
    	$.ajax({
    		url : arko.getUrl("/arko/property/downloadfile.do"),
    		type : "POST",
    		data : {jsonData:JSON.stringify(cache.storeGroup),type:2,properties:properties},
    		success : function (data) {
    			$(dialog).dialog("destroy");
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
};