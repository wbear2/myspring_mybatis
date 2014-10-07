/* Tamil (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by S A Sureshkumar (saskumar@live.com). */
jQuery(function($){
	$.datepicker.regional['ta'] = {
		closeText: '���汨�汨��',
		prevText: '���汨�汨�汨�汨�汨��ு',
		nextText: '���汨�汨�汨�汨�汨��',
		currentText: '���汨�汨��ு',
		monthNames: ['���毈','���汨�汨��','���汨�汨�汨�汨��','���汨�汨�汨�汨�汨��','���汨�汨�汨�殿','���汨��',
		'���汨��','���汨�汨��','���汨�汨�汨�汨�汨��ி','���汨�汨�汨�殿','���汨�汨�汨�汨�汨�汨�毈','���汨�汨�汨�汨��'],
		monthNamesShort: ['���毈','���汨�汨��','���汨��','���汨�汨��','���汨�汨��','���汨��',
		'���汨��','���段','���汨��','���汨��','���汨�汨��','���汨�汨��'],
		dayNames: ['���汨�汨�汨�汨�汨�汨�汨�汨�汨�汨��','���汨�汨�汨�汨�汨�汨�汨�汨��','���汨�汨�汨�汨�汨�汨�汨�汨�汨�汨��','���汨�汨�汨�汨�汨�汨�毈','���汨�汨�汨�汨�汨�汨�汨�汨��','���汨�汨�汨�汨�汨�汨�汨�汨��ை','���汨�汨�汨�汨�汨�汨�毈'],
		dayNamesShort: ['���汨�汨�汨�毁','���汨�汨�汨�汨��','���汨�汨�汨�汨�汨��','���汨�汨��்','���汨�汨�汨�汨��','���汨�汨�汨�殿','���汨��'],
		dayNamesMin: ['���殾','���殿','���毆','���毁','���殿','���毆','ச'],
		weekHeader: '����',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ta']);
});
