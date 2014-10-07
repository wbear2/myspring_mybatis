
/*********************************************
 *           改造 javascript 对象原型
 *********************************************/

// 首字母大写
if (!''.upperFirstLetter) {
  String.prototype.upperFirstLetter = function() {
    return this.replace(/\b\w+\b/g, function(word) {
      return word.substring(0,1).toUpperCase( ) +  word.substring(1);
    });
  };
}

// 移除首位空格
if (!''.trim) {
  String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
  };
}

// 移除左侧空格
if (!''.trimLeft) {
  String.prototype.trimLeft = function () {
    return this.replace(/(^\s*)/g, "");
  };
}

// 移除右侧空格
if (!''.trimRight) {
  String.prototype.trimRight = function () {
    return this.replace(/(\s*$)/g, "");
  };
}

// 格式化字符串
if (!''.format) {
  String.prototype.format = function () {
    var result = this;

    for (var i = 0; i < arguments.length; i++) {
      result = result.replace('{' + i + '}', arguments[i]);
    }

    return result;
  };
}

// 格式化百分数
if (!Number.prototype.formatPercent) {
  Number.prototype.formatPercent = function (digits) {
    return (this * 100).toFixed(digits) + '%';
  }
}


//模板解析
//例: <%= title %>, 传入 {title: '标题'}
if(!''.parseTemplate) {
String.prototype.parseTemplate = function(data) {
 var str = this.toString();
 var result;
 var pattern = new RegExp("<%=\\s*([a-zA-Z0-9_\.]+)\\s*%>");
   
 while ((result = pattern.exec(str)) != null) {
   var k = result[1].split('.').reverse();
   var t = data;
   var i = null;
   var v = '';
   try {
     while((i = k.pop()) && t) {
       t = t[i];
     }
     v = t || '';
   } catch (err) { }
   
   str = str.replace(new RegExp(result[0],"g"),v);
 }
 return str;
}
}

// 查找在数组中的索引
if (![].indexOf) {
  Array.prototype.indexOf = function (obj) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  };
}

// ======================================= 获取URL参数 ===================================
request = {
  QueryString : function(item){
       var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
    return svalue ? svalue[1] : svalue;
    }
};

// ================================== 浏览器类型和版本探测 ================================
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

BrowserDetect.init();

// 全局变量
var __data__ = {}, __cache__ = {}, __cache_agg__ = {}, choose = {}, charts = [], rid = -1;

//构造选择器
var buildSelector = function (element, list) {
  for(var i in list) {
   var grp = list[i];
   var menu = $('<li>', {class: 'dropdown'});
   var menu_link = $('<a>', {class: 'dropdown-toggle', href: 'javascript:;'});
   var menu_label = $('<span>', {text: grp.name});
   var menu_icon = $('<b>', {class: 'caret'});
   var menu_items = $('<ul>', {class: 'dropdown-menu', group: grp.group});
   
   if(grp.maxWidth)
     menu_link.css('max-width', grp.maxWidth);
   
   if(grp.items && grp.items.length > 0) {
     menu_link.attr('data-toggle', 'dropdown');
     
     for(var j in grp.items) {
       menu_items.append($('<li>').append($('<a>', {href: 'javascript:;', text: grp.items[j]})));
     }
   }
   
   grp.event && menu_items.find('a').on('click', grp.event);
   
   menu_link.append(menu_label);
   
   if(grp.items && grp.items.length)
     menu_link.append(menu_icon);
   
   menu.append(menu_link);
   
   if(menu_items.find('li').length > 0)
     menu.append(menu_items);
   
   element.append(menu);
  }
};

// 维度切换事件
var dimSwitch = function () {
  var element = $(this);
  var parent = element.parents('[group]');
  var group = parent.attr('group');
  
  choose[group] = element.text();
  element.parents('li:eq(1)').find('a span:eq(0)').text(choose[group]);
  
  reloadData();
}

var seqTab = [
  {ID:1,NAME:'购物篮交叉购买'},
  {ID:2,NAME:'会员的交叉购买'},
  {ID:3,NAME:'会员的先后购买'}
];

