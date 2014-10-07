
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
		var reportId = element.attr("data-value");
		
		if(element.find(".icon-trash").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此重复报告?");
			var buttons = {
				"确定": function(){
					$(this).dialog("close");
					$.getJSON("/arko/repeat/"+reportId+"/delete.do", function(json){
						var buttons = {
								"关闭": function(){
									$(this).dialog("close");
								}
						};
						if(json.status=="OK"){
							target.remove();
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 重复报告删除成功!");
							openDialog(elements, buttons);
						}else{
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 重复报告删除失败!");
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
			"sAjaxSource": "/arko/repeat/getrepeatreportlist.do",
			"bFilter" : 0,
			"bLengthChange" : 0,
			"aaSorting": [[1,'desc']],
			"bServerSide": true,
			"aoColumns": [
			    {"mData": "id", bSortable: 1},
				{"mData": null, bSortable: 0, fnRender: function(item){
			    	return "<a href='/arko/repeat/view.do?id="+item.aData.id+"'>"+item.aData.name+"</a>";
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					return arko.getReportText(item.aData.report.type);
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					var data = item.aData.lastReport;
					if(data){
						var date = moment(data.completeDate);
						return "<a href='/arko/report/view.do?id='"+data.id+">"+date.format("YYYY-MM-DD")+"</a>";
					}else{
						return "无";
					}
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					var date = moment(item.aData.nextRunDate);
					return date.format("YYYY-MM-DD");
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					return "每"+item.aData.freq+"周";
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					return "共"+item.aData.time+"次, 剩"+item.aData.leftTime+"次";
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
						return "<span><a href='#' class='btn btn-small' data-value='"+item.aData.id+"'><i class='icon-trash'></i></a></span>";
					},bSortable:0,bSearchable:0,sClass:"text-align-middle"
				}
			],
		    sPaginationType: "full_numbers"
		});
	});
};