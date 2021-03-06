/*
 * Globalize Culture ta-IN
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

Globalize.addCultureInfo( "ta-IN", "default", {
	name: "ta-IN",
	englishName: "Tamil (India)",
	nativeName: "报告报告报告喁� (报告报告报告报告报告�)",
	language: "ta",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "报告瘋"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["报告报告报告报告报告报告报告报告报告报告报告�","报告报告报告报告报告报告报告报告报告","报告报告报告报告报告报告报告报告报告喁�","报告报告报告报告报告报告报告瘓","报告报告报告报告报告报告报告报告报告","报告报告报告报告报告报告报告报告报告喁�","报告报告报告报告报告报告报告瘓"],
				namesAbbr: ["报告报告报告报告瘉","报告报告报告报告报告�","报告报告报告报告报告报告","报告报告报告喁�","报告报告报告报告报告�","报告报告报告报告","报告报告�"],
				namesShort: ["报告","报告","报告瘑","报告瘉","报告","报告瘑","喈�"]
			},
			months: {
				names: ["报告报告报告喈�","报告报告报告报告报告报告","报告报告报告报告瘝","报告报告报告报告瘝","报告瘒","报告报告报告","报告报告报告","报告报告报告报告瘝","报告报告报告报告报告报告报告瘝","报告报告报告报告报告报告","报告报告报告报告报告�","报告报告报告报告报告报告",""],
				namesAbbr: ["报告报告报告喈�","报告报告报告报告报告报告","报告报告报告报告瘝","报告报告报告报告瘝","报告瘒","报告报告报告","报告报告报告","报告报告报告报告瘝","报告报告报告报告报告报告报告瘝","报告报告报告报告报告报告","报告报告报告报告报告�","报告报告报告报告报告报告",""]
			},
			AM: ["报告报告报告","报告报告报告","报告报告报告"],
			PM: ["报告报告报告","报告报告报告","报告报告报告"],
			patterns: {
				d: "dd-MM-yyyy",
				D: "dd MMMM yyyy",
				t: "HH:mm",
				T: "HH:mm:ss",
				f: "dd MMMM yyyy HH:mm",
				F: "dd MMMM yyyy HH:mm:ss",
				M: "dd MMMM",
				Y: "MMMM yyyy"
			}
		}
	}
});

}( this ));