function data(){
  var data = null;
  var chooseVal = self.getChooseVal();
  if(!__data__.seqcubeseq['s'+chooseVal.SID] || !__data__.seqcubeseq['s'+chooseVal.SID]['m'+chooseVal.MID] || !__data__.seqcubecross['s'+chooseVal.SID] || !__data__.seqcubecross['s'+chooseVal.SID]['m'+chooseVal.MID]){
    $.ajax('/arko/get/{0}/seqchart.do?MID={1}&SID={2}'.format( rid,chooseVal.MID,chooseVal.SID),{async:false})
          .success(function(data){
            if(!__data__.seqcubeseq['s'+chooseVal.SID])
              __data__.seqcubeseq['s'+chooseVal.SID]={};
            __data__.seqcubeseq['s'+chooseVal.SID]['m'+chooseVal.MID] = data.seqcubeseq;
            if(!__data__.seqcubecross['s'+chooseVal.SID])
              __data__.seqcubecross['s'+chooseVal.SID]={};
            __data__.seqcubecross['s'+chooseVal.SID]['m'+chooseVal.MID] = data.seqcubecross;
          });
    if(chooseVal.TAB == 3){
      data = Enumerable.From(__data__.seqcubeseq['s'+chooseVal.SID]['m'+chooseVal.MID]).ToArray();;
    }else{
      data = Enumerable.From(__data__.seqcubecross['s'+chooseVal.SID]['m'+chooseVal.MID]).Where("$.TABTAG=='{0}'".format(chooseVal.TAB - 1)).ToArray();
    }
  }else{
    if(chooseVal.TAB == 3){
      data = Enumerable.From(__data__.seqcubeseq['s'+chooseVal.SID]['m'+chooseVal.MID]).ToArray();;
    }else{
      data = Enumerable.From(__data__.seqcubecross['s'+chooseVal.SID]['m'+chooseVal.MID]).Where("$.TABTAG=='{0}'".format(chooseVal.TAB - 1)).ToArray();
    }
  }
  return data;
}

// 初始化
function init() {
  var prod = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}'".format(0)).OrderBy('$.ID').Select("$.NAME").ToArray();
  var store = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}'".format(1)).OrderBy('$.ID').Select("$.NAME").ToArray();
  var mbr = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}'".format(2)).OrderBy('$.ID').Select("$.NAME").ToArray();
  choose.PROD_GRP = prod[0];
  choose.STORE_GRP = store[0];
  choose.MBR_GRP = mbr[0];
//  choose.SEQ_TAB = '购物篮交叉购买';
  showParameter();
  var options = [{
      name : prod[0],
      group : 'PROD_GRP',
      css : 'fa fa-tasks',
      event : dimSwitch,
      items : prod
    }, {
      name : store[0],
      group : 'STORE_GRP',
      css : 'fa fa-flag',
      event : dimSwitch,
      items : store
    }, {
      name : mbr[0],
      group : 'MBR_GRP',
      css : 'fa fa-user',
      event : dimSwitch,
      items : mbr
    }, {
      name : '{0} - {1}'.format(__data__.params.period.begin, __data__.params.period.end),
      group : 'PERIOD',
      maxWidth : 180
    }, {
      name : '恢复默认',
      group : 'DEFAULT',
      css: 'fa fa-cog',
      event: null,
      items: null
    }/*, {
      name: '购物篮交叉购买',
      group: 'SEQ_TAB',
      css: 'fa fa-user',
      event: dimSwitch,
      items: Enumerable.From(seqTab).Select("$.NAME").ToArray()
    }*/
  ];
  
  buildSelector($("#main-content nav ul:eq(0)"), options);
  
  $('#nav-accordion').dcAccordion({
    eventType : 'click',
    autoClose : true,
    saveState : true,
    disableLink : true,
    speed : 'slow',
    showCount : false,
    autoExpand : true,
    classExpand : 'dcjq-current-parent'
  });
  
  build();
}

function getList(list) {
  var tmp = [];
  for(var i in list) {
    var item = list[i];
    !tmp[item.type] && (tmp[item.type] = [])
    tmp[item.type].push(item.name);
  }
}

