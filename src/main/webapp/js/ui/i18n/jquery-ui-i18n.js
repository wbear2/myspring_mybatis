/*! jQuery UI - v1.9.0 - 2012-10-08
* http://jqueryui.com
* Includes: jquery.ui.datepicker-af.js, jquery.ui.datepicker-ar-DZ.js, jquery.ui.datepicker-ar.js, jquery.ui.datepicker-az.js, jquery.ui.datepicker-bg.js, jquery.ui.datepicker-bs.js, jquery.ui.datepicker-ca.js, jquery.ui.datepicker-cs.js, jquery.ui.datepicker-cy-GB.js, jquery.ui.datepicker-da.js, jquery.ui.datepicker-de.js, jquery.ui.datepicker-el.js, jquery.ui.datepicker-en-AU.js, jquery.ui.datepicker-en-GB.js, jquery.ui.datepicker-en-NZ.js, jquery.ui.datepicker-eo.js, jquery.ui.datepicker-es.js, jquery.ui.datepicker-et.js, jquery.ui.datepicker-eu.js, jquery.ui.datepicker-fa.js, jquery.ui.datepicker-fi.js, jquery.ui.datepicker-fo.js, jquery.ui.datepicker-fr-CH.js, jquery.ui.datepicker-fr.js, jquery.ui.datepicker-gl.js, jquery.ui.datepicker-he.js, jquery.ui.datepicker-hi.js, jquery.ui.datepicker-hr.js, jquery.ui.datepicker-hu.js, jquery.ui.datepicker-hy.js, jquery.ui.datepicker-id.js, jquery.ui.datepicker-is.js, jquery.ui.datepicker-it.js, jquery.ui.datepicker-ja.js, jquery.ui.datepicker-ka.js, jquery.ui.datepicker-kk.js, jquery.ui.datepicker-km.js, jquery.ui.datepicker-ko.js, jquery.ui.datepicker-lb.js, jquery.ui.datepicker-lt.js, jquery.ui.datepicker-lv.js, jquery.ui.datepicker-mk.js, jquery.ui.datepicker-ml.js, jquery.ui.datepicker-ms.js, jquery.ui.datepicker-nl-BE.js, jquery.ui.datepicker-nl.js, jquery.ui.datepicker-no.js, jquery.ui.datepicker-pl.js, jquery.ui.datepicker-pt-BR.js, jquery.ui.datepicker-pt.js, jquery.ui.datepicker-rm.js, jquery.ui.datepicker-ro.js, jquery.ui.datepicker-ru.js, jquery.ui.datepicker-sk.js, jquery.ui.datepicker-sl.js, jquery.ui.datepicker-sq.js, jquery.ui.datepicker-sr-SR.js, jquery.ui.datepicker-sr.js, jquery.ui.datepicker-sv.js, jquery.ui.datepicker-ta.js, jquery.ui.datepicker-th.js, jquery.ui.datepicker-tj.js, jquery.ui.datepicker-tr.js, jquery.ui.datepicker-uk.js, jquery.ui.datepicker-vi.js, jquery.ui.datepicker-zh-CN.js, jquery.ui.datepicker-zh-HK.js, jquery.ui.datepicker-zh-TW.js
* Copyright 2012 jQuery Foundation and other contributors; Licensed MIT */

