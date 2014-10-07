
//  CUBE 组件插件
// 根据不同参数创建不同的组件
(function($, window, document, undefined) {

  var CubeModule = function(element, config) {
    arguments.length && this._init(element, config);
    return this;
  };
  var colors = ['#99FF66','#73D973','#4CB280','#268C8C','#006699'];

  CubeModule.prototype = {
    /* 默认项 */
    defaults: {
      smclass: 'col-sm-12',
      headerClass: 'panel-heading  tab-bg-dark-navy-blue ',
      headTitle: '',
      bodyClass: 'panel-body',
      cache: null,
      moduleType: 0,
      //产品多选框
      prodChkId:'prodChk',
      //规则
      seqAvgData: [],
      seqStatus: 1,
      seqTimeDiffChart: null,
      //气泡图状态
      bubbleStatus: 2,
      tabSwitch: 1,
      bubbleNormTabStatus: 0,
      bubbleTableTitle1: [{text:'产品组',css:'width:200px;'},{text:'购物篮数',css:''},{text:'渗透率',css:''},{text:'重要度',css:''},{text:'金额占比1',css:''},{text:'金额占比2',css:''}],
      bubbleTableTitle2: [{text:'产品组',css:'width:200px;'},{text:'人数',css:''},{text:'渗透率',css:''},{text:'重要度',css:''},{text:'金额占比1',css:''},{text:'金额占比2',css:''}],
      bubbleSeqTable: [{text:'规则',css:'width:200px;'},{text:'端事件概率',css:''},{text:'关联概率',css:''},{text:'提升度',css:''},{text:'规则影响度',css:''},/*{text:'新客影响度',css:''},{text:'其他规则影响度',css:''},{text:'规则对已存顾客影响度',css:''},{text:'平均购买间隔',css:''},*/{text:'平均购买间隔',css:''},{text:'间隔分布',css:''}],
      bubbleProdStatus:[],
      bubbleDataLimitStatus:{min:0,max:100},
      bubbleSliderStatus: 0, //人数过滤条的状态
      bubbleRebuildStatus: -1, //当前气泡图的状态 -1 未初始化 1 明细表格状态 2 气泡图状态
      bubbleDiagonalStatus: 1, //隐藏对角线数据状态
      bubbleNormTexts: [[{text:'产品组',css:'width:200px'},{text:'合计购物篮数',css:''},{text:'渗透率',css:''},{text:'单一产品组渗透率',css:''},{text:'平均产品组数',css:''}],
                        [{text:'产品组',css:'width:200px'},{text:'合计顾客人数',css:''},{text:'渗透率',css:''},{text:'单一产品组渗透率',css:''},{text:'平均产品组数',css:''}]],
      bubbleSeqTimeTab: [{text:'报告时间长度',css:''},{text:'最短时间间隔',css:''},{text:'最长时间间隔',css:''},{text:'平均',css:''},{text:'中位',css:''},{text:'8分位',css:''}]
    },
    /* 插件初始化 */
    _init: function(element, config){
      this.moduleContainer = $(element);
      this.config = $.extend({}, config);
      this.options = $.extend({}, this.defaults, config, this.moduleContainer.data());
      jQuery.fn.dataTableExt.oSort['numeric-comma-asc']  = function(a,b) {
          var x = (a == "NaN") ? -999999 : a.replace( /%/, "" ).replace( /,/, "" );
          var y = (b == "NaN") ? -999999 : b.replace( /%/, "" ).replace( /,/, "" );
          x = parseFloat( x );
          y = parseFloat( y );
          return ((x < y) ? -1 : ((x > y) ?  1 : 0));
      };

      jQuery.fn.dataTableExt.oSort['numeric-comma-desc'] = function(a,b) {
          var x = (a == "NaN") ? -999999 : a.replace( /%/, "" ).replace( /,/, "" );
          var y = (b == "NaN") ? -999999 : b.replace( /%/, "" ).replace( /,/, "" );
          x = parseFloat( x );
          y = parseFloat( y );
          return ((x < y) ?  1 : ((x > y) ? -1 : 0));
      };
      this._build();
    },
    
    _build: function(){
      var self = this;
      self.container = {};
      self._buildSMPanel();
      
      switch(self.options.moduleType){
          case 1:
            break;
          case 2:
            break;
          case 3:
            self._initBubble();
            self._buildBubblePanel();
            break;
      }
    },
    
    // 构建公共模块
    _buildSMPanel: function(){
      var self = this;
      
      var switchTab = $('<ul>',{'class':'nav nav-tabs'})
                        .append($('<li>',{'class':'active'}).append($('<a>',{'data-toggle':'tab','href':'javascript:vold(0)','tab-index':1,'text':self.options.headTabTitle[0].NAME})))
                        .append($('<li>',{'class':''}).append($('<a>',{'data-toggle':'tab','href':'javascript:vold(0)','tab-index':2,'text':self.options.headTabTitle[1].NAME})))
                        .append($('<li>',{'class':''}).append($('<a>',{'data-toggle':'tab','href':'javascript:vold(0)','tab-index':3,'text':self.options.headTabTitle[2].NAME})));
      switchTab.find('li a').on('click',$.proxy(self._changebubbleTabHandler, {self:self}));
      
      self.container.panelBody = $('<div>',{'class':self.options.bodyClass});
      self.container.panelhead = $('<header >',{'class':self.options.headerClass})
                                    .append(switchTab);
      self.container.smContain = $('<div>',{'class':self.options.smclass}).append($('<section >',{'class':'panel'}).append(self.container.panelhead)
                                                                                                                   .append(self.container.panelBody));
      self.moduleContainer.append(self.container.smContain);
      
    },
    _changebubbleTabHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      var v = target.attr('tab-index');
      self.options.tabSwitch = v;
      target.parent().attr('class','active');
      target.parent().siblings().attr('class','');
      self.options.tabLabelHandler.apply(this,['TAB',self.options.tabSwitch,false]);
    },
    _changeTitle: function(title){
      var self = this;
      self.container.panelhead.text(title);
    },
    //气泡图的部分哦  加油了 ~.~
    _initBubble: function(){
      //这个初始化 在气泡图中需要使用到的变量 
      var self = this;
      self.bubbleData = {};
      self.bubbleData.arkoProdVals = Enumerable.From(self.options.cache.prods).Where("$.ID>'{0}'".format(0)).ToArray();
      self.options.bubbleProdStatus = [];
      for(var i = 0 ; i < self.bubbleData.arkoProdVals.length ; i++){
        self.options.bubbleProdStatus.push(1);
      }
      self.options.bubbleDataLimitStatus.min = 0;
      self.options.bubbleDataLimitStatus.max = 100;
    },
    _buildBubblePanel: function(){
      var self = this;
      self.container.bubbleLeftDiv = self._buildBubbleLeft();
      self.container.panelBody.append(self.container.bubbleLeftDiv);
      self.container.bubbleRightDiv = self._buildBubbleRight();
      self.container.panelBody.append(self.container.bubbleRightDiv);
      self._buildBubble();
      self._bindSlider(self.options.bubbleDataLimitStatus.max,self.options.bubbleDataLimitStatus.min);
      self.options.bubbleRebuildStatus = 1;
      $('.popovers').popover();
    },
    _reBuildBubblePanel: function(args){
      var self = this;
      //首先清空数据 然后 再进行界面的重构造
      if(self.options.bubbleStatus == 1){
        self.container.bubbleDataTable.fnDestroy();
      }else if(self.options.bubbleStatus == 2){
        self.container.bubbleBtn.bootstrapSwitch('destroy');
        self.container.bubble.highcharts() && self.container.bubble.highcharts().destroy();
        if(self.options.bubbleNormTabStatus == 1){
          self.container.bubbleNormTab.fnDestroy();
        }
      }
      if(self.options.bubbleStatus == 2 && args == 1){
        self.container.bubbleSlider&&self.container.bubbleSlider.find('input').ionRangeSlider('remove');
        self.container.bubbleSlider&&self.container.bubbleSliderDiv.empty();
        self.container.bubbleBtnDiv&&self.container.bubbleBtnDiv.empty();
        self._buildBubbleSlider(self.container.bubbleSliderDiv);
        self.options.bubbleRebuildStatus = -1;
        self.options.bubbleSliderStatus = 0;
        self.options.bubbleDataLimitStatus.min = 0;
        self.options.bubbleDataLimitStatus.max = 100;
      }else if(self.options.bubbleStatus == 2 && args == 0){
        self.container.bubbleBtnDiv&&self.container.bubbleBtnDiv.empty();
        self.container.bubbleDiv&&self.container.bubbleDiv.empty();
      }else if(self.options.bubbleStatus == 1){
        self.container.bubbleLeftDiv.show();
        self.container.bubbleRightDiv.show();
        self.container.bubbleBtnDiv&&self.container.bubbleBtnDiv.empty();
        self.container.bubbleDataTable && self.container.bubbleDataTable.remove();
        self.container.bubbleLeftDiv.empty();
        self.container.bubbleLeftDiv.append(self.container.bubbleBtnDiv);
        self.container.bubbleLeftDiv.append(self.container.bubbleDiv);
        self.container.bubbleLeftDiv.append(self.container.bubbleDiagonalTabDiv);
      }
      self.container.bubbleDiagonalTabDiv.empty();
//      if(self.options.bubbleBtnStatus){
      self._buildBubbleBtn(self.container.bubbleBtnDiv);
//      }
//      var f = false;
//      for(var i = 0 ; i < self.options.bubbleProdStatus.length ; i++){
//        if(self.options.bubbleProdStatus[i] == 1){
//          f= true;
//        }
//      }
//      if(f){
        self._buildBubble();
//      }
      self._bindSlider(self.options.bubbleDataLimitStatus.max,self.options.bubbleDataLimitStatus.min);
      if(self.options.checkData.TAB != 3){
        self._buildBubbleDiagonalTab(self.container.bubbleDiagonalTabDiv);
      }else{
        self.options.bubbleNormTabStatus = 0;
      }
      self.options.bubbleRebuildStatus = 1;
      $('.popovers').popover();
    },
    // 构建修改后的主页面
    _buildBubbleLeft: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{class:'col-sm-10'});
      }
      self.container.bubbleBtnDiv = self._buildBubbleBtn();
      div.append(self.container.bubbleBtnDiv);
      self.container.bubbleDiv = self._buildBubbleDiv();
      div.append(self.container.bubbleDiv);
      self.container.bubbleDiagonalTabDiv = self._buildBubbleDiagonalTab();
      div.append(self.container.bubbleDiagonalTabDiv);
      return div;
    },
    _buildBubbleRight: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'class':'col-sm-2 sq_left_frame'});
      }
      self.options.bubbleDiagonalDiv = self._buildBubbleDiagonal();
      div.append(self.options.bubbleDiagonalDiv);
      self.container.bubbleSliderDiv = self._buildBubbleSlider();
      div.append(self.container.bubbleSliderDiv);
      self.container.bubbleProdChkDiv = self._buildBubbleProds();
      div.append(self.container.bubbleProdChkDiv);
      return div;
    },
    _buildBubbleBtn: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'style':'width:100%'});  
      }
      
      var index = self.options.checkData.PID == 0 ? 0 : 1;
      var item = self.options.bubbleTitle[index][self.options.checkData.TAB-1];
      var title = self.options.checkData.PID == 0 ? item.title : self.bubbleData.arkoProdVals[self.options.checkData.PID-1].NAME+item.title;
      var titleReport =  $('<h3>',{'class':'sq_report_title',html:title+'<i class="popovers gray-fontSmall" data-original-title="" data-content="'+item.titleExp+'" data-trigger="hover" data-placement="bottom">【说明】</i>'});
      div.append(titleReport);
      
      if(self.options.checkData.PID == 0){
        var titleDescribe =  $('<div>',{'class':'sq_report_desc',text:item.titleBot});
        div.append(titleDescribe);
      }
      if((self.options.checkData.PID == 0 && self.options.bubbleBtnStatus) || (self.options.checkData.PID != 0 && self.options.checkData.TAB == 3)){
        var btnDiv = $('<div>',{'class':'position—right01'});
        if(self.options.checkData.PID != 0 && self.options.checkData.TAB == 3){
          btnDiv = $('<div>',{'class':'position—right01','style':'right:150px;display:block;'});
        }
        self.container.bubbleBtn = $('<input>',{'type':'checkbox','class':'switch-mini','data-on-label':self.options.tabVals[self.options.checkData.TAB-1][0],'data-off-label':self.options.tabVals[self.options.checkData.TAB-1][1]});
        btnDiv.append($('<span>',{'style':'margin-right:5px;',text:item.titleTabLeft}));
        btnDiv.append(self.container.bubbleBtn);
        self.container.bubbleBtn.bootstrapSwitch();
        if(self.options.checkData.SWITCH == 1){
          self.container.bubbleBtn.bootstrapSwitch('setState', false);
        }else{
          self.container.bubbleBtn.bootstrapSwitch('setState', true);
        }
        self.container.bubbleBtn.on('switch-change', function (e, data) {
          self._bubbleTabHandle(e,data);
        });
        btnDiv.append($('<span>',{'style':'margin-left:5px;',text:self.options.checkData.TAB == 3 ? item.titleTabRight + self.bubbleData.arkoProdVals[self.options.checkData.PID-1].NAME:item.titleTabRight}));
        div.append(btnDiv);
      }
      //<button type="button" class="btn btn-primary">Primary</button>
      if(self.options.checkData.PID != 0){
        var returnDiv = $('<div>',{'class':'position—right01','style':'display:block;'});
//        returnDiv.append($('<button>',{type:'button','class':'btn btn-primary',text:'返回上级'}));
//        returnDiv.find('button').on('click',$.proxy(self._bubbleReturnHandler,{self:this}));
        self.options.returnButton && self.options.returnButton.show();
        self.options.returnButton && self.options.returnButton.on('click',$.proxy(self._bubbleReturnHandler,{self:this}));
        div.append(returnDiv);
      }else{
        self.options.returnButton && self.options.returnButton.hide();
      }
      //如果是先后购买的详情则加入前端概率或者后端概率
      if(self.options.checkData.PID != 0 && self.options.checkData.TAB == 3){
        self.container.bubbleSeqTitleItemDIV = $('<div>',{'style':'font-size: 15px;margin-left: 10px;margin-bottom: 5px;',text:''});
        div.append(self.container.bubbleSeqTitleItemDIV);
      }
      return div;
    },
    _bubbleReturnHandler: function(){
      var self = this.self;
      self.options.tabLabelHandler.apply(this,['PID',0,true]);
    },
    _buildBubbleProds: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'style':'width:100%'});  
      }
      var title2 =  $('<h3>',{'class':'sq_left_title'}).append(self._buildBubbleProdsChk());
      div.append(title2);
      //全选不选反选事件
      var titleButton = $('<div>',{'class':'select_3'});
      var vs = [{text:'全选',val:'1'},{text:'不选',val:'2'},{text:'反选',val:'3'}];
      $.each(vs,function(index,item){
        titleButton.append($('<label>',{'class':'radio-inline','prod-val':item.val,text:item.text}));
      });
      titleButton.find('label').on('click',$.proxy(self._changeBubbleProdAllHandler,{self:self}));
      div.append(titleButton);
      
      for(var i = 0 ; i<  self.bubbleData.arkoProdVals.length ; i++){
        var item =  self.bubbleData.arkoProdVals[i];
        var divI = $('<div>',{'class':'sq_check_both'});
        divI.append($('<input>',{'type':'checkbox','cube-val':item.ID,'id':'cube-prod'+item.ID}))
                                    .append($('<label>',{'for':'cube-prod'+item.ID,'text':item.NAME,'class':'sq_checkbox'}));
        if(self.options.bubbleProdStatus[i] == 1){
          divI.find('input').attr('checked',true);
        }
        divI.find('input').on('change',$.proxy(self._changeBubbleProdHandler, {self:self}));
        div.append(divI);
      }
      return div;
    },
    /*<div class="radio">
        <label>
            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
            Option one is this and that&mdash;be sure to include why it's great
        </label>
    </div>*/
    _buildBubbleProdsChk: function(){
      var div = $('<div>',{'class':'btn-group'});
//      var ul = $('<ul>',{role:'menu','class':'dropdown-menu'});
//      $.each(texts,function(index,item){
//        ul.append($('<li>').append($('<a>',{text:item.text,'prod-val':item.val,'href':'#'})));
//      });
//      ul.find('li a').on('click',$.proxy(self._changeBubbleProdAllHandler,{self:self}));
//      div.append($('<div>',{'data-toggle':'dropdown','class':'btn btn-black dropdown-toggle','type':'button','html':'<i class="fa fa-crosshairs"></i> 产品组筛选器 '}).append($('<span>',{'class':'caret'}))).append(ul);
      
      //new 使用单选按钮显示筛选条件
//      var radioDiv = $('<div>',{'style':'clear:left;float:left;width:100%'});
//      $.each(texts,function(index,item){
//        radioDiv.append($('<label>',{'class':'radio-inline'}).append($('<input>',{type:'radio',name:'prodradios','prod-val':item.val})).append(item.text));
//      });
//      radioDiv.find('label input[name=prodradios]').on('change',$.proxy(self._changeBubbleProdAllHandler,{self:self}));
//      div.append($('<div>',{'data-toggle':'dropdown','class':'btn btn-black dropdown-toggle','type':'button','html':'<i class="fa fa-crosshairs"></i> 产品组筛选器 '})).append(radioDiv);
      div.append($('<div>',{'data-toggle':'dropdown','class':'btn btn-black dropdown-toggle','type':'button','html':'<i class="fa fa-crosshairs"></i> 产品组筛选器 '}));
      return div;
    },
    _buildBubbleDiagonal: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'style':'width:100%;display:none;'});  
      }
      var title1 =  $('<h3>',{'class':'sq_left_title',html:'<i class="fa fa-male"></i> 隐藏对角线数据'});
      div.append(title1);
      self.container.bubbleDiagonal = $('<div>',{'class':'margin18'});
      self.container.bubbleDiagonal.append($('<input>',{type:'checkbox','style':'margin-left:15px',id:'bubbleDiagonal'})).append($('<label>',{'style':'margin-left:5px;font-size:15px;',text:'勾选隐藏','for':'bubbleDiagonal'}));
      div.append(self.container.bubbleDiagonal);
      
      //添加监听事件
      self.container.bubbleDiagonal.find('input').on('change',$.proxy(self._changeBubbleDiagonalHandler,{self:this}));
      
      return div;
    },
    _buildBubbleSlider: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'style':'width:100%'});  
      }
      var title1 =  $('<h3>',{'class':'sq_left_title',html:'<i class="fa fa-male"></i> '+self.options.filterTitle[self.options.checkData.TAB-1]});
      div.append(title1);
      self.container.bubbleSlider = $('<div>',{'class':'margin18'});
      var slider = $('<input>',{'type':'text'});
      self.container.bubbleSlider.append(slider);
      div.append(self.container.bubbleSlider);
      return div;
    },
    _bindSlider: function(max,min){
      var self = this;
      self.container.bubbleSlider.find('input').ionRangeSlider({
          min: 0,
          max: 100,
          from: min,
          to: max,
          type: 'double',
          step: 10,
          postfix: '%',
          prettify: false,
          hasGrid: true,
          onChange: function(obj) {
            self._bubbleSliderHandler(obj.fromNumber,obj.toNumber);
          }
      });
    },
    _bubbleSliderHandler: function(from,to){
      var self = this;
      self.options.bubbleDataLimitStatus.min = from;
      self.options.bubbleDataLimitStatus.max = to;
      self._rebuildBubbleHandler(0);
    },
    _changeBubbleProdHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      var val = target.attr('cube-val');
      if(target.attr('checked')){
        self.options.bubbleProdStatus[val - 1] = 1;
      }else{
        self.options.bubbleProdStatus[val - 1] = 0;
      }
      self._rebuildBubbleHandler(1);
    },
    _changeBubbleProdAllHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      var val = target.attr('prod-val');
      var prodDivs = self.container.bubbleProdChkDiv.children('div.sq_check_both');
      switch(val){
        case '1':
          $.each(self.options.bubbleProdStatus,function(index,item){
            self.options.bubbleProdStatus[index] = 1;
            $($(prodDivs[index]).children('input')).attr('checked',true);
          });
          break;
        case '2':
          $.each(self.options.bubbleProdStatus,function(index,item){
            self.options.bubbleProdStatus[index] = 0;
            $($(prodDivs[index]).children('input')).attr('checked',false);
          });
          break;
        case '3':
          $.each(self.options.bubbleProdStatus,function(index,item){
            if(item == 1){
              self.options.bubbleProdStatus[index] = 0;
              $($(prodDivs[index]).children('input')).attr('checked',false);
            }else if(item == 0){
              self.options.bubbleProdStatus[index] = 1;
              $($(prodDivs[index]).children('input')).attr('checked',true);
            }
          });
          break;
      }
      self._rebuildBubbleHandler(1);
    },
    _changeBubbleDiagonalHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      if(target.attr('checked')){
        self.options.bubbleDiagonalStatus = 1;
      }else{
        self.options.bubbleDiagonalStatus = 0;
      }
      self._rebuildBubbleHandler(0);
    },
    //切换产品组 和  拉条的时候  重新加载 下面泡泡图的数据 加油！
    _rebuildBubbleHandler: function(args){
      var self = this;
      if(self.options.bubbleRebuildStatus == 1){
        self._reBuildBubblePanel(args);
      }
    },
    _buildBubbleDiv: function(){
      var div = $('<div>',{'style':'width:100%;min-height:125px;'});
      return div;
    },
    _buildBubbleDiagonalTab: function(div){
      var self = this;
      if(!div){
        div = $('<div>',{'style':'width:100%'});
      }
      div.append($('<div>',{'class':'sq_report_desc',text:' '}));
      var title = $('<h3>',{'class':'sq_report_title'}).append('各品类的综合指标').append($('<i>',{'class':'popovers gray-fontSmall','data-original-title':'','data-content':'平均每位会员在分析时间段内累计的花费','data-trigger':'hover','data-placement':'bottom',text:'【说明】'}));
      div.append(title);
      
      self.container.bubbleNormTab = $('<table>',{'style':'width:100%','class':'display table table-bordered table-striped'});
      var tr = $('<tr>');
      $.each(self.options.bubbleNormTexts[self.options.checkData.TAB-1],function(index,item){
        tr.append($('<th>',{style:item.css,text:item.text}));
      });
      self.container.bubbleNormTab.append($('<thead>').append(tr));
      div.append(self.container.bubbleNormTab);
      
      self.container.bubbleNormTab.dataTable({
        'aaData':self._getBubbleDiagonalData(),
        'aoColumns':[
          {'mData':'i','sType': 'numeric-comma'},
          {'mData':'p','sType': 'numeric-comma'},
          {'mData':'t1','sType': 'numeric-comma'},
          {'mData':'t2','sType': 'numeric-comma'},
          {'mData':'t3','sType': 'numeric-comma'}
        ],
        "bFilter": false,
        "bLengthChange": false,
        "iDisplayLength": 20,
        "oLanguage" : {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sZeroRecords": "没有检索到数据",
             "sSearch": "名称:",
            "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "前一页",
            "sNext": "后一页",
            "sLast": "尾页"
            }

        }
      });
      self.options.bubbleNormTabStatus = 1;
      return div;
    },
    _getBubbleDiagonalData: function(){
      var self = this;
      var data = [];
      var bData1 = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(0)).OrderBy('$.PID').ToArray();
      var bData2 = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(1)).OrderBy('$.PID').ToArray();
      var bData3 = Enumerable.From(self.options.cache.buyAvg).ToArray();
      var aData = self.options.cache.auxconfig;
      for(var i = 1,j = 0, k = 0;i <= self.bubbleData.arkoProdVals.length;i++){
	    var bData1Item = null;
        var bData2Item = null;
        if(j < bData1.length && i == bData1[j].PID){
          bData1Item = bData1[j];
          j++;
        }
        if(k < bData2.length && i == bData2[k].PID){
          bData2Item = bData2[k];
          k++;
        }
        if(self.options.bubbleProdStatus[i-1] == 1){
          var v = {};
          v.i = self.bubbleData.arkoProdVals[i-1].NAME;
          v.p = bData1Item == null ? 'NaN' : $.formatNumber(bData1Item['p'+i],{format:"#,###", locale:"cn"});
          v.t1 = bData1Item == null ? 'NaN' : $.formatNumber(bData1Item['p'+i] / aData[0].VAL,{format:"#,##0.00%", locale:"cn"});
          v.t2 = bData2Item == null ? 'NaN' : $.formatNumber(bData2Item['p'+i] / aData[0].VAL,{format:"#,##0.00%", locale:"cn"});
          v.t3 = $.formatNumber(bData3[0]['a'+i]/bData3[0]['p'+i],{format:"#,##0.00", locale:"cn"});
          data.push(v);
        }
      }
      
      return data;
    },
    _buildBubble: function(){
      var self = this;
      var bubbleDiv = self.container.bubbleDiv;
      var data = [];
      var arkoYVals = [];
      var arkoXVals = [];
      if(self.options.checkData.TAB == 3){
        data = self._bubbleSeqData(arkoXVals,arkoYVals);
      }else{
        data = self._bubbleData(arkoXVals,arkoYVals);
      }
      
      var height = 50;
      //计算减少产品组织后的产品组与原来的对映关系
      var rProdVal = [];
      for(var i = 0; i < self.options.bubbleProdStatus.length ; i++){
        if(self.options.bubbleProdStatus[i] == 1){
          rProdVal.push(self.bubbleData.arkoProdVals[i]);
          height += 50;
        }
      }
      
      self.container.bubble = bubbleDiv.highcharts({

        chart: {
            type: 'bubble',
            height: height,
            zoomType: 'xy'
        },
        title:'',
        legend: {
            align: 'center',
            verticalAlign: 'top',
            borderColor: '#CCCCCC'
        },
        series: data,
        xAxis: {
            reversed: false,
            title: {
                    enabled: true,
                    text: ''
            },
            labels: {
                    formatter: function() {
                          var val =  rProdVal[this.value-1];
                          if(typeof val == 'undefined')
                              return'';
                          var str = '';
                          if(self.options.checkData.TAB == 3){
                            str = '<label style="text-align:center">后<br/>'+val.NAME+'</label>'
                          }else{
                            str = '<label style="text-align:center">'+val.NAME+'</label>';
                          }
                          return str;
                    },
                    useHTML: Highcharts.hasBidiBug
            },
            showLastLabel: true,
            opposite: true,
            arkoCusStatus: 1,
            arkoVals: arkoXVals,
            arkoProdVals: rProdVal
        },
        yAxis: {
            title:'',
            labels: {
                    formatter: function() {
                          var val =  rProdVal[this.value-1];
                          if(typeof val == 'undefined')
                              return'';
                          var str = '';
                          if(self.options.checkData.TAB == 3){
                            str = '<label style="text-align:center">先/'+val.NAME+'</label>'
                          }else{
                            str = '<label style="text-align:center">'+val.NAME+'</label>';
                          }
                          return str;
                    },
                    step: 1
            },
            reversed: true,
            lineWidth: 0,
            arkoCusStatus: 1,
            arkoVals: arkoYVals,
            arkoProdVals: rProdVal,
            arkoCacheData: self.options.cacheShowData,
            arkoCacheTip: self.options.cacheTip,
            arkoCacheType: self.config.checkData.TAB,
        },
        tooltip: {
            formatter: function(){
              var head= '';
              var body = '';
              if(this.series.yAxis.userOptions.arkoCacheType == 1 || this.series.yAxis.userOptions.arkoCacheType == 2){
                head = '<small>'+this.series.yAxis.userOptions.arkoProdVals[this.y-1].NAME+'与'+this.series.yAxis.userOptions.arkoProdVals[this.x-1].NAME+'</small><br/>';
                body = '<label>'+this.series.yAxis.userOptions.arkoCacheTip.x+':</label><span>'+$.formatNumber(this.point.z,{format:"#,###", locale:"cn"})+'</span><br/>'
                          +'<label>'+this.series.yAxis.userOptions.arkoCacheTip.y+':</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoCacheData[this.x-1][this.y-1].b1,{format:"#,##0.0%", locale:"cn"})+'</span><br/>'
                          +'<label>'+this.series.yAxis.userOptions.arkoCacheTip.z+':</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoCacheData[this.x-1][this.y-1].avg,{format:"#,##0.00", locale:"cn"})+'</span><br/>'
                          +'<label>'+this.series.yAxis.userOptions.arkoCacheTip.f+':</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoCacheData[this.x-1][this.y-1].b2,{format:"#,##0.0%", locale:"cn"})+'</span><br/>';
              }else if(this.series.yAxis.userOptions.arkoCacheType == 3){
                head = '<small>先购买'+this.series.yAxis.userOptions.arkoProdVals[this.y-1].NAME+'，后购买'+this.series.yAxis.userOptions.arkoProdVals[this.x-1].NAME+'</small><br/>';
                body = '<label>'+this.series.yAxis.userOptions.arkoCacheTip.y+':</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoCacheData[this.x-1][this.y-1].l,{format:"#,##0.00%", locale:"cn"})+'</span><br/>'
                          +'<label>'+this.series.yAxis.userOptions.arkoCacheTip.x+':</label><span>'+$.formatNumber(this.point.z,{format:"#,###", locale:"cn"})+'</span><br/>'
                          +'<label>'+this.series.yAxis.userOptions.arkoCacheTip.z+':</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoCacheData[this.x-1][this.y-1].s,{format:"#,##0.00%", locale:"cn"})+'</span><br/>';
              }
              return head + body;
            }
        },plotOptions: {
            bubble: {
                minSize: 3,
                maxSize: 50
            }
        },
        credits: {
          enabled: false
        }

      });
      self.container.bubble.find('.highcharts-axis-labels text tspan').on('click',$.proxy(self._clickBubbleLabelHandler, {self:self}));
      //如果X轴或者Y轴没有数据就......
      if(arkoXVals.length == 0 || arkoYVals.length == 0){
        bubbleDiv.append($('<div>',{'class':'nodatamsg',text:'该会员组无先后购买数据，请切换其它会员组'}));
      }
      self.options.bubbleStatus = 2;
      return bubbleDiv;
    },
    _bubbleData: function(arkoXVals,arkoYVals){
      var self = this;
      var data = [];
      var baseData =  Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(self.options.checkData.SWITCH)).ToArray();
      var bData = [];
      var names = [];
      
      var rProdIndex = [];
      var rLen = 0;
      for(var i = 0 ; i < self.options.bubbleProdStatus.length ; i++){
        if(self.options.bubbleProdStatus[i] == 1){
          rProdIndex.push(++rLen);
        }else{
          rProdIndex.push(-1);
        }
      }
      
      self.options.cacheShowData = [];
      for(var i = 0; i< rLen ; i++){
        var v = [];
        for(var j = 0 ; j <  rLen ; j++){
          v.push({avg:0,amt:0,b1:0,b2:0});
        }
        self.options.cacheShowData.push(v);
      }
      for(var i = 0 ; i < self.options.bubbleSec; i++){
        data.push({data:[],name:'',color:colors[i]});
        names.push({max:-1,min:999999999});
      }
      
      $.each(baseData,function(index,item){
        for(var i = 1 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
          var v = {};
          v.y = item.PID;
          v.x = i;
          v.p = item['p'+i];
          v.v = item['a'+i]/item['p'+i];
          
          if(self.options.bubbleProdStatus[v.x-1] == 1 && self.options.bubbleProdStatus[v.y-1] == 1){
            v.x = rProdIndex[v.x-1];
            v.y = rProdIndex[v.y-1];
            if(self.options.bubbleDiagonalStatus != 1 || v.x != v.y){
              bData.push(v);
              self.options.cacheShowData[v.x - 1][v.y - 1].avg=v.v;
              self.options.cacheShowData[v.x - 1][v.y - 1].amt=item['a'+i];
              self.options.cacheShowData[v.x - 1][v.y - 1].b1=item['p'+i] / self.options.cache.auxconfig[0].VAL;
              self.options.cacheShowData[v.x - 1][v.y - 1].b2=item['a'+i] / item['s'+i];
            }
          }
            
        }
      });
      
      //如果slider未初始化 则进行初始化
      if(self.options.bubbleSliderStatus == 0){
        var pLen = 0;
        $.each(self.options.bubbleProdStatus,function(index,item){
          pLen += item;
        });
        var pMin = 0 , pMax = 100;
        var v = (pLen * 2)/(pLen * (pLen-1));
        if( v >= 0 && v <= 1){
          pMin = 100 - (((v*100/10) | 0) + 1) * 10;
        }
        self._bindSlider(pMax,pMin);
        self.options.bubbleDataLimitStatus.max = pMax;
        self.options.bubbleDataLimitStatus.min = pMin;
        self.options.bubbleSliderStatus = 1;
      }
      
      bData = Enumerable.From(bData).OrderBy("$.p").ToArray();
      var len = bData.length;
      var max = 999999999, min = -1;
      if(len > 0){
        max = bData[(len * (self.options.bubbleDataLimitStatus.max/100) | 0) == len ? len - 1 : (len * (self.options.bubbleDataLimitStatus.max/100) | 0 )].p,min = bData[(len * (self.options.bubbleDataLimitStatus.min/100) | 0) == len ? len - 1 : (len * (self.options.bubbleDataLimitStatus.min/100) | 0)].p;
      }
      var rData = [];
      var xMin = 999999999,xMax = -1, yMin = 999999999,yMax = -1;
      $.each(bData,function(index,item){
          if(item.p >= min && item.p <= max){
            if(self.options.bubbleDiagonalStatus != 1 || item.x != item.y){
              rData.push(item);
              if(item.x > xMax)
                xMax = item.x;
              if(item.x < xMin)
                xMin = item.x;
              if(item.y > yMax)
                yMax = item.y;
              if(item.y < yMin)
                yMin = item.y;
            }
          }
      });
      
      //封装x轴和y轴的值
      for(var xi = xMin ; xi <= xMax; xi++){
        arkoXVals.push(xi);
      }
      for(var yi = yMin ; yi <= yMax; yi++){
        arkoYVals.push(yi);
      }
      
      if(self.config.checkData.TAB == 1){
        self.options.cacheTip = {x:'购物篮数',y:'购物篮占比',z:'购物篮花费',f:'金额占比'};
      }else if(self.config.checkData.TAB == 2){
        self.options.cacheTip = {x:'人数',y:'人数占比',z:'人均花费',f:'金额占比'};
      }
      rData = Enumerable.From(rData).OrderBy("$.v").ToArray();
      len = rData.length;
      var lenSec = (len / self.options.bubbleSec) | 0;
      if(len % self.options.bubbleSec != 0){
        lenSec = lenSec + 1;
      }
      
      $.each(rData,function(index,item){
        data[index / lenSec | 0].data.push([item.x,item.y,item.p]);
        if(item.v > names[index / lenSec | 0].max){
          names[index / lenSec | 0].max = item.v;
        }
        if(item.v < names[index / lenSec | 0].min){
          names[index / lenSec | 0].min = item.v;
        }
      });
      var fData = [];
      $.each(data,function(index,item){
        item.name = '￥'+$.formatNumber(names[index].min,{format:"#,###", locale:"cn"}) + ' - ' + $.formatNumber(names[index].max,{format:"#,###", locale:"cn"});
        if(names[index].min <= names[index].max){
          fData.push(item);
        }
      });
      return fData;
    },
    _bubbleSeqData: function(arkoXVals,arkoYVals){
      var self = this;
      var data = [];
      var names = [];
      var itemGrpStr1 = '{PID:key,';
      for(var i=1 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
        if(i!=1)
          itemGrpStr1 += ',';
        itemGrpStr1 += ('p'+i+':item.Sum("$.p'+i+'")');
      }
      itemGrpStr1 += '}';
      var baseP1Val = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}' && $.PID =='{1}'".format(0,0)).ToArray();
