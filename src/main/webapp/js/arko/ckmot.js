
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
    	var val = arguments[i];
    	(val == null) && (val = '');
      result = result.replace('{' + i + '}', val);
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

// 模板解析
// 例: <%= title %>, 传入 {title: '标题'}
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

var TreeView = function () {

    return {
        //main function to initiate the module
        init: function (selector) {

            var DataSourceTree = function (options) {
                this._data  = options.data;
                this._delay = options.delay;
            };

            DataSourceTree.prototype = {

                data: function (options, callback) {
                    var self = this;

                    setTimeout(function () {
                        var data = $.extend(true, [], options && options.items ? options.items : self._data);

                        callback({ data: data });

                    }, this._delay)
                }
            };

            var dataSource = new DataSourceTree({
              data: [
                { name: '所有销售', type: 'folder', expand: true, items: [
                  { name: '总计指标', type: 'folder', items: [
                    { name: '合计销售金额', type: 'item', metric: 'TOT_SALES_VAL' },
                    { name: '合计销售数量', type: 'item', metric: 'TOT_SALES_QTY' },
                    { name: '合计购买人数', type: 'item', metric: 'TOT_MBR_CNT' },
                    { name: '合计购买次数', type: 'item', metric: 'TOT_VST_CNT' }
                  ] },
                  { name: '人均指标', type: 'folder', items: [
                    { name: '人均消费金额', type: 'item', metric: 'AVG_MBR_SALES_AMT' },
                    { name: '人均消费数量', type: 'item', metric: 'AVG_MBR_QTY' },
                    { name: '人均消费次数', type: 'item', metric: 'AVG_MBR_VST_CNT' },
                    { name: '人均购买门店数', type: 'item', metric: 'AVG_PUR_STORE_CNT' },
                    { name: '人均购买商品数', type: 'item', metric: 'AVG_PUR_PROD_CNT' },
                    { name: '人均购买品牌数', type: 'item', metric: 'AVG_PUR_BRND_CNT' },
                    { name: '人均购买小类数', type: 'item', metric: 'AVG_PUR_CATEGORY1_CNT' },
                    { name: '人均购买大类数', type: 'item', metric: 'AVG_PUR_CATEGORY3_CNT' }
                  ] },
                  { name: '次均指标', type: 'folder', items: [
                    { name: '平均每次消费金额', type: 'item', metric: 'AVG_VST_AMT' },
                    { name: '平均每次消费数量', type: 'item', metric: 'AVG_VST_QTY' },
                    { name: '平均每次购买商品数', type: 'item', metric: 'AVG_VST_PROD_CNT' },
                    { name: '平均每次购买品牌数', type: 'item', metric: 'AVG_VST_BRAND' },
                    { name: '平均每次购买小类数', type: 'item', metric: 'AVG_VST_CATEGORY1' },
                    { name: '平均每次购买大类数', type: 'item', metric: 'AVG_VST_CATEGORY3' },
                    { name: '平均第一次重复购买时间间隔', type: 'item', metric: 'AVG_FIRST_INTERVAL' },
                    { name: '平均最近一次重复购买时间间隔', type: 'item', metric: 'AVG_LAST_INTERVAL' },
                    { name: '平均件单价', type: 'item', metric: 'AVG_QTY_AMT' }
                  ] },
                  { name: '占比类指标', type: 'folder', items: [
                    { name: '销售额占比', type: 'item', metric: 'MBR_AMT_RATIO' },
                    { name: '销售量占比', type: 'item', metric: 'MBR_QTY_RATIO' },
                    { name: '会员渗透率', type: 'item', metric: 'MBR_PENATRATION' },
                    { name: '购物篮渗透率', type: 'item', metric: 'VISIT_PENATRATION' }
                  ] }
                ] },
                { name: '促销销售', type: 'folder', expand: true, items: [
                  { name: '总计指标', type: 'folder', items: [
                    { name: '合计促销销售金额', type: 'item', metric: 'TOT_PROMT_AMT' },
                    { name: '合计促销销售数量', type: 'item', metric: 'TOT_PROMT_QTY' },
                    { name: '合计促销购买人数', type: 'item', metric: 'TOT_PROMT_MBR' },
                    { name: '合计促销购买次数', type: 'item', metric: 'TOT_PROMT_CNT' }
                  ] },
                  { name: '占比类指标', type: 'folder', items: [
                    { name: '促销销售额占比', type: 'item', metric: 'PROMT_AMT_RATIO' },
                    { name: '促销销售量占比', type: 'item', metric: 'PROMT_QTY_RATIO' },
                    { name: '促销会员渗透率', type: 'item', metric: 'PROMT_MBR_PENATRATION' },
                    { name: '促销购物篮渗透率', type: 'item', metric: 'PROMT_VST_PENATRATION' }
                  ] }
                ] },
                { name: '促销参与人群销售', type: 'folder', expand: true, items: [
                  { name: '人均指标', type: 'folder', items: [
                    { name: '促销参与人群人均消费金额', type: 'item', metric: 'AVG_MBR_PROMT_AMT' },
                    { name: '促销参与人群人均消费数量', type: 'item', metric: 'AVG_MBR_PROMT_QTY' },
                    { name: '促销参与人群人均消费次数', type: 'item', metric: 'AVG_MBR_PROMT_VST' }
                  ] },
                  { name: '占比类指标', type: 'folder', items: [
                    { name: '促销参与人群促销销售额占比', type: 'item', metric: 'PROMT_MBR_AMT_RATIO' },
                    { name: '促销参与人群促销销售量占比', type: 'item', metric: 'PROMT_MBR_QTY_RATIO' },
                    { name: '促销参与人群促销购物篮渗透率', type: 'item', metric: 'PROMT_MBR_VST_PENATRATION' }
                  ] },
                  { name: '指数类指标', type: 'folder', items: [
                    { name: '促销参与人群人均消费金额提升指数', type: 'item', metric: 'PROMT_AVG_MBR_AMT_LIFT_IDX' },
                    { name: '促销参与人群人均消费数量提升指数', type: 'item', metric: 'PROMT_AVG_MBR_QTY_LIFT_IDX' },
                    { name: '促销参与人群人均消费次数提升指数', type: 'item', metric: 'PROMT_AVG_MBR_VST_LIFT_IDX' }
                  ] }
                ] },
                { name: '促销购物篮销售', type:'folder', expand: true, items: [
                  { name: '次均指标', type: 'folder', items: [
                    { name: '平均促销购物篮金额', type: 'item', metric: 'AVG_PROMT_VST_AMT' },
                    { name: '平均促销购物篮商品销量', type: 'item', metric: 'AVG_PROMT_VST_QTY' }
                  ] },
                  { name: '占比类指标', type: 'folder', items: [
                    { name: '促销购物篮中促销销售额占比', type: 'item', metric: 'PROMT_VST_PROMT_AMT_RATIO' },
                    { name: '促销购物篮中促销销售量占比', type: 'item', metric: 'PROMT_VST_PROMT_QTY_RATIO' }
                  ] },
                  { name: '指数类指标', type: 'folder', items: [
                    { name: '平均促销购物篮金额提升指数', type: 'item', metric: 'AVG_PROMT_VST_AMT_LIFT_IDX' },
                    { name: '平均促销购物篮商品销量提升指数', type: 'item', metric: 'AVG_PROMT_VST_QTY_LIFT_IDX' }
                  ] }
                ]}
              ],
              delay: 400
            });

            $(selector).tree({
                selectable: true,
                dataSource: dataSource,
                loadingHTML: '<img src="/arko/images/input-spinner.gif"/>',
            });
            
        }

    };

}();

var commaify = function(number) {
	number = number + "";
    var re = /(-?\d+)(\d{3})/;
    while (re.test(number)) {
    	number = number.replace(re, "$1,$2");
    }
    return number;
};

