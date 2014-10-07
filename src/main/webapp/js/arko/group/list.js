
var _private_product_group = $("#productGroups li[data-type=1] ul");
var _share_product_group = $("#productGroups li[data-type=3] ul");
var _private_store_group = $("#storeGroups li[data-type=2] ul");
var _share_store_group = $("#storeGroups li[data-type=4] ul");
var _private_member_group = $("#memberGroups li[data-type=5] ul");
var _share_member_group = $("#memberGroups li[data-type=6] ul");



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
	$.getJSON(arko.getUrl("/arko/group/getlist.do"), function(data){
		
		var privateGroup = data.privateGroup;
		var shareGroup = data.shareGroup;
		
		var memberGroup = data.memberGroup;
		
		_populateLists(_private_product_group, privateGroup[0], 1);
		_populateLists(_private_store_group, privateGroup[1],2 );
		_populateLists(_share_product_group, shareGroup[0], 3);
		_populateLists(_share_store_group, shareGroup[1], 4);
		_populateLists(_private_member_group, memberGroup[0], 5);
		_populateLists(_share_member_group, memberGroup[1], 6);
		
		$(".pickList_list span").hover(function(){$(".pickList_list span").removeClass("blue_bg");$(this).addClass("blue_bg");});
		$(".pickList_list .creat_document").hover(function(){$(".pickList_list span").removeClass("blue_bg");$(this).prev().addClass("blue_bg");});
		//$(".pickList_list label").hover(function(){$(".pickList_list label").parent().next().hide();$(this).parent().next().show();});
	});
};

function _populateLists (target, list, datatype){
	$.each(list, function(index, item){
		var li = createItem(item.name,item.id, 0, datatype);
		
		if(item.subfolder && item.subfolder.length) {
			_populateLists(li.find("ul"), item.subfolder, datatype);
		}
		
		if(item.items && item.items.length) {
			_populateItems(li.find("ul:first"), item.items, datatype);
		}
		
		target.append(li);
	});
}

function _populateItems(target, list, datatype) {
	$.each(list, function(index, item){
		var li = createItem(item.name,item.id,item.type, datatype);
		target.append(li);
	});
}

function createItem(name, value, type, datatype){
	
	var li = null;
	if(type) {
		var css = type!=1?"ui-icon ui-icon-folder-locked":"ui-icon ui-icon-folder-unlock";
		li = $("<li>", {"data-value": value, "data-type": type});
		var span = $("<span>");
		span.append($("<i>",{"class":css}));
		span.append($("<label>").append($("<strong>",{text:name})));
		li.append(span).append(createLinks(1,datatype));
	}else if(datatype == 5 || datatype == 6 ){
		li = $("<li>", {"data-value": value, "data-type": datatype});
		var span = $("<span>");
		span.append($("<i>",{"class":"ui-icon ui-icon-folder-collapsed"}));
		span.append($("<label>").append($("<strong>",{text:name})));
		li.append(span).append(createLinks(2,datatype)).append($("<ul>",{"class":"pickList_list"}));
	} else {
		li = $("<li>", {"data-value": value, "data-type": datatype});
		var span = $("<span>");
		span.append($("<i>",{"class":"ui-icon ui-icon-folder-collapsed"}));
		span.append($("<label>").append($("<strong>",{text:name})));
		li.append(span).append(createLinks(0,datatype)).append($("<ul>",{"class":"pickList_list"}));
	}
	
	return li;
}
//TODO 如果为会员组则显示 查看信息
function createLinks(type,datatype){
	var div = $("<div>",{'class':"creat_document"});
	
	if(type == 1) {
		if(datatype == 5 || datatype == 6 ){
//			div.append(createLink("显示筛选条件","showGroup"));
//			div.append("|");
			//acmen add 10-24 添加修改组和下载数据
			div.append(createLink("修改组","editMbrGroup"));
			div.append("|");
			div.append(createLink("下载数据","downMbrGroup"));
			div.append("|");
			//acmen change 10-22 删除会员组的时候同时删除规则
			div.append(createLink("删除组","deleteMbrGroup"));
		}else{
			div.append(createLink("修改组","editGroup"));
			div.append("|");
			div.append(createLink("删除组","deleteGroup"));
		}
	} else if(type == 0) {
		div.append(createLink("添加下级文件夹","addFolder"));
		div.append("|");
		div.append(createLink("修改文件夹","editFolder"));
		div.append("|");
		div.append(createLink("删除文件夹","deleteFolder"));
		div.append("|");
		div.append(createLink("添加固定组","addFixedGroup"));
		div.append("|");
		div.append(createLink("添加活动组","addFlexibleGroup"));
	} else if(type == 2){
		div.append(createLink("添加下级文件夹","addFolder"));
		div.append("|");
		div.append(createLink("修改文件夹","editFolder"));
		div.append("|");
		div.append(createLink("删除文件夹","deleteFolder"));
		div.append("|");
		div.append(createLink("筛选会员","pickupmbr"));
		div.append("|");
		div.append(createLink("上传会员","loadmbr"));
	}
	
	return div;
}

