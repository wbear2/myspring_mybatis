
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

// 聚合表模板
var agg_template = '{' +
  'NAME: key,' +
  'MIN: item.Min("$.GRP_VALUE*1"),' +
  'MAX: item.Max("$.GRP_VALUE*1"),' +
  'SUM: item.Sum("$.GRP_VALUE*1"),' +
  'COUNT: item.Count("$"),' +
  'TOT_MBR_CNT: item.Sum("$.TOT_MBR_CNT"),' +
  'MBR_RATIO: item.Sum("$.MBR_RATIO"),' +
  'TOT_MBR_SALES_VAL: item.Sum("$.TOT_MBR_SALES_VAL"),' +
  'TOT_MBR_SALES_QTY: item.Sum("$.TOT_MBR_SALES_QTY"),' +
  'TOT_MBR_VST_CNT: item.Sum("$.TOT_MBR_VST_CNT"),' +
  'AVG_PROD_AMT: item.Sum("$.TOT_MBR_SALES_VAL") / item.Sum("$.TOT_MBR_SALES_QTY"),' +
  'AVG_MBR_SALES_AMT: item.Sum("$.TOT_MBR_SALES_VAL") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_MBR_QTY: item.Sum("$.TOT_MBR_SALES_QTY") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_MBR_VST_CNT: item.Sum("$.TOT_MBR_VST_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'MBR_AVG_VST_AMT: item.Sum("$.TOT_MBR_SALES_VAL") / item.Sum("$.TOT_MBR_VST_CNT"),' +
  'AVG_CUST_QTY: item.Sum("$.TOT_MBR_SALES_QTY") / item.Sum("$.TOT_MBR_VST_CNT"),' +
  'AVG_PUR_STORE_CNT: item.Sum("$.PUR_STORE_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_PUR_CATEGORY3_CNT: item.Sum("$.PUR_CATEGORY3_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_PUR_CATEGORY1_CNT: item.Sum("$.PUR_CATEGORY1_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_PUR_BRND_CNT: item.Sum("$.PUR_BRND_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_FIRST_INTERVAL: item.Sum("$.AVG_FIRST_INTERVAL * $.TOT_MBR_CNT") / item.Sum("$.TOT_MBR_CNT"),' +
  'AVG_LAST_INTERVAL: item.Sum("$.AVG_LAST_INTERVAL * $.TOT_MBR_CNT") / item.Sum("$.TOT_MBR_CNT")' +
'}';

// 获取多系列线图数据
var get_spline_data = function() {
  var json = this.config.datasource;
  var categories = [];
  var series = [];
  var tmp = {};
  var resolve = this.config.chart.resolve;
    
  // 遍历数据源
  for (var i in json) {
    var c = json[i][resolve.categories.field];
    categories.push(c?c:'0');

    for (var j in resolve.series) {
      var serie = resolve.series[j];

      var val = json[i][serie.field];

      if (!tmp[serie.field]) {
        tmp[serie.field] = { name : serie.name, yAxis : serie.index, marker : { enabled : false }, data : [] };
        
        if(serie.type)
          tmp[serie.field].type = serie.type;
      }
      
      tmp[serie.field].data.push(val);
    }
  }

  for (i in tmp) {
    series.push(tmp[i]);
  }
  
  var metric = this.config.metric.name;
  var tmp = __cache_agg__[metric];
  
  var percent20 = null, percent50 = null, percent80 = null, line, lines = [], plotLines = [];
  
  // 计算20,50,80分位
  for(var i in tmp) {
    percent20 = tmp[i].NAME=='0-20%' ? tmp[i].MAX : percent20;
    percent50 = tmp[i].NAME=='20-50%' ? tmp[i].MAX : percent50;
    percent80 = tmp[i].NAME=='50-80%' ? tmp[i].MAX : percent80;
  }
  
  percent20 && lines.push({label: '20分位', value: percent20});
  percent50 && lines.push({label: '50分位', value: percent50});
  percent80 && lines.push({label: '80分位', value: percent80});
  
  if(lines.length) {
    lines.reverse();

    line = lines.pop();

    // 计算辅助线位置
    for(var i in categories) {
      if(categories[i] == line.value) {

        plotLines.push({value: i, color: 'red', width: 1, dashStyle: 'dashdot', label: {text: line.label, rotation: 0, x: -24, y: 20}});

        if(lines.length) 
          line = lines.pop();
        else 
          break;
      }
    }
  }
  
  var faq = this.config.metric.faq;
  var faqHTML = '';
  
  if(!faq)
    faq = Fields[metric].faq;
  
  if(faq) {
    faqHTML = ' class="popovers" data-original-title="{0}" data-content="{1}" data-trigger="hover" data-placement="bottom" loading'.format(faq.title, faq.text);
  }
  
  this.options = {
    chart: {defaultSeriesType: 'spline', spacingTop: 32, height: 270},
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: {text: "<span style='font-size:16px;' {0}>{1}</span><a href='javascript:changeLayer(\"{2}\");'>查看详细</a>".format(faqHTML, Fields[metric].fullName, metric), useHTML: true},
    tooltip: {formatter: function() {return '{0}: {1}<br/>{2}: {3}'.format(Fields[metric].displayName, commaify(this.x), this.series.name, this.y.formatPercent(2));}},
    xAxis: {
      categories: categories,
      minTickInterval: Math.round(categories.length / 6),
      plotLines: plotLines,
      title: Fields[metric].fullName,
      labels: {
        formatter: function() {
          try {
            return isNaN(this.value) ? this.value : commaify((this.value*1).toFixed(0)) + (Fields[metric].unit);
          } catch (e){
            return this.value;
          }
        }
      }
    },
    yAxis: [
      {index: 0, labels: {
          formatter: function() {
            try {
              return isNaN(this.value) ? this.value : this.value.formatPercent(1);
            } catch (e){
              return this.value;
            }
          }
        }, 
        title: {align: 'high', offset: 30, rotation: 0, text: '占比', x: 22, y: -16}, min: 0},
      {index: 1, labels: {formatter: labelFormatter}, title: {align: 'high', offset: 40, rotation: 0, text: '累计', x: -6, y: -16}, min: 0, max: 1, opposite: true, gridLineDashStyle: 'longdash'}
    ],
    series: series
  };
}

