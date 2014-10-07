var cache = {
		id : 0,
		name : "",
		folder : 0,
		productGroup : [],
		storeGroup : [],
		filters : []
};

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

asyncLoadCallback = function(){
	
	cache.folder = request.QueryString("fid");

	if(cache.folder){
		
		$(".mws-form-item:eq(0) input").on("change", function(){
			cache.name = $(this).val();
		});
		
		$(".mws-button-row input[type=button]").on('click', function(){

			var buttons = {
			    "关闭": function () {
				    $(this).dialog("close");
				}
			};
			
			if(!cache.name){
				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请填写自定义组名!");
				openDialog(elements,buttons);
				return false;
			}else if(!cache.folder){
				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请选择文件夹!");
				openDialog(elements,buttons);
				return false;
			}else if(!cache.productGroup || !cache.storeGroup){
				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 不能创建空的自定义组!");
				openDialog(elements,buttons);
				return false;
			}
			
	    	$.ajax({
	    		url : "/arko/group/createGroup.do",
	    		type : "POST",
	    		data : {jsonData:JSON.stringify(cache)},
	    		success : function (json) {
	    			var elements, buttons;
	    			if(json.status=="OK"){
	    				buttons = {
	    					    "转到列表页": function () {
	    			    			window.location.href="/arko/group/list.do";
	    						}
	    					};
	    				elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 自定义组创建成功!");
	    			}else{
	    				buttons = {
	    					    "关闭": function () {
	    					    	$(this).dialog("close");
	    						}
	    					};
	    				elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(json.msg);
	    			}
	    			openDialog(elements,buttons);
	    	    }
	    	});
		});
	}
	
	$.getJSON(arko.getUrl("/arko/group/getjson.do"), {folder:cache.folder},function(data){
		$("label#folder").text(data.folder);
		
		if(data.type==1||data.type==3){
			$.fn.pickList2 && $('#picklist').pickList2({
				data: [
		  	            data.productGroup[0],
		  	            data.productGroup[1]
		  	    ],
		        filter : [
		  	            data.productGroup[0],
		  	            data.productGroup[1],
		  	            data.productGroup[2]
		  	    ],
				sourceListLabel: "» 可选组",
				targetListLabel: "» 产品组",
				cache: cache.productGroup,
				filterCache: cache.filters,
				enableSaveGroup: false,
				mode: 1
			});
		}else if(data.type==2||data.type==4){
			
			$.fn.pickList4 && $('#picklist').pickList4({
				sourceListLabel : "可选项",
		        targetListLabel : "选中项",
		        data : [
		  	            data.storeGroup[0],
		  	            data.storeGroup[1]
		  	    ],
		        cache : cache.storeGroup,
		        filterCache: cache.filters,
		        pickGroup: true
			});
		}
	});
};