// 定义字段对象
var Field = function(name, displayName, unit, digits, percentage, faqTitle, faqText) {
  this.name = name;
  this.displayName = displayName;
  this.unit = unit;
  this.digits = digits;
  this.percentage = percentage;
  this.fullName = unit ? '{0}({1})'.format(this.displayName, unit) : this.displayName;
  
  if(faqTitle || faqText) {
    if(!faqText) {
      faqText = faqTitle;
      faqTitle = '';
    }
    this.faq = {title: faqTitle, text: faqText};
  }
};

// 在 Field 的原型中增加 toString 方法
Field.prototype = {
  toString : function() {
    return this.name;
  }
};

// 定义一些字段名称
var Fields  = {
  AVG_CUST_PPU: new Field("AVG_CUST_PPU","所有消费者的件单价","元",2,false,"在分析时间段内，所有消费者(会员及非会员)单位数量商品的平均价格"),
  AVG_CUST_QTY: new Field("AVG_CUST_QTY","所有消费者的单次购买量","件",2,false,"在分析时间段内，所有消费者(会员及非会员)平均每次购买的商品数量"),
  AVG_CUST_SALES_AMT: new Field("AVG_CUST_SALES_AMT","所有消费者的单次花费","元",2,false,"在分析时间段内，所有消费者(会员及非会员)平均每次的购买金额"),
  AVG_FIRST_INTERVAL: new Field("AVG_FIRST_INTERVAL","新客人均第一次回购间隔","天",0,false,"如果新客在分析时间段内有发生一购转二购的行为，计算该类人群一购和二购间平均的时间间隔"),
  AVG_LAST_INTERVAL: new Field("AVG_LAST_INTERVAL","老客人均最近一次回购间隔","天",0,false,"如果老客在分析时间段内有两次及以上的购买记录，计算该类人群最近两次购物之间平均的时间间隔"),
  AVG_MBR_PROMT_AMT: new Field("AVG_MBR_PROMT_AMT","促销参与会员的人均促销花费金额","元",2,false),
  AVG_MBR_PROMT_QTY: new Field("AVG_MBR_PROMT_QTY","促销参与会员的人均促销购买数量","件",2,false),
  AVG_MBR_PROMT_VST: new Field("AVG_MBR_PROMT_VST","促销参与会员的人均促销购买次数","次",2,false),
  AVG_MBR_QTY: new Field("AVG_MBR_QTY","会员人均购买量","件",2,false,"平均每位会员在分析时间段内累计的购买数量"),
  AVG_MBR_SALES_AMT: new Field("AVG_MBR_SALES_AMT","会员人均花费","元",2,false,"平均每位会员在分析时间段内累计的花费"),
  AVG_MBR_SALES_QTY: new Field("AVG_MBR_SALES_QTY","会员人均购买量","件",2,false,"在分析时间段内，会员平均每次购买的商品数量"),
  AVG_MBR_VST_CNT: new Field("AVG_MBR_VST_CNT","会员人均购买次数","次",2,false,"在分析时间段内，平均每位会员购买的次数"),
  AVG_PROD_AMT: new Field("AVG_PROD_AMT","会员件单价","元",2,false,"在分析时间段内，会员单位数量商品的平均价格"),
  AVG_PROMT_VST_AMT: new Field("AVG_PROMT_VST_AMT","促销购物篮的平均促销品销售金额","元",2,false),
  AVG_PROMT_VST_QTY: new Field("AVG_PROMT_VST_QTY","促销购物篮的平均促销品销售数量","件",2,false),
  AVG_PROMT_VST_AMT_LIFT_IDX: new Field("AVG_PROMT_VST_AMT_LIFT_IDX","平均促销购物篮金额提升指数",null,2,true),
  AVG_PROMT_VST_QTY_LIFT_IDX: new Field("AVG_PROMT_VST_QTY_LIFT_IDX","平均促销购物篮商品销量提升指数",null,2,true),
  AVG_PUR_BRND_CNT: new Field("AVG_PUR_BRND_CNT","会员人均品牌宽度","个",2,false,"在分析时间段内，平均每位会员购买的品牌个数"),
  AVG_PUR_CATEGORY1_CNT: new Field("AVG_PUR_CATEGORY1_CNT","会员人均小类宽度","种",2,false,"在分析时间段内，平均每位会员购买的小类个数"),
  AVG_PUR_CATEGORY3_CNT: new Field("AVG_PUR_CATEGORY3_CNT","会员人均大类宽度","种",2,false,"在分析时间段内，平均每位会员购买的大类个数"),
  AVG_PUR_PROD_CNT: new Field("AVG_PUR_PROD_CNT","人均购买商品数","种",2,false),
  AVG_PUR_STORE_CNT: new Field("AVG_PUR_STORE_CNT","会员人均消费门店数","家",2,false,"在分析时间段内，平均每位会员在多少家门店中购物"),
  AVG_STORE_DAY_AMT: new Field("AVG_STORE_DAY_AMT","店均单日营业额","元",2,false,"在分析时间段内，平均每店每天的销售金额"),
  AVG_STORE_DAY_QTY: new Field("AVG_STORE_DAY_QTY","店均单日销售量","件",2,false,"在分析时间段内，平均每店每天的销售数量"),
  AVG_STORE_SALES_AMT: new Field("AVG_STORE_SALES_AMT","店均累计营业额","元",2,false,"平均每个店铺在分析时间段内累计的销售金额"),
  AVG_STORE_SALES_QTY: new Field("AVG_STORE_SALES_QTY","店均累计销售量","件",2,false,"平均每个店铺在分析时间段内累计的销售数量"),
  AVG_STORE_WEEK_AMT: new Field("AVG_STORE_WEEK_AMT","店均单周营业额","元",2,false,"在分析时间段内，平均每店每周的销售金额"),
  AVG_STORE_WEEK_QTY: new Field("AVG_STORE_WEEK_QTY","店均单周营业额","件",2,false,"在分析时间段内，平均每店每周的销售数量"),
  AVG_VST_AMT: new Field("AVG_VST_AMT","平均每次消费金额","元",2,false),
  AVG_VST_QTY: new Field("AVG_VST_QTY","平均每次消费数量","件",2,false),
  AVG_VST_PROD_CNT: new Field("AVG_VST_PROD_CNT","平均每次购买商品数","种",2,false),
  AVG_VST_BRAND: new Field("AVG_VST_BRAND","平均每次购买品牌数","种",2,false),
  AVG_VST_CATEGORY1: new Field("AVG_VST_CATEGORY1","平均每次购买小类数","种",2,false),
  AVG_VST_CATEGORY3: new Field("AVG_VST_CATEGORY3","平均每次购买大类数","种",2,false),
  AVG_FIRST_INTERVAL: new Field("AVG_FIRST_INTERVAL","平均第一次重复购买时间间隔","天",0,false),
  AVG_LAST_INTERVAL: new Field("AVG_LAST_INTERVAL","平均最近一次重复购买时间间隔","天",0,false),
  AVG_QTY_AMT: new Field("AVG_QTY_AMT","平均件单价","元",2,false),
  CATEGORY_BEST_CUST_RATIO: new Field("CATEGORY_BEST_CUST_RATIO","类别最佳购物者消费额占比",null,2,true),
  CATEGORY_SHARE_AMT: new Field("CATEGORY_SHARE_AMT","类别份额(价值)",null,2,true,"该类别销售金额占所有目标类别合计销售金额的百分比"),
  CATEGORY_SHARE_QTY: new Field("CATEGORY_SHARE_QTY","类别份额(数量)",null,2,true,"该类别销售数量占所有目标类别合计销售数量的百分比"),
  DAYS_ON_SALES: new Field("DAYS_ON_SALES","销售天数","天",0,false,"统计商品有成交的天数"),
  FIRST_INTERVAL: new Field("FIRST_INTERVAL","新客第一次回购间隔","天",0,false,"如果新客在分析时间段内有发生一购转二购的行为，计算其一购和二购间的时间间隔"),
  LAST_INTERVAL: new Field("LAST_INTERVAL","老客最近一次回购间隔","天",0,false,"如果老客在分析时间段内有两次及以上的购买记录，计算其最近两次购物之间的时间间隔"),
  MBR_AMT_RATIO: new Field("MBR_AMT_RATIO","会员销售额占比",null,2,true,"会员销售金额占所有消费者（会员和非会员）销售金额的百分比"),
  MBR_AVG_PPU: new Field("MBR_AVG_PPU","会员件单价","元",2,false,"在分析时间段内，会员单位数量商品的平均价格"),
  MBR_AVG_QTY: new Field("MBR_AVG_QTY","会员单次购买量","件",2,false,"在分析时间段内，会员平均每次购买的商品数量"),
  MBR_AVG_VST_AMT: new Field("MBR_AVG_VST_AMT","会员单次花费","元",2,false,"在分析时间段内，会员平均每次的购买金额"),
  MBR_GRP_NAME: new Field("MBR_GRP_NAME", "会员组"),
  MBR_PENATRATION: new Field("MBR_PENATRATION","会员渗透率",null,2,true,"购买该类别会员人数占购买所有目标类别会员人数的百分比"),
  MBR_PROMT_AMT_TOT: new Field("MBR_PROMT_AMT_TOT","促销会员的合计消费金额","元",2,false),
  MBR_PROMT_QTY_TOT: new Field("MBR_PROMT_QTY_TOT","促销会员的合计消费数量","件",0,false),
  MBR_PROMT_VST_TOT: new Field("MBR_PROMT_VST_TOT","促销会员的合计消费次数","次",0,false),
  MBR_QTY_RATIO: new Field("MBR_QTY_RATIO","会员销售量占比",null,2,true),
  MBR_RATIO: new Field("MBR_RATIO","会员人数占比",null,2,true),
  MBR_RATIO_ACCU: new Field("MBR_RATIO_ACCU","会员人数占比累计",null,2,true),
  MBR_VISIT_RATIO: new Field("MBR_VISIT_RATIO","会员购物篮占比",null,2,true),
  NON_MBR_AVG_AVG_PPU: new Field("NON_MBR_AVG_AVG_PPU","非会员件单价","元",2,false,"在分析时间段内，非会员单位数量商品的平均价格"),
  NON_MBR_AVG_QTY: new Field("NON_MBR_AVG_QTY","非会员单次购买量","件",2,false,"在分析时间段内，非会员平均每次购买的商品数量"),
  NON_MBR_AVG_SALES_AMT: new Field("NON_MBR_AVG_SALES_AMT","非会员单次花费","元",2,false,"在分析时间段内，非会员平均每次的购买金额"),
  NON_MBR_QTY: new Field("NON_MBR_QTY","非会员合计销售数量","件",0,false),
  NON_MBR_SALES_AMT: new Field("NON_MBR_SALES_AMT","非会员合计销售金额","元",2,false),
  NON_MBR_VST_CNT: new Field("NON_MBR_VST_CNT","非会员合计购买次数","次",0,false),
  PROD_CNT: new Field("PROD_CNT","产品数量","种",0,false,"在分析时间段内，有销售的商品种类数目"),
  PROD_GRP_NAME: new Field("PROD_GRP_NAME", "产品组"),
  PROMT_AVG_MBR_AMT_LIFT_IDX: new Field("PROMT_AVG_MBR_AMT_LIFT_IDX", "促销参与人群人均消费金额提升指数",null,2,true),
  PROMT_AVG_MBR_QTY_LIFT_IDX: new Field("PROMT_AVG_MBR_QTY_LIFT_IDX", "促销参与人群人均消费数量提升指数",null,2,true),
  PROMT_AVG_MBR_VST_LIFT_IDX: new Field("PROMT_AVG_MBR_VST_LIFT_IDX", "促销参与人群人均消费次数提升指数",null,2,true),
  PROMT_AMT_RATIO: new Field("PROMT_AMT_RATIO","促销销售金额占比",null,2,true),
  PROMT_MBR_AMT: new Field("PROMT_MBR_AMT","会员促销消费金额","元",2,false),
  PROMT_MBR_AMT_RATIO: new Field("PROMT_MBR_AMT_RATIO","促销购买会员的促销消费额占比",null,2,true),
  PROMT_MBR_PENATRATION: new Field("PROMT_MBR_PENATRATION","促销会员渗透率",null,2,true),
  PROMT_MBR_QTY: new Field("PROMT_MBR_QTY","会员促销消费数量","件",0,false),
  PROMT_MBR_QTY_RATIO: new Field("PROMT_MBR_QTY_RATIO","促销购买会员的促销消费量占比",null,2,true),
  PROMT_MBR_VST_CNT: new Field("PROMT_MBR_VST_CNT","会员促销消费次数","次",0,false),
  PROMT_MBR_VST_PENATRATION: new Field("PROMT_MBR_VST_PENATRATION","促销购买会员的促销购物篮渗透率",null,2,true),
  PROMT_QTY_RATIO: new Field("PROMT_QTY_RATIO","促销销售数量占比",null,2,true),
  PROMT_VST_AMT_TOT: new Field("PROMT_VST_AMT_TOT","促销购物篮的合计金额","元",2,false),
  PROMT_VST_PENATRATION: new Field("PROMT_VST_PENATRATION","促销购物篮渗透率",null,2,true),
  PROMT_VST_PROMT_AMT_RATIO: new Field("PROMT_VST_PROMT_AMT_RATIO","促销购物篮中的促销销售额占比",null,2,true),
  PROMT_VST_PROMT_QTY_RATIO: new Field("PROMT_VST_PROMT_QTY_RATIO","促销购物篮中的促销销售量占比",null,2,true),
  PROMT_VST_QTY_TOT: new Field("PROMT_VST_QTY_TOT","促销购物篮的合计数量","件",0,false),
  PUR_AMT_RATE: new Field("PUR_AMT_RATE","购买金额占比",null,2,true),
  PUR_AMT_RATE_ACCU: new Field("PUR_AMT_RATE_ACCU","购买金额占比累计",null,2,true),
  PUR_BRND_CNT: new Field("PUR_BRND_CNT","品牌宽度","种",0,false,"在分析时间段内，会员购买的品牌个数"),
  PUR_CATEGORY1_CNT: new Field("PUR_CATEGORY1_CNT","小类宽度","类",0,false,"在分析时间段内，会员购买的小类个数"),
  PUR_CATEGORY3_CNT: new Field("PUR_CATEGORY3_CNT","大类宽度","类",0,false,"在分析时间段内，会员购买的大类个数"),
  PUR_STORE_CNT: new Field("PUR_STORE_CNT","门店宽度","家",0,false,"在分析时间段内，会员在多少家门店中购物"),
  SALES_AMT_RATIO: new Field("SALES_AMT_RATIO","购买金额占比",null,2,true),
  STORE_GRP_NAME: new Field("STORE_GRP_NAME", "门店组"),
  STORE_SALES: new Field("STORE_SALES","销售店铺数量","家",0,false),
  TOT_CUST_CNT: new Field("TOT_CUST_CNT","合计购买人数","人",0,false),
  TOT_MBR_AGG: new Field("TOT_MBR_AGG","所有选择商品、区域、人群并集的合计购买会员数","人",0,false),
  TOT_MBR_CNT: new Field("TOT_MBR_CNT","合计购买会员人数", "人",0,false),
  TOT_MBR_SALES_QTY: new Field("TOT_MBR_SALES_QTY","会员累计购买量", "件",0,false),
  TOT_MBR_SALES_VAL: new Field("TOT_MBR_SALES_VAL","会员累计花费", "元",2,false),
  TOT_MBR_VST_CNT: new Field("TOT_MBR_VST_CNT","会员累计购买次数", "次",0,false),
  TOT_PROMT_AMT: new Field("TOT_PROMT_AMT","促销合计销售金额","元",2,false),
  TOT_PROMT_CNT: new Field("TOT_PROMT_CNT","促销合计销售次数","次",0,false),
  TOT_PROMT_MBR: new Field("TOT_PROMT_MBR","促销合计参与会员人数","人",0,false),
  TOT_PROMT_QTY: new Field("TOT_PROMT_QTY","促销合计销售数量","件",0,false),
  TOT_QTY_AGG: new Field("TOT_QTY_AGG","所有选择商品、区域、人群并集的合计销售数量","件",0,false),
  TOT_SALES_AMT_AGG: new Field("TOT_SALES_AMT_AGG","所有选择商品、区域、人群并集的合计销售金额","元",2,false),
  TOT_SALES_QTY: new Field("TOT_SALES_QTY","合计销售数量","件",0,false),
  TOT_SALES_VAL: new Field("TOT_SALES_VAL","合计销售金额","元",2,false),
  TOT_VST_AGG: new Field("TOT_VST_AGG","所有选择商品、区域、人群并集的合计购买次数","次",0,false),
  TOT_VST_CNT: new Field("TOT_VST_CNT","合计购买次数","次",0,false),
  VISIT_PENATRATION: new Field("VISIT_PENATRATION","购物篮渗透率",null,2,true),
  WKS_ON_SALES: new Field("WKS_ON_SALES","销售周数",'',0,false)
};

