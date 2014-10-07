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
		closeText: '±®∏Ê±®∏ÊŸÇ',
		prevText: '&#x3C;±®∏Ê±®∏Ê±®∏Ê',
		nextText: '±®∏Ê±®∏Ê±®∏Ê&#x3E;',
		currentText: '±®∏Ê±®∏ÊŸÖ',
		monthNames: ['±®∏Ê±®∏ÊŸä', '±®∏Ê±®∏ÊŸä', '±®∏Ê±®∏Ê', '±®∏Ê±®∏ÊŸÑ', '±®∏ÊŸä', '±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê±®∏Ê', '±®∏Êÿ™', '±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['±®∏Ê±®∏ÊÿØ', '±®∏Ê±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êÿ™'],
		dayNamesShort: ['±®∏Ê±®∏ÊÿØ', '±®∏Ê±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êÿ™'],
		dayNamesMin: ['±®∏Ê±®∏ÊÿØ', '±®∏Ê±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êÿ™'],
		weekHeader: '±®∏Ê±®∏Êÿπ',
		dateFormat: 'dd/mm/yy',
		firstDay: 6,
  		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ar-DZ']);
});

/* Arabic Translation for jQuery UI date picker plugin. */
/* Khaled Alhourani -- me@khaledalhourani.com */
/* NOTE: monthNames are the original months names and they are the Arabic names, not the new months name ±®∏Ê±®∏Ê±®∏Ê - ±®∏Ê±®∏Êÿ± and there isn't any Arabic roots for these months */
jQuery(function($){
	$.datepicker.regional['ar'] = {
		closeText: '±®∏Ê±®∏ÊŸÇ',
		prevText: '&#x3C;±®∏Ê±®∏Ê±®∏Ê',
		nextText: '±®∏Ê±®∏Ê±®∏Ê&#x3E;',
		currentText: '±®∏Ê±®∏ÊŸÖ',
		monthNames: ['±®∏Ê±®∏ÊŸÜ ±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê', '±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê', '±®∏Ê', '±®∏Ê±®∏ÊŸÑ',	'±®∏Ê±®∏ÊŸÜ ±®∏Ê±®∏ÊŸÑ', '±®∏Ê±®∏ÊŸÜ ±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏ÊŸÜ ±®∏Ê±®∏ÊŸÑ'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['±®∏Ê±®∏ÊÿØ', '±®∏Ê±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êÿ™'],
		dayNamesShort: ['±®∏Ê±®∏ÊÿØ', '±®∏Ê±®∏Ê±®∏ÊŸÜ', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êÿ™'],
		dayNamesMin: ['ÿ≠', 'ŸÜ', 'ÿ´', 'ÿ±', 'ÿÆ', 'ÿ¨', 'ÿ≥'],
		weekHeader: '±®∏Ê±®∏Êÿπ',
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
		closeText: 'Baƒüla',
		prevText: '&#x3C;Geri',
		nextText: 'ƒ∞r…ôli&#x3E;',
		currentText: 'Bug√ºn',
		monthNames: ['Yanvar','Fevral','Mart','Aprel','May','ƒ∞yun',
		'ƒ∞yul','Avqust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
		monthNamesShort: ['Yan','Fev','Mar','Apr','May','ƒ∞yun',
		'ƒ∞yul','Avq','Sen','Okt','Noy','Dek'],
		dayNames: ['Bazar','Bazar ert…ôsi','±®∏Êr±®∏Ênb…ô ax≈üamƒ±','±®∏Êr±®∏Ênb…ô','C√ºm…ô ax≈üamƒ±','C√ºm…ô','±®∏Ênb…ô'],
		dayNamesShort: ['B','Be','√áa','√á','Ca','C','≈û'],
		dayNamesMin: ['B','B','√á','–°','√á','C','≈û'],
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
		closeText: '±®∏Ê±®∏Ê–æ—Ä–∏',
		prevText: '&#x3C;±®∏Ê±®∏Ê–¥',
		nextText: '±®∏Ê–ø—Ä±®∏Ê&#x3E;',
		nextBigText: '&#x3E;&#x3E;',
		currentText: '±®∏Ê±®∏Ê',
		monthNames: ['±®∏Ê±®∏Ê—Ä–∏','±®∏Ê–≤—Ä±®∏Ê—Ä–∏','±®∏Ê—Ä—Ç','±®∏Ê—Ä±®∏Ê','±®∏Ê–π','±®∏Ê–∏',
		'±®∏Ê–∏','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê–≤—Ä–∏','±®∏Ê±®∏Ê±®∏Ê—Ä–∏','±®∏Ê±®∏Ê–≤—Ä–∏','±®∏Ê±®∏Ê±®∏Ê—Ä–∏'],
		monthNamesShort: ['±®∏Ê—É','±®∏Ê–≤','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê–π','±®∏Ê–∏',
		'±®∏Ê–∏','±®∏Ê–≥','±®∏Ê–ø','±®∏Ê—Ç','±®∏Ê–≤','±®∏Ê–∫'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê–æ—Ä±®∏Ê–∫','–°—Ä±®∏Ê–∞','±®∏Ê±®∏Ê—ä—Ä±®∏Ê–∫','±®∏Ê±®∏Ê–∫','±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Ê–¥','±®∏Ê–Ω','±®∏Ê–æ','–°—Ä—è','±®∏Ê—Ç','±®∏Ê—Ç','±®∏Ê–±'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
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
		dayNames: ['Nedelja','Ponedeljak','Utorak','Srijeda','ƒåetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','ƒået','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','ƒåe','Pe','Su'],
		weekHeader: 'Wk',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['bs']);
});
/* Inicialitzaci√≥ en catal√† per a l'extensi√≥ 'UI date picker' per jQuery. */
/* Writers: (joan.leon@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ca'] = {
		closeText: 'Tanca',
		prevText: 'Anterior',
		nextText: 'Seg√ºent',
		currentText: 'Avui',
		monthNames: ['gener','febrer','mar√ß','abril','maig','juny',
		'juliol','agost','setembre','octubre','novembre','desembre'],
		monthNamesShort: ['gen','feb','mar√ß','abr','maig','juny',
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
		closeText: 'Zav±®∏Êt',
		prevText: '&#x3C;D±®∏Êve',
		nextText: 'Pozdƒõji&#x3E;',
		currentText: 'Nyn√≠',
		monthNames: ['leden','√∫nor','b≈ôezen','duben','kvƒõten','ƒçerven',
		'ƒçervenec','srpen','z±®∏Ê√≠','±®∏Êjen','listopad','prosinec'],
		monthNamesShort: ['led','√∫no','b≈ôe','dub','kvƒõ','ƒçer',
		'ƒçvc','srp','z±®∏Ê','±®∏Êj','lis','pro'],
		dayNames: ['nedƒõle', 'pondƒõl√≠', '√∫ter√Ω', 'st≈ôeda', 'ƒçtvrtek', 'p√°tek', 'sobota'],
		dayNamesShort: ['ne', 'po', '√∫t', 'st', 'ƒçt', 'p√°', 'so'],
		dayNamesMin: ['ne','po','√∫t','st','ƒçt','p√°','so'],
		weekHeader: 'T√Ωd',
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
		nextText: 'N√¶ste&#x3E;',
		currentText: 'Idag',
		monthNames: ['Januar','Februar','Marts','April','Maj','Juni',
		'Juli','August','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['S√∏ndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','L√∏rdag'],
		dayNamesShort: ['S√∏n','Man','Tir','Ons','Tor','Fre','L√∏r'],
		dayNamesMin: ['S√∏','Ma','Ti','On','To','Fr','L√∏'],
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
		closeText: 'schlie√üen',
		prevText: '&#x3C;zur√ºck',
		nextText: 'Vor&#x3E;',
		currentText: 'heute',
		monthNames: ['Januar','Februar','M√§rz','April','Mai','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan','Feb','M√§r','Apr','Mai','Jun',
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
		closeText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
		prevText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
		nextText: 'ŒïœÄ±®∏Ê±®∏Ê±®∏Ê',
		currentText: '±®∏Ê±®∏Ê±®∏Ê ±®∏Ê±®∏ÊœÇ',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊœÇ','±®∏Ê±®∏Ê±®∏ÊœÇ','ŒëœÄ±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏ÊœÇ','±®∏Ê±®∏Ê±®∏ÊœÇ',
		'±®∏Ê±®∏Ê±®∏ÊœÇ','±®∏Ê±®∏Ê±®∏Ê±®∏ÊœÇ','±®∏ÊœÄ±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏ÊœÇ','±®∏Ê±®∏Ê±®∏Ê±®∏ÊœÇ','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê'],
		monthNamesShort: ['±®∏ÊŒΩ','±®∏ÊŒ≤','±®∏ÊœÅ','ŒëœÄœÅ','±®∏ÊŒπ','±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê','±®∏ÊŒ≥','±®∏ÊœÄ','±®∏ÊœÑ','±®∏ÊŒµ','±®∏ÊŒ∫'],
		dayNames: ['±®∏Ê±®∏Ê±®∏ÊŒÆ','±®∏Ê±®∏Ê±®∏ÊŒ±','±®∏Ê±®∏ÊŒ∑','±®∏Ê±®∏Ê±®∏ÊŒ∑','±®∏ÊŒºœÄ±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏ÊŒÆ','±®∏Ê±®∏Ê±®∏ÊŒø'],
		dayNamesShort: ['±®∏ÊœÅ','±®∏ÊœÖ','±®∏ÊŒπ','±®∏ÊœÑ','±®∏ÊŒº','±®∏ÊœÅ','±®∏ÊŒ≤'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏ÊŒ¥',
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
		'Julio','A≈≠gusto','Septembro','Oktobro','Novembro','Decembro'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','A≈≠g','Sep','Okt','Nov','Dec'],
		dayNames: ['Dimanƒâo','Lundo','Mardo','Merkredo','ƒ¥a≈≠do','Vendredo','Sabato'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','ƒ¥a≈≠','Ven','Sab'],
		dayNamesMin: ['Di','Lu','Ma','Me','ƒ¥a','Ve','Sa'],
		weekHeader: 'Sb',
		dateFormat: 'dd/mm/yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['eo']);
});

/* Inicializaci√≥n en espa√±ol para la extensi√≥n 'UI date picker' para jQuery. */
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
		dayNames: ['Domingo','Lunes','Martes','Mi√©rcoles','Jueves','Viernes','S√°bado'],
		dayNamesShort: ['Dom','Lun','Mar','Mi√©','Juv','Vie','S√°b'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S√°'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['es']);
});
/* Estonian initialisation for the jQuery UI date picker plugin. */
/* Written by Mart S√µmermaa (mrts.pydev at gmail com). */
jQuery(function($){
	$.datepicker.regional['et'] = {
		closeText: 'Sulge',
		prevText: 'Eelnev',
		nextText: 'J√§rgnev',
		currentText: 'T√§na',
		monthNames: ['Jaanuar','Veebruar','M√§rts','Aprill','Mai','Juuni',
		'Juuli','August','September','Oktoober','November','Detsember'],
		monthNamesShort: ['Jaan', 'Veebr', 'M√§rts', 'Apr', 'Mai', 'Juuni',
		'Juuli', 'Aug', 'Sept', 'Okt', 'Nov', 'Dets'],
		dayNames: ['P√ºhap√§ev', 'Esmasp√§ev', 'Teisip√§ev', 'Kolmap√§ev', 'Neljap√§ev', 'Reede', 'Laup√§ev'],
		dayNamesShort: ['P√ºhap', 'Esmasp', 'Teisip', 'Kolmap', 'Neljap', 'Reede', 'Laup'],
		dayNamesMin: ['P','E','T','K','N','R','L'],
		weekHeader: 'n√§d',
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
		closeText: '±®∏Ê±®∏Ê',
		prevText: '&#x3C;±®∏Ê±®∏Ê',
		nextText: '±®∏Ê±®∏Ê&#x3E;',
		currentText: '±®∏Ê±®∏Êÿ≤',
		monthNames: [
			'±®∏Ê±®∏Ê±®∏ÊŸÜ',
			'±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
			'±®∏Ê±®∏ÊÿØ',
			'±®∏Êÿ±',
			'±®∏Ê±®∏ÊÿØ',
			'±®∏Ê±®∏Ê±®∏Ê',
			'±®∏Êÿ±',
			'±®∏Ê±®∏Ê',
			'±®∏Êÿ±',
			'±®∏Ê',
			'±®∏Ê±®∏Ê',
			'±®∏Ê±®∏ÊÿØ'
		],
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		dayNames: [
			'±®∏Ê±®∏Ê±®∏Ê',
			'±®∏Ê±®∏Ê±®∏Ê',
			'±®∏Ê‚Ä±®∏Ê±®∏Êá',
			'±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
			'±®∏Ê±®∏Ê±®∏ÊŸá',
			'±®∏Ê±®∏Ê',
			'±®∏Ê±®∏Ê'
		],
		dayNamesShort: [
			'€å',
			'ÿØ',
			'ÿ≥',
			'⁄Ü',
			'Ÿæ',
			'ÿ¨', 
			'ÿ¥'
		],
		dayNamesMin: [
			'€å',
			'ÿØ',
			'ÿ≥',
			'⁄Ü',
			'Ÿæ',
			'ÿ¨', 
			'ÿ¥'
		],
		weekHeader: '±®∏Ê',
		dateFormat: 'yy/mm/dd',
		firstDay: 6,
		isRTL: true,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['fa']);
});
/* Finnish initialisation for the jQuery UI date picker plugin. */
/* Written by Harri Kilpi√∂ (harrikilpio@gmail.com). */
jQuery(function($){
	$.datepicker.regional['fi'] = {
		closeText: 'Sulje',
		prevText: '&#xAB;Edellinen',
		nextText: 'Seuraava&#xBB;',
		currentText: 'T√§n±®∏Ên',
		monthNames: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kes√§kuu',
		'Hein√§kuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
		monthNamesShort: ['Tammi','Helmi','Maalis','Huhti','Touko','Kes√§',
		'Hein√§','Elo','Syys','Loka','Marras','Joulu'],
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
		nextText: 'N√¶sta&#x3E;',
		currentText: '√ç dag',
		monthNames: ['Januar','Februar','Mars','Apr√≠l','Mei','Juni',
		'Juli','August','September','Oktober','November','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mei','Jun',
		'Jul','Aug','Sep','Okt','Nov','Des'],
		dayNames: ['Sunnudagur','M√°nadagur','T√Ωsdagur','Mikudagur','H√≥sdagur','Fr√≠ggjadagur','Leyardagur'],
		dayNamesShort: ['Sun','M√°n','T√Ωs','Mik','H√≥s','Fr√≠','Ley'],
		dayNamesMin: ['Su','M√°','T√Ω','Mi','H√≥','Fr','Le'],
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
		prevText: '&#x3C;Pr√©c',
		nextText: 'Suiv&#x3E;',
		currentText: 'Courant',
		monthNames: ['Janvier','F√©vrier','Mars','Avril','Mai','Juin',
		'Juillet','Ao√ªt','Septembre','Octobre','Novembre','D√©cembre'],
		monthNamesShort: ['Jan','F√©v','Mar','Avr','Mai','Jun',
		'Jul','Ao√ª','Sep','Oct','Nov','D√©c'],
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
			  St√©phane Nahmani (sholby@sholby.net),
			  St√©phane Raimbault <stephane.raimbault@gmail.com> */
jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: 'Pr√©c√©dent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','F√©vrier','Mars','Avril','Mai','Juin',
		'Juillet','Ao√ªt','Septembre','Octobre','Novembre','D√©cembre'],
		monthNamesShort: ['Janv.','F√©vr.','Mars','Avril','Mai','Juin',
		'Juil.','Ao√ªt','Sept.','Oct.','Nov.','D√©c.'],
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
		monthNames: ['Xaneiro','Febreiro','Marzo','Abril','Maio','Xu√±o',
		'Xullo','Agosto','Setembro','Outubro','Novembro','Decembro'],
		monthNamesShort: ['Xan','Feb','Mar','Abr','Mai','Xu√±',
		'Xul','Ago','Set','Out','Nov','Dec'],
		dayNames: ['Domingo','Luns','Martes','M√©rcores','Xoves','Venres','S√°bado'],
		dayNamesShort: ['Dom','Lun','Mar','M√©r','Xov','Ven','S√°b'],
		dayNamesMin: ['Do','Lu','Ma','M√©','Xo','Ve','S√°'],
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
		closeText: '±®∏Ê±®∏Ê',
		prevText: '&#x3C;±®∏Ê±®∏Ê◊ù',
		nextText: '±®∏Ê◊ê&#x3E;',
		currentText: '±®∏Ê±®∏Ê',
		monthNames: ['±®∏Ê±®∏Ê◊®','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê◊•','±®∏Ê±®∏Ê◊ú','±®∏Ê◊ô','±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê◊®','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê◊®'],
		monthNamesShort: ['±®∏Ê◊ï','±®∏Ê◊®','±®∏Ê◊•','±®∏Ê◊®','±®∏Ê◊ô','±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê','±®∏Ê◊í','±®∏Ê◊ò','±®∏Ê◊ß','±®∏Ê◊ë','±®∏Ê◊û'],
		dayNames: ['±®∏Ê±®∏Ê◊ü','±®∏Ê◊ô','±®∏Ê±®∏Ê◊ô','±®∏Ê±®∏Ê◊ô','±®∏Ê±®∏Ê◊ô','±®∏Ê±®∏Ê','±®∏Ê◊™'],
		dayNamesShort: ['◊ê\'','◊ë\'','◊í\'','◊ì\'','◊î\'','◊ï\'','±®∏Ê◊™'],
		dayNamesMin: ['◊ê\'','◊ë\'','◊í\'','◊ì\'','◊î\'','◊ï\'','±®∏Ê◊™'],
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
		closeText: '±®∏Ê±®∏Ê¶',
		prevText: '±®∏Ê±®∏Ê±®∏Ê‡§æ',
		nextText: '±®∏Ê±®∏Ê±®∏Ê',
		currentText: '±®∏Ê§ú',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê‡•Ä ','±®∏Ê±®∏Ê±®∏Ê‡•Ä','±®∏Ê±®∏Ê±®∏Ê‡§ö','±®∏Ê±®∏Ê±®∏Ê±®∏Ê§≤','±®∏Ê§à','±®∏Ê±®∏Ê®',
		'±®∏Ê±®∏Ê±®∏Ê‡§à','±®∏Ê±®∏Ê±®∏Ê‡§§ ','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê∞','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê∞','±®∏Ê±®∏Ê±®∏Ê±®∏Ê§∞','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê∞'],
		monthNamesShort: ['±®∏Ê§®', '±®∏Ê§∞', '±®∏Ê±®∏Ê±®∏Ê‡§ö', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê§≤', '±®∏Ê§à', '±®∏Ê±®∏Ê®',
		'±®∏Ê±®∏Ê±®∏Ê‡§à', '±®∏Ê§ó', '±®∏Ê±®∏Ê§', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê§µ', '±®∏Ê§ø'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê§∞', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê§∞', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê∞', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê§∞', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê∞', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê§∞'],
		dayNamesShort: ['±®∏Ê±®∏Êø', '±®∏Ê±®∏ÊÆ', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êß', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê‡§∞', '±®∏Ê±®∏Êø'],
		dayNamesMin: ['±®∏Ê±®∏Êø', '±®∏Ê±®∏ÊÆ', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Êß', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê‡§∞', '±®∏Ê±®∏Êø'],
		weekHeader: '±®∏Ê±®∏Ê±®∏Ê‡§æ',
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
		monthNames: ['Sijeƒçanj','Veljaƒça','O≈æujak','Travanj','Svibanj','Lipanj',
		'Srpanj','Kolovoz','Rujan','Listopad','Studeni','Prosinac'],
		monthNamesShort: ['Sij','Velj','O≈æu','Tra','Svi','Lip',
		'Srp','Kol','Ruj','Lis','Stu','Pro'],
		dayNames: ['Nedjelja','Ponedjeljak','Utorak','Srijeda','ƒåetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sri','ƒået','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','ƒåe','Pe','Su'],
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
		closeText: 'bez√°r',
		prevText: 'vissza',
		nextText: 'el≈ëre',
		currentText: 'ma',
		monthNames: ['Janu√°r', 'Febru√°r', 'M√°rcius', '√Åprilis', 'M√°jus', 'J√∫nius',
		'J√∫lius', 'Augusztus', 'Szeptember', 'Okt√≥ber', 'November', 'December'],
		monthNamesShort: ['Jan', 'Feb', 'M√°r', '√Åpr', 'M√°j', 'J√∫n',
		'J√∫l', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'],
		dayNames: ['Vas√°rnap', 'H√©tf≈ë', 'Kedd', 'Szerda', 'Cs√ºt√∂rt√∂k', 'P√©ntek', 'Szombat'],
		dayNamesShort: ['Vas', 'H√©t', 'Ked', 'Sze', 'Cs√º', 'P√©n', 'Szo'],
		dayNamesMin: ['V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo'],
		weekHeader: 'H√©t',
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
		closeText: '±®∏Ê±®∏Ê’¨',
		prevText: '&#x3C;±®∏Ê’≠.',
		nextText: '’Ä±®∏Ê.&#x3E;',
		currentText: '±®∏Ê±®∏Ê÷Ä',
		monthNames: ['’Ä±®∏Ê±®∏Ê’°÷Ä','±®∏Ê’ø÷Ä±®∏Ê÷Ä','±®∏Ê÷Ä’ø','±®∏Ê÷Ä±®∏Ê','±®∏Ê±®∏Ê’Ω','’Ä±®∏Ê±®∏Ê’Ω',
		'’Ä±®∏Ê±®∏Ê’Ω','±®∏Ê±®∏Ê±®∏Ê’Ω','±®∏Ê±®∏Ê±®∏Ê±®∏Ê÷Ä','’Ä±®∏Ê±®∏Ê±®∏Ê’•÷Ä','±®∏Ê±®∏Ê±®∏Ê’•÷Ä','±®∏Ê±®∏Ê±®∏Ê±®∏Ê÷Ä'],
		monthNamesShort: ['’Ä±®∏Ê±®∏Ê','±®∏Ê’ø÷Ä','±®∏Ê÷Ä’ø','±®∏Ê÷Ä','±®∏Ê±®∏Ê’Ω','’Ä±®∏Ê±®∏Ê’Ω',
		'’Ä±®∏Ê’¨','±®∏Ê’Ω','±®∏Ê’∫','’Ä±®∏Ê','±®∏Ê’µ','±®∏Ê’Ø'],
		dayNames: ['±®∏Ê÷Ä±®∏Ê’´','±®∏Ê±®∏Ê±®∏Ê±®∏Ê’´','’•÷Ä±®∏Ê±®∏Ê±®∏Ê’´','±®∏Ê÷Ä±®∏Ê±®∏Ê±®∏Ê’´','±®∏Ê±®∏Ê±®∏Ê±®∏Ê’´','±®∏Ê÷Ä±®∏Ê’©','±®∏Ê±®∏Ê’©'],
		dayNamesShort: ['±®∏Ê÷Ä','’•÷Ä’Ø','’•÷Ä÷Ñ','’π÷Ä÷Ñ','±®∏Ê’£','±®∏Ê÷Ä’¢','±®∏Ê’©'],
		dayNamesMin: ['±®∏Ê÷Ä','’•÷Ä’Ø','’•÷Ä÷Ñ','’π÷Ä÷Ñ','±®∏Ê’£','±®∏Ê÷Ä’¢','±®∏Ê’©'],
		weekHeader: '±®∏Ê’è',
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
		nextText: 'N√¶sti &#x3E;',
		currentText: '√ç dag',
		monthNames: ['Jan√∫ar','Febr√∫ar','Mars','Apr√≠l','Ma√≠','J√∫n√≠',
		'J√∫l√≠','√Åg√∫st','September','Okt√≥ber','N√≥vember','Desember'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Ma√≠','J√∫n',
		'J√∫l','√Åg√∫','Sep','Okt','N√≥v','Des'],
		dayNames: ['Sunnudagur','M√°nudagur','√ûri√∞judagur','Mi√∞vikudagur','Fimmtudagur','F√∂studagur','Laugardagur'],
		dayNamesShort: ['Sun','M√°n','√ûri','Mi√∞','Fim','F√∂s','Lau'],
		dayNamesMin: ['Su','M√°','√ûr','Mi','Fi','F√∂','La'],
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
		dayNames: ['Domenica','Luned√¨','Marted√¨','Mercoled√¨','Gioved√¨','Venerd√¨','Sabato'],
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
		closeText: '±®∏Ê±®∏Êã',
		prevText: '&#x3C;Ââç',
		nextText: 'Ê¨°&#x3E;',
		currentText: '±®∏Êó•',
		monthNames: ['1Êúà','2Êúà','3Êúà','4Êúà','5Êúà','6Êúà',
		'7Êúà','8Êúà','9Êúà','10Êúà','11Êúà','12Êúà'],
		monthNamesShort: ['1Êúà','2Êúà','3Êúà','4Êúà','5Êúà','6Êúà',
		'7Êúà','8Êúà','9Êúà','10Êúà','11Êúà','12Êúà'],
		dayNames: ['±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê•'],
		dayNamesShort: ['Êó•','Êúà','ÁÅ´','Ê∞¥','Êú®','Èáë','Âúü'],
		dayNamesMin: ['Êó•','Êúà','ÁÅ´','Ê∞¥','Êú®','Èáë','Âúü'],
		weekHeader: 'ÈÄ±',
		dateFormat: 'yy/mm/dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Âπ¥'};
	$.datepicker.setDefaults($.datepicker.regional['ja']);
});
/* Georgian (UTF-8) initialisation for the jQuery UI date picker plugin. */
/* Written by Lado Lomidze (lado.lomidze@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ka'] = {
		closeText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êê',
		prevText: '&#x3c; ±®∏Ê±®∏Ê±®∏Ê',
		nextText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êò &#x3e;',
		currentText: '±®∏Ê±®∏Ê±®∏Ê',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÉò','±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÉò', '±®∏Ê±®∏Ê±®∏Ê±®∏ÊÉò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êù','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊÉò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò'],
		monthNamesShort: ['±®∏Ê±®∏Êú','±®∏Ê±®∏Êë','±®∏Ê±®∏Ê†','±®∏Ê±®∏Ê†','±®∏Ê±®∏Êò','±®∏Ê±®∏Êú', '±®∏Ê±®∏Êö','±®∏Ê±®∏Êï','±®∏Ê±®∏Ê•','±®∏Ê±®∏Ê¢','±®∏Ê±®∏Êî','±®∏Ê±®∏Êô'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê·Éê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê·Éò','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÉò'],
		dayNamesShort: ['±®∏ÊÉï','±®∏Ê±®∏Ê®','±®∏Ê±®∏Êõ','±®∏Ê±®∏ÊÆ','±®∏Ê±®∏Êó','±®∏Ê±®∏Ê†','±®∏Ê±®∏Êë'],
		dayNamesMin: ['±®∏ÊÉï','±®∏Ê±®∏Ê®','±®∏Ê±®∏Êõ','±®∏Ê±®∏ÊÆ','±®∏Ê±®∏Êó','±®∏Ê±®∏Ê†','±®∏Ê±®∏Êë'],
		weekHeader: '±®∏Ê±®∏Ê±®∏Ê·Éê',
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
		closeText: '±®∏Ê±®∏Ê',
		prevText: '&#x3C;±®∏Ê±®∏Ê±®∏Ê—ã',
		nextText: '±®∏Ê±®∏Ê±®∏Ê&#x3E;',
		currentText: '±®∏Ê±®∏Ê–Ω',
		monthNames: ['±®∏Ê±®∏Ê–∞—Ä','±®∏Ê±®∏Ê–Ω','±®∏Ê—É—Ä±®∏Ê','±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê–µ','±®∏Ê±®∏Ê–∑','±®∏Ê—Ä±®∏Ê±®∏Ê–∫','±®∏Ê±®∏Ê–Ω','±®∏Ê—Ä±®∏Ê–∞','±®∏Ê±®∏Ê±®∏Ê±®∏Ê–Ω'],
		monthNamesShort: ['±®∏Ê“£','±®∏Ê–ø','±®∏Ê—É','±®∏Ê—É','±®∏Ê–º','±®∏Ê—É',
		'±®∏Ê–ª','±®∏Ê–º','±®∏Ê—Ä','±®∏Ê–∑','±®∏Ê—Ä','±®∏Ê–ª'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê—Ä±®∏Ê±®∏Ê—ñ','±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê','±®∏Ê±®∏Ê—ñ'],
		dayNamesShort: ['±®∏Ê—Å','±®∏Ê–Ω','±®∏Ê–Ω','—Å—Ä—Å','±®∏Ê–Ω','±®∏Ê–∞','±®∏Ê–±'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê',
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
		closeText: '±®∏Ê±®∏Ê±®∏Ê‚Ä±®∏Ê±®∏ÊûÖ',
		prevText: '±®∏Ê±®∏Êì',
		nextText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êã',
		currentText: '±®∏Ê±®∏Ê±®∏Ê‚Ä±®∏Ê±®∏Êüá',
		monthNames: ['±®∏ÊûÄ±®∏Êû∂','·ûÄ±®∏Ê±®∏Ê±®∏Ê·üà','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Êû∂',
		'·ûÄ·ûÄ±®∏ÊûÄ±®∏Êû∂','±®∏Ê±®∏Ê±®∏Ê','·ûÄ±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊÄ·û∂','±®∏Ê±®∏Ê±®∏Ê'],
		monthNamesShort: ['±®∏ÊûÄ±®∏Êû∂','·ûÄ±®∏Ê±®∏Ê±®∏Ê·üà','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Êû∂',
		'·ûÄ·ûÄ±®∏ÊûÄ±®∏Êû∂','±®∏Ê±®∏Ê±®∏Ê','·ûÄ±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊÄ·û∂','±®∏Ê±®∏Ê±®∏Ê'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êô', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê±®∏Êûö', '±®∏Ê±®∏Êí', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êüç', '±®∏Ê±®∏ÊÄ±®∏Êûö', '±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Êû∂', '·ûÖ', '·û¢', '±®∏Êûª', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Êûª', '±®∏ÊüÖ'],
		dayNamesMin: ['±®∏Êû∂', '·ûÖ', '·û¢', '±®∏Êûª', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Êûª', '±®∏ÊüÖ'],
		weekHeader: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç',
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
		closeText: '±®∏Ê∏∞',
		prevText: '±®∏Ê±®∏Ê¨',
		nextText: '±®∏Ê±®∏Ê¨',
		currentText: '±®∏Êäò',
		monthNames: ['1Ïõî','2Ïõî','3Ïõî','4Ïõî','5Ïõî','6Ïõî',
		'7Ïõî','8Ïõî','9Ïõî','10Ïõî','11Ïõî','12Ïõî'],
		monthNamesShort: ['1Ïõî','2Ïõî','3Ïõî','4Ïõî','5Ïõî','6Ïõî',
		'7Ïõî','8Ïõî','9Ïõî','10Ïõî','11Ïõî','12Ïõî'],
		dayNames: ['±®∏Ê±®∏Êº','±®∏Ê±®∏Êº','±®∏Ê±®∏Êº','±®∏Ê±®∏Êº','±®∏Ê±®∏Êº','±®∏Ê±®∏Êº','±®∏Ê±®∏Êº'],
		dayNamesShort: ['Ïùº','Ïõî','Ìôî','Ïàò','Î™©','Í∏à','ÌÜ†'],
		dayNamesMin: ['Ïùº','Ïõî','Ìôî','Ïàò','Î™©','Í∏à','ÌÜ†'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'ÎÖÑ'};
	$.datepicker.setDefaults($.datepicker.regional['ko']);
});
/* Luxembourgish initialisation for the jQuery UI date picker plugin. */
/* Written by Michel Weimerskirch <michel@weimerskirch.net> */
jQuery(function($){
	$.datepicker.regional['lb'] = {
		closeText: 'F√§erdeg',
		prevText: 'Zr√©ck',
		nextText: 'Weider',
		currentText: 'Haut',
		monthNames: ['Januar','Februar','M√§erz','Abr√´ll','Mee','Juni',
		'Juli','August','September','Oktober','November','Dezember'],
		monthNamesShort: ['Jan', 'Feb', 'M√§e', 'Abr', 'Mee', 'Jun',
		'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
		dayNames: ['Sonndeg', 'M√©indeg', 'D√´nschdeg', 'M√´ttwoch', 'Donneschdeg', 'Freideg', 'Samschdeg'],
		dayNamesShort: ['Son', 'M√©i', 'D√´n', 'M√´t', 'Don', 'Fre', 'Sam'],
		dayNamesMin: ['So','M√©','D√´','M√´','Do','Fr','Sa'],
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
		closeText: 'U≈ædaryti',
		prevText: '&#x3C;Atgal',
		nextText: 'Pirmyn&#x3E;',
		currentText: '≈†iandien',
		monthNames: ['Sausis','Vasaris','Kovas','Balandis','Gegu±®∏Ê','Bir≈æelis',
		'Liepa','Rugpj≈´tis','Rugsƒójis','Spalis','Lapkritis','Gruodis'],
		monthNamesShort: ['Sau','Vas','Kov','Bal','Geg','Bir',
		'Lie','Rugp','Rugs','Spa','Lap','Gru'],
		dayNames: ['sekmadienis','pirmadienis','antradienis','treƒçiadienis','ketvirtadienis','penktadienis','≈°e≈°tadienis'],
		dayNamesShort: ['sek','pir','ant','tre','ket','pen','≈°e≈°'],
		dayNamesMin: ['Se','Pr','An','Tr','Ke','Pe','≈†e'],
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
		closeText: 'Aizvƒìrt',
		prevText: 'Iepr',
		nextText: 'NƒÅka',
		currentText: '≈†odien',
		monthNames: ['JanvƒÅris','FebruƒÅris','Marts','Aprƒ´lis','Maijs','J≈´nijs',
		'J≈´lijs','Augusts','Septembris','Oktobris','Novembris','Decembris'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Mai','J≈´n',
		'J≈´l','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['svƒìtdiena','pirmdiena','otrdiena','tre≈°diena','ceturtdiena','piektdiena','sestdiena'],
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
		closeText: '±®∏Ê±®∏Ê–æ—Ä–∏',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '±®∏Ê±®∏Ê—Å',
		monthNames: ['±®∏Ê±®∏Ê–∞—Ä–∏','±®∏Ê–≤—Ä±®∏Ê—Ä–∏','±®∏Ê—Ä—Ç','±®∏Ê—Ä±®∏Ê','±®∏Ê—ò','±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê–≤—Ä–∏','±®∏Ê±®∏Ê±®∏Ê—Ä–∏','±®∏Ê±®∏Ê–≤—Ä–∏','±®∏Ê±®∏Ê±®∏Ê—Ä–∏'],
		monthNamesShort: ['±®∏Ê–Ω','±®∏Ê–≤','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê—ò','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê–≥','±®∏Ê–ø','±®∏Ê—Ç','±®∏Ê–µ','±®∏Ê–∫'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê–æ—Ä±®∏Ê–∫','–°—Ä±®∏Ê–∞','±®∏Ê±®∏Ê—Ä±®∏Ê–∫','±®∏Ê±®∏Ê–∫','±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Ê–¥','±®∏Ê–Ω','±®∏Ê–æ','–°—Ä–µ','±®∏Ê—Ç','±®∏Ê—Ç','±®∏Ê–±'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê–¥',
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
		closeText: '±®∏Ê±®∏Êø',
		prevText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡µÜ',  
		nextText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê ',
		currentText: '±®∏Ê±®∏Ê±®∏Ê‡µç',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê¥ø','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡¥ø','±®∏Ê±®∏Ê±®∏Ê‚Ä±®∏Ê±®∏Ê±®∏Êç','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç‚Äç','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê‚Äç',
		'±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç‚Äç','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‚Äç','±®∏Ê±®∏Ê±®∏Ê±®∏Êµç‚Äç','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç‚Äç'],
		monthNamesShort: ['±®∏Ê±®∏ÊÅ', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê‚Äç', '±®∏Ê±®∏Ê±®∏Ê‡¥ø', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê‚Äç',
		'±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê¥ó', '±®∏Ê±®∏Ê±®∏Ê', '±®∏Ê±®∏Ê±®∏Ê‡µã', '±®∏Ê±®∏ÊÇ', '±®∏Ê±®∏Ê∏'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏ÊÄç', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç‚Äç', '±®∏Ê±®∏Ê±®∏Ê‡¥µ', '±®∏Ê±®∏Ê±®∏Ê±®∏ÊÄç', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê¥Ç', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê¥ø', '±®∏Ê±®∏Êø'],
		dayNamesShort: ['±®∏Ê±®∏ÊØ', '±®∏Ê±®∏Ê±®∏Ê‡¥ï', '±®∏Ê±®∏Ê±®∏Ê‡¥µ', '±®∏Ê±®∏Êß', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê¥Ç', '±®∏Ê±®∏Ê±®∏Ê±®∏Ê¥ø', '±®∏Ê±®∏Êø'],
		dayNamesMin: ['±®∏Ê¥æ','±®∏Ê¥ø','±®∏Êµä','±®∏ÊµÅ','±®∏Ê±®∏Ê±®∏Ê','±®∏ÊµÜ','‡¥∂'],
		weekHeader: '‡¥Ü',
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
		prevText: '‚Üê',
		nextText: '‚Üí',
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
		prevText: '‚Üê',
		nextText: '‚Üí',
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
		dayNamesShort: ['s√∏n','man','tir','ons','tor','fre','l√∏r'],
		dayNames: ['s√∏ndag','mandag','tirsdag','onsdag','torsdag','fredag','l√∏rdag'],
		dayNamesMin: ['s√∏','ma','ti','on','to','fr','l√∏'],
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
		nextText: 'Nastƒôpny&#x3E;',
		currentText: 'Dzi≈õ',
		monthNames: ['Stycze≈Ñ','Luty','Marzec','Kwiecie≈Ñ','Maj','Czerwiec',
		'Lipiec','Sierpie≈Ñ','Wrzesie≈Ñ','Pa≈∫dziernik','Listopad','Grudzie≈Ñ'],
		monthNamesShort: ['Sty','Lu','Mar','Kw','Maj','Cze',
		'Lip','Sie','Wrz','Pa','Lis','Gru'],
		dayNames: ['Niedziela','Poniedzia≈Çek','Wtorek','≈öroda','Czwartek','PiƒÖtek','Sobota'],
		dayNamesShort: ['Nie','Pn','Wt','≈ör','Czw','Pt','So'],
		dayNamesMin: ['N','Pn','Wt','≈ör','Cz','Pt','So'],
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
		nextText: 'Pr√≥ximo&#x3E;',
		currentText: 'Hoje',
		monthNames: ['Janeiro','Fevereiro','Mar√ßo','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter√ßa-feira','Quarta-feira','Quinta-feira','Sexta-feira','S√°bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S√°b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S√°b'],
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
		monthNames: ['Janeiro','Fevereiro','Mar√ßo','Abril','Maio','Junho',
		'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
		'Jul','Ago','Set','Out','Nov','Dez'],
		dayNames: ['Domingo','Segunda-feira','Ter√ßa-feira','Quarta-feira','Quinta-feira','Sexta-feira','S√°bado'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','S√°b'],
		dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','S√°b'],
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
		closeText: '√énchide',
		prevText: '&#xAB; Luna precedentƒÉ',
		nextText: 'Luna urmƒÉtoare &#xBB;',
		currentText: 'Azi',
		monthNames: ['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie',
		'Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
		monthNamesShort: ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun',
		'Iul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['DuminicƒÉ', 'Luni', 'Mar≈£i', 'Miercuri', 'Joi', 'Vineri', 'S√¢mbƒÉtƒÉ'],
		dayNamesShort: ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'S√¢m'],
		dayNamesMin: ['Du','Lu','Ma','Mi','Jo','Vi','S√¢'],
		weekHeader: 'SƒÉpt',
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
		closeText: '±®∏Ê–∫—Ä±®∏Ê—å',
		prevText: '&#x3C;–ü—Ä±®∏Ê',
		nextText: '±®∏Ê±®∏Ê&#x3E;',
		currentText: '±®∏Ê±®∏Ê±®∏Ê—è',
		monthNames: ['±®∏Ê±®∏Ê—Ä—å','±®∏Ê–≤—Ä±®∏Ê—å','±®∏Ê—Ä—Ç','±®∏Ê—Ä±®∏Ê—å','±®∏Ê–π','±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê—Ä—å','±®∏Ê±®∏Ê–±—Ä—å','±®∏Ê±®∏Ê—Ä—å','±®∏Ê±®∏Ê–±—Ä—å'],
		monthNamesShort: ['±®∏Ê–≤','±®∏Ê–≤','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê–π','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê–≥','±®∏Ê–Ω','±®∏Ê—Ç','±®∏Ê—è','±®∏Ê–∫'],
		dayNames: ['±®∏Ê±®∏Ê—Ä±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê–∫','±®∏Ê–æ—Ä±®∏Ê–∫','—Å—Ä±®∏Ê–∞','±®∏Ê±®∏Ê–µ—Ä–≥','±®∏Ê±®∏Ê±®∏Ê–∞','±®∏Ê±®∏Ê±®∏Ê–∞'],
		dayNamesShort: ['±®∏Ê–∫','±®∏Ê–¥','±®∏Ê—Ä','—Å—Ä–¥','±®∏Ê–≤','±®∏Ê–Ω','±®∏Ê—Ç'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê–¥',
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
		closeText: 'Zavrie≈•',
		prevText: '&#x3C;Predch√°dzaj√∫ci',
		nextText: 'Nasleduj√∫ci&#x3E;',
		currentText: 'Dnes',
		monthNames: ['Janu√°r','Febru√°r','Marec','Apr√≠l','M√°j','J√∫n',
		'J√∫l','August','September','Okt√≥ber','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','M√°j','J√∫n',
		'J√∫l','Aug','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedeƒæa','Pondelok','Utorok','Streda','≈†tvrtok','Piatok','Sobota'],
		dayNamesShort: ['Ned','Pon','Uto','Str','≈†tv','Pia','Sob'],
		dayNamesMin: ['Ne','Po','Ut','St','≈†t','Pia','So'],
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
/* c = ƒç, s = ≈° z = ≈æ C = ƒå S = ≈† Z = ≈Ω */
jQuery(function($){
	$.datepicker.regional['sl'] = {
		closeText: 'Zapri',
		prevText: '&#x3C;Prej≈°nji',
		nextText: 'Naslednji&#x3E;',
		currentText: 'Trenutni',
		monthNames: ['Januar','Februar','Marec','April','Maj','Junij',
		'Julij','Avgust','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Avg','Sep','Okt','Nov','Dec'],
		dayNames: ['Nedelja','Ponedeljek','Torek','Sreda','ƒåetrtek','Petek','Sobota'],
		dayNamesShort: ['Ned','Pon','Tor','Sre','ƒået','Pet','Sob'],
		dayNamesMin: ['Ne','Po','To','Sr','ƒåe','Pe','So'],
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
		nextText: 'P√´rpara&#x3E;',
		currentText: 'sot',
		monthNames: ['Janar','Shkurt','Mars','Prill','Maj','Qershor',
		'Korrik','Gusht','Shtator','Tetor','N√´ntor','Dhjetor'],
		monthNamesShort: ['Jan','Shk','Mar','Pri','Maj','Qer',
		'Kor','Gus','Sht','Tet','N√´n','Dhj'],
		dayNames: ['E Diel','E H√´n√´','E Mart√´','E M√´rkur√´','E Enjte','E Premte','E Shtune'],
		dayNamesShort: ['Di','H√´','Ma','M√´','En','Pr','Sh'],
		dayNamesMin: ['Di','H√´','Ma','M√´','En','Pr','Sh'],
		weekHeader: 'Ja',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sq']);
});

/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimiƒá. */
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
		dayNames: ['Nedelja','Ponedeljak','Utorak','Sreda','ƒåetvrtak','Petak','Subota'],
		dayNamesShort: ['Ned','Pon','Uto','Sre','ƒået','Pet','Sub'],
		dayNamesMin: ['Ne','Po','Ut','Sr','ƒåe','Pe','Su'],
		weekHeader: 'Sed',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['sr-SR']);
});

/* Serbian i18n for the jQuery UI date picker plugin. */
/* Written by Dejan Dimiƒá. */
jQuery(function($){
	$.datepicker.regional['sr'] = {
		closeText: '±®∏Ê±®∏Ê–æ—Ä–∏',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '±®∏Ê±®∏Ê—Å',
		monthNames: ['±®∏Ê±®∏Ê–∞—Ä','±®∏Ê–±—Ä±®∏Ê—Ä','±®∏Ê—Ä—Ç','±®∏Ê—Ä±®∏Ê','±®∏Ê—ò','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê±®∏Ê–∞—Ä','±®∏Ê±®∏Ê±®∏Ê–∞—Ä'],
		monthNamesShort: ['±®∏Ê–Ω','±®∏Ê–±','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê—ò','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê–≥','±®∏Ê–ø','±®∏Ê—Ç','±®∏Ê–≤','±®∏Ê—Ü'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê–∫','±®∏Ê–æ—Ä±®∏Ê','–°—Ä±®∏Ê–∞','±®∏Ê±®∏Ê—Ä±®∏Ê–∫','±®∏Ê±®∏Ê–∫','±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Ê–¥','±®∏Ê–Ω','±®∏Ê–æ','–°—Ä–µ','±®∏Ê—Ç','±®∏Ê—Ç','±®∏Ê–±'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê–¥',
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
		closeText: 'St√§ng',
		prevText: '&#xAB;F√∂rra',
		nextText: 'N√§sta&#xBB;',
		currentText: 'Idag',
		monthNames: ['Januari','Februari','Mars','April','Maj','Juni',
		'Juli','Augusti','September','Oktober','November','December'],
		monthNamesShort: ['Jan','Feb','Mar','Apr','Maj','Jun',
		'Jul','Aug','Sep','Okt','Nov','Dec'],
		dayNamesShort: ['S√∂n','M√•n','Tis','Ons','Tor','Fre','L√∂r'],
		dayNames: ['S√∂ndag','M√•ndag','Tisdag','Onsdag','Torsdag','Fredag','L√∂rdag'],
		dayNamesMin: ['S√∂','M√•','Ti','On','To','Fr','L√∂'],
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
		closeText: '±®∏Ê±®∏Ê±®∏Ê',
		prevText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡ØÅ',
		nextText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
		currentText: '±®∏Ê±®∏Ê±®∏Ê‡ØÅ',
		monthNames: ['±®∏ÊØà','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êø','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÆø','±®∏Ê±®∏Êø',
		'±®∏Ê±®∏Êø','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡Æø','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÆø','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊØà','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êø'],
		monthNamesShort: ['±®∏ÊØà','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Êç','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Êø',
		'±®∏Ê±®∏Êø','±®∏ÊÆµ','±®∏Ê±®∏Ê∞','±®∏Ê±®∏Êç','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êà','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êà','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊØà','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡Øà','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏ÊØà'],
		dayNamesShort: ['±®∏Ê±®∏Ê±®∏Ê±®∏ÊØÅ','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê‡Øç','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êç','±®∏Ê±®∏Ê±®∏Ê±®∏ÊÆø','±®∏Ê±®∏Êø'],
		dayNamesMin: ['±®∏ÊÆæ','±®∏ÊÆø','±®∏ÊØÜ','±®∏ÊØÅ','±®∏ÊÆø','±®∏ÊØÜ','‡Æö'],
		weekHeader: '±®∏Ê',
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
		closeText: '±®∏Ê±®∏Êî',
		prevText: '&#xAB;&#xA0;±®∏Ê±®∏Ê±®∏Ê',
		nextText: '±®∏Ê±®∏Ê±®∏Ê‡∏õ&#xA0;&#xBB;',
		currentText: '±®∏Ê±®∏Ê±®∏Ê±®∏Êπâ',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê∏°','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êπå','±®∏Ê±®∏Ê±®∏Ê±®∏Ê∏°','‡πÄ±®∏Ê±®∏Ê±®∏Ê‡∏ô','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê°','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê°','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê°','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êô','±®∏Ê±®∏Ê±®∏Ê±®∏Ê∏°','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê‡∏ô','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê°'],
		monthNamesShort: ['‡∏°.‡∏Ñ.','‡∏Å.‡∏û.','±®∏Ê∏µ.‡∏Ñ.','‡πÄ‡∏°.‡∏¢.','‡∏û.‡∏Ñ.','±®∏Ê∏¥.‡∏¢.',
		'‡∏Å.‡∏Ñ.','‡∏™.‡∏Ñ.','‡∏Å.‡∏¢.','‡∏ï.‡∏Ñ.','‡∏û.‡∏¢.','‡∏ò.‡∏Ñ.'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Êå','±®∏Ê±®∏Ê±®∏Ê±®∏Êπå','±®∏Ê±®∏Ê±®∏Ê±®∏Ê∏£','±®∏Ê±®∏Êò','±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê‡πå','‡πÄ±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Ê∏≤.','‡∏à.','‡∏≠.','‡∏û.','±®∏Ê∏§.','‡∏®.','‡∏™.'],
		dayNamesMin: ['±®∏Ê∏≤.','‡∏à.','‡∏≠.','‡∏û.','±®∏Ê∏§.','‡∏®.','‡∏™.'],
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
		closeText: '±®∏Ê±®∏Ê–∞',
		prevText: '&#x3c;±®∏Ê±®∏Ê',
		nextText: '±®∏Ê—à&#x3e;',
		currentText: '±®∏Ê—Ä±®∏Ê',
		monthNames: ['±®∏Ê±®∏Ê—Ä','±®∏Ê–≤—Ä±®∏Ê','±®∏Ê—Ä—Ç','±®∏Ê—Ä±®∏Ê','±®∏Ê–π','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê–±—Ä','±®∏Ê±®∏Ê—Ä','±®∏Ê±®∏Ê–±—Ä'],
		monthNamesShort: ['±®∏Ê–≤','±®∏Ê–≤','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê–π','±®∏Ê–Ω',
		'±®∏Ê–ª','±®∏Ê–≥','±®∏Ê–Ω','±®∏Ê—Ç','±®∏Ê—è','±®∏Ê–∫'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê–µ','±®∏Ê±®∏Ê±®∏Ê–µ','±®∏Ê±®∏Ê±®∏Ê–µ','±®∏Ê—Ä±®∏Ê±®∏Ê–µ','±®∏Ê±®∏Ê±®∏Ê±®∏Ê–µ','±®∏Ê±®∏Ê–∞','±®∏Ê±®∏Ê–µ'],
		dayNamesShort: ['±®∏Ê—à','±®∏Ê—à','±®∏Ê—à','±®∏Ê—Ä','±®∏Ê–Ω','±®∏Ê–º','±®∏Ê–Ω'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê',
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
		currentText: 'bug√ºn',
		monthNames: ['Ocak','≈ûubat','Mart','Nisan','Mayƒ±s','Haziran',
		'Temmuz','Aƒüustos','Eyl√ºl','Ekim','Kasƒ±m','Aralƒ±k'],
		monthNamesShort: ['Oca','≈ûub','Mar','Nis','May','Haz',
		'Tem','Aƒüu','Eyl','Eki','Kas','Ara'],
		dayNames: ['Pazar','Pazartesi','Salƒ±','√áar≈üamba','Per≈üembe','Cuma','Cumartesi'],
		dayNamesShort: ['Pz','Pt','Sa','√áa','Pe','Cu','Ct'],
		dayNamesMin: ['Pz','Pt','Sa','√áa','Pe','Cu','Ct'],
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
		closeText: '±®∏Ê–∫—Ä±®∏Ê–∏',
		prevText: '&#x3C;',
		nextText: '&#x3E;',
		currentText: '±®∏Ê±®∏Ê±®∏Ê±®∏Ê',
		monthNames: ['±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê–π','±®∏Ê—Ä±®∏Ê±®∏Ê—å','±®∏Ê±®∏Ê±®∏Ê—å','–¢—Ä±®∏Ê±®∏Ê—å','±®∏Ê—Ä±®∏Ê±®∏Ê',
		'±®∏Ê±®∏Ê±®∏Ê','±®∏Ê—Ä±®∏Ê±®∏Ê','±®∏Ê—Ä±®∏Ê±®∏Ê—å','±®∏Ê±®∏Ê±®∏Ê—å','±®∏Ê±®∏Ê±®∏Ê±®∏Ê','–ì—Ä±®∏Ê±®∏Ê—å'],
		monthNamesShort: ['±®∏Ê—á','±®∏Ê—Ç','±®∏Ê—Ä','±®∏Ê—ñ','–¢—Ä–∞','±®∏Ê—Ä',
		'±®∏Ê–ø','±®∏Ê—Ä','±®∏Ê—Ä','±®∏Ê–≤','±®∏Ê—Å','–ì—Ä—É'],
		dayNames: ['±®∏Ê±®∏Ê±®∏Ê','±®∏Ê±®∏Ê±®∏Ê±®∏Ê–∫','±®∏Ê±®∏Ê–æ—Ä±®∏Ê','±®∏Ê—Ä±®∏Ê–∞','±®∏Ê±®∏Ê–µ—Ä','–ø‚Ä±®∏Ê±®∏Ê±®∏Êè','±®∏Ê±®∏Ê±®∏Ê'],
		dayNamesShort: ['±®∏Ê–¥','±®∏Ê–¥','±®∏Ê–≤','—Å—Ä–¥','±®∏Ê–≤','±®∏Ê–Ω','±®∏Ê—Ç'],
		dayNamesMin: ['±®∏Ê','±®∏Ê','±®∏Ê','–°—Ä','±®∏Ê','±®∏Ê','±®∏Ê'],
		weekHeader: '±®∏Ê–∂',
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
		closeText: '±®∏Êng',
		prevText: '&#x3C;Tr±®∏Êõc',
		nextText: 'Ti·∫øp&#x3E;',
		currentText: 'H√¥m nay',
		monthNames: ['Th√°ng M·ªôt', 'Th√°ng Hai', 'Th√°ng Ba', 'Th√°ng T∆∞', 'Th√°ng NƒÉm', 'Th√°ng S√°u',
		'Th√°ng B·∫£y', 'Th√°ng T√°m', 'Th√°ng Ch√≠n', 'Th√°ng M±®∏Êùi', 'Th√°ng M±®∏Êùi M·ªôt', 'Th√°ng M±®∏Êùi Hai'],
		monthNamesShort: ['Th√°ng 1', 'Th√°ng 2', 'Th√°ng 3', 'Th√°ng 4', 'Th√°ng 5', 'Th√°ng 6',
		'Th√°ng 7', 'Th√°ng 8', 'Th√°ng 9', 'Th√°ng 10', 'Th√°ng 11', 'Th√°ng 12'],
		dayNames: ['Ch·ªß Nh·∫≠t', 'Th·ª© Hai', 'Th·ª© Ba', 'Th·ª© T∆∞', 'Th·ª© NƒÉm', 'Th·ª© S√°u', 'Th·ª© B·∫£y'],
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
		closeText: '±®∏Êó≠',
		prevText: '&#x3C;±®∏Êúà',
		nextText: '±®∏Êúà&#x3E;',
		currentText: '±®∏Ê§©',
		monthNames: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		monthNamesShort: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		dayNames: ['±®∏Ê±®∏Ê•','±®∏Ê±®∏ÊÄ','±®∏Ê±®∏Êå','±®∏Ê±®∏Êâ','±®∏Ê±®∏Êõ','±®∏Ê±®∏Êî','±®∏Ê±®∏Ê≠'],
		dayNamesShort: ['±®∏Êó•','±®∏Ê∏Ä','±®∏Ê∫å','±®∏Ê∏â','±®∏Êõõ','±®∏Ê∫î','±®∏ÊÖ≠'],
		dayNamesMin: ['Êó•','‰∏Ä','‰∫å','‰∏â','Âõõ','‰∫î','ÂÖ≠'],
		weekHeader: 'Âë®',
		dateFormat: 'yy-mm-dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Âπ¥'};
	$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by SCCY (samuelcychan@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-HK'] = {
		closeText: '±®∏Êñâ',
		prevText: '&#x3C;±®∏Êúà',
		nextText: '±®∏Êúà&#x3E;',
		currentText: '±®∏Ê§©',
		monthNames: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		monthNamesShort: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		dayNames: ['±®∏Ê±®∏Ê•','±®∏Ê±®∏ÊÄ','±®∏Ê±®∏Êå','±®∏Ê±®∏Êâ','±®∏Ê±®∏Êõ','±®∏Ê±®∏Êî','±®∏Ê±®∏Ê≠'],
		dayNamesShort: ['±®∏Êó•','±®∏Ê∏Ä','±®∏Ê∫å','±®∏Ê∏â','±®∏Êõõ','±®∏Ê∫î','±®∏ÊÖ≠'],
		dayNamesMin: ['Êó•','‰∏Ä','‰∫å','‰∏â','Âõõ','‰∫î','ÂÖ≠'],
		weekHeader: 'Âë®',
		dateFormat: 'dd-mm-yy',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Âπ¥'};
	$.datepicker.setDefaults($.datepicker.regional['zh-HK']);
});

/* Chinese initialisation for the jQuery UI date picker plugin. */
/* Written by Ressol (ressol@gmail.com). */
jQuery(function($){
	$.datepicker.regional['zh-TW'] = {
		closeText: '±®∏Êñâ',
		prevText: '&#x3C;±®∏Êúà',
		nextText: '±®∏Êúà&#x3E;',
		currentText: '±®∏Ê§©',
		monthNames: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		monthNamesShort: ['‰∏ÄÊúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà',
		'±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Êúà','±®∏Ê∏ÄÊúà','±®∏Ê±®∏Êà'],
		dayNames: ['±®∏Ê±®∏Ê•','±®∏Ê±®∏ÊÄ','±®∏Ê±®∏Êå','±®∏Ê±®∏Êâ','±®∏Ê±®∏Êõ','±®∏Ê±®∏Êî','±®∏Ê±®∏Ê≠'],
		dayNamesShort: ['±®∏Êó•','±®∏Ê∏Ä','±®∏Ê∫å','±®∏Ê∏â','±®∏Êõõ','±®∏Ê∫î','±®∏ÊÖ≠'],
		dayNamesMin: ['Êó•','‰∏Ä','‰∫å','‰∏â','Âõõ','‰∫î','ÂÖ≠'],
		weekHeader: 'Âë®',
		dateFormat: 'yy/mm/dd',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: 'Âπ¥'};
	$.datepicker.setDefaults($.datepicker.regional['zh-TW']);
});
