/*
 * ARKO v1.0 - pickup
 *
 * Author: @Eric, @李杰
 *
 */

;(function($, window, document, undefined) {

	/* 
	 * 构造函数
	 *
	 * @param {dom} 生成控件的位置
	 * @param {json} 初始化的选项
	 *
	*/
	var Pickup = function(element, options) {
		if(arguments.length) {
			this._initPickup(element, options);
		}
    };
	
	Pickup.prototype = {
		defaults: {
			
			mainClass: "mws-form-inline",
			controlsContainerClass: "mws-button-row",
			
			rowContainerClass: "mws-form-row",
			rowLabelClass: "mws-form-label",
			rowItemClass: "mws-form-item",
			
			createFixedGroupClass: "btn btn-primary",
			createMovableGroupClass: "btn btn-success",
			
			periodTitleLabel: "第 {0} 时间段：",
			periodLabel: "从 {0} 到 {1}",
			
			createFixedGroupLabel: "创建会员组",
			createMovableGroupLabel: "创建活动组",
			summaryLabel: "预览",

			labelSelectLabels: {value:[[{text:'按标签添加',value:0},{text:'按消费区域',value:1},{text:'按指标添加',value:2},{text:'按商品添加',value:3}]],required:1},
			labelSelectItems: [[
			                	{index:0,type:1,value:[],required:1,visible:0}, 
			                	{index:1,type:2,value:[[{text:'任意类型',value:-1},{text:'曾经是',value:1},{text:'一直是',value:3},{text:'一直不是',value:5},{text:'最后是',value:2}]],eventType:'2',eventFunction:'8',required:1},
			                	{index:2,type:2,value:[],eventType:'2',eventFunction:'2',required:1,visible:0},
			                	{index:3,type:6,value:[],required:1,visible:0},
			                	{index:4,type:5,value:'确定',eventType:'1',eventFunction:'1',required:1,visible:0}
			                   ],[
			                	{index:0,type:1,value:[],required:1,visible:0},
			                	{index:1,type:2,value:[[{text:'任意表现',value:-1},{text:'消费总金额',value:1},{text:'购买总次数',value:2},{text:'购买总件数',value:3},{text:'平均每次消费额',value:4},{text:'平均每次消费数量',value:6},{text:'平均件单价',value:5},{text:'未购买',value:7}]],eventType:'2',eventFunction:'10',required:1},
			                	{index:2,type:2,value:[[{text:'大于',value:1},{text:'小于',value:3},{text:'等于',value:5},{text:'不等于',value:6}]],required:1,visible:0},
			                	{index:3,type:4,value:0,eventType:'3',eventFunction:'6',required:1,visible:0},
			                	{index:4,type:5,value:'确定',eventType:'1',eventFunction:'1',required:1,visible:0}
			                   ],[
								{index:0,type:1,value:[],required:1,visible:0},
								{index:1,type:2,value:[[{text:'任意门店',value:-1},{text:'购买行为发生在',value:1},{text:'购买行为没有发生在',value:2}/*,{text:'购买行为只发生在',value:3},{text:'新会员注册在',value:4}*/]],eventType:'2',eventFunction:'8',required:1},
								{index:2,type:2,value:[],eventType:'2',eventFunction:'2',required:1,visible:0},
								{index:3,type:6,value:[],required:1,visible:0},
								{index:4,type:5,value:'确定',eventType:'1',eventFunction:'1',required:1,visible:0}
			                   ],[
			                	{index:0,type:1,value:[],required:1,visible:0},
			                	{index:1,type:2,value:[[{text:'任意商品',value:-1}]],eventType:'2',eventFunction:'9',required:1},
			                	{index:2,type:6,value:[],required:1,visible:0},
    	                        {index:3,type:2,value:[],eventType:'2',eventFunction:'2',required:0,visible:0},
			                	{index:4,type:6,value:[],required:1,visible:0},
			                	{index:5,type:2,value:[[{text:'金额',value:1},{text:'数量',value:2},{text:'次数',value:8},{text:'销售额份额',value:3},{text:'客单价',value:9},
			                	                        /*{text:'销售量份额',value:4},*/{text:'购物篮渗透率',value:5},{text:'未购买',value:6}]],eventType:'2',eventFunction:'4',required:1,visible:0},
			                	{index:6,type:2,value:[[{text:'大于',value:1},{text:'等于',value:5},{text:'小于',value:3}]],required:1,visible:0},
			                	{index:7,type:4,value:0,eventType:'3',eventFunction:'6',required:1,visible:0},
			                	{index:8,type:5,value:'确定',eventType:'1',eventFunction:'1',required:1,visible:0}
			                   ]],
			 labelListNams: ['会员类型：','且会员指标：','且区域范围：','且购买商品：'],
			 baseRule:[],
			 baseRuleLabel:"基于会员组",
			 editRuleJSONData:{},
			 date: null,
			 cache: null,
			 editStatus: 0, // 0 代表可编辑状态  1代表不可编辑状态
			 productSpinner: 0
		},
		/* 
		 * 初始化
		 *
		 * @param {dom} 生成控件的位置
		 * @param {json} 初始化的选项
		 *
		*/
		_initPickup: function(element, options){
			
			BrowserDetect.init();
			moment.lang('zh-cn');
			
			this.periods = {};
			this.periods.sequence = [];
			this.periods.identity = 0;
			
			var rid = request.QueryString('rid');
			if(rid){
				this.defaults.editStatus = 1;
			}
			
			this._initLabelSelectData(options.labelSelect);
			this.element = $(element);
			this.options = $.extend({}, this.defaults, options, this.element.data());
			this.options.cache.periods = [];

			this._buildPickup();
			this._buildControls();
			this._addPeriodHandle();
			
			this._init();
			this._editRule();
		},
		_init: function(){
			var self = this;
			
			$.getJSON('/arko/pickup/init.do', function(json){
				self.options.cache.ruleId = json.ruleId;
				self.options.cache.ruleNo = json.ruleNo;
				self.options.cache.name = json.ruleNo;
			});
			
			if(request.QueryString('fid')) return;
			
			$.getJSON('/arko/pickup/getlist.do', function(json){
				var privateGroup = json.privateGroup[0];
				var shareGroup = json.shareGroup[0];
				
				self._folderDialog = $('<div>',{'style':'display:none'}).insertAfter(self.element);
				var element = $('<div>',{'class':'mws-form'}).appendTo(self._folderDialog);
				self._folderContainer = $('<div>',{'class':self.options.mainClass}).appendTo(element);
				self._folderSelector = $('<select>');

				var row = $('<div>',{'class': self.options.rowContainerClass});
				row.append($('<strong>',{'class':self.options.rowLabelClass,'html':'文件夹：'}));
				row.append($('<div>',{'class':self.options.rowItemClass}).append(self._folderSelector));
				self._folderContainer.append(row);
				
				var element = null;
				
				function process(list,prefix){
					$.each(list, function(index,item){
						
						element.append($('<option>',{text:'{0}{1}'.format(prefix,item.name),value:item.id}));
						
						if(item.subfolder && item.subfolder.length) {
							process(item.subfolder,'　{0}'.format(prefix));
						}
					});
				}
				
				element = self._folderSelector;
				var flag = 0;
				
				if(privateGroup.length){
					element = $('<optgroup>',{label:'私有组'});
					self._folderSelector.append(element);
					process(privateGroup,'');
					flag = 1;
				}
				
				if(shareGroup.length){
					element = $('<optgroup>',{label:'公共组'});
					self._folderSelector.append(element);
					process(shareGroup,'');
					flag = 1;
				}
				// 为传进来的选择基于某写规则进行筛选添加事件
				self.options.creatby.on('click',$.proxy(self._changeBaseRuleHandler,{self:self}));
				// 欢迎页面
				if(!flag){
					self._builderShade();
				}
				if(!flag){
					self._folderSelector.replaceWith($('<a>',{href:'/arko/group/list.do',html:'请先创建文件夹'}));
				}
				
				self._folderDialog.dialog({
					modal: true,
					autoOpen: false,
					title: "选择文件夹",
					width: 550,
					buttons: {
						'确定': function(){
							
							if(self._folderDialog.find('select').length){
								var fid = self._folderSelector.val();
								self.options.cache.fid = fid;
								self._submit();
							}
							
							self._folderDialog.dialog('close');
						},
						'取消': function(){
							self._folderDialog.dialog('close');
						}
					}
				});
				
			});
			
		},
		/**
		 * 根据原来的rule信息对其进行修改
		 */
		_editRule: function(){
			var self = this;
			//acmen add 根据某个规则进行修改操作 10-11
			var rid = request.QueryString('rid');
			if(rid){
				self.defaults.editStatus = 1;
				$.getJSON('/arko/pickup/initEditRule.do',{'rid':rid}, function(json){
					self.options.editRuleJSONData = json;
					self._initEditRule();
					self._editPeriodShow();
				});
			}
		},
		_initEditRule: function(){
			var self = this;
			var json = self.options.editRuleJSONData;
			var baseRule = json.baseRule;
			var name = json.name;
			//TODO 上方显示的基于的会员组信息 以及 cache中的信息
			var str = '';
			$.each(json.baseRule,function(index,item){
				if(index != 0){
					str += ' 和 ';
				}
				str += item.name;
				self.options.cache.baseRule.push(item);
			});
			if(str.length == 0){
				str = '所有会员';
			}
			str += ' <span>▼<span>';
			self.options.creatby.html(str);
			self.controls.textbox.val(name);
			$.each(json.periods,function(index,item){
				var period = item;
				self._editPeriodRule(index,period);
			});
		},
		_editPeriodRule: function(index,period){
			var self = this;
			var seq = self.periods.sequence;
			if(index >= seq.length){
				self._addPeriodHandle();
			}
			var identity = seq[index];
			//设置上方的时间选择
			var beginDate = moment(period.beginDate);
			var endDate = moment(period.endDate);
			beginDate = beginDate.toDate();
			endDate = endDate.toDate();
			//self.periods[identity].periodContainer.dateRangeSlider("values", beginDate, endDate);
			self.periods[identity].periodContainer.dateRangeSlider("values", beginDate, endDate);
			self._showPeriod();
			//添加下面标签里的值信息
			$.each(period.labelvalue,function(index,item){
				if(item.values && item.values.length > 0){
					$.each(item.values,function(index1,item1){
						var json = {index:''+index,values:item1};
						self._buildLabelByJSON(identity, json);
					});
				}
			});
		},
		/**
		 * 修改规则，加载完之后只显示提示信息没有任何的事件
		 * 触发预览功能组件
		 * 隐藏添加新时间段按钮
		 * 取消各种标题栏和删除叉叉的点击事件
		 * 设置组名为不可编辑状态
		 * 显示修改按钮 和 隐藏创建与预览按钮
		 * @param args
		 * 
		 */
		_editPeriodShow: function(args){
			var self = this;
			self._summaryHandler();
			self.controls.addButton.hide();
			self.defaults.editStatus = 1;
			self.controls.textbox.attr('disabled',true);
			self.controls.editGroupButton.show();
			self.controls.createFixedGroupButton.hide();
			self.controls.createMovableGroupButton.hide();
		},
		/**
		 * 开始修改
		 * 1、隐藏修改按钮 显示创建与预览
		 * 2、组名为可编辑状态
		 * 3、叉叉与标题栏事件响应打开
		 * 4、打开第一个page
		 * @param args
		 */
		_startEditPeriodHandler: function(args){
			var self = this.self;
			if(self.periods.sequence.length == 1)
				self.controls.addButton.show();
			self.controls.editGroupButton.hide();
			self.controls.createFixedGroupButton.show();
			self.controls.createMovableGroupButton.show();
			self.controls.textbox.attr('disabled',false);
			self.defaults.editStatus = 0;
			var index = self.periods.sequence[0];
			self.periods[index].labelContainer.click();
		},
		/*
		 * 构造pickup容器
		 */ 
		_buildPickup: function(){
			this._pickup = $('<div>',{'class':this.options.mainClass});
			this._pickup.appendTo(this.element.empty().removeAttr('id'));
		},
		/*
		 * 构造底部按钮
		 */
		_buildControls: function(){
			// 按钮组
			this.container = $("<div></div>").addClass(this.options.controlsContainerClass);
			this.controls = {};
			// 添加时间段按钮
			this.controls.addButton = $('<div></div>',{'class':'add_newtime'});
			this.controls.addButton.append($('<div></div>',{'class':'add_newtime2'}).append($('<i>',{'class':'icon-plus-sign'})).append(' 添加新的时间段'));
			this.controls.addButton.on('click', $.proxy(this._addPeriodHandle, this));
			// 自定义组名称
			this.controls.textbox = $('<input>',{type:'text'}).attr('placeholder','请输入自定义组组名');
			
			// 创建组按钮
			this.controls.createFixedGroupButton = $('<button>',{'class':this.options.createFixedGroupClass,style:'margin-left:8px'}).html(this.options.createFixedGroupLabel);
			this.controls.createFixedGroupButton.on('click', $.proxy(this._createGroupButtonHandle, {self:this,type:'Fixed'}));
			this.controls.createMovableGroupButton = $('<button>',{'class':this.options.createMovableGroupClass,style:'margin-left:8px'}).html(this.options.createMovableGroupLabel);
			this.controls.createMovableGroupButton.on('click', $.proxy(this._createGroupButtonHandle, {self:this,type:'Movable'}));
			this.controls.createMovableGroupButton.hide(); // XXX
			//创建预览按钮 Acmen add
			this.controls.createMovableGroupButton = $('<button>',{'class':this.options.createMovableGroupClass,style:'margin-left:8px'}).html(this.options.summaryLabel);
			this.controls.createMovableGroupButton.on('click', $.proxy(this._summaryHandler, {self:this}));
			// 修改组按钮 acmen add
			this.controls.editGroupButton = $('<button>',{'class':this.options.createFixedGroupClass,style:'margin-left:8px'}).html('修改会员组');
			this.controls.editGroupButton.on('click', $.proxy(this._startEditPeriodHandler, {self:this}));
			this.controls.editGroupButton.hide();
			//基于某一个规则筛选出的人的信息在对其进行会员的筛选 并初始化 为基于所有会员 Acmen add 10-10 
			//创建基于某一个会员组进行筛选
			this.controls.mbrGroupContainer = $('<div>',{'class':'pickList','style':'height:400px;overflow:auto;'}).append(this._builderpopulate());
			this.controls.mbrGroupContainer.delegate("li span i.ui-icon", "click", {}, this._pickListExpand);
			this.controls.mbrGroupContainer.delegate("li span label", "click", {}, this._pickListExtendlabel);
			this.controls.mbrGroupContainer.appendTo($('body'));
			var self = this;
			var buttons = {
					'确定': function(){
						self._subChangeBaseRuleHandler();
						$(this).dialog("close");
					}
					,"关闭": function () {
						self._cancelChangeBaseRuleHandler();
					    $(this).dialog("close");
					}
			};
			mbrDialog.append(this.controls.mbrGroupContainer);
			mbrDialog.dialog({
			    autoOpen: false,
			    closeOnEscape: false,
			    resizable: false,
			    modal: true,
			    title: "选择会员组",
			    width: "700",
			    buttons: buttons
			});
			
			this.options.cache.baseRule = [];
			
			// 按钮组容器
			this.controls.buttonContainer = $('<div>',{'class':'groupname'}).append($('<strong>',{html:'请命名：'}));
			this.controls.buttonContainer.append(this.controls.textbox);
			//acmen add 修改按钮
			this.controls.buttonContainer.append(this.controls.editGroupButton);
			
			this.controls.buttonContainer.append(this.controls.createFixedGroupButton);
			//acmen add 添加进去
			this.controls.buttonContainer.append(this.controls.createMovableGroupButton);
			
			// 追加到按钮组
			this.container.append(this.controls.buttonContainer);
			this.container.append($('<div>',{'class':'clear'}));
			// 追加到主容器
			this._pickup.append(this.controls.addButton);
			this._pickup.append(this.container);
		},
		/*
		 * 构造当前页的主容器
		 */
		_buildContainer: function(){
			var identity = this._getCurrentPagingIdentity();
			
			this.periods[identity].Container = $('<div>');
			this.periods[identity].labelContainer = $('<div>').on('click', $.proxy(this._changePeriodHandle, {self:this, identity:identity}));
			this.periods[identity].mainContainer = $('<div>',{'class':'white_space'}).css('display','none');
			this.periods[identity].summaryContainer = $('<div>',{'class':'summary-container'}).css('display','none');
			
			//构建显示列表  1、tag 2、region 3、quota 4、product
			this.periods[identity].summaryTagLabelContainer = $('<div>',{'class':'type_summary'});
			this.periods[identity].summaryTagLabelContainer.append($('<div>',{text:'不限类型','label-init':1}));
			this.periods[identity].summaryRegionLabelContainer = $('<div>',{'class':'type_summary'});
			this.periods[identity].summaryRegionLabelContainer.append($('<div>',{text:'不限范围','label-init':1}));
			this.periods[identity].summaryQuotaLabelContainer = $('<div>',{'class':'type_summary'});
			this.periods[identity].summaryQuotaLabelContainer.append($('<div>',{text:'不限指标','label-init':1}));
			this.periods[identity].summaryProductLabelContainer = $('<div>',{'class':'type_summary'});
			this.periods[identity].summaryProductLabelContainer.append($('<div>',{text:'不限商品','label-init':1}));
			
			this.periods[identity].summaryLabelContainer = $('<div>',{'class':'summary_inner'});
			var labelContainerItemTop = $('<div>',{'class':'summary_inner_top'});
			labelContainerItemTop
				.append($('<div>',{'class':'summary-left'}).append($('<div>',{'class':'summary_icon',text:'会员类型'}))
						.append(this.periods[identity].summaryTagLabelContainer))
				.append($('<div>',{'class':'summary-right'}).append($('<div>',{'class':'summary_icon',text:'且区域范围'}))
						.append(this.periods[identity].summaryRegionLabelContainer))
				.append($('<div>',{'class':'clear'}));
			var labelContainerItemButton = $('<div>',{'class':'summary_inner_bottom'});
			labelContainerItemButton
				.append($('<div>',{'class':'summary-left'}).append($('<div>',{'class':'summary_icon',text:'且会员指标'}))
						.append(this.periods[identity].summaryQuotaLabelContainer))
				.append($('<div>',{'class':'summary-right'}).append($('<div>',{'class':'summary_icon',text:'且购买商品'}))
						.append(this.periods[identity].summaryProductLabelContainer))
				.append($('<div>',{'class':'clear'}));
			
			this.periods[identity].summaryLabelContainer.append(labelContainerItemTop).append(labelContainerItemButton);
			
			this.periods[identity].summaryContainer.append(this.periods[identity].summaryLabelContainer);
			this.periods[identity].Container.append(this.periods[identity].labelContainer);
			this.periods[identity].Container.append(this.periods[identity].mainContainer);
			this.periods[identity].Container.append(this.periods[identity].summaryContainer);
			this.controls.addButton.before(this.periods[identity].Container);
		},
		/*
		 * 构造时间段选择器 
		 */
		_buildPeriodSelector: function(){
			var identity = this._getCurrentPagingIdentity();
			
			var row = $('<div>',{'class':'border_bottom'}).addClass(this.options.rowContainerClass);

			//快捷选择时间段
			if(this.periods.sequence.indexOf(identity) == 0){
				this.periods[identity].fastSelectorContainer = $('<div>',{'class':'fast_choose'})
																.append($('<div>',{text:'最近365天','class':'choose_left'}).attr('data','0-365'))
																.append($('<div>',{text:'最近180天','class':'choose_left'}).attr('data','0-180'))
																.append($('<div>',{text:'最近90天','class':'choose_left'}).attr('data','0-90'))
																.append($('<div>',{text:'最近30天','class':'choose_left'}).attr('data','0-30'))
																.append($('<div>',{text:'最近7天','class':'choose_left'}).attr('data','0-7'))
																.append($('<div>',{'class':'clear'}));
			}else if(this.periods.sequence.indexOf(identity) == 1){
				this.periods[identity].fastSelectorContainer = $('<div>',{'class':'fast_choose'})
																.append($('<div>',{text:'同比后一年','class':'choose_left'}).attr('data','1-4'))
																.append($('<div>',{text:'同比上一年','class':'choose_left'}).attr('data','1-3'))
																.append($('<div>',{text:'环比后一期','class':'choose_left'}).attr('data','1-2'))
																.append($('<div>',{text:'环比上一期','class':'choose_left'}).attr('data','1-1'))
																.append($('<div>',{'class':'clear'}));
			}
			//IE 8 兼容性
			this.periods[identity].fastSelectorContainer.delegate('div','click',this,this._fastSelectionHandle);
			row.append(this.periods[identity].fastSelectorContainer);
			
			var label = $('<label>').addClass(this.options.rowLabelClass).append($('<strong>').html('选择时间段 ：'));
			row.append(label);
			
			// 时间段容器
			this.periods[identity].periodContainer = $('<div>').addClass(this.options.rowItemClass).addClass('date-slider');
			row.append($('<div>',{'class':'periodsontainer'}).append(this.periods[identity].periodContainer));

			var beginDate = this.options.date.start;
			var endDate = this.options.date.end;
			
			var defaultBeginDate = moment(this.options.date.end.toDate()).subtract('days',89);
			var defaultEndDate = this.options.date.end;
			
			this.periods[identity].periodContainer.dateRangeSlider({
	              bounds:{
	                  min: beginDate.toDate(),
	                  max: endDate.toDate()
	              },
	              defaultValues:{
	                  min: defaultBeginDate.toDate(),
	                  max: defaultEndDate.toDate()
	              },
	              scales: [{
	                  next: function(val){
	                      var next = moment(val);
	                      return next.add('M',3).toDate();
	                  },
	                  label: function(val){
	                	  var date = moment(val);
	                	  var monthVal = date.month()+1;
	                	  var monthValStr = ''+monthVal;
	                	  if(monthVal == 1)
	                		  return date.year()+"年";
	                	  else
	                		  return monthValStr+"月";
	                  }
	              }],
	              step: {
            	    days: 1
	              }
	          });
			
			this.periods[identity].periodContainer.on('valuesChanging', $.proxy(this._showPeriod,this));
			this.periods[identity].periodContainer.on('valuesChanged', $.proxy(this._showPeriod,this));

			this.periods[identity].mainContainer.append(row);
			
			// 时间段标签
			this.periods[identity].periodLabel = $('<div>',{'class':'summary-label',style:'text-align:center'});
			
			this.periods[identity].mainContainer.append(this.periods[identity].periodLabel);
			if(this.periods.sequence.indexOf(identity) == 1){
				this._refresh();
			}
		},
		/*
		 * 删除时间段
		 */
		_removePeriodHandle: function(args){
			var self = this.self;
			
			if(self.defaults.editStatus == 1){
				return;
			}
			
			if(self.periods.sequence.length<=1) return false;
			
			var rIdentity = this.identity;
			var cIdentity = self._getCurrentPagingIdentity();
			var pIdentity = self._getPrevPagingIdentity();
			var rSequence = self._getSequenceByIdentity(rIdentity);
			
			if(cIdentity==pIdentity)
				pIdentity = self._getNextPagingIdentity();
			
			self.periods[rIdentity].deleted = 1;
			self.periods[rIdentity].Container.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
				self.periods[rIdentity].Container.remove();
				
				delete self.periods[rIdentity];
				self.options.cache.periods.splice(rSequence,1);
				
				var sIdentity = self.periods.sequence.indexOf(rIdentity);
				self.periods.sequence.splice(sIdentity,1);
				
				if(rIdentity==cIdentity){
					cIdentity = pIdentity;
					self.periods.current = cIdentity;

					self.periods[cIdentity].summaryContainer.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
						self.periods[cIdentity].mainContainer.show('blind'/*,{direction:'up',duration: 100},'slow'*/, function(){
							if(self.periods.sequence.length<2){
								self.controls.addButton.show('blind'/*,{direction:'up'},'slow'*/);
							}
						});
					});
					self.periods[cIdentity].labelContainer.removeClass('time_sleep');
					self.periods[cIdentity].labelContainer.addClass('time_active');
				} else {
					if(self.periods.sequence.length<2){
						self.controls.addButton.show('blind'/*,{direction:'up'},'slow'*/);
					}
				}
				
				var flag = 0;

				if(self.periods.sequence.length==1){
					self.periods[self.periods.sequence[0]].remove.css('display','none');
				}else
					flag = !0;
				
				for(var i=0;i<self.periods.sequence.length;i++){
					var _identity = self.periods.sequence[i];
					self.periods[_identity].labelContainer.find('strong').html(self.options.periodTitleLabel.format(i+1));
					flag && self.periods[self.periods.sequence[i]].remove.css('display','');
				}
				//acmen change 更改时间段的快捷选择
				self._removeFirstPeriodHandle();
			});
			
		},
		// 删除时间的快捷选择
		_removeFirstPeriodHandle: function(args){
			var identity = this.periods.sequence[0];
			//快捷选择时间段
			if(identity){
				this.periods[identity].fastSelectorContainer.html('');
				this.periods[identity].fastSelectorContainer.append($('<div>',{text:'最近365天','class':'choose_left'}).attr('data','0-365'))
															.append($('<div>',{text:'最近180天','class':'choose_left'}).attr('data','0-180'))
															.append($('<div>',{text:'最近90天','class':'choose_left'}).attr('data','0-90'))
															.append($('<div>',{text:'最近30天','class':'choose_left'}).attr('data','0-30'))
															.append($('<div>',{text:'最近7天','class':'choose_left'}).attr('data','0-7'))
															.append($('<div>',{'class':'clear'}));
			}
			identity = this.periods.sequence[1];
			if(identity){
				this.periods[identity].fastSelectorContainer.html('');
				this.periods[identity].fastSelectorContainer.append($('<div>',{text:'同比后一年','class':'choose_left'}).attr('data','1-4'))
														.append($('<div>',{text:'同比上一年','class':'choose_left'}).attr('data','1-3'))
														.append($('<div>',{text:'环比后一期','class':'choose_left'}).attr('data','1-2'))
														.append($('<div>',{text:'环比上一期','class':'choose_left'}).attr('data','1-1'));
			}
			
		}, 
		/*
		 * 添加时间段
		 */
		_addPeriodHandle: function(args){
			var self = this;

			var pIdentity = self._getCurrentPagingIdentity();
			self._generatePagingIdentity();
			// 初始化要存储的数据
			self._initPageCache();
			
			self._buildContainer();
			self._buildPeriodSelector();
			
			self._buildLabelSelector();
			self._buildLabelLists();
			
			var identity = self._getCurrentPagingIdentity();
			
			if(this.periods.sequence.length>=2){
				this.controls.addButton.hide('blind'/*,{direction:'up',duration: 100},'slow'*/);
			}
			
			if(this.periods.sequence.length>1 && pIdentity != -1){
				this.periods[pIdentity].mainContainer.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
					self.periods[pIdentity].summaryContainer.show('blind'/*,{direction:'up'},'slow'*/);
				});
				this.periods[pIdentity].labelContainer.addClass('time_sleep');
				this.periods[pIdentity].labelContainer.removeClass('time_active');
			}
			
			this.periods[identity].labelContainer.addClass(this.options.rowContainerClass).addClass('time_active');
			this.periods[identity].labelContainer.append($('<strong>',{html:this.options.periodTitleLabel.format(this.periods.sequence.length)}));
			this.periods[identity].labelContainer.append($('<b>',{html:''}));
			
			this.periods[identity].remove = $('<div>',{'class':'close_time'}).append($('<i>',{'class':'icon-remove'}));
			this.periods[identity].remove.on('click', $.proxy(this._removePeriodHandle, {self:this, identity:identity}));
			
			if(this.periods.sequence.length==1)
				this.periods[identity].remove.css('display','none');
			else{
				for(var i=0;i<this.periods.sequence.length;i++){
					this.periods[this.periods.sequence[i]].remove.css('display','');
				}
			}
			
			this.periods[identity].labelContainer.append(this.periods[identity].remove);
			
			//acmen 12-16 add
			if(self.defaults.editStatus != 1){
				this.periods[identity].mainContainer.show('blind'/*,{direction:'up'},'slow'*/);
			}
			
			// 显示时间段信息
			self._showPeriod();
			
			self._bindOtherUI(0,self.periods[identity].mainContainer);
		},
		_fastSelectionHandle: function(args){
			var self = args.data;
			var identity = self._getCurrentPagingIdentity();
			var cache = self.periods[self.periods.sequence[0]].cache;
			var target = $(args.target);
			var vals = target.attr('data').split('-');
			
			if(target.hasClass('disable_c'))
				return;

			self.periods[identity].fastSelectorContainer.find('div').removeClass('active_c');
			target.addClass('active_c');
			
			var beginDate = null;
			var endDate = self.options.date.end;
			
			switch (vals[0]) {
				case '0':
					var amount = vals[1] * 1 - 1;
					beginDate = endDate.clone();
					beginDate.add('day', -amount);
					break;
				case '1':
					var range = self._periodRatio(cache.beginDate,cache.endDate,vals[1]);
					beginDate = range.start;
					endDate = range.end;
					break;
				default: return;
			}

			beginDate = beginDate.toDate();
			endDate = endDate.toDate();
			
			self.periods[identity].periodContainer.dateRangeSlider("values", beginDate, endDate);
		},
		/*
		 * 环比 && 同比
		 */
		_periodRatio: function(){
			if(arguments.length){
				var beginDate = arguments[0];
				var endDate = arguments[1];
				
				if(typeof beginDate == "string"){
					beginDate = moment(beginDate);
				}
				
				if(typeof endDate == "string"){
					endDate = moment(endDate);
				}
				
				var type = parseInt(arguments[2]);
				var days = moment(endDate.format('YYYY/MM/DD'),'YYYY/MM/DD').diff(moment(beginDate.format('YYYY/MM/DD'),'YYYY/MM/DD'),'days') + 1;
				
				switch(type){
					case 1:
						endDate = beginDate.clone();
						endDate.add('day', -1);
						beginDate.subtract('days', days);
						break;
					case 2:
						beginDate = endDate.clone();
						beginDate.add('day', 1);
						endDate.add('days', days);
						break;
					case 3:
						beginDate.subtract('year', 1);
						endDate = beginDate.clone();
						endDate.add('days',days-1);
						break;
					case 4:
						beginDate.add('year', 1);
						endDate = beginDate.clone();
						endDate.add('days',days-1);
						break;
				}
				
				return moment().range(beginDate,endDate);
			}
			return null;
		},
		/*
		 * 切换时间段 
		 */
		_changePeriodHandle: function(args){
			var self = this.self;
			if(self.defaults.editStatus == 1){
				return;
			}
			var identity = this.identity;
			
			if(self.periods[identity].deleted)
				return false;
			
			if(identity == self._getCurrentPagingIdentity())
				return false;
			
			for(var i=0;i<=self.periods.sequence.length;i++){
				var _identity = self.periods.sequence[i];
				if(_identity && _identity != identity){
					self.periods[_identity].mainContainer.attr('rel-data', _identity);
					self.periods[_identity].mainContainer.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
						var id = $(this).attr('rel-data');
						$(this).removeAttr('rel-data');
						self.periods[id].summaryContainer.show('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
							$(window).resize(); 
						});
					});
					self.periods[_identity].labelContainer.removeClass('time_active');
					self.periods[_identity].labelContainer.addClass('time_sleep');
				}
			}
			
			self.periods[identity].summaryContainer.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
				self.periods[identity].mainContainer.show('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
					$(window).resize(); 
				});
			});
			self.periods[identity].labelContainer.removeClass('time_sleep');
			self.periods[identity].labelContainer.addClass('time_active');
			
			self.periods.current = identity;
		},
		_createGroupButtonHandle: function(args) {
			var self = this.self;
			var type = this.type;
			//acmen change 9-8
			var fid = request.QueryString('fid');
			
			if(type == "Fixed"){
				self.options.cache.type = 2;
			}else{
				self.options.cache.type = 1;
				
				var date = self.options.date.value.end;
				
				$.each(self.options.cache.periods, function(index, item){
					item.fromRecentWeek = moment(date.format('YYYY/MM/DD'),'YYYY/MM/DD').diff(moment(item.beginDate.format('YYYY/MM/DD'),'YYYY/MM/DD'), 'week');
					item.toRecentWeek = moment(date.format('YYYY/MM/DD'),'YYYY/MM/DD').diff(moment(item.endDate.format('YYYY/MM/DD'),'YYYY/MM/DD'), 'week') + 1;
				});
			}
			//校验数据
			var flag = self._check();
			if(!flag){
				return;
			}else{
				if(fid) {
					self.options.cache.fid = fid;
					self._submit();
				} else {
					self._folderDialog.dialog("open");
				}
			}
			
		},
		/**
		 * 预览功能
		 * @param args
		 */
		_summaryHandler: function(args){
			var self = this.self;
			if(typeof self === "undefined"){
				self = this;
			}
			var identity = self._getCurrentPagingIdentity();
			
			if(self.periods[identity].deleted)
				return false;
			
			for(var i=0;i<=self.periods.sequence.length;i++){
				var _identity = self.periods.sequence[i];
				if(_identity){
					self.periods[_identity].mainContainer.attr('rel-data', _identity);
					self.periods[_identity].mainContainer.hide('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
						var id = $(this).attr('rel-data');
						$(this).removeAttr('rel-data');
						self.periods[id].summaryContainer.show('blind'/*,{direction:'up',duration: 100},'slow'*/,function(){
							$(window).resize(); 
						});
					});
					self.periods[_identity].labelContainer.removeClass('time_active');
					self.periods[_identity].labelContainer.addClass('time_sleep');
				}
			}
			
			self.periods.current = -1;
		},
		/*
		 * 提交
		 */
		_submit: function(args) {
			var self = this;
			$.post('/arko/pickup/save.do',{'data':JSON.stringify(this.options.cache)},function(json){
				
				if(json.status == "OK")
					window.location.href = "/arko/pickup/list.do";
				else {
					var element = $('<p>',{'text':json.msg});
					var button = {
						    "关闭": function () {
							    $(this).dialog("close");
							}
						};
					self._openDialog(element, button);
				}
			});
		},
		/*
		 * 刷新快捷选择
		 */
		_refresh: function(args){
			var beginDate = this.periods[this.periods.sequence[0]].cache.beginDate;
			var endDate = this.periods[this.periods.sequence[0]].cache.endDate;
			
			var range = this.options.date;
			
			var flags = {};
			
			for(var i=1;i<5;i++){
				var _range = this._periodRatio(beginDate,endDate,i);
				flags[i] = range.contains(_range.start) && range.contains(_range.end);
			}
			
			if(this.periods.sequence.length > 1){
				for(var i=1; i<this.periods.sequence.length;i++){
					var identity = this.periods.sequence[i];
					var elements = this.periods[identity].fastSelectorContainer;
					
					for(var j=1;j<5;j++){
						var element = elements.find('[data=1-{0}]'.format(j));
						if(flags[j]){
							element.removeClass('disable_c');
						}else{
							element.removeClass('active_c');
							element.addClass('disable_c');
						}
					}
					
				}
			}
		},
		/**
		 * @author acmen
		 */
		_check: function(args){
			var self = this;
			//校验数据
			var len = 0;
			var i = 0 ;
			var periods = self.options.cache.periods;
			for(i = 0 ; i < periods.length ; i++){
				var period = periods[i];
				len += period.labelvalue[0].values.length;
				len += period.labelvalue[1].values.length;
				len += period.labelvalue[2].values.length;
				len += period.labelvalue[3].values.length;
			}
			if(len == 0){
				var element = $('<p>',{'text':'请添加筛选条件！'});
				var button = {
					    "关闭": function () {
						    $(this).dialog("close");
						}
					};
				self._openDialog(element, button);
				return false;
			}
			//acmen change 保存名称
			this.options.cache.name = this.controls.textbox.val().trim();
			if(this.options.cache.name.length == 0){
				var element = $('<p>',{'text':'请填写组名！'});
				var button = {
					    "关闭": function () {
						    $(this).dialog("close");
						}
					};
				self._openDialog(element, button);
				return false;
			}
			return true;
		},
		/*
		 * 显示时间段信息 并 更新cache中的数据
		 */
		_showPeriod: function(args){
			var identity = this._getCurrentPagingIdentity();
			if(identity == -1){
				return;
			}
			if(args){
				switch(args.type){
					case 'valuesChanging':
						this.periods[identity].fastSelectorContainer.find('div').removeClass('active_c');
						this._refresh();
						break;
					case 'valuesChanged':
						this._refresh();
						break;
				}
			}
			
			var label = this.periods[identity].labelContainer.find('b');
			this.periods[identity].dateRangeSlider = this.periods[identity].periodContainer.dateRangeSlider("values");
			
			var beginDate = moment(this.periods[identity].dateRangeSlider.min);
			var endDate = moment(this.periods[identity].dateRangeSlider.max);
			var days = moment(endDate.format('YYYY/MM/DD'),'YYYY/MM/DD').diff(moment(beginDate.format('YYYY/MM/DD'),'YYYY/MM/DD'), 'days') + 1;
			
			this.periods[identity].cache.beginDate = beginDate.format('YYYY-MM-DD');
			this.periods[identity].cache.endDate = endDate.format('YYYY-MM-DD');
			
			var text = "从 "+beginDate.format('L')+" 至 "+endDate.format("L")+" 共"+days+"天";
			
			this.periods[identity].periodLabel.text(text);
			label.text(text);
		},
		/*
		 * 生成下一个分页索引
		 */
		_generatePagingIdentity: function(){
			var identity = ++this.periods.identity;
			
			if(!this.periods[identity])
				this.periods[identity] = {};
			
			this.periods.current = identity;
			this.periods.sequence.push(identity);
		},
		/*
		 * 获取当前页索引
		 */
		_getCurrentPagingIdentity: function(){
			if(!this.periods.current)
				this.periods.current = this.periods.identity;
			
			return this.periods.current;
		},
		/*
		 * 获取上一页索引
		 */
		_getPrevPagingIdentity: function(){
			var identity = this._getCurrentPagingIdentity();
			var index = this.periods.sequence.indexOf(identity);
			if(index>0)
				identity = this.periods.sequence[index-1];
			return identity;
		},
		/*
		 * 获取上一页索引
		 */
		_getNextPagingIdentity: function(){
			var identity = this._getCurrentPagingIdentity();
			var index = this.periods.sequence.indexOf(identity);
			if(index<(this.periods.sequence.length-1))
				identity = this.periods.sequence[index+1];
			return identity;
		},
		/*
		 * 获取Sequence
		 */
		_getSequenceByIdentity: function(identity){
			for(var i=0;i<this.periods.sequence.length;i++){
				if(this.periods.sequence[i]==identity){
					return i;
				}
			}
			return -1;
		},
		/*
		 * 获取一年中的第一个周日
		 */
		_getFirstSundayOfYear: function(){
			var date = null;
			
			if(arguments.length){
				var _val = arguments[0];
				if(_val.end && _val.end.year)
					date = moment([_val.end.year()]);
				else if(_val.year)
					date = moment([_val.year()]);
				else if(val.getYear)
					date = moment([_val.getYear()]);
				else
					date = moment(_val);
			}
			
			if(!date)
				date = moment([this.options.date.end.year()]);
			
			while(date.day()!=0){
		        date.add('day', -1);
		    }
			
			return date;
		},
		/*
		 * 获取最近一周的周六
		 */
		_getRecentSaturday: function(){
			var date = null;
			
			if(arguments.length){
				var _date = arguments[0];
				if(_date.clone){
					date = _date.clone();
				}else if(_date.toString){
					date = moment(_date);
				}
			}
			
			if(!date)
				date = this.options.date.end.clone();
			
		    while(date.day()!=6){
		        date.add('day',-1);
		    }
		    
			return date;
		},
		/*
		 * 获得当前周数
		 */
		_week: function(date){
			var week = date.week();
			return week;
		},
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
		},
		/*
		 * 设置参数
		 * 
		 * @param {string} 参数名
		 * @param {object} 参数值
		 */
		option: function( key, value ) {
			
			if ( arguments.length === 0 ) {
				// don't return a reference to the internal hash
				return $.extend( {}, this.options );
			}

			if  (typeof key === "string" ) {
				if ( value === undefined ) {
					return this.options[ key ];
				}

				this.options[ key ] = value;
			}

			return this;
		}, 
		/*
		 * 销毁控件
		 */
		destroy: function() {
			this.pickList.remove();
			this.element.show();
		},
		/**
		 * @author acmen
		 */
		_initLabelSelectData: function(json){
			var members = json.members;
			var len = members.length;
			var tag = [];
			var tagitems = [];
			for(var i = 0 ; i < len ; i++){
				tag[i] = {};
				tag[i].text = members[i].text;
				tag[i].value = members[i].value;
				tagitems[i] = members[i].items;
			}
			
			this.defaults.labelSelectItems[0][2].value[0] = tag;
			this.defaults.labelSelectItems[0][3].value = tagitems;
			
			var regions = json.region;
			len = regions.length;
			tag = [];
			tagitems = [];
			for(var i = 0 ; i < len ; i++){
				tag[i] = {};
				tag[i].text = regions[i].text;
				tag[i].value = regions[i].value;
				tagitems[i] = regions[i].items;
			}
			this.defaults.labelSelectItems[2][2].value[0] = tag;
			this.defaults.labelSelectItems[2][3].value = tagitems;
			
			var goods = json.goods;
			len = goods.length;
			tag = [];
			tag1 = [];
			tagitems = [[]];
			tagitems1 = [[]];
			tag.push(this.defaults.labelSelectItems[3][1].value[0][0]);
			for(var i = 0 ; i < len ; i++){
				tag[i+1] = {};
				tag[i+1].text = goods[i].text;
				tag[i+1].value = goods[i].value;
				tagitems[i+1] = goods[i].items;

				tag1[i] = {};
				tag1[i].text = goods[i].text;
				tag1[i].value = goods[i].value;
				tagitems1[i] = goods[i].items;
			}
			
			this.defaults.labelSelectItems[3][1].value[0] = tag;
			this.defaults.labelSelectItems[3][2].value = tagitems;
			this.defaults.labelSelectItems[3][3].value[0] = tag1;
			this.defaults.labelSelectItems[3][4].value = tagitems1;
			
			//存储基于某个数据  10-10
			this.defaults.baseRule = json.rules;
		},
		/**
		 * @author acmen
		 * 封装cache数据
		 */
		_initPageCache: function(){
			var self = this;
			//----acmen 增加一个页面数据保存对象 并且 和每一个页相关联-----
			var period = {
					beginDate:'',
					endDate:'',
					periodType:1,
					labelvalue:[{index:0,name:'labelItems','values':[]},
			                      {index:1,name:'quotaItems','values':[]},
			                      {index:2,name:'regionItems','values':[]},
			                      {index:3,name:'productItems','values':[]}]};
			self.options.cache.periods.push(period);
			var identity = self._getCurrentPagingIdentity();
			self.periods[identity].cache = period;
			//----acmen-----
		},
		/*
		 * acmen 创建标签选择器 
		 * 8-30 change
		 */
		_buildLabelSelector: function(){
			var self = this;
			var identity = self._getCurrentPagingIdentity();
			
			var row = $('<div>',{'class' : self.options.rowContainerClass + ' select_gray'});
			var labelSelectLabels = self._buildSelect(-1,self.options.labelSelectLabels);
			var label = $('<label>').addClass(self.options.rowLabelClass).attr('style','padding:0').append(labelSelectLabels);
			var items = $('<div>');
			$.each(self.options.labelSelectItems,function(index,item){
				if(index != 3){
					self._buildLabelSelectItem(items,item,index);
				}else if(index == 3){
					self._buildProductLabelSelectItem(items,item,index);
				}
			});
			label.delegate('select','change',self,this._labelHandler);
			
			row.append(label);
			row.append(items.children().eq(0).clone(true));
			self.periods[identity].LabelSelector = items;
			self.periods[identity].LabelCurrentSelector = row;
			
			//self.periods[identity].mainContainer.append(self.periods[identity].LabelCurrentSelector);
			self.periods[identity].LabelCurrentIndex = 0;
		},
		/**
		 * 创建LabelSelectItem
		 * acmen 10-8 change 分离成两个方法_buildLabelSelectItem 和 _buildLabelSelectItem_i
		 */
		_buildLabelSelectItem: function(container,list,index){
			var self = this;
			var elements = $('<div>',{'label-index':index,'style':'margin-left:10px;'});
			$.each(list,function(index,item){
				var type = item.type;
				var element = self._buildLabelSelectItem_i(index,type,item);
				elements.append(element);
				container.append(elements);
				
				if(item.visible == 0)
					element.hide();
			});
		},
		/**
		 * 创建商品的LabelSelectItem 特殊处理  
		 */
		_buildProductLabelSelectItem: function(container,list,index){
			var self = this;
			var elements = $('<div>',{'label-index':index,'style':'margin-left:10px;','class':'build_tr'});
			var selDiv = $('<div>',{'style':'float: none; padding: 2px 5px 2px 10px;width:420px;','class':'build_td','label-index':index});
			var line = $('<div>',{'class':'product-line build_td'});
			
			$.each(list,function(index,item){
				var type = item.type;
				var element = self._buildLabelSelectItem_i(index,type,item);
				if(index < 1){
					element.css('padding','2px 5px 2px 10px;');
					element.addClass('build_td');
					elements.append(element);
					element.css('float','none');
				}else if(index == 3){
					selDiv.append(line);
					//element.addClass('build_td');
					selDiv.append(element);
				}else if(index ==1 || index == 2 || index == 4){
					selDiv.append(element);
					//element.addClass('build_td');
				}else if(index == 5){
					elements.append(selDiv);
					element.addClass('build_td');
					elements.append(element);
					element.css('float','none');
				}else{
					element.addClass('build_td');
					elements.append(element);
					element.css('float','none');
				}
				if(item.visible == 0)
					element.hide();
				//element.css('float','none');
			});
			container.append(elements);
		},
		/**
		 * 
		 * @param index
		 * @param type
		 * @param item
		 * @returns
		 */
		_buildLabelSelectItem_i: function(index,type,item){
			var self = this;
			var label;
			var element = $('<div>');
			switch(type){
				case 1 :
					label = self._buildLogicLabel(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					break;
				case 2 :
					label = self._buildSelect(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					var eventType = item.eventType;
					var eventFunction = item.eventFunction;
					if(eventType && eventFunction){
						self._labelEventControol(label, {pickup:self}, eventType, eventFunction);
					}
					break;
				case 3 :
					label = self._buildSelect2(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					break;
				case 4 :
					label = self._buildNumSel(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					var eventType = item.eventType;
					var eventFunction = item.eventFunction;
					if(eventType && eventFunction){
						self._labelEventControol(label, {pickup:self}, eventType, eventFunction);
					}
					break;
				case 5 :
					label = self._buildSubmitButton(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					var eventType = item.eventType;
					var eventFunction = item.eventFunction;
					self._labelEventControol(label, {pickup:self}, eventType, eventFunction);
					
					break;
				case 6 :
					label = self._builderMultipleSel(index,item);
					element.attr('style','float:left; padding:2px 5px;').append(label);
					break;
				default:
					break;
			}
			return element;
		},
		/**
		 * @author acmen
		 * 创建标签列表
		 * 8-19 add
		 * 
		 */
		_buildLabelLists: function(){
			var self = this;
			var names = self.options.labelListNams;
			var identity = self._getCurrentPagingIdentity();
			var lableLists = null;
			$.each(names,function(index,item){
				var elements = self.periods[identity].LabelSelector.children()[0];
				var labelList = self._buildLableList(item,elements,index);
				if(lableLists){
					lableLists.after(labelList);
				}else{
					lableLists = labelList;
				}
			});
			self.periods[identity].labelLists = lableLists;
			self.periods[identity].mainContainer.append(lableLists);
		},
		/**
		 * @author acmen
		 * cellspacing="0" cellpadding="0" style="width:100%;"  
		 */
		_buildLableList: function(name , elements,index){
			var labelList = $('<div>',{'class':'mws-form-row'});
			var labelListName = $('<strong>',{'class':'mws-form-label',text:name});
			var labelListValue = $('<div>',{'class':'mws-form-item'});
			var labelListTable = $('<table>',{'cellspacing':0,'cellpadding':0,'style':'width:100%'});
			//商品特殊处理 
			if(index == 3){
				labelListTable.css('margin-bottom','12px;');
			}
			labelListValue.append(labelListTable);
			labelListValue.append(elements);
			labelList.append(labelListName);
			labelList.append(labelListValue);
			return labelList;
		},
		/**
		 * @author acmen
		 * 创建标签行
		 * 最后包含一个删除选项和时间
		 */
		_buildLabelItem: function(json){
			var index = json.index;
			var classes = new Array(['class_01','class_02','class_03','class_04']
									,['class_01','class_02','class_03','class_04']
									,['class_01','class_02','class_03','class_04']
									,['class_01','class_12','class_13','class_14','class_15']);
			var values = json.values;
			var tds = null;
			$.each(values,function(labelIndex,labelItem){
				var type = labelItem.type;
				var td = $('<td>',{'class':classes[index][labelIndex]});
				switch (type) {
					case '1':
						var text = labelItem.value.text;
						td.text(text);
						break;
					case '2':
						var text = labelItem.value.text;
						td.text(text);
						break;
					case '3':
						var text = labelItem.value.text;
						td.text(text);
						break;
					case '4':
						var text = labelItem.value.text;
						td.text(text);
						break;
					case '5':
						break;
					case '6':
						var textvalues = labelItem.value;
						var text = '';
						$.each(textvalues,function(textIndex,textItem){
							if(textIndex != 0){
								text += '<br/>或 ';
							}
							text += '【'+textItem.text+'】';
						});
						td.html(text);
						break;
					case '7':
						var text = labelItem.value.value;
						td.text(text);
						break;
					default:	
						break;
				};
				
				//acmen add 商品的时候如果选择渗透率等特殊处理 如果是
				if(index == 3 && labelIndex == 3 && td.text() != null && td.text().length > 0){
					td.text('在' + td.text());
				}
				if(index == 3 && labelIndex == 4 && td.text() != null && td.text().length > 0){
					td.text(td.text() + '中的');
				}
				
				
				if(tds){
					tds.after(td);
				}else{
					tds = td;
				}
			});
			return tds;
		},
		/*
		 * 创建或且标签
		 * <input class="ibutton" type="checkbox" data-label-on="且" data-label-off="或" checked="checked">
		 * ,{type:'checkbox', data-label-on:'且',data-label-off:'或',checked:'checked'}
		 */
		_buildLogicLabel: function(index,item){
			var required = item.required;
			var logicLabel = $('<input>',{'class':'ibutton','type':'checkbox','data-label-on':'或','data-label-off':'且','style':'min-width:45px;','label-type':'1','label-index':index,'label-required':required});
			return logicLabel;
		},
		/*
		 * 创建Select标签 test
		 */
		_buildSelect: function(index,item){
			var values = item.value;
			var required = item.required;
			var visible = item.visible;
			var select = $('<select>',{'label-type':2,'label-index':index,'label-required':required,'label-visible':visible});
			values[0]&&$.each(values[0],function(index,item){
				select.append($('<option>',{'text':item.text,'value':item.value}));
			});
			return select;
		},
		/**
		 * @author acmen
		 * 创建第二种select标签
		 * <div class="mws-form-item" style="width:150px; padding:0; margin:0;">                                    
		 *		<select class="mws-select2">
		 *			<option>湖南</option>
		 *			<option>长沙</option>
		 *			<option>店名</option>
		 *		</select>
		 *	</div>
		 */
		_buildSelect2: function(index,item){
			var values = item.value;
			var required = item.required;
			var visible = item.visible;
			var select2 = $('<select>',{'class':'mws-select2','label-type':3,'label-index':index,'label-required':required,'label-visible':visible});
			
			values[0]&&$.each(values[0],function(index,item){
				select2.append($('<option>',{text:item.text,value:item.value}));
			});
			
			var select2Div = $('<div>',{'class':'mws-form-item','style':'width:280px; padding:0; margin:0;'}).append(select2);
			return select2Div;
		},
		/**
		 * 创建数字选择器
		 * @author acmen
		 */
		_buildNumSel: function(index,item){
			var num = item.value;
			var required = item.required;
			var visible = item.visible;
			var visibility = item.visibility;
			var numsel;
			if(visibility == '0'){
				numsel = $('<input>',{type:'text',value:num,'label-type':4,'label-index':index,'label-required':required,'label-visible':visible,'label-visibility':'hidden'}).addClass('mws-spinner');
			}else{
				numsel = $('<input>',{type:'text',value:num,'label-type':4,'label-index':index,'label-required':required,'label-visible':visible}).addClass('mws-spinner');
			}
			return numsel;
		},
		/*
		 * 创建多选选项
		 * <select class="mws-select2" multiple size="5">
		 */
		_builderMultipleSel: function(index,item){
			var value = item.value;
			var required = item.required;
			var visible = item.visible;
			var multipleSel = $('<select>',{'class':'mws-select2',multiple:'multiple',size:'5','label-type':6,'label-index':index,'label-required':required,'label-visible':visible,'style':'width:280px;'});
			value[0]&&$.each(value[0],function(index,item){
				multipleSel.append($('<option>',{value:item.value,text:item.text}));
			});
			return multipleSel;
		},
		/**
		 * 创建TextArea
		 * title="This is a tooltip" rel="tooltip" data-placement="left"
		 * @author acmen
		 */
		_buildTextArea: function(index,item){
			var tip = item.tip;
			var title = item.title;
			var required = item.required;
			var visible = item.visible;
			var textarea = $('<textarea>',{'label-type':7,'label-index':index,'label-required':required,'label-title':title,'placeholder':tip,'title':tip,'rel':'tooltip','data-placement':'left','label-visible':visible});
			return textarea;
		},
		/*
		 * 添加确定按钮
		 * acmen
		 */
		_buildSubmitButton: function(index,item){
			var value = item.value;
			var required = item.required;
			var visible = item.visible;
			var subButton = $('<a>',{href:'javascript:void(0)','label-type':5,'label-index':index,'class':'btn','label-required':required,'label-visible':visible}).append($('<i>',{'class':'icol-accept'})).append(value);;
			return subButton;
		},
		/**
		 * 并且小标签
		 */
		_buildAndButton: function(index,value){
			var and = $('<i>',{'class':'icol32-basket-delete'});
			return and;
		},
		/**
		 * 或者小标签
		 */
		_buildOrButton: function(){
			var or = $('<i>',{'class':'icol32-basket-add'});
			return or;
		},
		/**
		 * 删除小标签
		 */
		_buildDeleteButton: function(){
			var del = $('<span>').append($('<i>',{'class':'icol-cross'})).append('&nbsp;&nbsp;删除');
			return del;
		},
		/**
		 * 新增小按钮
		 */
		_buildAddButton: function(){
			var del = $('<span>').append($('<i>',{'class':'icol-add'})).append('&nbsp;&nbsp;新增');
			return del;
		},
		/**
		 * @author acmen
		 * 删除和新增按钮
		 * <div class="btn-group">
         *      <button type="button" class="btn">Button</button>
         *      <button type="button" class="btn" disabled="disabled">Disabled</button>
         *  </div>
		 */
		_buildDelAndAddButton: function(){
			var deladd = $('<div>',{'class':'btn-group'})
							.append($('<button>',{'type':'button','class':'btn btn-danger btn-small','text':'删除'}))
							.append($('<button>',{'type':'button','class':'btn btn-success btn-small','text':'新增'}));
			return deladd;
		},
		/**
		 * @author acmen
		 * 获取当前Label里的数据
		 * 
		 * 当前的标签如果label-visibility : show 则选取 如果是 hidden 则不选取
		 * change 8-30
		 */
		_getCurrentLabelValue: function(attrs){
			var json = {index:0,values:[]};
			
			var pickup = attrs.pickup;
			var elements = attrs.elements;
			var itemIndex = elements.attr('label-index');
			var labelItems = elements.children();
			
			//var identity = pickup._getCurrentPagingIdentity();
			//var itemIndex = pickup.periods[identity].LabelCurrentIndex;
			//var label = pickup.periods[identity].LabelCurrentSelector;
			//var labelItems = label.children().eq(1).children();
			json.index = itemIndex;
			$.each(labelItems,function(index,item){
				var itemValues = $(item).find('[label-type]');
				$.each(itemValues,function(valueIndex,valueItem){
					var visibility = $(valueItem).attr('label-visibility');
					//var required = $(valueItem).attr('label-required');
					if(visibility && visibility == 'hidden'){
						json.values.push({text:'-',value:'-'});
					}else{
						var itemJson = pickup._getItemValue(valueItem);
						if(itemJson.type){
							var flag = pickup._verificationLabelValue(itemJson);
							if(!flag){
								var elements = $('<p>',{text:'请校验数据!'});
								var buttons = {
									    "关闭": function () {
										    $(this).dialog("close");
										}
									};
								pickup._openDialog(elements,buttons);
								json = null;
								return;
							}else{
								json.values.push(itemJson);
							}
						}
					}
					
				});
			});
			return json;
		},
		/**
		 * @author acmen
		 * 删除预览中的信息
		 * _delSummaryLabelValue(areaIndex,labelIndex);
		 */
		_delSummaryLabelValue: function(areaIndex,labelIndex){
			var self = this;
			var identity = self._getCurrentPagingIdentity();
			var selStr = 'div :eq('+labelIndex+')';
			switch (areaIndex) {
				case 0:
					var taglabel = self.periods[identity].summaryTagLabelContainer;
					taglabel.find(selStr).remove();
					if(taglabel.children().length == 0){
						taglabel.append($('<div>',{text:'不限类型','label-init':1}));
					}else{
						var str = $(taglabel.children()[0]).text();
						$(taglabel.children()[0]).text('满足'+str.substr(3));
					}
					break;
				case 1:
					var quotalabel = self.periods[identity].summaryQuotaLabelContainer;
					quotalabel.find(selStr).remove();
					if(quotalabel.children().length == 0){
						quotalabel.append($('<div>',{text:'不限指标','label-init':1}));
					}else{
						var str = $(quotalabel.children()[0]).text();
						$(quotalabel.children()[0]).text('满足'+str.substr(3));
					}
					break;
				case 2:
					var regionlabel = self.periods[identity].summaryRegionLabelContainer;
					regionlabel.find(selStr).remove();
					if(regionlabel.children().length == 0){
						regionlabel.append($('<div>',{text:'不限范围','label-init':1}));
					}else{
						var str = $(regionlabel.children()[0]).text();
						$(regionlabel.children()[0]).text('满足'+str.substr(3));
					}
					break;
				case 3:
					var productlabel = self.periods[identity].summaryProductLabelContainer;
					productlabel.find(selStr).remove();
					if(productlabel.children().length == 0){
						productlabel.append($('<div>',{text:'不限商品','label-init':1}));
					}else{
						var str = $(productlabel.children()[0]).text();
						$(productlabel.children()[0]).text('满足'+str.substr(3));
					}
					break;
				default:
					break;
			}
		},
		/**
		 * @author acmen
		 * 添加预览信息的内容 
		 */
		_addSummaryLabelValue: function(index,labelValStr){
			var self = this;
			var identity = self._getCurrentPagingIdentity();
			switch (index) {
				case '0':
					var taglabel = self.periods[identity].summaryTagLabelContainer;
					taglabel.find('[label-init=1]').remove();
					taglabel.append($('<div>',{html:labelValStr}));
					break;
				case '1':
					var quotalabel = self.periods[identity].summaryQuotaLabelContainer;
					quotalabel.find('[label-init=1]').remove();
					quotalabel.append($('<div>',{html:labelValStr}));
		
					break;
				case '2':
					var regionlabel = self.periods[identity].summaryRegionLabelContainer;
					regionlabel.find('[label-init=1]').remove();
					regionlabel.append($('<div>',{html:labelValStr}));
					
					break;
				case '3':
					var productlabel = self.periods[identity].summaryProductLabelContainer;
					productlabel.find('[label-init=1]').remove();
					productlabel.append($('<div>',{html:labelValStr}));
					
					break;
				default:
					break;
			}
		},
		/**
		 * @author acmen
		 * 描述添加的标签内容
		 */
		_getLabelFormatStr: function(index,flag,json){
			var labelStr = "";
			if(flag){
				labelStr = json[0].value.text + "&nbsp;>>&nbsp;";
			}else{
				labelStr = "满足&nbsp;>>&nbsp;";
			}
			switch(index){
				case '0':
					var str = "";
					labelStr += (json[1].value.text + "&nbsp;-&nbsp;");
					labelStr += (json[2].value.text + "为&nbsp;-&nbsp;");
					$.each(json[3].value, function(index, value) {
						if(index != 0){
							str += "&nbsp;或&nbsp; ";
						}
						str += (value.text);
					});
					labelStr += str;
					break;
				case '1':
					labelStr += (json[1].value.text);
					if(json[1].value.value != '7'){
						labelStr += "&nbsp;-&nbsp;";
						labelStr += (json[2].value.text + "&nbsp;-&nbsp;");
						labelStr += (json[3].value.text + "");
					}
					break;
				case '2':
					labelStr += (json[1].value.text + "&nbsp;-&nbsp;");
					labelStr += (json[2].value.text + "为 &nbsp;-&nbsp;");
					var str = "";
					$.each(json[3].value, function(index, value) {
						if(index != 0){
							str += "&nbsp;或&nbsp; ";
						}
						str += (value.text);
					});
					labelStr += str;
					break;
				case '3':
					labelStr += (json[1].value.text + "为 &nbsp;-&nbsp;");
					if(json[2].type == '7'){
						labelStr += (json[2].value.value + "&nbsp;-&nbsp;");
					}else{
						var str = "";
						$.each(json[2].value, function(index, value) {
							if(index != 0){
								str += "&nbsp;或&nbsp; ";
							}
							str += (value.text);
						});
						labelStr += (str + "&nbsp;-&nbsp;");
					}
					if(json[3].text != '-'){
						labelStr += ("在" + json[3].value.text + "&nbsp;-&nbsp;" );
					}
					if(json[4].text != '-'){
						if(json[4].type == '7'){
							labelStr += (json[4].value.value + "中的&nbsp;-&nbsp;");
						}else{
							var str = "";
							$.each(json[4].value, function(index, value) {
								if(index != 0){
									str += "&nbsp;或&nbsp; ";
								}
								str += (value.text);
							});
							labelStr += (str + "中的&nbsp;-&nbsp;");
						}
					}
					labelStr += (json[5].value.text);
					if(json[5].value.value != '6'){
						labelStr += (json[6].value.text + "");
						labelStr += ("&nbsp;-&nbsp;"+json[7].value.text + "");
					}
					break;
				default:
			}
			return labelStr;
		},
		/**
		 * @author acmen
		 * 获取标签元素的
		 * 1、且或标签
		 * 2、普通select标签
		 * 3、可搜索select标签
		 * 4、数字标签
		 * 5、确定标签
		 * 6、多选标签
		 * 7、文本框
		 */
		_getItemValue: function(itemHtml){
			var json = {};
			var item = $(itemHtml);
			var type = item.attr('label-type');
			//var value = '0';
			switch(type){
				case '1':
					json.type = '1';
					var va = {value:'',text:''};
					if(item.attr('checked')){
						va.value = '3';
						va.text = '或者';
					}else{
						va.value = '2';
						va.text = '并且';
					}
					json.value = va;
					break;
				case '2':
					json.type = '2';
					var va = {value:'',text:''};
					va.value = item.find('option:checked').val();
					va.text = item.find('option:checked').text();
					json.value = va;
					break;
				case '3':
					json.type = '3';
					var va = {value:'',text:''};
					va.value = item.find('option:checked').val();
					va.text = item.find('option:checked').text();
					json.value = va;
					break;
				case '4':
					json.type = '4';
					value = item.val();
					var va = {value:'',text:''};
					if(item.attr('disabled') != 'disabled'){
						va.value = item.val();
						va.text = item.val();
					}
					json.value = va;
					break;
				case '5':
					break;
				case '6':
					json.type = '6';
					var vas = [];
					var values = item.val();
					//var texts = item.text();
					values&&$.each(values,function(valIndex,valItem){
						var va = {value:'',text:''};
						va.value = valItem;
						va.text = item.find('option[value='+valItem+']').text();
						vas.push(va);
					});
					json.value = vas;
					break;
				case '7':
					json.type = '7';
					var va = {value:'',text:''};
					va.value = item.val();
					va.text = item.attr('label-title');
					json.value = va;
				default:
					break;
			}
			return json;
		},
		/**
		 * @author acmen
		 * 校验是否有值
		 */
		_verificationLabelValue: function(json){
			var type = json.type;
			var value = json.value;
			var flag = true;
			switch (type) {
				case '1':
					if(value.value == ''){
						flag = false;
					}
					break;
				case '2':
					if(value.value == ''){
						flag = false;
					}
					break;
				case '3':
					if(value.value == ''){
						flag = false;
					}
					break;
				case '4':
					if(value.value == ''){
						flag = false;
					}
					break;
				case '5':
					break;
				case '6':
					if(value.length == 0){
						flag = false;
					}
					break;
				case '7':
					if(value.value == ''){
						flag = false;
					}
					break;
				default:
					break;
			}
			return flag;
		},
		/**
		 * @author acmen
		 * 添加按钮相应事件
		 * 获取当前标签的值封装为json对象
		 * 1、生成相应的标签
		 * 2、产生相应的值对象
		 * change 9-13
		 */
		_addLabel: function(args){
			var self = this.pickup;
			var identity = self._getCurrentPagingIdentity();
			var attrs = {'pickup':self,'elements':$(args.currentTarget).parent().parent()};
			var json = self._getCurrentLabelValue(attrs);
			if(json == null){
				return;
			}
//			console.log(json);
			self._buildLabelByJSON(identity,json);
		},
		_buildLabelByJSON: function(identity,json){
			var self = this;
			// 产生相应的标签行
			var lableIndex = json.index;
			var table = self.periods[identity].labelLists.eq(lableIndex).find('table');
			var trIndex = table.find('tr').length+1;
			var tds = self._buildLabelItem(json);
			var trClassName = 'tr_first';
			if(trIndex%2 == 0){
				trClassName = 'tr_second';
			}
			var tr = $('<tr>',{'class':trClassName,'area-index':lableIndex});
			if(trIndex == 1 && ($(tds[0]).text() == '或者' || $(tds[0]).text() == '并且')){
				$(tds[0]).text('满足');
			}
			
			var startTd = $('<td>',{'class':'td_begin'});
			var endDelTd = $('<td>',{'class':'td_end'});
			var endAddTd = $('<td>',{'class':'td_end'});
			if(json.values[0].type == 1 && json.values[0].value.value == '2'){
				var and = self._buildAndButton();
				startTd.append(and);
			}else if(json.values[0].type == 1 && json.values[0].value.value == '3'){
				var or = self._buildOrButton();
				startTd.append(or);
			}
			//删除和添加按钮 9-8 acmen change 
			var del = self._buildDeleteButton();
			var add = self._buildAddButton();
			self._labelEventControol(del,{'pickup':self},'1','3');
			self._labelEventControol(add,{'pickup':self},'1','7');
			endDelTd.append(del);
			endAddTd.append(add);
			tr.append(tds);
			tr.append(endDelTd);
			tr.append(endAddTd);
			
			//----将数据抛进对象中-----
			//判断列表中是否已经存在相应的value
			var itemValues = json.values;
			var itemValuesStr = JSON.stringify(itemValues);
			var cache = self.periods[identity].cache;
			var currentValues = cache.labelvalue[lableIndex].values;
			var flag = false;
			$.each(currentValues,function(labelValueIndex,labelValueItem){
				if(JSON.stringify(labelValueItem) === itemValuesStr){
					var elements = $('<p>',{text:'数据重复添加!'});
					var buttons = {
						    "关闭": function () {
							    $(this).dialog("close");
							}
						};
					self._openDialog(elements,buttons);
					flag = true;
					return;
				}
			});
			if(flag){
				return;
			}
			
			table.append(tr);
			cache.labelvalue[lableIndex].values.push(itemValues);
			table.next().attr('style','margin-top:10px;');
			table.next().hide();
			$(table.next().children()[0]).show();
			
			var labelStr = "";
			var jsonvals = json.values;
			var flag = 1;
			if(trIndex == 1){
				flag = 0;
			}
			labelStr = self._getLabelFormatStr(json.index,flag,jsonvals);
			// 添加预览标签
			self._addSummaryLabelValue(json.index,labelStr);
		},
		/**
		 * @author acmen
		 * 二级联动菜单设计
		 * 功能更改后面一个节点的select信息
		 */
		_linkageMenu: function(args){
			var self = this.pickup;
			if(typeof self === "undefined"){
				self = this;
			}
			valueIndex = 0;
			if($(args.target).find('option:checked').val() == -1){
				valueIndex = $(args.target).find('option:checked').index();
			}else{
				valueIndex = $(args.target).find('option:checked').index();
			}
			var labelIndex = $(args.target).parent().parent().attr('label-index');
			
			var nextLabelItem = $(args.target).parent().next().find('[label-index]');
			var nextLabelItemIndex = nextLabelItem.attr('label-index');
			
			//获取相应的值
			var nextOptionValues = self.options.labelSelectItems[labelIndex][nextLabelItemIndex].value[valueIndex];
			
			//首先清空列表   再添加
			nextLabelItem.empty();
			nextLabelItem.val();
			
			nextLabelItem.parent().css('height','auto');
			
			//判断下面的一个类型再根据信息进行相应的处理
			if(!Array.isArray(nextOptionValues) && typeof nextOptionValues === 'object'){
				var type = nextOptionValues.type;
				switch (type) {
				case 1:
					nextLabelItemCon = nextLabelItem.parent();
					var labelIndex = nextLabelItem.attr('label-index');
					var item = {required:1,tip:'每行一个产品货号\n123\n123',title:'产品货号列表'};
					var textarea7 = self._buildTextArea(labelIndex,item);
					nextLabelItemCon.empty().append(textarea7);
					$.fn.autosize && nextLabelItemCon.autosize();
					
					break;

				default:
					break;
				}
			}else if(Array.isArray(nextOptionValues)){
				if(nextLabelItem[0].tagName == 'TEXTAREA'){
					var item = {value:[],required:1};
					var nextLabelItemNew = self._builderMultipleSel(nextLabelItem.attr('label-index'),item);
					nextLabelItemNew.css('float','none');
					nextLabelItem.replaceWith(nextLabelItemNew);
					$.each(nextOptionValues,function(index,item){
						nextLabelItemNew.append($('<option>',{'text':item.text,'value':item.value}));
					});
					nextLabelItemNew.select2();
				}else{
					$.each(nextOptionValues,function(index,item){
						nextLabelItem.append($('<option>',{'text':item.text,'value':item.value}));
					});
				}
				
				nextLabelItem.select2("val", "");
				
			}
			
		},
		/**
		 * @author acmen
		 * 数字框只准输入数字
		 */
		_numberTextHandler: function(args){
			var reg = new RegExp('%'+'$');
			if(args.keyCode == 8 ){
				if("%" == args.target.value){
					args.target.value = '';
				}else if(reg.test(args.target.value)){
					return;
				}
			}
			if((args.keyCode >= 34 && args.keyCode <= 46)){
				return;
			}
			var target = args.target;
			if(""!=target.value){ 
				if($(target).attr('label-per') == 1){
					target.value = target.value.replace("%", ""); 
				}
				var str = target.value.replace(/(^\s*)|(\s*$)/g, ""); 
				str = str.replace(/^0+/g, "");
				if(target.value != str ) 
					target.value = str; 
			} 
			if( isNaN(Number(target.value))) 
				target.value = target.value.replace(/[\D]/,''); 
			if($(target).attr('label-per') == 1 && ""!=target.value){
				target.value = target.value+"%";
			}
		},
		/**
		 * @author acmen
		 * 叉叉的响应事件  删除响应的行， 并且删除传出数据的数据 Yes
		 */
		_delLabelItem: function(args){
			var self = this.pickup;
			var delTr = $(args.delegateTarget).parent().parent();
			var tbody = delTr.parent();
			var labelIndex = delTr.index();
			var areaIndex = Number(delTr.attr('area-index'));
			var identity = self._getCurrentPagingIdentity();
			self.periods[identity].cache.labelvalue[areaIndex].values.splice(labelIndex,1);
			if(labelIndex == 0 && self.periods[identity].cache.labelvalue[areaIndex].values.length > 0){
				self.periods[identity].cache.labelvalue[areaIndex].values[0][0].value.value = '3';
				self.periods[identity].cache.labelvalue[areaIndex].values[0][0].value.text = '或者'; 
			}
			delTr.remove();
			var len = tbody.children().length;
			for(var i = labelIndex ; i < len ; i++){
				var trn = tbody.children().eq(i);
				if(i == 0){
					var text = trn.children().eq(0).text();
					if(text == '并且' || text == '或者'){
						trn.children().eq(0).text('满足');
					}
				}
				if(i%2 == 0){
					$(trn).attr('class','tr_first');
				}
				else if(i%2 == 1){
					$(trn).attr('class','tr_second');
				}
			}
			if(len == 0){
				
				var label = tbody.parent().next();
				var label_index = label.attr('label-index');
				label.find('.ibutton').iButton('destroy');
				label.find('select.mws-select2').select2('val','');

				var sel2=label.find("select option:nth-child(1)");//选择第1个option
				sel2.attr("selected" , true);  //选中
				sel2.parent().change(); //触发

				label.find('.mws-spinner').spinner('value',0);
				label.find('[label-index = 7]').val('');
				if(label_index == '3'){
					var len = label.find('select').length;

					$(label.find('select')[len-1]).val(3);
					$(label.find('select')[len-1]).trigger("change");
				}
				if(label_index == '2'){
					var sel1=label.find("[label-index = 2] option:nth-child(1)");//选择第二个option
				sel1.attr("selected" , true);  //选中
				sel1.parent().change(); //触发
				}
				var sel=label.find("[label-index = 1] option:nth-child(2)");//选择第二个option
				sel.attr("selected" , true);  //选中
				sel.parent().change(); //触发
				
				label.find('div :eq(0)').hide();
				label.show();
				label.find('.ibutton').attr('checked', false).iButton();
			}
			
			// 删除概览信息
			self._delSummaryLabelValue(areaIndex,labelIndex);
			
		},
		/**
		 * @author acmen
		 * 添加下一个筛选条件的事件
		 * 初始化 并且  显示 
		 */
		_addNextLabelHandler: function(args){
			var label = $(args.delegateTarget).parent().parent().parent().parent().next();
			var label_index = label.attr('label-index');
			label.find('.ibutton').iButton('destroy');
			label.find('select.mws-select2').select2('val','');
			
			var sel2=label.find("select option:nth-child(1)");//选择第二个option
            sel2.attr("selected" , true);  //选中
            sel2.parent().change(); //触发
			
			label.find('.mws-spinner').spinner('value',0);
			label.find('[label-index = 7]').val('');
			if(label_index == '3'){
				//var len = label.find('select').length;
				
				//$(label.find('select')[len-1]).val(3);
				//$(label.find('select')[len-1]).trigger("change");
			}
			if(label_index == '2'){
				var sel1=label.find("[label-index = 2] option:nth-child(1)");//选择第二个option
	            sel1.attr("selected" , true);  //选中
	            sel1.parent().change(); //触发
			}
			var sel=label.find("[label-index = 1] option:nth-child(2)");//选择第二个option
            sel.attr("selected" , true);  //选中
            sel.parent().change(); //触发
			label.show();
			label.find('.ibutton').attr('checked', false).iButton();
		},
		/**
		 * @author acmen
		 */
		_hideOtherItem: function(args,product){
			var index = $(args.target).find('option:checked').val();
			if(index == -1){
				if(product == 1){
					$(args.target).parent().nextAll().css('display','none');
					$(args.target).parent().parent().nextAll().css('display','none');
				}else{
					$(args.target).parent().nextAll().hide();
				}
			}else{
				if(product == 1){
					$(args.target).parent().next().css('display','table-cell');
					$(args.target).parent().parent().nextAll().css('display','table-cell');
				}else{
					$(args.target).parent().nextAll().show();
				}
			}
		},
		/**
		 * @author acmen
		 * 第四个 商品标签 如果 为 所有属性则 运行 隐藏 如果 为其他 还要运行联动菜单 
		 */
		_hideAndlinkageMenu: function(args){
			var self = this.pickup;
			var val = $(args.target).find('option:checked').val();
			self._hideOtherItem(args,1); 
			if(val != -1){
				self._linkageMenu(args);
				var sel2=$($(args.target).parent().parent().parent().children()[2]).find("select option:nth-child(1)");//选择第1个option
				sel2.attr("selected" , true);  //选中
				sel2.parent().change(); //触发
			}
		},
		/**
		 * @author acmen
		 * 第一个标签隐藏后面的所有除了那个确定
		 */
		_hideAndShowSub: function(args){
			var self = this.pickup;
			var val = $(args.target).val();
			if(val == '7'){
				var ns = $(args.target).parent().nextAll();
				var i = 0 ;
				var len = ns.length;
				for(i=0;i<len-1;i++){
					$(ns[i]).hide();
					$(ns[i]).find('[label-type]').attr('label-visibility','hidden');
				}
				$(ns[len-1]).show();
			}else{
				$(args.target).parent().nextAll().find('[label-type]').attr('label-visibility','show');
				self._hideOtherItem(args);
			}
			
		},
		
		/**
		 * @author acmen
		 * 按商品添加 购买过未购买过 的时候后面的就会消失 
		 */
		_buyLabelItem: function(args){
			var self = this.pickup;
			var index = $(args.target).find('option:checked').val();
			$(args.target).parent().next().next().find('[label-type]').attr('label-per',0);
			if(index == 3 || index == 4 || index == 5){
//				$(args.target).parent().nextAll().find('[label-type]').attr('label-visibility','show');
				//acmen add 设置 下一个的为百分比
				$(args.target).parent().next().next().find('[label-type]').attr('label-per',1);
				$(args.target).parent().prev().find('[label-type]').attr('label-visibility','show');
				$(args.target).parent().prev().children().show();
				$(args.target).parent().nextAll().show();
			}else if(index == 6){
				$(args.target).parent().nextAll('div:not(:last)').find('[label-type]').attr('label-visibility','hidden');
				$(args.target).parent().nextAll('div:not(:last)').hide();
				var sel2 = $(args.target).parent().prev().find('[label-type]')[2];
				var sel3 = $(args.target).parent().prev().find('[label-type]')[3];
				$(sel2).attr('label-visibility','hidden');
				$(sel3).attr('label-visibility','hidden');
				var pres = $(args.target).parent().prev().children();
				$(pres[2]).hide();
				$(pres[3]).hide();
				$(pres[4]).hide();
			}else{
				$(args.target).parent().nextAll().find('[label-type]').attr('label-visibility','show');
				$(args.target).parent().nextAll().show();
				var sel2 = $(args.target).parent().prev().find('[label-type]')[2];
				var sel3 = $(args.target).parent().prev().find('[label-type]')[3];
				$(sel2).attr('label-visibility','hidden');
				$(sel3).attr('label-visibility','hidden');
				var pres = $(args.target).parent().prev().children();
				$(pres[2]).hide();
				$(pres[3]).hide();
				$(pres[4]).hide();
			}
			var sel2=$($(args.target).parent().prev().find('[label-type]')[2]).find("option:nth-child(1)");//选择第1个option
			sel2.attr("selected" , true);  //选中
			sel2.parent().change(); //触发
			//最后一个数字为0
			var size = $(args.target).parent().parent().children().size();
			$($(args.target).parent().parent().children()[size-2]).find('.mws-spinner').spinner('value',0);
		},
		/**
		 * @author acmen
		 * 绑定其他的UI控件
		 */
		_bindOtherUI: function(index,element){
			element.find('.ibutton').iButton();
			if(index == 3){
				element.find('.mws-spinner').spinner({'value':0,'min':0});
				element.find('.mws-spinner').parent().parent().hide();
				element.find('.mws-spinner').attr('label-visibility','hidden');
			}else{
				element.find('.mws-spinner').spinner({'value':0,'min':0});
			}
			element.find('select.mws-select2').select2();
		},
		/**
		 * @author acmen
		 * 事件加载控制器
		 */
		_labelEventControol: function(element,data,eventTypeNum,eventFunctionNum,eventFunction){
			var eventTypeName = '';
			var eventFunctionFin = null;
			switch (eventTypeNum) {
				case '1':
					eventTypeName = 'click';
					break;
				case '2':
					eventTypeName = 'change';
					break;
				case '3':
					eventTypeName = 'keyup';
					break;
				case '4':
					eventTypeName = 'keypress';
					break;
				default:
					break;
			}
			switch (eventFunctionNum) {
			case '-1':
				eventFunctionFin = eventFunction;
				break;
			case '1':
				eventFunctionFin = this._addLabel;
				break;
			case '2':
				eventFunctionFin = this._linkageMenu;
				break;
			case '3':
				eventFunctionFin = this._delLabelItem;
				break;
			case '4':
				eventFunctionFin = this._buyLabelItem;
				break;
			case '6':
				eventFunctionFin = this._numberTextHandler;
				break;
			case '7':
				eventFunctionFin = this._addNextLabelHandler;
				break;
			case '8':
				eventFunctionFin = this._hideOtherItem;
				break;
			case '9':
				eventFunctionFin = this._hideAndlinkageMenu;
				break;
			case '10':
				eventFunctionFin = this._hideAndShowSub;
				break;
			case '11':
				eventFunctionFin = this._shadStepHandler;
				break;
			case '12':
				eventFunctionFin = this._shadStepStart;
				break;
			default:
				break;
			}
			element.on(eventTypeName,$.proxy(eventFunctionFin,data));
			
		},
		/*
		 * acmen
		 */
		_labelHandler: function(args){
			var pickup = args.data;
			var labelIndex = $(args.target).find('option:checked').val();
			var identity = pickup._getCurrentPagingIdentity();
			var labels = pickup.periods[identity].LabelSelector.children();
			$.each(labels,function(index,item){
				if(labelIndex == index){
					pickup.periods[identity].LabelCurrentSelector.children().eq(1).replaceWith($(item).clone(true));
					pickup.periods[identity].LabelCurrentIndex = index;
					pickup._bindOtherUI(index,pickup.periods[identity].LabelCurrentSelector);
					pickup.periods[identity].LabelCurrentSelector.find('.ibutton').iButton();
					pickup.periods[identity].LabelCurrentSelector.find('.mws-spinner').spinner({'value':0,'min':0});
					pickup.periods[identity].LabelCurrentSelector.find('select.mws-select2').select2();
				}
			});
		},
		
		/**
		 * @author acmen
		 * 10-21
		 * 选择基于会员组时显示的挑选框
		 */
		_builderpopulate: function(){
			var self = this;
			self.controls.privateUl = $('<ul>',{'class':'pickList_list',style:'list-style-type:none;display: block;'});
			self.controls.shareUl = $('<ul>',{'class':'pickList_list',style:'list-style-type:none'});
			var mbrUl = $('<ul>',{'class':'pickList_list',style:'list-style-type:none'})
							.append($('<li>',{'class':'pickList_listItem_depth_2',style:'list-style-type:none'})
										.append($('<span>')
													.append($('<i>',{'class':'ui-icon ui-icon-folder-collapsed2'}))
													.append($('<label>')
																.append($('<strong>',{'text':'私有组'}))
															)
												)
										.append($("<div>",{'class':"creat_document"}))
										.append(self.controls.privateUl)
									)
							.append($('<li>',{'class':'pickList_listItem_depth_2',style:'list-style-type:none'})
										.append($('<span>')
													.append($('<i>',{'class':'ui-icon ui-icon-folder-collapsed'}))
													.append($('<label>')
																.append($('<strong>',{'text':'共享组'}))
															)
												)
										.append($("<div>",{'class':"creat_document"}))
										.append(self.controls.shareUl)
									);
			var ul = $('<ul>',{'class':'pickList_list pickList_sourceList','style':'-webkit-user-select: none;list-style-type:none'})
						.append($('<li>',{'class':'pickList_listItem',style:'list-style-type:none'})
									.append($('<span>',{'class':'big-font'})
												.append($('<i>',{'class':'icon-cogs'}))
												.append($('<label>').append($('<strong>',{text:'会员组'}))
														)
											)
									.append($('<div>',{'class':'creat_document'}))
									.append(mbrUl)
								);
			//保存一个是否基于的复选框
			self.controls.baseRuleCheckboxs = [];
			self._populateLists(self.controls.privateUl, self.defaults.baseRule[0]);
			self._populateLists(self.controls.shareUl, self.defaults.baseRule[1]);
			return ul;
		},
		_populateLists: function(target, list){
			var self = this;
			$.each(list, function(index, item){
				var li = self._createItem(item.name,item.id, 0);
				
				if(item.subfolder && item.subfolder.length) {
					self._populateLists(li.find("ul"), item.subfolder);
				}
				
				if(item.items && item.items.length) {
					self._populateItems(li.find("ul:first"), item.items);
				}
				
				target.append(li);
			});
		},
		_populateItems: function(target, list) {
			var self = this;
			$.each(list, function(index, item){
				var li = self._createItem(item.name,item.id,item.type);
				target.append(li);
			});
		},
		_createItem: function(name, value, type){
			var self = this;
			var li = null;
			if(type) {
				var css = type!=1?"ui-icon ui-icon-folder-locked":"ui-icon ui-icon-folder-unlock";
				li = $("<li>", {"data-value": value, "data-type": type});
				var span = $("<span>");
				span.append($("<i>",{"class":css}));
				span.append($("<label>").append($("<strong>",{text:name})));
				li.append(span).append(self._createLinks(1,value,name));
			}else {
				li = $("<li>", {"data-value": value});
				var span = $("<span>");
				span.append($("<i>",{"class":"ui-icon ui-icon-folder-collapsed"}));
				span.append($("<label>").append($("<strong>",{text:name})));
				li.append(span).append(self._createLinks(0,value,'')).append($("<ul>",{"class":"pickList_list"}));
			}
			
			return li;
		},
		_createLinks: function(type,val,text){
			var self = this;
			var div = $("<div>",{'class':"creat_document"});
			var checkbox = $('<input>',{type:'checkbox',value:val,'name-val':text,'style':'margin-top:10px;'});
			var len = self.controls.baseRuleCheckboxs.length;
			self.controls.baseRuleCheckboxs[len] = checkbox;
			checkbox.on('change',$.proxy(self._baseRuleHandler,{self:self}));
			if(type){
				div.append(self.controls.baseRuleCheckboxs[len]);
			}
			return div;
		},
		/**
		 * 基于已存在的规则对其进行筛选的方法
		 * @param args
		 */
		_baseRuleHandler: function(args){
			var self = this.self;
			var val = $(args.target).val();
			var name = $(args.target).attr('name-val');
			var json = {name:name,val:val};
			if($(args.target).is(":checked")){
				if(self.options.tempBaseRule.length < 2){
					self.options.tempBaseRule.push(json);
				}else{
					var elements = $('<p>',{'text':'最多允许选择两个会员组!'});
					var buttons = {
							'确定': function(){
								$(this).dialog('close');
							}
					};
					self._openDialog(elements,buttons);
					return false;
				}
				
			}else{
				self.options.tempBaseRule.pop(json);
			}
		},
		_changeBaseRuleHandler: function(args){
			var self = this.self;
			if(self.defaults.editStatus == 1){
				return;
			}
			self.options.tempBaseRule = [];
			$.each(self.controls.baseRuleCheckboxs,function(index,item){
				self.controls.baseRuleCheckboxs[index].attr('checked',false);
			});
			mbrDialog.dialog('open');
		},
		_subChangeBaseRuleHandler: function(args){
			var self = this;
			var str = '';
			var len = self.options.cache.baseRule.length;
			self.options.cache.baseRule.splice(0,len);
			$.each(self.options.tempBaseRule,function(index,item){
				self.options.cache.baseRule.push(item);
				if(index!=0){
					str += ' 和 ';
				}
				str+=item.name;
			});
			if(str.length == 0){
				str = '所有会员';
			}
			str += ' <span>▼<span>';
			self.options.creatby.html(str);
		},
		_cancelChangeBaseRuleHandler: function(args){
			var self = this;
		},
		_pickListExpand: function(){
			element = $(this).parent().next().next();
		    if(element.css("display")=="block") {
		        element.hide();
		        $(this).removeClass("ui-icon-folder-collapsed2").addClass("ui-icon-folder-collapsed");
		        //acmen change 点击最后的节点会出现文件夹 更改点 增加了if条件
		    } else if(element.length > 0){
		        element.show();
		        $(this).removeClass("ui-icon-folder-collapsed").addClass("ui-icon-folder-collapsed2");
		    }
		},
		_pickListExtendlabel: function(){
			var i = $(this).prev();
			i.click();
		},
		
		/**
		 * @author acmen
		 * 创建欢迎页面的遮罩层
		 */
		_builderShade: function(args){
			var self = this;
			var shade = $('<div>',{'class':'shadeDivStep','style':'display: block; height: 846px;'});
			var stepDiv = $('<div>',{'class':'stepDiv','style':'display: block; height: 846px;'});
			var step_1 = $('<div>',{'class':'shade_step_1'});
			var step_1_next = $('<span>',{'class':'shade_step_1_next','title':'下一步'});
			self._labelEventControol(step_1_next, {'pickup':self}, '1', '11');
			step_1.append(step_1_next);
			var step_2 = $('<div>',{'class':'shade_step_2','style':'display:none'});
			var step_2_next = $('<span>',{'class':'shade_step_2_next','title':'下一步'});
			self._labelEventControol(step_2_next, {'pickup':self}, '1', '11');
			step_2.append(step_2_next);
			var step_3 = $('<div>',{'class':'shade_step_3','style':'display:none'});
			var step_3_next = $('<span>',{'class':'shade_step_3_next','title':'下一步'});
			self._labelEventControol(step_3_next, {'pickup':self}, '1', '11');
			step_3.append(step_3_next);
			var step_4 = $('<div>',{'class':'shade_step_4','style':'display:none'});
			var step_4_next = $('<span>',{'class':'shade_step_4_next','title':'立即体验'});
			self._labelEventControol(step_4_next, {'pickup':self}, '1', '12');
			step_4.append(step_4_next);
			stepDiv.append(step_1);
			stepDiv.append(step_2);
			stepDiv.append(step_3);
			stepDiv.append(step_4);
			shade.appendTo($("body"));
			stepDiv.appendTo($("body"));
		},
		/**
		 * @author acmen
		 * 遮罩层事件
		 */
		_shadStepHandler: function(args){
			var target = $(args.target).parent();
			target.next().attr('style','display:block');
			target.next().prevAll().hide();
			target.next().nextAll().hide();
		},
		/**
		 * @author acmen
		 * 自动跳转到创建组的页面
		 */
		_shadStepStart: function(args){
			window.location.href = '/arko/group/list.do';
		}
	};
    
    // 浏览器探测类
    var BrowserDetect = {
    		init : function () {
    			this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
    			this.version = this.searchVersion(navigator.userAgent)
    				 || this.searchVersion(navigator.appVersion)
    				 || "an unknown version";
    			this.OS = this.searchString(this.dataOS) || "an unknown OS";
    		},
    		searchString : function (data) {
    			for (var i = 0; i < data.length; i++) {
    				var dataString = data[i].string;
    				var dataProp = data[i].prop;
    				this.versionSearchString = data[i].versionSearch || data[i].identity;
    				if (dataString) {
    					if (dataString.indexOf(data[i].subString) != -1)
    						return data[i].identity;
    				} else if (dataProp)
    					return data[i].identity;
    			}
    		},
    		searchVersion : function (dataString) {
    			var index = dataString.indexOf(this.versionSearchString);
    			if (index == -1)
    				return;
    			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    		},
    		dataBrowser : [{
    				string : navigator.userAgent,
    				subString : "Chrome",
    				identity : "Chrome"
    			}, {
    				string : navigator.userAgent,
    				subString : "OmniWeb",
    				versionSearch : "OmniWeb/",
    				identity : "OmniWeb"
    			}, {
    				string : navigator.vendor,
    				subString : "Apple",
    				identity : "Safari",
    				versionSearch : "Version"
    			}, {
    				prop : window.opera,
    				identity : "Opera",
    				versionSearch : "Version"
    			}, {
    				string : navigator.vendor,
    				subString : "iCab",
    				identity : "iCab"
    			}, {
    				string : navigator.vendor,
    				subString : "KDE",
    				identity : "Konqueror"
    			}, {
    				string : navigator.userAgent,
    				subString : "Firefox",
    				identity : "Firefox"
    			}, {
    				string : navigator.vendor,
    				subString : "Camino",
    				identity : "Camino"
    			}, { // for newer Netscapes (6+)
    				string : navigator.userAgent,
    				subString : "Netscape",
    				identity : "Netscape"
    			}, {
    				string : navigator.userAgent,
    				subString : "MSIE",
    				identity : "Explorer",
    				versionSearch : "MSIE"
    			}, {
    				string : navigator.userAgent,
    				subString : "Gecko",
    				identity : "Mozilla",
    				versionSearch : "rv"
    			}, { // for older Netscapes (4-)
    				string : navigator.userAgent,
    				subString : "Mozilla",
    				identity : "Netscape",
    				versionSearch : "Mozilla"
    			}
    		],
    		dataOS : [{
    				string : navigator.platform,
    				subString : "Win",
    				identity : "Windows"
    			}, {
    				string : navigator.platform,
    				subString : "Mac",
    				identity : "Mac"
    			}, {
    				string : navigator.userAgent,
    				subString : "iPhone",
    				identity : "iPhone/iPod"
    			}, {
    				string : navigator.platform,
    				subString : "Linux",
    				identity : "Linux"
    			}
    		]
    	};
    
    /*********************************************
     *           改造 javascript 对象原型
     *********************************************
     */
    
    if(!''.trim){
        String.prototype.trim = function(){
        	return this.replace(/(^\s*)|(\s*$)/g, "");
        };
    }

    if(!''.trimLeft){
	    String.prototype.trimLeft = function(){
	    	return this.replace(/(^\s*)/g,"");
	    };
    }

    if(!''.trimRight){
	    String.prototype.trimRight = function(){
	    	return this.replace(/(\s*$)/g,"");
	    };
    }
    
    if(!''.format){
        String.prototype.format = function(){
        	var result = this;
        	
        	for(var i=0;i<arguments.length;i++){
        		result = result.replace('{'+i+'}',arguments[i]);
        	}
        	
        	return result;
        };
    }
    
    if(![].indexOf){
        Array.prototype.indexOf = function(obj) 
        {                
            for(var i=0; i<this.length; i++) 
            { 
                if(this[i]==obj) 
                { 
                    return i; 
                } 
            } 
            return -1; 
        };
    }
    
    var dialog = $("<div>").appendTo($("body"));
    var mbrDialog = $('<div>').appendTo($("body"));
    
	// 注册jQuery对象
	$.fn.pickup = function(options) {
		var isMethodCall = typeof options === "string",
			args = Array.prototype.slice.call( arguments, 1 ),
			returnValue = this;

		// 防止调用内部方法
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}

		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, 'pickup' ),
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
				var instance = $.data( this, 'pickup' );
				if ( !instance ) {
					$.data( this, 'pickup', new Pickup( this, options ) );
				}
			});
		}

		return returnValue;
	};
})(jQuery, window , document);
//======================================= 获取URL参数 ===================================
request = {
	QueryString : function(item){
	   	var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
		return svalue ? svalue[1] : svalue;
    }
};