/* Thai initialisation for the jQuery UI date picker plugin. */
/* Written by pipo (pipo@sixhead.com). */
jQuery(function($){
	$.datepicker.regional['th'] = {
		closeText: '���汨��',
		prevText: '&#xAB;&#xA0;���汨�汨��',
		nextText: '���汨�汨��ป&#xA0;&#xBB;',
		currentText: '���汨�汨�汨�湉',
		monthNames: ['���汨�汨�汨�渡','���汨�汨�汨�汨�汨�汨�湌','���汨�汨�汨�渡','เ���汨�汨��น','���汨�汨�汨�汨��','���汨�汨�汨�汨�汨��',
		'���汨�汨�汨�汨��','���汨�汨�汨�汨��','���汨�汨�汨�汨��','���汨�汨�汨�渡','���汨�汨�汨�汨�汨��น','���汨�汨�汨�汨��'],
		monthNamesShort: ['ม.ค.','ก.พ.','���渵.ค.','เม.ย.','พ.ค.','���渴.ย.',
		'ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'],
		dayNames: ['���汨�汨�汨�汨��','���汨�汨�汨�湌','���汨�汨�汨�渣','���汨��','���汨�汨�汨�汨�汨��','���汨�汨��์','เ���汨�汨��'],
		dayNamesShort: ['���渲.','จ.','อ.','พ.','���渤.','ศ.','ส.'],
		dayNamesMin: ['���渲.','จ.','อ.','พ.','���渤.','ศ.','ส.'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['th']);
});