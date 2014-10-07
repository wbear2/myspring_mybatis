
asyncLoadComplete = function(){
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
	
	$(".mws-datatable-fn").delegate("a.btn", "click", function(){
		
		var element = $(this);
		var target = element.parent().parent().parent();
		var propertyId = element.parent().attr("data");
		
		if(element.find(".icon-trash").length){
			var elements = $("<p>").append($("<i>",{'class':"icol-error"})).append(" 确定要删除此属性?");
			var buttons = {
				"确定": function(){
					$(this).dialog("close");
					$.getJSON("/arko/property/"+propertyId+"/delete.do", function(json){
						var buttons = {
								"关闭": function(){
									$(this).dialog("close");
								}
						};
						if(json.status=="OK"){
							target.remove();
							var elements = $("<p>").append($("<i>",{'class':"icol-accept"})).append(" 属性删除成功!");
							openDialog(elements, buttons);
						}else{
							var elements = $("<p>").append($("<i>",{'class':"icol-cancel"})).append(" 属性删除失败!");
							openDialog(elements, buttons);
						}
					});
				},
				"取消": function(){
					$(this).dialog("close");
				}
			};
			
			openDialog(elements, buttons);	
		} else if(element.find(".icon-edit").length){
			window.location.href = "/arko/property/edit.do?id="+propertyId;
		}
	});
	
	$('.mws-table').length && $('.mws-table').dataTable( {
		"sAjaxSource": "/arko/property/getlist1.do",
		"aaSorting": [[0,'desc']],
		"bServerSide": true,
		"aoColumns": [
			{ "mData": "id" },
			{ "mData": "name", bSortable: 0 },
			{ "mData": "typeName", bSortable: 0 },
			{"mData": null, bSortable: 0, fnRender: function(item){
				var date = moment(item.aData.createDate.time);
				return date.format("YYYY-MM-DD HH:mm");
			}},
			{ "mData": "account.userName", bSortable: 0 },
			{ "mData": "desc", bSortable: 0 },
			{ "mData": null, bSortable: 0, fnRender: make_button }
		],
	    sPaginationType: "full_numbers"
	});
    function make_button(oObj) {  
        var id = oObj.aData.id; 
        return '<span class="btn-group" data="'+id+'"><a href="#" class="btn btn-small"><i class="icon-trash"></i>删除</a><a href="#" class="btn btn-small"><i class="icon-edit"></i>编辑</a></span>';
    }
};
