

asyncLoadComplete  = function(){

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
		var reportId = element.attr("data-value");
		
		if(element.find(".icon-remove-circle").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要终止此报告?");
			var buttons = {
				"确定": function(){
					$(this).dialog("close");
					$.getJSON("/arko/report/"+reportId+"/stop.do", function(json){
						var buttons = {
								"关闭": function(){
									$(this).dialog("close");
								}
						};
						if(json.status=="OK"){
							target.remove();
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 报告终止成功!");
							openDialog(elements, buttons);
						}else{
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 报告终止失败!");
							openDialog(elements, buttons);
						}
					});
				},
				"取消": function(){
					$(this).dialog("close");
				}
			};
			
			openDialog(elements, buttons);	
		}
	});
	
	var self = this;
	arko.init(self, function(){
		$(".mws-datatable-fn").length && $(".mws-datatable-fn").dataTable({
			"bProcessing": 0,
			"sAjaxSource": "/arko/report/searchReport.do",
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
			    {"mData": "number"},
				{"mData": null, bSortable: 0, fnRender: function(item){
			    	return "<a href='/arko/report/"+item.aData.id+"/view.do'>"+item.aData.name+"</a>";
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					return arko.getReportText(item.aData.type);
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					var date = moment(item.aData.createTime);
					return date.format("YYYY-MM-DD HH:mm");
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					return arko.getStatusText(item.aData.status);
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
						return "<span><a href='#' class='btn btn-small' data-value='"+item.aData.id+"'><i class='icon-remove-circle'></i></a></span>";
					},bSortable:0,bSearchable:0,sClass:"text-align-middle"
				}
			],
		    sPaginationType: "full_numbers"
		});
	});
};