// 全局变量
var __data__ = {}, __cache__ = {}, __cache_agg__ = {}, choose = {}, charts = [], submetrics = {}, rid = -1, __timer__ = null;

// 构造选择器
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
    	var item = grp.items[j];
        menu_items.append($('<li>').append($('<a>', {href: 'javascript:;', text: item.name, value: item.value})));
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
}

// 维度切换事件
var dimSwitch = function () {
  var element = $(this);
  var parent = element.parents('[group]');
  var group = parent.attr('group');
  
  choose[group + "_NAME"] = element.text();
  choose[group + "_IDX"] = element.attr('value');
  element.parents('li:eq(1)').find('a span:eq(0)').text(choose[group + "_NAME"]);
  
  var elements = $("div[metric]:not([loading])").attr('loading', 1).toArray();
  
  for(var i in elements) {
    var data = $.data(elements[i], 'chart');
    if(data) {
      data.destroy();
    }
  }
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout(loadCharts, 100);
  
};

// 初始化
var init = function () {
  
  showParameter();
  
  $('div[level=1] .chart-row').css('display', 'inline');
  
  // set global font family
  Highcharts.setOptions({ 
    chart: { style: { fontFamily: "'Lucida Grande',' Lucida Sans Unicode', Verdana, Arial,'Microsoft Yahei', sans-serif"}},
    title: { style:{fontSize:'14px',fontWeight:'800'}},
    credits: {enabled: false}
  });
  
  var periods = [];
  var period = '{0} - {1}'.format(__data__.params.period.begin, __data__.params.period.end);
  
  for(var idx = 1; idx < __data__.report.period.length; idx++) {
	  var item = __data__.report.period[idx];
	  var beginDate = moment(item.timeStart);
	  var endDate = moment(item.timeEnd);
	  periods.push({name: '{0} {1} {2} - {3}'.format(period, '对比', beginDate.format("YYYY/MM/DD"), endDate.format("YYYY/MM/DD")), value: (idx*1) + 1});
  }

  var E = Enumerable.From(__cache__.MAP);
  choose = $.extend({}, choose, __cache__.MAP[0]);
  choose.TYPE_IDX = 1;
  choose.PERIOD = periods[0].value;
  
  var options = [{
      name : choose.PROD_NAME,
      group : 'PROD',
      event : dimSwitch,
      items : E.Distinct('$.PROD_NAME').Select("{name:$.PROD_NAME, value: $.PROD_IDX}").ToArray()
    }, {
      name : choose.STORE_NAME,
      group : 'STORE',
      event : dimSwitch,
      items : E.Distinct('$.STORE_NAME').Select("{name: $.STORE_NAME, value: $.STORE_IDX}").ToArray()
    }, {
      name : choose.MBR_NAME,
      group : 'MBR',
      event : dimSwitch,
      items : E.Distinct('$.MBR_NAME').Select("{name: $.MBR_NAME, value: $.MBR_IDX}").ToArray()
    }, {
      name : periods[0].name,
      group : 'PERIOD',
      items : periods,
      maxWidth : 400
    }
  ];
  
  buildSelector($("#main-content nav ul:eq(0)"), options);
  
  $(".btn-group button").on('click', function(){
	  var element = $(this);
	  var TYPE_IDX = element.attr('value');
	  if(TYPE_IDX == choose.TYPE_IDX) return;
	  choose.TYPE_IDX = TYPE_IDX;
	  loadCharts();
  });
	
	$('#metric_tree').on('selected', function(ev, args){
		if(choose.METRIC == args.info[0].metric) 
			return;
		
		choose.METRIC = args.info[0].metric;
		$('div[level=2] span.metric').text(args.info[0].name);
		  
		  var target = $('#main-content .wrapper:visible');
		  var return_button = $('<div>', {'class': 'btn btn-primary', text: '返回'}).appendTo(target);
		  return_button.attr('style', 'position:fixed;right:10px;bottom:10px;z-index:100000000;');
		  return_button.on('click', function() {
			  choose.METRIC = null;
			  $(this).remove();
			  
			  if(__timer__ != null) {
			    window.clearTimeout(__timer__);
			  }
			  
			  __timer__ = window.setTimeout(loadCharts, 100);
		  });
		  
		  if(__timer__ != null) {
		    window.clearTimeout(__timer__);
		  }
		  
		  __timer__ = window.setTimeout(loadCharts, 100);
	});
  
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
  
  __data__.data = Enumerable.From(__data__.data).OrderBy('$.PROD_IDX').ThenBy('$.STORE_IDX').ThenBy('$.MBR_IDX').ToArray();
  
  // 指标树
  buildMetricTree();
  loadCharts();
};

