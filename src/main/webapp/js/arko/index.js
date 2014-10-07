asyncLoadCallback = function (){
	moment.lang("zh-cn");
	
	var self = this;
	
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

	$(".mws-datatable").delegate("a.btn", "click", function(){
		
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
		} else if(element.find(".icon-repeat").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要重新运行此报告?");;
			var buttons = {
				"确定": function(){
					$(this).close();
					$.getJSON("/arko/report/"+reportId+"/run.do", function(json){
						if(json.status=="OK"){
							target.remove();
							var buttons = {
									"关闭": function(){
										$(this).dialog("close");
										window.location.reload();
									}
							};
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 报告即将重新成功!");
							openDialog(elements, buttons);
						}else{
							var buttons = {
									"关闭": function(){
										$(this).dialog("close");
									}
							};
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 报告重新运行失败!");
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
	
	$.getJSON(arko.getUrl("/arko/data/getlastupdatedate.do"), function(json){
		var date = moment(json.date);
		$(".mws-stat-container a:eq(0) span:last").text(date.format("YYYY-MM-DD"));
	});
	
	$.getJSON(arko.getUrl("/arko/report/recentlycompletedreports.do"), function(json){
		$(".mws-stat-container a:eq(2) span:last").text(json.count+"份 ");
	});
	
	$.getJSON(arko.getUrl("/arko/report/runningtask.do"), function(json){
		$(".mws-stat-container a:eq(3) span:last").text(json.count+"份 ");
	});
	
	arko.init(self, function(){
			
		$(".grid_8 table:eq(0)").dataTable({
			"bProcessing": 0,
			"sAjaxSource": "/arko/report/searchReport.do",
			"bFilter" : 0,
			"bLengthChange" : 0,
			"bPaginate" : 0,
			"bInfo" : 0,
			"bSort" : 0,
		    "fnServerParams" : function(serverParams) {
		        serverParams.push(
		            {
		                "name" : "row",
		                "value" : 5
		            },{
		            	"name" : "status",
		            	"value" : "1,2"
		            }
		        );
		    },
			"aoColumns": [
			    {"mData": "number"},
				   {"mData": null, fnRender: function(item){
			    	return "<a href='/arko/report/"+item.aData.id+"/view.do'>"+item.aData.name+"</a>";
				}},
				{"mData": null, fnRender: function(item){
					return arko.getReportText(item.aData.type);
				}},
				{"mData": "createTime"},
				{"mData": null, fnRender: function(item){
					return arko.getStatusText(item.aData.status);
				}},
				{
					"mData": null,
					fnRender: function(item){
						var css = "icon-remove-circle";
						return "<span><a href='#' class='btn btn-small' data-value='"+item.aData.id+"'><i class='"+css+"'></i></a></span>";
					},
					bSortable:0,
					bSearchable:0,
					sClass:"text-align-middle"
				}
			]
		});
		
		$(".grid_8 table:eq(1)").dataTable({
			"bProcessing": 0,
			"sAjaxSource": "/arko/report/searchReport.do",
			"bFilter" : 0,
			"bLengthChange" : 0,
			"bPaginate" : 0,
			"bInfo" : 0,
			"bSort" : 0,
		    "fnServerParams" : function(serverParams) {
		        serverParams.push(
		            {
		                "name" : "row",
		                "value" : 5
		            },{
		            	"name" : "status",
		            	"value" : 9
		            },{
		            	"name" : "time",
		            	"value" : 7
		            }
		        );
		    },
			"aoColumns": [
			    {"mData": "number"},
				   {"mData": null, fnRender: function(item){
			    	return "<a href='/arko/report/"+item.aData.id+"/view.do'>"+item.aData.name+"</a>";
				}},
				{"mData": null, fnRender: function(item){
					return arko.getReportText(item.aData.type);
				}},
				{"mData": "completeTime"},
				{"mData": "userName" },
				{
					"mData": null,
					fnRender: function(item){
						var url = "/arko/report/"+item.aData.id+"/download.do";
						return "<span><a href='"+url+"' class='btn btn-small' data-value='"+item.aData.id+"'><i class='icon-arrow-down'></i></a></span>";
					},
					bSortable:0,
					bSearchable:0,
					sClass:"text-align-middle"
				}
			]
		});
	});
}