var get_bar_data = function() {
  var json = this.config.datasource;
  var categories = ['会员人数占比', '购买金额占比'];
  var series = [];
  var resolve = this.config.chart.resolve;
  var metric = this.config.metric.name;
  var colors = ["#3366cc", "#3398d3", "#34badb", "#34e1e2", "#34e9b1", "#34f064", "#def833", "#ee6633"];
  
  var def = resolve.legend;
  
  // 遍历数据源
  for (var i in json) {
    var legend = json[i][def.field];
    legend = legend ? (legend*1) : 0;
    legend = def.digits > -1 ? legend.toFixed(def.digits) : legend;
    legend = def.unit ? '{0}{1}'.format(legend, def.unit) : legend + '';
    series.push({name: legend, data: [json[i].MBR_RATIO, json[i].PUR_AMT_RATE], stack: 0});
  }
  
  series = series.reverse();
  
  for(var i = 0; i < series.length && i < colors.length; i++) {
    series[series.length - i - 1].color = colors[i];
  }
  
  var faq = this.config.metric.faq;
  var faqHTML = '';
  
  if(!faq)
    faq = Fields[metric].faq;
  
  if(faq) {
    faqHTML = ' class="popovers" data-original-title="{0}" data-content="{1}" data-trigger="hover" data-placement="bottom" loading'.format(faq.title, faq.text);
  }
  
  this.options = {
    chart: {defaultSeriesType: 'bar', spacingTop: 32, spacingRight: 32, height: 270},
    title: {text: "<span style='font-size:16px;' {0}>{1}</span><a href='javascript:changeLayer(\"{2}\");'>查看详细</a>".format(faqHTML, Fields[metric].fullName, metric), useHTML: true},
    tooltip: {formatter: function() {return '{0}: {1}<br/>{2}: {3}'.format(Fields[metric].displayName, this.series.name, this.x, this.y.formatPercent(2));}},
    plotOptions: {series: { stacking: 'nromal' }},
    legend: { reversed: true },
    xAxis: { categories: categories.reverse() },
    yAxis: { labels: {formatter: labelFormatter}, min: 0, max: 1, stackLabels: {enabled: false}, title: null },
    series: series
  };
}

// 获取单系列线图数据
var get_line_data = function() {
  var json = this.config.datasource;
  var categories = [];
  var series = [];
  var tmp = {};
  var resolve = this.config.chart.resolve;

  // 遍历数据源
  for (var i in json) {
    var category = json[i][resolve.categories.field];
    var legend = json[i][resolve.legend.field]
    var value = json[i][resolve.series.field];

    if (!tmp[legend])
      tmp[legend] = {};

    tmp[legend][category] = value;

    if (categories.indexOf(category) == -1)
      categories.push(category);
  }

  for (var i in tmp) {
    var item = {
      name : i,
      data : []
    }
    for (var j in categories) {
      var c = categories[j];
      item.data.push(tmp[i][c] ? tmp[i][c] : '-');
    }
    series.push(item);
  }
  
  // 传入数据
  if (this.options.xAxis)
    this.options.xAxis.categories = categories;
  this.options.series = series;
}