function showParameter() {
  var json = __data__.report;
  
  var filter = [], tmp = [];
  var params = {title: null, filter: {}, group: {}, period: {}};
  
  params.type = json.reportType.name;
  params.title = json.name;
  
  tmp = getList(json.productGroupFilter);
  
  for(var i in tmp) {
    var type = i == 0 ? '分类: ' : i == 1 ? '品牌: ' : i == 2 ? '自定义组: ' : '';
    tmp[i] && filter.push('{0}{1}'.format(type, tmp[i].join(' 或 ')));
  }
  
  params.filter.product = filter.length > 0 ? '满足{0}'.format(filter.join('<br>并且')) : '无';
  filter = [];
  
  tmp = getList(json.storeGroupFilter);
  
  for(var i in tmp) {
    var type = i == 6 ? '区域: ' : i == 7 ? '自定义组: ' : i == 8 ? '门店属性: ' : '';
    tmp[i] && filter.push('{0}{1}'.format(type, tmp[i].join(' 或 ')));
  }
  
  params.filter.store = filter.length > 0 ? '满足{0}'.format(filter.join('<br>并且')) : '无';
  filter = [];
  
  tmp = getList(json.memberGroupFilter);
  
  for(var i in tmp) {
    var type = i == 3 ? '用户标签: ' : i == 4 ? '自定义组: ' : i == 5 ? '' : '';
    tmp[i] && mgf.push('{0}{1}'.format(type, tmp[i].join(' 或 ')));
  }
  
  params.filter.member = filter.length > 0 ? '满足{0}'.format(filter.join('<br>并且')) : '无';
  filter = [];
  tmp = [];
  
  for(var i in json.productGroup) {
    tmp.push(json.productGroup[i].name);
  }
  
  params.group.product = tmp.length > 0 ? tmp.join(', ') : '无';
  tmp = [];
  
  for(var i in json.storeGroup) {
    tmp.push(json.storeGroup[i].name);
  }
  
  params.group.store = tmp.length > 0 ? tmp.join(', ') : '无';
  tmp = [];
  
  for(var i in json.memberGroup) {
    tmp.push(json.memberGroup[i].name);
  }
  
  params.group.member = tmp.length > 0 ? tmp.join(', ') : '无';
  tmp = [];
  
  var beginDate = moment(json.period[0].timeStart);
  var endDate = moment(json.period[0].timeEnd);
  var week = endDate.diff(beginDate, 'week') + 1;
  
  params.period.begin = beginDate.format("YYYY/MM/DD");
  params.period.end = endDate.format("YYYY/MM/DD");
  params.period.week = week;
  params.period.dayLen = endDate.diff(beginDate,'day');
  
  __data__.params = params;
  
  var html = "<tr><td>区域</td><td><%=filter.store%></td><td><%=group.store%></td></tr>" +
             "<tr><td>产品</td><td><%=filter.product%></td><td><%=group.product%></td></tr>" + 
             "<tr><td>会员</td><td><%=filter.member%></td><td><%=group.member%></td></tr>";
  
  $(".rp-name").html('【{0}】 {1}'.format(__data__.params.type, __data__.params.title));
  document.title=__data__.params.title;
  $(".modal-title").html(__data__.params.title);
  $(".modal-body .btn-group button:eq(1)").html('{0} - {1}'.format(__data__.params.period.begin, __data__.params.period.end));
  
  
  $(".modal-dialog table tbody").html(html.parseTemplate(__data__.params));
}

var chooseVal = {};
function build() {
  
	var dayLen = __data__.params.period.dayLen;
  // 销毁已有图表
  while(item = charts.pop()) {
    item.destroy();
  }
  chooseVal = {PID:0,MID:0,SID:0,TAB:1,SWITCH:0};
  prodModel = $("#main-content .wrapper :eq(0) .row :eq(0)").cubeModule({
    headTitle: '产品组选择',
    returnButton: $('#returnButton'),
    cache: {bubbleData:data(),prods:Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}'".format(0)).ToArray(),auxconfig:Enumerable.From(__data__.seqcubeauxinfo).Where("$.MID=='{0}' && $.SID == '{1}' && $.TABTAG == '{2}'".format(chooseVal.MID,chooseVal.SID,chooseVal.TAB - 1)).ToArray(),buyAvg:Enumerable.From(__data__.seqcubebuy).Where("$.MID=='{0}' && $.SID == '{1}' && $.TABTAG == '{2}'".format(chooseVal.MID,chooseVal.SID,chooseVal.TAB - 1)).ToArray()},
    moduleType: 3,
    bubbleSec: 5,
    bubbleNames:['1-100','101-10000','1001-15422','154224-787945','1545454-8988888','H','J','K','L','M'],
    checkData: getChooseVal(),
    tabVals:[['有','只有'],['买','只买'],['先','后']],
    bubbleBtnStatus: true,
    headTabTitle:seqTab,
    changeLabel: changeLabelVal,
    tabLabelHandler: tabLabelHandler,
    bubbleSeqSecModal: "#main-content .wrapper :eq(0) .modal :eq(0)",
    bubbleTitle: [[{title:'购物篮的商品两两交叉购买',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'购物篮中',titleTabRight:'A&B',titleBot:'气泡大小：购物篮数量；颜色深浅，平均购物篮金额'},
                  {title:'会员的交叉购买',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'会员中',titleTabRight:'A&B',titleBot:'气泡大小：会员数量；颜色深浅，人均花费'},
                  {title:'会员的先后购买数据',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'购物篮中',titleTabRight:'A',titleBot:'气泡大小：会员数量；颜色深浅，提升度'}],
                  [{title:'与其他品类的购物篮两两交叉购买',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'购物篮中',titleTabRight:'A&B',titleBot:'气泡大小：购物篮数量；颜色深浅，平均购物篮金额'},
                  {title:'与其他品类的会员交叉购买',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'会员中',titleTabRight:'A&B',titleBot:'气泡大小：会员数量；颜色深浅，人均花费'},
                  {title:'与其他品类的会员先后购买数据',titleExp:'平均每位会员在分析时间段内累计的花费', titleTabLeft:'',titleTabRight:'买',titleBot:'气泡大小：会员数量；颜色深浅，提升度'}]],
    dayLen: dayLen,
    filterTitle: ['购物篮数滤镜','会员人数滤镜','会员人数滤镜']
  });
  
}
function getChooseVal(){
  chooseVal.SWITCH = 0;
  chooseVal.PID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(0,choose.PROD_GRP)).Select('$.ID').ToArray();
  chooseVal.SID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(1,choose.STORE_GRP)).Select('$.ID').ToArray();
  chooseVal.MID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(2,choose.MBR_GRP)).Select('$.ID').ToArray();
