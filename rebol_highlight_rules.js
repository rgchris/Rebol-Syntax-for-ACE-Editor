define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var RebolHighlightRules = function() {

	// regexp must not have capturing parentheses. Use (?:) instead.
	// regexps are ordered -> the first match is used
	this.$rules = {
		'foo' : [
			{
				token: 'string',
				merge : true,
				regex: /\^./
			},{
				token: 'string',
				regex: /`/,
				next: "start"
			},{
				token: 'string',
				regex: /[^\^\`]+/,
				merge : true
			}
		],

		"base16" : [
			{
				token: 'string.base16.rebol',
				regex : /\}/,
				next : "start"
			},{
				token : 'string.base16.rebol',
				regex : '[0-9a-fA-F]+',
				merge: true
			},{
				token : 'string.base16.rebol',
				regex: /[\s\n]+/,
				merge: true
			}
		],

		"start" : [
			{
				token : 'string.foo',
				regex : /`/,
				merge : true,
				next : 'foo'
			}, {
				token : 'string.base16.rebol',
				regex : /(?:16)?#\{/,
				next : "base16",
				merge: true
			}, {
				token : 'comment.line.rebol',
				regex : /;.*?(?=\%>|$)/
			}, {
				token : 'logic.rebol',
				regex : /#\[(?:true|false|none)\]/
			}, {
				token : 'email.rebol',
				regex : '[^\\s\\n:/\\[\\]\\(\\)]+@[^\\s\\n:/\\[\\]\\(\\)]+'
			}, {
				token : 'file.rebol',
				regex : '%[^\\s\\n\\[\\]\\(\\)]*'
			}, {
				token : 'issue.rebol',
				regex : /#[^\s\n\[\]\(\)\{\}]*/
			}, {
				// string-multiline
				token : 'string.multiline.rebol',
				regex : /\{/,
				next : "string-multiline",
				merge: true
			}, {
				token : 'string.rebol',
				regex : '"',
				next : "string-quoted",
				merge : true
			}, {
				token : 'url.rebol',
				regex : '[A-Za-z][\\w]{1,7}:(?:/{0,3}[^\\s\\n\\[\\]\\(?:\\)]+|//)'
			}, {
				// word-datatype
				token : 'native.datatype.rebol',
				regex : '\\b(?:end\\!|unset\\!|error\\!|datatype\\!|context\\!|native\\!|action\\!|routine\\!|op\\!|function\\!|object\\!|struct\\!|library\\!|port\\!|any-type\\!|any-word\\!|any-function\\!|number\\!|series\\!|any-string\\!|any-block\\!|symbol\\!|word\\!|set-word\\!|get-word\\!|lit-word\\!|refinement\\!|none\\!|logic\\!|integer\\!|decimal\\!|money\\!|time\\!|date\\!|char\\!|pair\\!|event\\!|tuple\\!|bitset\\!|string\\!|issue\\!|binary\\!|file\\!|email\\!|url\\!|image\\!|tag\\!|block\\!|paren\\!|path\\!|set-path\\!|lit-path\\!|hash\\!|list\\!)(?=$|\\W)'
			}, {
				// word-get
				token : 'word.get.rebol',
				regex : ':[A-Za-z=\\-\\?\\!\\_\\*\\+\\.][A-Za-z0-9=\\-\\!\\?\\_\\*\\+\\.]*(?:/(?:[A-Za-z=][A-Za-z0-9=\\-\\!\\?\\_\\*\\+\\.]*|\\d+)*)*'
			}, {
				// word-header
				token : 'native.header.rebol',
				regex : 'REBOL'
			}, {
				// word-lit
				token : 'word.lit.rebol',
				regex : "'[A-Za-z=\\-\\?\\!\\_\\*\\+\\.][A-Za-z0-9=\\-\\!\\?\\_\\*\\+\\.]*(?:/(?:[A-Za-z=][A-Za-z0-9=\\-\\!\\?\\_\\*\\+\\.]*|\\d+))*"
			}, {
				// word-refine
				token : 'word.refine.rebol',
				regex : '/[A-Za-z=][A-Za-z0-9=\\-\\!\\?\\_\\*\\.]*'
			}, {
				// word-set
				token : 'word.set.rebol',
				regex : '[A-Za-z=\\-\\?\\!\\_\\*\\+\\.][A-Za-z0-9=\\-\\!\\?\\_\\*\\+\\.]*(?:/(?:[A-Za-z=][A-Za-z0-9=\\-\\!\\?\\_\\*\\.\\+\\.]*|\\d+))*:'
			}, {
				// word
				token : 'word.rebol',
				regex : '[A-Za-z=][A-Za-z0-9=_\\-\\!\\?\\*\\+\\.]*(?:/(?:[A-Za-z=][A-Za-z0-9=_\\-\\!\\?\\*\\+\\.]*|\\d+))*(?=$|\\W)'
			}

		],

		"string-multiline" : [
			{
				token : "string",
				regex : /\^./,
				merge : true
			}, {
				token : "string",
				regex : /[^\}\^]+/,
				merge : true
			}, {
				token : "string",
				regex : /\}/,
				next  : "start"
			}
		],

		"string-quoted" : [
			{
				token : "string.rebol",
				regex : /[^\"\n\^]+/,
				merge : true
			}, {
				token : "string.escape.rebol",
				regex : /\^./,
				merge : true
			}, {
				token : "string.rebol",
				regex : /\"/,
				next  : "start",
			}, {
				token : 'fail',
				regex : /\n.*/,
				next : 'fail'
			}
		],

		'fail' : [
			{
				token : "fail",
				regex : /.*/
			}
		]
	};

};

oop.inherits(RebolHighlightRules, TextHighlightRules);

exports.RebolHighlightRules = RebolHighlightRules;
});
