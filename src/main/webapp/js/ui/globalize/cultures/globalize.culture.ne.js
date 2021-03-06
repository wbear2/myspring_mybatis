/*
 * Globalize Culture ne
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

Globalize.addCultureInfo( "ne", "default", {
	name: "ne",
	englishName: "Nepali",
	nativeName: "报告报告报告报告",
	language: "ne",
	numberFormat: {
		groupSizes: [3,2],
		"NaN": "nan",
		negativeInfinity: "-infinity",
		positiveInfinity: "infinity",
		percent: {
			pattern: ["-n%","n%"],
			groupSizes: [3,2]
		},
		currency: {
			pattern: ["-$n","$n"],
			symbol: "报告"
		}
	},
	calendars: {
		standard: {
			days: {
				names: ["报告报告报告报告ぐ","报告报告报告报告ぐ","报告报告报告报告报告报告","报告报告报告报告ぐ","报告报告灌报告报告�","报告报告报告报告报告报告","报告报告报告报告ぐ"],
				namesAbbr: ["报告报告�","报告报告�","报告报告报告啶�","报告报告�","报告报告灌","报告报告报告啶�","报告报告�"],
				namesShort: ["啶�","报告","啶�","报告","报告た","报告","啶�"]
			},
			months: {
				names: ["报告报告报告啷�","报告报告报告报告报告报告啷�","报告报告报告啶�","报告报告报告报告げ","报告","报告报告�","报告报告报告啶�","报告报告报告啶�","报告报告报告报告报告报告报告ぐ","报告报告报告报告报告�","报告报告报告报告报告报告","报告报告报告报告报告报告",""],
				namesAbbr: ["报告え","报告报告�","报告报告报告啶�","报告报告报告报告げ","报告","报告报告�","报告报告报告啶�","报告","报告报告报告啶�","报告报告报告","报告报告�","报告报告�",""]
			},
			AM: ["报告报告报告报告","报告报告报告报告","报告报告报告报告"],
			PM: ["报告报告报告报告","报告报告报告报告","报告报告报告报告"],
			eras: [{"name":"a.d.","start":null,"offset":0}],
			patterns: {
				Y: "MMMM,yyyy"
			}
		}
	}
});

}( this ));