function createLink(text,css) {
	return $("<a>",{text:text,href:"#","class":css});
}

function getType(key){
	switch(key){
		case "1":
			return "私有产品组";
		case "2":
			return "私有区域组";
		case "3":
			return "共享产品组";
		case "4":
			return "共享区域组";
		case "5":
			return "私有会员组";
		case "6":
			return "共享会员组";
		default:
			return "N/A";
	}
}

var _datatype = 0;
var _datavalue = 0;
$(".pickList").delegate(".addFolder", "click", function(){
	var target = $("#add-folder-dialog");
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	target.find("label span:first").text(getType(_datatype));
	target.find("label span:last").text($(this).parent().prev().find("label strong").text());
	target.dialog({
		title: "创建文件夹",
        modal: true,
        width: "550",
        buttons: {
        	"创建": function(args){
        		var name = $("#add-folder-dialog input").val();
        		$.ajax({
        			url : "/arko/group/createFolder.do",
        			type : "POST",
            		data : {name:name,type:_datatype,parent:_datavalue},
            		success : function (json) {
            			if(json.status=="OK"){
            				buttons = {
            					    "关闭": function () {
                        				$("#add-folder-dialog input").val("");
                        				$("#add-folder-dialog").dialog("close");
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
            	    },
            	    error : function(){
        				buttons = {
        					    "关闭": function () {
        					    	window.location.href="/arko/group/list.do";
        						}
        					};
        				elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append("发生错误");
        				openDialog(elements,buttons);
            	    }
        		});
        	},
        	"取消": function(){
        		$("#add-folder-dialog input").val("");
        		$("#add-folder-dialog").dialog("destroy");
        	}
        }
    }).dialog("open");
});


$(".pickList").delegate(".editFolder", "click", function(){
	var target = $("#edit-folder-dialog");
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	target.find("label span:first").text(getType(_datatype));
	target.find("label span:last").text($(this).parent().parent().parent().prev().prev().find("label strong").text());
	$("#edit-folder-dialog input").val(element.children("span").find("label strong").text());
	target.dialog({
		title: "修改文件夹",
        modal: true,
        width: "550",
        buttons: {
        	"确定": function(){
        		var name = $("#edit-folder-dialog input").val();
        		$.ajax({
        			url : "/arko/group/editFolder.do",
        			type : "POST",
            		data : {name:name,folder:_datavalue},
            		success : function (json) {
            			var elements = $("<p>");
            			var buttons = "";
            			if(json.status!="OK") {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-cancel"})).append(" "+json.msg);
            			}else {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        		window.location.href="/arko/group/list.do";
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-accept"})).append(" 修改成功");
            			}
            			openDialog(elements, buttons);
            	    },
            	    error : function(){
            			var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 修改失败");
            			var buttons = {
        			        	"关闭": function(){
        			        		$(this).dialog("destroy");
        			        		window.location.href="/arko/group/list.do";
        			        	}
        				};
            			openDialog(elements, buttons);
            	    }
        		});
        	},
        	"取消": function(){
        		$("#edit-folder-dialog input").val("");
        		$("#edit-folder-dialog").dialog("destroy");
        	}
        }
    }).dialog("open");
});


$(".pickList").delegate(".deleteFolder", "click", function(){
	var element = $(this).parent().parent();
	_datavalue= element.attr("data-value");
	$("#delete-folder-dialog").dialog({
		title: "删除文件夹",
        modal: true,
        width: "550",
        buttons: {
        	"确定": function(){
        		$.ajax({
        			url : "/arko/group/deleteFolder.do",
        			type : "POST",
            		data : {folder:_datavalue},
            		success : function (json) {
            			var elements = $("<p>");
            			var buttons = {
        			        	"关闭": function(){
        			        		$(this).dialog("destroy");
        			        		window.location.href="/arko/group/list.do";
        			        	}
        				};
            			if(json.status!="OK") {
            				elements.append($("<i>",{'class':"icol-cancel"})).append(" 修改失败");
            			}else {
            				elements.append($("<i>",{'class':"icol-accept"})).append(" 修改成功");
            			}
            			openDialog(elements, buttons);
        				$("#delete-folder-dialog").dialog("close");
            	    },
            	    error : function(){
            			var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 修改失败");
            			var buttons = {
        			        	"关闭": function(){
        			        		$(this).dialog("destroy");
        			        		window.location.href="/arko/group/list.do";
        			        	}
        				};
            			openDialog(elements, buttons);
            	    }
        		});
        	},
        	"取消": function(){
        		$("#delete-folder-dialog").dialog("destroy");
        	}
        } 
    }).dialog("open");
});

$("#add-fixedgroup-dialog textarea").on("keyup", function(){
	var val = $(this).val().replace(/[^\d,]/g,'');
	$(this).val(val);
});

//acmen change
$(".pickList").delegate(".addFixedGroup", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	if(_datatype == 5){
		
	}else{
		window.location.href = "/arko/group/addFixedGroup.do?fid="+_datavalue;
	}
});

//acmen change
$(".pickList").delegate(".addFlexibleGroup", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	window.location.href = "/arko/group/create.do?fid="+_datavalue;
	
});

//acmen add
$(".pickList").delegate(".pickupmbr", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	window.location.href = "/arko/pickup/create.do?fid="+_datavalue;
	
});
//acmen add
$('.pickList').delegate('.loadmbr','click',function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	window.location.href = "/arko/pickup/load.do?fid="+_datavalue;
});

