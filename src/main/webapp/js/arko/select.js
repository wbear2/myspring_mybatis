asyncLoadComplete = function(){

	var element = $("#panel");
	var randomName = arko.generateRandomId("report");
	
	// 创建类型容器
	function createTypeContainer(element, index){
		var container = $("<div>", {"class":"mws-form-row left-padding"});
		element.append($("<div>",{"class":"mws-form-block " + (index % 2 == 0 ? "right-padding2" : "left-padding2")}).append(container));
		return container;
	}
	
	// 创建类型标签
	function createTypeLabel(element, text){
		var label = $("<label>", {"class": "ws-form-label"});
		label.append($("<h4>").append($("<strong>").append($("<i>", {"class": "icon-folder-closed"})).append(text)));
		element.append(label);
	}
	
	// 创建列表容器
	function createListContainer(element){
		var container = $("<ul>", {"class": "mws-form-list"});
		element.append($("<div>",{"class": "mws-form-item clearfix li-style-one"}).append(container));
		return container;
	}
	
	// 创建选项
	function createListItem(element, index, item){
		var li = $("<li>"), id = randomName + index;
		li.append($("<input>", {id: id, type: "radio", name: randomName, value: index, report: item.name}));
		li.append($("<label>", {"for": id}).append(item.text));
		element.append(li);
	}
	
	// 创建按钮
	function createButton(element) {
		var button = $("<input>", {"type": "button", "value": "下一步", "class": "btn btn-primary"});
		element.append($("<div>", {"class": "mws-button-row"}).append(button));
		
		button.on("click", function(){
			var val = $(":radio:checked").attr("report");
			//acmen change
			if(val == null){
				openDialog($('<div>').text('请选择报表类型!'), {
					"取消" : function(){
						$(this).dialog("close");
					}
				});
				return ;
			}else {
				var url = "/arko/report/" + $(":radio:checked").val()+ "/create.do";
				window.location.href = url;
			}
		});
	}
	
	var self = this;
	
	arko.init(self, function(){
		
		var tmp = {};
		
		arko.TypeSequence.foreach(function(index, id) {
			var typeContainer = createTypeContainer(element, index);
			createTypeLabel(typeContainer, arko.ReportType[id].text);
			listContainer = createListContainer(typeContainer);
			
			tmp[id] = listContainer;
		});

		arko.Sequence.foreach(function(index, id) {
			var item = arko.Report[id];
			createListItem(tmp[item.type], id, item);
		});

		element.append($("<div>",{"style": "clear:both;"}));
		
		createButton(element);
	});
	
};

var dialog = $("<div>").appendTo($("body"));

function openDialog(elements, buttons){
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