// 获取饼图数据
var get_column_data = function() {
  var json = this.config.datasource;
  var categories = [];
  var series = [];
  var resolve = this.config.chart.resolve;
  var metric = this.config.metric.name;
  
  var item = {data : []};
  
  // 遍历数据源
  for (var i in json) {
    
    var legend = json[i][resolve.legend.field];
    var value = json[i][resolve.series.field];
    
    legend = resolve.legend.unit ? '{0}{1}'.format(legend, resolve.legend.unit) : legend + '';
    
    item.data.push([legend, value]);
    
    if(resolve.categories) {
      var category = json[i][resolve.categories.field];
      category = resolve.categories.unit ? '{0}{1}'.format(category, resolve.categories.unit) : category + '';
      categories.push(category);
    }
  }
  series.push(item);
  
  // 计算偏移量
  var width = getWidth(Fields[this.config.metric.name].fullName, null, null, 'bold');
  
  // 传入数据
  this.options = {
    chart: { defaultSeriesType: 'column', spacingTop: 32, height: 200 },
    colors: ['#24CBE5', '#50B432', '#ED561B', '#DDDF00', '#058DC7', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: { text: null },
    //tooltip: { pointFormat: '<b>{point.y:.2f}</b>' },
    tooltip: {formatter: function() {return '{0}: {1}<br/>{2}: {3}'.format("人数分组", this.x, Fields[metric].displayName, this.y.toFixed(1));}},
    plotOptions: { 
      column: { allowPointSelect: true, cursor: 'pointer', showInLegend: false},
      series: {
        dataLabels: {
          enabled: true, 
          formatter: function(){
            var val = this.y;
            if(!isNaN(val)) {
              val = (val*1);
              val = val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val.toFixed(1);
              val = commaify(val);
            }
            return val;
          },
          color: '#444',
          //backgroundColor: 'rgba(255,255,255,0.5)',
          borderRadius: 1,
          padding: 5,
          y: 0
        }
      }
    },
    xAxis: { categories: categories },
    yAxis: { min: 0, title: {align: 'high', text: Fields[this.config.metric.name].fullName, offset: -(width - 50), rotation: 0, x: 0, y: -16} },
    series: series
  };
}

// 获取饼图数据
var get_pie_data = function() {
  var json = this.config.datasource;
  var series = [];
  var resolve = this.config.chart.resolve;
  var metric = this.config.metric.name;
  
  var item = { type: 'pie', innerSize: '50%', data : [] };
  
  // 遍历数据源
  for (var i in json) {
    var legend = json[i][resolve.legend.field];
    var value = json[i][resolve.series.field];
    
    legend = resolve.legend.unit ? '{0}{1}'.format(legend, resolve.legend.unit) : legend + '';
    
    item.data.push([legend, value]);
  }
  series.push(item);
  
  this.options = {
    chart: { defaultSeriesType: 'pie', height: 230 },
    colors: ['#24CBE5', '#50B432', '#ED561B', '#DDDF00', '#058DC7', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: { text: null },
    //tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
    tooltip: {
      formatter: function() {
        var val = this.y;
        val = val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val.toFixed(1);
        Fields[metric].unit && (val += Fields[metric].unit);
        return '{0}: {1}<br/>{2}: {3}%({4})'.format("人数分组", this.key, Fields[metric].displayName, this.percentage.toFixed(1), val);
      }
    },
    //tooltip: { pointFormat: '<b>{point.y:.1f} ({point.percentage:.1f}%)</b>' },
    plotOptions: { 
      pie: { 
        allowPointSelect: true, 
        cursor: 'pointer', 
        showInLegend: true,
        dataLabels: {enabled: false}
      }
    },
    series: series
  }
}

var getData = function() {
  var type = this.config.chart.chart.toLowerCase();
  if(type == 'spline') {
    // 计算数据点的数量
    var len = Enumerable.From(this.config.datasource).Distinct('$.GRP_VALUE').ToArray().length;
    type = len <= 10 ? 'bar' : 'spline';
  }
  
  if(this.config.chart.category == 'core') {
    this.config.chart.resolve = $.extend(true, {
      categories: {field: 'GRP_VALUE'},
      legend: {field: 'GRP_VALUE', unit: Fields[this.config.metric.name].unit},
      series: [
        {name: '会员人数占比', field: 'MBR_RATIO', index: 0, type: 'areaspline'}, 
        {name: '购买金额占比', field: 'PUR_AMT_RATE', index: 0, type: 'areaspline'},
        {name: '会员人数占比累计', field: 'MBR_RATIO_ACCU', index: 1}, 
        {name: '购买金额占比累计', field: 'PUR_AMT_RATE_ACCU', index: 1}
      ]
    }, this.config.chart.resolve);
  }
  
  window['get_{0}_data'.format(type)].apply(this);
}

var labelFormatter = function() {
    try {
      return isNaN(this.value) ? this.value : this.value.formatPercent(0);
    } catch (e){
      return this.value;
    }
  };

// defaultSeriesType 支持的参数 line, spline, area, areaspline, column, bar, pie , column，scatter

// 各种指标设定
var Metrics = {
  core: {
    TOT_MBR_SALES_VAL: {
      type : 'highcharts',
      name: 'TOT_MBR_SALES_VAL',
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "TOT_MBR_SALES_VAL"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 1} },
      fn: getData
    },
    TOT_MBR_SALES_QTY: {
      type : 'highcharts',
      name: "TOT_MBR_SALES_QTY",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "TOT_MBR_SALES_QTY"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    TOT_MBR_VST_CNT: {
      type : 'highcharts',
      name: "TOT_MBR_VST_CNT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "TOT_MBR_VST_CNT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    AVG_MBR_SALES_AMT: {
      type : 'highcharts',
      name: "AVG_MBR_SALES_AMT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "AVG_MBR_SALES_AMT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 1} },
      fn: getData
    },
    AVG_MBR_QTY: {
      type : 'highcharts',
      name: "AVG_MBR_QTY",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "AVG_MBR_QTY"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      fn: getData
    },
    MBR_AVG_VST_AMT: {
      type : 'highcharts',
      name: "MBR_AVG_VST_AMT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "MBR_AVG_VST_AMT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 1} },
      fn: getData
    },
    MBR_AVG_QTY: {
      type : 'highcharts',
      name: "MBR_AVG_QTY",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "MBR_AVG_QTY"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 1} },
      fn: getData
    },
    PUR_STORE_CNT: {
      type : 'highcharts',
      name: "PUR_STORE_CNT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "PUR_STORE_CNT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      }, 
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    PUR_CATEGORY3_CNT: {
      type : 'highcharts',
      name: "PUR_CATEGORY3_CNT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "PUR_CATEGORY3_CNT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      }, 
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    PUR_CATEGORY1_CNT: {
      type : 'highcharts',
      name: "PUR_CATEGORY1_CNT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "PUR_CATEGORY1_CNT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    PUR_BRND_CNT: {
      type : 'highcharts',
      name: "PUR_BRND_CNT",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "PUR_BRND_CNT"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      resolve: { legend: {digits: 0} },
      fn: getData
    },
    FIRST_INTERVAL: {
      type : 'highcharts',
      name: "FIRST_INTERVAL",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "FIRST_INTERVAL"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      }, 
      fn: getData
    },
    LAST_INTERVAL: {
      type : 'highcharts',
      name: "LAST_INTERVAL",
      category: 'core',
      chart: 'spline',
      query: '$.GRP_TYPE == "LAST_INTERVAL"',
      pivotTable: {
        enabled: true,
        piecewise: [
          {label: '<=0', expression: 'val=>isNaN(val) || val<=0'},
          {label: '0-20%', expression: 'val=>!isNaN(val) && val>0 && val<=0.2'},
          {label: '20-50%', expression: 'val=>!isNaN(val) && val>0.2 && val<=0.5'},
          {label: '50-80%', expression: 'val=>!isNaN(val) && val>0.5 && val<=0.8'},
          {label: '80-95%', expression: 'val=>!isNaN(val) && val>0.8 && val<=0.95'},
          {label: '95-100%', expression: 'val=>!isNaN(val) && val>0.95'}
        ]
      },
      fn: getData
    }
  }, 
  summary: {
    KPI_TREE: {
      type: 'jQueryTree',
      name: 'KPI_TREE',
      category: 'summary',
      options: { data: null },
      fn: function() {
        var E = Enumerable.From(__cache__.TOT_MBR_VST_CNT);
        var t1 = '{' +
        'TOT_MBR_CNT: commaify(item.Sum("$.TOT_MBR_CNT")),' +
        'TOT_MBR_SALES_AMT: item.Sum("$.TOT_MBR_SALES_VAL").toFixed(1),' +
        'NEW_MBR_CNT: commaify(item.Sum("$.NEW_MBR_CNT")),' +
        'OLD_MBR_CNT: commaify(item.Sum("$.TOT_MBR_CNT") - item.Sum("$.NEW_MBR_CNT")),' +
        'AVG_PROD_AMT: commaify((item.Sum("$.TOT_MBR_SALES_VAL") / item.Sum("$.TOT_MBR_SALES_QTY")).toFixed(1))' +
      '}';
        
        var t2="[{label:'<i class=\"fa fa-dollar\"></i> 会员销售额',value:item.TOT_MBR_SALES_AMT>=10000?commaify((item.TOT_MBR_SALES_AMT/10000).toFixed(1))+'万元':commaify(item.TOT_MBR_SALES_AMT)+'元',css:'current big-font'," +
          "items:[{label:'<i class=\"fa fa-female\"></i> 会员人数',value:item.TOT_MBR_CNT+'人',css:'tree-left-div1'," +
          "items:[{label:'新会员人数',value:item.NEW_MBR_CNT+'人',css:'tree-left-div2'},{label:'老会员人数',value:item.OLD_MBR_CNT+'人',css:'tree-left-div2'}]}," +
          "{label:'<i class=\"fa fa-shopping-cart\"></i> 人均花费',value:item.TOT_MBR_SALES_VAL+'元',css:'tree-right-div1 normal-font'," +
          "items:[{label:'单次花费',css:'tree-right-div2',value:item.AVG_MBR_SALES_AMT+'元'," +
          "items:[{label:'单次购买量',css:'tree-right-div2',value:item.AVG_MBR_QTY+'件'},{label:'件单价',css:'tree-right-div2',value:item.AVG_PROD_AMT+'元'}]}," +
          "{label:'购买次数',css:'tree-right-div2',value:item.TOT_MBR_VST_CNT+'次'},{label:'累计购买数量',css:'tree-right-div2',value:item.TOT_MBR_SALES_QTY+'件'}" +
          "]}]}]";
        
        var data = E.GroupBy('$!=null','','key,item=>'+t1).ToArray();
        
        for(var i in __cache__.SUMMARY) {
        	var item = __cache__.SUMMARY[i];
        	data[0][item.GRP_TYPE] = commaify((item.AVG_GRP_VALUE * 1).toFixed(1));
        }
        
        this.options.data = Enumerable.From(data).Select("item=>"+t2).ToArray()[0];
      }
    },
    KPI_TABLE: {
      type: 'dataTable2',
      name: 'KPI_TABLE',
      category: 'summary',
      options: {
        data: null,
        header : [
          {text: '人均指标'},
          {text: '均值'},
          {text: '中位数'},
          {text: '最大值'},
          {text: '最小值'}
        ],
        columns : [{
            render : function (data) {
              return Fields[data.GRP_TYPE].fullName;
            }
          }, 
          {field : 'AVG_GRP_VALUE', digits : 1, css : 'align-center'},
          {field : 'MEDIAN_GRP_VALUE', digits : 1, css : 'align-center'}, 
          {field : 'MAX_GRP_VALUE', digits : 0, css : 'align-center'}, 
          {field : 'MIN_GRP_VALUE', digits : 0, css : 'align-center'}
        ]
      },
      fn: function() {
        this.options.data = __cache__.SUMMARY;
      }
    },
    METRIC: {
      type: 'dataTable',
      name: 'METRIC',
      category: 'summary',
      options: {
        data: null,
        'class': 'table table-striped table-hover table-bordered dataTable',
        header : [
          {text: '分组'},
          {text: '切分点'},
          {text: '人数'}
        ],
        columns : [
          {field : 'GRP', digits : null, css : 'align-center'},
          {field : 'POINT', digits : 1, css : 'align-center'},
          {field : 'TOTAL', digits : 0, css : 'align-center'}
        ]
      },
      fn: function() {
        var unit = Fields[choose.metric] && Fields[choose.metric].unit ? Fields[choose.metric].unit : '';
        this.options.header[1].text += '({0})'.format(unit);
        var t = '{GRP:$.NAME, POINT: $.MIN.toFixed(1) + "-" + $.MAX.toFixed(1), TOTAL: $.TOT_MBR_CNT}';
        this.options.data = Enumerable.From(__cache_agg__[choose.metric]).Select(t).ToArray();
      }
    }
  },
  details: {
    TOT_MBR_CNT: {
      type : 'highcharts',
      name: "TOT_MBR_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_CNT'}
      },
      fn: getData
    },
    MBR_RATIO: {
      type : 'highcharts',
      name: "MBR_RATIO",
      category: 'details',
      chart: 'pie',
      resolve: {
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_CNT'}
      },
      fn: getData
    },
    PUR_AMT_RATE: {
      type : 'highcharts',
      name: "PUR_AMT_RATE",
      category: 'details',
      chart: 'pie',
      resolve: {
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_SALES_VAL'}
      },
      fn: getData
    },
    TOT_MBR_SALES_VAL: {
      type : 'highcharts',
      name: "TOT_MBR_SALES_VAL",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_SALES_VAL'}
      },
      fn: getData
    },
    TOT_MBR_SALES_QTY: {
      type : 'highcharts',
      name: "TOT_MBR_SALES_QTY",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_SALES_QTY'}
      },
      fn: getData
    },
    TOT_MBR_VST_CNT: {
      type : 'highcharts',
      name: "TOT_MBR_VST_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'TOT_MBR_VST_CNT'}
      },
      fn: getData
    },
    AVG_PROD_AMT: {
      type : 'highcharts',
      name: "AVG_PROD_AMT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_PROD_AMT'}
      },
      fn: getData
    },
    AVG_MBR_SALES_AMT: {
      type : 'highcharts',
      name: "AVG_MBR_SALES_AMT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_MBR_SALES_AMT'}
      },
      fn: getData
    },
    AVG_MBR_QTY: {
      type : 'highcharts',
      name: "AVG_MBR_QTY",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_MBR_QTY'}
      },
      fn: getData
    },
    AVG_MBR_VST_CNT: {
      type : 'highcharts',
      name: "AVG_MBR_VST_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_MBR_VST_CNT'}
      },
      fn: getData
    },
    MBR_AVG_VST_AMT: {
      type : 'highcharts',
      name: "MBR_AVG_VST_AMT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'MBR_AVG_VST_AMT'}
      },
      fn: getData
    },
    AVG_CUST_QTY: {
      type : 'highcharts',
      name: "AVG_CUST_QTY",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_CUST_QTY'}
      },
      fn: getData
    },
    AVG_PUR_STORE_CNT: {
      type : 'highcharts',
      name: "AVG_PUR_STORE_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_PUR_STORE_CNT'}
      },
      fn: getData
    },
    AVG_PUR_CATEGORY3_CNT: {
      type : 'highcharts',
      name: "AVG_PUR_CATEGORY3_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_PUR_CATEGORY3_CNT'}
      },
      fn: getData
    },
    AVG_PUR_CATEGORY1_CNT: {
      type : 'highcharts',
      name: "AVG_PUR_CATEGORY1_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_PUR_CATEGORY1_CNT'}
      },
      fn: getData
    },
    AVG_PUR_BRND_CNT: {
      type : 'highcharts',
      name: "AVG_PUR_BRND_CNT",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_PUR_BRND_CNT'}
      },
      fn: getData
    },
    AVG_FIRST_INTERVAL: {
      type : 'highcharts',
      name: "AVG_FIRST_INTERVAL",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_FIRST_INTERVAL'}
      },
      fn: getData
    },
    AVG_LAST_INTERVAL: {
      type : 'highcharts',
      name: "AVG_LAST_INTERVAL",
      category: 'details',
      chart: 'column',
      resolve: {
        categories: {field: 'NAME'},
        legend: {field: 'NAME'},
        series: {field: 'AVG_LAST_INTERVAL'}
      },
      fn: getData
    }
  }
}