//      var baseP2Val = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}' && $.PID =='{1}'".format(0,1)).ToArray();
      var baseS2PVal = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(1)).ToArray();
      var baseP2PVal = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(2)).GroupBy('$.PID','','key,item=>'+itemGrpStr1,'').ToArray();
      
      var rProdIndex = [];
      var rLen = 0;
      for(var i = 0 ; i < self.options.bubbleProdStatus.length ; i++){
        if(self.options.bubbleProdStatus[i] == 1){
          rProdIndex.push(++rLen);
        }else{
          rProdIndex.push(-1);
        }
      }
      
      self.options.cacheShowData = [];
      for(var i = 0; i< rLen ; i++){
        var v = [];
        for(var j = 0 ; j <  rLen; j++){
          v.push({l:0,s:0});
        }
        self.options.cacheShowData.push(v);
      }
      
      var bData = [];
      $.each(baseP2PVal,function(index,item){
        for(var i = 1 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
          var v = {};
          v.y = item.PID;
          v.x = i;
          v.p = item['p'+i];
          v.l = ((item['p'+i] * baseP1Val[0]['p0'])/(baseS2PVal[0]['p'+i] * baseP1Val[0]['p'+item.PID]));
          v.s = item['p'+i]/baseP1Val[0]['p'+item.PID];
          if(self.options.bubbleProdStatus[v.x-1] == 1 && self.options.bubbleProdStatus[v.y-1] == 1){
            v.x = rProdIndex[v.x-1];
            v.y = rProdIndex[v.y-1];
//            if(self.options.bubbleDiagonalStatus != 1 || v.x != v.y){
              bData.push(v);
              self.options.cacheShowData[v.x - 1][v.y - 1].l=v.l;
              self.options.cacheShowData[v.x - 1][v.y - 1].s=v.s;
//            }
            
          }
          
        }
      });
      //如果slider未初始化 则进行初始化
      if(self.options.bubbleSliderStatus == 0){
        var pLen = 0;
        $.each(self.options.bubbleProdStatus,function(index,item){
          pLen += item;
        });
        var pMin = 0 , pMax = 100;
        var v = (pLen * 2)/(pLen * (pLen-1));
        if( v >= 0 && v <= 1){
          pMin = 100 - (((v*100/10) | 0) + 1) * 10;
        }
        self._bindSlider(pMax,pMin);
        self.options.bubbleDataLimitStatus.max = pMax;
        self.options.bubbleDataLimitStatus.min = pMin;
        self.options.bubbleSliderStatus = 1;
      }
      
      bData = Enumerable.From(bData).OrderBy("$.p").ToArray();
      var len = bData.length;
      var max = 999999999, min = -1;
      if(len > 0){
        max = bData[(len * (self.options.bubbleDataLimitStatus.max/100) | 0) == len ? len - 1 : (len * (self.options.bubbleDataLimitStatus.max/100) | 0 )].p,min = bData[(len * (self.options.bubbleDataLimitStatus.min/100) | 0) == len ? len - 1 : (len * (self.options.bubbleDataLimitStatus.min/100) | 0)].p;
      }
      var rData = [];
      var xMin = 999999999,xMax = -1, yMin = 999999999,yMax = -1;
      $.each(bData,function(index,item){
          if(item.p >= min && item.p <= max){
//            if(self.options.bubbleDiagonalStatus != 1 || item.x != item.){
            rData.push(item);
            if(item.x > xMax)
              xMax = item.x;
            if(item.x < xMin)
              xMin = item.x;
            if(item.y > yMax)
              yMax = item.y;
            if(item.y < yMin)
              yMin = item.y;
//            }
          }
      });
      
      //封装x轴和y轴的值
      for(var xi = xMin ; xi <= xMax; xi++){
        arkoXVals.push(xi);
      }
      for(var yi = yMin ; yi <= yMax; yi++){
        arkoYVals.push(yi);
      }
      
      for(var i = 0 ; i < self.options.bubbleSec; i++){
        data.push({data:[],name:'',color:colors[i]});
        names.push({max:-1,min:999999999});
      }
      
      rData = Enumerable.From(rData).OrderBy("$.l").ToArray();
      len = rData.length;
      var lenSec = (len / self.options.bubbleSec) | 0;
      if(len % self.options.bubbleSec != 0){
        lenSec = lenSec + 1;
      }
      self.options.cacheTip = {x:'人次',y:'提升度',z:'关联概率'};
      $.each(rData,function(index,item){
        data[index / lenSec | 0].data.push([item.x,item.y,item.p]);
        if(item.l > names[index / lenSec | 0].max){
          names[index / lenSec | 0].max = item.l;
        }
        if(item.l < names[index / lenSec | 0].min){
          names[index / lenSec | 0].min = item.l;
        }
      });
      var fData = [];
      $.each(data,function(index,item){
        item.name = $.formatNumber(names[index].min,{format:"#,###%", locale:"cn"}) + ' - ' + $.formatNumber(names[index].max,{format:"#,###%", locale:"cn"});
        if(names[index].min <= names[index].max){
          fData.push(item);
        }
      });
      return fData;
    },
    _buildHead: function(data,minCols){
      if(data.length < minCols)
        return;
      var tableHead = $('<thead>');
      var tableTr = $('<tr>');
      $.each(data,function(index,item){
        tableTr.append($('<th>',{'style':item.css}).append(item.text));
      });
      tableHead.append(tableTr);
      return tableHead;
    },
    _buildBody: function(){
      var body = $('<tbody>');
      return body;
    },
    _buildBubbleTable: function(){
      var self = this;
      self.container.bubbleTabLeftDiv = $('<div>',{'class':'col-sm-12','style':'display: block;'});
      self.container.bubbleBtnDiv = self._buildBubbleBtn();
      self.container.bubbleTabLeftDiv.append(self.container.bubbleBtnDiv);
      
      self.container.bubbleDataTable = $('<table>',{'class':'display table table-bordered table-striped'});
      if(self.options.checkData.TAB == 1){
        self.container.bubbleDataTable.append(self._buildHead(self.options.bubbleTableTitle1,2));
      }else if(self.options.checkData.TAB == 2){
        self.container.bubbleDataTable.append(self._buildHead(self.options.bubbleTableTitle2,2));
      }
      self.container.bubbleDataTable.append(self._buildBody());
      self.container.bubbleTabLeftDiv.append(self.container.bubbleDataTable);
      
      self.container.panelBody.append(self.container.bubbleTabLeftDiv);
      
      self.container.bubbleDataTable.dataTable({
        'aaData':self._getBubbleData(self.options.cache.bubbleData),
        'aoColumns':[
          {'mData':'p'},
          {'mData':'n','sType': 'numeric-comma'},
          {'mData':'i','sType': 'numeric-comma'},
          {'mData':'c','sType': 'numeric-comma'},
          {'mData':'o1','sType': 'numeric-comma'},
          {'mData':'o2','sType': 'numeric-comma'}
        ],
        "bFilter": false,
        "bLengthChange": false,
        "iDisplayLength": 20,
        "oLanguage" : {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sZeroRecords": "没有检索到数据",
             "sSearch": "名称:",
            "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "前一页",
            "sNext": "后一页",
            "sLast": "尾页"
            }

        }
      });
      self.options.bubbleStatus = 1;
    },
    _buildSeqBubbleTable: function(){
      var self = this;
      self.container.bubbleTabLeftDiv = $('<div>',{'class':'col-sm-12','style':'display: block;'});
      self.container.bubbleBtnDiv = self._buildBubbleBtn();
      self.container.bubbleTabLeftDiv.append(self.container.bubbleBtnDiv);
      
      self.container.bubbleDataTable = $('<table>',{'class':'display table table-bordered table-striped'});
      
      if(self.options.checkData.SWITCH == 0){
        self.options.bubbleSeqTable[1].text = '后端事件概率';
      }else if(self.options.checkData.SWITCH == 1){
        self.options.bubbleSeqTable[1].text = '前端事件概率';
      }
      
      self.container.bubbleDataTable.append(self._buildHead(self.options.bubbleSeqTable,2));
      self.container.bubbleDataTable.append(self._buildBody());
      self.container.bubbleTabLeftDiv.append(self.container.bubbleDataTable);
      
      self.container.panelBody.append(self.container.bubbleTabLeftDiv);
      
      var vv = [0];
      var data = self._getSeqBubbleData(self.options.cache.bubbleData,vv,self.options.checkData.SWITCH);
      
      // 填充 前端或者后端的事件概率
      var str = '';
      if(self.options.checkData.SWITCH == 0){
        str = '前端事件概率：' + vv;
      }else if(self.options.checkData.SWITCH == 1){
        str = '后端事件概率：' + vv;
      }
      self.container.bubbleSeqTitleItemDIV.text(str);
      
      var cols = [
                  {'mData':'p','sType': 'numeric-comma'},
                  {'mData':'t1','sType': 'numeric-comma'},
                  {'mData':'t3','sType': 'numeric-comma'},
                  {'mData':'t4','sType': 'numeric-comma'},
                  {'mData':'t5','sType': 'numeric-comma'},
                  {'mData':'avg','sType': 'numeric-comma'},
                  {'mData':'secLink'}
                ];
      if(self.options.checkData.SWITCH == 0){
        cols[1].mData = 't2';
      }else if(self.options.checkData.SWITCH == 1){
        cols[1].mData = 't1';
      }
      self.container.bubbleDataTable.dataTable({
        'aaData':data,
        'aoColumns': cols,
        "bFilter": false,
        "bLengthChange": false,
        "iDisplayLength": 20,
        "oLanguage" : {
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "抱歉， 没有找到",
            "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
            "sInfoEmpty": "没有数据",
            "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
            "sZeroRecords": "没有检索到数据",
             "sSearch": "名称:",
            "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "前一页",
            "sNext": "后一页",
            "sLast": "尾页"
            }

        }
      });
      
      self.container.bubbleDataTable.find('tr td a[data-toggle=modal].btn-primary').on('click',$.proxy(self._showBubbleSeqSecHandler, {self:self}));
      
      self.options.bubbleStatus = 1;
    },
    _showBubbleSeqSecHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      var val = null;
      var pi = null;
      if(self.options.checkData.SWITCH == 0){
        val = target.attr('data-val');
        pi = self.options.checkData.PID;
      }else{
        pi = target.attr('data-val');
        val = self.options.checkData.PID;
      }
            
      var fP = self.bubbleData.arkoProdVals[pi-1];
      var tP = self.bubbleData.arkoProdVals[val-1];
      var name = '';
      if(self.options.checkData.SWITCH == 0){
    	  name = tP.NAME+'->'+fP.NAME;
      }else{
    	  name = fP.NAME+'->'+tP.NAME;
      }
      $(self.options.bubbleSeqSecModal).find('.modal-header h4.modal-title').text(name);
      self.container.bubbleSeqTimeDiffPanel && self.container.bubbleSeqTimeDiffPanel.highcharts() && self.container.bubbleSeqTimeDiffPanel.highcharts().destroy();
      self.container.bubbleSeqTimeDiffPanel && self.container.bubbleSeqTimeDiffPanel.remove();
      $(self.options.bubbleSeqSecModal).find('.modal-body').empty();
      
      var data = self._getBubbleSeqSecData(pi,val);
      var tData = self._getBubbleSeqSecTabData(data[0].data);
      
      self.container.bubbleSeqTimeTable = $('<table>',{'class':'table'});
      var head = $('<thead>');
      var tr = $('<tr>');
      $.each(self.options.bubbleSeqTimeTab,function(index,item){
        tr.append($('<th>',{text:item.text,style:item.css}));
      });
      head.append(tr);
      self.container.bubbleSeqTimeTable.append(head);
      var trD = $('<tr>');
      trD.append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.day,{format:"#,##0", locale:"cn"})}))
         .append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.min,{format:"#,##0", locale:"cn"})}))
         .append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.max,{format:"#,##0", locale:"cn"})}))
         .append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.avg,{format:"#,##0.00", locale:"cn"})}))
         .append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.mid,{format:"#,##0", locale:"cn"})}))
         .append($('<td>',{'style':'text-align:center',text:$.formatNumber(tData.eight,{format:"#,##0", locale:"cn"})}));
      self.container.bubbleSeqTimeTable.append(trD);
      
      $(self.options.bubbleSeqSecModal).find('.modal-body').append(self.container.bubbleSeqTimeTable);
      
      self.container.bubbleSeqTimeDiffPanelDiv = $('<div>',{style:'margin-top:10px;'});
      $(self.options.bubbleSeqSecModal).find('.modal-body').append(self.container.bubbleSeqTimeDiffPanelDiv);
      self.container.bubbleSeqTimeDiffPanel = self.container.bubbleSeqTimeDiffPanelDiv.highcharts({
        chart: {
            type: 'spline',
            height: 200
        },
        title:'',
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        series: data,
        xAxis: {
          title: {
            enabled: true,
            text: '时间间隔'
          },
        },
        yAxis: {
          title:{
            enabled: true,
            text: '人数'
          },
          arkoTipVal: self.options.bubbleSecChartTip
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        tooltip: {
            formatter: function(){
              if(!this.series.yAxis.userOptions.arkoTipVal[this.x-1]){
                return;
              }
              var head= '<small>间隔分布</small><br/>';
              var body = '<label>人数:</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoTipVal[this.x-1].p,{format:"#,###", locale:"cn"})+'</span><br/>'+
                         '<label>时间间隔:</label><span>'+$.formatNumber(this.x,{format:"#,###", locale:"cn"})+'</span><br/>'+
                         '<label>占比:</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoTipVal[this.x-1].p1,{format:"#,##0.0%", locale:"cn"})+'</span><br/>'+
                         '<label>累计占比:</label><span>'+$.formatNumber(this.series.yAxis.userOptions.arkoTipVal[this.x-1].p2,{format:"#,##0.0%", locale:"cn"})+'</span><br/>';

              
              return head + body;
            }
        }
      });
      $(self.options.bubbleSeqSecModal).find();
      
      $(self.options.bubbleSeqSecModal).modal('toggle');
    },
    _getBubbleSeqSecData: function(pi,val){
      var self = this;
      var data = [{name:'人数',data:[]}];
      
      data[0].data = Enumerable.From(self.options.cache.bubbleData).Where(("$.TAG=='{0}' && $.PID =='{1}' && $.p"+val+">0").format(2,pi)).Select("value, index => [value.TIMEDIFF,value.p"+val+"]").OrderBy('$[0]').ToArray();
      
      return data;
    },
    _getBubbleSeqSecTabData: function(baseData){
      var self = this;
      var len = baseData.length;
      var data = Enumerable.From(baseData).GroupBy('$!=null','','key,item=>{avg:item.Sum("$[0]*$[1]")/item.Sum("$[1]"),min:item.Min("$[0]"),max:item.Max("$[0]"),sum:item.Sum("$[1]")}').ToArray()[0];
      data.day = self.options.dayLen;
      data.mid = baseData[len /2 | 0][0];
      data.eight = baseData[len * 3 /4 | 0][0];
      
      var sum = data.sum;
      self.options.bubbleSecChartTip = [];
      var tSum = 0;
      $.each(baseData,function(index,item){
        var v = {};
        v.p = item[1];
        v.p1 = item[1] / sum;
        tSum += item[1];
        v.p2 = tSum / sum;
        self.options.bubbleSecChartTip[item[0]-1] = v;
      });
      
      return data;
    },
    _reBuildBubbleTable: function(){
      var self = this;
      //首先清空数据 然后 再进行界面的重构造
      if(self.options.bubbleStatus == 1){
        self.container.bubbleBtn&&self.container.bubbleBtn.bootstrapSwitch('destroy');
        self.container.bubbleDataTable.fnDestroy();
      }else if(self.options.bubbleStatus == 2){
        self.container.bubbleBtn.bootstrapSwitch('destroy');
        self.container.bubble.highcharts() && self.container.bubble.highcharts().destroy();
      }
      // 清空数据
      if(self.options.bubbleStatus == 2){
        self.container.bubbleLeftDiv.hide();
        self.container.bubbleRightDiv.hide();
        self.container.bubble&&self.container.bubble.empty();
      }
      self.container.bubbleBtn&&self.container.bubbleBtnDiv.remove();
      self.container.bubbleDataTable && self.container.bubbleDataTable.remove();
      self.container.bubbleTabLeftDiv&&self.container.bubbleTabLeftDiv.remove();
      
      if(self.options.checkData.TAB == 3){
        self._buildSeqBubbleTable();
      }else{
        self._buildBubbleTable();
      }
      $('.popovers').popover();
    },
    _getBubbleData: function(data){
      var self = this;
      data =  Enumerable.From(data).Where("$.TAG=='{0}'".format(self.options.checkData.SWITCH)).OrderBy('$.PID').ToArray();
      var baseData = {};
      var ftData = null;
      for(var i = 0 ; i < data.length ; i++){
        if(self.options.checkData.PID == data[i].PID){
          baseData = data[i];
          ftData = data[i];
        }
      }
      var pi = self.options.checkData.PID;
      var returnData = [];
      for(var i = 1 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
        var ttData = null;
        for(var j = 0 ; j < data.length ; j++){
          if(i == data[j].PID){
            ttData = data[j];
          }
        }
        
        var v = {};
        v.p = self.bubbleData.arkoProdVals[i-1].NAME;
        v.n = !baseData['p'+i] ? 'NaN' :$.formatNumber(baseData['p'+i],{format:"#,###", locale:"cn"});
        if(!ftData || ftData['p'+pi] == 0){
          v.i = 'NaN';
        }else{
          v.i = $.formatNumber(baseData['p'+i] / ftData['p'+pi],{format:"#,##0.00%", locale:"cn"});
        }
        if(!ttData || ttData['p'+i] == 0){
          v.c = 'NaN';
        }else{
          v.c = $.formatNumber(baseData['p'+i] / ttData['p'+i],{format:"#,##0.00%", locale:"cn"});
        }
        if(!ftData || ftData['s'+pi] == 0){
          v.o1 = 'NaN';
        }else{
          v.o1 = $.formatNumber(baseData['s'+i] / ftData['s'+pi],{format:"#,##0.00%", locale:"cn"});
        }
        if(!ttData || ttData['s'+i] == 0){
          v.o2 = 'NaN';
        }else{
          v.o2 = $.formatNumber(baseData['s'+i] / ttData['s'+i],{format:"#,##0.00%", locale:"cn"});
        }
        
        returnData.push(v);
      }
      return returnData;
    },
    _getSeqBubbleData: function(data,vv,swiv){
      var self = this;
      var data = [];
      var itemGrpStr1 = '{PID:key,';
      for(var i=1 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
        if(i!=1)
          itemGrpStr1 += ',';
        itemGrpStr1 += ('p'+i+':item.Sum("$.p'+i+'")');
        itemGrpStr1 += ',avg'+i+':item.Sum("$.TIMEDIFF*$.p'+i+'")/item.Sum("$.p'+i+'")';
      }
      itemGrpStr1 += '}';
      var baseP1Val = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}' && $.PID =='{1}'".format(0,0)).ToArray();
      var baseP2Val = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}' && $.PID =='{1}'".format(0,1)).ToArray();
      var baseS2PVal = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(1)).ToArray();
      var baseP2PVal = Enumerable.From(self.options.cache.bubbleData).Where("$.TAG=='{0}'".format(2)).GroupBy('$.PID','','key,item=>'+itemGrpStr1,'').ToArray();
      var fPid = self.options.checkData.PID;
      var baseP2PValObj =null;
      if(self.options.checkData.SWITCH == 0){
        for(var i = 1 ; i <= baseP2PVal.length ; i++){
          if(fPid == baseP2PVal[i-1].PID){
            baseP2PValObj = baseP2PVal[i-1];
          }
        }
      }else{
        baseP2PValObj = {};
        baseP2PValObj.PID = fPid;
        for(var i = 1,j = 0 ; i <=  self.bubbleData.arkoProdVals.length ; i++){
          var item = null;
          if(i == baseP2PVal[j].PID){
            item = baseP2PVal[j];
            j++;
          }
          baseP2PValObj['p'+i] = !item ? 0 : item['p'+fPid];
          baseP2PValObj['avg'+i] = !item ? 0 : item['avg'+fPid];
        }
      }
      for(var i = 1 ; i<=  self.bubbleData.arkoProdVals.length ; i++){
        var v = {};
        var tfPid = fPid,ttPid = i;
        if(self.options.checkData.SWITCH == 0){
          v.p =  self.bubbleData.arkoProdVals[fPid-1].NAME +' -> '+self.bubbleData.arkoProdVals[i-1].NAME;
          tfPid = fPid;
          ttPid = i;
        }else{
          v.p =  self.bubbleData.arkoProdVals[i-1].NAME +' -> '+self.bubbleData.arkoProdVals[fPid-1].NAME;
          tfPid = i;
          ttPid = fPid;
        }
        v.p= v.p;
        v.t1 =$.formatNumber((baseP1Val[0]['p'+tfPid]/baseP1Val[0]['p0']) ,{format:"#,##0.00%", locale:"cn"});
        v.t2 =$.formatNumber((baseP2Val[0]['p'+ttPid]/baseP2Val[0]['p0']),{format:"#,##0.00%", locale:"cn"});
        v.t3 = !baseP2PValObj || baseP1Val[0]['p'+tfPid] == 0 ? 'NaN' : $.formatNumber((baseP2PValObj['p'+i]/baseP1Val[0]['p'+tfPid]),{format:"#,##0.00%", locale:"cn"});
        v.t4 = !baseP2PValObj || (baseS2PVal[0]['p'+ttPid] * baseP1Val[0]['p'+tfPid]) == 0 ? 'NaN' : $.formatNumber(((baseP2PValObj['p'+i] * baseP1Val[0]['p0'])/(baseS2PVal[0]['p'+ttPid] * baseP1Val[0]['p'+tfPid])),{format:"#,##0.00%", locale:"cn"});
        v.t5 = !baseP2PValObj || baseP2Val[0]['p'+ttPid] == 0 ? 'NaN' : $.formatNumber((baseP2PValObj['p'+i] / baseP2Val[0]['p'+ttPid]),{format:"#,##0.00%", locale:"cn"});
        v.avg =!baseP2PValObj ? '0.00' : $.formatNumber(baseP2PValObj['avg'+i],{format:"#,##0.00", locale:"cn"});
        if(v.avg == 0){
          v.secLink = '<a class="btn btn-default" data-toggle="modal" data-val="'+self.bubbleData.arkoProdVals[i-1].ID+'">间隔分布</a>';
        }else{
          v.secLink = '<a class="btn btn-primary" data-toggle="modal" data-val="'+self.bubbleData.arkoProdVals[i-1].ID+'">间隔分布</a>';
        }
        if(swiv == 0){
          vv[0] = v.t1;
        } else if(swiv == 1){
          vv[0] = v.t2;
        }
        data.push(v);
      }
      
      return data;
    },
    //切换标签
    _bubbleTabHandle: function(e, data){
      var self = this;
      var $el = $(data.el), val = data.value;
      if(val == true){
        self.options.checkData.SWITCH = 0;
      }else{
        self.options.checkData.SWITCH = 1;
      }
      if(self.options.checkData.PID == 0){
        self._reBuildBubblePanel(1);  
      }else{
        self._reBuildBubbleTable();
      }
    },
    _clickBubbleLabelHandler: function(args){
      var self = this.self;
      var target = $(args.target);
      var text = target.text();
      if('后' == text){
        text = target.next().text();
        self.options.checkData.SWITCH = 1;
      }
      if(text.match('^先/')){
        text = text.replace('先/','');
        self.options.checkData.SWITCH = 0;
      }
      self.options.changeLabel.apply(this,[text]);
    },
    rebuildSeq: function(data){
      var self = this;
      self.options.checkData = data.choose;
      self.options.cache = data.cache;
      if(self.options.checkData.PID == 0){
        self.options.bubbleBtnStatus = data.bubbleBtnStatus;
        self._reBuildBubblePanel(1);  
      }else{
        self._reBuildBubbleTable();
      }
    }
  };
  
  // 注册jQuery对象
  $.fn.cubeModule = function(options) {
    var isMethodCall = typeof options === "string";
    var args = Array.prototype.slice.call( arguments, 1 );
    var returnValue = this;

    // 防止调用内部方法
    if ( isMethodCall && options.charAt( 0 ) === "_" ) {
      return returnValue;
    }

    if ( isMethodCall ) {
      this.each(function() {
        var instance = $.data( this, 'cubeModule' ),
          methodValue = instance && $.isFunction( instance[options] ) ?
            instance[ options ].apply( instance, args ) :
            instance;

        if ( methodValue !== instance && methodValue !== undefined ) {
          returnValue = methodValue;
          return false;
        }
      });
    } else {
      var instance = $.data( this[0], 'cubeModule' );
      if ( !instance ) {
        instance = new CubeModule( this[0], options );
        $.data( this[0], 'cubeModule', instance);
        return instance;
      }
    }

    return returnValue;
  };
  
})(jQuery, window , document);

