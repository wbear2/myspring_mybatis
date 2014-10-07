asyncLoadComplete = function(){
	
	moment.lang("zh-cn");
	
	var reportId = request.QueryString("id"), report = null;

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
	
	$.getJSON(arko.getUrl("/arko/data/getlastupdatedate.do"), function(json){
		var element = $("#mws-form-dialog .mws-form-item").eq(1).find("select");
		
		var date = moment(json.date).add('day', 1);
		while(date.day()!=0)
			date.add('day', 1);
		
		for(var i=0;i<4;i++){
			var option = $("<option>",{text:"周日 "+date.format("YYYY-MM-DD"),value:date.format("YYYY-MM-DD")});
			element.append(option);
			date.add('day', 7);
		}
	});

	var self = this;
	arko.init(self, function(){
		$.getJSON("/arko/repeat/getrepeatreport.do", {id:reportId}, function(json){
			report = json;
			
			var elements = $(".mws-summary:eq(0) li span.val");
			
			elements.eq(0).text(json.name);
			elements.eq(1).text(json.id);
			elements.eq(2).text(arko.getReportText(json.type));
			elements.eq(3).text(moment(json.startDate).format("L"));
			elements.eq(4).text("每 "+json.freq+" 周");
			elements.eq(5).text("共"+json.time+"次，剩余"+json.leftTime+"次。");
			elements.eq(6).find("a").on("click", function(){

				var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此重复报告?");
				var buttons = {
					"确定": function(){
						$(this).dialog("close");
						$.getJSON("/arko/repeat/"+reportId+"/delete.do", function(json){
							var buttons = {
									"关闭": function(){
										window.location.href = "/arko/repeat/list.do";
									}
							};
							if(json.status=="OK"){
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
			});
			elements.eq(7).find("a").on("click", function(){
				var e = $("#mws-form-dialog .mws-form-item");
				e.eq(0).find("input").val(report.name);
				e.eq(2).find("select").val(report.freq);
				e.eq(3).find("select").val(report.time);
				$("#mws-form-dialog").dialog("open");
			});
			
			elements = $(".mws-summary:eq(1) li span.val");
			
			var _p0 = "", _p1 = [], _p2 = [], _p3 = [], _p4 = [];
			
			$.each(json.report.productGroup, function(index, item){
				if(item.type==-1){
					_p0 = "所有报告";
					return false;
				} else if(item.type==0)
					_p1.push(item.name);
				else if(item.type==1)
					_p2.push(item.name);
				else if(item.type==2)
					_p3.push(item.name);
			});
			
			var html = "";
			if(_p0.length)
				html = "所有商品";
			else {
				if(_p1.length)
					html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
				if(_p2.length)
					html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
				if(_p3.length)
					html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";
			}
			
			elements.eq(0).html(html);
			
			_p1 = [], _p2 = [], _p3 = [];
			
			$.each(json.report.productGroupFilter, function(index, item){
				if(item.type==0)
					_p1.push(item.name);
				else if(item.type==1)
					_p2.push(item.name);
				else if(item.type==2)
					_p3.push(item.name);
			});
			
			$.each(json.report.memberGroupFilter, function(index, item){
				if(item.type==3)
					_p4.push(item.name);
			});
			
			var html = "";
			if(_p1.length)
				html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
			if(_p2.length)
				html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
			if(_p3.length)
				html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";

			elements.eq(1).html(html);
			
			//var _t1 = moment(json.report.period.timeStart);
			//var _t2 = moment(json.report.period.timeEnd);
			//var _w1 = _t2.diff(_t1,'week')+1;

			if(json.report.period.timeType==1){
				var text = "";
				switch(json.report.period.timeIndex){
					case 0:
						text = "年至今";
						break;
					case 1:
						text = "最近1周";
						break;
					case 2:
						text = "最近4周";
						break;
					case 3:
						text = "最近13周";
						break;
					case 4:
						text = "最近26周";
						break;
					case 5:
						text = "最近52周";
						break;
					case 6:
						text = "最近104周";
						break;
				}
				html = text;
			}
			
			//html = _t1.format("YYYY/MM/DD") + " —— " + _t2.format("YYYY/MM/DD") + "【" + _w1 + "周】<br/>";
			
			if(json.report.period.compareTimeType == -1)
				elements.eq(2).html(html);
			else{
				//_t1 = moment(json.report.period.compareTimeStart);
				//_t2 = moment(json.report.period.compareTimeEnd);
				//html = html + "<strong>对比</strong><br/>" + _t1.format("YYYY/MM/DD") + " —— " + _t2.format("YYYY/MM/DD") + "【" + _w1 + "周】<br/>";;
				
				var text = "";
				switch(json.report.period.compareTimeIndex){
					case 0:
						text = "一年前(同比)";
						break;
					case 1:
						text = "上一时间段（环比）";
						break;
				}
				
				html = html + "<br/><strong>对比</strong><br/>" + text;
				
				elements.eq(2).html(html);
			}
			
			_p1 = [];
			$.each(json.report.memberGroup, function(index, item){
				_p1.push(item.name);
			});
			elements.eq(3).html(_p1.join(" \\ "));
			
			_p1 = [];
			$.each(json.report.storeGroup, function(index, item){
				_p1.push(item.name);
			});
			elements.eq(5).html(_p1.join(" \\ "));
			
			if(_p4.length){
				elements.eq(3).parent().addClass("li-no-border li-eee-bg");
				elements.eq(4).parent().addClass("li-eee-bg").show();
				elements.eq(4).html(_p4.join(" / "));
			}
			
			elements = $(".mws-table tbody");
			if(json.completeReport.length){
				$.each(json.completeReport, function(index, item){
					var tr = $("<tr>");
					
					tr.append($("<td>").append(createReportLink(item.id,item.status,item.number)));
					tr.append($("<td>").append(createReportLink(item.id,item.status,arko.getReportText(item.type))));
					tr.append($("<td>").append(createReportLink(item.id,item.status,moment(arko.startTime).format("L"))));
					tr.append($("<td>").append(createReportLink(item.id,item.status,arko.getStatusText(item.status))));
					
					elements.find("tr:last").before(tr);
				});
			}else{
				var tr = $("<tr>").append($("<td>",{valign:"top",colspan:"4"}).append("暂无记录"));
				elements.find("tr:last").before(tr);
			}
			
			var offset = (json.time-json.leftTime)*json.freq;
			var nextDate = moment(json.startDate).add('week', offset);
			
			elements.find("tr:last td").append(nextDate.format("L"));
			
		});
	});
	
	function createReportLink(id,status,text){
		var link = $("<a>",{href:"/arko/report/"+id+"/view.do"}).append(text);
		return link;
	}
	
	$("#mws-form-dialog").dialog({
	    autoOpen: false,
	    title: "修改重复报告规则",
	    modal: true,
	    width: "640",
	    buttons: {
	    	"提交" : function(){
	    		var elements = $("#mws-form-dialog .mws-form-item");
	    		var json = {name:"",startDate:null,freq:0,time:0,id:0};
	    		json.name = elements.eq(0).find("input").val();
	    		json.startDate = elements.eq(1).find("select").val();
	    		json.freq = elements.eq(2).find("select").val();
	    		json.time = elements.eq(3).find("select").val();
	    		json.id = reportId;
	    		
	    		if(!(json.name && json.name.length)){
	            	var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请输入名称!");
                    var buttons = {
        				    "关闭": function () {
        				        $(this).dialog("destroy");
        				    }
        				};
	            	openDialog(elements,buttons);
	            	return false;
	    		}

            	var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 正在传输数据...");
            	openDialog(elements,null);
            	$("#mws-form-dialog").dialog("close");
            	
				$.ajax({
					url: "/arko/repeat/save.do",
					type: "POST",
					data: json,
					dataType: "json",
					success: function(json) {
						var elements = $("<p>");
						if(json.status!="OK"){
                            elements.append($("<i>",{'class':"icol-accept"})).append(json.msg);
                            buttons = {
            				    "关闭": function () {
            				        $(this).dialog("destroy");
            				    }
            				};
						}else{
                            elements.append($("<i>",{'class':"icol-accept"})).append("修改成功");
                            buttons = {
            				    "关闭": function () {
            				        window.location.reload();
            				    }
            				};
						}
            			openDialog(elements,buttons);
					}
				});
	    		
	    	},
	    	"关闭": function(){
	    		$(this).dialog("close");
	    	}
	    }
	});
};