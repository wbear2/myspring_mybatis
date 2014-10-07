
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

var generateRandomId = function (prefix) {
	var str = (new Date).getTime().toString(32), i;
	for (i = 0; 5 > i; i++)
		str += Math.floor(65535 * Math.random()).toString(32);
	return prefix + str;
};

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
                  { name: '总计指标', type: 'folder', expand: true, items: [
                    { name: '合计销售金额', type: 'item', metric: 'TOT_SALES_VAL', selected: true },
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
                multiSelect: true,
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
var Field = function(name, displayName, unit, faqTitle, faqText) {
  this.name = name;
  this.displayName = displayName;
  this.unit = unit;
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
  AVG_CUST_PPU: new Field("AVG_CUST_PPU","所有消费者的件单价","元","在分析时间段内，所有消费者(会员及非会员)单位数量商品的平均价格"),
  AVG_CUST_QTY: new Field("AVG_CUST_QTY","所有消费者的单次购买量","件","在分析时间段内，所有消费者(会员及非会员)平均每次购买的商品数量"),
  AVG_CUST_SALES_AMT: new Field("AVG_CUST_SALES_AMT","所有消费者的单次花费","元","在分析时间段内，所有消费者(会员及非会员)平均每次的购买金额"),
  AVG_FIRST_INTERVAL: new Field("AVG_FIRST_INTERVAL","新客人均第一次回购间隔","天","如果新客在分析时间段内有发生一购转二购的行为，计算该类人群一购和二购间平均的时间间隔"),
  AVG_LAST_INTERVAL: new Field("AVG_LAST_INTERVAL","老客人均最近一次回购间隔","天","如果老客在分析时间段内有两次及以上的购买记录，计算该类人群最近两次购物之间平均的时间间隔"),
  AVG_MBR_PROMT_AMT: new Field("AVG_MBR_PROMT_AMT","促销参与会员的人均促销花费金额"),
  AVG_MBR_PROMT_QTY: new Field("AVG_MBR_PROMT_QTY","促销参与会员的人均促销购买数量"),
  AVG_MBR_PROMT_VST: new Field("AVG_MBR_PROMT_VST","促销参与会员的人均促销购买次数"),
  AVG_MBR_QTY: new Field("AVG_MBR_QTY","会员单次购买量","件","平均每位会员在分析时间段内累计的购买数量"),
  AVG_MBR_SALES_AMT: new Field("AVG_MBR_SALES_AMT","会员单次花费","元","平均每位会员在分析时间段内累计的花费"),
  AVG_MBR_SALES_QTY: new Field("AVG_MBR_SALES_QTY","会员单次购买量","件","在分析时间段内，会员平均每次购买的商品数量"),
  AVG_MBR_VST_CNT: new Field("AVG_MBR_VST_CNT","会员人均购买次数","次","在分析时间段内，平均每位会员购买的次数"),
  AVG_PROD_AMT: new Field("AVG_PROD_AMT","会员件单价","元","在分析时间段内，会员单位数量商品的平均价格"),
  AVG_PROMT_VST_AMT: new Field("AVG_PROMT_VST_AMT","促销购物篮的平均促销品销售金额"),
  AVG_PROMT_VST_QTY: new Field("AVG_PROMT_VST_QTY","促销购物篮的平均促销品销售数量"),
  AVG_PUR_BRND_CNT: new Field("AVG_PUR_BRND_CNT","会员人均品牌宽度","个","在分析时间段内，平均每位会员购买的品牌个数"),
  AVG_PUR_CATEGORY1_CNT: new Field("AVG_PUR_CATEGORY1_CNT","会员人均小类宽度","种","在分析时间段内，平均每位会员购买的小类个数"),
  AVG_PUR_CATEGORY3_CNT: new Field("AVG_PUR_CATEGORY3_CNT","会员人均大类宽度","种","在分析时间段内，平均每位会员购买的大类个数"),
  AVG_PUR_STORE_CNT: new Field("AVG_PUR_STORE_CNT","会员人均消费门店数","家","在分析时间段内，平均每位会员在多少家门店中购物"),
  AVG_STORE_DAY_AMT: new Field("AVG_STORE_DAY_AMT","店均单日营业额","元","在分析时间段内，平均每店每天的销售金额"),
  AVG_STORE_DAY_QTY: new Field("AVG_STORE_DAY_QTY","店均单日销售量","件","在分析时间段内，平均每店每天的销售数量"),
  AVG_STORE_SALES_AMT: new Field("AVG_STORE_SALES_AMT","店均累计营业额","元","平均每个店铺在分析时间段内累计的销售金额"),
  AVG_STORE_SALES_QTY: new Field("AVG_STORE_SALES_QTY","店均累计销售量","件","平均每个店铺在分析时间段内累计的销售数量"),
  AVG_STORE_WEEK_AMT: new Field("AVG_STORE_WEEK_AMT","店均单周营业额","元","在分析时间段内，平均每店每周的销售金额"),
  AVG_STORE_WEEK_QTY: new Field("AVG_STORE_WEEK_QTY","店均单周营业额","件","在分析时间段内，平均每店每周的销售数量"),
  CATEGORY_BEST_CUST_RATIO: new Field("CATEGORY_BEST_CUST_RATIO","类别最佳购物者消费额占比"),
  CATEGORY_SHARE_AMT: new Field("CATEGORY_SHARE_AMT","类别份额(价值)",null,"该类别销售金额占所有目标类别合计销售金额的百分比"),
  CATEGORY_SHARE_QTY: new Field("CATEGORY_SHARE_QTY","类别份额(数量)",null,"该类别销售数量占所有目标类别合计销售数量的百分比"),
  DAYS_ON_SALES: new Field("DAYS_ON_SALES","销售天数","天","统计商品有成交的天数"),
  FIRST_INTERVAL: new Field("FIRST_INTERVAL","新客第一次回购间隔","天","如果新客在分析时间段内有发生一购转二购的行为，计算其一购和二购间的时间间隔"),
  LAST_INTERVAL: new Field("LAST_INTERVAL","老客最近一次回购间隔","天","如果老客在分析时间段内有两次及以上的购买记录，计算其最近两次购物之间的时间间隔"),
  MBR_AMT_RATIO: new Field("MBR_AMT_RATIO","会员销售额占比",null,"会员销售金额占所有消费者（会员和非会员）销售金额的百分比"),
  MBR_AVG_PPU: new Field("MBR_AVG_PPU","会员件单价","元","在分析时间段内，会员单位数量商品的平均价格"),
  MBR_AVG_QTY: new Field("MBR_AVG_QTY","会员单次购买量","件","在分析时间段内，会员平均每次购买的商品数量"),
  MBR_AVG_VST_AMT: new Field("MBR_AVG_VST_AMT","会员单次花费","元","在分析时间段内，会员平均每次的购买金额"),
  MBR_GRP_NAME: new Field("MBR_GRP_NAME", "会员组"),
  MBR_PENATRATION: new Field("MBR_PENATRATION","会员渗透率",null,"购买该类别会员人数占购买所有目标类别会员人数的百分比"),
  MBR_PROMT_AMT_TOT: new Field("MBR_PROMT_AMT_TOT","促销会员的合计消费金额"),
  MBR_PROMT_QTY_TOT: new Field("MBR_PROMT_QTY_TOT","促销会员的合计消费数量"),
  MBR_PROMT_VST_TOT: new Field("MBR_PROMT_VST_TOT","促销会员的合计消费次数"),
  MBR_QTY_RATIO: new Field("MBR_QTY_RATIO","会员销售量占比"),
  MBR_RATIO: new Field("MBR_RATIO","会员人数占比"),
  MBR_RATIO_ACCU: new Field("MBR_RATIO_ACCU","会员人数占比累计"),
  MBR_VISIT_RATIO: new Field("MBR_VISIT_RATIO","会员购物篮占比"),
  NON_MBR_AVG_AVG_PPU: new Field("NON_MBR_AVG_AVG_PPU","非会员件单价","元","在分析时间段内，非会员单位数量商品的平均价格"),
  NON_MBR_AVG_QTY: new Field("NON_MBR_AVG_QTY","非会员单次购买量","件","在分析时间段内，非会员平均每次购买的商品数量"),
  NON_MBR_AVG_SALES_AMT: new Field("NON_MBR_AVG_SALES_AMT","非会员单次花费","元","在分析时间段内，非会员平均每次的购买金额"),
  NON_MBR_QTY: new Field("NON_MBR_QTY","非会员合计销售数量"),
  NON_MBR_SALES_AMT: new Field("NON_MBR_SALES_AMT","非会员合计销售金额"),
  NON_MBR_VST_CNT: new Field("NON_MBR_VST_CNT","非会员合计购买次数"),
  PROD_CNT: new Field("PROD_CNT","产品数量","在分析时间段内，有销售的商品种类数目"),
  PROD_GRP_NAME: new Field("PROD_GRP_NAME", "产品组"),
  PROMT_AMT_RATIO: new Field("PROMT_AMT_RATIO","促销销售金额占比"),
  PROMT_MBR_AMT: new Field("PROMT_MBR_AMT","会员促销消费金额"),
  PROMT_MBR_AMT_RATIO: new Field("PROMT_MBR_AMT_RATIO","促销购买会员的促销消费额占比"),
  PROMT_MBR_PENATRATION: new Field("PROMT_MBR_PENATRATION","促销会员渗透率"),
  PROMT_MBR_QTY: new Field("PROMT_MBR_QTY","会员促销消费数量"),
  PROMT_MBR_QTY_RATIO: new Field("PROMT_MBR_QTY_RATIO","促销购买会员的促销消费量占比"),
  PROMT_MBR_VST_CNT: new Field("PROMT_MBR_VST_CNT","会员促销消费次数"),
  PROMT_MBR_VST_PENATRATION: new Field("PROMT_MBR_VST_PENATRATION","促销购买会员的促销购物篮渗透率"),
  PROMT_QTY_RATIO: new Field("PROMT_QTY_RATIO","促销销售数量占比"),
  PROMT_VST_AMT_TOT: new Field("PROMT_VST_AMT_TOT","促销购物篮的合计金额"),
  PROMT_VST_PENATRATION: new Field("PROMT_VST_PENATRATION","促销购物篮渗透率"),
  PROMT_VST_PROMT_AMT_RATIO: new Field("PROMT_VST_PROMT_AMT_RATIO","促销购物篮中的促销销售额占比"),
  PROMT_VST_PROMT_QTY_RATIO: new Field("PROMT_VST_PROMT_QTY_RATIO","促销购物篮中的促销销售量占比"),
  PROMT_VST_QTY_TOT: new Field("PROMT_VST_QTY_TOT","促销购物篮的合计数量"),
  PUR_AMT_RATE: new Field("PUR_AMT_RATE","购买金额占比"),
  PUR_AMT_RATE_ACCU: new Field("PUR_AMT_RATE_ACCU","购买金额占比累计"),
  PUR_BRND_CNT: new Field("PUR_BRND_CNT","品牌宽度","种","在分析时间段内，会员购买的品牌个数"),
  PUR_CATEGORY1_CNT: new Field("PUR_CATEGORY1_CNT","小类宽度","类","在分析时间段内，会员购买的小类个数"),
  PUR_CATEGORY3_CNT: new Field("PUR_CATEGORY3_CNT","大类宽度","类","在分析时间段内，会员购买的大类个数"),
  PUR_STORE_CNT: new Field("PUR_STORE_CNT","门店宽度","家","在分析时间段内，会员在多少家门店中购物"),
  SALES_AMT_RATIO: new Field("SALES_AMT_RATIO","购买金额占比"),
  STORE_GRP_NAME: new Field("STORE_GRP_NAME", "门店组"),
  STORE_SALES: new Field("STORE_SALES","销售店铺数量"),
  TOT_CUST_CNT: new Field("TOT_CUST_CNT","合计购买人数"),
  TOT_MBR_AGG: new Field("TOT_MBR_AGG","所有选择商品、区域、人群并集的合计购买会员数"),
  TOT_MBR_CNT: new Field("TOT_MBR_CNT","合计购买会员人数", "个"),
  TOT_MBR_SALES_QTY: new Field("TOT_MBR_SALES_QTY","会员累计购买量", "件"),
  TOT_MBR_SALES_VAL: new Field("TOT_MBR_SALES_VAL","会员累计花费", "元"),
  TOT_MBR_VST_CNT: new Field("TOT_MBR_VST_CNT","会员累计购买次数", "次"),
  TOT_PROMT_AMT: new Field("TOT_PROMT_AMT","促销合计销售金额"),
  TOT_PROMT_CNT: new Field("TOT_PROMT_CNT","促销合计销售次数"),
  TOT_PROMT_MBR: new Field("TOT_PROMT_MBR","促销合计参与会员人数"),
  TOT_PROMT_QTY: new Field("TOT_PROMT_QTY","促销合计销售数量"),
  TOT_QTY_AGG: new Field("TOT_QTY_AGG","所有选择商品、区域、人群并集的合计销售数量"),
  TOT_SALES_AMT_AGG: new Field("TOT_SALES_AMT_AGG","所有选择商品、区域、人群并集的合计销售金额"),
  TOT_SALES_QTY: new Field("TOT_SALES_QTY","合计销售数量"),
  TOT_SALES_VAL: new Field("TOT_SALES_VAL","合计销售金额"),
  TOT_VST_AGG: new Field("TOT_VST_AGG","所有选择商品、区域、人群并集的合计购买次数"),
  TOT_VST_CNT: new Field("TOT_VST_CNT","合计购买次数"),
  VISIT_PENATRATION: new Field("VISIT_PENATRATION","购物篮渗透率"),
  WKS_ON_SALES: new Field("WKS_ON_SALES","销售周数")
};

// 全局变量
var __data__ = {}, __cache__ = {}, __cache_agg__ = {}, __periods__ = {}, __params__ = {}, choose = {}, charts = [], submetrics = {}, rid = -1, __timer__ = null;

// 构造选择器
var buildSelector = function (element, list) {

  function createDropdown(element, option) {
    var menu = $('<li>', {class: 'dropdown'});
    var menu_link = $('<a>', {class: 'dropdown-toggle', href: 'javascript:;'});
    var menu_label = $('<span>', {text: option.name});
    var menu_icon = $('<b>', {class: 'caret'});
    var menu_items = $('<ul>', {class: 'dropdown-menu', group: option.group});
    
    if(option.width)
      menu.width(option.width);
    
    if(option.maxWidth)
      menu_link.css('max-width', option.maxWidth);
    
    if(option.items && option.items.length > 0) {
      menu_link.attr('data-toggle', 'dropdown');
      
      for(var j in option.items) {
        var item = option.items[j];
        menu_items.append($('<li>').append($('<a>', {href: 'javascript:;', text: item.name, value: item.value})));
      }
    }
    
    option.event && menu_items.find('a').on('click', option.event);
    
    menu_link.append(menu_label);
    
    if(option.items && option.items.length)
      menu_link.append(menu_icon);
    
    menu.append(menu_link);
    
    if(menu_items.find('li').length > 0)
      menu.append(menu_items);
    
    element.append(menu);
  }
  
  function createLabel(element, option) {
    var menu = $('<li>',{class: 'dropdown'}).appendTo(element);
    var menu_link = $('<a>', {href: 'javascript:;', text: option.name}).appendTo(menu);
    
    if(option.width)
      menu.width(option.width);
    
    if(option.maxWidth)
      menu_link.css('max-width', option.maxWidth);
      
    if(option.value)
      menu_link.attr('value', option.value);
    
    option.event && menu_link.on('click', option.event);
  }
  
  function createCheckbox(element, option) {
    var id = generateRandomId('cb_');
    var menu = $('<li>',{class: 'dropdown'}).appendTo(element);
    var label = $('<label>', {'for': id, text: option.name}).appendTo(menu);
    var checkbox = $('<input>', {id: id, type: 'checkbox', style: 'margin-left:5px;'}).appendTo(menu);
    
    if(option.width)
      menu.width(option.width);
      
    if(option.value)
      checkbox.attr('value', option.value);
    
    option.event && checkbox.on('change', option.event);
  }

  for(var i in list) {
    var option = list[i];
    switch(option.type.toLowerCase()) {
      case 'dropdown':
        createDropdown(element, option);
        break;
      case 'label':
        createLabel(element, option);
        break;
      case 'checkbox':
        createCheckbox(element, option);
    }
  }
}

// 日期类型切换
var dateSwitch = function() {
  
  var elements = $("div[metric]:not([loading])").attr('loading', 1).toArray();
  
  for(var i in elements) {
    elements[i].highcharts().destroy();
  }
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
  
};

// 维度切换事件
var dimSwitch = function () {
  var element = $(this);
  var parent = element.parents('[group]');
  var group = parent.attr('group');
  
  choose[group + "_NAME"] = element.text();
  choose[group + "_IDX"] = element.attr('value');
  __params__[group.toLowerCase() + "_idx"] = element.attr('value');
  element.parents('li:eq(1)').find('a span:eq(0)').text(choose[group + "_NAME"]);
  $("#opt_params label.btn").removeClass('active');
  $("#opt_params .tab-pane").removeClass('active');
  
  if(choose[group + "_IDX"] * 1 == 0) {
    $("#opt_row").show();
    $("#opt_tabs li[group={0}]".format(group.toLowerCase())).show();
    $("#opt_tabs li[group={0}] a".format(group.toLowerCase())).tab("show");
    var index = $("#opt_tabs li[group={0}]".format(group.toLowerCase())).index();
    $('#opt_params .tab-pane:eq({0})'.format(index)).addClass('active');
    $("#opt_params label.btn[group={0}][value={1}]".format(group,choose[group + "_IDX"])).addClass('active');
  } else {
    $("#opt_tabs li[group={0}]".format(group.toLowerCase())).hide();
    
    if(group == "PROD") {
      if(choose.STORE_IDX == 0) {
        $("#opt_tabs li[group=store]").show();
        $("#opt_tabs li[group=store] a").tab("show");
        $('#opt_stores').addClass('active');
        $("#opt_params label.btn[group=STORE][value={0}]".format(choose["STORE_IDX"])).addClass('active');
      } else if(choose.MBR_IDX == 0) {
        $("#opt_tabs li[group=mbr]").show();
        $("#opt_tabs li[group=mbr] a").tab("show");
        $('#opt_members').addClass('active');
        $("#opt_params label.btn[group=MBR][value={0}]".format(choose["MBR_IDX"])).addClass('active');
      }
    } else if(group == "STORE") {
      if(choose.PROD_IDX == 0) {
        $("#opt_tabs li[group=prod]").show();
        $("#opt_tabs li[group=prod] a").tab("show");
        $('#opt_products').addClass('active');
        $("#opt_params label.btn[group=PROD][value={0}]".format(choose["PROD_IDX"])).addClass('active');
      } else if(choose.MBR_IDX == 0) {
        $("#opt_tabs li[group=mbr]").show();
        $("#opt_tabs li[group=mbr] a").tab("show");
        $('#opt_members').addClass('active');
        $("#opt_params label.btn[group=MBR][value={0}]".format(choose["MBR_IDX"])).addClass('active');
      }
    } else if(group == "MBR") {
      if(choose.PROD_IDX == 0) {
        $("#opt_tabs li[group=prod]").show();
        $("#opt_tabs li[group=prod] a").tab("show");
        $('#opt_products').addClass('active');
        $("#opt_params label.btn[group=PROD][value={0}]".format(choose["PROD_IDX"])).addClass('active');
      } else if(choose.STORE_IDX == 0) {
        $("#opt_tabs li[group=store]").show();
        $("#opt_tabs li[group=store] a").tab("show");
        $('#opt_stores').addClass('active');
        $("#opt_params label.btn[group=STORE][value={0}]".format(choose["STORE_IDX"])).addClass('active');
      }
    }
  }
  
  if(choose.PROD_IDX > 0 && choose.STORE_IDX > 0 && choose.MBR_IDX > 0) {
    $("#opt_row").hide();
    choose.options = {};
  }
  
  if(group=='PROD') {
    __params__.prod_idx = [choose.PROD_IDX];
  } else if(group=='STORE') {
    __params__.store_idx = [choose.STORE_IDX];
  } else if(group=='MBR') {
    __params__.mbr_idx = [choose.MBR_IDX];
  }
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
  
};

var typeHandle = function() {
  var element = $(this);
  __params__.data_type = element.attr('value');
  element.parent().parent().prev().find('span').text(element.text());
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
};

var groupHandle = function() {
  var element = $(this);
  var group = element.attr('group');
  $('#opt_params label.btn.active').removeClass('active');
  __params__.prod_idx = choose.PROD_IDX;
  __params__.store_idx = choose.STORE_IDX;
  __params__.mbr_idx = choose.MBR_IDX;
  if(group=='prod') {
    __params__.prod_idx = [choose.PROD_IDX];
  } else if(group=='store') {
    __params__.store_idx = [choose.STORE_IDX];
  } else if(group=='mbr') {
    __params__.mbr_idx = [choose.MBR_IDX];
  }
  $("#opt_params label.btn[group={0}][value={1}]".format(group.toUpperCase(),choose["{0}_IDX".format(group.toUpperCase())])).addClass('active');
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
};

var optionHandle = function() {
  var element = $(this).parent();
  var group = element.attr('group');
  var value = element.attr('value');
  if(__params__["{0}_idx".format(group.toLowerCase())].constructor != Array) {
    __params__["{0}_idx".format(group.toLowerCase())] = [];
  }
  if(element.hasClass('active')) {
    for(var i=0;i<__params__["{0}_idx".format(group.toLowerCase())].length;i++) {
      if(__params__["{0}_idx".format(group.toLowerCase())][i] * 1 == value * 1) {
        __params__["{0}_idx".format(group.toLowerCase())].splice(i,1);
        break;
      }
    }
  } else {
    __params__["{0}_idx".format(group.toLowerCase())].push(value);
  }
  
  if(__params__["{0}_idx".format(group.toLowerCase())].length == 0)
    __params__["{0}_idx".format(group.toLowerCase())] = [choose["{0}_IDX".format(group.toUpperCase())]];
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
};

var periodHandle = function() {
  var element = $(this);
  var value = element.attr('value');
  if(element.attr('checked')) {
    if(__params__["period"].constructor != Array) {
      __params__["period"] = [1];
    }
    __params__["period"].push(value);
  } else {
    for(var i=0;i<__params__["period"].length;i++) {
      if(__params__["period"][i] * 1 == value * 1) {
        __params__["period"].splice(i,1);
        break;
      }
    }
  }
  
  if(__params__["period"].length == 0)
    __params__["period"] = 1;
  
  if(__timer__ != null) {
    window.clearTimeout(__timer__);
  }
  
  __timer__ = window.setTimeout("loadData(loadCharts)", 100);
};

// 初始化
var init = function () {
  
  window.setTimeout(showParameter, 10);
  
  $('div[level=1] .chart-row').css('display', 'inline');
  
  // set global font family
  Highcharts.setOptions({ 
    chart: { style: { fontFamily: "'Lucida Grande',' Lucida Sans Unicode', Verdana, Arial,'Microsoft Yahei', sans-serif"}},
    title: { style:{fontSize:'14px',fontWeight:'800'}},
    credits: {enabled: false}
  });
  
  var periods = [];
  
  for(var idx = 0; idx < __data__.report.period.length; idx++) {
	var p = [], p_idx = idx + 1;
	__periods__[p_idx] = {days: {}, weeks: {}, months: {}};
	__periods__[p_idx].days = {mapping:{}, list: [], index: -1};
	__periods__[p_idx].weeks = {mapping:{}, list: [], index: -1};
	__periods__[p_idx].months = {mapping:{}, list: [], index: -1};
	  
    p[0] = moment(__data__.report.period[idx].timeStart);
    p[1] = moment(__data__.report.period[idx].timeEnd);
    
    var item = __data__.report.period[idx];
    var beginDate = moment(item.timeStart);
    var endDate = moment(item.timeEnd);
    periods.push({name: '{0} - {1}'.format(beginDate.format("YYYY/MM/DD"), endDate.format("YYYY/MM/DD")), value: p_idx});

    while(p[0] <= p[1]) {
  	
    	__periods__[p_idx].days.mapping[p[0].format("YYYYMMDD")] = ++__periods__[p_idx].days.index;
    	__periods__[p_idx].days.list.push(p[0].format("YYYY年MM月DD日"));
  	
	  	if(__periods__[p_idx].weeks.index == -1 || (p[0].format("GGGG年WW周") != __periods__[p_idx].weeks.list[__periods__[p_idx].weeks.index])) {
	  		__periods__[p_idx].weeks.mapping[p[0].format("GGGGWW")] = ++__periods__[p_idx].weeks.index;
	  		__periods__[p_idx].weeks.list.push(p[0].format("GGGG年WW周"));
	  	}
	  	
	  	if(__periods__[p_idx].months.index == -1 || (p[0].format("YYYY年MM月") != __periods__[p_idx].months.list[__periods__[p_idx].months.index])) {
	  		__periods__[p_idx].months.mapping[p[0].format("YYYYMM")] = ++__periods__[p_idx].months.index;
	  		__periods__[p_idx].months.list.push(p[0].format("YYYY年MM月"));
	  	}
  	
        p[0].add(1, 'day');
    }
  }

  var E = Enumerable.From(__cache__.MAP);
  choose = $.extend({}, choose, E.Single("$.PROD_IDX==0 && $.STORE_IDX==0 && $.MBR_IDX==0"));
  
  var options = [{
      name : choose.PROD_NAME,
      group : 'PROD',
      type : 'dropdown',
      event : dimSwitch,
      items : E.Distinct('$.PROD_NAME').Select("{name:$.PROD_NAME, value: $.PROD_IDX}").ToArray()
    }, {
      name : choose.STORE_NAME,
      group : 'STORE',
      type : 'dropdown',
      event : dimSwitch,
      items : E.Distinct('$.STORE_NAME').Select("{name: $.STORE_NAME, value: $.STORE_IDX}").ToArray()
    }, {
      name : choose.MBR_NAME,
      group : 'MBR',
      type : 'dropdown',
      event : dimSwitch,
      items : E.Distinct('$.MBR_NAME').Select("{name: $.MBR_NAME, value: $.MBR_IDX}").ToArray()
    }, {
      name : "当前时间段 " + periods[0].name,
      group : 'PERIOD',
      type : 'label',
      value : periods[0].value,
      width : 240,
      maxWidth : 210
    }, {
      name : "对比时间段 " + periods[1].name,
      group : 'PERIOD',
      type : 'checkbox',
      value : periods[1].value,
      maxWidth : 240,
      maxWidth : 210,
      event : periodHandle
    }, {
      name : '周',
      value : 'week',
      group : 'DATE',
      type : 'dropdown',
      items : [{name: '日', value: 'day'},{name: '周', value: 'week'},{name: '月', value: 'month'}],
      event : typeHandle
    }
  ];
  
  var tmp = '<label class="btn btn-primary" group="{0}" value="{1}"><input type="checkbox">{2}</label>';
  
  var t1 = $("#opt_products .btn-group");
  var t2 = $("#opt_stores .btn-group");
  var t3 = $("#opt_members .btn-group");
  
  var flag = true;
  for(var idx in options[0].items) {
    var label = $(tmp.format("PROD", options[0].items[idx].value, options[0].items[idx].name));
    flag && (flag = false, label.addClass('active'));
    t1.append(label);
  }
  
  for(var idx in options[1].items) {
    t2.append($(tmp.format("STORE", options[1].items[idx].value, options[1].items[idx].name)));
  }
  
  for(var idx in options[2].items) {
    t3.append($(tmp.format("MBR", options[2].items[idx].value, options[2].items[idx].name)));
  }
  
  buildSelector($("#main-content nav ul:eq(0)"), options);
  
  $('#metric_tree').on('selected', function(ev, args){
    
    if(__timer__ != null) {
      window.clearTimeout(__timer__);
    }
    
    __timer__ = window.setTimeout('loadCharts(true)', 100);
  });
  
  $('#metric_tree').on('unselected', function(ev, args){
    var target = $(".col-sm-9 .row[metric={0}] .chart-row".format(args.info.metric));
    if(target.length) {
      var chart = target.highcharts();
      chart && chart.destroy();
      $(".col-sm-9 .row[metric={0}]".format(args.info.metric)).remove();
    }
  });
  
  $('#metric_tree').on('loaded', loadCharts);
  
  $('#opt_tabs  li').on('click', groupHandle);
  
  $('#opt_params label.btn input').on('change', optionHandle);
  
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
  
  loadCharts();
};

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
  
  params.period.begin = beginDate.format("YYYY/MM/DD");
  params.period.end = endDate.format("YYYY/MM/DD");
  params.period.week = endDate.diff(beginDate, 'week') + 1;
  
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

function loadCharts(flag) {
  
  var items = $("#metric_tree").tree("selectedItems");
  var field = $("#opt_tabs li[group].active").attr('group').toUpperCase() + "_IDX";
  
  function init(_metric, _name) {
    if(!$(".col-sm-9 .row[metric={0}]".format(_metric)).length) {
      var row = $('<div>',{class:'row',metric:_metric}).insertAfter($('#opt_row'));
      var col = $('<div>',{class:'col-sm-12'}).appendTo(row);
      var panel = $('<section>',{class:'panel'}).appendTo(col);
      var header = $('<header>',{class:'panel-heading'}).appendTo(panel);
      var title = $('<a>',{href:'javascript:;',text:_name}).appendTo(header);
      var toolbar = $('<span>',{class:'tools pull-right'}).appendTo(header);
      var tool1 = $('<a>',{class:'fa fa-chevron-down'}).appendTo(toolbar);
      var tool2 = $('<a>',{class:'fa fa-cog'}).appendTo(toolbar);
      var body = $('<div>',{class:'panel-body'}).appendTo(panel);
      var container =$('<div>',{class:'chart-row'}).appendTo(body);
    } else {
      $(".col-sm-9 .row[metric={0}] .chart-row".format(_metric)).highcharts().destroy();
    }
  }
  
  function load(data, target) {
      if(data) {
    	  target.data('items', data);
      } else {
    	  data = target.data('items');
      }
    var _metric = target.attr('metric');
    var container = target.find('.chart-row');
    
    var legendField = null, xField = null;
    if(__params__.prod_idx.constructor == Array)
      legendField = "PROD_NAME";
    else if(__params__.store_idx.constructor == Array)
      legendField = "STORE_NAME";
    else if(__params__.mbr_idx.constructor == Array)
      legendField = "MBR_NAME";
    
    if(__params__.data_type.toLowerCase() == 'day') 
      xField = 'DATE_SKID';
    else if(__params__.data_type.toLowerCase() == 'week') 
      xField = 'WK_SKID';
    else if(__params__.data_type.toLowerCase() == 'month') 
      xField = 'MTH_SKID';

    var series = [];
    var categories = [];
    var tips = [];
    var p_idx = null, s_idx = null, f_idx = null, idx = null;
    
    // 遍历所有时间段
    for(p_idx=0; p_idx<data.length; p_idx++) {
    	
      var suffix = p_idx == 0 ? '当前' : '对比';
      // 遍历所有系列
      var p = __periods__[data[p_idx].key][__params__.data_type + "s"];
      
      if(p_idx==0) {
    	  categories = p.list;
      }

      var E = Enumerable.From(data[p_idx].items);
      
      var dims = E.OrderBy("$.DIM_TYPE").PartitionBy("$.DIM_TYPE", "", "key,item=>{key:key, items:item.ToArray()}").ToObject("$.key", "$.items");
      
      if(__params__[field.toLowerCase()].indexOf(0) > -1) {
    	  var items = dims[0];
          var serie = {data:[]};
          var tip = p.list;
          if(legendField != null)
            serie.name = items[0][legendField] + ' - ' + suffix;
          
          // 初始化该系列的所有值
          for(var i=0;i<=p.index;i++) {
          	serie.data[i] = 0;
          }
          
          // 遍历该系列的所有值
          for(idx=0; idx<items.length; idx++) {
            var skid = items[idx][xField];
            var index = p.mapping[skid];
            serie.data[index] = items[idx][_metric];
          }
          
          tips.push(tip);
          series.push(serie);
      }
      
      // TODO
      var f_items = Enumerable.From(dims[choose.DIM_TYPE]).OrderBy("$.{0}".format(field)).PartitionBy("$.{0}".format(field), "", "key,item=>{key:key, items:item.ToArray()}").ToArray();
      
      for(f_idx=0;f_idx<f_items.length;f_idx++) {
          var items = f_items[f_idx].items;
          var serie = {data:[]};
          var tip = p.list;
          if(legendField != null)
            serie.name = items[0][legendField] + ' - ' + suffix;
          
          // 初始化该系列的所有值
          for(var i=0;i<=p.index;i++) {
          	serie.data[i] = 0;
          }
          
          // 遍历该系列的所有值
          for(idx=0; idx<items.length; idx++) {
            var skid = items[idx][xField];
            var index = p.mapping[skid];
            serie.data[index] = items[idx][_metric];
          }
          
          tips.push(tip);
          series.push(serie);
      }
      
    }
    
    container.highcharts({
      title: {text: null},
      xAxis: {categories: categories,
              arkoTips:tips,
              labels : { 
                rotation: -70,
                fontStyle : 'italic'  //实现字体斜放，关于合成词属性的书写，第二个单词的首字母需要大写，中间没有连字符-
             }},
      yAxis: {},
      tooltip: {
          formatter: function(){
            var head= '';
            var body = '';
            head = '<small>'+this.series.name+'</small><br/>';
            body = '<label>时间:</label><span>'+this.series.xAxis.userOptions.arkoTips[this.series.index][this.point.x]+'</span><br/>'+
                   '<label>数值:</label><span>'+this.y+'</span><br/>';
            return head + body;
          }
      },
      series: series
    });
  }
  
  for(var i in items) {
    var _metric = items[i].metric;
    init(_metric, items[i].name);
  }
  
  var E = Enumerable.From(__data__.data);
  
  var data = E.OrderBy("$.PERIOD").PartitionBy("$.PERIOD", "", "key,item=>{key:key, items:item.ToArray()}").ToArray();
  var dim_list = E.OrderBy("$.DIM_TYPE").Distinct("$.DIM_TYPE").Select("$.DIM_TYPE").ToArray();
  var all_dim = ['基于产品全集', '基于门店全集', '基于会员全集'];

	var flag = false;
	var btn_group = $('<div>', {'class': 'btn-group'});
	var button = $('<button>', {'class': 'btn btn-default dropdown-toggle btn-sm', type: 'button', 'data-toggle': 'dropdown'});
	var menu = $('<ul>', {'class': 'dropdown-menu', role: 'menu'});
	
	for(var i in dim_list) {
		var dim = dim_list[i] * 1;
		
		if(dim == 0) {
			choose.DIM_TYPE = 0;
			continue;
		}
		
		var name = all_dim[dim - 1];
		
		if(!flag) {
			btn_group.append(button.append($('<span>',{text: name})).append($('<span>', {'class': 'caret'})));
			btn_group.append(menu);
			flag = true;
			choose.DIM_TYPE = dim;
			choose.DIM_NAME = name;
		}
		
		menu.append($('<li>').append($('<a>',{href: '#', text: name, value: dim})));
	}
	
  var targets = $(".col-sm-9 .row[metric]").toArray();
  var target = null;
  
  while(target = targets.pop()) {
	var element = $(target);
	var metric = element.attr('metric');

	// 增加占比维度下拉框
	if(flag && (metric.indexOf('RATIO') || metric.indexOf('LIFT_IDX'))) {
		var container = element.find('.btn-group');
		if(container.length) {
			container.prev().remove();
			container.remove();
		}
		element.find('header.panel-heading span').before($('<span>', {text: ' - '})).before(btn_group.clone());
	}
	
    load(data, element);
  }
  
  btn_group.empty();
  
  $(".col-sm-9 .row[metric]").find('.dropdown-menu a').click(function(){
	  var element = $(this);
	  var dim = element.attr('value') * 1;
	  if(choose.DIM_TYPE != dim) {
		  var all_dim = ['基于产品全集', '基于门店全集', '基于会员全集'];
		  choose.DIM_TYPE = dim;
		  choose.DIM_NAME = all_dim[dim - 1];
		  element.parents('header').find('.btn-group button span:eq(0)').text(choose.DIM_NAME);;
		  load(null, element.parents(".row[metric]"));
	  }
  });
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
  var opts = $.extend(true, {}, __params__);
  
  for(var idx in opts) {
    if(opts[idx].constructor == Array) {
      opts[idx] = "IN:{0}".format(opts[idx].join(","));
    }
  }
  
  $.getJSON('/arko/get/{0}/data.do'.format(rid), opts, function (json) {
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
  
  // 参数支持类型 key:value key:'operation:value' key:'operation:values'
  // 支持的操作有 EQ IN
  __params__ = {code: 'kmtcube', data_type: 'week', period: 1, prod_idx: [0], store_idx: 0, mbr_idx: 0, sort: 'date_skid,asc'};
  
  loadReport();
  
});