var Layout = {
  kpid: [
    {col_width: 6, title: 'KPI指标树', metric: Metrics.summary.KPI_TREE},
    {col_width: 6, title: 'KPI指标分布概况', metric: Metrics.summary.KPI_TABLE, height: 256},
    {
      col_width: 6, 
      title: '个人累计购买指标',
      subitems: [
        {metric: Metrics.core.TOT_MBR_SALES_VAL, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.TOT_MBR_SALES_VAL.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.TOT_MBR_SALES_QTY, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.TOT_MBR_SALES_QTY.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.TOT_MBR_VST_CNT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.TOT_MBR_VST_CNT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}
      ]
    }, {
      col_width: 6, 
      title: '个人单次购买指标',
      subitems: [
        {metric: Metrics.core.AVG_MBR_SALES_AMT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.AVG_MBR_SALES_AMT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.AVG_MBR_QTY, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.AVG_MBR_QTY.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}
      ]
    }, {
      col_width: 6, 
      title: '会员行为宽度',
      subitems: [
        {metric: Metrics.core.PUR_STORE_CNT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.PUR_STORE_CNT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.PUR_CATEGORY3_CNT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.PUR_CATEGORY3_CNT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.PUR_CATEGORY1_CNT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.PUR_CATEGORY1_CNT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.PUR_BRND_CNT, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.PUR_BRND_CNT.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}
      ]
    }, {
      col_width: 6,
      title: '回购周期',
      subitems: [
        {metric: Metrics.core.FIRST_INTERVAL, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.FIRST_INTERVAL.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}, {metric: Metrics.core.LAST_INTERVAL, subitems: [
          {
            col_width: 12, 
            title: '{0}概况'.format(Fields[Metrics.core.LAST_INTERVAL.name].displayName),
            items: [
              {metric: Metrics.summary.METRIC, style: 'float:left;width:28%;margin-right:4%;margin-left:2%'},
              {metric: Metrics.details.AVG_MBR_SALES_AMT, style: 'float:left;width:33%', title: '各分组会员人均表现'},
              {metric: Metrics.details.PUR_AMT_RATE, style: 'float:left;width:33%', title: '各分组会员合计金额占比'}
            ]
          }, {
            col_width: 6, 
            title: '个人累计购买指标', 
            subitems: [
              {metric: Metrics.details.AVG_MBR_SALES_AMT},
              {metric: Metrics.details.AVG_CUST_QTY},
              {metric: Metrics.details.AVG_MBR_VST_CNT}
            ]
          }, {
            col_width: 6,
            title: '个人单次购买指标',
            subitems: [
              {metric: Metrics.details.AVG_MBR_QTY},
              {metric: Metrics.details.MBR_AVG_VST_AMT},
              {metric: Metrics.details.AVG_PROD_AMT}
            ]
          }, {
            col_width: 6,
            title: '会员行为宽度',
            subitems: [
              {metric: Metrics.details.AVG_PUR_BRND_CNT},
              {metric: Metrics.details.AVG_PUR_STORE_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY3_CNT},
              {metric: Metrics.details.AVG_PUR_CATEGORY1_CNT}
            ]
          }, {
            col_width: 6,
            title: '回购周期',
            subitems: [
              {metric: Metrics.details.AVG_FIRST_INTERVAL},
              {metric: Metrics.details.AVG_LAST_INTERVAL}
            ]
          }
        ]}
      ]
    }
  ]
};

