/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 270);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

    "use strict";


    // shim for using process in browser
    var process = module.exports = {};
    
    // cached from whatever global is present so that test runners that stub it
    // don't break things.  But we need to wrap it in a try catch in case it is
    // wrapped in strict mode code which doesn't define any globals.  It's inside a
    // function because try/catches deoptimize in certain engines.
    
    var cachedSetTimeout;
    var cachedClearTimeout;
    
    function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
    }
    function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
    }
    (function () {
        try {
            if (typeof setTimeout === 'function') {
                cachedSetTimeout = setTimeout;
            } else {
                cachedSetTimeout = defaultSetTimout;
            }
        } catch (e) {
            cachedSetTimeout = defaultSetTimout;
        }
        try {
            if (typeof clearTimeout === 'function') {
                cachedClearTimeout = clearTimeout;
            } else {
                cachedClearTimeout = defaultClearTimeout;
            }
        } catch (e) {
            cachedClearTimeout = defaultClearTimeout;
        }
    })();
    function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
            //normal enviroments in sane situations
            return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
            cachedSetTimeout = setTimeout;
            return setTimeout(fun, 0);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedSetTimeout(fun, 0);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                return cachedSetTimeout.call(null, fun, 0);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
                return cachedSetTimeout.call(this, fun, 0);
            }
        }
    }
    function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
            //normal enviroments in sane situations
            return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
            cachedClearTimeout = clearTimeout;
            return clearTimeout(marker);
        }
        try {
            // when when somebody has screwed with setTimeout but no I.E. maddness
            return cachedClearTimeout(marker);
        } catch (e) {
            try {
                // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                return cachedClearTimeout.call(null, marker);
            } catch (e) {
                // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
                // Some versions of I.E. have different rules for clearTimeout vs setTimeout
                return cachedClearTimeout.call(this, marker);
            }
        }
    }
    var queue = [];
    var draining = false;
    var currentQueue;
    var queueIndex = -1;
    
    function cleanUpNextTick() {
        if (!draining || !currentQueue) {
            return;
        }
        draining = false;
        if (currentQueue.length) {
            queue = currentQueue.concat(queue);
        } else {
            queueIndex = -1;
        }
        if (queue.length) {
            drainQueue();
        }
    }
    
    function drainQueue() {
        if (draining) {
            return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
    
        var len = queue.length;
        while (len) {
            currentQueue = queue;
            queue = [];
            while (++queueIndex < len) {
                if (currentQueue) {
                    currentQueue[queueIndex].run();
                }
            }
            queueIndex = -1;
            len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
    }
    
    process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
            for (var i = 1; i < arguments.length; i++) {
                args[i - 1] = arguments[i];
            }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
            runTimeout(drainQueue);
        }
    };
    
    // v8 likes predictible objects
    function Item(fun, array) {
        this.fun = fun;
        this.array = array;
    }
    Item.prototype.run = function () {
        this.fun.apply(null, this.array);
    };
    process.title = 'browser';
    process.browser = true;
    process.env = {};
    process.argv = [];
    process.version = ''; // empty string to avoid regexp issues
    process.versions = {};
    
    function noop() {}
    
    process.on = noop;
    process.addListener = noop;
    process.once = noop;
    process.off = noop;
    process.removeListener = noop;
    process.removeAllListeners = noop;
    process.emit = noop;
    process.prependListener = noop;
    process.prependOnceListener = noop;
    
    process.listeners = function (name) {
        return [];
    };
    
    process.binding = function (name) {
        throw new Error('process.binding is not supported');
    };
    
    process.cwd = function () {
        return '/';
    };
    process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
    };
    process.umask = function () {
        return 0;
    };
    
    /***/ }),
    /* 2 */,
    /* 3 */,
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;
    
    module.exports = isArray;
    
    /***/ }),
    /* 5 */,
    /* 6 */,
    /* 7 */,
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    var freeGlobal = __webpack_require__(217);
    
    /** Detect free variable `self`. */
    var freeSelf = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self && self.Object === Object && self;
    
    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();
    
    module.exports = root;
    
    /***/ }),
    /* 9 */,
    /* 10 */,
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function TempCtor() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    
    /***/ }),
    /* 12 */,
    /* 13 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject(value) {
      var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
      return value != null && (type == 'object' || type == 'function');
    }
    
    module.exports = isObject;
    
    /***/ }),
    /* 14 */,
    /* 15 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    
    
    var NS = exports.NAMESPACES = {
        HTML: 'http://www.w3.org/1999/xhtml',
        MATHML: 'http://www.w3.org/1998/Math/MathML',
        SVG: 'http://www.w3.org/2000/svg',
        XLINK: 'http://www.w3.org/1999/xlink',
        XML: 'http://www.w3.org/XML/1998/namespace',
        XMLNS: 'http://www.w3.org/2000/xmlns/'
    };
    
    exports.ATTRS = {
        TYPE: 'type',
        ACTION: 'action',
        ENCODING: 'encoding',
        PROMPT: 'prompt',
        NAME: 'name',
        COLOR: 'color',
        FACE: 'face',
        SIZE: 'size'
    };
    
    exports.DOCUMENT_MODE = {
        NO_QUIRKS: 'no-quirks',
        QUIRKS: 'quirks',
        LIMITED_QUIRKS: 'limited-quirks'
    };
    
    var $ = exports.TAG_NAMES = {
        A: 'a',
        ADDRESS: 'address',
        ANNOTATION_XML: 'annotation-xml',
        APPLET: 'applet',
        AREA: 'area',
        ARTICLE: 'article',
        ASIDE: 'aside',
    
        B: 'b',
        BASE: 'base',
        BASEFONT: 'basefont',
        BGSOUND: 'bgsound',
        BIG: 'big',
        BLOCKQUOTE: 'blockquote',
        BODY: 'body',
        BR: 'br',
        BUTTON: 'button',
    
        CAPTION: 'caption',
        CENTER: 'center',
        CODE: 'code',
        COL: 'col',
        COLGROUP: 'colgroup',
    
        DD: 'dd',
        DESC: 'desc',
        DETAILS: 'details',
        DIALOG: 'dialog',
        DIR: 'dir',
        DIV: 'div',
        DL: 'dl',
        DT: 'dt',
    
        EM: 'em',
        EMBED: 'embed',
    
        FIELDSET: 'fieldset',
        FIGCAPTION: 'figcaption',
        FIGURE: 'figure',
        FONT: 'font',
        FOOTER: 'footer',
        FOREIGN_OBJECT: 'foreignObject',
        FORM: 'form',
        FRAME: 'frame',
        FRAMESET: 'frameset',
    
        H1: 'h1',
        H2: 'h2',
        H3: 'h3',
        H4: 'h4',
        H5: 'h5',
        H6: 'h6',
        HEAD: 'head',
        HEADER: 'header',
        HGROUP: 'hgroup',
        HR: 'hr',
        HTML: 'html',
    
        I: 'i',
        IMG: 'img',
        IMAGE: 'image',
        INPUT: 'input',
        IFRAME: 'iframe',
    
        KEYGEN: 'keygen',
    
        LABEL: 'label',
        LI: 'li',
        LINK: 'link',
        LISTING: 'listing',
    
        MAIN: 'main',
        MALIGNMARK: 'malignmark',
        MARQUEE: 'marquee',
        MATH: 'math',
        MENU: 'menu',
        MENUITEM: 'menuitem',
        META: 'meta',
        MGLYPH: 'mglyph',
        MI: 'mi',
        MO: 'mo',
        MN: 'mn',
        MS: 'ms',
        MTEXT: 'mtext',
    
        NAV: 'nav',
        NOBR: 'nobr',
        NOFRAMES: 'noframes',
        NOEMBED: 'noembed',
        NOSCRIPT: 'noscript',
    
        OBJECT: 'object',
        OL: 'ol',
        OPTGROUP: 'optgroup',
        OPTION: 'option',
    
        P: 'p',
        PARAM: 'param',
        PLAINTEXT: 'plaintext',
        PRE: 'pre',
    
        RB: 'rb',
        RP: 'rp',
        RT: 'rt',
        RTC: 'rtc',
        RUBY: 'ruby',
    
        S: 's',
        SCRIPT: 'script',
        SECTION: 'section',
        SELECT: 'select',
        SOURCE: 'source',
        SMALL: 'small',
        SPAN: 'span',
        STRIKE: 'strike',
        STRONG: 'strong',
        STYLE: 'style',
        SUB: 'sub',
        SUMMARY: 'summary',
        SUP: 'sup',
    
        TABLE: 'table',
        TBODY: 'tbody',
        TEMPLATE: 'template',
        TEXTAREA: 'textarea',
        TFOOT: 'tfoot',
        TD: 'td',
        TH: 'th',
        THEAD: 'thead',
        TITLE: 'title',
        TR: 'tr',
        TRACK: 'track',
        TT: 'tt',
    
        U: 'u',
        UL: 'ul',
    
        SVG: 'svg',
    
        VAR: 'var',
    
        WBR: 'wbr',
    
        XMP: 'xmp'
    };
    
    var SPECIAL_ELEMENTS = exports.SPECIAL_ELEMENTS = Object.create(null);
    
    SPECIAL_ELEMENTS[NS.HTML] = Object.create(null);
    SPECIAL_ELEMENTS[NS.HTML][$.ADDRESS] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.APPLET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.AREA] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.ARTICLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.ASIDE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BASE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BASEFONT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BGSOUND] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BLOCKQUOTE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BODY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.BUTTON] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.CAPTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.CENTER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.COL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.COLGROUP] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DETAILS] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DIR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DIV] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.DT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.EMBED] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIELDSET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIGCAPTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FIGURE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FOOTER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FORM] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FRAME] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.FRAMESET] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H1] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H2] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H3] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H4] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H5] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.H6] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HEAD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HEADER] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HGROUP] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.HTML] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.IFRAME] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.IMG] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.INPUT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LI] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LINK] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.LISTING] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MAIN] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MARQUEE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.MENU] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.META] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NAV] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOEMBED] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOFRAMES] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.NOSCRIPT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.OBJECT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.OL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.P] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PARAM] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PLAINTEXT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.PRE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SCRIPT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SECTION] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SELECT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SOURCE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.STYLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.SUMMARY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TABLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TBODY] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TEMPLATE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TEXTAREA] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TFOOT] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TH] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.THEAD] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TITLE] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.TRACK] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.UL] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.WBR] = true;
    SPECIAL_ELEMENTS[NS.HTML][$.XMP] = true;
    
    SPECIAL_ELEMENTS[NS.MATHML] = Object.create(null);
    SPECIAL_ELEMENTS[NS.MATHML][$.MI] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MO] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MN] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MS] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.MTEXT] = true;
    SPECIAL_ELEMENTS[NS.MATHML][$.ANNOTATION_XML] = true;
    
    SPECIAL_ELEMENTS[NS.SVG] = Object.create(null);
    SPECIAL_ELEMENTS[NS.SVG][$.TITLE] = true;
    SPECIAL_ELEMENTS[NS.SVG][$.FOREIGN_OBJECT] = true;
    SPECIAL_ELEMENTS[NS.SVG][$.DESC] = true;
    
    /***/ }),
    /* 16 */
    /***/ (function(module, exports, __webpack_require__) {
    
    "use strict";
    /* WEBPACK VAR INJECTION */(function(process) {
    
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
    
    // Copyright Joyent, Inc. and other Node contributors.
    //
    // Permission is hereby granted, free of charge, to any person obtaining a
    // copy of this software and associated documentation files (the
    // "Software"), to deal in the Software without restriction, including
    // without limitation the rights to use, copy, modify, merge, publish,
    // distribute, sublicense, and/or sell copies of the Software, and to permit
    // persons to whom the Software is furnished to do so, subject to the
    // following conditions:
    //
    // The above copyright notice and this permission notice shall be included
    // in all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
    // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
    // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
    // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
    // USE OR OTHER DEALINGS IN THE SOFTWARE.
    
    var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
      var keys = Object.keys(obj);
      var descriptors = {};
      for (var i = 0; i < keys.length; i++) {
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
      }
      return descriptors;
    };
    
    var formatRegExp = /%[sdj%]/g;
    exports.format = function (f) {
      if (!isString(f)) {
        var objects = [];
        for (var i = 0; i < arguments.length; i++) {
          objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
      }
    
      var i = 1;
      var args = arguments;
      var len = args.length;
      var str = String(f).replace(formatRegExp, function (x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch (x) {
          case '%s':
            return String(args[i++]);
          case '%d':
            return Number(args[i++]);
          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }
          default:
            return x;
        }
      });
      for (var x = args[i]; i < len; x = args[++i]) {
        if (isNull(x) || !isObject(x)) {
          str += ' ' + x;
        } else {
          str += ' ' + inspect(x);
        }
      }
      return str;
    };