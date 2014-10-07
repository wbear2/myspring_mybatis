/*
 * Globalize Culture th-TH
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {

var Globalize;

if ( typeof require !== "undefined" &&
	typeof exports !== "undefined" &&
	typeof module !== "undefined" ) {
	// Assume CommonJS
	Globalize = require( "globalize" );
} else {
	// Global variable
	Globalize = window.Globalize;
}

Globalize.addCultureInfo( "th-TH", "default", {
	name: "th-TH",
	englishName: "Thai (Thailand)",
	nativeName: "���汨�� (���汨��)",
	language: "th",
	numberFormat: {
		currency: {
			pattern: ["-$n","$n"],
			symbol: "฿"
		}
	},
	calendars: {
		standard: {
			name: "ThaiBuddhist",
			firstDay: 1,
			days: {
				names: ["���汨�汨�汨�汨��","���汨�汨�汨�湌","���汨�汨�汨�渣","���汨��","���汨�汨�汨�汨�汨��","���汨�汨��์","เ���汨�汨��"],
				namesAbbr: ["���渲.","จ.","อ.","พ.","���渤.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["���汨�汨�汨�渡","���汨�汨�汨�汨�汨�汨�湌","���汨�汨�汨�渡","เ���汨�汨��น","���汨�汨�汨�汨��","���汨�汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�渡","���汨�汨�汨�汨�汨��น","���汨�汨�汨�汨��",""],
				namesAbbr: ["ม.ค.","ก.พ.","���渵.ค.","เม.ย.","พ.ค.","���渴.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			eras: [{"name":"พ.ศ.","start":null,"offset":-543}],
			twoDigitYearMax: 2572,
			patterns: {
				d: "d/M/yyyy",
				D: "d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "d MMMM yyyy H:mm",
				F: "d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		},
		Gregorian_Localized: {
			firstDay: 1,
			days: {
				names: ["���汨�汨�汨�汨��","���汨�汨�汨�湌","���汨�汨�汨�渣","���汨��","���汨�汨�汨�汨�汨��","���汨�汨��์","เ���汨�汨��"],
				namesAbbr: ["���渲.","จ.","อ.","พ.","���渤.","ศ.","ส."],
				namesShort: ["อ","จ","อ","พ","พ","ศ","ส"]
			},
			months: {
				names: ["���汨�汨�汨�渡","���汨�汨�汨�汨�汨�汨�湌","���汨�汨�汨�渡","เ���汨�汨��น","���汨�汨�汨�汨��","���汨�汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�汨��","���汨�汨�汨�渡","���汨�汨�汨�汨�汨��น","���汨�汨�汨�汨��",""],
				namesAbbr: ["ม.ค.","ก.พ.","���渵.ค.","เม.ย.","พ.ค.","���渴.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.",""]
			},
			patterns: {
				d: "d/M/yyyy",
				D: "'���汨��'dddd'���汨��' d MMMM yyyy",
				t: "H:mm",
				T: "H:mm:ss",
				f: "'���汨��'dddd'���汨��' d MMMM yyyy H:mm",
				F: "'���汨��'dddd'���汨��' d MMMM yyyy H:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

}( this ));
