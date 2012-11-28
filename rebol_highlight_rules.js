define(function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var RebolHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
        	/*binary-base-sixteen = {
				token : 'binary.base16.rebol',
				begin = '(16)?#\\{',
				end = '\\}',
				patterns = (
					{	token : 'binary.data.rebol',
						regex : '[0-9a-fA-F]*',
					},
				);
			}, {*/
			/*binary-base-sixtyfour = {
				token : 'binary.base64.rebol',
				begin = '64#\\{',
				end = '\\}',
			}, {*/
			/*binary-base-two = {
				token : 'binary.base2.rebol',
				begin = '2#\\{',
				end = '\\}',
				patterns = (
					{	token : 'binary.data.rebol',
						regex : '[01]*',
					},
				);
			}, {*/
			/*	// character
				token : 'character.rebol',
				regex : '#"(\\^(\\([0-9a-fA-F]{2}\\)|.)|[^\\^\\"])"'
			}, {*/
			/*character-html = {
				token : 'constant.character.entity.html',
				regex : '(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)',
				captures = {
					1 = { token : 'punctuation.definition.entity.html', };
					3 = { token : 'punctuation.definition.entity.html', };
				};
			}, {
    			// character-inline
				token : 'string.escaped.rebol',
				regex : '\\^(\\([0-9a-fA-F]{2}\\)|.)'
			}, {*/
				// comment-line
				token : 'comment.line.rebol',
				regex : ';.*?(?=\\%>|$)'
			}, {
			/*comment-multiline-block = {
				token : 'comment.multiline.rebol',
				begin = 'comment\\s*\\[',
				end = '\\]',
				patterns = ( { include = '#comment-multiline-block-nested', } );
			}, {*/
			/*comment-multiline-block-nested = {
				token : 'comment.multiline.rebol',
				begin = '\\[',
				end = '\\]',
				patterns = ( { include = '#comment-multiline-block-nested', } );
			}, {*/
			/*comment-multiline-string = {
				token : 'comment.multiline.rebol',
				begin = 'comment\\s*\\{',
				end = '\\}',
				patterns = ( { include = '#comment-multiline-string-nested', } );
			}, {*/
			/*comment-multiline-string-nested = {
				token : 'comment.multiline.rebol',
				begin = '\\{',
				end = '\\}',
				patterns = ( { include = '#comment-multiline-string-nested', } );
			}, {*/
			/*comments = {
				patterns = (
					{	include = '#comment-shebang', },
					{	include = '#comment-line', },
					{	include = '#comment-multiline-string', },
					{	include = '#comment-multiline-block', },
				);
			}, {*/
				/* // comments-shebang
                // WHAT is this?
				token : 'comment.shebang',
				regex : '^#!/.*rebol.*'
			}, {*/
			/*doublequotedString = {
				token : 'string.quoted.double.xml',
				begin = '"',
				end = '"',
			}, {*/
				// logic
                // NOT WORKING
				token : 'logic.rebol',
				regex : '#\\[(?:true|false|none)]'
			}, {
			/*rsp-tag = {
				token : 'source.rebol',
				begin = '<%={0,2} ',
				end = ' %>',
				patterns = ( { include = 'source.rebol', } );
			}, {*/
			/*singlequotedString = {
				token : 'string.quoted.single.xml',
				begin = "'";
				end = "'";
			}, {*/
				// string-email
				// NOTE: Technically this is a string, but categorizing it as one
				// makes the syntax coloring hard to sort out because the color for
				// issue and the color for string fight, and we want to override both
				/* token : 'string.email.rebol', */
				token : 'email.rebol',
				regex : '[^\\s\\n:/\\[\\]\\(\\)]+@[^\\s\\n:/\\[\\]\\(\\)]+'
			}, {
				// string-file
				// NOTE: Technically this is a string, but categorizing it as one
				// makes the syntax coloring hard to sort out because the color for
				// issue and the color for string fight, and we want to override both
				/* token : 'string.file.rebol', */
				token : 'file.rebol',
				regex : '%[^\\s\\n\\[\\]\\(\\)]*'
			}, {
			/*string-file-quoted = {
				token : 'string.file.rebol',
				begin = '%"',
				end = '"',
				patterns = (
					{	token : 'constant.character.hex.rebol',
						regex : '%[A-Fa-f0-9]{2}',
					},
				);
			}, {*/
				// string-issue
				// NOTE: Technically this is a string, but categorizing it as one
				// makes the syntax coloring hard to sort out because the color for
				// issue and the color for string fight, and we want to override both
				/* token : 'string.issue.rebol', */
				token : 'issue.rebol',
				regex : '#[^\\s\\n\\[\\]\\(\\)]*'
			}, {
				// string-multiline
				token : 'string.multiline.rebol',
				regex : '\\{',
				next : "string-multiline"

				/* begin = '\\{',
				end = '\\}',
				patterns = (
					{	include = '#rsp-tag', },
					{	include = '#character-inline', },
					{	include = '#character-html', },
					{	include = '#string-nested-multiline', },
				); */
			}, {
			/*string-nested-multiline = {
				token : 'string.multiline.rebol',
				begin = '\\{',
				end = '\\}',
				patterns = ( { include = '#string-nested-multiline', } );
			}, {*/
			    // string-quoted
				token : 'string.rebol',
                regex : '"',
                next : "string-quoted",
                merge : true
                /*
				begin = '"',
				end = '"',
				patterns = (
					{	include = '#rsp-tag', },
					{	include = '#character-inline', },
					{	include = '#character-html', },
				);*/
			}, {
			/*string-tag = {
				token : 'entity.tag.rebol',
				begin = '<(?:\\/|%\\=?\\ )?(?:([-_a-zA-Z0-9]+):)?([-_a-zA-Z0-9:]+)',
				end = '(?:\\s/|\\ %)?>',
				captures = {
					1 = { token : 'entity.other.namespace.xml', };
					2 = { token : 'entity.name.tag.xml', };
				};
				patterns = (
					{	regex : ' (?:([-_a-zA-Z0-9]+):)?([_a-zA-Z-]+)',
						captures = {
							1 = { token : 'entity.other.namespace.xml', };
							2 = { token : 'entity.other.attribute-name.xml', };
						};
					},
					{	include = '#doublequotedString', },
					{	include = '#singlequotedString', },
				);
			}, {*/
				// string-urld
				// NOTE: Technically this is a string, but categorizing it as one
				// makes the syntax coloring hard to sort out because the color for
				// issue and the color for string fight, and we want to override both
				token : 'url.rebol',
				/* token : 'string.url.rebol', */
				regex : '[A-Za-z][\\w]{1,7}:(?:/{0,3}[^\\s\\n\\[\\]\\(?:\\)]+|//)'
			}, {
			/*strings = {
				patterns = (
					{	include = '#character', },
					{	include = '#string-quoted', },
					{	include = '#string-multiline', },
					{	include = '#string-tag', },
					{	include = '#string-file-quoted', },
					{	include = '#string-file', },
					{	include = '#string-url', },
					{	include = '#string-email', },
					{	include = '#binary-base-two', },
					{	include = '#binary-base-sixty-four', },
					{	include = '#binary-base-sixteen', },
					{	include = '#string-issue', },
				);
			}, {*/
			/*strung-tag = {
				token : 'entity.tag.rebol',
				begin = '<',
				end = '>',
			}, {*/
			/*tagStuff = {
				patterns = (
					{	regex : ' (?:([-_a-zA-Z0-9]+):)?([_a-zA-Z-]+)',
						captures = {
							1 = { token : 'entity.other.namespace.xml', };
							2 = { token : 'entity.other.attribute-name.xml', };
						};
					},
					{	include = '#doublequotedString', },
					{	include = '#singlequotedString', },
				);
			}, {*/
			/*type-literal = {
				token : 'series.literal.rebol',
				begin = '#\\[(?:(\\w+!)|(true|false|none))',
				end = ']',
				captures = {
					1 = { token : 'native.datatype.rebol', };
					2 = { token : 'logic.rebol', };
				};
				patterns = ( { include = '$self', } );
			}, {*/
			/*value-date = {
				token : 'date.rebol',
				regex : '\\d{1,2}\\-([A-Za-z]{3}|January|Febuary|March|April|May|June|July|August|September|October|November|December)\\-\\d{4}(/\\d{1,2}[:]\\d{1,2}([:]\\d{1,2}(\\.\\d{1,5})?)?([+-]\\d{1,2}[:]\\d{1,2})?)?',
				captures = { 2 = { token : 'time.rebol', }; };
			}, {*/
				/* // value-money
				token : 'number.money.rebol',
				regex : '(?<!\\w)-?[a-zA-Z]*\\$[0-9]+(\\.[0-9]{2})?'
			}, {*/
				/* // value-number
				token : 'number.rebol',
				regex : '(?<!\\w|\\.)([-+]?((\\d+\\.?\\d*)|(\\.\\d+))((e|E)(\\+|-)?\\d+)?)(?=\\W)'
			}, {*/
				/* // value-pair
				token : 'pair.rebol',
				regex : '(?<!\\w)[-+]?[[:digit:]]+[x][[:digit:]]+'
			}, {*/
				/* // value-time
				token : 'time.rebol',
				regex : '([-+]?[:]\\d{1,2}([aApP][mM])?)|([-+]?[:]\\d{1,2}[.]\\d{0,9})|([-+]?\\d{1,2}[:]\\d{1,2}([aApP][mM])?)|([-+]?\\d{1,2}[:]\\d{1,2}[.]\\d{0,9})|([-+]?\\d{1,2}[:]\\d{1,2}[:]\\d{1,2}([.]\\d{0,9})?([aApP][mM])?)(?!\\w)'
			}, {*/
			/*	// value-tuple
				token : 'tuple.rebol',
				regex : '([[:digit:]]{0,3}[.][[:digit:]]{0,3}[.][[:digit:]]{0,3}([.][[:digit:]]{0,3}){0,7})'
			}, {*/
			/*values = {
				patterns = (
					{	include = '#value-date', },
					{	include = '#value-time', },
					{	include = '#value-tuple', },
					{	include = '#value-number', },
					{	include = '#value-pair', },
					{	include = '#value-money', },
				);
			}, {*/
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
			}  /*, {
				// word-logica
				token : 'logic.rebol',
				regex : '\\b(true|yes|false|off|no|none)(?!(\\w|-|\\.))(?=$|\\W)'
			}, {
				// word-native
				token : 'native.rebol',
				regex : '(?<!\\w|-|\\/|\\.)(about|abs|absolute|action\\?|add|alert|alias|all|alter|and|and~|any|any-block\\?|any-function\\?|any-string\\?|any-type\\?|any-word\\?|append|arccosine|arcsine|arctangent|array|ask|at|back|binary\\?|bind|bitset\\?|block\\?|boot-prefs|break|browse|build-tag|call|caret-to-offset|case|catch|center-face|change|change-dir|char\\?|charset|checksum|choose|clean-path|clear|clear-fields|close|comment|complement|compose|compress|confine|confirm|connected\\?|context|continue-post|copy|cosine|cp|crypt-strength\\?|cvs-date|cvs-version|datatype\\?|date\\?|debase|decimal\\?|decode-cgi|decode-url|decompress|deflag-face|dehex|delete|demo|desktop|detab|dh-compute-key|dh-generate-key|dh-make-key|difference|dir\\?|dirize|disarm|dispatch|divide|do|do-boot|do-events|do-face|do-face-alt|does|dsa-generate-key|dsa-make-key|dsa-make-signature|dsa-verify-signature|dump-face|dump-pane|echo|editor|either|else|email\\?|emailer|empty\\?|enbase|entab|equal\\?|error\\?|even\\?|event\\?|exclude|exists-thru\\?|exists\\?|exit|exp|extract|fifth|file\\?|find|find-key-face|find-window|first|flag-face|flag-face\\?|flash|focus|for|forall|foreach|forever|form|forskip|found\\?|fourth|free|func|function\\??|get|get-modes|get-net-info|get-style|get-word\\?|greater-or-equal\\?|greater\\?|halt|has|hash\\?|head\\??|help|hide|hide-popup|if|image\\?|import-email|in|in-window\\?|index\\?|info\\?|inform|input|input\\?|insert|insert-event-func|inside\\?|integer\\?|intersect|issue\\?|join|last|launch|launch-thru|layout|length\\?|lesser-or-equal\\?|lesser\\?|library\\?|link-app\\?|link\\?|list-dir|list\\?|lit-path\\?|lit-word\\?|load|load-image|load-prefs|load-thru|log-10|log-2|log-e|logic\\?|loop|lowercase|make|make-dir|make-face|max|maximum|maximum-of|min|minimum|minimum-of|modified\\?|mold|money\\?|multiply|native\\?|negate|negative\\?|net-error|next|none\\?|not|not-equal\\?|now|number\\?|object\\?|odd\\?|offset-to-caret|offset\\?|op\\?|open|open-events|or|or~|outside\\?|pair\\?|paren\\?|parse|parse-email-addrs|parse-header|parse-header-date|parse-xml|path-thru|path\\?|pick|poke|port\\?|positive\\?|power|prin|print|probe|protect|protect-system|q|query|quit|random|read|read-io|read-net|read-thru|reboot|recycle|reduce|refinement\\?|reform|rejoin|remainder|remold|remove|remove-event-func|rename|repeat|repend|replace|request|request-color|request-date|request-download|request-file|request-list|request-pass|request-text|resend|return|reverse|routine\\?|rsa-encrypt|rsa-generate-key|rsa-make-key|same\\?|save|save-prefs|save-user|screen-offset\\?|script\\?|scroll-para|second|secure|select|send|series\\?|set|set-font|set-modes|set-net|set-para|set-path\\?|set-style|set-user|set-user-name|set-word\\?|show|show-popup|sine|size-text|size\\?|skip|sort|source|span\\?|split-path|square-root|strict-equal\\?|strict-not-equal\\?|string\\?|struct\\?|stylize|subtract|switch|tag\\?|tail\\??|tangent|textinfo|third|throw|throw-on-error|time\\?|to|to-binary|to-bitset|to-block|to-char|to-date|to-decimal|to-email|to-event|to-file|to-get-word|to-hash|to-hex|to-idate|to-image|to-integer|to-issue|to-list|to-lit-path|to-lit-word|to-local-file|to-logic|to-money|to-none|to-pair|to-paren|to-path|to-rebol-file|to-refinement|to-set-path|to-set-word|to-string|to-tag|to-time|to-tuple|to-url|to-word|trace|trim|try|tuple\\?|type\\?|unfocus|uninstall|union|unique|unless|unprotect|unset|unset\\?|until|unview|update|upgrade|uppercase|url\\?|Usage|use|value\\?|vbug|view|view-install|view-prefs|view\\?|viewed\\?|wait|what|what-dir|while|win-offset\\?|within\\?|word\\?|write|write-io|write-user|xor|xor~|zero\\?|/local|thru|end)(?!(\\w|-|\\.))/?|(^|\\s)(\\+|-|\\*\\*?|//?|=|>=?|<(=|>)?(?![/%])|\\?)(?=$|\\W)'
			}, {
				// word-qm
				token : 'native.rebol.qm',
				regex : '\\b(qm|render|redirect-to|publish|response|action|event|import|get-param|get-cookie|set-cookie|know)(?!(\\w|-|\\.))(?=$|\\W)'
			}*/, {
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
				token : "constant.language.escape",
				regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[}\\\/bfnrt])/
			}, {
    			token : "string.multiline.rebol",
				regex : '[^}\\\\]+',
				merge : true
			}, {
    			token: "string.multiline.rebol",
    			regex: '\\}',
    			next : "start",
    			merge : true
            }, {
    			token : "string.multiline.rebol",
				regex : "",
				next  : "start",
				merge : true
			}
		],

        "string-quoted" : [
    		{
				token : "constant.language.escape",
				regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
			}, {
				token : "string.rebol",
				regex : '[^"\\\\]+',
				merge : true
			}, {
				token : "string.rebol",
				regex : '"',
				next  : "start",
				merge : true
			}, {
				token : "string.rebol",
				regex : "",
				next  : "start",
				merge : true
			}
        ]
	};

};