function buildMetricTree() {
  var data = [];
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

function loadMetricChart(dim) {
	var conditions = [];
	var condition = '';
	var dims = ['PROD', 'STORE', 'MBR', 'TYPE'];
	var dim1 = null;
	if(choose[dim + "_IDX"] == 0) {
		$(".col-sm-10 .row[group={0}] :eq(1)".format(dim)).show();
		while(dim1 = dims.pop()) {
			if(dim == dim1) {
				conditions.push('$.{0}_IDX>0'.format(dim1));
			} else {
				conditions.push('$.{0}_IDX=={1}'.format(dim1, choose[dim1 + '_IDX']));
			}
		}
		
		condition = conditions.join(' && ');
	
		var str = '';
		if(choose.PROD_IDX*1>0 || choose.STORE_IDX*1>0 || choose.MBR_IDX*1>0) {
			if(dim == 'PROD')
				str = '&& $.DIM_TYPE==1';
			else if(dim == 'STORE')
				str = '&& $.DIM_TYPE==2';
			else if(dim == 'MBR')
				str = '&& $.DIM_TYPE==3';
		}
		
		var d1 = Enumerable.From(__data__.data).Where('{0} && $.PERIOD=={1} {2}'.format(condition, 1, str)).ToArray();;
		var d2 = Enumerable.From(__data__.data).Where('{0} && $.PERIOD=={1} {2}'.format(condition, choose.PERIOD, str)).ToArray();;
		
		var column_data = [], column_xAxis = [];
		
		column_data.push({
			name: Fields[choose.METRIC].displayName,
			type: 'column',
			data: []
		});
		
		column_data.push({
			name: Fields[choose.METRIC].displayName + '对比',
			type: 'line',
			yAxis: 1,
			data: []
		});
		
		var idx_1, idx_2 = 0;
		for(idx_1=0;idx_1<d1.length;idx_1++) {
			var val1 = d1[idx_1][choose.METRIC];
			column_xAxis.push(d1[idx_1][dim + '_NAME']);
			column_data[0].data.push(val1);
			
			while(d2[idx_2] && d2[idx_2].MAP_ID<d1[idx_1].MAP_ID) {
				idx_2++;
			}
			
			if(d2[idx_2] && d2[idx_2].MAP_ID==d1[idx_1].MAP_ID) {
				var val2 = d2[idx_2][choose.METRIC];
				var val3 = (val1/val2) - 1;
				column_data[1].data.push(val3);
			} else
				column_data[1].data.push(0);
		}
		
		var yAxis = { title: {text: null}};
		
		if(choose.METRIC.indexOf('RATIO') > -1 || choose.METRIC.indexOf('PENATRATION') > -1 || choose.METRIC.indexOf('LEFT_IDX') > -1) {
			yAxis.labels = {
				formatter: function() {
					try {
				    	return isNaN(this.value) ? this.value : this.value.formatPercent(1);
				    } catch (e){
				        return this.value;
				    }
				}
			};
		}
		
		$('div.row[group={0}] .chart-row :eq(1)'.format(dim)).highcharts({
			chart: {
			},
			title: {text : null},
			tooltip: {
				formatter: function() {
					var val = this.y;
					var unit = null;
					if(this.series.index == 1)
						val = val.formatPercent(2);
					else {
						if(Fields[choose.METRIC].percentage) {
							val = val.formatPercent(2);
						} else {
							val = commaify(val.toFixed(Fields[choose.METRIC].digits));
							unit = Fields[choose.METRIC].unit;
						}
					}
					return '{0}<br/><span style="color:{1}">{2}</span>: {3}{4}'.format(this.x, this.series.color, this.series.name, val, unit);
				}
			},
			xAxis: [{categories: column_xAxis}],
			yAxis: [ yAxis, {
				title: {text: null},
				opposite: true,
				labels : {
					formatter: function() {
			           try {
			               return isNaN(this.value) ? this.value : this.value.formatPercent(1);
			            } catch (e){
			                return this.value;
			            }
					}
				}
			}],
			series: column_data
		});
	}
}

function getTreeData(period) {
	var c_template = '$.PERIOD=={0} && $.PROD_IDX=={1} && $.STORE_IDX=={2} && $.MBR_IDX=={3} && $.TYPE_IDX=={4}';
	
	var tree_data = {
			TOT_SALES_VAL : 0,
			TOT_PROMT_AMT : 0,
			TOT_MBR_CNT : 0,
			NON_PROMT_AMT : 0,
			TOT_MBR_SALES_VAL : 0,
			TOT_NEW_MBR_CNT : 0,
			TOT_OLD_MBR_CNT : 0,
			AVG_MBR_SALES_AMT : 0,
			AVG_MBR_VST_CNT : 0,
			AVG_VST_AMT : 0,
			AVG_VST_QTY : 0,
			AVG_QTY_AMT : 0,
			NON_MBR_SALES_VAL : 0,
			TOT_NEW_MBR_SALES_VAL : 0,
			TOT_OLD_MBR_SALES_VAL : 0,
			TOT_NEW_MBR_PROMT_SALES_VAL : 0,
			TOT_OLD_MBR_PROMT_SALES_VAL : 0,
			TOT_NEW_MBR_CNT : 0,
			AVG_NEW_MBR_SALES_AMT : 0,
			AVG_NEW_MBR_VST_CNT : 0,
			AVG_NEW_VST_AMT : 0,
			AVG_NEW_VST_QTY : 0,
			AVG_NEW_QTY_AMT : 0,
			AVG_QTY_AMT : 0,
			AVG_OLD_MBR_SALES_AMT : 0,
			AVG_OLD_MBR_VST_CNT : 0,
			AVG_OLD_VST_AMT : 0,
			AVG_OLD_VST_QTY : 0,
			AVG_OLD_QTY_AMT : 0
	};
	
	var d1 = Enumerable.From(__data__.data).Where(c_template.format(period, choose.PROD_IDX, choose.STORE_IDX, choose.MBR_IDX, 1)).ToArray()[0];
	var d2 = Enumerable.From(__data__.data).Where(c_template.format(period, choose.PROD_IDX, choose.STORE_IDX, choose.MBR_IDX, 2)).ToArray()[0];
	var d3 = Enumerable.From(__data__.data).Where(c_template.format(period, choose.PROD_IDX, choose.STORE_IDX, choose.MBR_IDX, 3)).ToArray()[0];
	var d4 = Enumerable.From(__data__.data).Where(c_template.format(period, choose.PROD_IDX, choose.STORE_IDX, choose.MBR_IDX, 4)).ToArray()[0];
	var d5 = Enumerable.From(__data__.data).Where(c_template.format(period, choose.PROD_IDX, choose.STORE_IDX, choose.MBR_IDX, 5)).ToArray()[0];
	
	if(d1 != null) {
		// 销售额
		tree_data.TOT_SALES_VAL = d1.TOT_SALES_VAL;
		// 促销销售额
		tree_data.TOT_PROMT_AMT = d1.TOT_PROMT_AMT;
		// 会员人数
		tree_data.TOT_MBR_CNT = d1.TOT_MBR_CNT;
		// 非促销销售额
		tree_data.NON_PROMT_AMT = tree_data.TOT_SALES_VAL - tree_data.TOT_PROMT_AMT;
		// 新会员促销销售额
		tree_data.TOT_NEW_MBR_PROMT_SALES_VAL = d1.TOT_NEW_MBR_PROMT_SALES_VAL;
		// 老会员促销销售额
		tree_data.TOT_OLD_MBR_PROMT_SALES_VAL = d1.TOT_OLD_MBR_PROMT_SALES_VAL;
	}
	
	if(d2 != null) {
		// 会员销售额
		tree_data.TOT_MBR_SALES_VAL = d2.TOT_SALES_VAL;
		// 新会员销售额
		tree_data.TOT_NEW_MBR_SALES_VAL = d2.TOT_NEW_MBR_SALES_VAL;
		// 老会员销售额
		tree_data.TOT_OLD_MBR_SALES_VAL = d2.TOT_OLD_MBR_SALES_VAL;
	}
	
	if(d3 != null) {
		// 新会员人数
		tree_data.TOT_NEW_MBR_CNT = d3.TOT_MBR_CNT;
		tree_data.AVG_NEW_MBR_SALES_AMT = d3.AVG_MBR_SALES_AMT;
		tree_data.AVG_NEW_MBR_VST_CNT = d3.AVG_MBR_VST_CNT;
		tree_data.AVG_NEW_VST_AMT = d3.AVG_VST_AMT;
		tree_data.AVG_NEW_VST_QTY = d3.AVG_VST_QTY;
		tree_data.AVG_NEW_QTY_AMT = d3.AVG_QTY_AMT;
	}
	
	if(d4 != null) {
		// 老会员人数
		tree_data.TOT_OLD_MBR_CNT = d4.TOT_MBR_CNT;
		// 老会员人均销售额
		tree_data.AVG_MBR_SALES_AMT = d4.AVG_MBR_SALES_AMT;
		// 老会员人均次数
		tree_data.AVG_MBR_VST_CNT = d4.AVG_MBR_VST_CNT;
		// 老会员客单价
		tree_data.AVG_VST_AMT = d4.AVG_VST_AMT;
		// 老客客单件
		tree_data.AVG_VST_QTY = d4.AVG_VST_QTY;
		// 老会员件单价
		tree_data.AVG_QTY_AMT = d4.AVG_QTY_AMT;
		tree_data.AVG_OLD_MBR_SALES_AMT = d4.AVG_MBR_SALES_AMT;
		tree_data.AVG_OLD_MBR_VST_CNT = d4.AVG_MBR_VST_CNT;
		tree_data.AVG_OLD_VST_AMT = d4.AVG_VST_AMT;
		tree_data.AVG_OLD_VST_QTY = d4.AVG_VST_QTY;
		tree_data.AVG_OLD_QTY_AMT = d4.AVG_QTY_AMT;
	} else {
		
	}
	
	if(d5 != null) {
		// 非会员销售额
		tree_data.NON_MBR_SALES_VAL = d5.TOT_SALES_VAL;
	}
	
	return tree_data;
}

function getTreeDatas() {

	var tree1 = getTreeData(1);
	var tree2 = getTreeData(2);
	
	for(var i in tree1) {
		var text = null, val = null;
		if(tree1[i] == 0 || tree2[i] == 0) {
			//if(tree1[i] == 0) tree1[i] = null;
			//if(tree2[i] == 0) tree2[i] = null;
			text = "不可比";
		} else {
			val = ((tree1[i] / tree2[i]) - 1);
			text = val.formatPercent(2);
			var template = ' <i class="fa fa-long-arrow-{0}" style="color:{1}"></i> ';;
			if(val > 0) {
				text = template.format('up', 'green') + text;
				//text = text + template.format('up', 'green');
			} else if (val < 0) {
				text = template.format('down', 'red') + text;
				//text = text + template.format('down', 'red');
			}
		}
		tree1[i + '_RATIO'] = text;
	}

	tree1.TOT_SALES_VAL = tree1.TOT_SALES_VAL ? tree1.TOT_SALES_VAL >= 10000 ? tree1.TOT_SALES_VAL = commaify((tree1.TOT_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.TOT_MBR_SALES_VAL = tree1.TOT_MBR_SALES_VAL ? tree1.TOT_MBR_SALES_VAL > 10000 ? commaify((tree1.TOT_MBR_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_MBR_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.TOT_NEW_MBR_SALES_VAL = tree1.TOT_NEW_MBR_SALES_VAL ? tree1.TOT_NEW_MBR_SALES_VAL >= 10000 ? commaify((tree1.TOT_NEW_MBR_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_NEW_MBR_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.TOT_OLD_MBR_SALES_VAL = tree1.TOT_OLD_MBR_SALES_VAL ? tree1.TOT_OLD_MBR_SALES_VAL >= 10000 ? commaify((tree1.TOT_OLD_MBR_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_OLD_MBR_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.NON_MBR_SALES_VAL = tree1.NON_MBR_SALES_VAL ? tree1.NON_MBR_SALES_VAL >= 10000 ? commaify((tree1.NON_MBR_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.NON_MBR_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.TOT_PROMT_AMT = tree1.TOT_PROMT_AMT ? tree1.TOT_PROMT_AMT >= 10000 ? commaify((tree1.TOT_PROMT_AMT / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_PROMT_AMT.toFixed(1)) + '元' : '无';
	tree1.TOT_NEW_MBR_PROMT_SALES_VAL = tree1.TOT_NEW_MBR_PROMT_SALES_VAL ? tree1.TOT_NEW_MBR_PROMT_SALES_VAL >= 10000 ? commaify((tree1.TOT_NEW_MBR_PROMT_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_NEW_MBR_PROMT_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.TOT_OLD_MBR_PROMT_SALES_VAL = tree1.TOT_OLD_MBR_PROMT_SALES_VAL ? tree1.TOT_OLD_MBR_PROMT_SALES_VAL >= 10000 ? commaify((tree1.TOT_OLD_MBR_PROMT_SALES_VAL / 10000).toFixed(1)) + '万元' : commaify(tree1.TOT_OLD_MBR_PROMT_SALES_VAL.toFixed(1)) + '元' : '无';
	tree1.NON_PROMT_AMT = tree1.NON_PROMT_AMT ? tree1.NON_PROMT_AMT >= 10000 ? commaify((tree1.NON_PROMT_AMT / 10000).toFixed(1)) + '万元' : commaify(tree1.NON_PROMT_AMT.toFixed(1)) + '元' : '无';
	tree1.TOT_MBR_CNT = tree1.TOT_MBR_CNT ? commaify(tree1.TOT_MBR_CNT) + '人' : '无';
	tree1.TOT_NEW_MBR_CNT = tree1.TOT_NEW_MBR_CNT ? commaify(tree1.TOT_NEW_MBR_CNT) + '人' : '无';
	tree1.TOT_OLD_MBR_CNT = tree1.TOT_OLD_MBR_CNT ? commaify(tree1.TOT_OLD_MBR_CNT) + '人' : '无';
	tree1.AVG_NEW_MBR_SALES_AMT = tree1.AVG_NEW_MBR_SALES_AMT ? tree1.AVG_NEW_MBR_SALES_AMT >= 10000 ? commaify((tree1.AVG_NEW_MBR_SALES_AMT / 10000).toFixed(1)) + '万元' : commaify(tree1.AVG_NEW_MBR_SALES_AMT.toFixed(1)) + '元' : '无';
	tree1.AVG_NEW_MBR_VST_CNT = tree1.AVG_NEW_MBR_VST_CNT ? tree1.AVG_NEW_MBR_VST_CNT.toFixed(1) + '次' : '无';
	tree1.AVG_NEW_VST_AMT = tree1.AVG_NEW_VST_AMT ? tree1.AVG_NEW_VST_AMT.toFixed(1) + '元' : '无';
	tree1.AVG_NEW_VST_QTY = tree1.AVG_NEW_VST_QTY ? tree1.AVG_NEW_VST_QTY.toFixed(1) + '件' : '无';
	tree1.AVG_NEW_QTY_AMT = tree1.AVG_NEW_QTY_AMT ? tree1.AVG_NEW_QTY_AMT.toFixed(1) + '元' : '无';
	tree1.AVG_OLD_MBR_SALES_AMT = tree1.AVG_OLD_MBR_SALES_AMT ? tree1.AVG_OLD_MBR_SALES_AMT >= 10000 ? commaify((tree1.AVG_OLD_MBR_SALES_AMT / 10000).toFixed(1)) + '万元' : commaify(tree1.AVG_OLD_MBR_SALES_AMT.toFixed(1)) + '元' : '无';
	tree1.AVG_OLD_MBR_VST_CNT = tree1.AVG_OLD_MBR_VST_CNT ? tree1.AVG_OLD_MBR_VST_CNT.toFixed(1) + '次' : '无';
	tree1.AVG_OLD_VST_AMT = tree1.AVG_OLD_VST_AMT ? tree1.AVG_OLD_VST_AMT.toFixed(1) + '元' : '无';
	tree1.AVG_OLD_VST_QTY = tree1.AVG_OLD_VST_QTY ? tree1.AVG_OLD_VST_QTY.toFixed(1) + '件' : '无';
	tree1.AVG_OLD_QTY_AMT = tree1.AVG_OLD_QTY_AMT ? tree1.AVG_OLD_QTY_AMT.toFixed(1) + '元' : '无';
	
	return tree1;
}

function getWidth(text,font,size,weight) {
	  var css = 'display:none;font-family:{0};font-size:{1}px;font-weight:{2}';
	  
	  font ? font : "'Microsoft Yahei'";
	  size ? size : 12;
	  weight ? weight : 800;
	  
	  var element = $('<div>', {style: css.format(font, size, weight), text: text}).appendTo($('body'));
	  var width = element.width();
	  element.remove();
	  return width;
}


function loadCharts() {
	var self = this;
    $(".col-sm-10 .row :eq(0)").nextAll().hide();
    
	if(choose.METRIC) {
	    $('div.tree-row').hide();
		choose.PROD_IDX * 1 == 0 && __data__.report.productGroup.length > 1 && loadMetricChart('PROD');
		choose.STORE_IDX * 1 == 0 && __data__.report.storeGroup.length > 1 && loadMetricChart('STORE');
		choose.MBR_IDX * 1 == 0 && __data__.report.memberGroup.length > 1 && loadMetricChart('MBR');
	} else {
	    $('div.tree-row').show();
	    choose.PROD_IDX * 1 == 0 && __data__.report.productGroup.length > 1 && $(".col-sm-10 .row :eq(1)").show();
	    choose.STORE_IDX * 1 == 0 && __data__.report.storeGroup.length > 1 && $(".col-sm-10 .row :eq(3)").show();
	    choose.MBR_IDX * 1 == 0 && __data__.report.memberGroup.length > 1 && $(".col-sm-10 .row :eq(2)").show();
	}
	
	var tree_data = getTreeDatas();
	
	var tree1_template = "[{label:'销售额',value:item.TOT_SALES_VAL+'<br/>'+item.TOT_SALES_VAL_RATIO,css:'current big-font',items:[{label:'会员销售额',value:item.TOT_MBR_SALES_VAL+'<br/>'+item.TOT_MBR_SALES_VAL_RATIO,css:'tree-left-div1',items:[{label:'新会员份额',value:item.TOT_NEW_MBR_SALES_VAL+'<br/>'+item.TOT_NEW_MBR_SALES_VAL_RATIO,css:'tree-left-div2'},{label:'老会员份额',value:item.TOT_OLD_MBR_SALES_VAL+'<br/>'+item.TOT_OLD_MBR_SALES_VAL_RATIO,css:'tree-left-div2'}]},{label:'非会员销售额',value:item.NON_MBR_SALES_VAL+'<br/>'+item.NON_MBR_SALES_VAL_RATIO,css:'tree-left-div1'},{label:'促销销售额',value:item.TOT_PROMT_AMT+'<br/>'+item.TOT_PROMT_AMT_RATIO,css:'tree-left-div1',items:[{label:'新会员份额',value:item.TOT_NEW_MBR_PROMT_SALES_VAL+'<br/>'+item.TOT_NEW_MBR_PROMT_SALES_VAL_RATIO,css:'tree-left-div2'},{label:'老会员份额',value:item.TOT_OLD_MBR_PROMT_SALES_VAL+'<br/>'+item.TOT_OLD_MBR_PROMT_SALES_VAL_RATIO,css:'tree-left-div2'}]},{label:'非促销销售额',value:item.NON_PROMT_AMT+'<br/>'+item.NON_PROMT_AMT_RATIO,css:'tree-left-div1'}]}]";
	var tree2_template = "[{label:'会员人数',value:item.TOT_MBR_CNT+'<br/>'+item.TOT_MBR_CNT_RATIO,css:'current big-font',items:[{label:'新会员人数',value:item.TOT_NEW_MBR_CNT+'<br/>'+item.TOT_NEW_MBR_CNT_RATIO,css:'tree-left-div1',enableMouseOver:1,display:1,items:[{label:'人均消费额',value:item.AVG_NEW_MBR_SALES_AMT+'<br/>'+item.AVG_NEW_MBR_SALES_AMT_RATIO,css:'tree-left-div2'},{label:'人均购买次数',value:item.AVG_NEW_MBR_VST_CNT+'<br/>'+item.AVG_NEW_MBR_VST_CNT_RATIO,css:'tree-left-div2'},{label:'客单价',value:item.AVG_NEW_VST_AMT+'<br/>'+item.AVG_NEW_VST_AMT_RATIO,css:'tree-left-div2'},{label:'客单件',value:item.AVG_NEW_VST_QTY+'<br/>'+item.AVG_NEW_VST_QTY_RATIO,css:'tree-left-div2'},{label:'件单价',value:item.AVG_NEW_QTY_AMT+'<br/>'+item.AVG_NEW_QTY_AMT_RATIO,css:'tree-left-div2'}]},{label:'老会员人数',value:item.TOT_OLD_MBR_CNT+'<br/>'+item.TOT_OLD_MBR_CNT_RATIO,css:'tree-left-div1',enableMouseOver:1,display:0,items:[{label:'人均消费额',value:item.AVG_OLD_MBR_SALES_AMT+'<br/>'+item.AVG_OLD_MBR_SALES_AMT_RATIO,css:'tree-left-div2'},{label:'人均购买次数',value:item.AVG_OLD_MBR_VST_CNT+'<br/>'+item.AVG_OLD_MBR_VST_CNT_RATIO,css:'tree-left-div2'},{label:'客单价',value:item.AVG_OLD_VST_AMT+'<br/>'+item.AVG_OLD_VST_AMT_RATIO,css:'tree-left-div2'},{label:'客单件',value:item.AVG_OLD_VST_QTY+'<br/>'+item.AVG_OLD_VST_QTY_RATIO,css:'tree-left-div2'},{label:'件单价',value:item.AVG_OLD_QTY_AMT+'<br/>'+item.AVG_OLD_QTY_AMT_RATIO,css:'tree-left-div2'}]}]}]";
	var tree1_data = Enumerable.From([tree_data]).Select("item=>"+tree1_template).ToArray()[0];
	var tree2_data = Enumerable.From([tree_data]).Select("item=>"+tree2_template).ToArray()[0];
	
	$(".tree-row .chart-row:eq(0)").jQueryTree('destroy');
	$(".tree-row .chart-row:eq(0)").jQueryTree({
		data: tree1_data
	});

	$(".tree-row .chart-row:eq(1)").jQueryTree('destroy');
	$(".tree-row .chart-row:eq(1)").jQueryTree({
		data: tree2_data
	});
	
	this.cdata = [];
	
	if((choose.PROD_IDX * 1) == 0 && __data__.report.productGroup.length > 1) {
		var condition = "$.PERIOD=={0} && $.STORE_IDX=={1} && $.MBR_IDX=={2} && $.TYPE_IDX=={3} && $.PROD_IDX>0 && $.DIM_TYPE==1".format(1, choose.STORE_IDX, choose.MBR_IDX, choose.TYPE_IDX);
		var data = Enumerable.From(__data__.data).Where(condition).ToArray();
		
		var line_data = [], table_data = [], column_data = [], column_xAxis = [];
		
		line_data.push({ data: [], pointPlacement: 'on' });
		
		column_data.push({
			name: '平均每位会员的购买金额',
			type: 'column',
			data: []
		});
		
		column_data.push({
			name: '会员渗透率',
			type: 'line',
			yAxis: 1,
			data: []
		});
		
		for(var idx in data) {
			var item = data[idx];
			line_data[0].data.push(item.MBR_AMT_RATIO);
			table_data.push({NAME: item.PROD_NAME, AMOUNT: item.TOT_SALES_VAL, RATIO: item.MBR_AMT_RATIO});
			column_xAxis.push(item.PROD_NAME);
			column_data[0].data.push(item.AVG_MBR_SALES_AMT);
			column_data[1].data.push(item.MBR_PENATRATION);
		}
		
		this.cdata[0] = table_data;
		
		$('.col-sm-10 .chart-row :eq(0) .pie-chart').highcharts({
			chart: { polar: true, type: 'column' },
			title: { text : null },
			pane: { size: '70%' },
			xAxis: { categories: column_xAxis, tickmarkPlacement: 'on', lineWidth: 0, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}},
			yAxis: { /*gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, endOnTick: false,*/ tickmarkPlacement: 'on', showLastLabel: true, labels: { enabled: false } },
			legend: { enabled: false },
			plotOptions: { series: { stacking: 'normal', shadow: false, groupPadding:0, pointPlacement: 'on' } },
			tooltip: { formatter: function() { 
				return '{0}: <b>{1}</b><br/>金额:<b>{2}元</b>'.format(this.x, this.y.formatPercent(2), commaify(self.cdata[0][this.point.x].AMOUNT.toFixed(2))); } 
			},
			series: line_data
		});

		$('.col-sm-10 .chart-row :eq(0) .column-chart').highcharts({
			chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, zoomType: 'xy' },
			title: {text : null},
		    tooltip: {
		    	formatter: function() {
		    		var val = this.y;
		    		var unit = '';
		    		if(this.series.index == 0) {
		    			val = commaify(val.toFixed(2));
		    			unit = '元';
		    		} else {
		    			val = val.formatPercent(2);
		    		}
		    		return '{0}<br/><span style="color:{1}">{2}</span>: {3}{4}'.format(this.x, this.series.color, this.series.name, val, unit);
		    	}
			},
			xAxis: [{categories: column_xAxis, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}}],
			yAxis: [{ title: {text: null} }, {
				opposite: true,
				title: {text: null},
				labels: {
					formatter: function() {
						return this.value.formatPercent(2);
					}
				}
			}],
			series: column_data
		});
	}

	if((choose.MBR_IDX * 1) == 0 && __data__.report.memberGroup.length > 1) {
		var condition = "$.PERIOD=={0} && $.PROD_IDX=={1} && $.STORE_IDX=={2} && $.TYPE_IDX=={3} && $.MBR_IDX>0 && $.DIM_TYPE==3".format(1, choose.PROD_IDX, choose.STORE_IDX, choose.TYPE_IDX);
		var data = Enumerable.From(__data__.data).Where(condition).ToArray();

		var line_data = [], table_data = [], column_data = [], column_xAxis = [];
		
		line_data.push({ data: [], pointPlacement: 'on' });
		
		column_data.push({
			name: '平均每位会员的购买金额',
			type: 'column',
			data: []
		});
		
		column_data.push({
			name: '合计购买会员数',
			type: 'line',
			yAxis: 1,
			data: []
		});
		
		for(var idx in data) {
			var item = data[idx];
			line_data[0].data.push(item.MBR_AMT_RATIO);
			table_data.push({NAME: item.MBR_NAME, AMOUNT: item.TOT_SALES_VAL, RATIO: item.MBR_AMT_RATIO});
			column_xAxis.push(item.MBR_NAME);
			column_data[0].data.push(item.AVG_MBR_SALES_AMT);
			column_data[1].data.push(item.TOT_MBR_CNT);
		}
		
		this.cdata[1] = table_data;
		
		$('.col-sm-10 .chart-row :eq(1) .pie-chart').highcharts({
			chart: { polar: true, type: 'column' },
			title: { text : null },
			pane: { size: '70%' },
			xAxis: { categories: column_xAxis, tickmarkPlacement: 'on', lineWidth: 0, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}},
			yAxis: { /*gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, endOnTick: false,*/ tickmarkPlacement: 'on', showLastLabel: true, labels: { enabled: false }},
			legend: { enabled: false },
			plotOptions: { series: { stacking: 'normal', shadow: false, groupPadding:0, pointPlacement: 'on' } },
			tooltip: { formatter: function() { 
				return '{0}: <b>{1}</b><br/>金额:<b>{2}元</b>'.format(this.x, this.y.formatPercent(2), commaify(self.cdata[1][this.point.x].AMOUNT.toFixed(2))); } 
			},
			series: line_data
		});

		$('.col-sm-10 .chart-row :eq(1) .column-chart').highcharts({
			chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, zoomType: 'xy'},
			title: {text : null},
		    tooltip: {
		    	formatter: function() {
		    		var val = this.y;
		    		var unit = null;
		    		if(this.series.index == 0) {
		    			val = commaify(val.toFixed(2));
		    			unit = '元';
		    		} else {
		    			val = commaify(val);
		    			unit = '人';
		    		}
		    		return '{0}<br/><span style="color:{1}">{2}</span>: {3}{4}'.format(this.x, this.series.color, this.series.name, val, unit);
		    	}
			},
			xAxis: [{categories: column_xAxis, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}}],
			yAxis: [{ title: {text: null} }, {
				opposite: true,
				title: {text: null},
				labels: {
					formatter: function() {
						return commaify(this.value);
					}
				}
			}],
			series: column_data
		});
	}

	if((choose.STORE_IDX * 1) == 0 && __data__.report.storeGroup.length > 1) {
		var condition = "$.PERIOD=={0} && $.PROD_IDX=={1} && $.MBR_IDX=={2} && $.TYPE_IDX=={3} && $.STORE_IDX>0 && $.DIM_TYPE==2".format(1, choose.PROD_IDX, choose.MBR_IDX, choose.TYPE_IDX);
		var data = Enumerable.From(__data__.data).Where(condition).ToArray();
		
		var line_data = [], table_data = [], column_data = [], column_xAxis = [];
		
		line_data.push({ data: [], pointPlacement: 'on' });
		
		column_data.push({
			name: '平均每位会员的购买金额',
			type: 'column',
			data: []
		});
		
		column_data.push({
			name: '合计购买会员数',
			type: 'line',
			yAxis: 1,
			data: []
		});
		
		for(var idx in data) {
			var item = data[idx];
			line_data[0].data.push(item.MBR_AMT_RATIO);
			table_data.push({NAME: item.STORE_NAME, AMOUNT: item.TOT_SALES_VAL, RATIO: item.MBR_AMT_RATIO});
			column_xAxis.push(item.STORE_NAME);
			column_data[0].data.push(item.AVG_MBR_SALES_AMT);
			column_data[1].data.push(item.TOT_MBR_CNT);
		}
		
		this.cdata[2] = table_data;
		
		$('.col-sm-10 .chart-row :eq(2) .pie-chart').highcharts({
			chart: { polar: true, type: 'column' },
			title: { text : null },
			pane: { size: '70%' },
			xAxis: { categories: column_xAxis, tickmarkPlacement: 'on', lineWidth: 0, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}},
			yAxis: { /*gridLineInterpolation: 'polygon', lineWidth: 0, min: 0, endOnTick: false,*/ tickmarkPlacement: 'on', showLastLabel: true, labels: { enabled: false } },
			legend: { enabled: false },
			plotOptions: { series: { stacking: 'normal', shadow: false, groupPadding:0, pointPlacement: 'on' } },
			tooltip: { formatter: function() { 
				return '{0}: <b>{1}</b><br/>金额:<b>{2}元</b>'.format(this.x, this.y.formatPercent(2), commaify(self.cdata[2][this.point.x].AMOUNT.toFixed(2))); } 
			},
			series: line_data
		});

		$('.col-sm-10 .chart-row :eq(2) .column-chart').highcharts({
			chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false, zoomType: 'xy' },
			title: {text : null},
		    tooltip: {
		    	formatter: function() {
		    		var val = this.y;
		    		var unit = null;
		    		if(this.series.index == 0) {
		    			val = commaify(val.toFixed(2));
		    			unit = '元';
		    		} else {
		    			val = commaify(val);
		    			unit = '人';
		    		}
		    		return '{0}<br/><span style="color:{1}">{2}</span>: {3}{4}'.format(this.x, this.series.color, this.series.name, val, unit);
		    	}
			},
			xAxis: [{categories: column_xAxis, labels: {formatter: function() {
				var val = this.value;
				val = val.length > 5 ? val.substring(0, 5) + '...' : val;
				return val;
			}}}],
			yAxis: [{ title: {text: null} }, {
				opposite: true,
				title: {text: null},
				labels: {
					formatter: function() {
						return commaify(this.value);
					}
				}
			}],
			series: column_data
		});
	}
  
    // popovers
    $('.popovers[loading]').popover().removeAttr('loading');
}

// 获取报告数据
function loadReport() {
  $.getJSON('/arko/get/{0}/report.do'.format(rid), function (json) {
    __data__.report = json;
    loadMap();
  });
}

// 获取图表数据
function loadMap() {
  //$.getJSON('/data/kpid/{1}'.format(table, rid), function (json) {
  $.getJSON('/arko/get/{0}/map.do'.format( rid), function (json) {
	  __cache__.MAP = __data__.map = json.map;
    loadData(init);
  });
}

function loadData(callback) {
  var args = arguments.length > 1 ? Array.prototype.slice.call( arguments, 1 ) : null;
  $.getJSON('/arko/get/{0}/data.do'.format(rid), {code: 'ckmotcube', sort: 'period,asc;type_idx,asc;prod_idx,asc;store_idx,asc;mbr_idx,asc'}, function (json) {
    __data__ = $.extend({}, __data__, json);
    if(callback) {
      callback.apply(this, args);
    }
  });
}

$(function () {

  window.location.href.match(/\/(\d+)\//g);
  rid = RegExp.$1;
  
  if(!rid || isNaN(rid))
    return;
  
  TreeView.init('#metric_tree');
  loadReport();
  
});