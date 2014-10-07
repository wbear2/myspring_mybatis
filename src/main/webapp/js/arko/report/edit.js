
asyncLoadComplete  = function(){
    moment.lang('zh-cn');
    var self = this;
    arko.init(self, function(){
    	init();
    });
};

$("fieldset[group=daterange] legend:gt(0) div:eq(0)").addClass("time-select01");
$("fieldset[group=daterange] legend:gt(0) div:eq(1)").addClass("time-select02");

var dialog = $("<div>").appendTo($("body"));

var report = {
	id : 0,
	type : 0,
	number: "0",
	name : "Report",
	productGroups : [],
	filters : [],
	memberGroups : [],
	memberGroupsFilters : [],
	storeGroups : [],
	storeGroupsFilters : [],
	periods : [],
	repeatReport : {
		name : null,
		startDate: null,
		freq: 1,
		time: 2
	},
	repeat : false
};

var old_report = null;

var _cache = null;

var setting = null;

var startDate=null,endDate=null;

function fillDropDownList(target,list,prefix){
	$.each(list, function(index, item){
		target.append($("<option>",{text:prefix+item.name,value:item.id}));
		if(item.subfolder && item.subfolder.length) {
			fillDropDownList(target,item.subfolder,prefix+"--");
		}
	});
}

