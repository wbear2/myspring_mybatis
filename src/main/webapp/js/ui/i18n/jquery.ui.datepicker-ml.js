/* Malayalam (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Saji Nediyanchath (saji89@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ml'] = {
		closeText: '���汨��',
		prevText: '���汨�汨�汨�汨�汨��െ',  
		nextText: '���汨�汨�汨�汨�汨�� ',
		currentText: '���汨�汨��്',
		monthNames: ['���汨�汨�汨�洿','���汨�汨�汨�汨�汨��ി','���汨�汨��‱��汨�汨��','���汨�汨�汨�汨��‍','���汨�汨��','���汨�汨��‍',
		'���汨�汨��','���汨�汨�汨�汨�汨��','���汨�汨�汨�汨�汨�汨�汨��‍','���汨�汨�汨�汨�汨��‍','���汨�汨�汨�浍‍','���汨�汨�汨�汨��‍'],
		monthNamesShort: ['���汨��', '���汨�汨��', '���汨�汨��‍', '���汨�汨��ി', '���汨�汨��', '���汨�汨��‍',
		'���汨�汨��', '���洗', '���汨�汨��', '���汨�汨��ോ', '���汨��', '���汨��'],
		dayNames: ['���汨�汨�汨�怍', '���汨�汨�汨�汨��‍', '���汨�汨��വ', '���汨�汨�汨�怍', '���汨�汨�汨�洂', '���汨�汨�汨�洿', '���汨��'],
		dayNamesShort: ['���汨��', '���汨�汨��ക', '���汨�汨��വ', '���汨��', '���汨�汨�汨�洂', '���汨�汨�汨�洿', '���汨��'],
		dayNamesMin: ['���派','���洿','���浊','���流','���汨�汨��','���浆','ശ'],
		weekHeader: 'ആ',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ml']);
});
