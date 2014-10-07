
var repeat = {
		name: "",
		report: 0,
		startDate: null,
		freq: 1,
		time: 2
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

asyncLoadComplete = function(){
	repeat.report = request.QueryString("id");
	
	var elements = $(".mws-summary:eq(0) li");

	$.getJSON(arko.getUrl("/arko/data/getlastupdatedate.do"), function(json){
		var date = moment(json.date).add('day', 1);
		while(date.day()!=0)
			date.add('day', 1);
		
		for(var i=0;i<4;i++){
			var option = $("<option>",{text:"周日 "+date.format("YYYY-MM-DD"),value:date.format("YYYY-MM-DD")});
			$(".mws-summary:eq(0) li").eq(2).find(".val select").append(option);
			date.add('day', 7);
		}
	});

	var self = this;
	arko.init(self, function(){
		$.ajax({
			url : "/arko/report/getreport.do",
			type : "POST",
			data : {id:repeat.report},
			success : function (json) {
				
				elements.eq(0).find(".val span").text(arko.getReportText(parseInt(json.type)));
				elements.eq(5).find(".val a").on('click', function(){
					
					repeat.name = $("input[name=name]").val();
					repeat.startDate = $("select[name=startDate]").val();
					repeat.freq = $("select[name=freq]").val();
					repeat.time = $("select[name=time]").val();
					
					if(!(repeat.name && repeat.name.length)){
						var buttons = {
						    "关闭": function () {
							    $(this).dialog("close");
							}
						};
						var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请填写名称!");
						openDialog(elements,buttons);
						return false;
					}
					
					$.ajax({
						url: "/arko/repeat/docreate.do",
						type: "POST",
						data: repeat,
						dataType: "json",
						success: function(data) {
							window.location.href='/arko/repeat/list.do';
						}
					});
				});
				
				var _p0 = "", _p1 = [], _p2 = [], _p3 = [], _p4 = [];
				
				$.each(json.productGroup, function(index, item){
					if(item.type==-1){
						_p0 = "所有报告";
						//acmen change 8-15
						/*return false;*/
					} else if(item.type==0)
						_p1.push(item.name);
					else if(item.type==1)
						_p2.push(item.name);
					else if(item.type==2)
						_p3.push(item.name);
				});
				
				var html = "";
				//acmen change 8-15
				if(_p0.length)
					html = "所有商品"+"<br/>";
				if(_p1.length)
					html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
				if(_p2.length)
					html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
				if(_p3.length)
					html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";
//				if(_p0.length)
//					html = "所有商品";
//				else {
//					if(_p1.length)
//						html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
//					if(_p2.length)
//						html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
//					if(_p3.length)
//						html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";
//				}
				
				elements = $(".mws-summary:eq(1) li");
				elements.eq(0).find(".val span").html(html);
				
				_p1 = [], _p2 = [], _p3 = [];
				
				$.each(json.productGroupFilter, function(index, item){
					if(item.type==0)
						_p1.push(item.name);
					else if(item.type==1)
						_p2.push(item.name);
					//acmen change 8-15
//					else if(item.type==3)
					else if(item.type==2)
						_p3.push(item.name);
				});

				
				var html = "";
				if(_p1.length)
					html += "» 分类：" + _p1.join(" \\ ") + "<br/>";
				if(_p2.length)
					html += "» 品牌：" + _p2.join(" \\ ") + "<br/>";
				if(_p3.length)
					html += "» 自定义组：" + _p3.join(" \\ ") + "<br/>";

				elements.eq(1).find(".val span").html(html);
				
				//var _t1 = moment(json.period.timeStart);
				//var _t2 = moment(json.period.timeEnd);
				//var _w1 = _t2.diff(_t1, 'week')+1;
				
				if(json.period.timeType==1){
					var text = "";
					switch(json.period.timeIndex){
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
				
				if(json.period.compareTimeType == -1)
					elements.eq(2).find(".val span").html(html);
				else{
					//_t1 = moment(json.period.compareTimeStart);
					//_t2 = moment(json.period.compareTimeEnd);
					//html = html + "<strong>对比</strong><br/>" + _t1.format("YYYY/MM/DD") + " —— " + _t2.format("YYYY/MM/DD") + "【" + _w1 + "周】<br/>";;
					
					var text = "";
					switch(json.period.compareTimeIndex){
						case 0:
							text = "一年前(同比)";
							break;
						case 1:
							text = "上一时间段（环比）";
							break;
					}
					
					html = html + "<br/><strong>对比</strong><br/>" + text;
					
					elements.eq(2).find(".val span").html(html);
				}
				
				_p1 = [];
				$.each(json.memberGroup, function(index, item){
					_p1.push(item.name);
				});
				elements.eq(3).find(".val span").html(_p1.join(" \\ "));
				
				//acmen change add member filter
				_p1 = [], _p2 = [], _p3 = [];
				
				$.each(json.memberGroupFilter, function(index, item){
					if(item.type==3)
						_p1.push(item.name);
					else if(item.type==4)
						_p2.push(item.name);
					else if(item.type==5)
						_p3.push(item.name);
				});

				
				var html = "";
				if(_p1.length)
					html += "" + _p1.join(" \\ ") + "<br/>";
				if(_p2.length)
					html += "" + _p2.join(" \\ ") + "<br/>";
				if(_p3.length)
					html += "" + _p3.join(" \\ ") + "<br/>";

				elements.eq(4).find(".val span").html(html);
				
				_p1 = [];
				$.each(json.storeGroup, function(index, item){
					_p1.push(item.name);
				});
				elements.eq(5).find(".val span").html(_p1.join(" \\ "));
				
				//acmen change add store group filter
				_p1 = [], _p2 = [], _p3 = [];
				
				$.each(json.storeGroupFilter, function(index, item){
					if(item.type==6)
						_p1.push(item.name);
					else if(item.type==7)
						_p2.push(item.name);
					else if(item.type==8)
						_p3.push(item.name);
				});

				
				var html = "";
				if(_p1.length)
					html += "» 区域：" + _p1.join(" \\ ") + "<br/>";
				if(_p2.length)
					html += "» 自定义属性：" + _p2.join(" \\ ") + "<br/>";
				if(_p3.length)
					html += "» 门店属性：" + _p3.join(" \\ ") + "<br/>";

				elements.eq(6).find(".val span").html(html);
				
		    }
		});
	});
	
	$("input[name=name]").on("change", function(){
		repeat.name = $(this).val();
	});
	
	$("select").on("change", function(){
		var field = $(this).attr("name");
		var value = $(this).val();
		repeat[field] = value;
	});
	
};