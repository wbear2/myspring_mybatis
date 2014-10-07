
asyncLoadCallback = function(){
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

    // jQuery-UI Tabs
    $.fn.tabs && $(".mws-tabs").tabs();
    
	$.getJSON(arko.getUrl("/arko/account/getjson.do"), function(json){
		$("input[name=loginNameField]").val(json.loginName);
		$("input[name=userNameField]").val(json.userName);
		$("input[name=emailField]").val(json.email);
		
		if(json.status == 100){
			$("#statusLabel").html("已停用");
		}else if(json.status == 0){
			$("#statusLabel").html("等待激活，请前往您的通知邮箱查收激活邮件，并点击激活链接。或修改邮箱，点击发送邮件。");
			$("#emailStatus").append(gethtml(1));
		}else{
			var date = moment(new Date(json.effectiveDate.time));
			$("#statusLabel").html("正常,有效期至"+date.format("YYYY-MM-DD"));
			$("#emailStatusLabel").append(gethtml(0));
		}
		
		if(json.subscribe){
			$("#subscribe1").attr("checked",!0);
		}else{
			$("#subscribe2").attr("checked",!0);
		}
		
	});
	
	function gethtml(pending){
		var span = "";
		if(pending){
			span = $("<span>").append($("<i>",{'class':'icol-cross-octagon'})).append("未通过邮件验证，请前往此邮箱进行邮件验证，").append("<br/>");
			var a = $("<a>",{href:'#',text:"再次发送验证邮件",style:"color:red"});
			a.on("click", function(){
				$.getJSON("/arko/account/sendmail.do", function(json){
					$("#tab-1 a").parent().replaceWith("<span>邮件已重新发送,请检查您的邮箱!</span>");
				});
			});
			span.append(a).append("<br/>");
			return span;
		}
		span = $("<span>").append($("<i>",{'class':'icol-accept'})).append("已通过邮件验证").append("<br/>");
		return span;
	}
	
	$("#tab-1 :button").on("click", function(){
		
		var json = {
				username : $("input[name=userNameField]").val(),
				email : $("input[name=emailField]").val(),
				subscribe : $("input[name=subscribe]:checked").val(),
				type : 1
		};

		var buttons = {
		    	"关闭": function () {
				    $(this).dialog("destroy");
				    window.location.reload();
				}
			};
		var elements = $("<p>");
        
		$.ajax({
			url : "/arko/account/save.do",
			type : "POST",
    		data : json,
    		success : function (val) {
    			if(val.status!="OK") {
    				elements.append($("<i>",{'class':"icol-cancel"})).append(json.msg);
    			}else {
    				elements.append($("<i>",{'class':"icol-accept"})).append(" 资料修改成功");
    			}
    			openDialog(elements, buttons);
    	    },
    	    error : function(){
    	    	elements.append($("<i>",{'class':"icol-cancel"})).append(json.msg);
    	    	openDialog(elements, buttons);
    	    }
		});
		
	});
	
	$("#tab-2 :button").on("click", function(){
		
		var json = {
				password : $("#tab-2 :password:eq(0)").val(),
				newpassword : $("#tab-2 :password:eq(1)").val(),
				verifypassword : $("#tab-2 :password:eq(2)").val(),
				type : 2
		};
		var buttons = {
		    	"关闭": function () {
				    $(this).dialog("destroy");
				}
			};
		var elements = $("<p>");
		
		if(json.password.length == 0){
			elements.append($("<i>",{'class':"icol-cancel"})).append(" 请输入原密码");
			openDialog(elements,buttons);
			return false;
		} else if(json.newpassword.length == 0){
			elements.append($("<i>",{'class':"icol-cancel"})).append(" 请输入新密码");
			openDialog(elements,buttons);
			return false;
		} else if(json.newpassword!=json.verifypassword){
			elements.append($("<i>",{'class':"icol-cancel"})).append(" 两次输入的密码不一致");
			openDialog(elements,buttons);
			return false;
		}

		var flag = true;
		flag = flag && json.newpassword.match(/^[a-z0-9]{6,12}$/i)!=null;
		flag = flag && json.newpassword.match(/\d+/)!=null;
		flag = flag && json.newpassword.match(/[A-Z]+/)!=null;
		flag = flag && json.newpassword.match(/[a-z]+/)!=null;
		
		if(!flag) {
			elements.append($("<i>",{'class':"icol-cancel"})).append(" 密码必须由大写字母、小写字母和数字组成，6～12位。");
			openDialog(elements,buttons);
			return false;
		}

		$.ajax({
			url : "/arko/account/save.do",
			type : "POST",
    		data : json,
    		success : function (json) {
    			if(json.status!="OK") {
                    elements.append($("<i>",{'class':"icol-cancel"})).append(json.msg);
    			}else {
                    elements.append($("<i>",{'class':"icol-accept"})).append(" 密码修改成功");
            		buttons = {
            		    	"关闭": function () {
            				    $(this).dialog("destroy");
            				    window.location.reload();
            				}
            			};
    			}
    			openDialog(elements,buttons);
    	    },
    	    error : function(){
                elements.append($("<i>",{'class':"icol-cancel"})).append(json.msg);
                openDialog(elements,buttons);
    	    }
		});
		
	});
}