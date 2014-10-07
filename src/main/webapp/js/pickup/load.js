var Uploader = (function(){
	/**
	 * @param options
	 * @param callback
	 * @returns
	 * @desc 创建iframe
	 */
	var iframe = function(options) {
		options = options || {
			id : 'iframe' + Math.random(),
			name : 'iframe',
			src : ''
		};
		var iframe;
		try{
			iframe = document.createElement('<iframe name=' + options.name + '>');
		}catch(e) {
			iframe = document.createElement('iframe');
			iframe.name = options.name;
		}
		options.id && (iframe.id = options.id);
		iframe.src = options.src;
		iframe.style.cssText = options.cssText;
		return iframe;
	};
	/**
	 * @param {file}
	 * @return {}
	 * @desc 上传文件
	 */
	function Uploader(file){
		var name,hidden;
		var uuid = Uploader.uuid++;
		this.state = 0;
		this.file = file;
		this.form = file.form;
		name = 'upload_file_'+ uuid;
		this.iframe = iframe({
			name:name,
			src:'blank.do',
			cssText:'display:none;'
		});
		document.body.appendChild(this.iframe);
		this.form.target = name;
	};
	Uploader.uuid = 0;
	Uploader.prototype = {
		upload:function(callback){
			//生成JSONP回调
			var ts,jsonp,uploader,action,jsonpCallback;
			ts = (new Date()).getTime();
			jsonp = 'jsonp' + ts;
			uploader = this;
			window[jsonp] = function(ret){
				callback(ret);
				uploader.state = 0;
			};
			action = this.form.action;
			jsonpCallback = 'parent.' + jsonp; 
			if(action.indexOf('callback') > -1){
				action = action.replace(/jsonp\d+/,jsonp);
			}else{
				action += (action.indexOf('?') > -1 ? '&callback=' : '?callback=') + jsonpCallback;
			}
			this.form.action = action;
			this.state = 1;//开始上传
			this.form.submit();
			return jsonp;
		},
		readyState:function(){
			return this.state;
		},
		cancel:function(jsonp){
			typeof window[jsonp] && (window[jsonp] = function(){});
		}
	};
	return Uploader;
})();

function fileload(){
	alert($('#file').val());
}

//1、显示等待信息  2、提交数据  
function checkform(args){
	var elements = $('<p>',{text:'请稍候...'});
	var buttons = {
		};
	openDialog(elements, buttons);
	uploader = args.data.uploader;
	var file = document.getElementById('file'),uploader;
	var jsonp = uploader.upload(function(data){
		dialog.dialog('close');
		switch (data.status) {
		case 0:
			var sucMsg = $('#sucmsg');
			sucMsg.hide();
			break;
		case 1:
			var sucMsg = $('#sucmsg');
			sucMsg.empty();
			sucMsg.show();
			var html = '总共提交' + data.len + ',成功匹配上的为' + data.sucLen + ',未匹配上的为' + data.errLen;
			sucMsg.append($('<p>',{html:html}));
			break;
		default:
			break;
		}
	});
}
function subform(args){
	var elements = $('<p>');
	var buttons =  {
			'确定': function(){
				$(this).dialog('close');
			}
		};
	var folder = $('#folderName').val();
	var gname = $('#groupName').val();
	if(folder == undefined || folder == null || folder.length == 0){
		elements.text("请添加文件夹");
		openDialog(elements, buttons);
		return;
	}
	if(gname == undefined || gname == null || gname.length == 0){
		elements.text("请填写组名");
		openDialog(elements, buttons);
		return;
	}
	elements.text("请稍候...");
	var buttons =  {};
	openDialog(elements, buttons);
	//上传数据并创建组
	$.post('/arko/pickup/subLoadMbrData.do',{'folder':folder,'gname':gname},function(json){
		dialog.dialog('close');
		if(json.status == 0){
			elements.text(json.msg);
			var buttons =  {
					'确定': function(){
						window.location.href = '/arko/pickup/load.do';
						$(this).dialog('close');
					}
				};
			openDialog(elements, buttons);
		}else if(json.status == 1){
			elements.text(json.msg);
			var buttons =  {
					'继续添加': function(){
						window.location.href = '/arko/pickup/load.do';
						$(this).dialog('close');
					},
					'返回': function(){
						window.location.href = '/arko/group/list.do';
						$(this).dialog('close');
					}
				};
			openDialog(elements, buttons);
		}
	},'json');
}
function folder(json){
	var privateGroup = json.privateGroup[0];
	var shareGroup = json.shareGroup[0];
	
	var folderDialog = $('<div>',{'style':'display:none'});
	var element = $('<div>').appendTo(folderDialog);
	var folderContainer = $('<div>').appendTo(element);
	var folderSelector = $('<select>');

	var row = $('<div>',{'class':''});
	row.append($('<strong>',{'class':'','html':'文件夹：'}));
	row.append($('<div>',{'class':''}).append(folderSelector));
	folderContainer.append(row);
	
	element = null;
	
	function process(list,prefix){
		$.each(list, function(index,item){
			var text = prefix+item.name;
			element.append($('<option>',{text:text,value:item.id}));
			
			if(item.subfolder && item.subfolder.length) {
				process(item.subfolder,text + " / ");
			}
		});
	}
	element = folderSelector;
	
	var flag = 0;
	
	if(privateGroup.length){
		element = $('<optgroup>',{label:'私有组'});
		folderSelector.append(element);
		process(privateGroup,'');
		flag = 1;
	}
	
	if(shareGroup.length){
		element = $('<optgroup>',{label:'公共组'});
		folderSelector.append(element);
		process(shareGroup,'');
		flag = 1;
	}
	if(!flag){
		folderSelector.replaceWith($('<a>',{href:'/arko/group/list.do',html:'请先创建文件夹'}));
	}
	folderDialog.dialog({
		modal: true,
		autoOpen: false,
		title: "选择文件夹",
		width: 550,
		buttons: {
			'确定': function(){
				var val = folderDialog.find('select').find("option:selected").val();
				var text = folderDialog.find('select').find("option:selected").text();
				$('#folderName').val(val);
				$('#folderNameVal').text(text);
				folderDialog.dialog('close');
			},
			'取消': function(){
				folderDialog.dialog('close');
			}
		}
	});
	return folderDialog;
}
asyncLoadComplete = function(){
//	$(".mws-progressbar-val").progressbar({ value: 56, showValue: true });
//	$('#sucmsg').hide();
//	$.getJSON('/arko/pickup/getlist.do', function(json){
//		//uploader = new Uploader(file);
//		//$('#checkmbr').on('click',{'uploader':uploader},checkform);
//		$('#submbr').on('click',subform);
//		var folderDialog = folder(json);
//		$('#folderAdd').on('click',{'dialog':folderDialog},addFolder);
//	});
	$('#file').fileInput('reflashAction');
};

var dialog = $("<div>").appendTo($("body"));
function openDialog(elements,buttons){
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