
var _private_member_group = $("#productGroups li[data-type=5] ul");
var _share_member_group = $("#productGroups li[data-type=6] ul");

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

function getURL(url){
	url = unescape(url);
	var randomNum = Math.floor(Math.random()*100000000);
	var symbol = url.indexOf("?") == -1 ? "?" : "&";
	url = url + symbol + "_=" + randomNum;
	return url;
}

$.getJSON(getURL("/arko/pickup/getlist.do"), function(data){
	
	var privateGroup = data.privateGroup;
	var shareGroup = data.shareGroup;
	
	_populateLists(_private_member_group, privateGroup[0], 5);
	_populateLists(_share_member_group, shareGroup[0], 6);
	
	$(".pickList_list label").hover(function(){$(".pickList_list label").removeClass("blue_bg");$(this).addClass("blue_bg");});
	$(".pickList_list label").hover(function(){$(".pickList_list label").parent().next().hide();$(this).parent().next().show();});

});

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
		li.append(span).append(createLinks(1));
	} else {
		li = $("<li>", {"data-value": value, "data-type": datatype});
		var span = $("<span>");
		span.append($("<i>",{"class":"ui-icon ui-icon-folder-collapsed"}));
		span.append($("<label>").append($("<strong>",{text:name})));
		li.append(span).append(createLinks(0)).append($("<ul>",{"class":"pickList_list"}));
	}
	
	return li;
}

function createLinks(type){
	var div = $("<div>",{'class':"creat_document"});
	
	if(type) {
		div.append(createLink("修改组","editGroup"));
		div.append("|");
		div.append(createLink("删除组","deleteGroup"));
		div.append("|");
		div.append(createLink("导出会员","exportGroup"));
	} else {
		div.append(createLink("添加下级文件夹","addFolder"));
		div.append("|");
		div.append(createLink("修改文件夹","editFolder"));
		div.append("|");
		div.append(createLink("删除文件夹","deleteFolder"));
		div.append("|");
		div.append(createLink("添加固定组","addFixedGroup"));
		div.append("|");
		div.append(createLink("添加活动组","addFlexibleGroup"));
	}
	
	return div;
}

function createLink(text,css) {
	return $("<a>",{text:text,href:"#","class":css});
}

function getType(key){
	switch(key){
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
            			    			window.location.href="/arko/pickup/list.do";
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
        					    	window.location.href="/arko/pickup/list.do";
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
            			        		window.location.href="/arko/pickup/list.do";
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
        			        		window.location.href="/arko/pickup/list.do";
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
        			        		window.location.href="/arko/pickup/list.do";
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
        			        		window.location.href="/arko/pickup/list.do";
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
	
	window.location.href = "/arko/pickup/create.do?fid="+_datavalue;
});

//acmen change
$(".pickList").delegate(".addFlexibleGroup", "click", function(){
	var element = $(this).parent().parent();
	_datatype= element.attr("data-type");
	_datavalue= element.attr("data-value");
	
	window.location.href = "/arko/pickup/create.do?fid="+_datavalue;
	
});


$(".pickList").delegate(".editGroup", "click", function(){
	var target = $("#edit-fixedgroup-dialog");
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
            			        		window.location.href="/arko/pickup/list.do";
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

//acmen change 9-9 下载会员信息
$(".pickList").delegate(".exportGroup", "click", function(){
	_datavalue = $(this).parent().parent().attr("data-value");
	$.download('/arko/pickup/download.do','gid='+_datavalue,'post' );
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

$(".pickList").delegate("li span i.ui-icon", "click", {}, expand);
jQuery.download = function(url, data, method){
    // 获取url和data
    if( url && data ){ 
        // data 是 string 或者 array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        // 把参数组装成 form的  input
        var inputs = '';
        jQuery.each(data.split('&'), function(){ 
            var pair = this.split('=');
            inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
        });
        // request发送请求
        jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();
    };
};