// 全局变量
var __data__ = {}, __cache__ = {}, __cache_agg__ = {}, choose = {}, charts = [], submetrics = {}, rid = -1, __timer__ = null;

function getWidth(text,font,size,weight) {
  
  var css = 'font-family:{0};font-size:{1}px;font-weight:{2};display:none;';
  
  font ? font : "'Lucida Grande',' Lucida Sans Unicode', Verdana, Arial,'Microsoft Yahei', sans-serif";
  size ? size : 12;
  weight ? weight : '';
  
  var element = $('<div>', {style: css.format(font, size, weight), text: text}).appendTo($('body'));
  var width = element.width();
  element.remove();
  return width;
}

// 预处理
function pretreatment(type) {
  // 读取缓存
  var json = __cache__[type];
  
  if(!json)
    return;
  
  //json = Enumerable.From(json).OrderBy('$.GRP_VALUE?parseFloat($.GRP_VALUE):0').ToArray();

  /********开始分组********/

  for (var i in json) {
    if (Metrics.core[type].pivotTable && Metrics.core[type].pivotTable.piecewise) {
      var piecewise = Metrics.core[type].pivotTable.piecewise;
      for (var k in piecewise) {
        var item = piecewise[k];
        var expr = item.expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
        var fn = new Function(expr[1], "return " + expr[2]);

        if (fn.apply(this, [json[i].MBR_RATIO_ACCU])) {
          json[i].piecewise = item.label;
          break;
        }
      }
    }
  }
  
  // 分组后的数据写入缓存
  __cache__[type] = json;
  /********分组完成********/
  
  // 计算聚合数据 (数据透视表)
  __cache_agg__[type] = Enumerable.From(json).Where('$.piecewise!="<=0"').GroupBy('$.piecewise', '', 'key,item=>' + agg_template, '').ToArray();
  //__cache_agg__[type] = Enumerable.From(json).GroupBy('{KEY: $.piecewise, PROD: $.PROD_GRP, MBR: $.MBR_GRP, STORE: $.STORE_GRP}', '', 'key,item=>' + agg_template, '').ToArray();
  
  // 计算购买金额占比
  var total = Enumerable.From(__cache_agg__[type]).Sum("$.TOT_MBR_SALES_VAL");
  for(var i in __cache_agg__[type]) {
    __cache_agg__[type][i].PUR_AMT_RATE = __cache_agg__[type][i].TOT_MBR_SALES_VAL / total;
  }
}

