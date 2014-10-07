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
	
	$(".table-running").length && $(".table-running").dataTable({
		"bProcessing": 0,
		"sAjaxSource": "/arko/pickup/running.do",
		"bFilter" : 0,
		"bLengthChange" : 0,
		"aaSorting": [[1,'desc']],
	    "bServerSide": true,
	    "aoColumns": [
	      			{"mData": null, bSortable: 0, fnRender: function(item){
	      				if(item.aData[0] == null)
	      					return "";
	      		    	return item.aData[0];
	      			}},
	      			{"mData": null, bSortable: 0, fnRender: function(item){
	      				if(item.aData[1] == null)
	      					return "";
	      		    	return "<a href='/arko/pickup/edit.do?rid="+item.aData[4]+"'>"+item.aData[1]+"</a>";
	      			}},
	      			/*{"mData": null, bSortable: 0, fnRender: function(item){
	      				if(item.aData[2] == null)
	      					return "";
	      		    	return item.aData[2];
	      			}},*/
	      			{"mData": null, bSortable: 0, fnRender: function(item){
	      		    	if(item.aData[2] == null)
	      					return "";
	      				return item.aData[2];
	      			}},
	      			{"mData": null, bSortable: 0, fnRender: function(item){
	      				if(item.aData[3] == null)
	      					return "";
	      		    	return item.aData[3];
	      			},bSortable:0,bSearchable:0,sClass:"text-align-middle"
	      			}
	      		],
	    sPaginationType: "full_numbers"
	});
	
	$(".table-old").length && $(".table-old").dataTable({
		"bProcessing": 0,
		"sAjaxSource": "/arko/pickup/history.do",
		"bFilter" : 0,
		"bLengthChange" : 0,
		"aaSorting": [[1,'desc']],
	    "fnServerParams" : function(serverParams) {
	        serverParams.push(
	            {
	            	"name" : "status",
	            	"value" : "1,2"
	            }
	        );
	    },
	    "bServerSide": true,
	    "aoColumns": [
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      				if(item.aData[0] == null)
		      					return "";
		      		    	return item.aData[0];
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      				if(item.aData[1] == null)
		      					return "";
		      				if(item.aData[6] == 9 || item.aData[6] == 3){
		      					return "<a href='/arko/pickup/edit.do?rid="+item.aData[5]+"'>"+item.aData[1]+"</a>";
		      				}else{
		      					return item.aData[1];
		      				}
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      				if(item.aData[2] == null)
		      					return "";
		      		    	return item.aData[2];
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      		    	if(item.aData[3] == null)
		      					return "";
		      				return item.aData[3];
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      		    	if(item.aData[7] == null)
		      					return "";
		      				return item.aData[7];
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      		    	if(item.aData[4] == null)
		      					return "";
		      				return item.aData[4];
		      			}},
		      			{"mData": null, bSortable: 0, fnRender: function(item){
		      				if(item.aData[4] == null)
		      					return "";
		      				var val = item.aData[4];
		      				if(val == "已完成"){
		      					return "<a href='/arko/pickup/download.do?rid="+ item.aData[5]+"'>下载</a>";
		      				}else{
		      					return "";
		      				}
		      			},bSortable:0,bSearchable:0,sClass:"text-align-middle"
		      			}
		      		],
	    sPaginationType: "full_numbers"
	});
};