/* Afrikaans initialisation for the jQuery UI date picker plugin. */
/* Written by Renier Pretorius. */
jQuery(function($){
	$.datepicker.regional['af'] = {
		closeText: 'Selekteer',
		prevText: 'Vorige',
		nextText: 'Volgende',
		currentText: 'Vandag',
		monthNames: ['Januarie','Februarie','Maart','April','Mei','Junie',
		'Julie','Augustus','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'],
		dayNames: ['Sondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrydag', 'Saterdag'],
		dayNamesShort: ['Son', 'Maa', 'Din', 'Woe', 'Don', 'Vry', 'Sat'],
		dayNamesMin: ['So','Ma','Di','Wo','Do','Vr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['af']);
});

/* Algerian Arabic Translation for jQuery UI date picker plugin. (can be used for Tunisia)*/
/* Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */

jQuery(function($){
	$.datepicker.regional['ar-DZ'] = {
		closeText: '报告报告賯',
		prevText: '&#x3C;报告报告报告',
		nextText: '报告报告报告&#x3E;',
		currentText: '报告报告賲',
		monthNames: ['报告报告賷', '报告报告賷', '报告报告', '报告报告賱', '报告賷', '报告报告',
		'报告报告报告', '报告鬲', '报告报告报告','报告报告报告', '报告报告报告', '报告报告报告'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['报告报告丿', '报告报告报告賳', '报告报告报告报告', '报告报告报告报告', '报告报告报告', '报告报告报告', '报告报告鬲'],
		dayNamesShort: ['报告报告丿', '报告报告报告賳', '报告报告报告报告', '报告报告报告报告', '报告报告报告', '报告报告报告', '报告报告鬲'],
		dayNamesMin: ['报告报告丿', '报告报告报告賳', '报告报告报告报告', '报告报告报告报告', '报告报告报告', '报告报告报告', '报告报告鬲'],
		weekHeader: '报告报告毓',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar-DZ']);
});

/* Arabic Translation for jQuery UI date picker plugin. */
/* Khaled Alhourani -- me@khaledalhourani.com */
/* NOTE: monthNames are the original months names and they are the Arabic names, not the new months name 报告报告报告 - 报告报告乇 and there isn't any Arabic roots for these months */
jQuery(function($){
	$.datepicker.regional['ar'] = {
		closeText: '报告报告賯',
		prevText: '&#x3C;报告报告报告',
		nextText: '报告报告报告&#x3E;',
		currentText: '报告报告賲',
		monthNames: ['报告报告賳 报告报告报告', '报告报告', '报告报告', '报告报告賳', '报告报告', '报告报告报告',
		'报告报告', '报告', '报告报告賱',	'报告报告賳 报告报告賱', '报告报告賳 报告报告报告', '报告报告賳 报告报告賱'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['报告报告丿', '报告报告报告賳', '报告报告报告报告', '报告报告报告报告', '报告报告报告', '报告报告报告', '报告报告鬲'],
		dayNamesShort: ['报告报告丿', '报告报告报告賳', '报告报告报告报告', '报告报告报告报告', '报告报告报告', '报告报告报告', '报告报告鬲'],
		dayNamesMin: ['丨', '賳', '孬', '乇', '禺', '噩', '爻'],
		weekHeader: '报告报告毓',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar']);
});
/* Azerbaijani (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Jamil Najafov (necefov33@gmail.com). */
jQuery(function($) {
	$.datepicker.regional['az'] = {
		closeText: 'Ba臒la',
		prevText: '&#x3C;Geri',
		nextText: '陌r蓹li&#x3E;',
		currentText: 'Bug眉n',
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','陌yun',
		'陌yul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','陌yun',
		'陌yul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ert蓹si','报告r报告nb蓹 ax艧am谋','报告r报告nb蓹','C眉m蓹 ax艧am谋','C眉m蓹','报告nb蓹'],
		dayNamesShort: ['B','Be','脟a','脟','Ca','C','艦'],
		dayNamesMin: ['B','B','脟','小','脟','C','艦'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['az']);
});
/* Bulgarian initialisation for the jQuery UI date picker plugin. */
/* Written by Stoyan Kyosev (http://svest.org). */
jQuery(function($){
	$.datepicker.regional['bg'] = {
		closeText: '报告报告芯褉懈',
		prevText: '&#x3C;报告报告写',
		nextText: '报告锌褉报告&#x3E;',
		nextBigText: '&#x3E;&#x3E;',
		currentText: '报告报告',
		monthNames: ['报告报告褉懈','报告胁褉报告褉懈','报告褉褌','报告褉报告','报告泄','报告懈',
		'报告懈','报告报告报告','报告报告报告胁褉懈','报告报告报告褉懈','报告报告胁褉懈','报告报告报告褉懈'],
		monthNamesShort: ['报告褍','报告胁','报告褉','报告褉','报告泄','报告懈',
		'报告懈','报告谐','报告锌','报告褌','报告胁','报告泻'],
		dayNames: ['报告报告报告','报告报告报告报告报告','报告芯褉报告泻','小褉报告邪','报告报告褗褉报告泻','报告报告泻','报告报告报告'],
		dayNamesShort: ['报告写','报告薪','报告芯','小褉褟','报告褌','报告褌','报告斜'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: 'Wk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['bg']);
});

/* Bosnian i18n for the jQuery UI date picker plugin. */
/* Written by Kenan Konjo. */
jQuery(function($){
	$.datepicker.regional['bs'] = {
		closeText: 'Zatvori', 
		prevText: '&#x3C;', 
		nextText: '&#x3E;', 
		currentText: 'Danas', 
		monthNames: ['Januar','Februar','Mart','April','Maj','Juni',
		'Juli','August','Septembar','Oktobar','Novembar','Decembar'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljak','Utorak','Srijeda','膶etvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','膶et','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','膶e','Pe','Su'],
		weekHeader: 'Wk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['bs']);
});
/* Inicialitzaci贸 en catal脿 per a l'extensi贸 'UI date picker' per jQuery. */
/* Writers: (joan.leon@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ca'] = {
		closeText: 'Tanca',
		prevText: 'Anterior',
		nextText: 'Seg眉ent',
		currentText: 'Avui',
		monthNames: ['gener','febrer','mar莽','abril','maig','juny',
		'juliol','agost','setembre','octubre','novembre','desembre'],
		monthNamesShort: ['gen','feb','mar莽','abr','maig','juny',
		'jul','ag','set','oct','nov','des'],
		dayNames: ['diumenge','dilluns','dimarts','dimecres','dijous','divendres','dissabte'],
		dayNamesShort: ['dg','dl','dt','dc','dj','dv','ds'],
		dayNamesMin: ['dg','dl','dt','dc','dj','dv','ds'],
		weekHeader: 'Set',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ca']);
});

/* Czech initialisation for the jQuery UI date picker plugin. */
/* Written by Tomas Muller (tomas@tomas-muller.net). */
jQuery(function($){
	$.datepicker.regional['cs'] = {
		closeText: 'Zav报告t',
		prevText: '&#x3C;D报告ve',
		nextText: 'Pozd臎ji&#x3E;',
		currentText: 'Nyn铆',
		monthNames: ['leden','煤nor','b艡ezen','duben','kv臎ten','膷erven',
		'膷ervenec','srpen','z报告铆','报告jen','listopad','prosinec'],
		monthNamesShort: ['led','煤no','b艡e','dub','kv臎','膷er',
		'膷vc','srp','z报告','报告j','lis','pro'],
		dayNames: ['ned臎le', 'pond臎l铆', '煤ter媒', 'st艡eda', '膷tvrtek', 'p谩tek', 'sobota'],
		dayNamesShort: ['ne', 'po', '煤t', 'st', '膷t', 'p谩', 'so'],
		dayNamesMin: ['ne','po','煤t','st','膷t','p谩','so'],
		weekHeader: 'T媒d',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['cs']);
});

/* Welsh/UK initialisation for the jQuery UI date picker plugin. */
/* Written by William Griffiths. */
jQuery(function($){
	$.datepicker.regional['cy-GB'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['Ionawr','Chwefror','Mawrth','Ebrill','Mai','Mehefin',
		'Gorffennaf','Awst','Medi','Hydref','Tachwedd','Rhagfyr'],
		monthNamesShort: ['Ion', 'Chw', 'Maw', 'Ebr', 'Mai', 'Meh',
		'Gor', 'Aws', 'Med', 'Hyd', 'Tac', 'Rha'],
		dayNames: ['Dydd Sul', 'Dydd Llun', 'Dydd Mawrth', 'Dydd Mercher', 'Dydd Iau', 'Dydd Gwener', 'Dydd Sadwrn'],
		dayNamesShort: ['Sul', 'Llu', 'Maw', 'Mer', 'Iau', 'Gwe', 'Sad'],
		dayNamesMin: ['Su','Ll','Ma','Me','Ia','Gw','Sa'],
		weekHeader: 'Wy',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['cy-GB']);
});
/* Danish initialisation for the jQuery UI date picker plugin. */
/* Written by Jan Christensen ( deletestuff@gmail.com). */
jQuery(function($){
	$.datepicker.regional['da'] = {
		closeText: 'Luk',
		prevText: '&#x3C;Forrige',
		nextText: 'N忙ste&#x3E;',
		currentText: 'Idag',
		monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
		'Juli','August','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['S酶ndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','L酶rdag'],
		dayNamesShort: ['S酶n','Man','Tir','Ons','Tor','Fre','L酶r'],
		dayNamesMin: ['S酶','Ma','Ti','On','To','Fr','L酶'],
		weekHeader: 'Uge',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['da']);
});

/* German initialisation for the jQuery UI date picker plugin. */
/* Written by Milian Wolff (mail@milianw.de). */
jQuery(function($){
	$.datepicker.regional['de'] = {
		closeText: 'schlie脽en',
		prevText: '&#x3C;zur眉ck',
		nextText: 'Vor&#x3E;',
		currentText: 'heute',
		monthNames: ['Januar','Februar','M盲rz','April','Mai','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','M盲r','Apr','Mai','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dez'],
		dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
		dayNamesShort: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		dayNamesMin: ['So','Mo','Di','Mi','Do','Fr','Sa'],
		weekHeader: 'KW',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['de']);
});

/* Greek (el) initialisation for the jQuery UI date picker plugin. */
/* Written by Alex Cicovic (http://www.alexcicovic.com) */
jQuery(function($){
	$.datepicker.regional['el'] = {
		closeText: '报告报告报告报告',
		prevText: '报告报告报告报告报告报告',
		nextText: '螘蟺报告报告报告',
		currentText: '报告报告报告 报告报告蟼',
		monthNames: ['报告报告报告报告报告','报告报告报告报告报告蟼','报告报告报告蟼','螒蟺报告报告报告','报告报告蟼','报告报告报告蟼',
		'报告报告报告蟼','报告报告报告报告蟼','报告蟺报告报告报告报告','报告报告报告报告蟼','报告报告报告报告蟼','报告报告报告报告报告'],
		monthNamesShort: ['报告谓','报告尾','报告蟻','螒蟺蟻','报告喂','报告报告',
		'报告报告','报告纬','报告蟺','报告蟿','报告蔚','报告魏'],
		dayNames: ['报告报告报告萎','报告报告报告伪','报告报告畏','报告报告报告畏','报告渭蟺报告','报告报告报告报告萎','报告报告报告慰'],
		dayNamesShort: ['报告蟻','报告蠀','报告喂','报告蟿','报告渭','报告蟻','报告尾'],
		dayNamesMin: ['报告','报告','报告','报告','报告','报告','报告'],
		weekHeader: '报告未',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['el']);
});
/* English/Australia initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation. */
jQuery(function($){
	$.datepicker.regional['en-AU'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-AU']);
});

/* English/UK initialisation for the jQuery UI date picker plugin. */
/* Written by Stuart. */
jQuery(function($){
	$.datepicker.regional['en-GB'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-GB']);
});

/* English/New Zealand initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation. */
jQuery(function($){
	$.datepicker.regional['en-NZ'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en-NZ']);
});

/* Esperanto initialisation for the jQuery UI date picker plugin. */
/* Written by Olivier M. (olivierweb@ifrance.com). */
jQuery(function($){
	$.datepicker.regional['eo'] = {
		closeText: 'Fermi',
		prevText: '&#x3C;Anta',
		nextText: 'Sekv&#x3E;',
		currentText: 'Nuna',
		monthNames: ['Januaro','Februaro','Marto','Aprilo','Majo','Junio',
		'Julio','A怒gusto','Septembro','Oktobro','Novembro','Decembro'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','A怒g','Sep','Okt','Nov','Dec'],
		dayNames: ['Diman膲o','Lundo','Mardo','Merkredo','拇a怒do','Vendredo','Sabato'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','拇a怒','Ven','Sab'],
		dayNamesMin: ['Di','Lu','Ma','Me','拇a','Ve','Sa'],
		weekHeader: 'Sb',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['eo']);
});

/* Inicializaci贸n en espa帽ol para la extensi贸n 'UI date picker' para jQuery. */
/* Traducido por Vester (xvester@gmail.com). */
jQuery(function($){
	$.datepicker.regional['es'] = {
		closeText: 'Cerrar',
		prevText: '&#x3C;Ant',
		nextText: 'Sig&#x3E;',
		currentText: 'Hoy',
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
		'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
		'Jul','Ago','Sep','Oct','Nov','Dic'],
		dayNames: ['Domingo','Lunes','Martes','Mi茅rcoles','Jueves','Viernes','S谩bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi茅','Juv','Vie','S谩b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S谩'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['es']);
});
/* Estonian initialisation for the jQuery UI date picker plugin. */
/* Written by Mart S玫mermaa (mrts.pydev at gmail com). */
jQuery(function($){
	$.datepicker.regional['et'] = {
		closeText: 'Sulge',
		prevText: 'Eelnev',
		nextText: 'J盲rgnev',
		currentText: 'T盲na',
		monthNames: ['Jaanuar','Veebruar','M盲rts','Aprill','Mai','Juuni',
		'Juuli','August','September','Oktoober','November','Detsember'],
		monthNamesShort: ['Jaan', 'Veebr', 'M盲rts', 'Apr', 'Mai', 'Juuni',
		'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		dayNames: ['P眉hap盲ev', 'Esmasp盲ev', 'Teisip盲ev', 'Kolmap盲ev', 'Neljap盲ev', 'Reede', 'Laup盲ev'],
		dayNamesShort: ['P眉hap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
		dayNamesMin: ['P','E','T','K','N','R','L'],
		weekHeader: 'n盲d',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['et']);
}); 
/* Euskarako oinarria 'UI date picker' jquery-ko extentsioarentzat */
/* Karrikas-ek itzulia (karrikas@karrikas.com) */
jQuery(function($){
	$.datepicker.regional['eu'] = {
		closeText: 'Egina',
		prevText: '&#x3C;Aur',
		nextText: 'Hur&#x3E;',
		currentText: 'Gaur',
		monthNames: ['urtarrila','otsaila','martxoa','apirila','maiatza','ekaina',
			'uztaila','abuztua','iraila','urria','azaroa','abendua'],
		monthNamesShort: ['urt.','ots.','mar.','api.','mai.','eka.',
			'uzt.','abu.','ira.','urr.','aza.','abe.'],
		dayNames: ['igandea','astelehena','asteartea','asteazkena','osteguna','ostirala','larunbata'],
		dayNamesShort: ['ig.','al.','ar.','az.','og.','ol.','lr.'],
		dayNamesMin: ['ig','al','ar','az','og','ol','lr'],
		weekHeader: 'As',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['eu']);
});
/* Persian (Farsi) Translation for the jQuery UI date picker plugin. */
/* Javad Mowlanezhad -- jmowla@gmail.com */
/* Jalali calendar should supported soon! (Its implemented but I have to test it) */
jQuery(function($) {
	$.datepicker.regional['fa'] = {
		closeText: '报告报告',
		prevText: '&#x3C;报告报告',
		nextText: '报告报告&#x3E;',
		currentText: '报告报告夭',
		monthNames: [
			'报告报告报告賳',
			'报告报告报告报告',
			'报告报告丿',
			'报告乇',
			'报告报告丿',
			'报告报告报告',
			'报告乇',
			'报告报告',
			'报告乇',
			'报告',
			'报告报告',
			'报告报告丿'
		],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: [
			'报告报告报告',
			'报告报告报告',
			'报告鈥报告报告�',
			'报告报告报告报告',
			'报告报告报告賴',
			'报告报告',
			'报告报告'
		],
		dayNamesShort: [
			'蹖',
			'丿',
			'爻',
			'趩',
			'倬',
			'噩', 
			'卮'
		],
		dayNamesMin: [
			'蹖',
			'丿',
			'爻',
			'趩',
			'倬',
			'噩', 
			'卮'
		],
		weekHeader: '报告',
		dateFormat: 'yy/mm/dd',
		firstDay: 6,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fa']);
});
/* Finnish initialisation for the jQuery UI date picker plugin. */
/* Written by Harri Kilpi枚 (harrikilpio@gmail.com). */
jQuery(function($){
	$.datepicker.regional['fi'] = {
		closeText: 'Sulje',
		prevText: '&#xAB;Edellinen',
		nextText: 'Seuraava&#xBB;',
		currentText: 'T盲n报告n',
		monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kes盲kuu',
		'Hein盲kuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		monthNamesShort: ['Tammi','Helmi','Maalis','Huhti','Touko','Kes盲',
		'Hein盲','Elo','Syys','Loka','Marras','Joulu'],
		dayNamesShort: ['Su','Ma','Ti','Ke','To','Pe','La'],
		dayNames: ['Sunnuntai','Maanantai','Tiistai','Keskiviikko','Torstai','Perjantai','Lauantai'],
		dayNamesMin: ['Su','Ma','Ti','Ke','To','Pe','La'],
		weekHeader: 'Vk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fi']);
});

/* Faroese initialisation for the jQuery UI date picker plugin */
/* Written by Sverri Mohr Olsen, sverrimo@gmail.com */
jQuery(function($){
	$.datepicker.regional['fo'] = {
		closeText: 'Lat aftur',
		prevText: '&#x3C;Fyrra',
		nextText: 'N忙sta&#x3E;',
		currentText: '脥 dag',
		monthNames: ['Januar','Februar','Mars','Apr铆l','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','M谩nadagur','T媒sdagur','Mikudagur','H贸sdagur','Fr铆ggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','M谩n','T媒s','Mik','H贸s','Fr铆','Ley'],
		dayNamesMin: ['Su','M谩','T媒','Mi','H贸','Fr','Le'],
		weekHeader: 'Vk',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fo']);
});

/* Swiss-French initialisation for the jQuery UI date picker plugin. */
/* Written Martin Voelkle (martin.voelkle@e-tc.ch). */
jQuery(function($){
	$.datepicker.regional['fr-CH'] = {
		closeText: 'Fermer',
		prevText: '&#x3C;Pr茅c',
		nextText: 'Suiv&#x3E;',
		currentText: 'Courant',
		monthNames: ['Janvier','F茅vrier','Mars','Avril','Mai','Juin',
		'Juillet','Ao没t','Septembre','Octobre','Novembre','D茅cembre'],
		monthNamesShort: ['Jan','F茅v','Mar','Avr','Mai','Jun',
		'Jul','Ao没','Sep','Oct','Nov','D茅c'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fr-CH']);
});
/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
			  St茅phane Nahmani (sholby@sholby.net),
			  St茅phane Raimbault <stephane.raimbault@gmail.com> */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'Pr茅c茅dent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','F茅vrier','Mars','Avril','Mai','Juin',
		'Juillet','Ao没t','Septembre','Octobre','Novembre','D茅cembre'],
		monthNamesShort: ['Janv.','F茅vr.','Mars','Avril','Mai','Juin',
		'Juil.','Ao没t','Sept.','Oct.','Nov.','D茅c.'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
		dayNamesMin: ['D','L','M','M','J','V','S'],
		weekHeader: 'Sem.',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});

/* Galician localization for 'UI date picker' jQuery extension. */
/* Translated by Jorge Barreiro <yortx.barry@gmail.com>. */
jQuery(function($){
	$.datepicker.regional['gl'] = {
		closeText: 'Pechar',
		prevText: '&#x3C;Ant',
		nextText: 'Seg&#x3E;',
		currentText: 'Hoxe',
		monthNames: ['Xaneiro','Febreiro','Marzo','Abril','Maio','Xu帽o',
		'Xullo','Agosto','Setembro','Outubro','Novembro','Decembro'],
		monthNamesShort: ['Xan','Feb','Mar','Abr','Mai','Xu帽',
		'Xul','Ago','Set','Out','Nov','Dec'],
		dayNames: ['Domingo','Luns','Martes','M茅rcores','Xoves','Venres','S谩bado'],
		dayNamesShort: ['Dom','Lun','Mar','M茅r','Xov','Ven','S谩b'],
		dayNamesMin: ['Do','Lu','Ma','M茅','Xo','Ve','S谩'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['gl']);
});
/* Hebrew initialisation for the UI Datepicker extension. */
/* Written by Amir Hardon (ahardon at gmail dot com). */
jQuery(function($){
	$.datepicker.regional['he'] = {
		closeText: '报告报告',
		prevText: '&#x3C;报告报告诐',
		nextText: '报告讗&#x3E;',
		currentText: '报告报告',
		monthNames: ['报告报告专','报告报告报告','报告抓','报告报告诇','报告讬','报告报告',
		'报告报告','报告报告报告','报告报告报告','报告报告报告专','报告报告报告','报告报告专'],
		monthNamesShort: ['报告讜','报告专','报告抓','报告专','报告讬','报告报告',
		'报告报告','报告讙','报告讟','报告拽','报告讘','报告诪'],
		dayNames: ['报告报告谉','报告讬','报告报告讬','报告报告讬','报告报告讬','报告报告','报告转'],
		dayNamesShort: ['讗\'','讘\'','讙\'','讚\'','讛\'','讜\'','报告转'],
		dayNamesMin: ['讗\'','讘\'','讙\'','讚\'','讛\'','讜\'','报告转'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['he']);
});

/* Hindi initialisation for the jQuery UI date picker plugin. */
/* Written by Michael Dawart. */
jQuery(function($){
	$.datepicker.regional['hi'] = {
		closeText: '报告报告�',
		prevText: '报告报告报告啶�',
		nextText: '报告报告报告',
		currentText: '报告',
		monthNames: ['报告报告报告啷� ','报告报告报告啷�','报告报告报告啶�','报告报告报告报告げ','报告','报告报告�',
		'报告报告报告啶�','报告报告报告啶� ','报告报告报告报告报告�','报告报告报告报告报告�','报告报告报告报告ぐ','报告报告报告报告报告�'],
		monthNamesShort: ['报告え', '报告ぐ', '报告报告报告啶�', '报告报告报告报告げ', '报告', '报告报告�',
		'报告报告报告啶�', '报告', '报告报告�', '报告报告报告', '报告さ', '报告た'],
		dayNames: ['报告报告报告报告ぐ', '报告报告报告报告ぐ', '报告报告报告报告报告�', '报告报告报告报告ぐ', '报告报告报告报告报告�', '报告报告报告报告报告报告', '报告报告报告报告ぐ'],
		dayNamesShort: ['报告报告�', '报告报告�', '报告报告报告', '报告报告�', '报告报告报告', '报告报告报告啶�', '报告报告�'],
		dayNamesMin: ['报告报告�', '报告报告�', '报告报告报告', '报告报告�', '报告报告报告', '报告报告报告啶�', '报告报告�'],
		weekHeader: '报告报告报告啶�',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hi']);
});

/* Croatian i18n for the jQuery UI date picker plugin. */
/* Written by Vjekoslav Nesek. */
jQuery(function($){
	$.datepicker.regional['hr'] = {
		closeText: 'Zatvori',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: 'Danas',
		monthNames: ['Sije膷anj','Velja膷a','O啪ujak','Travanj','Svibanj','Lipanj',
		'Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
		monthNamesShort: ['Sij','Velj','O啪u','Tra','Svi','Lip',
		'Srp','Kol','Ruj','Lis','Stu','Pro'],
		dayNames: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','膶etvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','膶et','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','膶e','Pe','Su'],
		weekHeader: 'Tje',
		dateFormat: 'dd.mm.yy.',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hr']);
});
/* Hungarian initialisation for the jQuery UI date picker plugin. */
/* Written by Istvan Karaszi (jquery@spam.raszi.hu). */
jQuery(function($){
	$.datepicker.regional['hu'] = {
		closeText: 'bez谩r',
		prevText: 'vissza',
		nextText: 'el艖re',
		currentText: 'ma',
		monthNames: ['Janu谩r', 'Febru谩r', 'M谩rcius', '脕prilis', 'M谩jus', 'J煤nius',
		'J煤lius', 'Augusztus', 'Szeptember', 'Okt贸ber', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'M谩r', '脕pr', 'M谩j', 'J煤n',
		'J煤l', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vas谩rnap', 'H茅tf艖', 'Kedd', 'Szerda', 'Cs眉t枚rt枚k', 'P茅ntek', 'Szombat'],
		dayNamesShort: ['Vas', 'H茅t', 'Ked', 'Sze', 'Cs眉', 'P茅n', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		weekHeader: 'H茅t',
		dateFormat: 'yy.mm.dd.',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hu']);
});

/* Armenian(UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Levon Zakaryan (levon.zakaryan@gmail.com)*/
jQuery(function($){
	$.datepicker.regional['hy'] = {
		closeText: '报告报告宅',
		prevText: '&#x3C;报告窄.',
		nextText: '諃报告.&#x3E;',
		currentText: '报告报告謤',
		monthNames: ['諃报告报告铡謤','报告湛謤报告謤','报告謤湛','报告謤报告','报告报告战','諃报告报告战',
		'諃报告报告战','报告报告报告战','报告报告报告报告謤','諃报告报告报告榨謤','报告报告报告榨謤','报告报告报告报告謤'],
		monthNamesShort: ['諃报告报告','报告湛謤','报告謤湛','报告謤','报告报告战','諃报告报告战',
		'諃报告宅','报告战','报告蘸','諃报告','报告盏','报告寨'],
		dayNames: ['报告謤报告斋','报告报告报告报告斋','榨謤报告报告报告斋','报告謤报告报告报告斋','报告报告报告报告斋','报告謤报告诈','报告报告诈'],
		dayNamesShort: ['报告謤','榨謤寨','榨謤謩','展謤謩','报告眨','报告謤闸','报告诈'],
		dayNamesMin: ['报告謤','榨謤寨','榨謤謩','展謤謩','报告眨','报告謤闸','报告诈'],
		weekHeader: '报告諒',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['hy']);
});
/* Indonesian initialisation for the jQuery UI date picker plugin. */
/* Written by Deden Fathurahman (dedenf@gmail.com). */
jQuery(function($){
	$.datepicker.regional['id'] = {
		closeText: 'Tutup',
		prevText: '&#x3C;mundur',
		nextText: 'maju&#x3E;',
		currentText: 'hari ini',
		monthNames: ['Januari','Februari','Maret','April','Mei','Juni',
		'Juli','Agustus','September','Oktober','Nopember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Agus','Sep','Okt','Nop','Des'],
		dayNames: ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'],
		dayNamesShort: ['Min','Sen','Sel','Rab','kam','Jum','Sab'],
		dayNamesMin: ['Mg','Sn','Sl','Rb','Km','jm','Sb'],
		weekHeader: 'Mg',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['id']);
});
/* Icelandic initialisation for the jQuery UI date picker plugin. */
/* Written by Haukur H. Thorsson (haukur@eskill.is). */
jQuery(function($){
	$.datepicker.regional['is'] = {
		closeText: 'Loka',
		prevText: '&#x3C; Fyrri',
		nextText: 'N忙sti &#x3E;',
		currentText: '脥 dag',
		monthNames: ['Jan煤ar','Febr煤ar','Mars','Apr铆l','Ma铆','J煤n铆',
		'J煤l铆','脕g煤st','September','Okt贸ber','N贸vember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Ma铆','J煤n',
		'J煤l','脕g煤','Sep','Okt','N贸v','Des'],
		dayNames: ['Sunnudagur','M谩nudagur','脼ri冒judagur','Mi冒vikudagur','Fimmtudagur','F枚studagur','Laugardagur'],
		dayNamesShort: ['Sun','M谩n','脼ri','Mi冒','Fim','F枚s','Lau'],
		dayNamesMin: ['Su','M谩','脼r','Mi','Fi','F枚','La'],
		weekHeader: 'Vika',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['is']);
});
/* Italian initialisation for the jQuery UI date picker plugin. */
/* Written by Antonello Pasella (antonello.pasella@gmail.com). */
jQuery(function($){
	$.datepicker.regional['it'] = {
		closeText: 'Chiudi',
		prevText: '&#x3C;Prec',
		nextText: 'Succ&#x3E;',
		currentText: 'Oggi',
		monthNames: ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
			'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'],
		monthNamesShort: ['Gen','Feb','Mar','Apr','Mag','Giu',
			'Lug','Ago','Set','Ott','Nov','Dic'],
		dayNames: ['Domenica','Luned矛','Marted矛','Mercoled矛','Gioved矛','Venerd矛','Sabato'],
		dayNamesShort: ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'],
		dayNamesMin: ['Do','Lu','Ma','Me','Gi','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['it']);
});

/* Japanese initialisation for the jQuery UI date picker plugin. */
/* Written by Kentaro SATO (kentaro@ranvis.com). */
jQuery(function($){
	$.datepicker.regional['ja'] = {
		closeText: '报告报告�',
		prevText: '&#x3C;鍓�',
		nextText: '娆�&#x3E;',
		currentText: '报告棩',
		monthNames: ['1鏈�','2鏈�','3鏈�','4鏈�','5鏈�','6鏈�',
		'7鏈�','8鏈�','9鏈�','10鏈�','11鏈�','12鏈�'],
		monthNamesShort: ['1鏈�','2鏈�','3鏈�','4鏈�','5鏈�','6鏈�',
		'7鏈�','8鏈�','9鏈�','10鏈�','11鏈�','12鏈�'],
		dayNames: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesShort: ['鏃�','鏈�','鐏�','姘�','鏈�','閲�','鍦�'],
		dayNamesMin: ['鏃�','鏈�','鐏�','姘�','鏈�','閲�','鍦�'],
		weekHeader: '閫�',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '骞�'};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});
/* Georgian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Lado Lomidze (lado.lomidze@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ka'] = {
		closeText: '报告报告报告报告报告�',
		prevText: '&#x3c; 报告报告报告',
		nextText: '报告报告报告报告报告� &#x3e;',
		currentText: '报告报告报告',
		monthNames: ['报告报告报告报告报告�','报告报告报告报告报告报告醿�','报告报告报告醿�','报告报告报告报告儤','报告报告报告醿�','报告报告报告报告儤', '报告报告报告报告儤','报告报告报告报告报告�','报告报告报告报告报告报告报告儤','报告报告报告报告报告报告醿�','报告报告报告报告报告报告','报告报告报告报告报告报告醿�'],
		monthNamesShort: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�', '报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNames: ['报告报告报告醿�','报告报告报告报告报告报告','报告报告报告报告报告报告醿�','报告报告报告报告报告报告醿�','报告报告报告报告报告报告醿�','报告报告报告报告报告报告醿�','报告报告报告报告儤'],
		dayNamesShort: ['报告儠','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesMin: ['报告儠','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		weekHeader: '报告报告报告醿�',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ka']);
});

/* Kazakh (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Dmitriy Karasyov (dmitriy.karasyov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['kk'] = {
		closeText: '报告报告',
		prevText: '&#x3C;报告报告报告褘',
		nextText: '报告报告报告&#x3E;',
		currentText: '报告报告薪',
		monthNames: ['报告报告邪褉','报告报告薪','报告褍褉报告','报告报告褉','报告报告褉','报告报告报告',
		'报告报告械','报告报告蟹','报告褉报告报告泻','报告报告薪','报告褉报告邪','报告报告报告报告薪'],
		monthNamesShort: ['报告遥','报告锌','报告褍','报告褍','报告屑','报告褍',
		'报告谢','报告屑','报告褉','报告蟹','报告褉','报告谢'],
		dayNames: ['报告报告报告报告','报告报告报告报告','报告报告报告报告','报告褉报告报告褨','报告报告报告报告','报告报告','报告报告褨'],
		dayNamesShort: ['报告褋','报告薪','报告薪','褋褉褋','报告薪','报告邪','报告斜'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: '报告',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['kk']);
});

/* Khmer initialisation for the jQuery calendar extension. */
/* Written by Chandara Om (chandara.teacher@gmail.com). */
jQuery(function($){
	$.datepicker.regional['km'] = {
		closeText: '报告报告报告鈥报告报告瀰',
		prevText: '报告报告�',
		nextText: '报告报告报告报告报告�',
		currentText: '报告报告报告鈥报告报告焽',
		monthNames: ['报告瀫报告灦','釣�报告报告报告釤�','报告报告报告','报告报告报告','报告报告报告','报告报告报告报告灦',
		'釣�釣�报告瀫报告灦','报告报告报告','釣�报告报告报告','报告报告报告','报告报告报告报告报告�釣�','报告报告报告'],
		monthNamesShort: ['报告瀫报告灦','釣�报告报告报告釤�','报告报告报告','报告报告报告','报告报告报告','报告报告报告报告灦',
		'釣�釣�报告瀫报告灦','报告报告报告','釣�报告报告报告','报告报告报告','报告报告报告报告报告�釣�','报告报告报告'],
		dayNames: ['报告报告报告报告报告�', '报告报告报告', '报告报告报告报告灇', '报告报告�', '报告报告报告报告报告报告报告煃', '报告报告�报告灇', '报告报告报告'],
		dayNamesShort: ['报告灦', '釣�', '釣�', '报告灮', '报告报告报告', '报告灮', '报告焻'],
		dayNamesMin: ['报告灦', '釣�', '釣�', '报告灮', '报告报告报告', '报告灮', '报告焻'],
		weekHeader: '报告报告报告报告报告�',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['km']);
});

/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com), Edited by Genie. */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '报告赴',
		prevText: '报告报告�',
		nextText: '报告报告�',
		currentText: '报告姌',
		monthNames: ['1鞗�','2鞗�','3鞗�','4鞗�','5鞗�','6鞗�',
		'7鞗�','8鞗�','9鞗�','10鞗�','11鞗�','12鞗�'],
		monthNamesShort: ['1鞗�','2鞗�','3鞗�','4鞗�','5鞗�','6鞗�',
		'7鞗�','8鞗�','9鞗�','10鞗�','11鞗�','12鞗�'],
		dayNames: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesShort: ['鞚�','鞗�','頇�','靾�','氇�','旮�','韱�'],
		dayNamesMin: ['鞚�','鞗�','頇�','靾�','氇�','旮�','韱�'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '雲�'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});
/* Luxembourgish initialisation for the jQuery UI date picker plugin. */
/* Written by Michel Weimerskirch <michel@weimerskirch.net> */
jQuery(function($){
	$.datepicker.regional['lb'] = {
		closeText: 'F盲erdeg',
		prevText: 'Zr茅ck',
		nextText: 'Weider',
		currentText: 'Haut',
		monthNames: ['Januar','Februar','M盲erz','Abr毛ll','Mee','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan', 'Feb', 'M盲e', 'Abr', 'Mee', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
		dayNames: ['Sonndeg', 'M茅indeg', 'D毛nschdeg', 'M毛ttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
		dayNamesShort: ['Son', 'M茅i', 'D毛n', 'M毛t', 'Don', 'Fre', 'Sam'],
		dayNamesMin: ['So','M茅','D毛','M毛','Do','Fr','Sa'],
		weekHeader: 'W',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lb']);
});

/* Lithuanian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas@avalon.lt> */
jQuery(function($){
	$.datepicker.regional['lt'] = {
		closeText: 'U啪daryti',
		prevText: '&#x3C;Atgal',
		nextText: 'Pirmyn&#x3E;',
		currentText: '艩iandien',
		monthNames: ['Sausis','Vasaris','Kovas','Balandis','Gegu报告','Bir啪elis',
		'Liepa','Rugpj奴tis','Rugs臈jis','Spalis','Lapkritis','Gruodis'],
		monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
		'Lie','Rugp','Rugs','Spa','Lap','Gru'],
		dayNames: ['sekmadienis','pirmadienis','antradienis','tre膷iadienis','ketvirtadienis','penktadienis','拧e拧tadienis'],
		dayNamesShort: ['sek','pir','ant','tre','ket','pen','拧e拧'],
		dayNamesMin: ['Se','Pr','An','Tr','Ke','Pe','艩e'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lt']);
});
/* Latvian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* @author Arturas Paleicikas <arturas.paleicikas@metasite.net> */
jQuery(function($){
	$.datepicker.regional['lv'] = {
		closeText: 'Aizv膿rt',
		prevText: 'Iepr',
		nextText: 'N膩ka',
		currentText: '艩odien',
		monthNames: ['Janv膩ris','Febru膩ris','Marts','Apr墨lis','Maijs','J奴nijs',
		'J奴lijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','J奴n',
		'J奴l','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['sv膿tdiena','pirmdiena','otrdiena','tre拧diena','ceturtdiena','piektdiena','sestdiena'],
		dayNamesShort: ['svt','prm','otr','tre','ctr','pkt','sst'],
		dayNamesMin: ['Sv','Pr','Ot','Tr','Ct','Pk','Ss'],
		weekHeader: 'Nav',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['lv']);
});
/* Macedonian i18n for the jQuery UI date picker plugin. */
/* Written by Stojce Slavkovski. */
jQuery(function($){
	$.datepicker.regional['mk'] = {
		closeText: '报告报告芯褉懈',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '报告报告褋',
		monthNames: ['报告报告邪褉懈','报告胁褉报告褉懈','报告褉褌','报告褉报告','报告褬','报告报告',
		'报告报告','报告报告报告','报告报告报告胁褉懈','报告报告报告褉懈','报告报告胁褉懈','报告报告报告褉懈'],
		monthNamesShort: ['报告薪','报告胁','报告褉','报告褉','报告褬','报告薪',
		'报告谢','报告谐','报告锌','报告褌','报告械','报告泻'],
		dayNames: ['报告报告报告','报告报告报告报告报告','报告芯褉报告泻','小褉报告邪','报告报告褉报告泻','报告报告泻','报告报告报告'],
		dayNamesShort: ['报告写','报告薪','报告芯','小褉械','报告褌','报告褌','报告斜'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: '报告写',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['mk']);
});

/* Malayalam (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Saji Nediyanchath (saji89@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ml'] = {
		closeText: '报告报告�',
		prevText: '报告报告报告报告报告报告嗟�',  
		nextText: '报告报告报告报告报告报告 ',
		currentText: '报告报告报告嗟�',
		monthNames: ['报告报告报告报告纯','报告报告报告报告报告报告啻�','报告报告报告鈥报告报告报告�','报告报告报告报告报告嶁��','报告报告报告','报告报告报告鈥�',
		'报告报告报告','报告报告报告报告报告报告','报告报告报告报告报告报告报告报告嶁��','报告报告报告报告报告报告鈥�','报告报告报告报告祶鈥�','报告报告报告报告报告嶁��'],
		monthNamesShort: ['报告报告�', '报告报告报告', '报告报告报告鈥�', '报告报告报告啻�', '报告报告报告', '报告报告报告鈥�',
		'报告报告报告', '报告礂', '报告报告报告', '报告报告报告嗟�', '报告报告�', '报告报告�'],
		dayNames: ['报告报告报告报告��', '报告报告报告报告报告嶁��', '报告报告报告啻�', '报告报告报告报告��', '报告报告报告报告磦', '报告报告报告报告纯', '报告报告�'],
		dayNamesShort: ['报告报告�', '报告报告报告啻�', '报告报告报告啻�', '报告报告�', '报告报告报告报告磦', '报告报告报告报告纯', '报告报告�'],
		dayNamesMin: ['报告淳','报告纯','报告祳','报告祦','报告报告报告','报告祮','啻�'],
		weekHeader: '啻�',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ml']);
});

/* Malaysian initialisation for the jQuery UI date picker plugin. */
/* Written by Mohd Nawawi Mohamad Jamili (nawawi@ronggeng.net). */
jQuery(function($){
	$.datepicker.regional['ms'] = {
		closeText: 'Tutup',
		prevText: '&#x3C;Sebelum',
		nextText: 'Selepas&#x3E;',
		currentText: 'hari ini',
		monthNames: ['Januari','Februari','Mac','April','Mei','Jun',
		'Julai','Ogos','September','Oktober','November','Disember'],
		monthNamesShort: ['Jan','Feb','Mac','Apr','Mei','Jun',
		'Jul','Ogo','Sep','Okt','Nov','Dis'],
		dayNames: ['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],
		dayNamesShort: ['Aha','Isn','Sel','Rab','kha','Jum','Sab'],
		dayNamesMin: ['Ah','Is','Se','Ra','Kh','Ju','Sa'],
		weekHeader: 'Mg',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ms']);
});
/* Dutch (Belgium) initialisation for the jQuery UI date picker plugin. */
/* David De Sloovere @DavidDeSloovere */
jQuery(function($){
	$.datepicker.regional['nl-BE'] = {
		closeText: 'Sluiten',
		prevText: '鈫�',
		nextText: '鈫�',
		currentText: 'Vandaag',
		monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
		'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
		monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
		'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
		dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['nl-BE']);
});

/* Dutch (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Mathias Bynens <http://mathiasbynens.be/> */
jQuery(function($){
	$.datepicker.regional.nl = {
		closeText: 'Sluiten',
		prevText: '鈫�',
		nextText: '鈫�',
		currentText: 'Vandaag',
		monthNames: ['januari', 'februari', 'maart', 'april', 'mei', 'juni',
		'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
		monthNamesShort: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun',
		'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
		dayNames: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
		dayNamesShort: ['zon', 'maa', 'din', 'woe', 'don', 'vri', 'zat'],
		dayNamesMin: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
		weekHeader: 'Wk',
		dateFormat: 'dd-mm-yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional.nl);
});
/* Norwegian initialisation for the jQuery UI date picker plugin. */
/* Written by Naimdjon Takhirov (naimdjon@gmail.com). */

jQuery(function($){
	$.datepicker.regional['no'] = {
		closeText: 'Lukk',
		prevText: '&#xAB;Forrige',
		nextText: 'Neste&#xBB;',
		currentText: 'I dag',
		monthNames: ['januar','februar','mars','april','mai','juni','juli','august','september','oktober','november','desember'],
		monthNamesShort: ['jan','feb','mar','apr','mai','jun','jul','aug','sep','okt','nov','des'],
		dayNamesShort: ['s酶n','man','tir','ons','tor','fre','l酶r'],
		dayNames: ['s酶ndag','mandag','tirsdag','onsdag','torsdag','fredag','l酶rdag'],
		dayNamesMin: ['s酶','ma','ti','on','to','fr','l酶'],
		weekHeader: 'Uke',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['no']);
});

/* Polish initialisation for the jQuery UI date picker plugin. */
/* Written by Jacek Wysocki (jacek.wysocki@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pl'] = {
		closeText: 'Zamknij',
		prevText: '&#x3C;Poprzedni',
		nextText: 'Nast臋pny&#x3E;',
		currentText: 'Dzi艣',
		monthNames: ['Stycze艅','Luty','Marzec','Kwiecie艅','Maj','Czerwiec',
		'Lipiec','Sierpie艅','Wrzesie艅','Pa藕dziernik','Listopad','Grudzie艅'],
		monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		'Lip','Sie','Wrz','Pa','Lis','Gru'],
		dayNames: ['Niedziela','Poniedzia艂ek','Wtorek','艢roda','Czwartek','Pi膮tek','Sobota'],
		dayNamesShort: ['Nie','Pn','Wt','艢r','Czw','Pt','So'],
		dayNamesMin: ['N','Pn','Wt','艢r','Cz','Pt','So'],
		weekHeader: 'Tydz',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pl']);
});

/* Brazilian initialisation for the jQuery UI date picker plugin. */
/* Written by Leonildo Costa Silva (leocsilva@gmail.com). */
jQuery(function($){
	$.datepicker.regional['pt-BR'] = {
		closeText: 'Fechar',
		prevText: '&#x3C;Anterior',
		nextText: 'Pr贸ximo&#x3E;',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar莽o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter莽a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S谩bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S谩b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S谩b'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt-BR']);
});
/* Portuguese initialisation for the jQuery UI date picker plugin. */
jQuery(function($){
	$.datepicker.regional['pt'] = {
		closeText: 'Fechar',
		prevText: '&#x3C;Anterior',
		nextText: 'Seguinte',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar莽o','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter莽a-feira','Quarta-feira','Quinta-feira','Sexta-feira','S谩bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S谩b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S谩b'],
		weekHeader: 'Sem',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['pt']);
});
/* Romansh initialisation for the jQuery UI date picker plugin. */
/* Written by Yvonne Gienal (yvonne.gienal@educa.ch). */
jQuery(function($){
	$.datepicker.regional['rm'] = {
		closeText: 'Serrar',
		prevText: '&#x3C;Suandant',
		nextText: 'Precedent&#x3E;',
		currentText: 'Actual',
		monthNames: ['Schaner','Favrer','Mars','Avrigl','Matg','Zercladur', 'Fanadur','Avust','Settember','October','November','December'],
		monthNamesShort: ['Scha','Fev','Mar','Avr','Matg','Zer', 'Fan','Avu','Sett','Oct','Nov','Dec'],
		dayNames: ['Dumengia','Glindesdi','Mardi','Mesemna','Gievgia','Venderdi','Sonda'],
		dayNamesShort: ['Dum','Gli','Mar','Mes','Gie','Ven','Som'],
		dayNamesMin: ['Du','Gl','Ma','Me','Gi','Ve','So'],
		weekHeader: 'emna',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['rm']);
});

/* Romanian initialisation for the jQuery UI date picker plugin.
 *
 * Written by Edmond L. (ll_edmond@walla.com)
 * and Ionut G. Stan (ionut.g.stan@gmail.com)
 */
jQuery(function($){
	$.datepicker.regional['ro'] = {
		closeText: '脦nchide',
		prevText: '&#xAB; Luna precedent膬',
		nextText: 'Luna urm膬toare &#xBB;',
		currentText: 'Azi',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Duminic膬', 'Luni', 'Mar牛i', 'Miercuri', 'Joi', 'Vineri', 'S芒mb膬t膬'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'S芒m'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','S芒'],
		weekHeader: 'S膬pt',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ro']);
});

/* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Andrew Stromnov (stromnov@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ru'] = {
		closeText: '报告泻褉报告褜',
		prevText: '&#x3C;袩褉报告',
		nextText: '报告报告&#x3E;',
		currentText: '报告报告报告褟',
		monthNames: ['报告报告褉褜','报告胁褉报告褜','报告褉褌','报告褉报告褜','报告泄','报告报告',
		'报告报告','报告报告报告','报告报告报告褉褜','报告报告斜褉褜','报告报告褉褜','报告报告斜褉褜'],
		monthNamesShort: ['报告胁','报告胁','报告褉','报告褉','报告泄','报告薪',
		'报告谢','报告谐','报告薪','报告褌','报告褟','报告泻'],
		dayNames: ['报告报告褉报告报告报告','报告报告报告报告报告泻','报告芯褉报告泻','褋褉报告邪','报告报告械褉谐','报告报告报告邪','报告报告报告邪'],
		dayNamesShort: ['报告泻','报告写','报告褉','褋褉写','报告胁','报告薪','报告褌'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: '报告写',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
});
/* Slovak initialisation for the jQuery UI date picker plugin. */
/* Written by Vojtech Rinik (vojto@hmm.sk). */
jQuery(function($){
	$.datepicker.regional['sk'] = {
		closeText: 'Zavrie钮',
		prevText: '&#x3C;Predch谩dzaj煤ci',
		nextText: 'Nasleduj煤ci&#x3E;',
		currentText: 'Dnes',
		monthNames: ['Janu谩r','Febru谩r','Marec','Apr铆l','M谩j','J煤n',
		'J煤l','August','September','Okt贸ber','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','M谩j','J煤n',
		'J煤l','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nede木a','Pondelok','Utorok','Streda','艩tvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','艩tv','Pia','Sob'],
		dayNamesMin: ['Ne','Po','Ut','St','艩t','Pia','So'],
		weekHeader: 'Ty',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sk']);
});

/* Slovenian initialisation for the jQuery UI date picker plugin. */
/* Written by Jaka Jancar (jaka@kubje.org). */
/* c = 膷, s = 拧 z = 啪 C = 膶 S = 艩 Z = 沤 */
jQuery(function($){
	$.datepicker.regional['sl'] = {
		closeText: 'Zapri',
		prevText: '&#x3C;Prej拧nji',
		nextText: 'Naslednji&#x3E;',
		currentText: 'Trenutni',
		monthNames: ['Januar','Februar','Marec','April','Maj','Junij',
		'Julij','Avgust','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljek','Torek','Sreda','膶etrtek','Petek','Sobota'],
		dayNamesShort: ['Ned','Pon','Tor','Sre','膶et','Pet','Sob'],
		dayNamesMin: ['Ne','Po','To','Sr','膶e','Pe','So'],
		weekHeader: 'Teden',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sl']);
});

/* Albanian initialisation for the jQuery UI date picker plugin. */
/* Written by Flakron Bytyqi (flakron@gmail.com). */
jQuery(function($){
	$.datepicker.regional['sq'] = {
		closeText: 'mbylle',
		prevText: '&#x3C;mbrapa',
		nextText: 'P毛rpara&#x3E;',
		currentText: 'sot',
		monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
		'Korrik','Gusht','Shtator','Tetor','N毛ntor','Dhjetor'],
		monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
		'Kor','Gus','Sht','Tet','N毛n','Dhj'],
		dayNames: ['E Diel','E H毛n毛','E Mart毛','E M毛rkur毛','E Enjte','E Premte','E Shtune'],
		dayNamesShort: ['Di','H毛','Ma','M毛','En','Pr','Sh'],
		dayNamesMin: ['Di','H毛','Ma','M毛','En','Pr','Sh'],
		weekHeader: 'Ja',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sq']);
});

/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimi膰. */
jQuery(function($){
	$.datepicker.regional['sr-SR'] = {
		closeText: 'Zatvori',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: 'Danas',
		monthNames: ['Januar','Februar','Mart','April','Maj','Jun',
		'Jul','Avgust','Septembar','Oktobar','Novembar','Decembar'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljak','Utorak','Sreda','膶etvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sre','膶et','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','膶e','Pe','Su'],
		weekHeader: 'Sed',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr-SR']);
});

/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimi膰. */
jQuery(function($){
	$.datepicker.regional['sr'] = {
		closeText: '报告报告芯褉懈',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '报告报告褋',
		monthNames: ['报告报告邪褉','报告斜褉报告褉','报告褉褌','报告褉报告','报告褬','报告薪',
		'报告谢','报告报告报告','报告报告报告报告褉','报告报告报告褉','报告报告报告邪褉','报告报告报告邪褉'],
		monthNamesShort: ['报告薪','报告斜','报告褉','报告褉','报告褬','报告薪',
		'报告谢','报告谐','报告锌','报告褌','报告胁','报告褑'],
		dayNames: ['报告报告报告','报告报告报告报告泻','报告芯褉报告','小褉报告邪','报告报告褉报告泻','报告报告泻','报告报告报告'],
		dayNamesShort: ['报告写','报告薪','报告芯','小褉械','报告褌','报告褌','报告斜'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: '报告写',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr']);
});

/* Swedish initialisation for the jQuery UI date picker plugin. */
/* Written by Anders Ekdahl ( anders@nomadiz.se). */
jQuery(function($){
	$.datepicker.regional['sv'] = {
		closeText: 'St盲ng',
		prevText: '&#xAB;F枚rra',
		nextText: 'N盲sta&#xBB;',
		currentText: 'Idag',
		monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
		'Juli','Augusti','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNamesShort: ['S枚n','M氓n','Tis','Ons','Tor','Fre','L枚r'],
		dayNames: ['S枚ndag','M氓ndag','Tisdag','Onsdag','Torsdag','Fredag','L枚rdag'],
		dayNamesMin: ['S枚','M氓','Ti','On','To','Fr','L枚'],
		weekHeader: 'Ve',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sv']);
});

/* Tamil (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by S A Sureshkumar (saskumar@live.com). */
jQuery(function($){
	$.datepicker.regional['ta'] = {
		closeText: '报告报告报告',
		prevText: '报告报告报告报告报告报告喁�',
		nextText: '报告报告报告报告报告报告',
		currentText: '报告报告报告喁�',
		monthNames: ['报告瘓','报告报告报告','报告报告报告报告报告�','报告报告报告报告报告报告','报告报告报告报告','报告报告�',
		'报告报告�','报告报告报告','报告报告报告报告报告报告喈�','报告报告报告报告','报告报告报告报告报告报告报告瘓','报告报告报告报告报告�'],
		monthNamesShort: ['报告瘓','报告报告报告','报告报告�','报告报告报告','报告报告报告','报告报告�',
		'报告报告�','报告','报告报告�','报告报告�','报告报告报告','报告报告报告'],
		dayNames: ['报告报告报告报告报告报告报告报告报告报告报告�','报告报告报告报告报告报告报告报告报告','报告报告报告报告报告报告报告报告报告报告报告�','报告报告报告报告报告报告报告瘓','报告报告报告报告报告报告报告报告报告','报告报告报告报告报告报告报告报告报告喁�','报告报告报告报告报告报告报告瘓'],
		dayNamesShort: ['报告报告报告报告瘉','报告报告报告报告报告�','报告报告报告报告报告报告','报告报告报告喁�','报告报告报告报告报告�','报告报告报告报告','报告报告�'],
		dayNamesMin: ['报告','报告','报告瘑','报告瘉','报告','报告瘑','喈�'],
		weekHeader: '报告',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ta']);
});

/* Thai initialisation for the jQuery UI date picker plugin. */
/* Written by pipo (pipo@sixhead.com). */
jQuery(function($){
	$.datepicker.regional['th'] = {
		closeText: '报告报告�',
		prevText: '&#xAB;&#xA0;报告报告报告',
		nextText: '报告报告报告喔�&#xA0;&#xBB;',
		currentText: '报告报告报告报告箟',
		monthNames: ['报告报告报告报告浮','报告报告报告报告报告报告报告箤','报告报告报告报告浮','喙�报告报告报告喔�','报告报告报告报告报告�','报告报告报告报告报告报告',
		'报告报告报告报告报告�','报告报告报告报告报告�','报告报告报告报告报告�','报告报告报告报告浮','报告报告报告报告报告报告喔�','报告报告报告报告报告�'],
		monthNamesShort: ['喔�.喔�.','喔�.喔�.','报告傅.喔�.','喙�喔�.喔�.','喔�.喔�.','报告复.喔�.',
		'喔�.喔�.','喔�.喔�.','喔�.喔�.','喔�.喔�.','喔�.喔�.','喔�.喔�.'],
		dayNames: ['报告报告报告报告报告�','报告报告报告报告箤','报告报告报告报告福','报告报告�','报告报告报告报告报告报告','报告报告报告喙�','喙�报告报告报告'],
		dayNamesShort: ['报告覆.','喔�.','喔�.','喔�.','报告袱.','喔�.','喔�.'],
		dayNamesMin: ['报告覆.','喔�.','喔�.','喔�.','报告袱.','喔�.','喔�.'],
		weekHeader: 'Wk',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['th']);
});
/* Tajiki (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Abdurahmon Saidov (saidovab@gmail.com). */
jQuery(function($){
	$.datepicker.regional['tj'] = {
		closeText: '报告报告邪',
		prevText: '&#x3c;报告报告',
		nextText: '报告褕&#x3e;',
		currentText: '报告褉报告',
		monthNames: ['报告报告褉','报告胁褉报告','报告褉褌','报告褉报告','报告泄','报告薪',
		'报告谢','报告报告报告','报告报告报告褉','报告报告斜褉','报告报告褉','报告报告斜褉'],
		monthNamesShort: ['报告胁','报告胁','报告褉','报告褉','报告泄','报告薪',
		'报告谢','报告谐','报告薪','报告褌','报告褟','报告泻'],
		dayNames: ['报告报告报告械','报告报告报告械','报告报告报告械','报告褉报告报告械','报告报告报告报告械','报告报告邪','报告报告械'],
		dayNamesShort: ['报告褕','报告褕','报告褕','报告褉','报告薪','报告屑','报告薪'],
		dayNamesMin: ['报告','报告','报告','报告','报告','报告','报告'],
		weekHeader: '报告',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['tj']);
});
/* Turkish initialisation for the jQuery UI date picker plugin. */
/* Written by Izzet Emre Erkan (kara@karalamalar.net). */
jQuery(function($){
	$.datepicker.regional['tr'] = {
		closeText: 'kapat',
		prevText: '&#x3C;geri',
		nextText: 'ileri&#x3e',
		currentText: 'bug眉n',
		monthNames: ['Ocak','艦ubat','Mart','Nisan','May谋s','Haziran',
		'Temmuz','A臒ustos','Eyl眉l','Ekim','Kas谋m','Aral谋k'],
		monthNamesShort: ['Oca','艦ub','Mar','Nis','May','Haz',
		'Tem','A臒u','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Sal谋','脟ar艧amba','Per艧embe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','脟a','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','脟a','Pe','Cu','Ct'],
		weekHeader: 'Hf',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['tr']);
});
/* Ukrainian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Maxim Drogobitskiy (maxdao@gmail.com). */
/* Corrected by Igor Milla (igor.fsp.milla@gmail.com). */
jQuery(function($){
	$.datepicker.regional['uk'] = {
		closeText: '报告泻褉报告懈',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '报告报告报告报告',
		monthNames: ['报告报告报告','报告报告泄','报告褉报告报告褜','报告报告报告褜','孝褉报告报告褜','报告褉报告报告',
		'报告报告报告','报告褉报告报告','报告褉报告报告褜','报告报告报告褜','报告报告报告报告','袚褉报告报告褜'],
		monthNamesShort: ['报告褔','报告褌','报告褉','报告褨','孝褉邪','报告褉',
		'报告锌','报告褉','报告褉','报告胁','报告褋','袚褉褍'],
		dayNames: ['报告报告报告','报告报告报告报告泻','报告报告芯褉报告','报告褉报告邪','报告报告械褉','锌鈥报告报告报告�','报告报告报告'],
		dayNamesShort: ['报告写','报告写','报告胁','褋褉写','报告胁','报告薪','报告褌'],
		dayNamesMin: ['报告','报告','报告','小褉','报告','报告','报告'],
		weekHeader: '报告卸',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['uk']);
});
/* Vietnamese initialisation for the jQuery UI date picker plugin. */
/* Translated by Le Thanh Huy (lthanhhuy@cit.ctu.edu.vn). */
jQuery(function($){
	$.datepicker.regional['vi'] = {
		closeText: '报告ng',
		prevText: '&#x3C;Tr报告沜',
		nextText: 'Ti岷縫&#x3E;',
		currentText: 'H么m nay',
		monthNames: ['Th谩ng M峄檛', 'Th谩ng Hai', 'Th谩ng Ba', 'Th谩ng T瓢', 'Th谩ng N膬m', 'Th谩ng S谩u',
		'Th谩ng B岷', 'Th谩ng T谩m', 'Th谩ng Ch铆n', 'Th谩ng M报告漣', 'Th谩ng M报告漣 M峄檛', 'Th谩ng M报告漣 Hai'],
		monthNamesShort: ['Th谩ng 1', 'Th谩ng 2', 'Th谩ng 3', 'Th谩ng 4', 'Th谩ng 5', 'Th谩ng 6',
		'Th谩ng 7', 'Th谩ng 8', 'Th谩ng 9', 'Th谩ng 10', 'Th谩ng 11', 'Th谩ng 12'],
		dayNames: ['Ch峄� Nh岷璽', 'Th峄� Hai', 'Th峄� Ba', 'Th峄� T瓢', 'Th峄� N膬m', 'Th峄� S谩u', 'Th峄� B岷'],
		dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
		weekHeader: 'Tu',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['vi']);
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Cloudream (cloudream@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-CN'] = {
		closeText: '报告棴',
		prevText: '&#x3C;报告湀',
		nextText: '报告湀&#x3E;',
		currentText: '报告ぉ',
		monthNames: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		monthNamesShort: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		dayNames: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesShort: ['报告棩','报告竴','报告簩','报告笁','报告洓','报告簲','报告叚'],
		dayNamesMin: ['鏃�','涓�','浜�','涓�','鍥�','浜�','鍏�'],
		weekHeader: '鍛�',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '骞�'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by SCCY (samuelcychan@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-HK'] = {
		closeText: '报告枆',
		prevText: '&#x3C;报告湀',
		nextText: '报告湀&#x3E;',
		currentText: '报告ぉ',
		monthNames: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		monthNamesShort: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		dayNames: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesShort: ['报告棩','报告竴','报告簩','报告笁','报告洓','报告簲','报告叚'],
		dayNamesMin: ['鏃�','涓�','浜�','涓�','鍥�','浜�','鍏�'],
		weekHeader: '鍛�',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '骞�'};
	$.datepicker.setDefaults($.datepicker.regional['zh-HK']);
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-TW'] = {
		closeText: '报告枆',
		prevText: '&#x3C;报告湀',
		nextText: '报告湀&#x3E;',
		currentText: '报告ぉ',
		monthNames: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		monthNamesShort: ['涓�鏈�','报告湀','报告湀','报告湀','报告湀','报告湀',
		'报告湀','报告湀','报告湀','报告湀','报告竴鏈�','报告报告�'],
		dayNames: ['报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�','报告报告�'],
		dayNamesShort: ['报告棩','报告竴','报告簩','报告笁','报告洓','报告簲','报告叚'],
		dayNamesMin: ['鏃�','涓�','浜�','涓�','鍥�','浜�','鍏�'],
		weekHeader: '鍛�',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: '骞�'};
	$.datepicker.setDefaults($.datepicker.regional['zh-TW']);
});
