
asyncLoadComplete  = function(){
	window.location.href.match(/\/(\d+)\//g);
	var reportId = RegExp.$1;

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

	var self = this;
	arko.init(self, function(){
		$.getJSON("/arko/get/" + reportId + "/report.do", function(json){

			var element = $(".mws-panel-header span:first"), url = "";
			
			if(json.status==1||json.status==2){
				element.html("<i class='icon-book'></i>"+"当前报告");
				url = "/arko/report/running.do";
			} else if(json.status==3) {
				element.html("<i class='icon-book'></i>"+"异常报告");
				url = "/arko/report/list.do";
			} else if(json.status==9) {
				element.html("<i class='icon-book'></i>"+"已完成报告");
				url = "/arko/report/list.do";
			} else if(json.status==4) {
				element.html("<i class='icon-book'></i>"+"已终止报告");
				url = "/arko/report/list.do";
			}
			
			$(".grid_8 input").attr("onclick", "window.location.href='"+url+"'");
			
			var elements = $(".mws-summary:eq(0) li");
			
			var time1 = moment(json.createTime);
			var time2 = moment(json.startTime);
			var time3 = moment(json.completeTime);
			
			elements.eq(0).find(".val span").text(json.name);
			elements.eq(1).find(".val span").text(json.number);
			elements.eq(2).find(".val span").text(arko.getReportText(parseInt(json.type)));
			elements.eq(3).find(".val span").text(arko.getStatusText(parseInt(json.status)));
			elements.eq(4).find(".val span").text(time1.format("YYYY-MM-DD / hh:mm"));
			
			if(json.status==9){
				elements.eq(5).find(".val span").text(time2.format("YYYY-MM-DD / hh:mm"));
				elements.eq(6).find(".val span").text(time3.format("YYYY-MM-DD / hh:mm"));
				
				elements.eq(5).show();
				elements.eq(6).show();
			}else{
				elements.eq(5).hide();
				elements.eq(6).hide();
			}
			
			elements.eq(7).find(".val span").text(json.userName);
			
			if(json.status==9){
				var url = "/arko/report/"+json.id+"/download.do";
				elements.eq(8).find(".val a").attr("href",url);
			}else{
				elements.eq(8).hide();
			}
			
			if(json.status==1 || json.status==2){
				elements.eq(9).hide();
				elements.eq(10).show();
				elements.eq(10).find(".val a").on("click", function(){
					var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要终止此报告?");
					var buttons = {
						"确定": function () {
							$(this).dialog("close");
							$.getJSON("/arko/report/"+reportId+"/stop.do", function(json){
								if(json.status=="OK"){
									var buttons = {
										    "关闭": function () {
											    $(this).dialog("destroy");
											    window.location.href = "/arko/report/list.do";
											}
										};
									var elements = $("<p>").append($("<i>",{'class':"icol-accpet"})).append(" 报告终止成功!");
									openDialog(elements,buttons);
								}else{
									var buttons = {
										    "关闭": function () {
											    $(this).dialog("destroy");
											}
										};
									var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 报告终止失败!");
									openDialog(elements,buttons);
								}
							});
						},
					    "取消": function () {
						    $(this).dialog("close");
						}
					};
					openDialog(elements,buttons);
				});
			}else{
				elements.eq(9).show();
				elements.eq(10).hide();
				elements.eq(9).find(".val a").on("click", function(){
					var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此报告?");
					var buttons = {
						"确定": function () {
							$(this).dialog("close");
							$.getJSON("/arko/report/"+reportId+"/delete.do", function(json){
								if(json.status=="OK"){
									var buttons = {
										    "关闭": function () {
											    $(this).dialog("destroy");
											    window.location.href = "/arko/report/list.do";
											}
										};
									var elements = $("<p>").append($("<i>",{'class':"icol-accpet"})).append(" 报告删除成功!");
									openDialog(elements,buttons);
								}else{
									var buttons = {
										    "关闭": function () {
											    $(this).dialog("destroy");
											}
										};
									var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 报告删除失败!");
									openDialog(elements,buttons);
								}
							});
						},
					    "取消": function () {
						    $(this).dialog("close");
						}
					};
					openDialog(elements,buttons);
				});
			}
			
			elements.eq(11).find(".val a").attr("href", "/arko/report/"+reportId+"/edit.do");
			
			/*if(json.period.timeType == 1 && (json.period.compareTimeType == 1 || json.period.compareTimeType == -1)){
				elements.eq(12).find(".val a").attr("href", "/arko/repeat/create.do?id="+reportId);
				elements.eq(12).show();
			}else{
				elements.eq(12).hide();
			}*/
			elements.eq(12).hide();
			
			var _p0 = "", _p1 = [], _p2 = [], _p3 = [], _p4 = [], _p5 = [], _p6=[];
			
			$.each(json.productGroup, function(index, item){
				if(item.type==-1){
					_p0 = "所有报告";
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
			if(_p1.length)
				html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
			if(_p2.length)
				html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
			if(_p3.length)
				html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";
			
			elements = $(".mws-summary:eq(1) li");
			elements.eq(0).find(".val span").html(html);
			
			_p1 = [], _p2 = [], _p3 = [];
			
			$.each(json.productGroupFilter, function(index, item){
				if(item.type==0)
					_p1.push(item.name);
				else if(item.type==1)
					_p2.push(item.name);
				else if(item.type==2)
					_p3.push(item.name);
			});
			
			$.each(json.memberGroupFilter, function(index, item){
				if(item.type==3)
					_p4.push(item.name);
				else if(item.type==4){
					_p6.push(item.name);
				}
			});
			
			var html = "";
			
			if(_p1.length)
				html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
			
			if(_p2.length)
				html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
			
			if(_p3.length)
				html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";

			if(html.length){
				elements.eq(0).addClass("li-no-border li-eee-bg");
				elements.eq(1).addClass("li-eee-bg").show();
				elements.eq(1).find(".val span").html(html);
			}
			
			var htmlStr = "";
			if(_p4.length > 0 || _p6.length > 0){
				elements.eq(3).addClass("li-no-border li-eee-bg");
				elements.eq(4).addClass("li-eee-bg").show();
			}
			if(_p4.length > 0){
				htmlStr = "» 用户标签：" + _p4.join(" / ");
			}
			if(_p4.length > 0 && _p6.length > 0){
				htmlStr += '<br/>';
			}
			if(_p6.length > 0){
				htmlStr += ( "» 自定义组：" +_p6.join(" / "));
			}
			if(htmlStr.length > 0)
				elements.eq(4).find(".val span").html(htmlStr);

			_p1 = [], _p2 = [], _p3 = [];
			$.each(json.storeGroupFilter, function(index, item){
				if(item.type==6)
					_p1.push(item.name);
				else if(item.type==7)
					_p2.push(item.name);
				else if(item.type==8)
					_p3.push(item.name);
			});
			
			var _t1 = moment(json.period[0].timeStart);
			var _t2 = moment(json.period[0].timeEnd);
			var _w1 = _t2.diff(_t1,'week')+1;
			
			html = _t1.format("YYYY/MM/DD") + " —— " + _t2.format("YYYY/MM/DD") + "【" + _w1 + "周】<br/>";
			
			if(json.period.length == 1)
				elements.eq(2).find(".val span").html(html);
			else {
				_t1 = moment(json.period[1].timeStart);
				_t2 = moment(json.period[1].timeEnd);
				html = html + "<strong>对比</strong><br/>" + _t1.format("YYYY/MM/DD") + " —— " + _t2.format("YYYY/MM/DD") + "【" + _w1 + "周】<br/>";;
				elements.eq(2).find(".val span").html(html);
			}
			
			_p5 = [];
			$.each(json.memberGroup, function(index, item){
				_p5.push(item.name);
			});
			elements.eq(3).find(".val span").html(_p5.join(" \\ "));
			
			_p5 = [];
			$.each(json.storeGroup, function(index, item){
				_p5.push(item.name);
			});
			elements.eq(5).find(".val span").html(_p5.join(" \\ "));
			
			html = "";
			
			if(_p1.length)
				html += "» 区域：" + _p1.join(" \\ ") + "<br/>";
			
			if(_p2.length)
				html += "» 自定义：" + _p2.join(" \\ ") + "<br/>";
			
			if(_p3.length)
				html += "» 门店属性：" + _p3.join(" \\ ") + "<br/>";

			if(html.length){
				elements.eq(5).addClass("li-no-border li-eee-bg");
				elements.eq(6).addClass("li-eee-bg").show();
				elements.eq(6).find(".val span").html(html);
			}
			
		});
	});
};