function init(){
	window.location.href.match(/\/(\d+)\//g);
	var reportId = RegExp.$1;
	
	$("li[group=isRepeatReport]").hide();
	$("li[group=repeatReport]").hide();
    
    $("#mws-creategroup-dialog").dialog({
    	autoOpen: false,
    	modal: true,
    	width: 500,
    	title: "创建组",
    	buttons: {
    		"添加": function(){
    			var name=$("#mws-creategroup-dialog input").val(),folder=$("#mws-creategroup-dialog select").val();
    			var group = {
    					filters:report.filters,
    					productGroup:report.productGroups,
    					storeGroup : [],
    					name:name,
    					folder:folder
    			};
    			$("#mws-creategroup-dialog input").val("");
    			
    			var buttons = {
    			    "关闭": function () {
    				    $(this).dialog("close");
    				}
    			};
    			
    			if(!group.name){
    				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请填写组名!");
    				openDialog(elements,buttons);
    				return false;
    			}else if(!group.folder){
    				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 请选择文件夹!");
    				openDialog(elements,buttons);
    				return false;
    			}
    			
    			var flag = false;
    			$.each(report.productGroups, function(index, item){
    				if(item.type==2){
    					flag = true;
    					return false;
    				}
    			});
    			if(flag){
    				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 不能用自定义组来创建自定义组!");
    				openDialog(elements,buttons);
    				return false;
    			}
    			
               	$.ajax({
            		url : "/arko/group/createGroup.do",
            		type : "POST",
            		data : {jsonData:JSON.stringify(group)},
            		success : function (val) {
            			var elements = $("<p>");
            			if(val.status=="OK"){
            				elements.append($("<i>",{'class':"icol-accept"})).append(" 自定义组创建成功!");
            			}else{
            				elements.append($("<i>",{'class':"icol-cancel"})).append(" 自定义组创建失败!<br/>"+val.msg);
            			}
        				
        				var buttons = {
        				    "关闭": function () {
        				        $(this).dialog("close");
        				    }
        				};
        				openDialog(elements,buttons);
        				$("#mws-creategroup-dialog").dialog("close");
            	    }
            	});
    		},
    		"取消": function(){
    			$("#mws-creategroup-dialog input").val("");
    			$(this).dialog("close");
    		}
    	}
	});
    
	$.getJSON("/arko/get/" + reportId +"/report.do",function(json){
		old_report = json;
		var element = $(".mws-panel-header span");
		element.empty();
		element.append($("<i>", {"class": "icon-magic"}));
		element.append("报告名称 - " + arko.getReportText(json.type));
		$("input[name=ReportName]").val(json.name);
		$("#preview-reportType span span").text(arko.getReportText(json.type));
		$("#preview-reportId span span").text(json.number);
		
		setting = arko.getSetting(json.type);
		
		if(setting.periods.max==104){
			var option = $("<option>",{value:104,text:"最近104周"});
			$("[group=daterange-one][data-value=1] select").append(option);
		}
		
		report.id = json.id;
		report.type = json.type;
		report.number = json.number;
		report.name = json.name;
		var startDateB ={};
		startDateB.start = json.period[0].timeStart;
		startDateB.end = json.period[0].timeEnd;
		var startDateC = {};
		if(json.period.length > 1) {
			startDateC.start = json.period[1].timeStart;
			startDateC.end = json.period[1].timeEnd;
		} else {
			startDateC.start = null;
			startDateC.end = null;
		}
		
        //添加 其他的一些信息
        if(json.otherMsg){
            json.otherMsg.date1 && $('input[name=date1]').val(json.otherMsg.date1);
            json.otherMsg.minDate && $('input[name=mindate]').val(json.otherMsg.minDate);
            json.otherMsg.maxDate && $('input[name=maxdate]').val(json.otherMsg.maxDate);
            json.otherMsg.support && $('input[name=support]').val(json.otherMsg.support);
            json.otherMsg.confidence && $('input[name=confidence]').val(json.otherMsg.confidence);
            json.otherMsg.level && $('input[name=level]').val(json.otherMsg.level);
        }

		$.getJSON(arko.getUrl("/arko/data/getjson.do"),function(json){
			var data = [{text : "分类", items : json.categories},
			            {text : "品牌", items : json.brands},
				        {text : "自定义组", items : [
				     				        	{name:"私有组",items:json.privateGroup[0],id:0},
				    				        	{name:"共享组",items:json.shareGroup[0],id:1}
				    			            ], flag : 1}];
			
			var filter = [{text : "分类", items : json.categories},
				          {text : "品牌", items : json.brands},
				          {text : "自定义属性", items: json.properties[0]}];
			
			_cache = data;
			//acmen add 
			var longDateFlag = false;
			if(setting.periods.max==104){
				longDateFlag = true;
			}
			startDate = moment(moment(json.date.start).format('YYYY/MM/DD'),'YYYY/MM/DD');
		    endDate = moment(moment(json.date.end).format('YYYY/MM/DD'),'YYYY/MM/DD');
		    report.periods.push({start:null,end:null,week:0,type:0,index:0});
		    if(setting.periods.dateLevel == 1) {
		    	report.periods.push({start:null,end:null,week:0,type:0,index:0});
		    }
		    var period = old_report.period;
			$.fn.pickDate && $('.daterange').pickDate({
				cache: report.periods,
				startDate:startDate,
				endDate:endDate,
				bDate: startDateB,
				cDate: startDateC,
				oldPeriod: period,
				dateType:json.dateType,
				longDateFlag: longDateFlag,
				dateLevel:setting.periods.dateLevel,
				callback: function(){
//					preview();
				}
			});
			
			//acmen add 
			startDate = moment(moment(json.date.start).format('YYYY/MM/DD'),'YYYY/MM/DD');
		    endDate = moment(moment(json.date.end).format('YYYY/MM/DD'),'YYYY/MM/DD');
			$.fn.pickDate && $('.daterange').pickDate({
				cache: report.periods,
				startDate:startDate,
				endDate:endDate,
				bDate: startDateB,
				cDate: startDateC,
				callback: function(){
					preview();
				}
			});
			
		    $.fn.pickList2 && $('.productgroup_pickList').pickList2({
				data : data,
				selectedData : [old_report.productGroup,
				                old_report.productGroupFilter],
		        filter : filter,
		        mode : 1,
		        cache : report.productGroups,
		        filterCache : report.filters,
		        maxGroup : setting.productGroups.maxGroup,
		        maxItem : setting.productGroups.maxItem,
		        multiple : setting.productGroups.multiple,
		        summary : setting.productGroups.summary,
		        enableAllLargeCategory : setting.productGroups.enableAllLargeCategory,
		        enableAllMediumCategory : setting.productGroups.enableAllMediumCategory,
		        enableAllSmallCategory : setting.productGroups.enableAllSmallCategory,
		        enableAllBrand : setting.productGroups.enableAllBrand,
		        flag: setting.productGroups.flag,
		        openDialog : openDialog,
				preview : function(){
					var html = "", flag = 1;
					this.summaryLabel.empty();
					var self = this;
			        
			        $.each(report.filters, function(index, item){
			            var type = filter[item.type].text;
			            var list = [];
			            $.each(item.items, function(index, tag){
			                list.push(tag.text);
			            });
			            
			            if(flag){
				            flag = 0;
			            	html += "满足" + type + "：" + list.join(" 或 ") + "<br/>";
			            }else{
				            html += "并且" + type + "：" + list.join(" 或 ") + "<br/>";
			            }
			        });
			        $("#preview-productgroups .right-orange div").html(html);
			        if(html&&setting.productGroups.summary){
			        	this.summaryLabel.append("» 筛选条件:<br/>"+html+"<br/>");
			        }
			        
			        html = "", flag = 1;
			        $.each(report.productGroups, function(index, item){
			        	if(item.type==-1){
			        		html += "所有产品<br/>";
			        	} else {
				            var type = data[item.type].text;
				            var list = [];
				            $.each(item.items, function(index, subItem){
				                list.push(subItem.text);
				            });
				            
				            if(self.options.multiple){
					            html += type + "：" + list.join(" 和 ") + "<br/>";
				            }else{
				            	
					            /*if(flag){
					            	flag = 0;
					            	type = "满足" + type;
					            }else{
					            	type = "并且" + type;
					            }*/
					            
					            html += type + "：" + list.join(" 或 ") + "<br/>";
				            }
			        	}
			        });
			        var text = "» 产品组";
		        	text += setting.productGroups.multiple ? "（下列内容分别为独立的分析组）:" : "（取下列内容的并集）:";
		        	$("#preview-productgroups .left-green strong").html(text);
		        	$("#preview-productgroups .left-green div").html(html);
			        if(html&&setting.productGroups.summary){
			        	this.summaryLabel.append(text+"<br/>"+html);
			        }
				}
			});

		    $.fn.pickList3 && $('.membergroup_pickList').pickList3({
				sourceListLabel : "可选项",
		        targetListLabel : "选中项",
		        data : [{name : "会员组", children: json.members},
		                {name : "自定义组", children: [{name:"私有组",children:json.privateGroup[2],id:0},
		                                               {name:"共享组",children:json.shareGroup[2],id:1}]}],
		        selectedData : [old_report.memberGroup,
		                        old_report.memberGroupFilter],
//		        filter : json.members,
                filter : [{name : "会员标签", children: json.members},
      	                {name : "自定义组", children: [{name:"私有组",children:json.privateGroup[2],id:0},
      	                                               {name:"共享组",children:json.shareGroup[2],id:1}]}],
		        cache : report.memberGroups,
		        filterCache : report.memberGroupsFilters,
		        maxGroup : setting.memberGroups.maxGroup,
		        multiple : setting.memberGroups.multiple,
		        summary : setting.memberGroups.summary,
		        enableFilter : setting.memberGroups.enableFilter,
		        openDialog : openDialog,
		        enableModeSelector: enableModeSelector
			});
			
			$.fn.pickList4 && $('.storegroup_pickList').pickList4({
				sourceListLabel : "可选项",
		        targetListLabel : "选中项",
		        data : [{name : "区域", children : json.stores},
				        {name : "自定义组", children : [
					     				        	{name:"私有组",children:json.privateGroup[1],id:0},
					    				        	{name:"共享组",children:json.shareGroup[1],id:1}
					    			            ]},
					    {name : "门店属性", children:json.commonProperties[1]}],
				filter : [{name : "区域", children : json.stores},
				          {name : "自定义属性", children:json.properties[1]},
				          {name : "门店属性", children:json.commonProperties[1]}],
		        selectedData : [old_report.storeGroup,
		                        old_report.storeGroupFilter],
		        cache : report.storeGroups,
		        filterCache : report.storeGroupsFilters,
		        maxGroup : setting.storeGroups.maxGroup,
		        multiple : setting.storeGroups.multiple,
		        summary : setting.storeGroups.summary,
		        enableFilter : setting.storeGroups.enableFilter,
		        openDialog : openDialog
			});
		    
//		    startDate = moment(json.date.start);
//		    endDate = moment(json.date.end);
//			
//			var elements = $("fieldset[group=daterange] select[data-type=year]");
//			elements.empty();
//			var flag = 1;
//			for(var i=endDate.year();i>=startDate.year();i--){
//				if(flag){
//					flag = 0;
//					elements.append($("<option>",{text:i+'年',value:i,checked:"checked"}));
//				}else{
//					elements.append($("<option>",{text:i+'年',value:i}));
//				}
//			}

			var target = $("#mws-creategroup-dialog select");
			
			if(json.privateGroup[0].length || json.shareGroup[0].length){
				target.append($("<optgroup>",{label:"私有组"}));
				fillDropDownList(target,json.privateGroup[0],"--");
				target.append($("<optgroup>",{label:"共享组"}));
				fillDropDownList(target,json.shareGroup[0],"--");
			}else{
				target.parent().html($("<div>").append($("<a>",{text:"请先点击此处创建文件夹",href:"/arko/group/list.do"})));
			}
			
			var date = endDate.clone().add('day', 1);
			while(date.day()!=6)
				date.add('day', 1);
			
			for(var i=0;i<4;i++){
				var option = $("<option>",{text:"周六 "+date.format("YYYY-MM-DD"),value:date.format("YYYY-MM-DD")});
				$("[name=startDate]").append(option);
				date.add('day', 7);
			}
			
			//populateDate();
			

		});
	});
	
	$("input[name=ReportName]").on("blur", function(){
		var name = $(this).val();
		report.name = name.replace(/[\\\/|:\*\?\"<>]/ig, '');
		$(this).val(report.name);
	});
	
	$("#isRepeatReport").on("change", function(){
		if($("#isRepeatReport").attr("checked")){
			$("li[group=repeatReport]").show();
			report.repeat = true;
		}else{
			$("li[group=repeatReport]").hide();
			report.repeat = false;
		}
	});
	
	$("[group=repeatReport] [name=name]").on("blur", function(){
		var name = $(this).val();
		report.repeatReport.name = name.replace(/[\\\/|:\*\?\"<>]/ig, '');
		$(this).val(report.repeatReport.name);
	});
	
	$("[group=repeatReport] [name=startDate]").on("change", function(){
		report.repeatReport.startDate = $(this).val();
	});
	
	$("[group=repeatReport] [name=freq]").on("change", function(){
		report.repeatReport.freq = $(this).val();
	});
	
	$("[group=repeatReport] [name=time]").on("change", function(){
		report.repeatReport.time = $(this).val();
	});
	
    $(document).ready(function() {
        if( $.fn.wizard ) {
            if( $.fn.validate ) {
                $wzd_v1_form = $( '.wzd-ajax' ).validate({
                	rules: {
                		ReportName: "required"
                	},
                	messages: {
                		ReportName: "此项为必填项,且不允许输入 /|\\|<|>|*|? 等字符!"
                	},
                	onsubmit: false
                });
                $( '.wzd-ajax' ).wizard({
                    buttonContainerClass: 'mws-button-row', 
                    onStepLeave: function(wizard, step, wzdId) {
                    	
                    	var group = $(step).attr("group");
                    	
                    	var flag = true;
            			var buttons = {
                			    "关闭": function () {
                				    $(this).dialog("close");
                				}
                			};
            			var msg = "";
                    	
                    	if(wizard._activeWzdId.split('_')[2]<wzdId.split('_')[2]){
	                    	switch(group){
	                    		case "productgroup":
	                    			flag = report.productGroups.length;
	                    			if(flag){
	                    				if(!setting.productGroups.flag) {
		                    				var total = $('.productgroup_pickList').pickList2('count');
		                    				if(total <= 0 ) {
                    							msg = " 产品组的商品数量不能为0,请重新选择!";
                    							flag = false;
		                    				} else if(setting.productGroups.maxItem&&(total>setting.productGroups.maxItem)){
	                							msg = " 最多只允选择6000个商品!";
	                							flag = false;
		                    				}
	                    				}
	                    			}else{
            							msg = " 请选择产品组!";
	                    				flag = false;
	                    			}
	                    			break;
	                    		case "daterange":
	                    			
	                    			 if(report.periods[0].start != null){
	                    				 if(report.periods[0].start>report.periods[0].end){
	            							msg = " 基准时间段选择错误!";
		                    				flag = false;
		                    			} else {
	                    					if(report.periods[0].start<startDate){
	                    						var day = startDate.diff(report.periods[0].start, 'day');
	                    						if(day>=7){
	                    							msg = " 基准时间段的起始日期错误!<br/>当前数据起始日期为:"+startDate.format("L");
	                    							flag = false;
	                    						}
	                    					}else if(report.periods[0].end > endDate){
                    							msg = " 基准时间段的截止日期错误!<br/>当前数据截止日期为:"+endDate.format("L");
                    							flag = false;
	                    					}
		                    			}
	                    			}
	                    			if(flag && report.periods.length>1 && report.periods[1].start != null){
	                    				if(report.periods[1].start>report.periods[1].end){
	            							msg = " 比较时间段选择错误!";
	                    					flag = false;
	                    				} else {
	                    					if(report.periods[1].start<startDate){
	                    						var day = startDate.diff(report.periods[1].start, 'day');
	                    						if(day>=7){
	                    							msg = " 比较时间段的起始日期错误!<br/>当前数据起始日期为:"+startDate.format("L");
	                    							flag = false;
	                    						}
	                    					}else if(report.periods[1].end > endDate){
                    							msg = " 比较时间段的截止日期错误!<br/>当前数据截止日期为:"+endDate.format("L");
                    							flag = false;
	                    					}
	                    				}
	                    			}
	                    			
	                    			break;
	                    		case "membergroup":
	                    			flag = report.memberGroups.length;
	                    			break;
	                    		case "storegroup":
	                    			flag = report.storeGroups.length;
	                    			break;
	                    	}
	                    	
	                    	flag = flag && $wzd_v1_form.form();
                    	}
                    	
                    	if(!flag&&msg.length){
            				var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(msg);
            				openDialog(elements,buttons);
                    	}
                    	
                        return flag;
                    }, 
                    onStepShown: function(wizard, step, wzdId){
                    	$(window).resize();
                    },
                    onBeforeSubmit: function() {
                        return $wzd_v1_form.form();
                    }, 
                    onSubmit: function() {
                    	
                    	var jsonData = JSON.stringify(report);
                    	jsonData = JSON.parse(jsonData);
                    	
                    	//TODO acmen 增加时间序列的参数设置
                    	
                        jsonData.otherMsg = {};
                        jsonData.otherMsg.date1 = $('input[name=date1]').val();
                        jsonData.otherMsg.mindate = $('input[name=mindate]').val();
                        jsonData.otherMsg.maxdate = $('input[name=maxdate]').val();
                        jsonData.otherMsg.support = $('input[name=support]').val();
                        jsonData.otherMsg.confidence = $('input[name=confidence]').val();
                        jsonData.otherMsg.level = $('input[name=level]').val();
                    	
                    	jsonData.repeatReport.name = $("[group=repeatReport] [name=name]").val();
                    	jsonData.repeatReport.startDate = $("[group=repeatReport] [name=startDate]").val();
                    	jsonData.repeatReport.freq = $("[group=repeatReport] [name=freq]").val();
                    	jsonData.repeatReport.time = $("[group=repeatReport] [name=time]").val();

                    	for(var i=0; i<jsonData.periods.length; i++) {
                    	  jsonData.periods[i].start = report.periods[i].start.format("YYYY-MM-DD");
                    	  jsonData.periods[i].end = report.periods[i].end.format("YYYY-MM-DD");
                    	}
                    	
                    	var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 正在提交报告...");
                    	openDialog(elements,null);
                    	
                    	$.ajax({
                    		url : "/arko/report/save2.do",
                    		type : "POST",
                    		data : {jsonData:JSON.stringify(jsonData)},
                    		success : function (json) {
                                elements = $("<p>");
                                var buttons = {};
                    			if(json.status=="OK"){
                                    elements.append($("<i>",{'class':"icol-accept"})).append(" 您的报告已经修改成功，正在生成中，请稍候查看！");
                                    buttons = {
                    				    "继续创建报告": function () {
                    				        window.location.href = "/arko/report/select.do";
                    				    },
                    				    "查看详细": function () {
                    				        window.location.href = "/arko/report/"+json.id+"/view.do";
                    				    },
                    				    "OK": function () {
                    				        window.location.href = "/arko/report/running.do";
                    				    }
                    				};
                    			}else{
                                    elements.append($("<i>",{'class':"icol-cancel"})).append(json.msg);
                                    buttons = {
                    				    "重新创建报告": function () {
                    				       	window.location.href = "/arko/report/select.do";
                    				        $(this).dialog("destroy");
                    				    },
                    				    "关闭": function () {
                    				        $(this).dialog("destroy");
                    				    }
                    				};
                    			}
                    			openDialog(elements,buttons);
                    	    }
                    	});
                    },
                    ajaxSubmit: true, 
                    ajaxOptions: {
                        dataType: 'text', 
                        success: function(response, status, xhr, form) {
                            $wzd_v1_form.resetForm();
                        }
                    }
                });
            }
        }
    });
}

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