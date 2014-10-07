/*
 * Globalize Culture pa-IN
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

Globalize.addCultureInfo( "pa-IN", "default", {
	name: "pa-IN",
	englishName: "Punjabi (India)",
	nativeName: "报告报告报告报告﹢ (报告报告报告)",
	language: "pa",
	numberFormat: {
		groupSizes: [3,2],
		percent: {
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["$ -n","$ n"],
			groupSizes: [3,2],
			symbol: "报告﹣"
		}
	},
	calendars: {
		standard: {
			"/": "-",
			firstDay: 1,
			days: {
				names: ["报告报告报告啜�","报告报告报告报告ò","报告报告报告报告报告�","报告报告报告报告报告�","报告﹢报告报告报告","报告报告报告报告报告报告","报告报告报告报告报告报告啜�"],
				namesAbbr: ["报告à.","报告报告�.","报告报告报告.","报告报告报告.","报告﹢啜�.","报告报告报告.","报告报告报告报告ò."],
				namesShort: ["啜�","啜�","啜�","啜�","啜�","啜�","啜�"]
			},
			months: {
				names: ["报告报告报告喋�","报告报告报告喋�","报告报告报告","报告报告报告报告ú","报告▓","报告报告�","报告报告报告啜�","报告报告报告","报告报告报告啜�","报告报告报告报告ò","报告报告报告啜�","报告报告报告啜�",""],
				namesAbbr: ["报告报告报告喋�","报告报告报告喋�","报告报告报告","报告报告报告报告ú","报告▓","报告报告�","报告报告报告啜�","报告报告报告","报告报告报告啜�","报告报告报告报告ò","报告报告报告啜�","报告报告报告啜�",""]
			},
			AM: ["报告报告报告","报告报告报告","报告报告报告"],
			PM: ["报告报告�","报告报告�","报告报告�"],
			patterns: {
				d: "dd-MM-yy",
				D: "dd MMMM yyyy dddd",
				t: "tt hh:mm",
				T: "tt hh:mm:ss",
				f: "dd MMMM yyyy dddd tt hh:mm",
				F: "dd MMMM yyyy dddd tt hh:mm:ss",
				M: "dd MMMM"
			}
		}
	}
});

}( this ));