$(".pickList").delegate(".editGroup", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	
	if(_datatype=="2") {
		window.location.href = "/arko/group/editfixedg.do?gid="+_datavalue;
	} else {
		var elementFload = element.parent().parent();
		var fid = elementFload.attr("data-value");
		window.location.href = "/arko/group/edit.do?id="+_datavalue+"&fid="+fid;
	}
});

//TODO showGroup
$(".pickList").delegate(".showGroup", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	
	if(_datatype=="2") {
		window.location.href = "/arko/group/editfixedg.do?gid="+_datavalue;
	} else {
		var elementFload = element.parent().parent();
		var fid = elementFload.attr("data-value");
		window.location.href = "/arko/group/edit.do?id="+_datavalue+"&fid="+fid;
	}
});

$(".pickList").delegate(".deleteGroup", "click", function(){
	_datavalue = $(this).parent().parent().attr("data-value");
	var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除该组?");
	var buttons = {
        	"确定": function(){
        		$.ajax({
        			url : "/arko/group/deleteGroup.do",
        			type : "POST",
            		data : {group:_datavalue},
            		success : function (json) {
            			var elements = $("<p>");
            			var buttons = null;
            			if(json.status!="OK") {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-cancel"})).append(" 删除失败!");
            			}else {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        		window.location.href="/arko/group/list.do";
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-accept"})).append(" 删除成功!");
            			}
        				openDialog(elements,buttons);
            	    },
            	    error : function(){
            	    	var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 删除失败!");
            			var buttons = {
        			        	"关闭": function(){
        			        		$(this).dialog("destroy");
        			        	}
        				};
            			openDialog(elements,buttons);
            	    }
        		});
        	},
        	"取消": function(){
        		$(this).dialog("destroy");
        	}
	};
	
	openDialog(elements, buttons);
});

$(".pickList").delegate(".deleteMbrGroup", "click", function(){
	_datavalue = $(this).parent().parent().attr("data-value");
	var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除该组?");
	var buttons = {
        	"确定": function(){
        		$.ajax({
        			url : "/arko/pickup/deleteMbrGroup.do",
        			type : "POST",
            		data : {group:_datavalue},
            		success : function (json) {
            			var elements = $("<p>");
            			var buttons = null;
            			if(json.status!="OK") {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-cancel"})).append(" 删除失败!");
            			}else {
                			buttons = {
            			        	"关闭": function(){
            			        		$(this).dialog("destroy");
            			        		window.location.href="/arko/group/list.do";
            			        	}
            				};
            				elements.append($("<i>",{'class':"icol-accept"})).append(" 删除成功!");
            			}
        				openDialog(elements,buttons);
            	    },
            	    error : function(){
            	    	var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 删除失败!");
            			var buttons = {
        			        	"关闭": function(){
        			        		$(this).dialog("destroy");
        			        	}
        				};
            			openDialog(elements,buttons);
            	    }
        		});
        	},
        	"取消": function(){
        		$(this).dialog("destroy");
        	}
	};
	
	openDialog(elements, buttons);
});

//修改会员组
$(".pickList").delegate(".editMbrGroup", "click", function(){
	_datavalue = $(this).parent().parent().attr("data-value");
	$.post('/arko/pickup/editMbrGroup.do',{'group':_datavalue},function(json){
		var status = json.status;
		switch (status) {
		case 0:
			var msg = json.msg + '修改!';
			var elements = $('<p>',{text:msg});
			var buttons = {
					'确定': function(){
						$(this).dialog('close');
					}
			};
			openDialog(elements,buttons);
			break;
		case 1:
			var id = json.id;
			window.location.href = '/arko/pickup/edit.do?rid='+id;
			break;
		default:
			break;
		}
	});
});

//下载会员组
$(".pickList").delegate(".downMbrGroup", "click", function(){
	_datavalue = $(this).parent().parent().attr("data-value");
	$.post('/arko/pickup/editMbrGroup.do',{'group':_datavalue},function(json){
		window.location.href = '/arko/pickup/download.do?rid='+json.id;
	});
});

function expand() {
    element = $(this).parent().next().next();
    if(element.css("display")=="block") {
        element.hide();
        $(this).removeClass("ui-icon-folder-collapsed2").addClass("ui-icon-folder-collapsed");
        //acmen change 点击最后的节点会出现文件夹 更改点 增加了if条件
    } else if(element.length > 0){
        element.show();
        $(this).removeClass("ui-icon-folder-collapsed").addClass("ui-icon-folder-collapsed2");
    }
}

function extendlabel(){
	var i = $(this).prev();
	i.click();
}

$(".pickList").delegate("li span i.ui-icon", "click", {}, expand);
$(".pickList").delegate("li span label", "click", {}, extendlabel);
