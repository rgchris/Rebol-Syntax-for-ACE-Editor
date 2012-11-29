define(
	function(require, exports, module) {
		"use strict";

		var Lookup = function(terms) {
			this.terms = terms;
			this.lookup = function (term){
				return this.terms.indexOf(term.toLowerCase()) > -1;
			}
		}

		var oop = require("../lib/oop");
		var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
		var Words = {};
		var Base = {};

		Base.WordFirst = /[A-Za-z=\-\?\!\_\*\+\.]/.source;
		Base.WordNext = /[A-Za-z0-9=\-\!\?\_\*\+\.]/.source;
		Base.Word = Base.WordFirst + Base.WordNext + '*';
		Base.Path = Base.Word + '(?:\\/(?:' + Base.Word + '|\\d+))*';
		Base.Escape = /\^(?:.|\((?:(?:[0-9a-fA-F]{2}){1,3}|tab|esc)\))/

		var Counter = {};
		Counter.Nest = 0;

		var RebolHighlightRules = function() {

			// regexp must not have capturing parentheses. Use (?:) instead.
			// regexps are ordered -> the first match is used
			this.$rules = {
				"start" : [

					// comment
						// comment-shebang
						// comment-line
						// comment-multiline-string
						// comment-multiline-block

					{ // comment-shebang
						token: 'comment.shebang.rebol',
						regex: /^#!\/.*reb.*/
					},
					{ // comment-line
						token : 'comment.line.rebol',
						regex : /;.*?(?=\%>|$)/
					},
					{ // comment-multiline-string
						token: 'comment.multiline.rebol',
						regex: /comment\s+\{/,
						next: 'comment-multiline-string',
						merge: true
					},
					{ // comment-multiline-block
						token: 'comment.multiline.rebol',
						regex: /comment\s+\[/,
						next: 'comment-multiline-block',
						merge: true
					},

					// literal
						// literal-datatype
						// literal-none
						// literal-logic

					// NEED: literal-datatype
					{ // literal-none
						token: 'none.rebol',
						regex: /#\[none\]/
					},
					{ // literal-logic
						token: 'logic.rebol',
						regex: /#\[(?:true|false)\]/
					},

					// string
						// character
						// binary-base16
						// binary-base2
						// binary-base64
						// string-quoted
						// string-multiline
						// string-tag
						// string-file-quoted
						// string-file
						// string-url
						// string-email
						// string-issue

					{ // character
						token: 'character.rebol',
						regex: '#\\"(?:' + Base.Escape + '|[^\\^\\"])\\"'
					},
					{ // string-base16
						token: 'paren.lparen',
						regex: /(?:16)?#\{/,
						next: "binary-base16",
						merge: true
					},
					{ // string-base2
						token: 'paren.lparen',
						regex: /(?:2)?#\{/,
						next: "binary-base2",
						merge: true
					},
					{ // string-quoted
						token : 'string.quoted.rebol',
						regex : '"',
						next : "string-quoted",
						merge : true
					},
					{ // string-multiline
						token : 'string.multiline.rebol',
						regex : /\{/,
						next : "string-multiline",
						merge: true
					},
					// NEED: string-tag
					// NEED: string-file-quoted
					{ // string-file
						token : 'file.rebol',
						regex : '%[^\\s\\n\\[\\]\\(\\)]*'
					},
					{ // string-url
						token : 'url.rebol',
						regex : '[A-Za-z][\\w]{1,7}:(?:/{0,3}[^\\s\\n\\[\\]\\(?:\\)]+|//)'
					},
					{ // string-email
						token : 'email.rebol',
						regex : /[^\s\n:\/\[\]\(\)]+@[^\s\n:\/\[\]\(\)]*/
					},
					{ // string-issue
						token : 'issue.rebol',
						regex : /#[^\s\n\[\]\(\)\{\}]*/
					},

					// value
						// value-date
						// value-time
						// value-tuple
						// value-number
						// value-pair
						// value-money

					// word
						// word-set
						// word-get
						// word-refine
						// word

					{
						// word-get
						token : 'word.get.rebol',
						regex : ':' + Base.Path
					},
					{
						// word-lit
						token : 'word.lit.rebol',
						regex : "'" + Base.Path
					},
					{
						// word-refine
						token : function(value) {
							return value == '/local' ? 'native.rebol' : 'word.refine.rebol';
						},
						regex : Base.WordNext + '+'
					},
					{
						// word-set
						token : 'word.set.rebol',
						regex : Base.Path + ':'
					},
					{
						// word
						token : function(value) {
							return value == 'REBOL' ? 'native.header.rebol'
							: value == 'none' ? 'null.rebol'
							: Words.Datatypes.lookup(value) ? 'native.datatype.rebol'
							: Words.Logic.lookup(value) ? 'logic.rebol'
							: Words.Native.lookup(value) ? 'native.rebol'
							: Words.QM.lookup(value) ? 'words.rebol.qm'
							: 'word.rebol';
						},
						regex : Base.Path
					}
				],

				"comment-multiline-string" : [
					{
						token: 'comment.multiline.string.rebol',
						regex: /\}/,
						next: "start"
						// next: function() {
						//	Counter.Nest--;
						//	return (Counter.Nest === 0) ? 'start' : null;
						// }
					},
					// {
					//	token: 'comment.multiline.string.rebol',
					//	regex: /\{/,
					//	next: function() {
					//		Counter.Nest++;
					//		return null;
					//	}
					// },
					{
						token: 'comment.multiline.string.rebol',
						regex: Base.Escape,
						merge: true
					},
					{
						token: 'comment.multiline.string.rebol',
						regex: /[^\{\}\^]+/,
						merge: true
					}
					
				],

				"comment-multiline-block" : [
					{
						token: 'comment.multiline.block.rebol',
						regex: /\]/,
						next: 'start'
					}, {
						token: 'comment.multiline.block.rebol',
						regex: /[^\]\^]+/,
						merge: true
					}
					
				],

				"binary-base16" : [
					{
						token: 'string.base16.rebol',
						regex: /\}/,
						next: "start"
					}, {
						token: 'string.base16.rebol',
						regex: '[0-9a-fA-F]+',
						merge: true
					}
				],

				"binary-base2" : [
					{
						token: 'string.base2.rebol',
						regex: /\}/,
						next: "start"
					}, {
						token: 'string.base2.rebol',
						regex: '[01]+',
						merge: true
					}
				],

				"string-multiline" : [
					{
						token: "string.multiline.rebol",
						regex: Base.Escape,
						merge: true
					}, {
						token: "string.multiline.rebol",
						regex: /[^\}\^]+/,
						merge: true
					}, {
						token: "string",
						regex: /\}/,
						next: "start"
					}
				],

				"string-quoted" : [
					{
						token : "string.rebol",
						regex : /[^\"\^]+/,
						merge : true
					}, {
						token : "string.escape.rebol",
						regex : Base.Escape,
						merge : true
					}, {
						token : "string.rebol",
						regex : /\"/,
						next  : "start",
					}, {
						token : 'fail',
						regex : /$/,
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

		Words['Datatypes'] = new Lookup([
			"end!","unset!","error!","datatype!","context!","native!","action!","routine!","op!",
			"function!","object!","struct!","library!","port!","any-type!","any-word!","any-function!",
			"number!","series!","any-string!","any-block!","symbol!","word!","set-word!","get-word!",
			"lit-word!","refinement!","none!","logic!","integer!","decimal!","money!","time!","date!",
			"char!","pair!","event!","tuple!","bitset!","string!","issue!","binary!","file!","email!",
			"url!","image!","tag!","block!","paren!","path!","set-path!","lit-path!","hash!","list!"
		]);

		Words['Logic'] = new Lookup(['true','false','yes','no','on','off'])

		Words['Native'] = new Lookup([
			"about","abs","absolute","action?","add","alert","alias","all","alter","and","and~",
			"any","any-block?","any-function?","any-string?","any-type?","any-word?","append",
			"arccosine","arcsine","arctangent","array","ask","at","back","binary?","bind","bitset?",
			"block?","boot-prefs","break","browse","build-tag","call","caret-to-offset","case",
			"catch","center-face","change","change-dir","char?","charset","checksum","choose",
			"clean-path","clear","clear-fields","close","comment","complement","compose","compress",
			"confine","confirm","connected?","context","continue-post","copy","cosine","cp",
			"crypt-strength?","cvs-date","cvs-version","datatype?","date?","debase","decimal?",
			"decode-cgi","decode-url","decompress","deflag-face","dehex","delete","demo","desktop",
			"detab","dh-compute-key","dh-generate-key","dh-make-key","difference","dir?","dirize",
			"disarm","dispatch","divide","do","do-boot","do-events","do-face","do-face-alt","does",
			"dsa-generate-key","dsa-make-key","dsa-make-signature","dsa-verify-signature",
			"dump-face","dump-pane","echo","editor","either","else","email?","emailer","empty?",
			"enbase","entab","equal?","error?","even?","event?","exclude","exists-thru?","exists?",
			"exit","exp","extract","fifth","file?","find","find-key-face","find-window","first",
			"flag-face","flag-face?","flash","focus","for","forall","foreach","forever","form",
			"forskip","found?","fourth","free","func","function??","get","get-modes","get-net-info",
			"get-style","get-word?","greater-or-equal?","greater?","halt","has","hash?","head??",
			"help","hide","hide-popup","if","image?","import-email","in","in-window?","index?",
			"info?","inform","input","input?","insert","insert-event-func","inside?","integer?",
			"intersect","issue?","join","last","launch","launch-thru","layout","length?",
			"lesser-or-equal?","lesser?","library?","link-app?","link?","list-dir","list?",
			"lit-path?","lit-word?","load","load-image","load-prefs","load-thru","log-10","log-2",
			"log-e","logic?","loop","lowercase","make","make-dir","make-face","max","maximum",
			"maximum-of","min","minimum","minimum-of","modified?","mold","money?","multiply",
			"native?","negate","negative?","net-error","next","none?","not","not-equal?","now",
			"number?","object?","odd?","offset-to-caret","offset?","op?","open","open-events","or",
			"or~","outside?","pair?","paren?","parse","parse-email-addrs","parse-header",
			"parse-header-date","parse-xml","path-thru","path?","pick","poke","port?","positive?",
			"power","prin","print","probe","protect","protect-system","q","query","quit","random",
			"read","read-io","read-net","read-thru","reboot","recycle","reduce","refinement?",
			"reform","rejoin","remainder","remold","remove","remove-event-func","rename","repeat",
			"repend","replace","request","request-color","request-date","request-download",
			"request-file","request-list","request-pass","request-text","resend","return","reverse",
			"routine?","rsa-encrypt","rsa-generate-key","rsa-make-key","same?","save","save-prefs",
			"save-user","screen-offset?","script?","scroll-para","second","secure","select","send",
			"series?","set","set-font","set-modes","set-net","set-para","set-path?","set-style",
			"set-user","set-user-name","set-word?","show","show-popup","sine","size-text","size?",
			"skip","sort","source","span?","split-path","square-root","strict-equal?",
			"strict-not-equal?","string?","struct?","stylize","subtract","switch","tag?","tail??",
			"tangent","textinfo","third","throw","throw-on-error","time?","to","to-binary",
			"to-bitset","to-block","to-char","to-date","to-decimal","to-email","to-event","to-file",
			"to-get-word","to-hash","to-hex","to-idate","to-image","to-integer","to-issue",
			"to-list","to-lit-path","to-lit-word","to-local-file","to-logic","to-money","to-none",
			"to-pair","to-paren","to-path","to-rebol-file","to-refinement","to-set-path",
			"to-set-word","to-string","to-tag","to-time","to-tuple","to-url","to-word","trace",
			"trim","try","tuple?","type?","unfocus","uninstall","union","unique","unless",
			"unprotect","unset","unset?","until","unview","update","upgrade","uppercase","url?",
			"Usage","use","value?","vbug","view","view-install","view-prefs","view?","viewed?",
			"wait","what","what-dir","while","win-offset?","within?","word?","write","write-io",
			"write-user","xor","xor~","zero?","/local","thru","end",
		]); 

		Words["Op"] = new Lookup([
			"+","-","*","**","/","//","=",">",">=","<","<=","<>",
		]); 

		Words["QM"] = new Lookup([
			"qm","render","redirect-to","publish","response","action","route","event","import",
			"get-param","get-cookie","set-cookie","know"
		]); 

		oop.inherits(RebolHighlightRules, TextHighlightRules);

		exports.RebolHighlightRules = RebolHighlightRules;
	}
);