// 生成图表
var buildChart = function (element, metric, data) {
  
  var chart = element.chart({
    chart : metric,
    datasource : data,
    metric : metric
  });
  
  if(metric.type.toLowerCase() == 'highcharts' && chart.options.chart.defaultSeriesType == 'spline') {
    if(chart.options.series && chart.options.series.length == 4) {
      chart.target.series[1].hide();
      chart.target.series[3].hide();
    }
  }
  
  element.removeAttr('loading');
  
  this.charts.push(chart);
}

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
        menu_items.append($('<li>').append($('<a>', {href: 'javascript:;', text: grp.items[j]})));
      }
    }
    
    grp.event && menu_items.find('a').on('click', grp.event);
    
    menu_link.append(menu_label);
    
    if(grp.items && grp.items.length)
      menu_link.append(menu_icon)
    
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
  
  choose[group] = element.text();
  element.parents('li:eq(1)').find('a span:eq(0)').text(choose[group]);
  
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
  
  var condition = '$.PROD_GRP=="<%=PROD_GRP%>" && $.STORE_GRP=="<%=STORE_GRP%>" && $.MBR_GRP=="<%=MBR_GRP%>"'.parseTemplate(choose);
  choose.MAP_ID = Enumerable.From(__cache__.MAP).Where(condition).Single('$.MAP_ID').MAP_ID;
  
  __timer__ = window.setTimeout('loadData(loadChart, choose.metric, true)', 100);
}