oop.inherits(RebolHighlightRules, TextHighlightRules);

exports.RebolHighlightRules = RebolHighlightRules;
});




/*
		"start" : [
			{
				token : "word.refine",
				regex : '/[A-Za-z=][A-Za-z0-9=\\-\\!\\?\\_\\*\\.]*'
			}, {
				token : "string", // single line
				regex : '"',
				next  : "string"
			}, {
				token : "constant.numeric", // hex
				regex : "0[xX][0-9a-fA-F]+\\b"
			}, {
				token : "constant.numeric", // float
				regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
			}, {
				token : "constant.language.boolean",
				regex : "(?:true|false)\\b"
			}, {
				token : "invalid.illegal", // single quoted strings are not allowed
				regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
			}, {
				token : "invalid.illegal", // comments are not allowed
				regex : "\\/\\/.*$"
			}, {
				token : "paren.lparen",
				regex : "[[({]"
			}, {
				token : "paren.rparen",
				regex : "[\\])}]"
			}, {
				token : "text",
				regex : "\\s+"
			}
		],
		"string" : [
			{
				token : "constant.language.escape",
				regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
			}, {
				token : "string",
				regex : '[^"\\\\]+',
				merge : true
			}, {
				token : "string",
				regex : '"',
				next  : "start",
				merge : true
			}, {
				token : "string",
				regex : "",
				next  : "start",
				merge : true
			}
		]
*/
