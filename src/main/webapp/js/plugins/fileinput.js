/*
 * MWS Admin v2.1 - FileInput Plugin JS
 * This file is part of MWS Admin, an Admin template build for sale at ThemeForest.
 * All copyright to this file is hold by Mairel Theafila <maimairel@yahoo.com> a.k.a nagaemas on ThemeForest.
 * Last Updated:
 * December 08, 2012
 *
 * 'Highly configurable' mutable plugin boilerplate
 * Author: @markdalgleish
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 *
 */

;(function( $, window, document, undefined ) {
	// our plugin constructor
	function FileInput( element, options ) {
		if( arguments.length ) {
			this._init( element, options );
		}
    };
    
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
	var dialog = $("<div>").appendTo($("body"));
	
	FileInput.uuid = 0;
	
	// the plugin prototype
	FileInput.prototype = {
		defaults: {
			placeholder: '请选择文件', 
			buttontext: '浏览',
			folderDiv: null,
			folderSelector: null,
			groupName: null,
			fileinputval :null,
			uploader: null,
			statusDiv:{},
			statusTimer:{},
			statusFlag:{},
			reflashAction: null,
			reqkey:'',
			status: 0
		}, 

		_init: function( element, options ) {
			var self = this;
			this.element = $( element );
			this.options = $.extend( {}, this.defaults, options, this.element.data() );
			
			$.getJSON('/arko/pickup/getlist.do', function(json){
				self._build();
				self._builderFolder(json);
				self.defaults.uploader = self._uploader($('#file'));
				self.defaults.reflashAction = self._reflashAction;
				self.defaults.reqkey = $('#reqkey').val();
			});
		}, 
		
		_uploader: function(file){
			var name,hidden;
			var uuid = FileInput.uuid++;
			this.state = 0;
			this.file = file;
			this.form = $('#loadform');
			name = 'upload_file_'+ uuid;
			this.iframe = iframe({
				name:name,
				src:'blank.do',
				cssText:'display:none;'
			});
			document.body.appendChild(this.iframe);
			this.form.attr('target',name);
		},

		_build: function () {

			this.element.css( {
				'position': 'absolute', 
				'top': 0, 
				'right': 0, 
				'margin': 0, 
				'cursor': 'pointer', 
				'fontSize': '999px', 
				'opacity': 0, 
				'zIndex': 999, 
				'filter': 'alpha(opacity=0)'
			} )
			.on( 'change.fileupload', $.proxy( this._change, this) );

			this.container = $( '<div class="fileinput-holder" style="position: relative;"></div>' )
				.append( $( '<input type="text" class="fileinput-preview" style="width: 100%;" readonly="readonly" />' )
					.attr('placeholder', this.options.placeholder ) 
				)
				.append( $( '<span class="fileinput-btn btn" type="button" ' + 
					'style="display:block; overflow: hidden; position: absolute; top: 0; right: 0; cursor: pointer;"></span>' )
						.text( this.options.buttontext )
				)
				.insertAfter( this.element );

			var btn = this.container.find( '.fileinput-btn' );
			btn.on( 'click', $.proxy( this._click, this) );
			this.element.appendTo( btn );

			this.container.find( '.fileinput-preview' ).css('paddingRight', (btn.outerWidth() + 4) + 'px');
			//下方显示进度条
			this.statuscontainer = $( '<div class="fileinput-holder" style="position: relative;"></div>' );
//			var uploadstatus = $('<div>',{'class':'fileinput-status'})
//				.append($('<b>',{'class':'fileupload-ico'}))
//				.append($('<div>',{'class':'fileupload-title',title:'asd',text:'asd'}))
//				.append($('<div>',{'class':'fileupload-delete'}).append($('<a>',{'href':'javascript:void(0)','class':'fileupload-del-txt',text:'删除'})))
//				.append($('<div>',{'class':'fileupload-stu',html:'123B <label class="fileinput-stu-suc">上传成功</label>'}))
//				.append($('<div>',{'class':'fileupload-upload','style':'display:none;','text':'勇敢的心.rmvb, 文件大小:773.67M, 已上传244.77M, 上传速度:906.67K/S'}));
			//this.statuscontainer.append(uploadstatus);
			this.statuscontainer.insertAfter( this.container );
		}, 
		
		_builderFolder: function(json){
			var privateGroup = json.privateGroup[0];
			var shareGroup = json.shareGroup[0];
			
			this.defaults.folderDialog = $('<div>',{'style':'width:100%'});
			this.defaults.folderSelector = $('<select>',{'style':'width:320px; margin-left:20px'});
			this.defaults.groupName = $('<input>',{'type':'text','style':'width:320px; margin-left:20px'});

			this.defaults.folderDialog.append($('<strong>',{'class':'','html':'会员组保存:'}));
			var selDiv = $('<div>',{'style':'text-indent:2em;'});
			selDiv.append($('<div>',{'style':'margin-top:10px;'}).append($('<lable>',{'html':'组&nbsp;&nbsp;&nbsp;名','style':'width:60px;margin-right:5px;'})).append(this.defaults.groupName));
			selDiv.append($('<div>',{'style':'margin-top:10px;'}).append($('<lable>',{'html':'文件夹','style':'width:60px;margin-right:5px;'})).append(this.defaults.folderSelector));
			this.defaults.folderDialog.append(selDiv);
			
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
			element = this.defaults.folderSelector;
			
			var flag = 0;
			
			if(privateGroup.length){
				element = $('<optgroup>',{label:'私有组'});
				this.defaults.folderSelector.append(element);
				process(privateGroup,'');
				flag = 1;
			}
			
			if(shareGroup.length){
				element = $('<optgroup>',{label:'公共组'});
				this.defaults.folderSelector.append(element);
				process(shareGroup,'');
				flag = 1;
			}
			if(!flag){
				this.defaults.folderSelector.replaceWith($('<a>',{href:'/arko/group/list.do',html:'请先创建文件夹'}));
			}
			
			this.defaults.folderDiv = this.defaults.folderDialog;
		},

		_change: function ( e ) {
			var file = e.target.files !== undefined ? e.target.files[0] : { name: e.target.value.replace(/^.+\\/, '') };
			if ( !file ) return;
			if(this.defaults.status == 1){
				var element = $('<p>',{text:'一次仅支持上传一个文件!'});
				var buttons = {
						'确定': function(){
							$(this).dialog('close');
						}
				};
				this._openDialog(element, buttons);
				return;
			}
			this.container.find( '.fileinput-preview ' ).val(file.name);
			this._loadFile();
		},
		
		_click: function(e){
			this.defaults.fileinputval = this.element.val(); 
			this.element.val('');
		},
		
		_loadFile: function(){
			var self = this;
			var jsonp = self._upload(function(data){
				self._showStstus(data);
			});
		},
		
		//iframe 上传文件
		_upload:function(callback){
			//生成JSONP回调
			var ts,jsonp,uploader,action,jsonpCallback;
			ts = (new Date()).getTime();
			jsonp = 'jsonp' + ts;
			uploader = this;
			window[jsonp] = function(ret){
				callback(ret);
				uploader.state = 0;
			};
			action = this.form.attr('action');
			jsonpCallback = 'parent.' + jsonp; 
			if(action.indexOf('callback') > -1){
				action = action.replace(/jsonp\d+/,jsonp);
			}else{
				action += (action.indexOf('?') > -1 ? '&callback=' : '?callback=') + jsonpCallback;
			}
			this.form.attr('action',action);
			this.state = 1;//开始上传
			this.form.submit();
			return jsonp;
		},
		_readyState:function(){
			return this.state;
		},
		_cancel:function(jsonp){
			typeof window[jsonp] && (window[jsonp] = function(){});
		},
		
		_showStstus: function(args){
			var self = this;
			self.defaults.status = 1;
			var msgName = args.msgName;
			var fileName = args.filename;
			var del = $('<a>',{'href':'javascript:void(0)','class':'fileupload-del-txt',text:'删除','msgName':msgName});
			del.on('click',{'self':self},self._cancelStatus);
			this.defaults.statusDiv.msgName = $('<div>',{'class':'fileinput-status'})
			.append($('<b>',{'class':'fileupload-ico'}))
			.append($('<div>',{'class':'fileupload-title',title:'asd',text:fileName}))
			.append($('<div>',{'class':'fileupload-delete'}).append(del))
			.append($('<div>',{'class':'fileupload-stu'})
					.append($('<div>',{'class':'fileupload-progress'}).append($('<div>',{'class':'fileupload-progress-bar'}).append($('<div>',{'class':'fileupload-progress-bar-inner','style':'width:0%'}))))
					.append($('<div>',{'class':'fileupload-progress-text','text':'0%  开始上传'})))
			.append($('<div>',{'class':'fileupload-upload','style':'display:none;','text':''}));
			this.defaults.statusFlag.msgName = 1;
			this.statuscontainer.append(this.defaults.statusDiv.msgName);
			this._reflashStatus(args);
		},
		
		_reflashStatus: function(args){
			var msgName = args.msgName;
			this.defaults.statusTimer.msgName = setInterval('$(\'#file\').fileInput(\'reflashAction\',\''+msgName+'\');', 100);
		},
		_findstatusTimer: function(msgName){
			$.each(this.defaults.statusTimer,function(index,item){
				if(item.name == msgName)
					return item.value;
			});
		},
		_findstatusDiv: function(msgName){
			$.each(this.defaults.statusTimer,function(index,item){
				if(item.name == msgName)
					return item.value;
			});
		},
		/**
		 * 
		 * @param msgName
		 */
		_cancelStatus: function(args){
			var self = args.data.self;
			var msgName = $(this).attr('msgName');
			$.post('/arko/pickup/cancelLoad.do',{'val':msgName},function(json){
				self.defaults.statusDiv.msgName.hide();
				self.defaults.status = 0;
			});
		},
		_complateStatus: function(msgName){
//			this.defaults.statusDiv.msgName.hide();
			var self = this;
			this.defaults.statusDiv.msgName.find('.fileupload-progress-bar-inner').attr('style','width:100%');
			this.defaults.statusDiv.msgName.find('.fileupload-progress-text').html('<label class="fileinput-stu-suc">上传成功</label>');
			this.defaults.statusDiv.msgName;
			this.defaults.statusFlag.msgName = 1;
			clearTimeout(this.defaults.statusTimer.msgName);
			
			//完成之后显示数据 这个可以转变为 校验 按钮的操作
			var elements = $('<p>',{text:"正在为您校验数据，请稍候..."});
			var buttons = {
			};
			this._openDialog(elements, buttons);
			$.post('/arko/pickup/checkmbr.do',{'reqkey':this.defaults.reqkey},function(data){
				switch (data.status) {
					case 0:
						var message = json.message;
						var elements = $('<p>',{text:message});
						var buttons = {
							'确定': function(){
								dialog.dialog('close');
							}
						};
						self._openDialog(elements, buttons);
						break;
					case 1:
						dialog.dialog('close');
						var str = '合计上传会员编号' + data.allLen + '个,其中可识别会员' + data.sucLen + '个,重复' + data.repeatLen + '个,未识别会员' + data.errLen +'个(<a href="javascript:void(0)" style="color:#033a57;text-decoration: underline;line-height:24px;">下载重复及未识别会员</a>)';
						var p = $('<p>',{html:str,'style':'text-indent:2em;text-align:left;padding:20px 0;'});
						p.find('a').on( "click",{'self':self},self._downloadErrgroup);;
						var elements = $('<div>').append($('<strong>',{text:'数据校验结果:'})).append($('<div>',{'style':'width:100%;'}).append(p));
						elements.append(self.defaults.folderDiv);
						var buttons = {
							'创建': function(){
								self._createGroup();
							}
							,'取消': function(){
								dialog.dialog('close');
								window.location.href = '/arko/pickup/load.do';
							}
						};
						self._openDialog(elements, buttons);
						break;
					default:
						break;
				}
			});
		},
		_createGroup: function(){
			var self = this;
			var folderId = self.defaults.folderSelector.val();
			var groupName = self.defaults.groupName.val();
			if(folderId == '' || groupName == ''){
				
				return;
			}
			$.post('/arko/pickup/checksubLoadMbrDatambr.do',{'reqkey':self.defaults.reqkey,folder:folderId,gname:groupName},function(json){
				switch (json.status) {
					case 1:
						window.location.href = '/arko/pickup/list.do';
						break;
					case 0:
						dialog.dialog('close');
						var elements = $('<p>',{text:json.msg});
						var buttons = {
								'确定': function(){
									dialog.dialog('close');
									window.location.href = '/arko/pickup/load.do';
								}
						};
						self._openDialog(elements, buttons);
						break;
					default:
						break;
				}
			});
			dialog.dialog('close');
			var elements = $('<p>',{text:"正在创建自定义组请稍候..."});
			var buttons = {
			};
			self._openDialog(elements, buttons);
			
		},
		_downloadErrgroup: function(args){
			var self = args.data.self;
			jQuery('<form action=/arko/pickup/downloadErrMbrData.do method=post><input type="hidden" name="reqkey" value="'+self.defaults.reqkey+'"/></form>')
	        .appendTo('body').submit().remove();
		},
		reflashAction: function(msgName){
			var self = this;
			if(this.defaults.statusFlag.msgName == 1){
				this.defaults.statusFlag.msgName = 0;
				$.post('/arko/pickup/loadMbrStatus.do',{msgName:msgName},function(json){
					var d = self.defaults.statusDiv.msgName;
					var status = json.status;
					switch (status) {
						case 0:
							var message = json.message;
							var elements = $('<p>',{text:message});
							var buttons = {
								'确定': function(){
									dialog.dialog('close');
									window.location.href = '/arko/pickup/load.do';
								}
							};
							self._openDialog(elements, buttons);
							self.defaults.statusDiv.msgName.find('.fileupload-progress-text').html('<label class="fileinput-stu-suc">上传失败!</label>');
							self.defaults.statusDiv.msgName;
							self.defaults.statusFlag.msgName = 1;
							clearTimeout(self.defaults.statusTimer.msgName);
							break;
						case 1:
							var rate = json.rate;
							d.find('.fileupload-progress-bar-inner').attr('style','width:'+rate+'%');
							self.defaults.statusDiv.msgName.find('.fileupload-progress-text').html('上传'+rate+'%');
							break;
						case 2:
							var rate = json.rate;
							d.find('.fileupload-progress-bar-inner').attr('style','width:'+rate+'%');
							self.defaults.statusDiv.msgName.find('.fileupload-progress-text').html('上传'+rate+'%');
							break;
						case 3:
							var rate = json.rate;
							d.find('.fileupload-progress-bar-inner').attr('style','width:'+rate+'%');
							self.defaults.statusDiv.msgName.find('.fileupload-progress-text').html('上传'+rate+'%');
							break;
						case 8:
							self._complateStatus(msgName);
							break;
						case 9:
							break;
						default:
							break;
					}
					
					self.defaults.statusFlag.msgName = 1;
				});
			}

		},
		_openDialog: function (elements,buttons){
			dialog.empty();
			dialog.append(elements);
			
			dialog.dialog({
			    autoOpen: true,
			    closeOnEscape: false,
			    resizable: false,
			    modal: true,
			    title: "提示",
			    width: "550",
			    buttons: buttons
			});
		}
	};

	$.fn.fileInput = function( options ) {
//		return this.each(function() {
//			new FileInput( this, options );
//		});
		var isMethodCall = typeof options === "string",
		args = Array.prototype.slice.call( arguments, 1 ),
		returnValue = this;

		// 防止调用内部方法
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}
	
		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, 'fileInput' ),
					methodValue = instance && $.isFunction( instance[options] ) ?
						instance[ options ].apply( instance, args ) :
						instance;
	
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, 'fileInput' );
				if ( !instance ) {
					$.data( this, 'fileInput', new FileInput( this, options ) );
				}
			});
		}
	
		return returnValue;
	};
	
})( jQuery, window , document );
