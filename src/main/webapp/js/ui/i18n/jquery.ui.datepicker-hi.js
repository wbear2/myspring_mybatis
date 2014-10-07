/* Hindi initialisation for the jQuery UI date picker plugin. */
/* Written by Michael Dawart. */
jQuery(function($){
	$.datepicker.regional['hi'] = {
		closeText: '���汨��',
		prevText: '���汨�汨��ा',
		nextText: '���汨�汨��',
		currentText: '���検',
		monthNames: ['���汨�汨��ी ','���汨�汨��ी','���汨�汨��च','���汨�汨�汨�椲','���椈','���汨��',
		'���汨�汨��ई','���汨�汨��त ','���汨�汨�汨�汨��','���汨�汨�汨�汨��','���汨�汨�汨�椰','���汨�汨�汨�汨��'],
		monthNamesShort: ['���椨', '���椰', '���汨�汨��च', '���汨�汨�汨�椲', '���椈', '���汨��',
		'���汨�汨��ई', '���椗', '���汨��', '���汨�汨��', '���椵', '���椿'],
		dayNames: ['���汨�汨�汨�椰', '���汨�汨�汨�椰', '���汨�汨�汨�汨��', '���汨�汨�汨�椰', '���汨�汨�汨�汨��', '���汨�汨�汨�汨�汨��', '���汨�汨�汨�椰'],
		dayNamesShort: ['���汨��', '���汨��', '���汨�汨��', '���汨��', '���汨�汨��', '���汨�汨��र', '���汨��'],
		dayNamesMin: ['���汨��', '���汨��', '���汨�汨��', '���汨��', '���汨�汨��', '���汨�汨��र', '���汨��'],
		weekHeader: '���汨�汨��ा',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hi']);
});
