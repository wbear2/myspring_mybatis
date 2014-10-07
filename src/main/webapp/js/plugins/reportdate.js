/**
 * acmen report date
 * 
 */
;(function( $, window, document, undefined ) {
	// our plugin constructor
	function PickDate( element, options ) {
		if( arguments.length ) {
			this._init( element, options );
		}
    };
    
	var dialog = $("<div>").appendTo($("body"));
	
	// the plugin prototype
	PickDate.prototype = {
		defaults: {
			dLabel:["基准时间段","对比时间段"],
			dSlot:1,
			fastDates:[/*{text:'最近7天',value:7},*/{text:'最近30天',value:30},{text:'最近90天',value:90},{text:'最近180天',value:180},{text:'最近365天',value:365}],
			contrastDates:[{text:'环比上一期',value:1},{text:'环比后一期',value:2},{text:'同比上一年',value:3},{text:'同比后一年',value:4}],
			weekBaseControl:[{value:1,text:'快捷选择'},{value:2,text:'选择起始和结束日期'},{value:3,text:'自起始日的周数'},{value:4,text:'自截止日的周数'}],
			weekBaseD1:[{text:'年至今',value:0},{text:'最近1周',value:1},{text:'最近4周',value:4},{text:'最近13周',value:13},{text:'最近26周',value:26},{text:'最近52周',value:52},{text:'最近104周',value:104}],
			weekConstrastControl:[{text:'快捷选择',value:'1'},{text:'自起始日',value:'2'},{text:'自截止日',value:'3'}],
			weekConstrastD1:[{text:'一年前(同比)',value:'1'},{text:'上一时间段（环比）',value:'2'}],
			callback: null
		}, 
		_init: function( element, options ) {
			this.pickDateContainer = $( element );
			this.pickDateContainer.parent().attr('style','padding:0px;');
			this.pickDateContainer.empty();
			this.options = $.extend( {}, this.defaults, options, this.pickDateContainer.data() );
			if(this.options.bDate){
				this.options.bDate.start = moment(moment(this.options.bDate.start).format('YYYY/MM/DD'),'YYYY/MM/DD');
				this.options.bDate.end = moment(moment(this.options.bDate.end).format('YYYY/MM/DD'),'YYYY/MM/DD');
			}else{
				this.options.bDate = {};
				this.options.bDate.start = moment(this.options.endDate.toDate()).subtract('days',89);
				this.options.bDate.end = this.options.endDate;
			}
			if(this.options.cDate && this.options.cDate.start && this.options.cDate.end){
				this.options.cDate.start = moment(moment(this.options.cDate.start).format('YYYY/MM/DD'),'YYYY/MM/DD');
				this.options.cDate.end = moment(moment(this.options.cDate.end).format('YYYY/MM/DD'),'YYYY/MM/DD');
			}else{
				this.options.cDate = {};
				this.options.cDate.start = moment(this.options.bDate.start.toDate()).subtract('days',1);
				this.options.cDate.end = moment(this.options.cDate.start.toDate()).subtract('days',moment(this.options.bDate.end,'YYYY/MM/DD').diff(moment(this.options.bDate.start,'YYYY/MM/DD'),'day'));
			}
			this._build(this.options.dateType,this.options.dateLevel);
		}, 
		_build: function (dateType,dateLevel) {
			var self = this;
			self.control = {};
			
			if(dateType == 1){
				//基础时间段
				self.control.baseTitle = self._buildTitle(0);
				self.pickDateContainer.append(self.control.baseTitle);
				self._buildWeekBase();
				if(dateLevel == 1){
					//对比时间段
					self.control.compareTitle = self._buildTitle(1);
					self.pickDateContainer.append(self.control.compareTitle);
					self._buildWeekContrast();
				}
				self._initWeekYear();
				self._populateDate();
				self._editWeekPeriod();
				self._calcPeriod1();
				self._calcPeriod2();
			}
			if(dateType == 2){
				//基础时间段
				self.control.baseTitle = self._buildTitle(0);
				var bDateDiv = self._buildBDateDiv();
				self.pickDateContainer.append(self.control.baseTitle);
				self.pickDateContainer.append(bDateDiv);

				if(dateLevel == 1){
					//对比时间段
					self.control.compareTitle = self._buildTitle(1);
					var cDateDiv = self._buildCDateDiv();
					self.pickDateContainer.append(self.control.compareTitle);
					self.pickDateContainer.append(cDateDiv);
				}
				//绑定其他的插件事件
				self._bindOtherUI(dateLevel);
			}
		}, 
		_buildTitle: function(index){
			var self = this;
			var str = self.options.dLabel[index] + '：';
			var title = $('<legend>').append($('<div>').append($('<strong>',{'text':str})).append($('<label>')));
			return title;
		},
		//创建基本的时间段
		_buildBDateDiv: function(){
			var self = this;
			var dateDiv = $('<div>',{'class':'date-div'});
			dateDiv.append(self._buildBDateCDiv(self.options.fastDates));
			dateDiv.append(self._buildBDateSDiv());
			return dateDiv;
		},
		_buildBDateCDiv: function(fastJson){
			var self = this;
			var dateCDivContainer = $('<div>',{'class':'fast_choose'});
			dateCDivContainer.append(self._buildBDialogDiv());
			dateCDivContainer.append(self._buildBFastDiv(fastJson));
			dateCDivContainer.append($('<div>',{'class':'clear'}));
			return dateCDivContainer;
		},
		_buildBDialogDiv: function(){
			var self = this;
			var dateContain = $('<div>',{'class':'date-container'});
			self.control.bStartDate = $('<input>',{type:'text','size':10,style:'width:150px;'});
			self.control.bEndDate = $('<input>',{type:'text','size':10,style:'width:150px;'});
			dateContain.append(self.control.bStartDate);
			dateContain.append($('<label>',{style:'text-align: center','text':'      -      '}));
			dateContain.append(self.control.bEndDate);
			return dateContain;
		},
		_buildBFastDiv: function(fastJson){
			var self = this;
			var fastContain = $('<div>',{'class':'fast-container'});
			self.control.bFastContainer = [];
			$.each(fastJson,function(indexJ,item){
				self.control.bFastContainer.push($('<div>',{'class':'choose_left','fdata':item.value,'text':item.text}));
			});
			$.each(self.control.bFastContainer,function(index,item){
				fastContain.append(item);
				item.on('click', $.proxy(self._bFastDateHandler,self));
			});
			return fastContain;
		},
		_buildBDateSDiv: function(){
			var self = this;
			var dateSDivContainer = $('<div>',{'class':'date-silderCon'});
			dateSDivContainer.append(self._buildBSilder());
			return dateSDivContainer;
		},
		_buildBSilder: function(){
			var self = this;
			self.control.bDateRangeSilder = $('<div>',{'class':'date-silder'});
			self.control.bDateRangeSilder.on('valuesChanging', $.proxy(this._bSliderChangeHandler,this));
			self.control.bDateRangeSilder.on('valuesChanged', $.proxy(this._bSliderChangeHandler,this));
			return self.control.bDateRangeSilder;
		},
		//创建对比时间段
		_buildCDateDiv: function(){
			var self = this;
			var dateDiv = $('<div>',{'class':'date-div'});
			dateDiv.append(self._buildCDateCDiv(self.options.contrastDates));
			dateDiv.append(self._buildCDateSDiv());
			return dateDiv;
		},
		_buildCDateCDiv: function(fastJson){
			var self = this;
			var dateCDivContainer = $('<div>',{'class':'fast_choose'});
			dateCDivContainer.append(self._buildCDialogDiv());
			dateCDivContainer.append(self._buildCFastDiv(fastJson));
			dateCDivContainer.append($('<div>',{'class':'clear'}));
			return dateCDivContainer;
		},
		_buildCDialogDiv: function(){
			var self = this;
			var dateContain = $('<div>',{'class':'date-container'});
			self.control.cStartDate = $('<input>',{type:'text','size':10,style:'width:150px;'});
			self.control.cEndDate = $('<input>',{type:'text','size':10,style:'width:150px;'});
			dateContain.append(self.control.cStartDate);
			dateContain.append($('<label>',{style:'text-align: center','text':'      -      '}));
			dateContain.append(self.control.cEndDate);
			return dateContain;
		},
		_buildCFastDiv: function(fastJson){
			var self = this;
			var fastContain = $('<div>',{'class':'fast-container'});
			self.control.cFastContainer = [];
			$.each(fastJson,function(indexJ,item){
				self.control.cFastContainer.push($('<div>',{'class':'choose_left','fdata':item.value,'text':item.text}));
			});
			$.each(self.control.cFastContainer,function(index,item){
				fastContain.append(item);
				item.on('click', $.proxy(self._cFastDateHandler,self));
			});
			return fastContain;
		},
		_buildCDateSDiv: function(){
			var self = this;
			var dateSDivContainer = $('<div>',{'class':'date-silderCon'});
			dateSDivContainer.append(self._buildCSilder());
			return dateSDivContainer;
		},
		_buildCSilder: function(){
			var self = this;
			self.control.cDateRangeSilder = $('<div>',{'class':'date-silder'});
			self.control.cDateRangeSilder.on('valuesChanging', $.proxy(this._cSliderChangeHandler,this));
			self.control.cDateRangeSilder.on('valuesChanged', $.proxy(this._cSliderChangeHandler,this));
			return self.control.cDateRangeSilder;
		},
		_bindOtherUI: function(dateLevel){
			var self = this;
			var beginDate = self.options.bDate.start;
			var endDate = self.options.bDate.end;
			var cBeginDate = self.options.cDate.start;
			var cEndDate = self.options.cDate.end;
			self._bindbFast();
			self._bindbDateRange();
			self._updateBCacheData(beginDate, endDate);
			self._bTitleChange(beginDate, endDate);
			if(dateLevel == 1){
				self._bindcFast();
				self._bindcDateRange();
				self._updateCCacheData(cBeginDate, cEndDate);
				self._cTitleChange(cBeginDate, cEndDate);
			}
		},
		_bindbFast: function(){
			var self = this;
			self.control.bStartDate && self.control.bStartDate.datepicker({
					dateFormat: 'yy-mm-dd',
					minDate: self.options.startDate.toDate(),
					maxDate: self.options.endDate.toDate(),
					onClose: function( selectedDate ) {
						self.control.bEndDate.datepicker( "option", "minDate", selectedDate );
					}
			    });
			self.control.bStartDate && self.control.bStartDate.datepicker('setDate',self.options.bDate.start.toDate());
			self.control.bEndDate && self.control.bEndDate.datepicker({
					dateFormat: 'yy-mm-dd',
					minDate: self.control.bStartDate.datepicker( "getDate" ),
					maxDate: self.options.endDate.toDate(),
					onClose: function( selectedDate ) {
						self.control.bStartDate.datepicker( "option", "maxDate", selectedDate );
					}
			    });
			self.control.bEndDate && self.control.bEndDate.datepicker('setDate',self.options.bDate.end.toDate());
			self.control.bStartDate.on('change',$.proxy(this._bDateDialogHandler,this));
			self.control.bEndDate.on('change',$.proxy(this._bDateDialogHandler,this));
		},
		_bindcFast: function(){
			var self = this;
			self.control.cStartDate && self.control.cStartDate.datepicker({
					dateFormat: 'yy-mm-dd',
					minDate: self.options.startDate.toDate(),
					maxDate: self.options.endDate.toDate(),
					onClose: function( selectedDate ) {
						self.control.cEndDate.datepicker( "option", "minDate", selectedDate );
					}
			    });
			self.control.cStartDate && self.control.cStartDate.datepicker('setDate', self.options.cDate.start.toDate());
			self.control.cEndDate && self.control.cEndDate.datepicker({
					dateFormat: 'yy-mm-dd',
					minDate: self.control.cStartDate.datepicker( "getDate" ),
					maxDate: self.options.endDate.toDate(),
					onClose: function( selectedDate ) {
						self.control.cStartDate.datepicker( "option", "maxDate", selectedDate );
					}
			    });
			self.control.cEndDate && self.control.cEndDate.datepicker('setDate',self.options.cDate.end.toDate());
			self.control.cStartDate.on('change',$.proxy(this._cDateDialogHandler,this));
			self.control.cEndDate.on('change',$.proxy(this._cDateDialogHandler,this));
		},
		_bindbDateRange: function(){
			var self = this;
			self.control.bDateRangeSilder.dateRangeSlider({
	              bounds:{
	                  min: self.options.startDate.toDate(),
	                  max: self.options.endDate.toDate()
	              },
	              defaultValues:{
	                  min: self.options.bDate.start.toDate(),
	                  max: self.options.bDate.end.toDate()
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
		},
		_bindcDateRange: function(){
			var self = this;
			self.control.cDateRangeSilder.dateRangeSlider({
	              bounds:{
	                  min: self.options.startDate.toDate(),
	                  max: self.options.endDate.toDate()
	              },
	              defaultValues:{
	            	  min: self.options.cDate.start.toDate(),
	                  max: self.options.cDate.end.toDate()
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
		},
		/**
		 * slider 变动则更新数据
		 */
		_bSliderChangeHandler: function(){
			var self = this;
			var beginDate = moment(self.control.bDateRangeSilder.dateRangeSlider("values").min);
			var endDate = moment(self.control.bDateRangeSilder.dateRangeSlider("values").max);
			self._updateBCacheData(beginDate, endDate);
			self.control.bStartDate.datepicker( "setDate", beginDate.format('YYYY-MM-DD').toString());
			self.control.bEndDate.datepicker( "setDate", endDate.format('YYYY-MM-DD').toString());
			//设置时间段区间
			self.control.bStartDate.datepicker( "option", "maxDate", endDate.toDate() );
			self.control.bEndDate.datepicker( "option", "minDate", beginDate.toDate() );
			
			self._bTitleChange(beginDate,endDate);
			
			self._bClearFastClass(beginDate,endDate);
		},
		_cSliderChangeHandler: function(){
			var self = this;
			var beginDate = moment(self.control.cDateRangeSilder.dateRangeSlider("values").min);
			var endDate = moment(self.control.cDateRangeSilder.dateRangeSlider("values").max);
			self._updateCCacheData(beginDate, endDate);
			self.control.cStartDate.datepicker( "setDate", beginDate.format('YYYY-MM-DD').toString());
			self.control.cEndDate.datepicker( "setDate", endDate.format('YYYY-MM-DD').toString());
			//设置时间段区间
			self.control.cStartDate.datepicker( "option", "maxDate", endDate.toDate() );
			self.control.cEndDate.datepicker( "option", "minDate", beginDate.toDate() );
			
			self._cTitleChange(beginDate,endDate);
			
			self._cClearFastClass(beginDate,endDate);
		},
		_bTitleChange: function(startDate,endDate){
			var self = this;
			startDate = moment(startDate.format('YYYY/MM/DD'));
			endDate = moment(endDate.format('YYYY/MM/DD'));
			var str = "从 "+startDate.format('YYYY年MM月DD日').toString()+" 到 "+endDate.format('YYYY年MM月DD日').toString()+" ,共 "+(endDate.diff(startDate,'days')+1)+" 天";
			self.control.baseTitle.find('label').text(str);
			self._preview();
			
			//更新上方的快捷方式的样式
			$(self.control.bFastContainer[0]).removeClass('active_c');
			$(self.control.bFastContainer[1]).removeClass('active_c');
			$(self.control.bFastContainer[2]).removeClass('active_c');
			$(self.control.bFastContainer[3]).removeClass('active_c');
			var days = endDate.diff(startDate,'days');
			switch (days) {
				case 29:
					$(self.control.bFastContainer[0]).addClass('active_c');
					break;
				case 89:
					$(self.control.bFastContainer[1]).addClass('active_c');		
					break;
				case 179:
					$(self.control.bFastContainer[2]).addClass('active_c');
					break;
				case 364:
					$(self.control.bFastContainer[3]).addClass('active_c');
					break;
				default:
					break;
			}
			//清除下方的标签选择 
			if(this.options.dateLevel == 1){
				$(self.control.cFastContainer[0]).removeClass('disable_c');
				$(self.control.cFastContainer[1]).removeClass('disable_c');
				$(self.control.cFastContainer[2]).removeClass('disable_c');
				$(self.control.cFastContainer[3]).removeClass('disable_c');
				$(self.control.cFastContainer[0]).removeClass('active_c');
				$(self.control.cFastContainer[1]).removeClass('active_c');
				$(self.control.cFastContainer[2]).removeClass('active_c');
				$(self.control.cFastContainer[3]).removeClass('active_c');
				if(endDate.diff(startDate,'days') > moment(startDate.toDate()).subtract('days',1).diff(self.options.startDate,'days')){
					$(self.control.cFastContainer[0]).removeClass('active_c');
					$(self.control.cFastContainer[0]).addClass('disable_c');
				}
				if(endDate.diff(startDate,'days') > self.options.endDate.diff(moment(endDate.toDate()).add('days',1),'days')){
					$(self.control.cFastContainer[1]).removeClass('active_c');
					$(self.control.cFastContainer[1]).addClass('disable_c');
				}
				if(self.options.startDate.diff(moment(startDate.toDate()).subtract('years',1)) > 0){
					$(self.control.cFastContainer[2]).removeClass('active_c');
					$(self.control.cFastContainer[2]).addClass('disable_c');
				}
				if(self.options.endDate.diff(moment(endDate.toDate()).add('years',1)) < 0){
					$(self.control.cFastContainer[3]).removeClass('active_c');
					$(self.control.cFastContainer[3]).addClass('disable_c');
				}
			}
			
		},
		_cTitleChange: function(startDate,endDate){
			var self = this;
			startDate = moment(startDate.format('YYYY/MM/DD'));
			endDate = moment(endDate.format('YYYY/MM/DD'));
			var str = "从 "+startDate.format('YYYY年MM月DD日').toString()+" 到 "+endDate.format('YYYY年MM月DD日').toString()+" ,共 "+(endDate.diff(startDate,'days')+1)+" 天";
			self.control.compareTitle.find('label').text(str);
			self._preview();
		},
		/**
		 * dateDialog 变动更新数据
		 */
		_bDateDialogHandler: function(){
			var self = this;
			var beginDate = moment(self.control.bStartDate.datepicker("getDate"));
			var endDate = moment(self.control.bEndDate.datepicker("getDate"));
			self._updateBCacheData(beginDate, endDate);
			self.control.bDateRangeSilder.dateRangeSlider("values", beginDate, endDate);
			self._bTitleChange(beginDate,endDate);
			
			self._bClearFastClass(beginDate,endDate);
		},
		_cDateDialogHandler: function(){
			var self = this;
			var beginDate = moment(self.control.cStartDate.datepicker("getDate"));
			var endDate = moment(self.control.cEndDate.datepicker("getDate"));
			self._updateCCacheData(beginDate, endDate);
			self.control.cDateRangeSilder.dateRangeSlider("values", beginDate, endDate);
			self._cTitleChange(beginDate,endDate);
			
			self._cClearFastClass(beginDate,endDate);
		},
		_bFastDateHandler: function(args){
			var self = this;
			var element = $(args.target);
			var beginDate = moment(moment().format('YYYY/MM/DD'),'YYYY/MM/DD');
			var endDate = moment(moment().format('YYYY/MM/DD'),'YYYY/MM/DD');
			self._bFastDateCompute(element.attr('fdata'),beginDate,endDate);
			
			self._updateBCacheData(beginDate, endDate);
			self.control.bStartDate.datepicker( "setDate", beginDate.format('YYYY-MM-DD').toString());
			self.control.bEndDate.datepicker( "setDate", endDate.format('YYYY-MM-DD').toString());
			//设置时间段区间
			self.control.bStartDate.datepicker( "option", "maxDate", endDate.toDate() );
			self.control.bEndDate.datepicker( "option", "minDate", beginDate.toDate() );
			
			self.control.bDateRangeSilder.dateRangeSlider("values", beginDate, endDate);
			self._bTitleChange(beginDate,endDate);
			self._bClearFastClass(beginDate,endDate);
//			element.addClass('active_c');
		},
		_cFastDateHandler: function(args){
			var self = this;
			var element = $(args.target);
			if(element.hasClass('disable_c')){
				return;
			}
			var beginDate = moment(moment(self.options.cache[0].start).format('YYYY/MM/DD'),'YYYY/MM/DD');
			var endDate = moment(moment(self.options.cache[0].end).format('YYYY/MM/DD'),'YYYY/MM/DD');
			self._cFastDateCompute(element.attr('fdata'),beginDate,endDate);
			
			self._updateCCacheData(beginDate, endDate);
			self.control.cStartDate.datepicker( "setDate", beginDate.format('YYYY-MM-DD').toString());
			self.control.cEndDate.datepicker( "setDate", endDate.format('YYYY-MM-DD').toString());
			//设置时间段区间
			self.control.cStartDate.datepicker( "option", "maxDate", endDate.toDate() );
			self.control.cEndDate.datepicker( "option", "minDate", beginDate.toDate() );
			
			self.control.cDateRangeSilder.dateRangeSlider("values", beginDate, endDate);
			self._cTitleChange(beginDate,endDate);
			self._cClearFastClass(beginDate,endDate);
//			element.addClass('active_c');
		},
		//TODO
		_bClearFastClass: function(startDate,endDate){
			var self = this;
			var vals = self.options.fastDates;
			$.each(self.control.bFastContainer,function(index,item){
				item.removeClass('active_c');
				if(moment(startDate.toDate()).add('d',vals[index].value-1).format('MM/DD/YYYY') == self.options.endDate.format('MM/DD/YYYY')
						&& endDate.format('MM/DD/YYYY') == self.options.endDate.format('MM/DD/YYYY')){
					item.addClass('active_c');
				}
			});
			self._cInvalidityFastClass(startDate,endDate);
		},
		//TODO
		_cClearFastClass: function(startDate,endDate){
			var self = this;
			var vals = self.options.contrastDates;
			var bStartDate = moment(self.options.cache[0].start.format('YYYY/MM/DD'),'YYYY/MM/DD');
			var bEndDate = moment(self.options.cache[0].end.format('YYYY/MM/DD'),'YYYY/MM/DD');
			startDate = moment(startDate.format('YYYY/MM/DD'),'YYYY/MM/DD');
			endDate = moment(endDate.format('YYYY/MM/DD'),'YYYY/MM/DD');
			$.each(self.control.cFastContainer,function(index,item){
				item.removeClass('active_c');
				switch (vals[index].value) {
					case 1:
						if(moment(bStartDate.toDate()).subtract('d',1).format('MM/DD/YYYY') == endDate.format('MM/DD/YYYY') && bEndDate.diff(bStartDate,'days') == endDate.diff(startDate,'days')){
							item.addClass('active_c');
						}
						break;
					case 2:
						if(moment(bEndDate.toDate()).add('d',1).format('MM/DD/YYYY') == startDate.format('MM/DD/YYYY') && bEndDate.diff(bStartDate,'days') == endDate.diff(startDate,'days')){
							item.addClass('active_c');
						}
						break;
					case 3:
						if(moment(bStartDate.toDate()).subtract('y',1).format('MM/DD/YYYY') == startDate.format('MM/DD/YYYY') && bEndDate.diff(bStartDate,'days') == endDate.diff(startDate,'days')){
							item.addClass('active_c');
						}
						break;
					case 4:
						if(moment(bStartDate.toDate()).add('y',1).format('MM/DD/YYYY') == startDate.format('MM/DD/YYYY') && bEndDate.diff(bStartDate,'days') == endDate.diff(startDate,'days')){
							item.addClass('active_c');
						}
						break;
					default:
						break;
				}
			});
		},
		_cInvalidityFastClass: function(startDate,endDate){
			var self = this;
			var minDate = moment(self.options.startDate.format('MM/DD/YYYY'));
			var maxDate = moment(self.options.endDate.format('MM/DD/YYYY'));
			
		},
		_bFastDateCompute: function(data,start,end){
			var self = this;
			var days = new Number(data);
			var startDate = moment(self.options.startDate.format('MM/DD/YYYY'));
			var endDate = moment(self.options.endDate.format('MM/DD/YYYY'));
			var rStartDate = moment(endDate.format('MM/DD/YYYY')).subtract('days',-1+days);
			end.set('year',endDate.get('year'));
			end.set('month',endDate.get('month'));
			end.set('date',endDate.get('date'));
			start.set('year',rStartDate.get('year'));
			start.set('month',rStartDate.get('month'));
			start.set('date',rStartDate.get('date'));
			if(start.toDate() < startDate.toDate()){
				start.set('year',startDate.get('year'));
				start.set('month',startDate.get('month'));
				start.set('date',startDate.get('date'));
			}
		}, 
		_cFastDateCompute: function(data,start,end){
			var self = this;
			var type = new Number(data);
			var startDate = moment(self.options.startDate.format('MM/DD/YYYY'));
			var endDate = moment(self.options.endDate.format('MM/DD/YYYY'));
			var rStartDate = moment(start.toDate());
			var rEndDate = moment(end.toDate());
			switch (0+type) {
				case 1:
					rStartDate = moment(start.toDate()).subtract('days',1+end.diff(start,'days'));
					rEndDate = moment(start.toDate()).add('d',-1);
					break;
				case 2:
					rStartDate = moment(end.toDate()).add('d',1);
					rEndDate = moment(end.toDate()).add('d',end.diff(start,'days')+1);
					break;
				case 3:
					rStartDate = moment(start.toDate()).subtract('y',1);
					rEndDate = moment(rStartDate.toDate()).add('d',end.diff(start,'days'));
					break;
				case 4:
					rStartDate = moment(start.toDate()).add('y',1);
					rEndDate = moment(rStartDate.toDate()).add('d',end.diff(start,'days'));
					break;
	
				default:
					break;
			}
			if(rEndDate.toDate() <= endDate.toDate()){
				end.set('year',rEndDate.get('year'));
				end.set('month',rEndDate.get('month'));
				end.set('date',rEndDate.get('date'));
			}
			start.set('year',rStartDate.get('year'));
			start.set('month',rStartDate.get('month'));
			start.set('date',rStartDate.get('date'));
			if(start.toDate() < startDate.toDate()){
				start.set('year',startDate.get('year'));
				start.set('month',startDate.get('month'));
				start.set('date',startDate.get('date'));
			}
		}, 
		/*
		 * 修改时加载WEEK的时间period
		 */
		_editWeekPeriod: function(){
			var self = this;
			var period = self.options.oldPeriod;
			if(!period)
				return;
			$("#daterange-one-selector").val(period.timeType);
			
	        switch(period[0].timeType.toString()){
	            case "1":
	                $("div[group=daterange-one]").hide();
	                $("div[group=daterange-one][data-value=1]").show();
	                $("div[group=daterange-one][data-value=1] select option").eq(period[0].timeIndex).attr('selected','selected');
	                break;
	            case "2":
	                $("div[group=daterange-one]").hide();
	                $("div[group=daterange-one][data-value=2]").show();
	                $("div[group=daterange-one][data-value=3]").show();
	                
	                var date1 = moment(period[0].timeStart);
	                var date2 = moment(period[0].timeEnd);
	                
	                var element = $("div[group=daterange-one][data-value=2] [rel-type=start][data-type=year]");
	                element.val(date1.year());
	                self._populateDate(element.next(),true);
	                element.next().val(date1.format("YYYY-MM-DD"));
	                
	                var element = $("div[group=daterange-one][data-value=3] [rel-type=end][data-type=year]");
	                element.val(date2.year());
	                self._populateDate(element.next(),true);
	                element.next().val(date2.format("YYYY-MM-DD"));
	                
	                break;
	            case "3":
	                $("div[group=daterange-one]").hide();
	                $("div[group=daterange-one][data-value=2]").show();
	                $("div[group=daterange-one][data-value=4]").show();
	                
	                var date1 = moment(period[0].timeStart);
	                var date2 = moment(period[0].timeEnd);
	                var week = date2.diff(date1, 'week')+1;
	                
	                $("div[group=daterange-one][data-value=4] input").val(week);
	                var element = $("div[group=daterange-one][data-value=2] [rel-type=start][data-type=year]");
	                element.val(date1.year());
	                self._populateDate(element.next(),true);
	                element.next().val(date1.format("YYYY-MM-DD"));
	                break;
	            case "4":
	                $("div[group=daterange-one]").hide();
	                $("div[group=daterange-one][data-value=3]").show();
	                $("div[group=daterange-one][data-value=4]").show();
	                
	                var date1 = moment(period[0].timeStart);
	                var date2 = moment(period[0].timeEnd);
	                var week = date2.diff(date1, 'week')+1;

	                $("div[group=daterange-one][data-value=4] input").val(week);
	                var element = $("div[group=daterange-one][data-value=3] [rel-type=end][data-type=year]");
	                element.val(date2.year());
	                self._populateDate(element.next(),true);
	                element.next().val(date2.format("YYYY-MM-DD"));
	                break;
	        }
	        
			if(period.length > 1){
				$("#daterange-two-selector").val(period[1].timeType);
				$("[group=daterange-two][data-value="+period[1].timeType+"]").show();
				
		        switch(period[1].timeType.toString()){
		            case "1":
		                $("div[group=daterange-two]").hide();
		                $("div[group=daterange-two][data-value=1]").show();
		                //acmen change 8-15
		                $("div[group=daterange-two][data-value=1] select option").eq(period[1].timeIndex).attr('selected','selected');
		                /*$("div[group=daterange-two][data-value=1] select").val(period.compareTimeIndex);*/
		                break;
		            case "2":
		                $("div[group=daterange-two]").hide();
		                $("div[group=daterange-two][data-value=2]").show();
		                
		                var date = moment(period[1].timeStart);
		                var element = $("div[group=daterange-two][data-value=2] [rel-type=start][data-type=year]");
		                element.val(date.year());
		                self._populateDate(element.next(),true);
		                element.next().val(date.format("YYYY-MM-DD"));
		                
		                break;
		            case "3":
		                $("div[group=daterange-two]").hide();
		                $("div[group=daterange-two][data-value=3]").show();
		                
		                var date = moment(period[1].timeEnd);
		                var element = $("div[group=daterange-two][data-value=3] [rel-type=end][data-type=year]");
		                element.val(date.year());
		                self._populateDate(element.next(),true);
		                element.next().val(date.format("YYYY-MM-DD"));
		                break;
		        }
			}
		},
		/**
		 * TODO
		 * 按照周进行
		 */
		_buildWeekBase: function(){
			var self = this;
			self.control.weekContext = {};
			self.control.weekContext.baseDiv = $('<div>',{'class':'mws-form-row bordered'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择方式：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.baseDiv.append(labelC);
			self.control.weekContext.baseControl = $('<select>',{'class':'small',id:'daterange-one-selector'});
			$.each(self.options.weekBaseControl,function(index,item){
				self.control.weekContext.baseControl.append($('<option>',{value:item.value,text:item.text}));
			});
			self.control.weekContext.baseDiv.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.baseControl));
			self.pickDateContainer.append(self.control.weekContext.baseDiv);
			
			//创建下面的几个DIV
			self._buildWeekBDiv1();
			self._buildWeekBDiv2();
			self._buildWeekBDiv3();
			self._buildWeekBDiv4();
			
			$("div[group=daterange-one]").hide();
			self.control.weekContext.baseD1.show();
			self.control.weekContext.baseControl.on("change", function(){
		        var val = $(this).val();
		        switch(val){
		            case "1":
		                $("div[group=daterange-one]").hide();
		                self.control.weekContext.baseD1.show();
		                break;
		            case "2":
		                $("div[group=daterange-one]").hide();
		                self.control.weekContext.baseD2.show();
		                self.control.weekContext.baseD3.show();
		                break;
		            case "3":
		                $("div[group=daterange-one]").hide();
		                self.control.weekContext.baseD2.show();
		                self.control.weekContext.baseD4.show();
		                break;
		            case "4":
		                $("div[group=daterange-one]").hide();
		                self.control.weekContext.baseD3.show();
		                self.control.weekContext.baseD4.show();
		                break;
		        }
		        self._calcPeriod1();
		        self._calcPeriod2();
		    });
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-one" data-value="1">
				<label class="mws-form-label">
					快捷选择：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select  class="required">
						<option value="0">年至今</option>
						<option value="1">最近1周</option>
						<option value="4">最近4周</option>
						<option value="13">最近13周</option>
						<option value="26">最近26周</option>
						<option value="52">最近52周</option>
					</select>
				</div>
			</div>
		 */
		_buildWeekBDiv1: function(){
			var self = this;
			self.control.weekContext.baseD1 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-one','data-value':'1'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'快捷选择：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.baseD1.append(labelC);
			self.control.weekContext.baseD1Control = $('<select>',{'class':'required'});
			var len = self.options.weekBaseD1.length;
			$.each(self.options.weekBaseD1,function(index,item){
				if(index != len - 1 || self.options.longDateFlag ){
					self.control.weekContext.baseD1Control.append($('<option>',{value:item.value,text:item.text}));
				}
			});
			self.control.weekContext.baseD1.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.baseD1Control));
			
			self.pickDateContainer.append(self.control.weekContext.baseD1);
			
			self.control.weekContext.baseD1Control.on('change',function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-one" data-value="2">
				<label class="mws-form-label">
					选择起始日期：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select class="required" data-type="year" rel-type="start"></select>
					<select class="required" data-type="day" rel-type="start"></select>
				</div>
			</div>
		 */
		_buildWeekBDiv2: function(){
			var self = this;
			self.control.weekContext.baseD2 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-one','data-value':'2'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择起始日期：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.baseD2.append(labelC);
			self.control.weekContext.baseD2YearControl = $('<select>',{'class':'required','data-type':'year','rel-type':'start'});
			self.control.weekContext.baseD2DayControl = $('<select>',{'class':'required','data-type':'day','rel-type':'start',style:'margin-left:10px'});
			self.control.weekContext.baseD2.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.baseD2YearControl).append(self.control.weekContext.baseD2DayControl));
			
			self.pickDateContainer.append(self.control.weekContext.baseD2);
			
			self.control.weekContext.baseD2YearControl.on('change', function(){
				self._populateDate($(this).next(),true);
				self._calcPeriod1();
				self._calcPeriod2();
			});
			self.control.weekContext.baseD2DayControl.on('change', function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-one" data-value="3">
				<label class="mws-form-label">
					选择截止日期：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select  class="required" data-type="year" rel-type="end"></select>
					<select  class="required" data-type="day" rel-type="end"></select>
				</div>
			</div>
		 */
		_buildWeekBDiv3: function(){
			var self = this;
			self.control.weekContext.baseD3 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-one','data-value':'3'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择截止日期：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.baseD3.append(labelC);
			self.control.weekContext.baseD3YearControl = $('<select>',{'class':'required','data-type':'year','rel-type':'end'});
			self.control.weekContext.baseD3DayControl = $('<select>',{'class':'required','data-type':'day','rel-type':'end',style:'margin-left:10px'});
			self.control.weekContext.baseD3.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.baseD3YearControl).append(self.control.weekContext.baseD3DayControl));
			
			self.pickDateContainer.append(self.control.weekContext.baseD3);
			
			self.control.weekContext.baseD3YearControl.on('change', function(){
				self._populateDate($(this).next(),true);
				self._calcPeriod1();
				self._calcPeriod2();
			});
			self.control.weekContext.baseD3DayControl.on('change', function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-one" data-value="4">
				<label class="mws-form-label">
					时间间隔(周)：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<input type="text" name="weeks" class="required" value="1"></div>
			</div>
		 */
		_buildWeekBDiv4: function(){
			var self = this;
			self.control.weekContext.baseD4 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-one','data-value':'4'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'时间间隔(周)：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.baseD4.append(labelC);
			self.control.weekContext.baseD4Control = $('<input>',{'name':'weeks','type':'text','class':'required','value':'1'});
			self.control.weekContext.baseD4.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.baseD4Control));
		
			self.pickDateContainer.append(self.control.weekContext.baseD4);
			
			self.control.weekContext.baseD4Control.on('change', function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * 创建week对比时间DIV
		 * <div class="mws-form-row bordered">
				<label class="mws-form-label">
					选择方式：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select class="small" id="daterange-two-selector">
						<option value="1">快捷选择</option>
						<option value="2">自起始日</option>
						<option value="3">自截止日</option>
					</select>
				</div>
			</div>
		 */
		_buildWeekContrast: function(){
			var self = this;
			self.control.weekContext.contrastDiv = $('<div>',{'class':'mws-form-row bordered'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择方式：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.contrastDiv.append(labelC);
			self.control.weekContext.contrastControl = $('<select>',{'class':'small','id':'daterange-two-selector'});
			$.each(self.options.weekConstrastControl,function(index,item){
				self.control.weekContext.contrastControl.append($('<option>',{value:item.value,text:item.text}));
			});
			self.control.weekContext.contrastDiv.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.contrastControl));
			
			self.pickDateContainer.append(self.control.weekContext.contrastDiv);
			
			self._buildWeekCDiv1();
			self._buildWeekCDiv2();
			self._buildWeekCDiv3();
			
			$("div[group=daterange-two]").hide();
			self.control.weekContext.contrastD1.show();
		    
		    $("#daterange-two-selector").on("change", function(){
		        var val = $(this).val();
		        switch(val){
		            case "1":
		                $("div[group=daterange-two]").hide();
		                self.control.weekContext.contrastD1.show();
		                break;
		            case "2":
		                $("div[group=daterange-two]").hide();
		                self.control.weekContext.contrastD2.show();
		                break;
		            case "3":
		                $("div[group=daterange-two]").hide();
		                self.control.weekContext.contrastD3.show();
		                break;
		        }
		        self._calcPeriod2();
		    });
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-two" data-value="1">
				<label class="mws-form-label">
					快捷选择：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select  class="required">
						<option value="1">一年前(同比)</option>
						<option value="2">上一时间段（环比）</option>
					</select>
				</div>
			</div>
		 */
		_buildWeekCDiv1: function(){
			var self = this;
			self.control.weekContext.contrastD1 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-two','data-value':'1'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'快捷选择：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.contrastD1.append(labelC);
			self.control.weekContext.contrastD1Control = $('<select>',{'class':'required'});
			$.each(self.options.weekConstrastD1,function(index,item){
				self.control.weekContext.contrastD1Control.append($('<option>',{value:item.value,text:item.text}));
			});
			self.control.weekContext.contrastD1.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.contrastD1Control));
			
			self.pickDateContainer.append(self.control.weekContext.contrastD1);
			
			self.control.weekContext.contrastD1Control.on('change',function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-two" data-value="2">
				<label class="mws-form-label">
					选择起始日期：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select  class="required" data-type="year" rel-type="start"></select>
					<select  class="required" data-type="day" rel-type="start"></select>
				</div>
			</div>
		 */
		_buildWeekCDiv2: function(){
			var self = this;
			self.control.weekContext.contrastD2 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-two','data-value':'2'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择起始日期：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.contrastD2.append(labelC);
			self.control.weekContext.contrastD2YearControl = $('<select>',{'class':'required','data-type':'year','rel-type':'start'});
			self.control.weekContext.contrastD2DayControl = $('<select>',{'class':'required','data-type':'day','rel-type':'start',style:'margin-left:10px'});
			self.control.weekContext.contrastD2.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.contrastD2YearControl).append(self.control.weekContext.contrastD2DayControl));
			
			self.pickDateContainer.append(self.control.weekContext.contrastD2);
			
			self.control.weekContext.contrastD2YearControl.on('change', function(){
				self._populateDate($(this).next(),true);
				self._calcPeriod1();
				self._calcPeriod2();
			});
			self.control.weekContext.contrastD2DayControl.on('change', function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		/**
		 * <div class="mws-form-row bordered" group="daterange-two" data-value="3">
				<label class="mws-form-label">
					选择截止日期：
					<span class="required">*</span>
				</label>
				<div class="mws-form-item">
					<select class="required" data-type="year" rel-type="end"></select>
					<select class="required" data-type="day" rel-type="end" ></select>
				</div>
			</div>
		 */
		_buildWeekCDiv3: function(){
			var self = this;
			self.control.weekContext.contrastD3 = $('<div>',{'class':'mws-form-row bordered', group:'daterange-two','data-value':'3'});
			var labelC = $('<labl>',{'class':'mws-form-label',text:'选择截止日期：'}).append($('<span>',{'class':'required','text':'*'}));
			self.control.weekContext.contrastD3.append(labelC);
			self.control.weekContext.contrastD3YearControl = $('<select>',{'class':'required','data-type':'year','rel-type':'end'});
			self.control.weekContext.contrastD3DayControl = $('<select>',{'class':'required','data-type':'day','rel-type':'end',style:'margin-left:10px'});
			self.control.weekContext.contrastD3.append($('<div>',{'class':'mws-form-item'}).append(self.control.weekContext.contrastD3YearControl).append(self.control.weekContext.contrastD3DayControl));
			
			self.pickDateContainer.append(self.control.weekContext.contrastD3);
			
			self.control.weekContext.contrastD3YearControl.on('change', function(){
				self._populateDate($(this).next(),true);
				self._calcPeriod1();
				self._calcPeriod2();
			});
			self.control.weekContext.contrastD3DayControl.on('change', function(){
				self._calcPeriod1();
				self._calcPeriod2();
			});
		},
		_calcPeriod1: function(){
			var self = this;
			if(!$("div[group=daterange-one]").length) return;

			$("li[group=isRepeatReport]").hide();
			$("li[group=repeatReport]").hide();
			
			var label = $("#daterange-one-selector").parent().parent().prev().find("div label");
			var type = $("#daterange-one-selector").val();
			var date1 = null, date2 = null, week = 0, index = 0;
			
			switch(type){
				case "1":
					var element = $("div[group=daterange-one][data-value=1] option:checked");
					var val = element.val();
					index = element.index();
					if(val=="0"){
						date1 = self._getFirstSundayOfYear(endDate.year());
						date2 = self._getRecentSaturday();
						week = date2.diff(date1, 'week')+1;
					}else{
						date2 = self._getRecentSaturday();
						date1 = date2.clone().add('week', -val).add('day', 1);
						week = val;
					}
					break;
				case "2":
					var elements = $("div[group=daterange-one]:visible");
					date1 = moment(elements.first().find("select:last").val());
					date2 = moment(elements.last().find("select:last").val());
					week = date2.diff(date1, 'week')+1;
					break;
				case "3":
					var elements = $("div[group=daterange-one]:visible");
					week = $("div[group=daterange-one] input").val();
					date1 = moment(elements.first().find("select:last").val());
					date2 = date1.clone().add('day', week*7-1);
					break;
				case "4":
					var elements = $("div[group=daterange-one]:visible");
					week = $("div[group=daterange-one] input").val();
					date2 = moment(elements.first().find("select:last").val());
					date1 = date2.clone().add('day', -(week*7-1));
					break;
			}

			report.periods[0].start = date1;
			report.periods[0].end = date2;
			report.periods[0].week = week;
			report.periods[0].type = type;
			report.periods[0].index = index;
			var text = "从 "+date1.format('L')+" 【第"+arko.week(date1)+"周】 "+" 至"+date2.format("L")+" 【第"+arko.week(date2)+"周】 "+" ，共 "+week+" 周。";
			label.text(text);
			
			self._preview();
		},
		_calcPeriod2: function(){
			var self = this;
			if(!$("div[group=daterange-two]").length) return;
			
			var label = $("#daterange-two-selector").parent().parent().prev().find("div label");
			var type = $("#daterange-two-selector").val();
			var date1 = null, date2 = null, week = 0, index = 0;
			
			switch(type){
				case "1":
					var element = $("div[group=daterange-two][data-value=1] option:checked");
					var val = element.val();
					index = element.index();
					if(val=="1"){
						var sYear = report.periods[0].start.weekYear()-1;
						var eYear = report.periods[0].end.weekYear()-1;
						week = report.periods[0].week;
						
						var sDate = self._getFirstSundayOfYear(sYear);
						var eDate = self._getFirstSundayOfYear(eYear);
						date1 = sDate.clone().add('week', (report.periods[0].start.weeks()-1));
						date2 = eDate.clone().add('week', (report.periods[0].end.weeks())).add('day', -1);
						
						if(sYear=="2011"){
							date1.add('week', 1);
						}
						
						if(eYear=="2011"){
							date2.add('week', 1);
						}
					}else{
						week = report.periods[0].week;
						date2 = report.periods[0].start.clone().add('day', -1);
						date1 = date2.clone().add('week', -week).add('day', 1);
					}
					break;
				case "2":
					week = report.periods[0].week;
					var val = $("div[group=daterange-two][data-value=2] select:eq(1)").val();
					date1 = moment(val);
					date2 = date1.clone().add('week', week).add('day', -1);
					break;
				case "3":
					week = report.periods[0].week;
					var val = $("div[group=daterange-two][data-value=3] select:eq(1)").val();
					date2 = moment(val);
					date1 = date2.clone().add('week', -week).add('day', 1);
					break;
			}
			
			report.periods[1].start = date1;
			report.periods[1].end = date2;
			report.periods[1].week = week;
			report.periods[1].type = type;
			report.periods[1].index = index;
			var text = "从 "+date1.format('L')+" 【第"+arko.week(date1)+"周】 "+" 至"+date2.format("L")+" 【第"+arko.week(date2)+"周】 "+" ，共 "+week+" 周。";
			//var text = "从 "+date1.format('L')+" 至 "+date2.format('L')+" ，共 "+week+" 周。";
			label.text(text);
			
			self._preview();
		},
		_populateDate: function(elements,flag){
			var self = this;
			if(!elements)
				elements = $("fieldset[group=daterange] select[data-type=day]");
			elements.empty();
			
			$.each(elements, function(i,element){
				var elementQ = $(element);
				var year = elementQ.prev().find(":checked").val();
				if(!year) year = elementQ.prev().find("option:first").val();
				var list = self._getSundays([year],startDate,endDate);
				var type = elementQ.attr('rel-type');
				var offset = type=='start'?0:6;
				
				$.each(list, function(i, date){
					date.add('day', offset);
					if(date>endDate) return;
					var text = date.format("MM月DD日") + " / 第" + arko.week(date) + "周";
					var val = date.format("YYYY-MM-DD");
					elementQ.append($("<option>",{text:text,value:val}));
				});
			});
		},
		_preview: function(){
			var self = this;
			var text = "";
			
			try{

				if(report.periods[0].type==1 && report.periods.length == 1){
					$("li[group=isRepeatReport]").show();
					var flag = false;
					if($("li[group=isRepeatReport] :checkbox").attr("checked")){
						flag = true;
					}
					report.repeat = flag;
				}else{
					$("li[group=isRepeatReport]").hide();
					report.repeat = false;
				}
				
				if(report.periods[0].type==1){
					text = $("[group=daterange-one][data-value=1] select option:checked").text() + "： ";
				}
				
				var str1 = report.periods[0].start.format('L');
				var str2 = report.periods[0].end.format('L');
				var days = moment(report.periods[0].end.format('YYYY/MM/DD')).diff(moment(report.periods[0].start.format('YYYY/MM/DD')),'days')+1;
				var week = report.periods[0].week;
				if(self.options.dateType == 1){
					text += str1 + " -- " + str2 + "【" + week + " 周】";
				}else if(self.options.dateType == 2){
					text += str1 + " -- " + str2 + "【" + days + " 天】";
				}
				
				if(report.periods.length > 1){
					text += "<br/><strong>对比</strong><br/>";
					if(report.periods[1].type==1){
						text += $("[group=daterange-two][data-value=1] select option:checked").text() + "： ";
					}

					str1 = report.periods[1].start.format('L');
					str2 = report.periods[1].end.format('L');
					week = report.periods[1].week;
					days = moment(report.periods[1].end.format('YYYY/MM/DD')).diff(moment(report.periods[1].start.format('YYYY/MM/DD')),'days')+1;
					if(self.options.dateType == 1){
						text += str1 + " -- " + str2 + "【" + week + " 周】";
					}else if(self.options.dateType == 2){
						text += str1 + " -- " + str2 + "【" + days + " 天】";
					}
				}
				$("#preview-daterange .text-nowrap").html(text);
			}catch(e){}
		},
		_getSundays: function(date, startDate, endDate){
			var self = this;
			var list = [];
			date = moment(date);
			var year = date.year();
			if(date<startDate)
				date = startDate.clone();
			
			while(date>=startDate&&date.week()>=1&&date.day()!=0){
				date.add('day', -1);
			}
			
			for(;date.year()<=year;date.add('day', 1)){
				if(list.length&&date.week()==1) continue;
				if(date.day()==0&&date>=startDate&&date<endDate)
					list.push(date.clone());
			}
			if(list.length==0){
				for(;date.year()==(year+1)&&date.year()<=endDate.year();date.add('day', 1)){
					if(date.day()==0&&date>=startDate&&date<endDate)
						list.push(date.clone());
				}
			}
			
			return list;
		},
		_initWeekYear: function(){
			var self = this;
			var endDate = self.options.endDate;
			var startDate = self.options.startDate;
			var elements = $("fieldset[group=daterange] select[data-type=year]");
			elements.empty();
			var flag = 1;
			for(var i=endDate.year();i>=startDate.year();i--){
				if(flag){
					flag = 0;
					elements.append($("<option>",{text:i+'年',value:i,checked:"checked"}));
				}else{
					elements.append($("<option>",{text:i+'年',value:i}));
				}
			}
		},
		_getFirstSundayOfYear: function(year) {
			var date = null;
			if(year)
				date = moment([year]);
			else
				date = moment().month(0).date(1).hours(0).minutes(0).seconds(0);
			while(date.day()!=0){
		        date.add('day', -1);
		    }
			return date;
		},
		_getRecentSaturday: function() {
			var self = this;
			var endDate = self.options.endDate;
			var date = endDate.clone().hours(0).minutes(0).seconds(0);
		    while(date.day()!=6){
		        date.add('day',-1);
		    }
			return date;
		},
		/**
		 * 更改cache中的数据
		 */
		_updateBCacheData: function(beginDate,endDate){
			var self = this;
			self.options.cache[0].start = beginDate;
			self.options.cache[0].end = endDate;
		},
		_updateCCacheData: function(beginDate,endDate){
			var self = this;
			self.options.cache[1].start = beginDate;
			self.options.cache[1].end = endDate;
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

	$.fn.pickDate = function( options) {
		var isMethodCall = typeof options === "string",
		args = Array.prototype.slice.call( arguments, 1 ),
		returnValue = this;

		// 防止调用内部方法
		if ( isMethodCall && options.charAt( 0 ) === "_" ) {
			return returnValue;
		}
	
		if ( isMethodCall ) {
			this.each(function() {
				var instance = $.data( this, 'pickDate' ),
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
				var instance = $.data( this, 'pickDate' );
				if ( !instance ) {
					$.data( this, 'pickDate', new PickDate( this, options ) );
				}
			});
		}
	
		return returnValue;
	};
	
})( jQuery, window , document );