// 初始化
var init = function () {
  
  showParameter();
  
  // set global font family
  Highcharts.setOptions({ 
    chart: { style: { fontFamily: "'Lucida Grande',' Lucida Sans Unicode', Verdana, Arial,'Microsoft Yahei', sans-serif"}},
    title: { style:{fontSize:'14px',fontWeight:'800'}},
    credits: {enabled: false}
  });
  
  choose = $.extend({}, choose, __cache__.MAP[0]);
  var E = Enumerable.From(__cache__.MAP);
  
  var options = [{
      name : choose.PROD_GRP,
      group : 'PROD_GRP',
      event : dimSwitch,
      items : E.Distinct('$.PROD_GRP').Select("$.PROD_GRP").ToArray()
    }, {
      name : choose.STORE_GRP,
      group : 'STORE_GRP',
      event : dimSwitch,
      items : E.Distinct('$.STORE_GRP').Select("$.STORE_GRP").ToArray()
    }, {
      name : choose.MBR_GRP,
      group : 'MBR_GRP',
      event : dimSwitch,
      items : E.Distinct('$.MBR_GRP').Select("$.MBR_GRP").ToArray()
    }, {
      name : '{0} - {1}'.format(__data__.params.period.begin, __data__.params.period.end),
      group : 'PERIOD',
      maxWidth : 160
    }
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
  
  buildMainContainer();
  buildChartContainer($('#main-content .wrapper :eq(0)'));
  loadChart(choose.metric);
}

function buildRow(target, css) {
  return $('<div>', {'class': css?css:'row'}).appendTo(target);
}

function buildPanel(target, width, title, faq) {
  var panel = $('<section>', {'class': 'panel'}).appendTo($('<div>',{'class':'col-sm-{0}'.format(width)}).appendTo(target));
  var header = $('<header>', {'class': 'panel-heading'}).appendTo(panel);
  
  header.append($('<a>', {text: title, href: 'javascript:;'}));
  faq && $('<i>', {'class': 'fa fa-question-circle popovers gray-font2', 'data-content': 'FAQ内容', 'data-trigger': 'hover', 'data-placement': 'bottom', loading: 1});
  
  var tools = $('<span>', {'class': 'tools pull-right'}).appendTo(header);
  tools.append($('<a>', {'class': 'fa fa-chevron-down', href:'javascript:;', loading: 1}));
  tools.append($('<a>', {'class': 'fa fa-cog', href:'javascript:;', loading: 1}));
  
  return $('<div>', {'class': 'panel-body'}).appendTo(panel);
}

function parseTemplate(target, list) {
  for(var i in list) {
    var def = list[i];
    
    var element = $('<{0}>'.format(def.element), {'class': def.css, style: def.style, href: def.href, text: def.text });
    
    var tmp = ['element', 'css', 'style', 'href', 'text'];
    
    for(var attr in def) {
      var val = def[attr];
      (tmp.indexOf(attr) === -1 && val.constructor === String) && element.attr(attr, val);
    }
    
    (def.items && def.items.length) && parseTemplate(element, def.items);
    
    target.append(element);
  }
}

function buildMainContainer() {
  $('<section>', {'class': 'wrapper', style: 'margin-top:0px;'}).appendTo($("#main-content"));
  $('<section>', {'class': 'wrapper', style: 'margin-top:0px;display:none'}).appendTo($("#main-content"));
}

function buildChartContainer(target, layout) {
  var len = 0, row = null, flag = true;
  
  if(!layout) {
    layout = Layout.kpid;
  } else {
    flag = false;
  }
  
  // 遍历区块定义
  for(var idx in layout) {
    var col = layout[idx];
    
    if(len == 0) {
      row = buildRow(target);
    }
    
    len += col.col_width;
    
    if(col.subitems) {
      var panel = buildPanel(row, col.col_width, col.title, col.faq);
      var buttons = $('<div>', {'class': 'btn-group  btn-group-sm'}).appendTo($('<div>', {'class': 'btn-row'}).appendTo(panel));
      var body = $('<div>', {'class': 'chart-row'}).appendTo(panel);
      
      for(var i in col.subitems) {
        var def = col.subitems[i];
        var title = def.title ? def.title : Fields[def.metric.name].displayName;
        var container = $('<div>', {metric: def.metric.name, loading: 1, category: def.metric.category});
        
        if(def.metric.height)
          container.css('height', def.metric.height + 'px');
        
        buttons.append($('<button>', {'class': 'btn btn-white1', type: 'button', text: title, metric: def.metric.name}).on('click', changeChart));
        body.append(container.hide());
        
        flag && (submetrics[def.metric.name] = def.subitems);
      }
      
      panel.find(".btn-row .btn-group button:first").toggleClass('button-active');
      panel.find(".chart-row div:first").show();
    } else if (col.items) {
      var panel = buildPanel(row, col.col_width, col.title, col.faq);
      
      for(var j in col.items) {
        var def = col.items[j];
        var body = $('<div>', {'class': 'top-stats-panel', style: def.style}).appendTo(panel);
        var title = def.title ? def.title : Fields[def.metric.name] ? Fields[def.metric.name].displayName : null;
    title && body.append($('<h4>', {'class': 'widget-h', text: title}));
        var element = $('<div>', {metric: def.metric.name, loading: 1, category: def.metric.category}).appendTo(body);
      }
      
      panel.append($('<div>', {style: 'clear:both;'}));
      
    } else {
      var title = col.title ? col.title : Fields[col.metric.name].displayName;
      var faq = col.faq ? col.faq : col.metric.faq;
      var panel = buildPanel(row, col.col_width, title, faq);
      var element = $('<div>', {metric: col.metric.name, loading: 1, category: col.metric.category}).appendTo(panel);
      col.height && element.css('height', col.height + 'px');
    }
    
    len >= 12 && (len = 0);
  }
  
  // widget tools
  jQuery('.panel .tools .fa-chevron-down[loading=1]').click(function () {
    var el = jQuery(this).parents(".panel").children(".panel-body");
    if (jQuery(this).hasClass("fa-chevron-down")) {
      jQuery(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
      el.slideUp(200);
    } else {
      jQuery(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
      el.slideDown(200);
    }
  }).removeAttr('loading');
  
  // tool tips
  //$('.tooltips').tooltip();
}

var changeLayer = function(metric) {
  choose.metric = metric;
  $('#main-content .wrapper').toggle();
  
  if(metric) {
    var target = $('#main-content .wrapper:visible');
    var subitems = submetrics[metric];
    buildChartContainer(target, subitems);
    
    target.append($('<div>', {'class': 'btn btn-primary', text: '返回', style: 'position:fixed;right:10px;bottom:10px;z-index:100000000;'}).on('click', function(){changeLayer();}));
    
    loadChart(metric);
  } else {
    $('#main-content .wrapper:hidden').empty();
    //var top = $('.report-name').offset().top;
    window.scrollTo(0, 0);
    loadChart();
  }
  
  return false;
}

function changeChart() {
  var current_element = $(this);
  var current_metric = current_element.attr('metric');
  var panel = current_element.parents('.panel-body');
  var prev_element = panel.find('.button-active');
  var prev_metric = prev_element.attr('metric');
  
  prev_element.toggleClass('button-active');
  current_element.toggleClass('button-active');
  
  panel.find('div[metric={0}]'.format(current_metric)).toggle();
  panel.find('div[metric={0}]'.format(prev_metric)).toggle();
  
  loadChart(choose.metric);
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
  
  var beginDate = moment(json.period.timeStart);
  var endDate = moment(json.period.timeEnd);
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

function loadChart(parent,reload) {
  var elements = $("div[metric][loading]:visible").toArray();
  var data = null;
  
  if(!parent || reload) {
    var condition = '$.MAP_ID={0}'.format(choose.MAP_ID);
    data = Enumerable.From(__data__.data).Where(condition).ToArray();
    __cache__.SUMMARY = Enumerable.From(__data__.summary).Where('$.MAP_ID==' + data[0].MAP_ID).ToArray();
    
    if(!data.length)
      return;
    
    // 需要加载的图标
    var e = $("div[metric][loading]").toArray();
    
    for(var i in e){
      var element = $(e[i]);
      var metric = element.attr('metric');
      var category = element.attr('category');
      var m = Metrics[category][metric];
      
      if(category.toLowerCase() != 'core')
        continue;
      
      // 过滤数据
      var tmp = m.query ? Enumerable.From(data).Where(m.query).ToArray() : data.slice();
      
      if(Enumerable.From(tmp).Sum('$.MBR_RATIO_ACCU') == 0) {
        // 计算累积值
        var prev = null;
      
        for(var j in tmp) {
          tmp[j].MBR_RATIO_ACCU = prev ? prev.MBR_RATIO_ACCU + tmp[j].MBR_RATIO : tmp[j].MBR_RATIO;
          tmp[j].PUR_AMT_RATE_ACCU = prev ? prev.PUR_AMT_RATE_ACCU + tmp[j].PUR_AMT_RATE : tmp[j].PUR_AMT_RATE;
          prev = tmp[j];
        }
      }
      
      __cache__[metric] = tmp;
      
      pretreatment(metric);
    }
  }
  
  for (var i in elements) {
    var element = $(elements[i]);
    var metric = element.attr('metric');
    var category = element.attr('category');
    
    var tmp = parent && category != 'core' ? __cache_agg__[parent] : __cache__[metric];
    var m = $.extend({}, Metrics[category][metric]);
    
    buildChart(element, m, tmp);
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
    __data__.map = json.map;
    choose.MAP_ID = 1;
    __cache__.MAP = Enumerable.From(__data__.map).Select('{MAP_ID:$.id,PROD_GRP:$.prod_grp_name,STORE_GRP:$.store_grp_name,MBR_GRP:$.mbr_grp_name}').ToArray();
    loadData(init);
  });
}

function loadData(callback) {
  var args = arguments.length > 1 ? Array.prototype.slice.call( arguments, 1 ) : null;
  $.getJSON('/arko/get/{0}/{1}/data.do'.format(rid, choose.MAP_ID), function (json) {
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
  
  loadReport();
  
});