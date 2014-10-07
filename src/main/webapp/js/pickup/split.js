/**
 * 拆分会员组插件
 * @author acmen
 */

asyncLoadComplete = function(){
	// our plugin constructor
	function Split( element, options ) {
		if( arguments.length ) {
			this._init( element, options );
		}
    };
    
	// the plugin prototype
    Split.prototype = {
		defaults: {
			cache:null,
			rules:[],
			ruleJsons:[]
		}, 

		_init: function( element, options ) {
			this.element = $( element );
			this.options = $.extend( {}, this.defaults, options);
			
			this._initData();
			
			this.element.attr('class','mws-form');
			this._build();
		}, 
		
		_initData: function(){
			var self = this;
			self.defaults.rules = self.options.ruleList;
		},

		_build: function () {
			this.element.empty();
			this.controls = {};
			this._buildSplitRuleContainer();
			this._buildSplitRuleShowContainer();
			this._splitRuleTypeContainer();
			this._splitRuleTypeMsgContainer();
			this._splitRuleSubmitContainer();
			
			this.element.append(this.controls.splitRuleContainer);
			this.element.append(this.controls.splitRuleShowContainer);
			this.element.append(this.controls.splitRuleTypeContainer);
			this.element.append(this.controls.splitRuleTypeMsgContainer);
			this.element.append(this.controls.buttonContainer);
			
			//加载其他的插件
			this.controls.splitRuleSelect.select2();
		},
		
		//TODO 拆分规则选择器
	    _buildSplitRuleContainer: function(args){
	    	var self = this;
	    	self.controls.splitRuleSelect = $('<select>',{'class':'mws-select2','multiple':true});
	    	$.each(self.defaults.rules,function(index,item){
	    		self.controls.splitRuleSelect.append($('<option>',{'value':item.id,'text':item.name}));
	    	});
	    	self.controls.splitRuleAdd = $('<a>',{'href':'javascript:void(0)','class':'btn'}).append($('<i>',{'class':'icol-accept'})).append('添加');
	    	self.controls.splitRuleAdd.on('click', $.proxy(this._splitRuleAddHandler, {self:this}));
	    	
	    	var item = $('<div>',{'class':'mws-form-item'}).append($('<div>',{'style':'float:left; padding:0 5px; width:200px;'}).append(self.controls.splitRuleSelect))
	    												   .append($('<div>',{'style':'float:left; padding:0 5px;'}).append(self.controls.splitRuleAdd));
	    	self.controls.splitRuleContainer = $('<div>',{'class':'mws-form-inline'})
	    								.append($('<div>',{'class':'mws-form-row'}).append($('<label>',{'class':'mws-form-label','text':'拆分的规则名称'})).append(item));
	    },
	    _splitRuleAddHandler: function(args){
	    	var self = this.self;
	    	var ruleVals = self.controls.splitRuleSelect.val();
	    	var elements;
	    	var buttons;
	    	if(ruleVals == null){
	    		elements = $('<p>',{text:'请选择要拆分的规则!'});
	    		buttons = {
						'取消': function(){
							$(this).dialog('close');
						}
					};
	    		self._openDialog(elements,buttons);
	    	}else{
	    		elements = $('<p>',{text:'请稍候...'});
	    		buttons = {
					};
	    		self._openDialog(elements,buttons);
	    		$.post('/arko/pickup/splitRuleMsg.do',{jsondata:ruleVals},function(json){
	    			self._changeSplitRule(json);
	    			dialog.dialog('close');
	    		});
	    	}
	    },
	    //TODO 拆分规则显示
	    _buildSplitRuleShowContainer: function(args){
	    	var self = this;
	    	self.controls.ruleShowName = $('<label>',{'text':''});
	    	self.controls.ruleShowMsg = $('<a>',{'href':'javascript:void(0)','text':'详细信息'});
	    	self.controls.ruleShowMsg.hide();
	    	self.controls.ruleShowMsg.on('click', $.proxy(this._splitRuleShowMsgHandler, {self:this}));
	    	var ruleShowTable = self._buildRuleMsgTable();
	    	self.controls.ruleShowTableContainer = $('<div>',{'class':'mws-form-item','style':'margin-left: 0px;'}).append(ruleShowTable);
	    	self.controls.ruleShowTableContainer.hide();
	    	var titleRow = $('<div>',{'class':'mws-form-row'}).append($('<label>',{'class':'mws-form-label','text':'进行拆分的规则'}))
	    													  .append($('<div>',{'class':'mws-form-item'}).append(self.controls.ruleShowName).append(self.controls.ruleShowMsg).append(self.controls.ruleShowMsg));
	    	var msgRow = $('<div>',{'class':'mws-form-row'}).append(self.controls.ruleShowTableContainer);
	    	
	    	self.controls.splitRuleShowContainer = $('<div>',{'class':'mws-form-inline'})
	    												.append(titleRow)
	    												.append(msgRow);
	    	
	    },
	    _buildRuleMsgTable: function(json){
	    	//alert(json);
//	    	typeof self === "undefined";
	    	var self = this;
	    	var table = $('<table>',{'cellspacing':0,'cellpadding':0,'style':'width:100%'});
	    	if(typeof json === "undefined"){
	    		return table;
	    	}
	    	$.each(json,function(index,item){
	    		var type = '';
	    		switch (item.status) {
					case 9:
						type = '筛选会员组';
						break;
					case 10:
						type = '上传会员组';
						break;
					case 11:
						type = '拆分会员组';
						break;
					default:
						break;
				}
	    		var titleTr = $('<tr>').append($('<td>',{'text':'规则名'}))
				   .append($('<td>',{'text':item.name}))
				   .append($('<td>',{'text':'规则类型'}))
				   .append($('<td>',{'text':type}))
				   .append($('<td>',{'text':'创建人'}))
				   .append($('<td>',{'text':item.username}))
				   .append($('<td>',{'text':'创建时间'}))
				   .append($('<td>',{'text':item.createDate}));
				table.append(titleTr);
				switch (item.status) {
					case 9:
						self._builderCreateRuleTable(item.jsonData,table);
						break;
					case 10:
						self._builderLoadRuleTable(item.jsonData,table);
						break;
					case 11:
						self._builderSplitRuleTable(item.jsonData,table);
						break;
					default:
						break;
				}
	    	});
	    	
	    	return table;
	    },
	    _builderLoadRuleTable: function(json,table){
	    	
	    },
	    _builderSplitRuleTable: function(json,table){
	    	
	    },
	    _builderCreateRuleTable: function(json,table){
	    	var str = ['会员类型','且会员指标','且区域范围','且购买商品'];
	    	$.each(json.periods,function(index,item){
	    		titleTr = $('<tr>').append($('<td>',{text:'时间段'}))
	    						   .append($('<td>',{text:item.beginDate + ' 至 ' + item.endDate,colspan:7}));
	    		table.append(titleTr);
	    	});
	    },
	    _getSplitRuleNames: function(json){
	    	var name = '';
	    	$.each(json,function(index,item){
	    		if(index != 0){
	    			name += ' 和 ';
	    		}
	    		name += item.name;
	    	});
	    	return name;
	    },
	    /**
	     * 改变拆分的规则时调用
	     * @param json
	     */
	    _changeSplitRule: function(json){
	    	var self = this;
	    	var table = self._buildRuleMsgTable(json);
	    	self.controls.ruleShowName.empty();
			self.controls.ruleShowTableContainer.empty();
			var name = self._getSplitRuleNames(json);
			self.controls.ruleShowName.text(name);
			self.controls.ruleShowMsg.text('详细信息');
			self.controls.ruleShowMsg.show();
			self.controls.ruleShowTableContainer.append(table);
			self.controls.ruleShowTableContainer.hide();
	    },
	    _splitRuleShowMsgHandler: function(args){
	    	var self = this.self;
	    	var text = self.controls.ruleShowMsg.text();
	    	if('详细信息' == text){
	    		self.controls.ruleShowMsg.text('简单信息');
	    		self.controls.ruleShowTableContainer.show();
	    	}else{
	    		self.controls.ruleShowMsg.text('详细信息');
	    		self.controls.ruleShowTableContainer.hide();
	    	}
	    },
	    //TODO 拆分类型与规则
	    _splitRuleTypeContainer: function(args){
	    	var self = this;
	    	self.controls.splitTypeByNum = $('<a>',{'href':'javascript:void(0)','class':'btn'}).append('按人数拆分');
	    	self.controls.splitTypeByNum.on('click', $.proxy(this._splitByNumHandler, {self:this}));
	    	self.controls.splitTypeByRatio = $('<a>',{'href':'javascript:void(0)','class':'btn'}).append('按比例拆分');
	    	self.controls.splitTypeByRatio.on('click', $.proxy(this._splitByRatioHandler, {self:this}));
	    	self.controls.splitTypeByProper = $('<a>',{'href':'javascript:void(0)','class':'btn'}).append('按属性拆分');
	    	self.controls.splitTypeByProper.on('click', $.proxy(this._splitByProperHandler, {self:this}));
	    	
	    	var typeRow = $('<div>',{'class':'mws-form-row'})
	    						.append($('<label>',{'class':'mws-form-label','text':'拆分类型'}))
	    						.append(self.controls.splitTypeByNum)
	    						.append(self.controls.splitTypeByRatio)
	    						.append(self.controls.splitTypeByProper);
	    	
	    	self.controls.splitTypeNumAddContainer = $('<div>');
	    	self._buildSplitNumItem(self.controls.splitTypeNumAddContainer);
	    	self.controls.splitTypeRatioAddContainer = $('<div>');
	    	self._buildSplitRatioItem(self.controls.splitTypeRatioAddContainer);
	    	self.controls.splitTypeProperAddContainer = $('<div>');
	    	self._buildSplitProperItem(self.controls.splitTypeProperAddContainer);
	    	var typeMsgRow = $('<div>',{'class':'mws-form-row'})
	    						.append(self.controls.splitTypeNumAddContainer)
	    						.append(self.controls.splitTypeRatioAddContainer)
	    						.append(self.controls.splitTypeProperAddContainer);
	    	self.controls.splitRuleTypeContainer = $('<div>',{'class':'mws-form-inline'})
	    												.append(typeRow)
	    												.append(typeMsgRow);
	    },
	    _buildSplitNumItem: function(element){
	    	var typeSel = $('<select>');
	    	typeSel.append($('<option>',{value:1,text:'随机'}))
	    		   .append($('<option>',{value:2,text:'属性'}));
	    	typeSel.on('change');
	    	var yearSel = $('<select>');
	    	yearSel.append($('<option>',{value:2011,text:'2011年'}))
	    	       .append($('<option>',{value:2012,text:'2012年'}))
	    	       .append($('<option>',{value:2013,text:'2013年'}));
	    	var weekSel = $('<select>');
	    	weekSel.append($('<option>',{value:1,text:'01月02日 / 1周'}))
	    		   .append($('<option>',{value:1,text:'01月02日 / 2周'}))
	    		   .append($('<option>',{value:1,text:'01月02日 / 3周'}))
	    		   .append($('<option>',{value:1,text:'01月02日 / 4周'}));
	    	var typeValSel = $('<select>');
	    	typeValSel.append($('<option>',{value:1,text:'高价值'}))
	    			  .append($('<option>',{value:1,text:'中价值'}))
	    			  .append($('<option>',{value:1,text:'低价值'}));
	    	element.append($('<label>',{text:'组名'}))
		    		 .append($('<input>',{type:'text',}))
		    		 .append($('<label>',{text:'按照'}))
		    		 .append(typeSel)
		    		 .append(yearSel)
		    		 .append(weekSel)
		    		 .append(typeValSel)
		    		 .append($('<label>',{text:'排序人数为'}))
		    		 .append($('<input>',{type:'text'}))
		    		 .append($('<a>',{'href':'javascript:void(0)','class':'btn','text':'新增'}));
	    	
	    },
	    _buildSplitRatioItem: function(element){
	    	
	    },
	    _buildSplitProperItem: function(element){
	    	
	    },
	    _splitByNumHandler: function(args){
	    	var self = this.self;
	    	self.controls.splitTypeNumAddContainer.show();
	    	self.controls.splitTypeRatioAddContainer.hide();
	    	self.controls.splitTypeProperAddContainer.hide();
	    },
	    _splitByRatioHandler: function(args){
	    	var self = this.self;
	    	self.controls.splitTypeNumAddContainer.hide();
	    	self.controls.splitTypeRatioAddContainer.show();
	    	self.controls.splitTypeProperAddContainer.hide();
	    },
	    _splitByProperHandler: function(args){
	    	var self = this.self;
	    	self.controls.splitTypeNumAddContainer.hide();
	    	self.controls.splitTypeRatioAddContainer.hide();
	    	self.controls.splitTypeProperAddContainer.show();
	    },
	    //TODO 拆分规则显示
	    _splitRuleTypeMsgContainer: function(args){
	    	var self = this;
	    	var msgRow = $('<div>',{'class':'mws-form-row'})
								.append($('<label>',{'class':'mws-form-label','text':'拆分规则'}));
	    	self.controls.splitRuleTypeMsgContainer = $('<div>',{'class':'mws-form-inline'})
	    						.append(msgRow);
	    },
	    
	    //TODO 创建按钮
	    _splitRuleSubmitContainer: function(args){
	    	var self = this;
	    	self.controls.subRule = $('<button>',{'class':'btn btn-primary',style:'margin-left:8px'}).html('创建');
	    	self.controls.subRule.on('click', $.proxy(self._submit, {self:self}));
	    	
	    	self.controls.buttonContainer = $('<div>',{'class':'mws-button-row'}).append(self.controls.subRule);
	    },
	    _submit: function(args){
	    	var self = this.self;
	    },
	    //TODO 公共方法库
	    /*
		 * 弹出提示框
		 */
		_openDialog: function(elements,buttons){
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
	};
    
    var dialog = $("<div>").appendTo($("body"));
    
	$.fn.split = function( options ) {
		var isMethodCall = typeof options === "string",
		args = Array.prototype.slice.call( arguments, 1 ),
		returnValue = this;

		// 防止调用内部方法
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}
	
		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, 'split' ),
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
				var instance = $.data( this, 'split' );
				if ( !instance ) {
					$.data( this, 'split', new Split( this, options ) );
				}
			});
		}
	
		return returnValue;
	};
	
};