//  chooseVal.TAB = Enumerable.From(seqTab).Where("$.NAME=='{0}'".format(choose.SEQ_TAB)).Select('$.ID').ToArray();
  return chooseVal;
}
  
function changeLabelVal(labelText){
  $("#main-content nav ul:eq(0) ul[group='PROD_GRP']").prev().find('span').text(labelText);
  choose.PROD_GRP = labelText;
  reloadData();
}
  
function tabLabelHandler(tag,v,flag){
  var val = {'PID':'PROD_GRP','SID':'STORE_GRP','MID':'MBR_GRP'};
  if(flag){
    $("#main-content nav ul:eq(0) ul[group='PROD_GRP']").prev().find('span').text('所有产品组');
    choose[val[tag]] = '所有产品组';
  }else{
    chooseVal[tag] = v;
  }
  
  reloadData();
}

function reloadData(){
//  chooseVal.SWITCH = 0;
  chooseVal.PID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(0,choose.PROD_GRP)).Select('$.ID').ToArray();
  chooseVal.SID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(1,choose.STORE_GRP)).Select('$.ID').ToArray();
  chooseVal.MID = Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}' && $.NAME=='{1}'".format(2,choose.MBR_GRP)).Select('$.ID').ToArray();
//  chooseVal.TAB = Enumerable.From(seqTab).Where("$.NAME=='{0}'".format(choose.SEQ_TAB)).Select('$.ID').ToArray();
  
  var bubbleBtnStatus = chooseVal.TAB == 3 ? false : true;
  prodModel.rebuildSeq({choose:chooseVal,cache: {bubbleData:data(),prods:Enumerable.From(__data__.seqcubesum).Where("$.TAG=='{0}'".format(0)).ToArray(),auxconfig:Enumerable.From(__data__.seqcubeauxinfo).Where("$.MID=='{0}' && $.SID == '{1}' && $.TABTAG == '{2}'".format(chooseVal.MID,chooseVal.SID,chooseVal.TAB - 1)).ToArray(),buyAvg:Enumerable.From(__data__.seqcubebuy).Where("$.MID=='{0}' && $.SID == '{1}' && $.TABTAG == '{2}'".format(chooseVal.MID,chooseVal.SID,chooseVal.TAB - 1)).ToArray()},bubbleBtnStatus:bubbleBtnStatus});
}

// 从服务器获取数据
function loadData() {
  $.getJSON('/arko/get/{0}/seqchart.do?i=1'.format( rid), function (json) {
    __data__ = json;
    __data__.report = _report;
    __data__.seqcubeseq = {};
    __data__.seqcubecross = {};
    init();
  });
}

var _report = null;
//获取报告数据
function loadReport() {
$.getJSON('/arko/get/{0}/report.do'.format(rid), function (json) {
  _report = json;
 loadData();
});
}

$(function () {

window.location.href.match(/\/(\d+)\//g);
rid = RegExp.$1;

if(!rid || isNaN(rid))
 return;

loadReport();

});

