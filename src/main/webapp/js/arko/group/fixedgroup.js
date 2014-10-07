var checkflag = false;
function checkFixedGroupData() {
	var name = $("#name").val();
	var type = $("#type").val();
	var folder = $("#folderID").val();
	var value = $("#value").val();
	
	if(name == null || name == ""){
		var elements = $('#mws-creategroup-dialog');
		var buttons = {
				"取消": function(){
	    			$(this).dialog("close");
	    		}
		};
		var errbody = $('#mws-form-inline');
		errbody.html('');
		errbody.html('请填写固定组组名');
		openDialog(elements, buttons);
		return;
	}
	
	if(value == null || value == ""){
		var elements = $('#mws-creategroup-dialog');
		var buttons = {
				"取消": function(){
	    			$(this).dialog("close");
	    		}
		};
		var errbody = $('#mws-form-inline');
		errbody.html('');
		errbody.html('请填写校验数据');
		openDialog(elements, buttons);
		return;
	}
	
	
	
	var data = {
			name : name,
			type : type,
			folder : folder,
			value : value
	};
	
	$.ajax({
    	url : "/arko/group/checkFixedGroup.do",
    	type : "POST",
    	data : data,
    	success : function (data) {
    		var elements = $('#mws-creategroup-dialog');
    		var buttons = {};
    		if('ERROR1' == data.status){
    			buttons = {
    					"取消": function(){
    		    			$(this).dialog("close");
    		    		}
    			};
    			var errbody = $('#mws-form-inline');
    			errbody.html('');
    			errbody.html(data.msg);
    			openDialog(elements, buttons);
    		}
    		else if('OK' == data.status){
    			$('#sucnum').html(data.sucnum);
        		$('#errnum').html(data.errnum);
        		$('#errinfo').html('');
        		$('#errinfo').html(data.errnums);
        		$('#sum').val(data.sum);
        		$('#flag').val(data.flag);
        		$('#productList').html('');
        		$.each(data.products,function(n,value){
        			$('#productList').append('<li style="line-height: 20px; min-height: 20px;">'+value.num+'   '+value.name+'</li>');
        		});
        		checkflag = true;
        		//校验成功提示
        		buttons = {
    					"返回": function(){
    		    			$(this).dialog("close");
    		    		}
    			};
    			var errbody = $('#mws-form-inline');
    			errbody.html('');
    			errbody.html('校验成功!<br/>统计：共<span>'+data.sucnum+'</span>行，原数据中有<span>'+data.errnum+'</span>行数据异常。');
    			openDialog(elements, buttons);
        		
    		}else{
    			buttons = {
    					"返回自定义组列表": function(){
    		    			$(this).dialog("close");
    		    			window.location.href="/arko/group/list.do";
    		    		}
    			};
    			var errbody = $('#mws-form-inline');
    			errbody.html('');
    			errbody.html(data.msg);
    			openDialog(elements, buttons);
    		}
    	}
    });
}


function createFixedGroup(){
	
	var sum = $('#sum').val();
	var name = $('#name').val();
	var flag = $('#flag').val();
	var folder = $('#folderID').val();
	var data = {
		sum : sum,
		name : name,
		flag : flag,
		folder : folder
	};
	if(!checkflag){
		var elements = $('#mws-creategroup-dialog');
		var buttons = {
				"取消": function(){
	    			$(this).dialog("close");
	    		}
		};
		var errbody = $('#mws-form-inline');
		errbody.html('');
		errbody.html('请先校验数据');
		openDialog(elements, buttons);
		return;
	}
	$.ajax({
    	url : "/arko/group/createFixedGroups.do",
    	type : "POST",
    	data : data,
    	success : function (data) {
    		var elements = $('#mws-creategroup-dialog');
    		var buttons = {};
    		if('ERROR' == data.status){
    			buttons = {
    					"取消": function(){
    		    			$(this).dialog("close");
    		    		}
    			};
    			
    		} else if('OK' == data.status ){
    			buttons = {
    					"返回自定义组列表": function(){
    		    			$(this).dialog("close");
    		    			window.location.href="/arko/group/list.do";
    		    		}
    			};
    		}
    		var errbody = $('#mws-form-inline');
			errbody.html('');
			errbody.html(data.msg);
			openDialog(elements, buttons);
    	}
    });
}

function subEditFixedG(){
	var groupId = $('#groupId').val();
	var sum = $('#sum').val();
	var name = $('#name').val();
	var flag = $('#flag').val();
	var folder = $('#folderID').val();
	var data = {
		groupId : groupId,
		sum : sum,
		name : name,
		flag : flag,
		folder : folder
	};
	if(!checkflag){
		var elements = $('#mws-creategroup-dialog');
		var buttons = {
				"取消": function(){
	    			$(this).dialog("close");
	    		}
		};
		var errbody = $('#mws-form-inline');
		errbody.html('');
		errbody.html('请先校验数据');
		openDialog(elements, buttons);
		return;
	}
	
	$.ajax({
    	url : "/arko/group/editsubfixedg.do",
    	type : "POST",
    	data : data,
    	success : function (data) {
    		var elements = $('#mws-creategroup-dialog');
    		var buttons = {};
    		if('ERROR' == data.status){
    			buttons = {
    					"取消": function(){
    		    			$(this).dialog("close");
    		    		}
    			};
    			
    		} else if('OK' == data.status ){
    			buttons = {
    					"返回自定义组列表": function(){
    		    			$(this).dialog("close");
    		    			window.location.href="/arko/group/list.do";
    		    		}
    			};
    		}
    		var errbody = $('#mws-form-inline');
			errbody.html('');
			errbody.html(data.msg);
			openDialog(elements, buttons);
    	}
    });
}

function openDialog(elements, buttons){
	
	elements.dialog({
	    autoOpen: true,
	    closeOnEscape: false,
	    resizable: false,
	    modal: true,
	    title: "友情提示",
	    width: "550",
	    buttons: buttons
	});
}

function reset(flag){
	if(flag)
		$('#name').val('');
	$('#value').val('');
	$('#productList').html('');
	checkflag = false;
}
asyncLoadCallback = function(){
	$('#name').on('change',function(){
		checkflag = false;
	}); 
	$('#value').on('change',function(){
		checkflag = false;
	});
}
