
var query = {type:0,status:0,aid:0,time:0,reportname:''};

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
		} else if(element.find(".icon-trash").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此报告?");
			var buttons = {
				"确定": function(){
					$(this).dialog("close");
					$.getJSON("/arko/report/"+reportId+"/delete.do", function(json){
						var buttons = {
								"关闭": function(){
									$(this).dialog("close");
								}
						};
						if(json.status=="OK"){
							target.remove();
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 报告删除成功!");
							openDialog(elements, buttons);
						}else{
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 报告删除失败!");
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
					$(this).dialog("close");
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
	
	$.getJSON('/arko/data/getusers.do', function(json){
		var element = $(".dataTables_filterbar select:eq(2)");
		$.each(json, function(index, item){
			var option = $("<option>", {text:item.userName,value:item.id});
			element.append(option);
		});
	});
	
	function search(){
		
		query.type = $(".dataTables_filterbar select:eq(0)").val();
		query.status = $(".dataTables_filterbar select:eq(1)").val();
		query.aid = $(".dataTables_filterbar select:eq(2)").val();
		query.time = $(".dataTables_filterbar select:eq(3)").val();
		query.reportname = $(".dataTables_filterbar input:eq(0)").val();
		
		var fieldText = "";
		if(query.status==9){
			fieldText = "完成时间";
		}else{
			fieldText = "创建时间";
		}
		
		$(".mws-datatable-fn th:eq(3)").text(fieldText);
		$(".mws-datatable-fn th:eq(3)").attr("aria-label", fieldText);
		
		$(".mws-datatable-fn").dataTable({
			"bProcessing": 0,
			"sAjaxSource": "/arko/report/searchReport.do",
			"bFilter" : 0,
			"bLengthChange" : 0,
			"bDestroy" : true,
			"aaSorting": [[3,'desc']],
		    "fnServerParams" : function(serverParams) {
		    	$.each(query, function(name,value){
			        serverParams.push({"name":name,"value":value});
		    	});
		    },
		    "bServerSide": true,
			"aoColumns": [
			    {"mData": "number"},
				{"mData": null, bSortable: 0, fnRender: function(item){
			    	return "<a href='/arko/report/"+item.aData.id+"/view.do'>"+item.aData.name+"</a>";
				}},
				{"mData": null, bSortable: 0,fnRender: function(item){
					return arko.getReportText(item.aData.type);
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
					if(query.status==9){
						return item.aData.completeTime;
					}else{
						return item.aData.createTime;
					}
				}},
				{"mData": "userName", bSortable: 0 },
				{"mData": null, bSortable: 0, fnRender: function(item){
					return arko.getStatusText(item.aData.status);
				}},
				{"mData": null, bSortable: 0, fnRender: function(item){
						if(item.aData.status==3){
							return "该异常报告已邮件通知系统管理员";
						}
						var css = "", url = "#";
						if(item.aData.status==9) {
							css = "icon-arrow-down";
							url = "/arko/report/"+item.aData.id+"/download.do";
						} else if(item.aData.status==3)
							css = "icon-repeat";
						else if(item.aData.status==4) {
							css = "icon-search";
							url = "/arko/report/"+item.aData.id+"/view.do";
						} else if(item.aData.status==1||item.aData.status==2)
							css = "icon-remove-circle";
						else
							css = "icon-trash";
						
						return "<span><a href='"+url+"' class='btn btn-small' data-value='"+item.aData.id+"'><i class='"+css+"'></i></a></span>";
					},bSortable:0,bSearchable:0,sClass:"text-align-middle"
				}
			],
		    sPaginationType: "full_numbers"
		});
	}

	var self = this;
	arko.init(self, function(){

		arko.TypeSequence.foreach(function(tidx, tid) {
			$.each(arko.Sequence, function(ridx, rid){
				var item = arko.Report[rid];
				if(item.type == tid){
					var option = $("<option>", {text: item.text, value: rid});
					$(".dataTables_filterbar select:eq(0)").append(option);
				}
			});
		});
		
		$(".dataTables_filterbar a").on("click", search);
		search();
	});
};