
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

// 为数组增加foreach方法
if (![].foreach) {
  Array.prototype.foreach = function (callback) {
    for (var i = 0; i < this.length; i++) {
    	callback( i, this[ i ] );
    }
  };
}

var arko = {
	ReportType : { },
	Report : { },
	TypeSequence: [],
    Sequence : [],
	ReportStatus : {
		//1 : {text: "队列中"},
		1 : {text: "生成中"},
		2 : {text: "生成中"},
		3 : {text: "异常"},
		4 : {text: "已终止"},
		9 : {text: "已完成"}
	},
	PropertyType : {
		1 : {text: "产品属性"},
		2 : {text: "门店属性"}
	},
	ReportSetting : {
		1 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		2 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:1},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		3 : {
			productGroups:{multiple:1,enableFilter:1,summary:1},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		4 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:4},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		5 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		6 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		7 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		8 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		9 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:1},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		10 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:1},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		11 : {
			productGroups:{multiple:1,enableFilter:1,maxGroup:20,summary:1,enableAllLargeCategory:1,enableAllMediumCategory:1,enableAllSmallCategory:1,enableAllBrand:1,flag:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		12 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		13 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		14 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,enableAllLargeCategory:1,enableAllMediumCategory:1,enableAllSmallCategory:1,enableAllBrand:1,flag:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		15 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		16 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,minGroup:1,maxGroup:2},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		17 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:104,dateLevel:0}
		},
		18 : {
			productGroups:{multiple:0,enableFilter:1,summary:1},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1,maxGroup:2},
			periods:{max:104,dateLevel:0}
		},
		19 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		20 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		21 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		},
		22 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		23 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:40},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0}
		},
		24 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:100},
			memberGroups:{multiple:0,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:0,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:0},
		},
		25 : {
			productGroups:{multiple:1,enableFilter:1,summary:1,maxGroup:20},
			memberGroups:{multiple:1,enableFilter:1,summary:1,mode:0},
			storeGroups:{multiple:1,enableFilter:1,summary:1},
			periods:{max:52,dateLevel:1}
		}
		
	},
	getReportName : function(id){
		return this.Report[id].name;
	},
	getReportText :function(id){
		return this.Report[id].text;
	},
	getTypeText: function(id){
		return this.ReportType[id].text;
	},
	getStatusText : function(id){
		return this.ReportStatus[id].text;
	},
	getPropertyType : function(id) {
		return this.PropertyType[id].text;
	},
	getSetting : function(id){
		return this.ReportSetting[id];
	},
	getUrl : function(url){
		url = unescape(url);
		var randomNum = Math.floor(Math.random()*100000000);
		var symbol = url.indexOf("?") == -1 ? "?" : "&";
		url = url + symbol + "_=" + randomNum;
		return url;
	},
	generateRandomId : function (prefix) {
		var str = (new Date).getTime().toString(32), i;
		for (i = 0; 5 > i; i++)
			str += Math.floor(65535 * Math.random()).toString(32);
		return prefix + str;
	},
	week : function(date) {
		var week = date.week();
		var year = date.year();
		var list = [2011];
		
		if(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 8){
			for(var i=0;i<list.length;i++){
				if(list[i]==year){
					week -= 1;
					return week;
				}
			}
		}else{
			if(list.indexOf(year)>=0){
				week -= 1;
			}
		}
		
		return week;
	},
	init : function(self, fn) {
		$.getJSON("/arko/report/select/getjson.do", function(json){
			for(var i in json) {
				var category = json[i];
				
				if(category.constructor != Object) continue;
				
				arko.ReportType[category.id] = {text: category.name};
				arko.TypeSequence.push(category.id);
				
				for(var j in category.items) {
					var type = category.items[j];
					if(type.constructor != Object) continue;
					arko.Report[type.id] = {name: type.code, type: type.category, text: type.name };
					arko.Sequence.push(type.id);
				}
			}
			
			fn.apply(self);
		});
	}
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


// ============================为测试帐号开放选择所有商品=============================
try {
  if(parseInt(uid)==1){
    $.each(arko.ReportSetting, function(id, item){
      item.productGroups.maxGroup = 0;
      item.productGroups.maxItem = 0;
      item.memberGroups.maxGroup = 0;
    });
  }
} catch (err) { }

$(document).ready(function(){
	$.get('/arko/common/sidebar.do', function(data){
		$('#mws-navigation').html(data);

		/* Side dropdown menu */
		$("div#mws-navigation ul li a, div#mws-navigation ul li span")
			.on('click', function(event) {
				if(!!$(this).next('ul').length) {
					$(this).next('ul').slideToggle('fast', function() {
						$(this).toggleClass('closed');
					});
					event.preventDefault();
				}
			});
		
		/* Responsive Layout Script */
		$("#mws-nav-collapse").on('click', function(e) {
			$( '#mws-navigation > ul' ).slideToggle( 'normal', function() {
				$(this).css('display', '').parent().toggleClass('toggled');
			});
			e.preventDefault();
		});
	});
});

