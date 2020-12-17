// ==UserScript==
// @name         WELearn网课助手
// @namespace    https://github.com/SSmJaE/WELearnHelper
// @description  显示WE Learn随行课堂题目答案；支持班级测试；自动答题；刷时长；开放自定义设置
// @version      0.8.5
// @author       SSmJaE
// @license      GPL-3.0
// @compatible   Chrome
// @match        https://course.sflep.com/*
// @match        https://welearn.sflep.com/*
// @match        https://courseappserver.sflep.com/*
// @match        https://centercourseware.sflep.com/*
// @run-at       document-end
// @connect      localhost
// @connect      47.97.90.127
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".WELearnHelper0.8.5.user.js"
/******/ 	}
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Global; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEBUG_MODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return QUERY_INTERVAL; });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
var _package_json__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(24, 1);
var Global = {
  messages: [],
  USER_SETTINGS: {},
  collapse: true,
  showExamQueryButton: false,
  showExamUploadButton: false
}; // *--------------------以下为常量

var BASE_URL;
var DEBUG_MODE;

if (false) {} else {
  // BASE_URL = "http://localhost:8000/api/welearn";
  BASE_URL = "http://47.97.90.127/api/welearn";
  DEBUG_MODE = false;
}


var VERSION = _package_json__WEBPACK_IMPORTED_MODULE_0__[/* version */ "a"];
var QUERY_INTERVAL = 3000; //单位ms

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(28);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return sleep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return makeDraggable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return requestErrorHandler; });
/* unused harmony export appendToSideBar */
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);


function sleep(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function addMessage(_x) {
  return _addMessage.apply(this, arguments);
}
/**实现拖动*/

function _addMessage() {
  _addMessage = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(info) {
    var type,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _args.length > 1 && _args[1] !== undefined ? _args[1] : "normal";

            if (!(type !== "hr")) {
              _context.next = 4;
              break;
            }

            if (!(info === null || info === "")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            _global__WEBPACK_IMPORTED_MODULE_2__[/* Global */ "c"].messages.push({
              info: String(info),
              type: type
            });

            if (!_global__WEBPACK_IMPORTED_MODULE_2__[/* Global */ "c"].USER_SETTINGS.autoSlide) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return sleep(10);

          case 8:
            //等待message渲染完成，不然不会拉到最底
            document.querySelector("#container-messages").scrollBy(0, 1000);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addMessage.apply(this, arguments);
}

function makeDraggable(handle, container) {
  function getProperty(ele, prop) {
    return parseInt(window.getComputedStyle(ele)[prop]);
  }

  var draggable = false,
      pastX,
      pastY,
      containerWidth,
      containerHeight,
      containerLeft = getProperty(container, "left"),
      containerTop = getProperty(container, "top"),
      windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;
  handle.addEventListener("mousedown", function (e) {
    handle.style.cursor = "grabbing";
    draggable = true;
    pastX = e.clientX;
    pastY = e.clientY;
    containerWidth = getProperty(container, "width");
    containerHeight = getProperty(container, "height");
  }, false);
  document.addEventListener("mousemove", function (e) {
    if (draggable === true) {
      var currentX = e.clientX,
          currentY = e.clientY,
          diffX = currentX - pastX,
          diffY = currentY - pastY;
      var targetX = containerLeft + diffX;
      var targetY = containerTop + diffY;
      if (targetX <= 0) targetX = 0;
      if (targetY <= 0) targetY = 0;
      if (targetX >= windowWidth - containerWidth) targetX = windowWidth - containerWidth;
      if (targetY >= windowHeight - containerHeight) targetY = windowHeight - containerHeight;
      container.style.left = targetX + "px";
      container.style.top = targetY + "px";
    }
  });
  handle.addEventListener("mouseup", function () {
    handle.style.cursor = "grab";
    draggable = false;
    containerLeft = getProperty(container, "left");
    containerTop = getProperty(container, "top");
  }, false); //防止意外未退出拖动状态

  document.body.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // console.log(e);
      handle.style.cursor = "grab";
      draggable = false;
      containerLeft = getProperty(container, "left");
      containerTop = getProperty(container, "top");
    }
  }, false);
}
/** 通过装饰器，实现请求失败时，输出定制化的提示信息 */

function requestErrorHandler() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "请求异常，稍后再试";
  return function (target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = originalMethod.apply(this, args);
      result["catch"](function (error) {
        addMessage("".concat(message), "error"); // addMessage(`${error}`, "error");
      });
      return result;
    };

    return descriptor;
  };
}
/**
 * 注册按钮至侧边栏，class应为iconfont class
 */

function appendToSideBar(id, className, name) {
  try {
    if (!document.querySelector("sidebar-button-style")) {
      var buttonStyle = document.createElement("style");
      buttonStyle.id = "sidebar-button-style";
      buttonStyle.setAttribute("type", "text/css");
      buttonStyle.innerHTML = "\n            .courseware_sidebar_2 .sidebar-button {\n                color: white;\n                z-index: 100;\n                font-size: 23px;\n                cursor: pointer;\n                position: relative;\n                left: 15px;\n                top: 5px;\n                text-align: center; \n            }\n\n            .courseware_sidebar_2 .sidebar-button:hover {\n                color: rgb(0,230,227);\n                background: #3b3b3b 100px 100px;\n            }\n            \n            .courseware_sidebar_2 .sidebar-button a { \n                color: #494949; \n                font-size: 14px; \n                line-height: 20px;\n                position: relative;\n                left: -15px;\n            }\n\n            .courseware_sidebar_2 .sidebar-button:hover a {\n                color: #ccc;\n            }\n            ";
      document.body.append(buttonStyle);
    }

    var button = document.createElement("span");
    button.id = "".concat(id);
    button.className = "sidebar-button ".concat(className);
    button.innerHTML = "<a>".concat(name, "</a>");
    document.querySelector(".courseware_sidebar_2 ul.c_s_2 li").appendChild(button);
    return button; //可以跨域添加元素，但是无法跨域操作元素
    // (top.frames[0].document.querySelector(
    //     "container-setting-button",
    // ) as HTMLElement).style.display = "none";
    //todo 还是说，必须要分成两步？不然解释不了为什么上方可以修改style
  } catch (error) {
    console.log(error);
  }
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _asyncToGenerator; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return request; });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _src_global__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);



function generateFinalUrl(url) {
  return url.startsWith("/") ? _src_global__WEBPACK_IMPORTED_MODULE_1__[/* BASE_URL */ "a"] + url : url;
}

function request(url) {
  var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    method: "GET",
    headers: {},
    body: ""
  };
  var body = Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(init.body) === "object" ? JSON.stringify(init.body) : init.body;
  return new Promise(function (resolve, reject) {
    GM_xmlhttpRequest({
      url: generateFinalUrl(url),
      method: init.method,
      headers: init.headers,
      data: body,
      timeout: 5000,
      responseType: "json",
      onload: function onload(response) {
        var code = response.status;
        if (code >= 200 && code <= 300) resolve(response);else reject(response);
      },
      onabort: function onabort(response) {
        return reject(response);
      },
      onerror: function onerror(response) {
        return reject(response);
      },
      ontimeout: function ontimeout(response) {
        return reject(response);
      }
    });
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*!
* sweetalert2 v10.0.2
* Released under the MIT License.
*/
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  var consolePrefix = 'SweetAlert2:';
  /**
   * Filter the unique values into a new array
   * @param arr
   */

  var uniqueArray = function uniqueArray(arr) {
    var result = [];

    for (var i = 0; i < arr.length; i++) {
      if (result.indexOf(arr[i]) === -1) {
        result.push(arr[i]);
      }
    }

    return result;
  };
  /**
   * Capitalize the first letter of a string
   * @param str
   */

  var capitalizeFirstLetter = function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  /**
   * Returns the array of object values (Object.values isn't supported in IE11)
   * @param obj
   */

  var objectValues = function objectValues(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  };
  /**
   * Convert NodeList to Array
   * @param nodeList
   */

  var toArray = function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  };
  /**
   * Standardise console warnings
   * @param message
   */

  var warn = function warn(message) {
    console.warn("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Standardise console errors
   * @param message
   */

  var error = function error(message) {
    console.error("".concat(consolePrefix, " ").concat(message));
  };
  /**
   * Private global state for `warnOnce`
   * @type {Array}
   * @private
   */

  var previousWarnOnceMessages = [];
  /**
   * Show a console warning, but only if it hasn't already been shown
   * @param message
   */

  var warnOnce = function warnOnce(message) {
    if (!(previousWarnOnceMessages.indexOf(message) !== -1)) {
      previousWarnOnceMessages.push(message);
      warn(message);
    }
  };
  /**
   * Show a one-time console warning about deprecated params/methods
   */

  var warnAboutDepreation = function warnAboutDepreation(deprecatedParam, useInstead) {
    warnOnce("\"".concat(deprecatedParam, "\" is deprecated and will be removed in the next major release. Please use \"").concat(useInstead, "\" instead."));
  };
  /**
   * If `arg` is a function, call it (with no arguments or context) and return the result.
   * Otherwise, just pass the value through
   * @param arg
   */

  var callIfFunction = function callIfFunction(arg) {
    return typeof arg === 'function' ? arg() : arg;
  };
  var hasToPromiseFn = function hasToPromiseFn(arg) {
    return arg && typeof arg.toPromise === 'function';
  };
  var asPromise = function asPromise(arg) {
    return hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg);
  };
  var isPromise = function isPromise(arg) {
    return arg && Promise.resolve(arg) === arg;
  };

  var DismissReason = Object.freeze({
    cancel: 'cancel',
    backdrop: 'backdrop',
    close: 'close',
    esc: 'esc',
    timer: 'timer'
  });

  var isJqueryElement = function isJqueryElement(elem) {
    return _typeof(elem) === 'object' && elem.jquery;
  };

  var isElement = function isElement(elem) {
    return elem instanceof Element || isJqueryElement(elem);
  };

  var argsToParams = function argsToParams(args) {
    var params = {};

    if (_typeof(args[0]) === 'object' && !isElement(args[0])) {
      _extends(params, args[0]);
    } else {
      ['title', 'html', 'icon'].forEach(function (name, index) {
        var arg = args[index];

        if (typeof arg === 'string' || isElement(arg)) {
          params[name] = arg;
        } else if (arg !== undefined) {
          error("Unexpected type of ".concat(name, "! Expected \"string\" or \"Element\", got ").concat(_typeof(arg)));
        }
      });
    }

    return params;
  };

  var swalPrefix = 'swal2-';
  var prefix = function prefix(items) {
    var result = {};

    for (var i in items) {
      result[items[i]] = swalPrefix + items[i];
    }

    return result;
  };
  var swalClasses = prefix(['container', 'shown', 'height-auto', 'iosfix', 'popup', 'modal', 'no-backdrop', 'no-transition', 'toast', 'toast-shown', 'toast-column', 'show', 'hide', 'close', 'title', 'header', 'content', 'html-container', 'actions', 'confirm', 'deny', 'cancel', 'footer', 'icon', 'icon-content', 'image', 'input', 'file', 'range', 'select', 'radio', 'checkbox', 'label', 'textarea', 'inputerror', 'validation-message', 'progress-steps', 'active-progress-step', 'progress-step', 'progress-step-line', 'loader', 'loading', 'styled', 'top', 'top-start', 'top-end', 'top-left', 'top-right', 'center', 'center-start', 'center-end', 'center-left', 'center-right', 'bottom', 'bottom-start', 'bottom-end', 'bottom-left', 'bottom-right', 'grow-row', 'grow-column', 'grow-fullscreen', 'rtl', 'timer-progress-bar', 'timer-progress-bar-container', 'scrollbar-measure', 'icon-success', 'icon-warning', 'icon-info', 'icon-question', 'icon-error']);
  var iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

  var getContainer = function getContainer() {
    return document.body.querySelector(".".concat(swalClasses.container));
  };
  var elementBySelector = function elementBySelector(selectorString) {
    var container = getContainer();
    return container ? container.querySelector(selectorString) : null;
  };

  var elementByClass = function elementByClass(className) {
    return elementBySelector(".".concat(className));
  };

  var getPopup = function getPopup() {
    return elementByClass(swalClasses.popup);
  };
  var getIcons = function getIcons() {
    var popup = getPopup();
    return toArray(popup.querySelectorAll(".".concat(swalClasses.icon)));
  };
  var getIcon = function getIcon() {
    var visibleIcon = getIcons().filter(function (icon) {
      return isVisible(icon);
    });
    return visibleIcon.length ? visibleIcon[0] : null;
  };
  var getTitle = function getTitle() {
    return elementByClass(swalClasses.title);
  };
  var getContent = function getContent() {
    return elementByClass(swalClasses.content);
  };
  var getHtmlContainer = function getHtmlContainer() {
    return elementByClass(swalClasses['html-container']);
  };
  var getImage = function getImage() {
    return elementByClass(swalClasses.image);
  };
  var getProgressSteps = function getProgressSteps() {
    return elementByClass(swalClasses['progress-steps']);
  };
  var getValidationMessage = function getValidationMessage() {
    return elementByClass(swalClasses['validation-message']);
  };
  var getConfirmButton = function getConfirmButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.confirm));
  };
  var getDenyButton = function getDenyButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.deny));
  };
  var getLoader = function getLoader() {
    return elementBySelector(".".concat(swalClasses.loader));
  };
  var getCancelButton = function getCancelButton() {
    return elementBySelector(".".concat(swalClasses.actions, " .").concat(swalClasses.cancel));
  };
  var getActions = function getActions() {
    return elementByClass(swalClasses.actions);
  };
  var getHeader = function getHeader() {
    return elementByClass(swalClasses.header);
  };
  var getFooter = function getFooter() {
    return elementByClass(swalClasses.footer);
  };
  var getTimerProgressBar = function getTimerProgressBar() {
    return elementByClass(swalClasses['timer-progress-bar']);
  };
  var getCloseButton = function getCloseButton() {
    return elementByClass(swalClasses.close);
  }; // https://github.com/jkup/focusable/blob/master/index.js

  var focusable = "\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex=\"0\"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n";
  var getFocusableElements = function getFocusableElements() {
    var focusableElementsWithTabindex = toArray(getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')) // sort according to tabindex
    .sort(function (a, b) {
      a = parseInt(a.getAttribute('tabindex'));
      b = parseInt(b.getAttribute('tabindex'));

      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      }

      return 0;
    });
    var otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(function (el) {
      return el.getAttribute('tabindex') !== '-1';
    });
    return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter(function (el) {
      return isVisible(el);
    });
  };
  var isModal = function isModal() {
    return !isToast() && !document.body.classList.contains(swalClasses['no-backdrop']);
  };
  var isToast = function isToast() {
    return document.body.classList.contains(swalClasses['toast-shown']);
  };
  var isLoading = function isLoading() {
    return getPopup().hasAttribute('data-loading');
  };

  var states = {
    previousBodyPadding: null
  };
  var setInnerHtml = function setInnerHtml(elem, html) {
    // #1926
    elem.textContent = '';

    if (html) {
      var parser = new DOMParser();
      var parsed = parser.parseFromString(html, "text/html");
      toArray(parsed.querySelector('head').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
      toArray(parsed.querySelector('body').childNodes).forEach(function (child) {
        elem.appendChild(child);
      });
    }
  };
  var hasClass = function hasClass(elem, className) {
    if (!className) {
      return false;
    }

    var classList = className.split(/\s+/);

    for (var i = 0; i < classList.length; i++) {
      if (!elem.classList.contains(classList[i])) {
        return false;
      }
    }

    return true;
  };

  var removeCustomClasses = function removeCustomClasses(elem, params) {
    toArray(elem.classList).forEach(function (className) {
      if (!(objectValues(swalClasses).indexOf(className) !== -1) && !(objectValues(iconTypes).indexOf(className) !== -1) && !(objectValues(params.showClass).indexOf(className) !== -1)) {
        elem.classList.remove(className);
      }
    });
  };

  var applyCustomClass = function applyCustomClass(elem, params, className) {
    removeCustomClasses(elem, params);

    if (params.customClass && params.customClass[className]) {
      if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
        return warn("Invalid type of customClass.".concat(className, "! Expected string or iterable object, got \"").concat(_typeof(params.customClass[className]), "\""));
      }

      addClass(elem, params.customClass[className]);
    }
  };
  function getInput(content, inputType) {
    if (!inputType) {
      return null;
    }

    switch (inputType) {
      case 'select':
      case 'textarea':
      case 'file':
        return getChildByClass(content, swalClasses[inputType]);

      case 'checkbox':
        return content.querySelector(".".concat(swalClasses.checkbox, " input"));

      case 'radio':
        return content.querySelector(".".concat(swalClasses.radio, " input:checked")) || content.querySelector(".".concat(swalClasses.radio, " input:first-child"));

      case 'range':
        return content.querySelector(".".concat(swalClasses.range, " input"));

      default:
        return getChildByClass(content, swalClasses.input);
    }
  }
  var focusInput = function focusInput(input) {
    input.focus(); // place cursor at end of text in text input

    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915
      var val = input.value;
      input.value = '';
      input.value = val;
    }
  };
  var toggleClass = function toggleClass(target, classList, condition) {
    if (!target || !classList) {
      return;
    }

    if (typeof classList === 'string') {
      classList = classList.split(/\s+/).filter(Boolean);
    }

    classList.forEach(function (className) {
      if (target.forEach) {
        target.forEach(function (elem) {
          condition ? elem.classList.add(className) : elem.classList.remove(className);
        });
      } else {
        condition ? target.classList.add(className) : target.classList.remove(className);
      }
    });
  };
  var addClass = function addClass(target, classList) {
    toggleClass(target, classList, true);
  };
  var removeClass = function removeClass(target, classList) {
    toggleClass(target, classList, false);
  };
  var getChildByClass = function getChildByClass(elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i];
      }
    }
  };
  var applyNumericalStyle = function applyNumericalStyle(elem, property, value) {
    if (value || parseInt(value) === 0) {
      elem.style[property] = typeof value === 'number' ? "".concat(value, "px") : value;
    } else {
      elem.style.removeProperty(property);
    }
  };
  var show = function show(elem) {
    var display = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flex';
    elem.style.opacity = '';
    elem.style.display = display;
  };
  var hide = function hide(elem) {
    elem.style.opacity = '';
    elem.style.display = 'none';
  };
  var toggle = function toggle(elem, condition, display) {
    condition ? show(elem, display) : hide(elem);
  }; // borrowed from jquery $(elem).is(':visible') implementation

  var isVisible = function isVisible(elem) {
    return !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  };
  /* istanbul ignore next */

  var isScrollable = function isScrollable(elem) {
    return !!(elem.scrollHeight > elem.clientHeight);
  }; // borrowed from https://stackoverflow.com/a/46352119

  var hasCssAnimation = function hasCssAnimation(elem) {
    var style = window.getComputedStyle(elem);
    var animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
    var transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');
    return animDuration > 0 || transDuration > 0;
  };
  var contains = function contains(haystack, needle) {
    if (typeof haystack.contains === 'function') {
      return haystack.contains(needle);
    }
  };
  var animateTimerProgressBar = function animateTimerProgressBar(timer) {
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var timerProgressBar = getTimerProgressBar();

    if (isVisible(timerProgressBar)) {
      if (reset) {
        timerProgressBar.style.transition = 'none';
        timerProgressBar.style.width = '100%';
      }

      setTimeout(function () {
        timerProgressBar.style.transition = "width ".concat(timer / 1000, "s linear");
        timerProgressBar.style.width = '0%';
      }, 10);
    }
  };
  var stopTimerProgressBar = function stopTimerProgressBar() {
    var timerProgressBar = getTimerProgressBar();
    var timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = '100%';
    var timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
    var timerProgressBarPercent = parseInt(timerProgressBarWidth / timerProgressBarFullWidth * 100);
    timerProgressBar.style.removeProperty('transition');
    timerProgressBar.style.width = "".concat(timerProgressBarPercent, "%");
  };

  // Detect Node env
  var isNodeEnv = function isNodeEnv() {
    return typeof window === 'undefined' || typeof document === 'undefined';
  };

  var sweetHTML = "\n <div aria-labelledby=\"".concat(swalClasses.title, "\" aria-describedby=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses.popup, "\" tabindex=\"-1\">\n   <div class=\"").concat(swalClasses.header, "\">\n     <ul class=\"").concat(swalClasses['progress-steps'], "\"></ul>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.error, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.question, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.warning, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.info, "\"></div>\n     <div class=\"").concat(swalClasses.icon, " ").concat(iconTypes.success, "\"></div>\n     <img class=\"").concat(swalClasses.image, "\" />\n     <h2 class=\"").concat(swalClasses.title, "\" id=\"").concat(swalClasses.title, "\"></h2>\n     <button type=\"button\" class=\"").concat(swalClasses.close, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.content, "\">\n     <div id=\"").concat(swalClasses.content, "\" class=\"").concat(swalClasses['html-container'], "\"></div>\n     <input class=\"").concat(swalClasses.input, "\" />\n     <input type=\"file\" class=\"").concat(swalClasses.file, "\" />\n     <div class=\"").concat(swalClasses.range, "\">\n       <input type=\"range\" />\n       <output></output>\n     </div>\n     <select class=\"").concat(swalClasses.select, "\"></select>\n     <div class=\"").concat(swalClasses.radio, "\"></div>\n     <label for=\"").concat(swalClasses.checkbox, "\" class=\"").concat(swalClasses.checkbox, "\">\n       <input type=\"checkbox\" />\n       <span class=\"").concat(swalClasses.label, "\"></span>\n     </label>\n     <textarea class=\"").concat(swalClasses.textarea, "\"></textarea>\n     <div class=\"").concat(swalClasses['validation-message'], "\" id=\"").concat(swalClasses['validation-message'], "\"></div>\n   </div>\n   <div class=\"").concat(swalClasses.actions, "\">\n     <div class=\"").concat(swalClasses.loader, "\"></div>\n     <button type=\"button\" class=\"").concat(swalClasses.confirm, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.deny, "\"></button>\n     <button type=\"button\" class=\"").concat(swalClasses.cancel, "\"></button>\n   </div>\n   <div class=\"").concat(swalClasses.footer, "\"></div>\n   <div class=\"").concat(swalClasses['timer-progress-bar-container'], "\">\n     <div class=\"").concat(swalClasses['timer-progress-bar'], "\"></div>\n   </div>\n </div>\n").replace(/(^|\n)\s*/g, '');

  var resetOldContainer = function resetOldContainer() {
    var oldContainer = getContainer();

    if (!oldContainer) {
      return false;
    }

    oldContainer.parentNode.removeChild(oldContainer);
    removeClass([document.documentElement, document.body], [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]);
    return true;
  };

  var oldInputVal; // IE11 workaround, see #1109 for details

  var resetValidationMessage = function resetValidationMessage(e) {
    if (Swal.isVisible() && oldInputVal !== e.target.value) {
      Swal.resetValidationMessage();
    }

    oldInputVal = e.target.value;
  };

  var addInputChangeListeners = function addInputChangeListeners() {
    var content = getContent();
    var input = getChildByClass(content, swalClasses.input);
    var file = getChildByClass(content, swalClasses.file);
    var range = content.querySelector(".".concat(swalClasses.range, " input"));
    var rangeOutput = content.querySelector(".".concat(swalClasses.range, " output"));
    var select = getChildByClass(content, swalClasses.select);
    var checkbox = content.querySelector(".".concat(swalClasses.checkbox, " input"));
    var textarea = getChildByClass(content, swalClasses.textarea);
    input.oninput = resetValidationMessage;
    file.onchange = resetValidationMessage;
    select.onchange = resetValidationMessage;
    checkbox.onchange = resetValidationMessage;
    textarea.oninput = resetValidationMessage;

    range.oninput = function (e) {
      resetValidationMessage(e);
      rangeOutput.value = range.value;
    };

    range.onchange = function (e) {
      resetValidationMessage(e);
      range.nextSibling.value = range.value;
    };
  };

  var getTarget = function getTarget(target) {
    return typeof target === 'string' ? document.querySelector(target) : target;
  };

  var setupAccessibility = function setupAccessibility(params) {
    var popup = getPopup();
    popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
    popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');

    if (!params.toast) {
      popup.setAttribute('aria-modal', 'true');
    }
  };

  var setupRTL = function setupRTL(targetElement) {
    if (window.getComputedStyle(targetElement).direction === 'rtl') {
      addClass(getContainer(), swalClasses.rtl);
    }
  };
  /*
   * Add modal + backdrop to DOM
   */


  var init = function init(params) {
    // Clean up the old popup container if it exists
    var oldContainerExisted = resetOldContainer();
    /* istanbul ignore if */

    if (isNodeEnv()) {
      error('SweetAlert2 requires document to initialize');
      return;
    }

    var container = document.createElement('div');
    container.className = swalClasses.container;

    if (oldContainerExisted) {
      addClass(container, swalClasses['no-transition']);
    }

    setInnerHtml(container, sweetHTML);
    var targetElement = getTarget(params.target);
    targetElement.appendChild(container);
    setupAccessibility(params);
    setupRTL(targetElement);
    addInputChangeListeners();
  };

  var parseHtmlToContainer = function parseHtmlToContainer(param, target) {
    // DOM element
    if (param instanceof HTMLElement) {
      target.appendChild(param); // Object
    } else if (_typeof(param) === 'object') {
      handleObject(param, target); // Plain string
    } else if (param) {
      setInnerHtml(target, param);
    }
  };

  var handleObject = function handleObject(param, target) {
    // JQuery element(s)
    if (param.jquery) {
      handleJqueryElem(target, param); // For other objects use their string representation
    } else {
      setInnerHtml(target, param.toString());
    }
  };

  var handleJqueryElem = function handleJqueryElem(target, elem) {
    target.textContent = '';

    if (0 in elem) {
      for (var i = 0; (i in elem); i++) {
        target.appendChild(elem[i].cloneNode(true));
      }
    } else {
      target.appendChild(elem.cloneNode(true));
    }
  };

  var animationEndEvent = function () {
    // Prevent run in Node env

    /* istanbul ignore if */
    if (isNodeEnv()) {
      return false;
    }

    var testEl = document.createElement('div');
    var transEndEventNames = {
      WebkitAnimation: 'webkitAnimationEnd',
      OAnimation: 'oAnimationEnd oanimationend',
      animation: 'animationend'
    };

    for (var i in transEndEventNames) {
      if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
        return transEndEventNames[i];
      }
    }

    return false;
  }();

  // https://github.com/twbs/bootstrap/blob/master/js/src/modal.js

  var measureScrollbar = function measureScrollbar() {
    var scrollDiv = document.createElement('div');
    scrollDiv.className = swalClasses['scrollbar-measure'];
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  var renderActions = function renderActions(instance, params) {
    var actions = getActions();
    var loader = getLoader();
    var confirmButton = getConfirmButton();
    var denyButton = getDenyButton();
    var cancelButton = getCancelButton(); // Actions (buttons) wrapper

    if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
      hide(actions);
    } // Custom class


    applyCustomClass(actions, params, 'actions'); // Render buttons

    renderButton(confirmButton, 'confirm', params);
    renderButton(denyButton, 'deny', params);
    renderButton(cancelButton, 'cancel', params); // Loader

    loader.innerHTML = params.loaderHtml;

    if (params.buttonsStyling) {
      handleButtonsStyling(confirmButton, denyButton, cancelButton, params);
    } else {
      removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled);
    }

    if (params.reverseButtons) {
      actions.insertBefore(cancelButton, loader);
      actions.insertBefore(denyButton, loader);
      actions.insertBefore(confirmButton, loader);
    }
  };

  function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
    addClass([confirmButton, denyButton, cancelButton], swalClasses.styled); // Buttons background colors

    if (params.confirmButtonColor) {
      confirmButton.style.backgroundColor = params.confirmButtonColor;
    }

    if (params.denyButtonColor) {
      denyButton.style.backgroundColor = params.denyButtonColor;
    }

    if (params.cancelButtonColor) {
      cancelButton.style.backgroundColor = params.cancelButtonColor;
    } // Loading state


    if (!isLoading()) {
      var confirmButtonBackgroundColor = window.getComputedStyle(confirmButton).getPropertyValue('background-color');
      confirmButton.style.borderLeftColor = confirmButtonBackgroundColor;
      confirmButton.style.borderRightColor = confirmButtonBackgroundColor;
    }
  }

  function renderButton(button, buttonType, params) {
    toggle(button, params["show".concat(capitalizeFirstLetter(buttonType), "Button")], 'inline-block');
    setInnerHtml(button, params["".concat(buttonType, "ButtonText")]); // Set caption text

    button.setAttribute('aria-label', params["".concat(buttonType, "ButtonAriaLabel")]); // ARIA label
    // Add buttons custom classes

    button.className = swalClasses[buttonType];
    applyCustomClass(button, params, "".concat(buttonType, "Button"));
    addClass(button, params["".concat(buttonType, "ButtonClass")]);
  }

  function handleBackdropParam(container, backdrop) {
    if (typeof backdrop === 'string') {
      container.style.background = backdrop;
    } else if (!backdrop) {
      addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
    }
  }

  function handlePositionParam(container, position) {
    if (position in swalClasses) {
      addClass(container, swalClasses[position]);
    } else {
      warn('The "position" parameter is not valid, defaulting to "center"');
      addClass(container, swalClasses.center);
    }
  }

  function handleGrowParam(container, grow) {
    if (grow && typeof grow === 'string') {
      var growClass = "grow-".concat(grow);

      if (growClass in swalClasses) {
        addClass(container, swalClasses[growClass]);
      }
    }
  }

  var renderContainer = function renderContainer(instance, params) {
    var container = getContainer();

    if (!container) {
      return;
    }

    handleBackdropParam(container, params.backdrop);

    if (!params.backdrop && params.allowOutsideClick) {
      warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
    }

    handlePositionParam(container, params.position);
    handleGrowParam(container, params.grow); // Custom class

    applyCustomClass(container, params, 'container'); // Set queue step attribute for getQueueStep() method

    var queueStep = document.body.getAttribute('data-swal2-queue-step');

    if (queueStep) {
      container.setAttribute('data-queue-step', queueStep);
      document.body.removeAttribute('data-swal2-queue-step');
    }
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateProps = {
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap()
  };

  var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];
  var renderInput = function renderInput(instance, params) {
    var content = getContent();
    var innerParams = privateProps.innerParams.get(instance);
    var rerender = !innerParams || params.input !== innerParams.input;
    inputTypes.forEach(function (inputType) {
      var inputClass = swalClasses[inputType];
      var inputContainer = getChildByClass(content, inputClass); // set attributes

      setAttributes(inputType, params.inputAttributes); // set class

      inputContainer.className = inputClass;

      if (rerender) {
        hide(inputContainer);
      }
    });

    if (params.input) {
      if (rerender) {
        showInput(params);
      } // set custom class


      setCustomClass(params);
    }
  };

  var showInput = function showInput(params) {
    if (!renderInputType[params.input]) {
      return error("Unexpected type of input! Expected \"text\", \"email\", \"password\", \"number\", \"tel\", \"select\", \"radio\", \"checkbox\", \"textarea\", \"file\" or \"url\", got \"".concat(params.input, "\""));
    }

    var inputContainer = getInputContainer(params.input);
    var input = renderInputType[params.input](inputContainer, params);
    show(input); // input autofocus

    setTimeout(function () {
      focusInput(input);
    });
  };

  var removeAttributes = function removeAttributes(input) {
    for (var i = 0; i < input.attributes.length; i++) {
      var attrName = input.attributes[i].name;

      if (!(['type', 'value', 'style'].indexOf(attrName) !== -1)) {
        input.removeAttribute(attrName);
      }
    }
  };

  var setAttributes = function setAttributes(inputType, inputAttributes) {
    var input = getInput(getContent(), inputType);

    if (!input) {
      return;
    }

    removeAttributes(input);

    for (var attr in inputAttributes) {
      // Do not set a placeholder for <input type="range">
      // it'll crash Edge, #1298
      if (inputType === 'range' && attr === 'placeholder') {
        continue;
      }

      input.setAttribute(attr, inputAttributes[attr]);
    }
  };

  var setCustomClass = function setCustomClass(params) {
    var inputContainer = getInputContainer(params.input);

    if (params.customClass) {
      addClass(inputContainer, params.customClass.input);
    }
  };

  var setInputPlaceholder = function setInputPlaceholder(input, params) {
    if (!input.placeholder || params.inputPlaceholder) {
      input.placeholder = params.inputPlaceholder;
    }
  };

  var getInputContainer = function getInputContainer(inputType) {
    var inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
    return getChildByClass(getContent(), inputClass);
  };

  var renderInputType = {};

  renderInputType.text = renderInputType.email = renderInputType.password = renderInputType.number = renderInputType.tel = renderInputType.url = function (input, params) {
    if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
      input.value = params.inputValue;
    } else if (!isPromise(params.inputValue)) {
      warn("Unexpected type of inputValue! Expected \"string\", \"number\" or \"Promise\", got \"".concat(_typeof(params.inputValue), "\""));
    }

    setInputPlaceholder(input, params);
    input.type = params.input;
    return input;
  };

  renderInputType.file = function (input, params) {
    setInputPlaceholder(input, params);
    return input;
  };

  renderInputType.range = function (range, params) {
    var rangeInput = range.querySelector('input');
    var rangeOutput = range.querySelector('output');
    rangeInput.value = params.inputValue;
    rangeInput.type = params.input;
    rangeOutput.value = params.inputValue;
    return range;
  };

  renderInputType.select = function (select, params) {
    select.textContent = '';

    if (params.inputPlaceholder) {
      var placeholder = document.createElement('option');
      setInnerHtml(placeholder, params.inputPlaceholder);
      placeholder.value = '';
      placeholder.disabled = true;
      placeholder.selected = true;
      select.appendChild(placeholder);
    }

    return select;
  };

  renderInputType.radio = function (radio) {
    radio.textContent = '';
    return radio;
  };

  renderInputType.checkbox = function (checkboxContainer, params) {
    var checkbox = getInput(getContent(), 'checkbox');
    checkbox.value = 1;
    checkbox.id = swalClasses.checkbox;
    checkbox.checked = Boolean(params.inputValue);
    var label = checkboxContainer.querySelector('span');
    setInnerHtml(label, params.inputPlaceholder);
    return checkboxContainer;
  };

  renderInputType.textarea = function (textarea, params) {
    textarea.value = params.inputValue;
    setInputPlaceholder(textarea, params);

    if ('MutationObserver' in window) {
      // #1699
      var initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
      var popupPadding = parseInt(window.getComputedStyle(getPopup()).paddingLeft) + parseInt(window.getComputedStyle(getPopup()).paddingRight);

      var outputsize = function outputsize() {
        var contentWidth = textarea.offsetWidth + popupPadding;

        if (contentWidth > initialPopupWidth) {
          getPopup().style.width = "".concat(contentWidth, "px");
        } else {
          getPopup().style.width = null;
        }
      };

      new MutationObserver(outputsize).observe(textarea, {
        attributes: true,
        attributeFilter: ['style']
      });
    }

    return textarea;
  };

  var renderContent = function renderContent(instance, params) {
    var content = getContent().querySelector("#".concat(swalClasses.content)); // Content as HTML

    if (params.html) {
      parseHtmlToContainer(params.html, content);
      show(content, 'block'); // Content as plain text
    } else if (params.text) {
      content.textContent = params.text;
      show(content, 'block'); // No content
    } else {
      hide(content);
    }

    renderInput(instance, params); // Custom class

    applyCustomClass(getContent(), params, 'content');
  };

  var renderFooter = function renderFooter(instance, params) {
    var footer = getFooter();
    toggle(footer, params.footer);

    if (params.footer) {
      parseHtmlToContainer(params.footer, footer);
    } // Custom class


    applyCustomClass(footer, params, 'footer');
  };

  var renderCloseButton = function renderCloseButton(instance, params) {
    var closeButton = getCloseButton();
    setInnerHtml(closeButton, params.closeButtonHtml); // Custom class

    applyCustomClass(closeButton, params, 'closeButton');
    toggle(closeButton, params.showCloseButton);
    closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
  };

  var renderIcon = function renderIcon(instance, params) {
    var innerParams = privateProps.innerParams.get(instance); // if the give icon already rendered, apply the custom class without re-rendering the icon

    if (innerParams && params.icon === innerParams.icon && getIcon()) {
      applyCustomClass(getIcon(), params, 'icon');
      return;
    }

    hideAllIcons();

    if (!params.icon) {
      return;
    }

    if (Object.keys(iconTypes).indexOf(params.icon) !== -1) {
      var icon = elementBySelector(".".concat(swalClasses.icon, ".").concat(iconTypes[params.icon]));
      show(icon); // Custom or default content

      setContent(icon, params);
      adjustSuccessIconBackgoundColor(); // Custom class

      applyCustomClass(icon, params, 'icon'); // Animate icon

      addClass(icon, params.showClass.icon);
    } else {
      error("Unknown icon! Expected \"success\", \"error\", \"warning\", \"info\" or \"question\", got \"".concat(params.icon, "\""));
    }
  };

  var hideAllIcons = function hideAllIcons() {
    var icons = getIcons();

    for (var i = 0; i < icons.length; i++) {
      hide(icons[i]);
    }
  }; // Adjust success icon background color to match the popup background color


  var adjustSuccessIconBackgoundColor = function adjustSuccessIconBackgoundColor() {
    var popup = getPopup();
    var popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
    var successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');

    for (var i = 0; i < successIconParts.length; i++) {
      successIconParts[i].style.backgroundColor = popupBackgroundColor;
    }
  };

  var setContent = function setContent(icon, params) {
    icon.textContent = '';

    if (params.iconHtml) {
      setInnerHtml(icon, iconContent(params.iconHtml));
    } else if (params.icon === 'success') {
      setInnerHtml(icon, "\n      <div class=\"swal2-success-circular-line-left\"></div>\n      <span class=\"swal2-success-line-tip\"></span> <span class=\"swal2-success-line-long\"></span>\n      <div class=\"swal2-success-ring\"></div> <div class=\"swal2-success-fix\"></div>\n      <div class=\"swal2-success-circular-line-right\"></div>\n    ");
    } else if (params.icon === 'error') {
      setInnerHtml(icon, "\n      <span class=\"swal2-x-mark\">\n        <span class=\"swal2-x-mark-line-left\"></span>\n        <span class=\"swal2-x-mark-line-right\"></span>\n      </span>\n    ");
    } else {
      var defaultIconHtml = {
        question: '?',
        warning: '!',
        info: 'i'
      };
      setInnerHtml(icon, iconContent(defaultIconHtml[params.icon]));
    }
  };

  var iconContent = function iconContent(content) {
    return "<div class=\"".concat(swalClasses['icon-content'], "\">").concat(content, "</div>");
  };

  var renderImage = function renderImage(instance, params) {
    var image = getImage();

    if (!params.imageUrl) {
      return hide(image);
    }

    show(image, ''); // Src, alt

    image.setAttribute('src', params.imageUrl);
    image.setAttribute('alt', params.imageAlt); // Width, height

    applyNumericalStyle(image, 'width', params.imageWidth);
    applyNumericalStyle(image, 'height', params.imageHeight); // Class

    image.className = swalClasses.image;
    applyCustomClass(image, params, 'image');
  };

  var currentSteps = [];
  /*
   * Global function for chaining sweetAlert popups
   */

  var queue = function queue(steps) {
    var Swal = this;
    currentSteps = steps;

    var resetAndResolve = function resetAndResolve(resolve, value) {
      currentSteps = [];
      resolve(value);
    };

    var queueResult = [];
    return new Promise(function (resolve) {
      (function step(i, callback) {
        if (i < currentSteps.length) {
          document.body.setAttribute('data-swal2-queue-step', i);
          Swal.fire(currentSteps[i]).then(function (result) {
            if (typeof result.value !== 'undefined') {
              queueResult.push(result.value);
              step(i + 1, callback);
            } else {
              resetAndResolve(resolve, {
                dismiss: result.dismiss
              });
            }
          });
        } else {
          resetAndResolve(resolve, {
            value: queueResult
          });
        }
      })(0);
    });
  };
  /*
   * Global function for getting the index of current popup in queue
   */

  var getQueueStep = function getQueueStep() {
    return getContainer() && getContainer().getAttribute('data-queue-step');
  };
  /*
   * Global function for inserting a popup to the queue
   */

  var insertQueueStep = function insertQueueStep(step, index) {
    if (index && index < currentSteps.length) {
      return currentSteps.splice(index, 0, step);
    }

    return currentSteps.push(step);
  };
  /*
   * Global function for deleting a popup from the queue
   */

  var deleteQueueStep = function deleteQueueStep(index) {
    if (typeof currentSteps[index] !== 'undefined') {
      currentSteps.splice(index, 1);
    }
  };

  var createStepElement = function createStepElement(step) {
    var stepEl = document.createElement('li');
    addClass(stepEl, swalClasses['progress-step']);
    setInnerHtml(stepEl, step);
    return stepEl;
  };

  var createLineElement = function createLineElement(params) {
    var lineEl = document.createElement('li');
    addClass(lineEl, swalClasses['progress-step-line']);

    if (params.progressStepsDistance) {
      lineEl.style.width = params.progressStepsDistance;
    }

    return lineEl;
  };

  var renderProgressSteps = function renderProgressSteps(instance, params) {
    var progressStepsContainer = getProgressSteps();

    if (!params.progressSteps || params.progressSteps.length === 0) {
      return hide(progressStepsContainer);
    }

    show(progressStepsContainer);
    progressStepsContainer.textContent = '';
    var currentProgressStep = parseInt(params.currentProgressStep === undefined ? getQueueStep() : params.currentProgressStep);

    if (currentProgressStep >= params.progressSteps.length) {
      warn('Invalid currentProgressStep parameter, it should be less than progressSteps.length ' + '(currentProgressStep like JS arrays starts from 0)');
    }

    params.progressSteps.forEach(function (step, index) {
      var stepEl = createStepElement(step);
      progressStepsContainer.appendChild(stepEl);

      if (index === currentProgressStep) {
        addClass(stepEl, swalClasses['active-progress-step']);
      }

      if (index !== params.progressSteps.length - 1) {
        var lineEl = createLineElement(params);
        progressStepsContainer.appendChild(lineEl);
      }
    });
  };

  var renderTitle = function renderTitle(instance, params) {
    var title = getTitle();
    toggle(title, params.title || params.titleText);

    if (params.title) {
      parseHtmlToContainer(params.title, title);
    }

    if (params.titleText) {
      title.innerText = params.titleText;
    } // Custom class


    applyCustomClass(title, params, 'title');
  };

  var renderHeader = function renderHeader(instance, params) {
    var header = getHeader(); // Custom class

    applyCustomClass(header, params, 'header'); // Progress steps

    renderProgressSteps(instance, params); // Icon

    renderIcon(instance, params); // Image

    renderImage(instance, params); // Title

    renderTitle(instance, params); // Close button

    renderCloseButton(instance, params);
  };

  var renderPopup = function renderPopup(instance, params) {
    var popup = getPopup(); // Width

    applyNumericalStyle(popup, 'width', params.width); // Padding

    applyNumericalStyle(popup, 'padding', params.padding); // Background

    if (params.background) {
      popup.style.background = params.background;
    } // Classes


    addClasses(popup, params);
  };

  var addClasses = function addClasses(popup, params) {
    // Default Class + showClass when updating Swal.update({})
    popup.className = "".concat(swalClasses.popup, " ").concat(isVisible(popup) ? params.showClass.popup : '');

    if (params.toast) {
      addClass([document.documentElement, document.body], swalClasses['toast-shown']);
      addClass(popup, swalClasses.toast);
    } else {
      addClass(popup, swalClasses.modal);
    } // Custom class


    applyCustomClass(popup, params, 'popup');

    if (typeof params.customClass === 'string') {
      addClass(popup, params.customClass);
    } // Icon class (#1842)


    if (params.icon) {
      addClass(popup, swalClasses["icon-".concat(params.icon)]);
    }
  };

  var render = function render(instance, params) {
    renderPopup(instance, params);
    renderContainer(instance, params);
    renderHeader(instance, params);
    renderContent(instance, params);
    renderActions(instance, params);
    renderFooter(instance, params);

    if (typeof params.onRender === 'function') {
      params.onRender(getPopup());
    }
  };

  /*
   * Global function to determine if SweetAlert2 popup is shown
   */

  var isVisible$1 = function isVisible$$1() {
    return isVisible(getPopup());
  };
  /*
   * Global function to click 'Confirm' button
   */

  var clickConfirm = function clickConfirm() {
    return getConfirmButton() && getConfirmButton().click();
  };
  /*
   * Global function to click 'Deny' button
   */

  var clickDeny = function clickDeny() {
    return getDenyButton() && getDenyButton().click();
  };
  /*
   * Global function to click 'Cancel' button
   */

  var clickCancel = function clickCancel() {
    return getCancelButton() && getCancelButton().click();
  };

  function fire() {
    var Swal = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _construct(Swal, args);
  }

  /**
   * Returns an extended version of `Swal` containing `params` as defaults.
   * Useful for reusing Swal configuration.
   *
   * For example:
   *
   * Before:
   * const textPromptOptions = { input: 'text', showCancelButton: true }
   * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
   * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
   *
   * After:
   * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
   * const {value: firstName} = await TextPrompt('What is your first name?')
   * const {value: lastName} = await TextPrompt('What is your last name?')
   *
   * @param mixinParams
   */
  function mixin(mixinParams) {
    var MixinSwal = /*#__PURE__*/function (_this) {
      _inherits(MixinSwal, _this);

      var _super = _createSuper(MixinSwal);

      function MixinSwal() {
        _classCallCheck(this, MixinSwal);

        return _super.apply(this, arguments);
      }

      _createClass(MixinSwal, [{
        key: "_main",
        value: function _main(params) {
          return _get(_getPrototypeOf(MixinSwal.prototype), "_main", this).call(this, _extends({}, mixinParams, params));
        }
      }]);

      return MixinSwal;
    }(this);

    return MixinSwal;
  }

  /**
   * Show spinner instead of Confirm button
   */

  var showLoading = function showLoading() {
    var popup = getPopup();

    if (!popup) {
      Swal.fire();
    }

    popup = getPopup();
    var actions = getActions();
    var confirmButton = getConfirmButton();
    var loader = getLoader();
    show(actions);
    hide(confirmButton);
    addClass([popup, actions], swalClasses.loading);
    show(loader);
    popup.setAttribute('data-loading', true);
    popup.setAttribute('aria-busy', true);
    popup.focus();
  };

  var RESTORE_FOCUS_TIMEOUT = 100;

  var globalState = {};

  var focusPreviousActiveElement = function focusPreviousActiveElement() {
    if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
      globalState.previousActiveElement.focus();
      globalState.previousActiveElement = null;
    } else if (document.body) {
      document.body.focus();
    }
  }; // Restore previous active (focused) element


  var restoreActiveElement = function restoreActiveElement() {
    return new Promise(function (resolve) {
      var x = window.scrollX;
      var y = window.scrollY;
      globalState.restoreFocusTimeout = setTimeout(function () {
        focusPreviousActiveElement();
        resolve();
      }, RESTORE_FOCUS_TIMEOUT); // issues/900

      /* istanbul ignore if */

      if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // IE doesn't have scrollX/scrollY support
        window.scrollTo(x, y);
      }
    });
  };

  /**
   * If `timer` parameter is set, returns number of milliseconds of timer remained.
   * Otherwise, returns undefined.
   */

  var getTimerLeft = function getTimerLeft() {
    return globalState.timeout && globalState.timeout.getTimerLeft();
  };
  /**
   * Stop timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var stopTimer = function stopTimer() {
    if (globalState.timeout) {
      stopTimerProgressBar();
      return globalState.timeout.stop();
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var resumeTimer = function resumeTimer() {
    if (globalState.timeout) {
      var remaining = globalState.timeout.start();
      animateTimerProgressBar(remaining);
      return remaining;
    }
  };
  /**
   * Resume timer. Returns number of milliseconds of timer remained.
   * If `timer` parameter isn't set, returns undefined.
   */

  var toggleTimer = function toggleTimer() {
    var timer = globalState.timeout;
    return timer && (timer.running ? stopTimer() : resumeTimer());
  };
  /**
   * Increase timer. Returns number of milliseconds of an updated timer.
   * If `timer` parameter isn't set, returns undefined.
   */

  var increaseTimer = function increaseTimer(n) {
    if (globalState.timeout) {
      var remaining = globalState.timeout.increase(n);
      animateTimerProgressBar(remaining, true);
      return remaining;
    }
  };
  /**
   * Check if timer is running. Returns true if timer is running
   * or false if timer is paused or stopped.
   * If `timer` parameter isn't set, returns undefined
   */

  var isTimerRunning = function isTimerRunning() {
    return globalState.timeout && globalState.timeout.isRunning();
  };

  var defaultParams = {
    title: '',
    titleText: '',
    text: '',
    html: '',
    footer: '',
    icon: undefined,
    iconHtml: undefined,
    toast: false,
    animation: true,
    showClass: {
      popup: 'swal2-show',
      backdrop: 'swal2-backdrop-show',
      icon: 'swal2-icon-show'
    },
    hideClass: {
      popup: 'swal2-hide',
      backdrop: 'swal2-backdrop-hide',
      icon: 'swal2-icon-hide'
    },
    customClass: undefined,
    target: 'body',
    backdrop: true,
    heightAuto: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    allowEnterKey: true,
    stopKeydownPropagation: true,
    keydownListenerCapture: false,
    showConfirmButton: true,
    showDenyButton: false,
    showCancelButton: false,
    preConfirm: undefined,
    confirmButtonText: 'OK',
    confirmButtonAriaLabel: '',
    confirmButtonColor: undefined,
    denyButtonText: 'No',
    denyButtonAriaLabel: '',
    denyButtonColor: undefined,
    cancelButtonText: 'Cancel',
    cancelButtonAriaLabel: '',
    cancelButtonColor: undefined,
    buttonsStyling: true,
    reverseButtons: false,
    focusConfirm: true,
    focusDeny: false,
    focusCancel: false,
    showCloseButton: false,
    closeButtonHtml: '&times;',
    closeButtonAriaLabel: 'Close this dialog',
    loaderHtml: '',
    showLoaderOnConfirm: false,
    imageUrl: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    imageAlt: '',
    timer: undefined,
    timerProgressBar: false,
    width: undefined,
    padding: undefined,
    background: undefined,
    input: undefined,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputAttributes: {},
    inputValidator: undefined,
    validationMessage: undefined,
    grow: false,
    position: 'center',
    progressSteps: [],
    currentProgressStep: undefined,
    progressStepsDistance: undefined,
    onBeforeOpen: undefined,
    onOpen: undefined,
    onRender: undefined,
    onClose: undefined,
    onAfterClose: undefined,
    onDestroy: undefined,
    scrollbarPadding: true
  };
  var updatableParams = ['allowEscapeKey', 'allowOutsideClick', 'buttonsStyling', 'cancelButtonAriaLabel', 'cancelButtonColor', 'cancelButtonText', 'closeButtonAriaLabel', 'closeButtonHtml', 'confirmButtonAriaLabel', 'confirmButtonColor', 'confirmButtonText', 'currentProgressStep', 'customClass', 'denyButtonAriaLabel', 'denyButtonColor', 'denyButtonText', 'footer', 'hideClass', 'html', 'icon', 'imageAlt', 'imageHeight', 'imageUrl', 'imageWidth', 'onAfterClose', 'onClose', 'onDestroy', 'progressSteps', 'reverseButtons', 'showCancelButton', 'showCloseButton', 'showConfirmButton', 'showDenyButton', 'text', 'title', 'titleText'];
  var deprecatedParams = {
    animation: 'showClass" and "hideClass'
  };
  var toastIncompatibleParams = ['allowOutsideClick', 'allowEnterKey', 'backdrop', 'focusConfirm', 'focusDeny', 'focusCancel', 'heightAuto', 'keydownListenerCapture'];
  /**
   * Is valid parameter
   * @param {String} paramName
   */

  var isValidParameter = function isValidParameter(paramName) {
    return Object.prototype.hasOwnProperty.call(defaultParams, paramName);
  };
  /**
   * Is valid parameter for Swal.update() method
   * @param {String} paramName
   */

  var isUpdatableParameter = function isUpdatableParameter(paramName) {
    return updatableParams.indexOf(paramName) !== -1;
  };
  /**
   * Is deprecated parameter
   * @param {String} paramName
   */

  var isDeprecatedParameter = function isDeprecatedParameter(paramName) {
    return deprecatedParams[paramName];
  };

  var checkIfParamIsValid = function checkIfParamIsValid(param) {
    if (!isValidParameter(param)) {
      warn("Unknown parameter \"".concat(param, "\""));
    }
  };

  var checkIfToastParamIsValid = function checkIfToastParamIsValid(param) {
    if (toastIncompatibleParams.indexOf(param) !== -1) {
      warn("The parameter \"".concat(param, "\" is incompatible with toasts"));
    }
  };

  var checkIfParamIsDeprecated = function checkIfParamIsDeprecated(param) {
    if (isDeprecatedParameter(param)) {
      warnAboutDepreation(param, isDeprecatedParameter(param));
    }
  };
  /**
   * Show relevant warnings for given params
   *
   * @param params
   */


  var showWarningsForParams = function showWarningsForParams(params) {
    for (var param in params) {
      checkIfParamIsValid(param);

      if (params.toast) {
        checkIfToastParamIsValid(param);
      }

      checkIfParamIsDeprecated(param);
    }
  };



  var staticMethods = /*#__PURE__*/Object.freeze({
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    isVisible: isVisible$1,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    clickCancel: clickCancel,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getContent: getContent,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getIcons: getIcons,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getDenyButton: getDenyButton,
    getCancelButton: getCancelButton,
    getHeader: getHeader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    fire: fire,
    mixin: mixin,
    queue: queue,
    getQueueStep: getQueueStep,
    insertQueueStep: insertQueueStep,
    deleteQueueStep: deleteQueueStep,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning
  });

  /**
   * Enables buttons and hide loader.
   */

  function hideLoading() {
    // do nothing if popup is closed
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return;
    }

    var domCache = privateProps.domCache.get(this);
    hide(domCache.loader);

    if (innerParams.showConfirmButton) {
      show(domCache.confirmButton);
    } else if (!innerParams.showConfirmButton && !innerParams.showCancelButton) {
      hide(domCache.actions);
    }

    removeClass([domCache.popup, domCache.actions], swalClasses.loading);
    domCache.popup.removeAttribute('aria-busy');
    domCache.popup.removeAttribute('data-loading');
    domCache.confirmButton.disabled = false;
    domCache.denyButton.disabled = false;
    domCache.cancelButton.disabled = false;
  }

  function getInput$1(instance) {
    var innerParams = privateProps.innerParams.get(instance || this);
    var domCache = privateProps.domCache.get(instance || this);

    if (!domCache) {
      return null;
    }

    return getInput(domCache.content, innerParams.input);
  }

  var fixScrollbar = function fixScrollbar() {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return;
    } // if the body has overflow


    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
      document.body.style.paddingRight = "".concat(states.previousBodyPadding + measureScrollbar(), "px");
    }
  };
  var undoScrollbar = function undoScrollbar() {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = "".concat(states.previousBodyPadding, "px");
      states.previousBodyPadding = null;
    }
  };

  /* istanbul ignore file */

  var iOSfix = function iOSfix() {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop;
      document.body.style.top = "".concat(offset * -1, "px");
      addClass(document.body, swalClasses.iosfix);
      lockBodyScroll();
      addBottomPaddingForTallPopups(); // #1948
    }
  };

  var addBottomPaddingForTallPopups = function addBottomPaddingForTallPopups() {
    var safari = !navigator.userAgent.match(/(CriOS|FxiOS|EdgiOS|YaBrowser|UCBrowser)/i);

    if (safari) {
      var bottomPanelHeight = 44;

      if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
        getContainer().style.paddingBottom = "".concat(bottomPanelHeight, "px");
      }
    }
  };

  var lockBodyScroll = function lockBodyScroll() {
    // #1246
    var container = getContainer();
    var preventTouchMove;

    container.ontouchstart = function (e) {
      preventTouchMove = shouldPreventTouchMove(e.target);
    };

    container.ontouchmove = function (e) {
      if (preventTouchMove) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
  };

  var shouldPreventTouchMove = function shouldPreventTouchMove(target) {
    var container = getContainer();

    if (target === container) {
      return true;
    }

    if (!isScrollable(container) && target.tagName !== 'INPUT' && // #1603
    !(isScrollable(getContent()) && // #1944
    getContent().contains(target))) {
      return true;
    }

    return false;
  };

  var undoIOSfix = function undoIOSfix() {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10);
      removeClass(document.body, swalClasses.iosfix);
      document.body.style.top = '';
      document.body.scrollTop = offset * -1;
    }
  };

  /* istanbul ignore file */

  var isIE11 = function isIE11() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }; // Fix IE11 centering sweetalert2/issues/933


  var fixVerticalPositionIE = function fixVerticalPositionIE() {
    var container = getContainer();
    var popup = getPopup();
    container.style.removeProperty('align-items');

    if (popup.offsetTop < 0) {
      container.style.alignItems = 'flex-start';
    }
  };

  var IEfix = function IEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      fixVerticalPositionIE();
      window.addEventListener('resize', fixVerticalPositionIE);
    }
  };
  var undoIEfix = function undoIEfix() {
    if (typeof window !== 'undefined' && isIE11()) {
      window.removeEventListener('resize', fixVerticalPositionIE);
    }
  };

  // Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
  // elements not within the active modal dialog will not be surfaced if a user opens a screen
  // reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

  var setAriaHidden = function setAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el === getContainer() || contains(el, getContainer())) {
        return;
      }

      if (el.hasAttribute('aria-hidden')) {
        el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
      }

      el.setAttribute('aria-hidden', 'true');
    });
  };
  var unsetAriaHidden = function unsetAriaHidden() {
    var bodyChildren = toArray(document.body.children);
    bodyChildren.forEach(function (el) {
      if (el.hasAttribute('data-previous-aria-hidden')) {
        el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
        el.removeAttribute('data-previous-aria-hidden');
      } else {
        el.removeAttribute('aria-hidden');
      }
    });
  };

  /**
   * This module containts `WeakMap`s for each effectively-"private  property" that a `Swal` has.
   * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
   * This is the approach that Babel will probably take to implement private methods/fields
   *   https://github.com/tc39/proposal-private-methods
   *   https://github.com/babel/babel/pull/7555
   * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
   *   then we can use that language feature.
   */
  var privateMethods = {
    swalPromiseResolve: new WeakMap()
  };

  /*
   * Instance method to close sweetAlert
   */

  function removePopupAndResetState(instance, container, isToast$$1, onAfterClose) {
    if (isToast$$1) {
      triggerOnAfterCloseAndDispose(instance, onAfterClose);
    } else {
      restoreActiveElement().then(function () {
        return triggerOnAfterCloseAndDispose(instance, onAfterClose);
      });
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (container.parentNode && !document.body.getAttribute('data-swal2-queue-step')) {
      container.parentNode.removeChild(container);
    }

    if (isModal()) {
      undoScrollbar();
      undoIOSfix();
      undoIEfix();
      unsetAriaHidden();
    }

    removeBodyClasses();
  }

  function removeBodyClasses() {
    removeClass([document.documentElement, document.body], [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['toast-column']]);
  }

  function close(resolveValue) {
    var popup = getPopup();

    if (!popup) {
      return;
    }

    resolveValue = prepareResolveValue(resolveValue);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
      return;
    }

    var swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);
    removeClass(popup, innerParams.showClass.popup);
    addClass(popup, innerParams.hideClass.popup);
    var backdrop = getContainer();
    removeClass(backdrop, innerParams.showClass.backdrop);
    addClass(backdrop, innerParams.hideClass.backdrop);
    handlePopupAnimation(this, popup, innerParams); // Resolve Swal promise

    swalPromiseResolve(resolveValue);
  }

  var prepareResolveValue = function prepareResolveValue(resolveValue) {
    // When user calls Swal.close()
    if (typeof resolveValue === 'undefined') {
      return {
        isConfirmed: false,
        isDenied: false,
        isDismissed: true
      };
    }

    return _extends({
      isConfirmed: false,
      isDenied: false,
      isDismissed: false
    }, resolveValue);
  };

  var handlePopupAnimation = function handlePopupAnimation(instance, popup, innerParams) {
    var container = getContainer(); // If animation is supported, animate

    var animationIsSupported = animationEndEvent && hasCssAnimation(popup);
    var onClose = innerParams.onClose,
        onAfterClose = innerParams.onAfterClose;

    if (onClose !== null && typeof onClose === 'function') {
      onClose(popup);
    }

    if (animationIsSupported) {
      animatePopup(instance, popup, container, onAfterClose);
    } else {
      // Otherwise, remove immediately
      removePopupAndResetState(instance, container, isToast(), onAfterClose);
    }
  };

  var animatePopup = function animatePopup(instance, popup, container, onAfterClose) {
    globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(null, instance, container, isToast(), onAfterClose);
    popup.addEventListener(animationEndEvent, function (e) {
      if (e.target === popup) {
        globalState.swalCloseEventFinishedCallback();
        delete globalState.swalCloseEventFinishedCallback;
      }
    });
  };

  var triggerOnAfterCloseAndDispose = function triggerOnAfterCloseAndDispose(instance, onAfterClose) {
    setTimeout(function () {
      if (typeof onAfterClose === 'function') {
        onAfterClose();
      }

      instance._destroy();
    });
  };

  function setButtonsDisabled(instance, buttons, disabled) {
    var domCache = privateProps.domCache.get(instance);
    buttons.forEach(function (button) {
      domCache[button].disabled = disabled;
    });
  }

  function setInputDisabled(input, disabled) {
    if (!input) {
      return false;
    }

    if (input.type === 'radio') {
      var radiosContainer = input.parentNode.parentNode;
      var radios = radiosContainer.querySelectorAll('input');

      for (var i = 0; i < radios.length; i++) {
        radios[i].disabled = disabled;
      }
    } else {
      input.disabled = disabled;
    }
  }

  function enableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
  }
  function disableButtons() {
    setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
  }
  function enableInput() {
    return setInputDisabled(this.getInput(), false);
  }
  function disableInput() {
    return setInputDisabled(this.getInput(), true);
  }

  function showValidationMessage(error) {
    var domCache = privateProps.domCache.get(this);
    setInnerHtml(domCache.validationMessage, error);
    var popupComputedStyle = window.getComputedStyle(domCache.popup);
    domCache.validationMessage.style.marginLeft = "-".concat(popupComputedStyle.getPropertyValue('padding-left'));
    domCache.validationMessage.style.marginRight = "-".concat(popupComputedStyle.getPropertyValue('padding-right'));
    show(domCache.validationMessage);
    var input = this.getInput();

    if (input) {
      input.setAttribute('aria-invalid', true);
      input.setAttribute('aria-describedBy', swalClasses['validation-message']);
      focusInput(input);
      addClass(input, swalClasses.inputerror);
    }
  } // Hide block with validation message

  function resetValidationMessage$1() {
    var domCache = privateProps.domCache.get(this);

    if (domCache.validationMessage) {
      hide(domCache.validationMessage);
    }

    var input = this.getInput();

    if (input) {
      input.removeAttribute('aria-invalid');
      input.removeAttribute('aria-describedBy');
      removeClass(input, swalClasses.inputerror);
    }
  }

  function getProgressSteps$1() {
    var domCache = privateProps.domCache.get(this);
    return domCache.progressSteps;
  }

  var Timer = /*#__PURE__*/function () {
    function Timer(callback, delay) {
      _classCallCheck(this, Timer);

      this.callback = callback;
      this.remaining = delay;
      this.running = false;
      this.start();
    }

    _createClass(Timer, [{
      key: "start",
      value: function start() {
        if (!this.running) {
          this.running = true;
          this.started = new Date();
          this.id = setTimeout(this.callback, this.remaining);
        }

        return this.remaining;
      }
    }, {
      key: "stop",
      value: function stop() {
        if (this.running) {
          this.running = false;
          clearTimeout(this.id);
          this.remaining -= new Date() - this.started;
        }

        return this.remaining;
      }
    }, {
      key: "increase",
      value: function increase(n) {
        var running = this.running;

        if (running) {
          this.stop();
        }

        this.remaining += n;

        if (running) {
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "getTimerLeft",
      value: function getTimerLeft() {
        if (this.running) {
          this.stop();
          this.start();
        }

        return this.remaining;
      }
    }, {
      key: "isRunning",
      value: function isRunning() {
        return this.running;
      }
    }]);

    return Timer;
  }();

  var defaultInputValidators = {
    email: function email(string, validationMessage) {
      return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid email address');
    },
    url: function url(string, validationMessage) {
      // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
      return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string) ? Promise.resolve() : Promise.resolve(validationMessage || 'Invalid URL');
    }
  };

  function setDefaultInputValidators(params) {
    // Use default `inputValidator` for supported input types if not provided
    if (!params.inputValidator) {
      Object.keys(defaultInputValidators).forEach(function (key) {
        if (params.input === key) {
          params.inputValidator = defaultInputValidators[key];
        }
      });
    }
  }

  function validateCustomTargetElement(params) {
    // Determine if the custom target element is valid
    if (!params.target || typeof params.target === 'string' && !document.querySelector(params.target) || typeof params.target !== 'string' && !params.target.appendChild) {
      warn('Target parameter is not valid, defaulting to "body"');
      params.target = 'body';
    }
  }
  /**
   * Set type, text and actions on popup
   *
   * @param params
   * @returns {boolean}
   */


  function setParameters(params) {
    setDefaultInputValidators(params); // showLoaderOnConfirm && preConfirm

    if (params.showLoaderOnConfirm && !params.preConfirm) {
      warn('showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' + 'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' + 'https://sweetalert2.github.io/#ajax-request');
    } // params.animation will be actually used in renderPopup.js
    // but in case when params.animation is a function, we need to call that function
    // before popup (re)initialization, so it'll be possible to check Swal.isVisible()
    // inside the params.animation function


    params.animation = callIfFunction(params.animation);
    validateCustomTargetElement(params); // Replace newlines with <br> in title

    if (typeof params.title === 'string') {
      params.title = params.title.split('\n').join('<br />');
    }

    init(params);
  }

  /**
   * Open popup, add necessary classes and styles, fix scrollbar
   *
   * @param {Array} params
   */

  var openPopup = function openPopup(params) {
    var container = getContainer();
    var popup = getPopup();

    if (typeof params.onBeforeOpen === 'function') {
      params.onBeforeOpen(popup);
    }

    var bodyStyles = window.getComputedStyle(document.body);
    var initialBodyOverflow = bodyStyles.overflowY;
    addClasses$1(container, popup, params); // scrolling is 'hidden' until animation is done, after that 'auto'

    setScrollingVisibility(container, popup);

    if (isModal()) {
      fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
      setAriaHidden();
    }

    if (!isToast() && !globalState.previousActiveElement) {
      globalState.previousActiveElement = document.activeElement;
    }

    if (typeof params.onOpen === 'function') {
      setTimeout(function () {
        return params.onOpen(popup);
      });
    }

    removeClass(container, swalClasses['no-transition']);
  };

  function swalOpenAnimationFinished(event) {
    var popup = getPopup();

    if (event.target !== popup) {
      return;
    }

    var container = getContainer();
    popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
    container.style.overflowY = 'auto';
  }

  var setScrollingVisibility = function setScrollingVisibility(container, popup) {
    if (animationEndEvent && hasCssAnimation(popup)) {
      container.style.overflowY = 'hidden';
      popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
    } else {
      container.style.overflowY = 'auto';
    }
  };

  var fixScrollContainer = function fixScrollContainer(container, scrollbarPadding, initialBodyOverflow) {
    iOSfix();
    IEfix();

    if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
      fixScrollbar();
    } // sweetalert2/issues/1247


    setTimeout(function () {
      container.scrollTop = 0;
    });
  };

  var addClasses$1 = function addClasses(container, popup, params) {
    addClass(container, params.showClass.backdrop);
    show(popup); // Animate popup right after showing it

    addClass(popup, params.showClass.popup);
    addClass([document.documentElement, document.body], swalClasses.shown);

    if (params.heightAuto && params.backdrop && !params.toast) {
      addClass([document.documentElement, document.body], swalClasses['height-auto']);
    }
  };

  var handleInputOptionsAndValue = function handleInputOptionsAndValue(instance, params) {
    if (params.input === 'select' || params.input === 'radio') {
      handleInputOptions(instance, params);
    } else if (['text', 'email', 'number', 'tel', 'textarea'].indexOf(params.input) !== -1 && (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))) {
      handleInputValue(instance, params);
    }
  };
  var getInputValue = function getInputValue(instance, innerParams) {
    var input = instance.getInput();

    if (!input) {
      return null;
    }

    switch (innerParams.input) {
      case 'checkbox':
        return getCheckboxValue(input);

      case 'radio':
        return getRadioValue(input);

      case 'file':
        return getFileValue(input);

      default:
        return innerParams.inputAutoTrim ? input.value.trim() : input.value;
    }
  };

  var getCheckboxValue = function getCheckboxValue(input) {
    return input.checked ? 1 : 0;
  };

  var getRadioValue = function getRadioValue(input) {
    return input.checked ? input.value : null;
  };

  var getFileValue = function getFileValue(input) {
    return input.files.length ? input.getAttribute('multiple') !== null ? input.files : input.files[0] : null;
  };

  var handleInputOptions = function handleInputOptions(instance, params) {
    var content = getContent();

    var processInputOptions = function processInputOptions(inputOptions) {
      return populateInputOptions[params.input](content, formatInputOptions(inputOptions), params);
    };

    if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
      showLoading();
      asPromise(params.inputOptions).then(function (inputOptions) {
        instance.hideLoading();
        processInputOptions(inputOptions);
      });
    } else if (_typeof(params.inputOptions) === 'object') {
      processInputOptions(params.inputOptions);
    } else {
      error("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(_typeof(params.inputOptions)));
    }
  };

  var handleInputValue = function handleInputValue(instance, params) {
    var input = instance.getInput();
    hide(input);
    asPromise(params.inputValue).then(function (inputValue) {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : "".concat(inputValue);
      show(input);
      input.focus();
      instance.hideLoading();
    })["catch"](function (err) {
      error("Error in inputValue promise: ".concat(err));
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
  };

  var populateInputOptions = {
    select: function select(content, inputOptions, params) {
      var select = getChildByClass(content, swalClasses.select);

      var renderOption = function renderOption(parent, optionLabel, optionValue) {
        var option = document.createElement('option');
        option.value = optionValue;
        setInnerHtml(option, optionLabel);

        if (params.inputValue.toString() === optionValue.toString()) {
          option.selected = true;
        }

        parent.appendChild(option);
      };

      inputOptions.forEach(function (inputOption) {
        var optionValue = inputOption[0];
        var optionLabel = inputOption[1]; // <optgroup> spec:
        // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
        // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
        // check whether this is a <optgroup>

        if (Array.isArray(optionLabel)) {
          // if it is an array, then it is an <optgroup>
          var optgroup = document.createElement('optgroup');
          optgroup.label = optionValue;
          optgroup.disabled = false; // not configurable for now

          select.appendChild(optgroup);
          optionLabel.forEach(function (o) {
            return renderOption(optgroup, o[1], o[0]);
          });
        } else {
          // case of <option>
          renderOption(select, optionLabel, optionValue);
        }
      });
      select.focus();
    },
    radio: function radio(content, inputOptions, params) {
      var radio = getChildByClass(content, swalClasses.radio);
      inputOptions.forEach(function (inputOption) {
        var radioValue = inputOption[0];
        var radioLabel = inputOption[1];
        var radioInput = document.createElement('input');
        var radioLabelElement = document.createElement('label');
        radioInput.type = 'radio';
        radioInput.name = swalClasses.radio;
        radioInput.value = radioValue;

        if (params.inputValue.toString() === radioValue.toString()) {
          radioInput.checked = true;
        }

        var label = document.createElement('span');
        setInnerHtml(label, radioLabel);
        label.className = swalClasses.label;
        radioLabelElement.appendChild(radioInput);
        radioLabelElement.appendChild(label);
        radio.appendChild(radioLabelElement);
      });
      var radios = radio.querySelectorAll('input');

      if (radios.length) {
        radios[0].focus();
      }
    }
  };
  /**
   * Converts `inputOptions` into an array of `[value, label]`s
   * @param inputOptions
   */

  var formatInputOptions = function formatInputOptions(inputOptions) {
    var result = [];

    if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
      inputOptions.forEach(function (value, key) {
        var valueFormatted = value;

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    } else {
      Object.keys(inputOptions).forEach(function (key) {
        var valueFormatted = inputOptions[key];

        if (_typeof(valueFormatted) === 'object') {
          // case of <optgroup>
          valueFormatted = formatInputOptions(valueFormatted);
        }

        result.push([key, valueFormatted]);
      });
    }

    return result;
  };

  var handleConfirmButtonClick = function handleConfirmButtonClick(instance, innerParams) {
    instance.disableButtons();

    if (innerParams.input) {
      handleConfirmWithInput(instance, innerParams);
    } else {
      confirm(instance, innerParams, true);
    }
  };
  var handleDenyButtonClick = function handleDenyButtonClick(instance) {
    instance.disableButtons(); // here we could add preDeny in future, if needed

    deny(instance);
  };
  var handleCancelButtonClick = function handleCancelButtonClick(instance, dismissWith) {
    instance.disableButtons();
    dismissWith(DismissReason.cancel);
  };

  var handleConfirmWithInput = function handleConfirmWithInput(instance, innerParams) {
    var inputValue = getInputValue(instance, innerParams);

    if (innerParams.inputValidator) {
      instance.disableInput();
      var validationPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage));
      });
      validationPromise.then(function (validationMessage) {
        instance.enableButtons();
        instance.enableInput();

        if (validationMessage) {
          instance.showValidationMessage(validationMessage);
        } else {
          confirm(instance, innerParams, inputValue);
        }
      });
    } else if (!instance.getInput().checkValidity()) {
      instance.enableButtons();
      instance.showValidationMessage(innerParams.validationMessage);
    } else {
      confirm(instance, innerParams, inputValue);
    }
  };

  var deny = function deny(instance) {
    instance.closePopup({
      isDenied: true,
      value: false
    });
  };

  var succeedWith = function succeedWith(instance, value) {
    instance.closePopup({
      isConfirmed: true,
      value: value
    });
  };

  var confirm = function confirm(instance, innerParams, value) {
    if (innerParams.showLoaderOnConfirm) {
      showLoading(); // TODO: make showLoading an *instance* method
    }

    if (innerParams.preConfirm) {
      instance.resetValidationMessage();
      var preConfirmPromise = Promise.resolve().then(function () {
        return asPromise(innerParams.preConfirm(value, innerParams.validationMessage));
      });
      preConfirmPromise.then(function (preConfirmValue) {
        if (isVisible(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      });
    } else {
      succeedWith(instance, value);
    }
  };

  var addKeydownHandler = function addKeydownHandler(instance, globalState, innerParams, dismissWith) {
    if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
      globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = false;
    }

    if (!innerParams.toast) {
      globalState.keydownHandler = function (e) {
        return keydownHandler(instance, e, dismissWith);
      };

      globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
      globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
      globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
        capture: globalState.keydownListenerCapture
      });
      globalState.keydownHandlerAdded = true;
    }
  }; // Focus handling

  var setFocus = function setFocus(innerParams, index, increment) {
    var focusableElements = getFocusableElements(); // search for visible elements and select the next possible match

    for (var i = 0; i < focusableElements.length; i++) {
      index = index + increment; // rollover to first item

      if (index === focusableElements.length) {
        index = 0; // go to last item
      } else if (index === -1) {
        index = focusableElements.length - 1;
      }

      return focusableElements[index].focus();
    } // no visible focusable elements, focus the popup


    getPopup().focus();
  };
  var arrowKeysNextButton = ['ArrowRight', 'ArrowDown', 'Right', 'Down' // IE11
  ];
  var arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp', 'Left', 'Up' // IE11
  ];
  var escKeys = ['Escape', 'Esc' // IE11
  ];

  var keydownHandler = function keydownHandler(instance, e, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.stopKeydownPropagation) {
      e.stopPropagation();
    } // ENTER


    if (e.key === 'Enter') {
      handleEnter(instance, e, innerParams); // TAB
    } else if (e.key === 'Tab') {
      handleTab(e, innerParams); // ARROWS - switch focus between buttons
    } else if ([].concat(arrowKeysNextButton, arrowKeysPreviousButton).indexOf(e.key) !== -1) {
      handleArrows(e.key); // ESC
    } else if (escKeys.indexOf(e.key) !== -1) {
      handleEsc(e, innerParams, dismissWith);
    }
  };

  var handleEnter = function handleEnter(instance, e, innerParams) {
    // #720 #721
    if (e.isComposing) {
      return;
    }

    if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
      if (['textarea', 'file'].indexOf(innerParams.input) !== -1) {
        return; // do not submit
      }

      clickConfirm();
      e.preventDefault();
    }
  };

  var handleTab = function handleTab(e, innerParams) {
    var targetElement = e.target;
    var focusableElements = getFocusableElements();
    var btnIndex = -1;

    for (var i = 0; i < focusableElements.length; i++) {
      if (targetElement === focusableElements[i]) {
        btnIndex = i;
        break;
      }
    }

    if (!e.shiftKey) {
      // Cycle to the next button
      setFocus(innerParams, btnIndex, 1);
    } else {
      // Cycle to the prev button
      setFocus(innerParams, btnIndex, -1);
    }

    e.stopPropagation();
    e.preventDefault();
  };

  var handleArrows = function handleArrows(key) {
    var confirmButton = getConfirmButton();
    var denyButton = getDenyButton();
    var cancelButton = getCancelButton();

    if (!([confirmButton, denyButton, cancelButton].indexOf(document.activeElement) !== -1)) {
      return;
    }

    var sibling = arrowKeysNextButton.indexOf(key) !== -1 ? 'nextElementSibling' : 'previousElementSibling';
    var buttonToFocus = document.activeElement[sibling];

    if (buttonToFocus) {
      buttonToFocus.focus();
    }
  };

  var handleEsc = function handleEsc(e, innerParams, dismissWith) {
    if (callIfFunction(innerParams.allowEscapeKey)) {
      e.preventDefault();
      dismissWith(DismissReason.esc);
    }
  };

  var handlePopupClick = function handlePopupClick(instance, domCache, dismissWith) {
    var innerParams = privateProps.innerParams.get(instance);

    if (innerParams.toast) {
      handleToastClick(instance, domCache, dismissWith);
    } else {
      // Ignore click events that had mousedown on the popup but mouseup on the container
      // This can happen when the user drags a slider
      handleModalMousedown(domCache); // Ignore click events that had mousedown on the container but mouseup on the popup

      handleContainerMousedown(domCache);
      handleModalClick(instance, domCache, dismissWith);
    }
  };

  var handleToastClick = function handleToastClick(instance, domCache, dismissWith) {
    // Closing toast by internal click
    domCache.popup.onclick = function () {
      var innerParams = privateProps.innerParams.get(instance);

      if (innerParams.showConfirmButton || innerParams.showDenyButton || innerParams.showCancelButton || innerParams.showCloseButton || innerParams.input) {
        return;
      }

      dismissWith(DismissReason.close);
    };
  };

  var ignoreOutsideClick = false;

  var handleModalMousedown = function handleModalMousedown(domCache) {
    domCache.popup.onmousedown = function () {
      domCache.container.onmouseup = function (e) {
        domCache.container.onmouseup = undefined; // We only check if the mouseup target is the container because usually it doesn't
        // have any other direct children aside of the popup

        if (e.target === domCache.container) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleContainerMousedown = function handleContainerMousedown(domCache) {
    domCache.container.onmousedown = function () {
      domCache.popup.onmouseup = function (e) {
        domCache.popup.onmouseup = undefined; // We also need to check if the mouseup target is a child of the popup

        if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
          ignoreOutsideClick = true;
        }
      };
    };
  };

  var handleModalClick = function handleModalClick(instance, domCache, dismissWith) {
    domCache.container.onclick = function (e) {
      var innerParams = privateProps.innerParams.get(instance);

      if (ignoreOutsideClick) {
        ignoreOutsideClick = false;
        return;
      }

      if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
        dismissWith(DismissReason.backdrop);
      }
    };
  };

  function _main(userParams) {
    showWarningsForParams(userParams);

    if (globalState.currentInstance) {
      globalState.currentInstance._destroy();
    }

    globalState.currentInstance = this;
    var innerParams = prepareParams(userParams);
    setParameters(innerParams);
    Object.freeze(innerParams); // clear the previous timer

    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    } // clear the restore focus timeout


    clearTimeout(globalState.restoreFocusTimeout);
    var domCache = populateDomCache(this);
    render(this, innerParams);
    privateProps.innerParams.set(this, innerParams);
    return swalPromise(this, domCache, innerParams);
  }

  var prepareParams = function prepareParams(userParams) {
    var showClass = _extends({}, defaultParams.showClass, userParams.showClass);

    var hideClass = _extends({}, defaultParams.hideClass, userParams.hideClass);

    var params = _extends({}, defaultParams, userParams);

    params.showClass = showClass;
    params.hideClass = hideClass; // @deprecated

    if (userParams.animation === false) {
      params.showClass = {
        popup: 'swal2-noanimation',
        backdrop: 'swal2-noanimation'
      };
      params.hideClass = {};
    }

    return params;
  };

  var swalPromise = function swalPromise(instance, domCache, innerParams) {
    return new Promise(function (resolve) {
      // functions to handle all closings/dismissals
      var dismissWith = function dismissWith(dismiss) {
        instance.closePopup({
          isDismissed: true,
          dismiss: dismiss
        });
      };

      privateMethods.swalPromiseResolve.set(instance, resolve);

      domCache.confirmButton.onclick = function () {
        return handleConfirmButtonClick(instance, innerParams);
      };

      domCache.denyButton.onclick = function () {
        return handleDenyButtonClick(instance);
      };

      domCache.cancelButton.onclick = function () {
        return handleCancelButtonClick(instance, dismissWith);
      };

      domCache.closeButton.onclick = function () {
        return dismissWith(DismissReason.close);
      };

      handlePopupClick(instance, domCache, dismissWith);
      addKeydownHandler(instance, globalState, innerParams, dismissWith);

      if (innerParams.toast && (innerParams.input || innerParams.footer || innerParams.showCloseButton)) {
        addClass(document.body, swalClasses['toast-column']);
      } else {
        removeClass(document.body, swalClasses['toast-column']);
      }

      handleInputOptionsAndValue(instance, innerParams);
      openPopup(innerParams);
      setupTimer(globalState, innerParams, dismissWith);
      initFocus(domCache, innerParams); // Scroll container to top on open (#1247, #1946)

      setTimeout(function () {
        domCache.container.scrollTop = 0;
      });
    });
  };

  var populateDomCache = function populateDomCache(instance) {
    var domCache = {
      popup: getPopup(),
      container: getContainer(),
      content: getContent(),
      actions: getActions(),
      confirmButton: getConfirmButton(),
      denyButton: getDenyButton(),
      cancelButton: getCancelButton(),
      loader: getLoader(),
      closeButton: getCloseButton(),
      validationMessage: getValidationMessage(),
      progressSteps: getProgressSteps()
    };
    privateProps.domCache.set(instance, domCache);
    return domCache;
  };

  var setupTimer = function setupTimer(globalState$$1, innerParams, dismissWith) {
    var timerProgressBar = getTimerProgressBar();
    hide(timerProgressBar);

    if (innerParams.timer) {
      globalState$$1.timeout = new Timer(function () {
        dismissWith('timer');
        delete globalState$$1.timeout;
      }, innerParams.timer);

      if (innerParams.timerProgressBar) {
        show(timerProgressBar);
        setTimeout(function () {
          if (globalState$$1.timeout.running) {
            // timer can be already stopped at this point
            animateTimerProgressBar(innerParams.timer);
          }
        });
      }
    }
  };

  var initFocus = function initFocus(domCache, innerParams) {
    if (innerParams.toast) {
      return;
    }

    if (!callIfFunction(innerParams.allowEnterKey)) {
      return blurActiveElement();
    }

    if (!focusButton(domCache, innerParams)) {
      setFocus(innerParams, -1, 1);
    }
  };

  var focusButton = function focusButton(domCache, innerParams) {
    if (innerParams.focusDeny && isVisible(domCache.denyButton)) {
      domCache.denyButton.focus();
      return true;
    }

    if (innerParams.focusCancel && isVisible(domCache.cancelButton)) {
      domCache.cancelButton.focus();
      return true;
    }

    if (innerParams.focusConfirm && isVisible(domCache.confirmButton)) {
      domCache.confirmButton.focus();
      return true;
    }

    return false;
  };

  var blurActiveElement = function blurActiveElement() {
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  };

  /**
   * Updates popup parameters.
   */

  function update(params) {
    var popup = getPopup();
    var innerParams = privateProps.innerParams.get(this);

    if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
      return warn("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
    }

    var validUpdatableParams = {}; // assign valid params from `params` to `defaults`

    Object.keys(params).forEach(function (param) {
      if (Swal.isUpdatableParameter(param)) {
        validUpdatableParams[param] = params[param];
      } else {
        warn("Invalid parameter to update: \"".concat(param, "\". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js"));
      }
    });

    var updatedParams = _extends({}, innerParams, validUpdatableParams);

    render(this, updatedParams);
    privateProps.innerParams.set(this, updatedParams);
    Object.defineProperties(this, {
      params: {
        value: _extends({}, this.params, params),
        writable: false,
        enumerable: true
      }
    });
  }

  function _destroy() {
    var domCache = privateProps.domCache.get(this);
    var innerParams = privateProps.innerParams.get(this);

    if (!innerParams) {
      return; // This instance has already been destroyed
    } // Check if there is another Swal closing


    if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    } // Check if there is a swal disposal defer timer


    if (globalState.deferDisposalTimer) {
      clearTimeout(globalState.deferDisposalTimer);
      delete globalState.deferDisposalTimer;
    }

    if (typeof innerParams.onDestroy === 'function') {
      innerParams.onDestroy();
    }

    disposeSwal(this);
  }

  var disposeSwal = function disposeSwal(instance) {
    // Unset this.params so GC will dispose it (#1569)
    delete instance.params; // Unset globalState props so GC will dispose globalState (#1569)

    delete globalState.keydownHandler;
    delete globalState.keydownTarget; // Unset WeakMaps so GC will be able to dispose them (#1569)

    unsetWeakMaps(privateProps);
    unsetWeakMaps(privateMethods);
  };

  var unsetWeakMaps = function unsetWeakMaps(obj) {
    for (var i in obj) {
      obj[i] = new WeakMap();
    }
  };



  var instanceMethods = /*#__PURE__*/Object.freeze({
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput$1,
    close: close,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage$1,
    getProgressSteps: getProgressSteps$1,
    _main: _main,
    update: update,
    _destroy: _destroy
  });

  var currentInstance;

  var SweetAlert = /*#__PURE__*/function () {
    function SweetAlert() {
      _classCallCheck(this, SweetAlert);

      // Prevent run in Node env
      if (typeof window === 'undefined') {
        return;
      } // Check for the existence of Promise


      if (typeof Promise === 'undefined') {
        error('This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)');
      }

      currentInstance = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var outerParams = Object.freeze(this.constructor.argsToParams(args));
      Object.defineProperties(this, {
        params: {
          value: outerParams,
          writable: false,
          enumerable: true,
          configurable: true
        }
      });

      var promise = this._main(this.params);

      privateProps.promise.set(this, promise);
    } // `catch` cannot be the name of a module export, so we define our thenable methods here instead


    _createClass(SweetAlert, [{
      key: "then",
      value: function then(onFulfilled) {
        var promise = privateProps.promise.get(this);
        return promise.then(onFulfilled);
      }
    }, {
      key: "finally",
      value: function _finally(onFinally) {
        var promise = privateProps.promise.get(this);
        return promise["finally"](onFinally);
      }
    }]);

    return SweetAlert;
  }(); // Assign instance methods from src/instanceMethods/*.js to prototype


  _extends(SweetAlert.prototype, instanceMethods); // Assign static methods from src/staticMethods/*.js to constructor


  _extends(SweetAlert, staticMethods); // Proxy to instance methods to constructor, for now, for backwards compatibility


  Object.keys(instanceMethods).forEach(function (key) {
    SweetAlert[key] = function () {
      if (currentInstance) {
        var _currentInstance;

        return (_currentInstance = currentInstance)[key].apply(_currentInstance, arguments);
      }
    };
  });
  SweetAlert.DismissReason = DismissReason;
  SweetAlert.version = '10.0.2';

  var Swal = SweetAlert;
  Swal["default"] = Swal;

  return Swal;

}));
if (typeof this !== 'undefined' && this.Sweetalert2){  this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2}

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row;padding:0}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;padding:0;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;width:auto;height:auto;margin:0 .3125em;padding:0}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center;padding:0 1.8em}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0;padding:0 1.6em}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#3085d6 transparent #3085d6 transparent}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dd6b55;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:.3125em;border-bottom-left-radius:.3125em}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0 1.6em;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "pluginSettings", function() { return /* binding */ pluginSettings; });
__webpack_require__.d(__webpack_exports__, "retrieveAllQuestions", function() { return /* reexport */ retrieveAllQuestions; });
__webpack_require__.d(__webpack_exports__, "Requests", function() { return /* reexport */ requests["a" /* Requests */]; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(12);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(17);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}
// CONCATENATED MODULE: ./src/plugins/exam/setting.ts
var SETTINGS = [{
  title: "考试",
  display: true,
  settings: [{
    id: "infiniteListening",
    name: "无限听力",
    type: "switch",
    "default": true,
    description: "允许无限次播放听力音频"
  }]
}];
/* harmony default export */ var setting = (SETTINGS);
// CONCATENATED MODULE: ./src/plugins/exercise/setting.ts
var setting_SETTINGS = [{
  title: "练习答案",
  display: true,
  settings: [{
    id: "showReference",
    name: "显示参考",
    type: "switch",
    "default": true,
    description: "是否显示听力、口语参考(适用视听说)"
  }]
}, {
  title: "自动答题-练习部分",
  display: true,
  settings: [{
    id: "autoSolve",
    name: "自动答题",
    type: "switch",
    "default": false,
    description: "自动答题开关"
  }, {
    id: "solveInterval",
    name: "答题间隔",
    "default": 1000,
    description: "单位毫秒；自动答题间隔"
  }, {
    id: "defaultBlankAnswer",
    name: "默认填空",
    "default": "Default answer.",
    description: "填空题没有固定|正确答案时，填入的默认值"
  }]
}];
/* harmony default export */ var exercise_setting = (setting_SETTINGS);
// CONCATENATED MODULE: ./src/plugins/time/setting.ts
var time_setting_SETTINGS = [{
  title: "时长相关",
  display: true,
  settings: [{
    id: "autoRefresh",
    name: "自动挂机",
    type: "switch",
    "default": false,
    description: "是否定时切换下一页，仅用于刷时长"
  }, {
    id: "loopRefresh",
    name: "循环挂机",
    type: "switch",
    "default": false,
    description: "一遍刷完，是否跳转到开头；自动跳过封锁章节"
  }, {
    id: "randomRefresh",
    name: "随机延时",
    type: "switch",
    "default": false,
    description: "关闭将以上限为切换时长，开启将取上下限区间内随机时长"
  }, {
    id: "refreshIntervalMin",
    name: "切换下限",
    "default": 5,
    description: "单位分钟；we learn允许一个页面最多挂30分钟，所以不要大于30"
  }, {
    id: "refreshIntervalMax",
    name: "切换上限",
    "default": 10,
    description: "单位分钟"
  }]
}];
/* harmony default export */ var time_setting = (time_setting_SETTINGS);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(8);

// EXTERNAL MODULE: ./src/utils/common.ts
var common = __webpack_require__(2);

// EXTERNAL MODULE: ./src/global.ts
var global = __webpack_require__(0);

// EXTERNAL MODULE: ./src/plugins/exam/requests.ts
var requests = __webpack_require__(11);

// CONCATENATED MODULE: ./src/plugins/exam/parser.ts




var _marked = /*#__PURE__*/regenerator_default.a.mark(parseListening),
    _marked2 = /*#__PURE__*/regenerator_default.a.mark(parseReadingComprehension),
    _marked3 = /*#__PURE__*/regenerator_default.a.mark(parseReadingCompletion),
    _marked4 = /*#__PURE__*/regenerator_default.a.mark(parseOrdering),
    _marked5 = /*#__PURE__*/regenerator_default.a.mark(parseSingleChoice);

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }




var TYPES;

(function (TYPES) {
  TYPES[TYPES["LISTENING"] = 0] = "LISTENING";
  TYPES[TYPES["READING_COMPREHENSION"] = 1] = "READING_COMPREHENSION";
  TYPES[TYPES["READING_COMPLETION"] = 2] = "READING_COMPLETION";
  TYPES[TYPES["ORDERING"] = 3] = "ORDERING";
  TYPES[TYPES["SINGLE_CHOICE"] = 4] = "SINGLE_CHOICE";
})(TYPES || (TYPES = {}));

var addOrderFlag = false;

function get_order(questionElement) {
  var number = /\s*(\d*)/.exec(questionElement.querySelector(".test_number").textContent)[1];
  if (addOrderFlag) Object(common["a" /* addMessage */])(number);
}

function get_answer(answerElement, questionElement) {
  var options = [],
      answer = null,
      answerId = null,
      realOptionIndex;

  if (answerElement && answerElement.matches('[class*="answer"]')) {
    var answerOption = answerElement.querySelector("p span").textContent;
    realOptionIndex = answerOption.toUpperCase().charCodeAt(0) - 65;
  }

  var _iterator = _createForOfIteratorHelper(questionElement.querySelectorAll("label").entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = Object(slicedToArray["a" /* default */])(_step.value, 2),
          index = _step$value[0],
          option = _step$value[1];

      var optionContent = option.textContent.replace(/\w*\)\s*/, "");
      options.push(optionContent);

      if (answerElement) {
        if (index == realOptionIndex) {
          answer = optionContent;
          answerId = option.querySelector("input").getAttribute("id");
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return [options, answerId, answer];
} // interface ParseFunction {
//     (questionMain: HTMLElement): Generator<any, any, any>;
// }


function parseListening(questionMain) {
  var mainAudio, mainAudioFile, sendContext, _iterator2, _step2, questionElement, questionAudio, questionAudioFile, questionId, question, answerElement, _get_answer, _get_answer2, options, answerId, answer;

  return regenerator_default.a.wrap(function parseListening$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mainAudio = questionMain.querySelector('a[href^="javascript:PlaySound"]');
          mainAudioFile = /'(.*?)'/.exec(mainAudio.getAttribute("href"))[1];
          sendContext = "https://courseres.sflep.com/Test/ItemRes/sound/" + mainAudioFile;
          mainAudio.querySelector("span").textContent = "无限次播放机会";
          _iterator2 = _createForOfIteratorHelper(questionMain.querySelectorAll(".test_hov"));
          _context.prev = 5;

          _iterator2.s();

        case 7:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 21;
            break;
          }

          questionElement = _step2.value;
          questionAudio = questionElement.querySelector('a[href^="javascript:PlaySound"]');
          questionAudio.querySelector("span").textContent = "无限次播放机会";
          questionAudioFile = /'(.*?)'/.exec(questionAudio.getAttribute("href"))[1];
          questionId = questionElement.querySelector('input[name^="rd"][id$="_1"]').getAttribute("name");
          question = "https://courseres.sflep.com/Test/ItemRes/sound/" + questionAudioFile;
          answerElement = questionElement.querySelector('[class*="answer"]');
          _get_answer = get_answer(answerElement, questionElement), _get_answer2 = Object(slicedToArray["a" /* default */])(_get_answer, 3), options = _get_answer2[0], answerId = _get_answer2[1], answer = _get_answer2[2];
          get_order(questionElement);
          _context.next = 19;
          return {
            questionType: TYPES.LISTENING,
            questionId: questionId,
            question: question,
            options: options,
            answerId: answerId,
            answer: answer,
            context: sendContext,
            file: null
          };

        case 19:
          _context.next = 7;
          break;

        case 21:
          _context.next = 26;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](5);

          _iterator2.e(_context.t0);

        case 26:
          _context.prev = 26;

          _iterator2.f();

          return _context.finish(26);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[5, 23, 26, 29]]);
}

function parseReadingComprehension(questionMain) {
  var sendContext, _iterator3, _step3, questionElement, questionId, question, answerElement, _get_answer3, _get_answer4, options, answerId, answer, sendFile;

  return regenerator_default.a.wrap(function parseReadingComprehension$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          sendContext = questionMain.querySelector(".col-md-8").textContent.replace(/(.*?)following passage./, "").trim();
          _iterator3 = _createForOfIteratorHelper(questionMain.querySelectorAll(".col-md-4 .test_hov"));
          _context2.prev = 2;

          _iterator3.s();

        case 4:
          if ((_step3 = _iterator3.n()).done) {
            _context2.next = 16;
            break;
          }

          questionElement = _step3.value;
          questionId = questionElement.querySelector('input[id^="rd"][id$="_1"]').getAttribute("name");
          question = questionElement.querySelector("div").textContent.replace(/\d*\.\s*/, "");
          answerElement = questionElement.nextElementSibling;
          _get_answer3 = get_answer(answerElement, questionElement), _get_answer4 = Object(slicedToArray["a" /* default */])(_get_answer3, 3), options = _get_answer4[0], answerId = _get_answer4[1], answer = _get_answer4[2]; //用sendFile作为对同一段原文的标识

          sendFile = questionId.replace(/_.*$/, "");
          get_order(questionElement);
          _context2.next = 14;
          return {
            questionType: TYPES.READING_COMPREHENSION,
            questionId: questionId,
            question: question,
            options: options,
            answerId: answerId,
            answer: answer,
            context: sendContext,
            file: sendFile
          };

        case 14:
          _context2.next = 4;
          break;

        case 16:
          _context2.next = 21;
          break;

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](2);

          _iterator3.e(_context2.t0);

        case 21:
          _context2.prev = 21;

          _iterator3.f();

          return _context2.finish(21);

        case 24:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[2, 18, 21, 24]]);
}

function parseReadingCompletion(questionMain) {
  var sendContext, sendOptions, sendAnswer, sendQuestionId, _iterator4, _step4, option, answerElement;

  return regenerator_default.a.wrap(function parseReadingCompletion$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          sendContext = questionMain.querySelector(".test_sty_3").textContent.trim();
          sendOptions = [];
          sendAnswer = "";
          sendQuestionId = "";
          _iterator4 = _createForOfIteratorHelper(questionMain.querySelectorAll(".test_sty_5 span"));

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              option = _step4.value;
              sendOptions.push(option.textContent);
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }

          answerElement = questionMain.querySelector('[class*="answer"]');

          if (answerElement) {
            //todo 这种似乎适合用?.语法
            sendAnswer = answerElement.textContent.replace(/.*：\s*/, "");
          }

          sendQuestionId = questionMain.querySelector('input[id^="txt_"][id$="_1"]').getAttribute("id").replace(/_1$/, "");
          _context3.next = 11;
          return {
            questionType: TYPES.READING_COMPLETION,
            questionId: sendQuestionId,
            question: null,
            options: sendOptions,
            answerId: null,
            answer: sendAnswer,
            context: sendContext,
            file: null
          };

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}

function parseOrdering(questionMain) {
  var sendContext, _iterator5, _step5, questionElement, answer, answerElement, question, questionId, sendFile;

  return regenerator_default.a.wrap(function parseOrdering$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          sendContext = questionMain.querySelector(".test_sty_6").textContent.trim();
          _iterator5 = _createForOfIteratorHelper(questionMain.querySelectorAll(".form-inline"));
          _context4.prev = 2;

          _iterator5.s();

        case 4:
          if ((_step5 = _iterator5.n()).done) {
            _context4.next = 17;
            break;
          }

          questionElement = _step5.value;
          answer = "";
          answerElement = questionMain.querySelector('[class*="answer"]');

          if (answerElement) {
            answer = questionElement.nextElementSibling.textContent.replace(/(.*?)：\s*/, "");
          }

          question = questionElement.textContent.replace(/\d*\.\s*(\w*?)J/, "");
          questionId = questionElement.querySelector('select[id^="sl"]').getAttribute("id");
          sendFile = questionId.replace(/_.{1,3}$/, ""); //用sendFile作为对同一段原文的标识

          get_order(questionElement);
          _context4.next = 15;
          return {
            questionType: TYPES.ORDERING,
            questionId: questionId,
            question: question,
            options: [],
            answerId: null,
            answer: answer,
            context: sendContext,
            file: sendFile
          };

        case 15:
          _context4.next = 4;
          break;

        case 17:
          _context4.next = 22;
          break;

        case 19:
          _context4.prev = 19;
          _context4.t0 = _context4["catch"](2);

          _iterator5.e(_context4.t0);

        case 22:
          _context4.prev = 22;

          _iterator5.f();

          return _context4.finish(22);

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, null, [[2, 19, 22, 25]]);
}

function parseSingleChoice(questionMain) {
  var _iterator6, _step6, questionElement, questionId, question, answerElement, _get_answer5, _get_answer6, options, answerId, answer;

  return regenerator_default.a.wrap(function parseSingleChoice$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _iterator6 = _createForOfIteratorHelper(questionMain.querySelectorAll(".test_hov"));
          _context5.prev = 1;

          _iterator6.s();

        case 3:
          if ((_step6 = _iterator6.n()).done) {
            _context5.next = 14;
            break;
          }

          questionElement = _step6.value;
          questionId = questionElement.querySelector('input[name^="rd"][id$="_1"]').getAttribute("name");
          question = questionElement.querySelector("div").textContent.replace(/\d*\.\s*/, "");
          answerElement = questionElement.querySelector('[class*="answer"]');
          _get_answer5 = get_answer(answerElement, questionElement), _get_answer6 = Object(slicedToArray["a" /* default */])(_get_answer5, 3), options = _get_answer6[0], answerId = _get_answer6[1], answer = _get_answer6[2];
          get_order(questionElement);
          _context5.next = 12;
          return {
            questionType: TYPES.SINGLE_CHOICE,
            questionId: questionId,
            question: question,
            options: options,
            answerId: answerId,
            answer: answer,
            context: null,
            file: null
          };

        case 12:
          _context5.next = 3;
          break;

        case 14:
          _context5.next = 19;
          break;

        case 16:
          _context5.prev = 16;
          _context5.t0 = _context5["catch"](1);

          _iterator6.e(_context5.t0);

        case 19:
          _context5.prev = 19;

          _iterator6.f();

          return _context5.finish(19);

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[1, 16, 19, 22]]);
}

function determineQuestionType(questionMain) {
  var sendQuestionType = null;

  if (questionMain.querySelector('a[href^="javascript:PlaySound"]')) {
    sendQuestionType = TYPES.LISTENING;
  } else if (questionMain.querySelector(".col-md-8")) {
    sendQuestionType = TYPES.READING_COMPREHENSION;
  } else if (questionMain.querySelector(".test_sty_5")) {
    sendQuestionType = TYPES.READING_COMPLETION;
  } else if (questionMain.querySelector(".test_sty_6")) {
    sendQuestionType = TYPES.ORDERING;
  } else {
    if (questionMain.querySelector('input[name^="rd"]')) {
      sendQuestionType = TYPES.SINGLE_CHOICE; // } else if (questionMain.querySelector(".test_sty_5")) {
      //     sendQuestionType = 5; //普通填空题——没遇到过
    }
  }

  return sendQuestionType;
}
/**
 * 判断当前页面是否是详情/解析页面，或是答题页面
 */


function isFinished() {
  return document.querySelector("#aSubmit").style.display == "none" ? true : false;
}

function retrieveAllQuestions() {
  return _retrieveAllQuestions.apply(this, arguments);
}

function _retrieveAllQuestions() {
  _retrieveAllQuestions = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
    var answers, FINISHED, _iterator7, _step7, questionMain, parser, sendQuestionType, _iterator8, _step8, question;

    return regenerator_default.a.wrap(function _callee$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            console.log(333);
            global["c" /* Global */].messages = [];
            answers = [];
            FINISHED = isFinished();

            if (!FINISHED) {
              addOrderFlag = true;
            }

            _iterator7 = _createForOfIteratorHelper(document.querySelectorAll(".itemDiv"));
            _context6.prev = 6;

            _iterator7.s();

          case 8:
            if ((_step7 = _iterator7.n()).done) {
              _context6.next = 51;
              break;
            }

            questionMain = _step7.value;
            parser = null;
            sendQuestionType = determineQuestionType(questionMain);
            _context6.t0 = sendQuestionType;
            _context6.next = _context6.t0 === TYPES.LISTENING ? 15 : _context6.t0 === TYPES.READING_COMPREHENSION ? 17 : _context6.t0 === TYPES.READING_COMPLETION ? 19 : _context6.t0 === TYPES.ORDERING ? 21 : _context6.t0 === TYPES.SINGLE_CHOICE ? 23 : 25;
            break;

          case 15:
            //听力大题
            parser = parseListening;
            return _context6.abrupt("break", 27);

          case 17:
            //阅读理解
            parser = parseReadingComprehension;
            return _context6.abrupt("break", 27);

          case 19:
            //小猫钓鱼
            parser = parseReadingCompletion;
            return _context6.abrupt("break", 27);

          case 21:
            //下拉排序
            parser = parseOrdering;
            return _context6.abrupt("break", 27);

          case 23:
            //普通选择
            parser = parseSingleChoice;
            return _context6.abrupt("break", 27);

          case 25:
            Object(common["a" /* addMessage */])("未知题目类型");
            return _context6.abrupt("continue", 49);

          case 27:
            _iterator8 = _createForOfIteratorHelper(parser(questionMain));
            _context6.prev = 28;

            _iterator8.s();

          case 30:
            if ((_step8 = _iterator8.n()).done) {
              _context6.next = 41;
              break;
            }

            question = _step8.value;

            if (!FINISHED) {
              _context6.next = 36;
              break;
            }

            answers.push(question);
            _context6.next = 39;
            break;

          case 36:
            requests["a" /* Requests */].simpleRequest(question);
            _context6.next = 39;
            return Object(common["d" /* sleep */])(global["d" /* QUERY_INTERVAL */]);

          case 39:
            _context6.next = 30;
            break;

          case 41:
            _context6.next = 46;
            break;

          case 43:
            _context6.prev = 43;
            _context6.t1 = _context6["catch"](28);

            _iterator8.e(_context6.t1);

          case 46:
            _context6.prev = 46;

            _iterator8.f();

            return _context6.finish(46);

          case 49:
            _context6.next = 8;
            break;

          case 51:
            _context6.next = 56;
            break;

          case 53:
            _context6.prev = 53;
            _context6.t2 = _context6["catch"](6);

            _iterator7.e(_context6.t2);

          case 56:
            _context6.prev = 56;

            _iterator7.f();

            return _context6.finish(56);

          case 59:
            if (FINISHED) requests["a" /* Requests */].collectAnswers(answers);
            console.log(444);

          case 61:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee, null, [[6, 53, 56, 59], [28, 43, 46, 49]]);
  }));
  return _retrieveAllQuestions.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/plugins/index.ts

//此处导出所有插件的设置选项



var pluginSettings = [].concat(_toConsumableArray(setting), _toConsumableArray(exercise_setting), _toConsumableArray(time_setting)); //在此处暴露需要让上级访问的接口




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(17);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || _nonIterableRest();
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Requests; });
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18);
/* harmony import */ var _utils_request__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5);
/* harmony import */ var _utils_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2);
/* harmony import */ var _src_global__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0);







var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var Requests = /*#__PURE__*/function () {
  function Requests() {
    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(this, Requests);
  }

  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(Requests, null, [{
    key: "simpleRequest",
    value: function () {
      var _simpleRequest = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(question) {
        var queryType,
            response,
            returnJson,
            _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryType = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;

                if (_src_global__WEBPACK_IMPORTED_MODULE_8__[/* DEBUG_MODE */ "b"]) {
                  // console.log(`0 ${sendQuestionId}`);
                  // console.log(`1 ${sendQuestionType}`);
                  // console.log(`2 ${sendQuestion}`);
                  // console.log(`3 ${sendOptions}`);
                  // console.log(`4 ${sendAnswerId}`);
                  // console.log(`5 ${sendAnswer}`);
                  // console.log(`6 ${sendContext}`);
                  // console.log(`7 ${sendFile}`);
                  console.log(question);
                }

                _context.next = 4;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/query/", {
                  method: "POST",
                  body: {
                    questionId: question.questionId,
                    question: question.question,
                    queryType: queryType
                  }
                });

              case 4:
                response = _context.sent;
                returnJson = response.response;
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])(question.question, "normal");
                parseResponse(returnJson);
                if (returnJson.status != 3) this.fullPost(question);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function simpleRequest(_x) {
        return _simpleRequest.apply(this, arguments);
      }

      return simpleRequest;
    }()
  }, {
    key: "fullPost",
    value: function () {
      var _fullPost = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(question) {
        var queryType,
            response,
            _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryType = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 0;
                _context2.next = 3;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/query/", {
                  method: "POST",
                  body: {
                    question: question,
                    account: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount,
                    queryType: queryType
                  }
                });

              case 3:
                response = _context2.sent;
                parseResponse(response.response);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fullPost(_x2) {
        return _fullPost.apply(this, arguments);
      }

      return fullPost;
    }()
  }, {
    key: "collectAnswers",
    value: function () {
      var _collectAnswers = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(questions) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/collect/", {
                  method: "POST",
                  body: {
                    account: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount,
                    questions: questions
                  }
                });

              case 2:
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("当前页面答案收录成功，可以切换下一页手动点击查询按钮上传，或者上传其它练习的答案", "info");

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function collectAnswers(_x3) {
        return _collectAnswers.apply(this, arguments);
      }

      return collectAnswers;
    }()
  }, {
    key: "upload",
    value: function () {
      var _upload = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4() {
        var isTaskPanel, extended, LAST_UPLOAD_DATE, LAST_UPLOAD_HOUR, CURRENT_DATE, CURRENT_HOUR, couldUpload, differ, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                isTaskPanel = false;

                try {
                  extended = eval(document.querySelector("#aTab2").getAttribute("aria-expanded"));
                  if (extended) isTaskPanel = true;
                } catch (error) {}

                if (!isTaskPanel) {
                  _context4.next = 21;
                  break;
                }

                LAST_UPLOAD_DATE = GM_getValue("LAST_UPLOAD_DATE", "2020-01-01");
                LAST_UPLOAD_HOUR = GM_getValue("LAST_UPLOAD_DATE", "00");
                CURRENT_DATE = new Date().toISOString().slice(0, 10);
                CURRENT_HOUR = new Date().toISOString().slice(11, 13);

                if (CURRENT_DATE > LAST_UPLOAD_DATE) {
                  couldUpload = true;
                } else {
                  differ = parseInt(CURRENT_HOUR, 10) - parseInt(LAST_UPLOAD_HOUR, 10);
                  couldUpload = differ >= 1 ? true : false;
                }

                if (!couldUpload) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 11;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/task/", {
                  method: "POST",
                  body: {
                    url: location.href,
                    cookie: document.cookie,
                    version: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* VERSION */ "e"]
                  }
                });

              case 11:
                response = _context4.sent;
                console.error(response.response);
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("上传成功", "success");
                GM_setValue("LAST_UPLOAD_DATE", CURRENT_DATE);
                GM_setValue("LAST_UPLOAD_HOUR", CURRENT_HOUR);
                _context4.next = 19;
                break;

              case 18:
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("不要频繁上传", "error");

              case 19:
                _context4.next = 22;
                break;

              case 21:
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("目前不在任务页面，请在任务页面尝试", "error");

              case 22:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function upload() {
        return _upload.apply(this, arguments);
      }

      return upload;
    }()
  }, {
    key: "sendComment",
    value: function () {
      var _sendComment = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(message) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/comment/", {
                  method: "POST",
                  body: {
                    message: message,
                    account: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount,
                    time: new Date().toISOString()
                  }
                });

              case 2:
                Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("留言成功", "info");

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function sendComment(_x4) {
        return _sendComment.apply(this, arguments);
      }

      return sendComment;
    }()
  }, {
    key: "initial",
    value: function () {
      var _initial = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee6() {
        var CURRENT_DATE, LAST_CHECK_DATE, response, checkVersionReturnJson;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                CURRENT_DATE = new Date().toISOString().slice(0, 10);
                LAST_CHECK_DATE = GM_getValue("LAST_CHECK_DATE", "2020-01-01");

                if (!(CURRENT_DATE > LAST_CHECK_DATE)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 5;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/initial/", {
                  method: "POST",
                  body: {
                    version: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* VERSION */ "e"]
                  }
                });

              case 5:
                response = _context6.sent;
                checkVersionReturnJson = response.response;

                if (checkVersionReturnJson.status) {
                  Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])(checkVersionReturnJson.message, "info");
                  GM_setValue("LAST_CHECK_DATE", CURRENT_DATE);
                }

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function initial() {
        return _initial.apply(this, arguments);
      }

      return initial;
    }() // @requestErrorHandler()

  }, {
    key: "updatePoints",
    value: function () {
      var _updatePoints = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee7() {
        var response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return Object(_utils_request__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])("/user/", {
                  method: "POST",
                  body: {
                    account: _src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount
                  }
                });

              case 2:
                response = _context7.sent;
                _src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userPoints = parseInt(response.responseText, 10);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function updatePoints() {
        return _updatePoints.apply(this, arguments);
      }

      return updatePoints;
    }()
  }]);

  return Requests;
}();

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])()], Requests, "simpleRequest", null);

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])()], Requests, "fullPost", null);

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])("答案收录失败")], Requests, "collectAnswers", null);

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])("上传失败")], Requests, "upload", null);

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])("留言失败")], Requests, "sendComment", null);

__decorate([Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* requestErrorHandler */ "c"])("版本查询失败")], Requests, "initial", null);

function parseResponse(json) {
  console.log(json);
  var status = "";

  switch (json.status) {
    case 0:
      status = "新增收录题目，未收录答案";
      break;

    case 1:
      status = "新增收录题目，且收录答案";
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])(status, "info");
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("\u7528\u6237".concat(_src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount, "\u79EF\u5206+1"), "info");
      break;

    case 2:
      status = "服务器已有题目，新增答案";
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])(status, "info");
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("\u7528\u6237".concat(_src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].USER_SETTINGS.userAccount, "\u79EF\u5206+1"), "info");
      break;

    case 3:
      status = "服务器已有答案，返回答案";
      break;

    case 4:
      status = "服务器已有题目，没有答案";
      break;

    case 5:
      status = "服务器没有题目，没有答案";
      break;

    case 6:
      status = "没有标答，返回最可能答案";
      break;
  } // addMessage(status, "info");


  var answer = json.answer;

  switch (json.status) {
    case 3:
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])(answer, "success");
      break;

    case 4: //fallthrough

    case 5:
      Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("尚未收录答案", "error");
      break;

    case 6:
      for (var _i = 0, _Object$entries = Object.entries(answer); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(_Object$entries[_i], 2),
            option = _Object$entries$_i[0],
            possibility = _Object$entries$_i[1];

        Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("".concat(possibility, " ").concat(option), "success");
      }

  }

  if (_src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].messages) if (_src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].messages[_src_global__WEBPACK_IMPORTED_MODULE_8__[/* Global */ "c"].messages.length - 1].info) //前一条消息为空不添加
    Object(_utils_common__WEBPACK_IMPORTED_MODULE_7__[/* addMessage */ "a"])("", "hr");
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(10);
            var content = __webpack_require__(33);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(10);
            var content = __webpack_require__(35);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(10);
            var content = __webpack_require__(37);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(10);
            var content = __webpack_require__(39);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:application/vnd.ms-fontobject;base64,jAsAAOQKAAABAAIAAAAAAAIABQMAAAAAAAABAJABAAAAAExQAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAdC7BHAAAAAAAAAAAAAAAAAAAAAAAABAAaQBjAG8AbgBmAG8AbgB0AAAADgBSAGUAZwB1AGwAYQByAAAAFgBWAGUAcgBzAGkAbwBuACAAMQAuADAAAAAQAGkAYwBvAG4AZgBvAG4AdAAAAAAAAAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fUlKAAABfAAAAFZjbWFwtIcd+gAAAeQAAAGcZ2x5ZlSWxa8AAAOMAAAEoGhlYWQbRAwIAAAA4AAAADZoaGVhCNUEfAAAALwAAAAkaG10eBD3AAAAAAHUAAAAEGxvY2EDDAF+AAADgAAAAAptYXhwARYAjwAAARgAAAAgbmFtZT5U/n0AAAgsAAACbXBvc3QyoIw9AAAKnAAAAEYAAQAAA4D/gABcBPcAAAAABPcAAQAAAAAAAAAAAAAAAAAAAAQAAQAAAAEAABzBLnRfDzz1AAsEAAAAAADbluQGAAAAANuW5AYAAP9+BPcDgQAAAAgAAgAAAAAAAAABAAAABACDAAgAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQQ+AZAABQAIAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5gXnGQOA/4AAXAOBAIIAAAABAAAAAAAABAAAAAQAAAAE9wAABAAAAAAAAAUAAAADAAAALAAAAAQAAAFoAAEAAAAAAGIAAwABAAAALAADAAoAAAFoAAQANgAAAAgACAACAADmBeYo5xn//wAA5gXmKOcZ//8AAAAAAAAAAQAIAAgACAAAAAEAAgADAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAA0AAAAAAAAAAMAAOYFAADmBQAAAAEAAOYoAADmKAAAAAIAAOcZAADnGQAAAAMAAAAAALwBfgJQAAAAAgAA/34D9gOBAGwAeAAAJSYnJicmBgcGBw4BBwYHBicmBwYnJicuAicuAQcGBwYmJyYnJjY3Njc+ATU2JjYmLwEmNzY3NhcWFxY2Nz4CPwE+ATMWNzYXFhcWFxYXFj8BNhcWFxYGDwEOARcWBhUeARcWFx4BBwYHBgclPgE3LgEnDgEHHgEDdRUOLC0HEAcgHgUHAQoGAx9eXx4ECAcBIB0PBQ4GNTQSEwouLgsDESwsBAUBAwULDE8YDzIxDRk2NwYPBg8eHgEQAREPXl8dAwgIARIdGhASZxsPMDAJAxBXBwUBAQEBBQUrLQ8DCTAxBQb+fk1mAwJkTU1mAgFmGAgFEhECAQQPFQMNBjY3HwEBAQEeNzYSEBIIAwICFBUIBxJPUBESDSIkAwwGDx8fFAg9ERlVVRcKFhUCAgMIEw8QbxANAQEBHTc2FAgNEwsJKQwbU1IPEgtEBgwKESMRBg0EIyILEhBUUgcFqgFlS05mAwJlTUxmAAMAAP9/BPcDgABEAHwAfQAAJQ4BJyYvASYvASYvASYvASYvASYvASYvAS4BNTMnAzMUFh8BFh8BFh8BFh8BFh8BFh8BFh8BFhcWHwEWMzI2Nz4BJy4BATQmLwEmLwEuAS8BJi8BJi8CJicjIgYHDgEXHgE3PgEXMh8BFh8BFhcWFxYfARYfAR4BFSMXNyMDaDiBRRISDg4NEQ0NDA8PBhEQAjYsAg0NBS4xaoCnaDAtAgkKBw8PAzVBAxMTCREREA8QFAQFDg8KGhtRqz0RAQkLKwEOLi4CCwwCKGI5BxITDRARGyoVFAlRmEEWAQoIIxM3gUMUEgwPEA0PDgUEERADYUIBMDNqhqdpLSgpAQEBAgIDAwMEBQUFAwgIAR8tAQ4PBzuNS/3/AFGZQwQNDAkSEAM1JQIKCAUGBgYEBAUBAQIBAgM1OBIlCgwDAS9RmUIFDw8EMEwZAwcGBQUEBgUCATEvESUMCQsMKicBAgECAwMDBQECBgYCK1IBPI9N//8AAAAIAAD/wAPRA18APQBEAE0AUgBkAHAAeQCCAAABNgUeAQcXFgYHBgcGBxUGBwYmLwEGBwYnBwYiLwEGJyYnJi8BJi8BJjY3JyY0PwEnJjcxNjcnLgE3Njc2FwEjBgcXNzYFFRcWMxY3JwY3Bxc3JwEmBA8BHwE3PgE/ATY3PgEnNQUeARcOAQcuASc+ARcOARQWMjY0JiUHBg8BFzIXNgFz4gFeDRABAQEFBxVGMUcjoQ0YAxAuMgcIIgkYCRExQhwYCgcLBQQCFRUpAgkIHwUMBhUXag4OBT3fCwkBNwE3Qg0CS/4HBBEUKR5PNE8JjghJAoLw/qNtAmRbApPNPgJBEwYFAf7RNkgBAUg2NUgBAUg1HCYmOSUl/rQBejEBUAMEKAJ+4RcBEg0UJk0rg3dRRAbfPQUODmgUEAMBIgkIEi8BAQcDAwUDCAMyWiUDCRcJIAUOEjMtEQMYDaAkAQX+LikhUgEuGgEBBQEdTyx4CY4JRwKDCPb/BGhXATSeZQVteCZEIgKlAkc2NkcBAUc2Nkc6ASU5JiY5JQ4BH1ACDQJHAAAAABIA3gABAAAAAAAAABUAAAABAAAAAAABAAgAFQABAAAAAAACAAcAHQABAAAAAAADAAgAJAABAAAAAAAEAAgALAABAAAAAAAFAAsANAABAAAAAAAGAAgAPwABAAAAAAAKACsARwABAAAAAAALABMAcgADAAEECQAAACoAhQADAAEECQABABAArwADAAEECQACAA4AvwADAAEECQADABAAzQADAAEECQAEABAA3QADAAEECQAFABYA7QADAAEECQAGABABAwADAAEECQAKAFYBEwADAAEECQALACYBaQpDcmVhdGVkIGJ5IGljb25mb250Cmljb25mb250UmVndWxhcmljb25mb250aWNvbmZvbnRWZXJzaW9uIDEuMGljb25mb250R2VuZXJhdGVkIGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20ACgBDAHIAZQBhAHQAZQBkACAAYgB5ACAAaQBjAG8AbgBmAG8AbgB0AAoAaQBjAG8AbgBmAG8AbgB0AFIAZQBnAHUAbABhAHIAaQBjAG8AbgBmAG8AbgB0AGkAYwBvAG4AZgBvAG4AdABWAGUAcgBzAGkAbwBuACAAMQAuADAAaQBjAG8AbgBmAG8AbgB0AEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAgEDAQQBBQAHc2V0dGluZwh6aG9uZ3poaQdodW9qaWFuAAAAAA==");

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:font/woff;base64,d09GRgABAAAAAAegAAsAAAAACuQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8fUlKY21hcAAAAYAAAABhAAABnLSHHfpnbHlmAAAB5AAAA68AAASgVJbFr2hlYWQAAAWUAAAALwAAADYbRAwIaGhlYQAABcQAAAAdAAAAJAjVBHxobXR4AAAF5AAAABAAAAAQEPcAAGxvY2EAAAX0AAAACgAAAAoDDAF+bWF4cAAABgAAAAAfAAAAIAEWAI9uYW1lAAAGIAAAAUUAAAJtPlT+fXBvc3QAAAdoAAAANQAAAEYyoIw9eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BksWOcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByesT6XZG7438AQw9zI0AQUZgTJAQDztAxDeJztkLsNgDAMRJ/zQQixQDZIQYkYiIrJwxjBdigYgrOeZZ8sFwdkICqbkkAuBNOprrgfWdxPHLrPWgFabvUuvX8nl/jF7FOwzzLxa/W+v1u01AaWcasDy/UuA+IDALcSRgAAAHicbVNPb9xEFJ8345mxd22P7bXXm6TZDbtdO9vsev/bDZBESQMpSpdkF6pKICUCJSFEVCAhREAQmlbiRjlwoRcEQlUluPIB+AIc+gkq+AScyoldxht6As/4+T17nsf+/UEYockZeUrO0XvoFKFqEMrBOOMmyMDCID3DCIfRtJ4+jpM4WYV+HMRBEwJZxH7ez8t7eA1WoZu/qNOxBtOUCTBBXryijH5x+iZeXYUkglDuUwTykWfWG9ziC0XKIcNIaW+/qKgcFuYFNVm/5+QyUZQldr2uUCA0q+8URKdtzMQJE0wUi2CBLfb254mqgjM/aznvzIlWSyPWLU5BHpQuNQTRWm3KxmeDI4IPBoMjDEcFlTo2BkV4xGBxUkrXFpPYsRyVYOx6Knd2dm3HKF8mOhOlkquu2DM3b/qZvIcxUXPCet8yZM98EruqkctqNX3utZFwsptMz9gVmxlKpZx1rNdHnP4Eh9uvyq0PBzeOEJG4f6H8Re6gTfQZ+lwib0KYwvmfGUG/G5Kumy/B/0w/Dd1OSoikCHrPev7txkFYKadkStTlEr/zrMu/6C+CV/GTCjm+ev6S45imYRuGLgSzLRzXsWHQqH1y59Fxq4G1DBeC9NdJLqfZtiUsV6GmyMzODX9esUHLLoEZRTir48W3l7mTMyx77ornasNv1/OQUSu55Pya6+jCMoRJFdsib21Aq3vy5aN3G4s1CaBEkxCFUpoyWGqAKfgLX23/PUHDB9cUQ9cci/SrOKNSxpgiNQAYMOlfdaoZnUBz+GCDCqG0bswQzihVGMXQbtpVXcvqV8LpWkIoYMbw0ghe/HowmSCEVMnBr+Qx2UcrkoUBGqED9AH6BN1FCGIqZSolO5Wqlyq/CakfOCvLJHXBBcJxEga9NUld0pZpBFM3QIVxP4mp5+elG0KWyCqEQBFQSlmQrkjp6sstfCl/aYLVNHHznbgXVLl0i9/xY/jwD9gzrFS83Hu5vVX5wSgQK+pwtawVNLu9camQ4VmqYM+rYU0tUZ15/olp0pUnWQ0SSDYMvD3miu3Wiju9He2++gq+++f4x9v44E38zW+reD3HKIwfx9cBrsf9NPYvBcFytTr+BT5twy5RFvHZ7z44hhsMlu59PNxkT1aoaR67FoGypjpNAC5hJSrpvFElmq8tUNPpNmxSML6/DHQc1Z4bQTQrfwDmd+qn2n1tC99Tn06U41vQ++6Q3j4NNsv4Id6K4y2AND4P1eX0E0wo7WIDb6F/AHQqoOoAeJxjYGRgYABimYOCNvH8Nl8ZuFkYQOD2tCdsCPp/Hct35kYgl4OBCSQKABcZCpcAeJxjYGRgYG7438AQw/KdAQiAJCMDKmABAHF+BFsAAAAEAAAABAAAAAT3AAAEAAAAAAAAAAC8AX4CUAAAeJxjYGRgYGBhaGbgYAABJiDmAkIGhv9gPgMAFjkBpgB4nGWPTU7DMBCFX/oHpBKqqGCH5AViASj9EatuWFRq911036ZOmyqJI8et1ANwHo7ACTgC3IA78EgnmzaWx9+8eWNPANzgBx6O3y33kT1cMjtyDRe4F65TfxBukF+Em2jjVbhF/U3YxzOmwm10YXmD17hi9oR3YQ8dfAjXcI1P4Tr1L+EG+Vu4iTv8CrfQ8erCPuZeV7iNRy/2x1YvnF6p5UHFockikzm/gple75KFrdLqnGtbxCZTg6BfSVOdaVvdU+zXQ+ciFVmTqgmrOkmMyq3Z6tAFG+fyUa8XiR6EJuVYY/62xgKOcQWFJQ6MMUIYZIjK6Og7VWb0r7FDwl57Vj3N53RbFNT/c4UBAvTPXFO6stJ5Ok+BPV8bUnV0K27LnpQ0kV7NSRKyQl7WtlRC6gE2ZVeOEXpc0Yk/KGdI/wAJWm7IAAAAeJxjYGKAAC4G7ICFkYmRmZGFkZWBvTi1pCQzL52jKiM/L70qI5M9ozQ/KzMxj4EBAJBPCZYAAAA=");

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:font/ttf;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzI8fUlKAAABfAAAAFZjbWFwtIcd+gAAAeQAAAGcZ2x5ZlSWxa8AAAOMAAAEoGhlYWQbRAwIAAAA4AAAADZoaGVhCNUEfAAAALwAAAAkaG10eBD3AAAAAAHUAAAAEGxvY2EDDAF+AAADgAAAAAptYXhwARYAjwAAARgAAAAgbmFtZT5U/n0AAAgsAAACbXBvc3QyoIw9AAAKnAAAAEYAAQAAA4D/gABcBPcAAAAABPcAAQAAAAAAAAAAAAAAAAAAAAQAAQAAAAEAABzBETxfDzz1AAsEAAAAAADbluQGAAAAANuW5AYAAP9+BPcDgQAAAAgAAgAAAAAAAAABAAAABACDAAgAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQQ+AZAABQAIAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5gXnGQOA/4AAXAOBAIIAAAABAAAAAAAABAAAAAQAAAAE9wAABAAAAAAAAAUAAAADAAAALAAAAAQAAAFoAAEAAAAAAGIAAwABAAAALAADAAoAAAFoAAQANgAAAAgACAACAADmBeYo5xn//wAA5gXmKOcZ//8AAAAAAAAAAQAIAAgACAAAAAEAAgADAAABBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAA0AAAAAAAAAAMAAOYFAADmBQAAAAEAAOYoAADmKAAAAAIAAOcZAADnGQAAAAMAAAAAALwBfgJQAAAAAgAA/34D9gOBAGwAeAAAJSYnJicmBgcGBw4BBwYHBicmBwYnJicuAicuAQcGBwYmJyYnJjY3Njc+ATU2JjYmLwEmNzY3NhcWFxY2Nz4CPwE+ATMWNzYXFhcWFxYXFj8BNhcWFxYGDwEOARcWBhUeARcWFx4BBwYHBgclPgE3LgEnDgEHHgEDdRUOLC0HEAcgHgUHAQoGAx9eXx4ECAcBIB0PBQ4GNTQSEwouLgsDESwsBAUBAwULDE8YDzIxDRk2NwYPBg8eHgEQAREPXl8dAwgIARIdGhASZxsPMDAJAxBXBwUBAQEBBQUrLQ8DCTAxBQb+fk1mAwJkTU1mAgFmGAgFEhECAQQPFQMNBjY3HwEBAQEeNzYSEBIIAwICFBUIBxJPUBESDSIkAwwGDx8fFAg9ERlVVRcKFhUCAgMIEw8QbxANAQEBHTc2FAgNEwsJKQwbU1IPEgtEBgwKESMRBg0EIyILEhBUUgcFqgFlS05mAwJlTUxmAAMAAP9/BPcDgABEAHwAfQAAJQ4BJyYvASYvASYvASYvASYvASYvASYvAS4BNTMnAzMUFh8BFh8BFh8BFh8BFh8BFh8BFh8BFhcWHwEWMzI2Nz4BJy4BATQmLwEmLwEuAS8BJi8BJi8CJicjIgYHDgEXHgE3PgEXMh8BFh8BFhcWFxYfARYfAR4BFSMXNyMDaDiBRRISDg4NEQ0NDA8PBhEQAjYsAg0NBS4xaoCnaDAtAgkKBw8PAzVBAxMTCREREA8QFAQFDg8KGhtRqz0RAQkLKwEOLi4CCwwCKGI5BxITDRARGyoVFAlRmEEWAQoIIxM3gUMUEgwPEA0PDgUEERADYUIBMDNqhqdpLSgpAQEBAgIDAwMEBQUFAwgIAR8tAQ4PBzuNS/3/AFGZQwQNDAkSEAM1JQIKCAUGBgYEBAUBAQIBAgM1OBIlCgwDAS9RmUIFDw8EMEwZAwcGBQUEBgUCATEvESUMCQsMKicBAgECAwMDBQECBgYCK1IBPI9N//8AAAAIAAD/wAPRA18APQBEAE0AUgBkAHAAeQCCAAABNgUeAQcXFgYHBgcGBxUGBwYmLwEGBwYnBwYiLwEGJyYnJi8BJi8BJjY3JyY0PwEnJjcxNjcnLgE3Njc2FwEjBgcXNzYFFRcWMxY3JwY3Bxc3JwEmBA8BHwE3PgE/ATY3PgEnNQUeARcOAQcuASc+ARcOARQWMjY0JiUHBg8BFzIXNgFz4gFeDRABAQEFBxVGMUcjoQ0YAxAuMgcIIgkYCRExQhwYCgcLBQQCFRUpAgkIHwUMBhUXag4OBT3fCwkBNwE3Qg0CS/4HBBEUKR5PNE8JjghJAoLw/qNtAmRbApPNPgJBEwYFAf7RNkgBAUg2NUgBAUg1HCYmOSUl/rQBejEBUAMEKAJ+4RcBEg0UJk0rg3dRRAbfPQUODmgUEAMBIgkIEi8BAQcDAwUDCAMyWiUDCRcJIAUOEjMtEQMYDaAkAQX+LikhUgEuGgEBBQEdTyx4CY4JRwKDCPb/BGhXATSeZQVteCZEIgKlAkc2NkcBAUc2Nkc6ASU5JiY5JQ4BH1ACDQJHAAAAABIA3gABAAAAAAAAABUAAAABAAAAAAABAAgAFQABAAAAAAACAAcAHQABAAAAAAADAAgAJAABAAAAAAAEAAgALAABAAAAAAAFAAsANAABAAAAAAAGAAgAPwABAAAAAAAKACsARwABAAAAAAALABMAcgADAAEECQAAACoAhQADAAEECQABABAArwADAAEECQACAA4AvwADAAEECQADABAAzQADAAEECQAEABAA3QADAAEECQAFABYA7QADAAEECQAGABABAwADAAEECQAKAFYBEwADAAEECQALACYBaQpDcmVhdGVkIGJ5IGljb25mb250Cmljb25mb250UmVndWxhcmljb25mb250aWNvbmZvbnRWZXJzaW9uIDEuMGljb25mb250R2VuZXJhdGVkIGJ5IHN2ZzJ0dGYgZnJvbSBGb250ZWxsbyBwcm9qZWN0Lmh0dHA6Ly9mb250ZWxsby5jb20ACgBDAHIAZQBhAHQAZQBkACAAYgB5ACAAaQBjAG8AbgBmAG8AbgB0AAoAaQBjAG8AbgBmAG8AbgB0AFIAZQBnAHUAbABhAHIAaQBjAG8AbgBmAG8AbgB0AGkAYwBvAG4AZgBvAG4AdABWAGUAcgBzAGkAbwBuACAAMQAuADAAaQBjAG8AbgBmAG8AbgB0AEcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAAcwB2AGcAMgB0AHQAZgAgAGYAcgBvAG0AIABGAG8AbgB0AGUAbABsAG8AIABwAHIAbwBqAGUAYwB0AC4AaAB0AHQAcAA6AC8ALwBmAG8AbgB0AGUAbABsAG8ALgBjAG8AbQAAAAACAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQBAgEDAQQBBQAHc2V0dGluZwh6aG9uZ3poaQdodW9qaWFuAAAAAA==");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIiA+DQo8IS0tDQoyMDEzLTktMzA6IENyZWF0ZWQuDQotLT4NCjxzdmc+DQo8bWV0YWRhdGE+DQpDcmVhdGVkIGJ5IGljb25mb250DQo8L21ldGFkYXRhPg0KPGRlZnM+DQoNCjxmb250IGlkPSJpY29uZm9udCIgaG9yaXotYWR2LXg9IjEwMjQiID4NCiAgPGZvbnQtZmFjZQ0KICAgIGZvbnQtZmFtaWx5PSJpY29uZm9udCINCiAgICBmb250LXdlaWdodD0iNTAwIg0KICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIg0KICAgIHVuaXRzLXBlci1lbT0iMTAyNCINCiAgICBhc2NlbnQ9Ijg5NiINCiAgICBkZXNjZW50PSItMTI4Ig0KICAvPg0KICAgIDxtaXNzaW5nLWdseXBoIC8+DQogICAgDQogICAgPGdseXBoIGdseXBoLW5hbWU9InNldHRpbmciIHVuaWNvZGU9IiYjNTg4ODU7IiBkPSJNODg1LjE5Njk1OCAyNC40NzE4NTVjLTE0Ljc1MzE0MSA1LjQ2NDEyNi0yNS4xMzQ5ODEgOC43NDI2MDItMzQuOTcwNDA4IDEyLjU2NzQ5LTMwLjA1MjY5NSAxMS40NzQ2NjUtNTkuMDEyNTY0IDI0LjU4ODU2OC04OS42MTE2NzEgMzQuOTcwNDA4LTguNzQyNjAyIDIuNzMyMDYzLTIxLjMxMDA5MyAxLjYzOTIzOC0yOS41MDYyODItMi43MzIwNjMtMjEuMzEwMDkzLTEwLjM4MTg0LTQyLjA3Mzc3My0yMi40MDI5MTgtNjEuNzQ0NjI3LTM2LjA2MzIzNC02LjU1Njk1Mi00LjM3MTMwMS0xMi4wMjEwNzgtMTQuMjA2NzI4LTEzLjY2MDMxNi0yMi40MDI5MTgtNi41NTY5NTItMzYuMDYzMjM0LTExLjQ3NDY2NS03Mi42NzI4OC0xNS44NDU5NjYtMTA5LjI4MjUyNi0yLjczMjA2My0yMC43NjM2OC0xMi41Njc0OS0zMC4wNTI2OTUtMzMuODc3NTgzLTI5LjUwNjI4Mi02Mi44Mzc0NTIgMC41NDY0MTMtMTI1LjY3NDkwNSAwLjU0NjQxMy0xODguNTEyMzU3IDAtMjAuNzYzNjggMC0zMS42OTE5MzMgOC4xOTYxODktMzQuNDIzOTk2IDI4Ljk1OTg2OS00LjkxNzcxNCAzNi42MDk2NDYtMTAuOTI4MjUzIDcyLjY3Mjg4LTE1LjI5OTU1NCAxMDkuMjgyNTI2LTEuNjM5MjM4IDEyLjU2NzQ5LTYuMDEwNTM5IDIwLjIxNzI2Ny0xOC4wMzE2MTcgMjYuMjI3ODA2LTIwLjIxNzI2NyA5LjgzNTQyNy0zOC4yNDg4ODQgMjMuNDk1NzQzLTU4LjQ2NjE1MSAzMy4zMzExNy03LjEwMzM2NCAzLjgyNDg4OC0xOC4wMzE2MTcgNS40NjQxMjYtMjUuNjgxMzk0IDIuNzMyMDYzLTM1LjUxNjgyMS0xMi41Njc0OS02OS45NDA4MTctMjYuNzc0MjE5LTEwNC45MTEyMjUtNDAuNDM0NTM1LTI1LjEzNDk4MS05LjgzNTQyNy0zMi4yMzgzNDUtNy42NDk3NzctNDYuNDQ1MDc0IDE2LjM5MjM3OS0zMS4xNDU1MiA1My4wMDIwMjUtNjEuNzQ0NjI3IDEwNi4wMDQwNS05Mi4zNDM3MzUgMTU5LjAwNjA3NS0xNC4yMDY3MjggMjQuNTg4NTY4LTEzLjY2MDMxNiAzMC41OTkxMDcgOC43NDI2MDIgNDguMDg0MzExIDI5LjUwNjI4MiAyMy40OTU3NDMgNTkuNTU4OTc3IDQ1Ljg5ODY2MSA4OC41MTg4NDYgNjkuOTQwODE3IDUuNDY0MTI2IDQuMzcxMzAxIDkuMjg5MDE1IDE0LjIwNjcyOCA5LjI4OTAxNSAyMS4zMTAwOTMgMS4wOTI4MjUgMjAuMjE3MjY3LTMuMjc4NDc2IDQxLjUyNzM2IDAgNjEuMTk4MjE1IDMuODI0ODg4IDIxLjMxMDA5My00LjkxNzcxNCAzMi4yMzgzNDUtMjAuMjE3MjY3IDQzLjcxMzAxLTI3LjMyMDYzMiAxOS42NzA4NTUtNTIuNDU1NjEzIDQxLjUyNzM2LTc5LjIyOTgzMSA2MS4xOTgyMTUtMTUuODQ1OTY2IDEyLjAyMTA3OC0xOS42NzA4NTUgMjQuNTg4NTY4LTkuMjg5MDE1IDQyLjA3Mzc3MyAzMy4zMzExNyA1Ni4yODA1MDEgNjYuMTE1OTI4IDExMy4xMDc0MTQgOTguOTAwNjg2IDE2OS45MzQzMjggOS4yODkwMTUgMTUuODQ1OTY2IDIxLjMxMDA5MyAxOS4xMjQ0NDIgMzguMjQ4ODg0IDEyLjU2NzQ5IDM2LjA2MzIzNC0xNC4yMDY3MjggNzIuMTI2NDY3LTI4Ljk1OTg2OSAxMDguNzM2MTEzLTQyLjA3Mzc3MyA3LjY0OTc3Ny0yLjczMjA2MyAxOS42NzA4NTUtMS4wOTI4MjUgMjcuMzIwNjMyIDIuNzMyMDYzIDIwLjc2MzY4IDEwLjM4MTg0IDM5LjM0MTcwOSAyNC4wNDIxNTYgNjAuMTA1Mzg5IDM0LjQyMzk5NiAxMC45MjgyNTMgNS40NjQxMjYgMTQuNzUzMTQxIDEyLjAyMTA3OCAxNS44NDU5NjYgMjIuOTQ5MzMgNC45MTc3MTQgMzcuMTU2MDU5IDEwLjkyODI1MyA3NC4zMTIxMTggMTUuODQ1OTY2IDExMS40NjgxNzdDMzg2LjMyMjIyNiA4ODguMzUwMjIzIDM5Ny43OTY4OTIgODk2IDQxOC4wMTQxNTkgODk2YzYyLjgzNzQ1Mi0wLjU0NjQxMyAxMjUuNjc0OTA1LTAuNTQ2NDEzIDE4OC41MTIzNTcgMCAxOS42NzA4NTUgMCAzMC41OTkxMDctOC4xOTYxODkgMzIuNzg0NzU4LTI3Ljg2NzA0NCA0LjkxNzcxNC0zNi42MDk2NDYgMTAuOTI4MjUzLTcyLjY3Mjg4IDE1LjI5OTU1NC0xMDkuMjgyNTI2IDEuNjM5MjM4LTEzLjY2MDMxNiA2LjU1Njk1Mi0yMS44NTY1MDUgMTkuNjcwODU1LTI3Ljg2NzA0NCAxOS4xMjQ0NDItOC43NDI2MDIgMzcuMTU2MDU5LTE5LjY3MDg1NSA1NC42NDEyNjMtMzEuNjkxOTMzIDExLjQ3NDY2NS04LjE5NjE4OSAyMS4zMTAwOTMtOC4xOTYxODkgMzMuODc3NTgzLTIuNzMyMDYzIDMzLjg3NzU4MyAxNC4yMDY3MjggNjguMzAxNTc5IDI2Ljc3NDIxOSAxMDIuNzI1NTc1IDQwLjk4MDk0NyAxOS4xMjQ0NDIgNy42NDk3NzcgMzIuMjM4MzQ1IDMuODI0ODg4IDQyLjYyMDE4NS0xNC43NTMxNDEgMzEuMTQ1NTItNTUuMTg3Njc2IDYzLjkzMDI3OC0xMDkuODI4OTM5IDk1LjYyMjIxLTE2NC40NzAyMDIgMTIuNTY3NDktMjEuODU2NTA1IDEwLjkyODI1My0yOC45NTk4NjktOS4yODkwMTUtNDQuODA1ODM2LTI4Ljk1OTg2OS0yMi40MDI5MTgtNTcuOTE5NzM5LTQ1LjM1MjI0OC04Ny40MjYwMjEtNjcuNzU1MTY2LTkuODM1NDI3LTcuNjQ5Nzc3LTEyLjU2NzQ5LTE0Ljc1MzE0MS0xMS40NzQ2NjUtMjcuMzIwNjMyIDIuMTg1NjUxLTIyLjk0OTMzLTAuNTQ2NDEzLTQ2LjQ0NTA3NCAwLjU0NjQxMy02OS4zOTQ0MDQgMC41NDY0MTMtOC4xOTYxODkgNC4zNzEzMDEtMTguMDMxNjE3IDEwLjM4MTg0LTIyLjk0OTMzIDI4Ljk1OTg2OS0yNC4wNDIxNTYgNTkuMDEyNTY0LTQ2LjQ0NTA3NCA4OC41MTg4NDYtNjkuMzk0NDA0IDIwLjIxNzI2Ny0xNS44NDU5NjYgMjEuMzEwMDkzLTIyLjk0OTMzIDguNzQyNjAyLTQ0LjgwNTgzNi0zMi4yMzgzNDUtNTUuNzM0MDg4LTY0LjQ3NjY5LTExMC45MjE3NjQtOTcuMjYxNDQ4LTE2Ni4xMDk0NEM5MDEuMDQyOTI0IDM1Ljk0NjUyIDg5MS43NTM5MDkgMzAuNDgyMzk0IDg4NS4xOTY5NTggMjQuNDcxODU1ek01MTAuMzU3ODkzIDIwMy42OTUxOTdjOTguOTAwNjg2LTAuNTQ2NDEzIDE4MC44NjI1ODEgNzkuNzc2MjQ0IDE4MS40MDg5OTMgMTc3LjU4NDEwNSAwLjU0NjQxMyAxMDAuNTM5OTI0LTc5LjIyOTgzMSAxODEuOTU1NDA2LTE3OC42NzY5MyAxODIuNTAxODE5LTk5LjQ0NzA5OSAwLjU0NjQxMy0xODEuNDA4OTkzLTgwLjMyMjY1Ny0xODEuNDA4OTkzLTE3OS43Njk3NTVDMzMxLjEzNDU1MSAyODUuNjU3MDkyIDQxMi4wMDM2MiAyMDQuMjQxNjEgNTEwLjM1Nzg5MyAyMDMuNjk1MTk3eiIgIGhvcml6LWFkdi14PSIxMDI0IiAvPg0KDQogICAgDQogICAgPGdseXBoIGdseXBoLW5hbWU9Inpob25nemhpIiB1bmljb2RlPSImIzU4OTIwOyIgZD0iTTg3MS45NzA5OSA0NS4xMDg4NDJhNDI1Ljk2Njg2MiA0MjUuOTY2ODYyIDAgMCAwLTI1NC4xMTQ4MTEtNzkuODIwNTg1Yy0xMS45Mzk1MjYgMC4xNTcwOTktMjMuNzM2MjM0IDEuMDg1NDExLTM1LjUxODY2MiAyLjAxMzcyMy00LjgxMjk0MyAwLjQ1NzAxNS05LjQ1NDUwNSAxLjIyODIyOS0xNC4yODE3MjkgMS45OTk0NDMtOS4zMTE2ODggMS4yMjgyMjktMTguNDY2Mjc2IDIuMzEzNjQtMjcuNDYzNzY2IDQuMjg0NTE4LTUuNTg0MTU2IDAuOTI4MzEyLTExLjE2ODMxMiAyLjYxMzU1Ni0xNi40NTI1NTIgMy44NTYwNjctOC44NDAzOTEgMS45OTk0NDItMTcuNjgwNzgxIDQuMDEzMTY2LTI2LjIyMTI1NSA2LjYyNjcyMy00LjA0MTcyOSAxLjU0MjQyNy03LjkxMjA3OCAyLjg1NjM0Ni0xMi4xMTA5MDcgNC42MTI5OTgtMTAuMDgyOTAxIDMuMjQxOTUzLTE5Ljk5NDQyMSA2Ljc4MzgyMS0yOS40Nzc0ODkgMTAuNzgyNzA2LTIuMTcwODIzIDAuOTI4MzEyLTQuMjg0NTE5IDEuODU2NjI1LTYuMzU1MzcgMi42MTM1NTctMTEuMTY4MzEyIDUuMjQxMzk1LTIyLjM1MDkwNyAxMC42MjU2MDctMzMuMDQ3OTIyIDE2LjMzODI5OC0wLjQ1NzAxNSAwLjMxNDE5OC0wLjkyODMxMiAwLjQ1NzAxNS0xLjQyODE3MyAwLjc3MTIxM2E0MzUuNTkyNzQ4IDQzNS41OTI3NDggMCAwIDAtOTguODE1Mjg2IDc1LjQ5MzIyMmMtMC40NTcwMTUgMC40NzEyOTctMC45MjgzMTIgMS4wODU0MTEtMS40MjgxNzMgMS41NDI0MjctOC45OTc0OSA5LjI0MDI3OS0xNy42ODA3ODEgMTguNzk0NzU2LTI1LjkwNzA1NyAyOS4xMjA0NDYtMS43MTM4MDggMi4xNTY1NDEtMy4yNTYyMzQgNC4xNTU5ODMtNS4xMjcxNDEgNi42MjY3MjNhNDQ1Ljc2MTMzOSA0NDUuNzYxMzM5IDAgMCAwLTk0Ljk0NDkzNyAyNzUuNDgwMjc5aDEwNS4zNTYzMThsLTEyNy4zNzg3NDUgMjUyLjA4NjgwNkwwIDQwNC4yNTE0OTJoMTA0LjM1NjU5N2E1MzYuMDY0NzE0IDUzNi4wNjQ3MTQgMCAwIDEgOTIuNTc0MTctMzAxLjQ0NDQ2MyAyMi41NjUxMzIgMjIuNTY1MTMyIDAgMCAxIDEuOTg1MTYtMy42NTYxMjJjNS45Njk3NjMtOC44Njg5NTQgMTIuODUzNTU2LTE2Ljg5NTI4NiAxOS4xNjYwODEtMjUuMDUwMTU0IDIuNTU2NDMtMi45NTYzMTggNC42ODQ0MDctNi4wNDExNzIgNy4yNDA4MzctOS40MjU5NDEgOS4zNjg4MTUtMTEuNTM5NjM3IDE5LjczNzM1LTIyLjY1MDgyMyAyOS45OTE2MzItMzMuNDkwNjU2IDEuMTQyNTM4LTEuMTI4MjU3IDEuOTg1MTYtMS45NzA4NzkgMi44NTYzNDYtMi45NTYzMThBNTIyLjYxMTMyNSA1MjIuNjExMzI1IDAgMCAxIDM3NS42MDk0ODQtNjEuNTYxMzk1YzEuMTI4MjU3LTAuNzE0MDg2IDIuMTI3OTc4LTEuMTI4MjU3IDMuMzk5MDUyLTEuOTcwODc4IDEyLjM1MzY5Ni02Ljc1NTI1OCAyNS4xMzU4NDQtMTMuMDk2MzQ2IDM3LjkwMzcwOS0xOC43MjMzNDggMy4yNzA1MTYtMS40MjgxNzMgNi4zOTgyMTUtMi45NTYzMTggOS41MTE2MzItNC4yODQ1MTggMTEuMDgyNjIyLTQuNzg0Mzc5IDIyLjQzNjU5Ny04LjcyNjEzNyAzMy44MDQ4NTQtMTIuODUzNTU3IDUuMzk4NDk0LTEuOTcwODc5IDEwLjY1NDE3LTMuNjU2MTIzIDE2LjE4MTE5OS01LjQ4NDE4NCA5Ljk5NzIxMS0yLjk1NjMxOCAyMC4xNjU4MDItNS40ODQxODQgMzAuNTM0MzM4LTcuODgzNTE1IDYuODEyMzg1LTEuNjg1MjQ0IDEzLjQ4MTk1My0zLjM3MDQ4OCAyMC40MzcxNTUtNC43ODQzNzlhNjAuMzk3NDM0IDYwLjM5NzQzNCAwIDAgMSA4LjM2OTA5My0xLjk3MDg3OWM5Ljc5NzI2Ni0xLjgyODA2MSAxOS40NTE3MTUtMi42NzA2ODMgMjkuMTA2MTY1LTMuOTQxNzU3IDMuNTU2MTUxLTAuNzE0MDg2IDcuMTQwODY1LTEuMjcxMDc0IDEwLjUxMTM1Mi0xLjY4NTI0NCAxNy40NjY1NTUtMS42ODUyNDQgMzQuNzkwMjkzLTIuODU2MzQ2IDUyLjI1Njg0OC0yLjg1NjM0NiAxMDYuMDU2MTIzIDAgMjM0LjM2MzE4IDMzLjkzMzM4OSAzMTMuNzI2NzUxIDEwOC44NDEwNiAyMy43MjE5NTMgMjIuNTIyMjg3IDE5LjEwODk1NCA1My4zNzA4MjMgOC44MjYxMDkgNjQuNzEwNTE2LTE0LjAzODk0IDE1LjcwOTkwMi00Ny4xMjk3MDcgMjEuNzUxMDc0LTc4LjE2MzkwNi0wLjU5OTgzM3ogbTI5NC4zMDM1OTkgMzE4Ljc2ODIwMUE1MzMuOTUxMDE4IDUzMy45NTEwMTggMCAwIDEgMTA3NC40MTQ1MDUgNjY0LjQ2NDYwM2MtMC44NTY5MDQgMS40MjgxNzMtMS40MjgxNzMgMi45NTYzMTgtMi4xMjc5NzggNC4yODQ1MTgtNy41MjY0NzEgMTAuNTU0MTk4LTE1LjE5NTc2IDIwLjI2NTc3NC0yMy4wMDc4NjYgMzAuMjQ4NzAzYTMzLjU5MDYyOCAzMy41OTA2MjggMCAwIDAtMi41NTY0MjkgMy42NTYxMjMgNTI0LjczOTMwMyA1MjQuNzM5MzAzIDAgMCAxLTE5NS4wODg0MjQgMTQ5LjE3MjY2NGMtMi4yNzA3OTUgMC44NDI2MjItNC4xMTMxMzggMS45NzA4NzktNi4zOTgyMTUgMi44NTYzNDYtMTIuMDY4MDYxIDUuMDcwMDE0LTI0LjQyMTc1NyA5LjQ0MDIyMy0zNi45MTgyNzEgMTMuNzk2MTUtNC4yODQ1MTkgMS40MjgxNzMtOC44MTE4MjcgMy4wOTkxMzUtMTMuMjEwNiA0LjUxMzAyNy0xMC45Mzk4MDUgMy4zNzA0ODgtMjEuNzIyNTEgNi4wNDExNzItMzIuODQ3OTc3IDguNzI2MTM3LTYuMTEyNTggMS40MjgxNzMtMTIuMzUzNjk2IDIuOTU2MzE4LTE4LjQ1MTk5NSA0LjI4NDUxOC0yLjk4NDg4MSAwLjU3MTI2OS01LjgyNjk0NiAxLjQyODE3My04Ljk1NDY0NCAyLjExMzY5Ni04LjIyNjI3NiAxLjQyODE3My0xNi4zMjQwMTcgMi4xMTM2OTYtMjQuNzA3MzkyIDMuMjQxOTUzLTUuODI2OTQ2IDAuNzE0MDg2LTExLjQyNTM4NCAxLjU0MjQyNy0xNy4wMzgxMDMgMi4xMTM2OTYtMTMuOTEwNDA0IDEuNDI4MTczLTI3LjY3Nzk5MiAxLjk3MDg3OS00MS40MTcwMTUgMi4xMTM2OTYtMi41NTY0MyAwLTQuOTcwMDQyIDAuNDE0MTctNy41MjY0NzIgMC40MTQxNy0wLjQyODQ1MiAwLTAuODU2OTA0LTAuMTQyODE3LTEuMjg1MzU2LTAuMTQyODE3YTUxMS44MDAwNTYgNTExLjgwMDA1NiAwIDAgMS0yOTguMTczOTQ3LTk2LjExNjAzOWMtMjkuNDc3NDktMjAuOTc5ODYxLTI1LjUyMTQ1LTUwLjU4NTg4Ni0xMi4zMzk0MTQtNjUuNTI0NTc1IDkuMzY4ODE1LTEwLjYxMTMyNSAzNy45NjA4MzctMjUuNTkyODU5IDYxLjE0MDA4NC03LjkxMjA3OCA3My4yNzk1NTQgNTUuNDk4ODAxIDE2Mi4yNjkwMSA4MC41Nzc1MTcgMjUxLjc4Njg5IDc5LjgwNjMwNCAxMi44NTM1NTYtMC4xNTcwOTkgMjUuNzA3MTEzLTAuNzcxMjEzIDM4LjE2MDc4MS0xLjk5OTQ0MiAzLjg4NDYzLTAuMzE0MTk4IDcuNTk3ODgtMC45MjgzMTIgMTEuNDI1MzgzLTEuNTQyNDI3YTMwMy43MTUyNTggMzAzLjcxNTI1OCAwIDAgMCAzMC43Mi00LjkyNzE5N2M0LjI4NDUxOS0wLjc3MTIxMyA4Ljg1NDY3Mi0xLjk5OTQ0MiAxMy4wMzkyMTktMi44NTYzNDUgMTAuMDgyOTAxLTIuMzEzNjQgMTkuNzA4Nzg3LTQuNjI3MjggMjkuMzIwMzkxLTcuNjk3ODUzYTY4LjkzNzkwOCA2OC45Mzc5MDggMCAwIDAgOC45OTc0ODktMy4yMjc2N2MxMS4xNjgzMTItMy42OTg5NjggMjIuMDM2NzA5LTcuNTU1MDM1IDMyLjU3NjYyNS0xMi4xNjgwMzQgMS4yNDI1MS0wLjMxNDE5OCAyLjE3MDgyMy0xLjIyODIyOSAzLjI1NjIzNC0xLjU0MjQyN2E0MzUuNzQ5ODQ3IDQzNS43NDk4NDcgMCAwIDAgMTYzLjY2ODYyLTEyNS4xMDc5NSA5LjU2ODc1OSA5LjU2ODc1OSAwIDAgMSAwLjYyODM5Ni0wLjkyODMxMiA0NDYuNDMyNTggNDQ2LjQzMjU4IDAgMCAwIDk4LjU0MzkzMy0yODAuNDA3NDc2SDk3MC4xNTc4OGwxMzMuNjQ4NDI0LTI1NS4wMDAyNzggMTY2Ljk2NzY5OSAyNTUuMTU3Mzc4eiBtMCAwIiAgaG9yaXotYWR2LXg9IjEyNzEiIC8+DQoNCiAgICANCiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iaHVvamlhbiIgdW5pY29kZT0iJiM1OTE2MTsiIGQ9Ik0zNzEuNDU0IDYzNy45MjdjMTUwLjM2MiAxNDkuNTYyIDM0Mi43IDIxNy4zMjggNTc1Ljc4NCAyMDEuOTM1IDE2LjYzNC0xLjA5OSAyOS4wNjEtMTUuNTUzIDI3Ljg1Mi0zMi4wMDRsLTAuMDMzLTAuMzggMC4wMDItMS4xODcgMC4wMzItMS43NyAwLjUwMy0xNi4xNjVjMS40NjYtNTEuOTQtMC44MDEtMTAwLjQ2Ni0xMC42OTgtMTU4LjczNy0xNC42OTItODYuNS00My44NjQtMTcwLjY4LTkxLjItMjQ5LjcyOS0zMi4zMzMtNTMuOTk1LTcyLjA4LTEwMy44NDUtMTE5LjY5LTE0OS4wMTNhMzAuMTE2IDMwLjExNiAwIDAgMC0wLjM2Mi01LjU4NGMtMjMuNDMzLTE0Ny43Ny04OC41MzMtMjQ0LjEtMTk1LjQxOC0yODQuMzU3LTE3LjUyNi02LjYwMS0zNi42NzMgNC4zNTEtMzkuOTY0IDIyLjY3OWwtMC4xMSAwLjY1Ny0xNi4zMzUgMTAzLjgzM2MtMzAuNDUtMTMuMjEyLTYyLjQ2OC0yNS40Mi05Ni4wOTEtMzYuNThhMjkuODcgMjkuODcgMCAwIDAtMTQuNDYtMS4wOTRsLTM0LjYxMi0zNC42MTNjLTExLjUxMi0xMS41MTEtMzAuMDcyLTExLjY3Ni00MS43ODMtMC40OTVsLTAuNTA1IDAuNDkzLTE2LjczNCAxNi43MzNjLTMxLjc0NS0zMS4yNTgtNzEuMzk5LTQ1LjM0OS0xMTQuMzItNDUuMTYtMTguNDk0IDAuMDgyLTM2LjQ4IDIuODc3LTUyLjY0NyA3LjQ3NS02LjM2IDEuODEtMTIuMTk1IDMuODQzLTE3LjAwOCA1Ljg4Mi0yLjQzNyAxLjAzMi00LjYzNiAyLjA3NS02LjU3NCAzLjE0M2wtMS4yODggMC43MTctMS4xOTcgMC42ODYtMS4xMTMgMC42NjljLTQuMyAyLjY1My02Ljc5NyA1LjE2MS05Ljg0NSAxMS4wMzhsLTAuODIgMS42MjItMC4zOCAwLjg5N2MtMjguMzcyIDY2Ljk4My0xMy41OTQgMTI3LjkwNCA0MSAxNzcuMjIzbC0yLjg1MiAyLjg1M2MtMTEuNTEgMTEuNTEtMTEuNjc0IDMwLjA3LTAuNDkxIDQxLjc4M2wwLjQ5MyAwLjUwNSAzMC44MDkgMzAuODEtNS4wNjIgNS4yNmEyOS45MDYgMjkuOTA2IDAgMCAwLTYuMjkgMzEuNjY2bDAuMTcyIDAuNDI4YzEzLjgyMSAzMy42NzQgMjguNDQ4IDY1LjgyIDQzLjg3OCA5Ni40MzZMODguMjU1IDQwMy4xMmwtMC42NTggMC4xMWMtMTguMzI4IDMuMjkxLTI5LjI4IDIyLjQzOS0yMi42OCAzOS45NjRDMTA1LjE3NiA1NTAuMDggMjAxLjUwNiA2MTUuMTggMzQ5LjI3NiA2MzguNjEzYTI5Ljc4IDI5Ljc4IDAgMCAwIDE5LjM5Mi0zLjQ5NnogbTMwOC43MjMtNDY4LjYzOGwtMC43MDctMC41MTdjLTM2LjgyNy0yNi45NzktNzcuMjM3LTUxLjc2Ny0xMjEuMzY0LTc0LjIwNiAwLjExNS0wLjUgMC4yMi0xLjAwOSAwLjMxNC0xLjUyMmwwLjEyLTAuNzA2TDU3MSAxMy4xMjNsMi4wNDkgMS4yM2M0OS45OTEgMzAuNDg4IDg1LjcxMiA4MS42NzYgMTA3LjEyNyAxNTQuOTM2ek0xNDMuMTkgMzQuMzg4bDAuMzA3LTAuOTM2IDAuODEyLTAuMjU1IDEuNzg4LTAuNTQgMC45MjYtMC4yNjdjMTEuMTYzLTMuMTc1IDIzLjc5NS01LjEzNyAzNi41NTMtNS4xOTQgMjcuNTM2LTAuMTIxIDUxLjc3MyA4LjIyOSA3MS43NTIgMjcuNjU4bC03OS41NzIgNzkuNTdjLTM0LjgtMzAuMDU0LTQ0LjgwOS02MS45OTMtMzIuNTY2LTEwMC4wMzZ6IG01OS42ODQgMTc1LjIxbC04Ljg1NC04Ljg1NUwzMzUuNTE0IDU5LjI1bDguODI5IDguODMtOC45NDkgOC41NTctMjMuNDg1IDIyLjU4NS0xNS41NDUgMTUuMDA5LTI0Ljg3OCAyNC4xYTI5LjkwNCAyOS45MDQgMCAwIDAtMC43MiAwLjcyM2wtNjcuODkyIDcwLjU0NHogbTcwOS44MSA1NzIuMTA4Yy0zMjAuMzIgMTAuNTg5LTU1MS41ODItMTUyLjA2NC02OTguMDEtNDkyLjYyNmwtMS42MjItMy44MTRMMzEzLjQ3NSAxODAuOTJsMy45Ni0zLjg0NCAyNC45NTMtMjQuMTU4IDIyLjk5Ni0yMi4xNjggMjEuMDM5LTIwLjE3OCAxNy4zNDItMTYuNTM2IDEuODIzIDAuNjNjMTk3LjQ4IDY5LjI0MyAzMzEuNzkzIDE3Ni40MTMgNDE0LjI0NSAzMTEuNzE1bDIuNTYgNC4yMzdjNDMuMjkgNzIuMjkgNzAuMDM3IDE0OS40NzggODMuNTQ3IDIyOS4wMTYgOC43NTEgNTEuNTI1IDExLjA0OCA5NC44MjQgMTAuMDMzIDE0MC44MzVsLTAuMDI2IDEuMTF6IG0tMjk5LjIxLTE2NC45NDhjNjkuODY0IDAgMTI2LjUtNTYuNjQyIDEyNi41LTEyNi41MTUgMC02OS44NzItNTYuNjM2LTEyNi41MTUtMTI2LjUtMTI2LjUxNS02OS44NjUgMC0xMjYuNTAxIDU2LjY0My0xMjYuNTAxIDEyNi41MTUgMCA2OS44NzMgNTYuNjM2IDEyNi41MTUgMTI2LjUgMTI2LjUxNXogbTAtNTkuODA3Yy0zNi44MzggMC02Ni43MDEtMjkuODY2LTY2LjcwMS02Ni43MDhzMjkuODYzLTY2LjcwOCA2Ni43LTY2LjcwOGMzNi44MzggMCA2Ni43MDEgMjkuODY2IDY2LjcwMSA2Ni43MDhzLTI5Ljg2MyA2Ni43MDgtNjYuNyA2Ni43MDh6IG0tMzAzLjExNiAxMi44MzVsLTEuMjI2LTAuMzE1Yy04MS43ODQtMjAuNzYzLTEzOC4xNTQtNTcuOTI4LTE3MC43OTctMTExLjQ1MmwtMS4yMjctMi4wNDkgNzkuMjEyLTEyLjQ2MSAwLjcwNi0wLjEyYTI5LjkxNiAyOS45MTYgMCAwIDAgNi41NS0xLjk4YzI2LjggNDYuODgzIDU1LjczMiA4OS42OCA4Ni43ODIgMTI4LjM3N3oiICBob3Jpei1hZHYteD0iMTAyNCIgLz4NCg0KICAgIA0KDQoNCiAgPC9mb250Pg0KPC9kZWZzPjwvc3ZnPg0K");

/***/ }),
/* 24 */
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":\"0.8.5\"}");

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return autoRefresh; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _src_global__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);




var time = Date.now();
var buffer = time;

function generateRandomInterval() {
  var rate = 1;

  if (_src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.randomRefresh) {
    rate = Math.random();
    var currentRate = _src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.refreshIntervalMin / _src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.refreshIntervalMax;
    if (rate < currentRate) rate = currentRate;
  }

  if (_src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.debugMode) {
    console.log(_src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.refreshIntervalMax * rate * 60 * 1000);
    console.log(Date.now() - buffer);
    console.log(Date.now() - time);
    buffer = Date.now();
  }

  return rate;
}

function nextChapter() {
  var jumpButtons = top.document.querySelectorAll('a[onclick^="SelectSCO"]');
  var currentButton = top.document.querySelector("li.courseware_current a");
  var currentNext = top.document.querySelector('[href="javascript:NextSCO();"]');

  if (currentButton == jumpButtons[jumpButtons.length - 1]) {
    if (_src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.loopRefresh) jumpButtons[1].click(); //跳到开头，并跳过可能的课程说明页
  } else {
    currentNext.click();
  }
}

function notify() {
  var status = eval(GM_getValue("hasInformed", "false"));

  if (!status) {
    sweetalert2__WEBPACK_IMPORTED_MODULE_2___default.a.fire({
      title: "挂机提示",
      text: "如果后台显示，不一定能自动切换页面",
      icon: "info",
      confirmButtonText: "了解"
    });
    GM_setValue("hasInformed", true);
  }
}

function recur() {
  setTimeout(function () {
    nextChapter();
    recur();
  }, _src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.refreshIntervalMax * generateRandomInterval() * 60 * 1000);
}

function autoRefresh() {
  return _autoRefresh.apply(this, arguments);
}

function _autoRefresh() {
  _autoRefresh = Object(_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_src_global__WEBPACK_IMPORTED_MODULE_3__[/* Global */ "c"].USER_SETTINGS.autoRefresh) {
              recur();
              notify();
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _autoRefresh.apply(this, arguments);
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(10);
            var content = __webpack_require__(30);

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _iconfont_eot_t_1601225478916__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20);
/* harmony import */ var _iconfont_woff_t_1601225478916__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(21);
/* harmony import */ var _iconfont_ttf_t_1601225478916__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22);
/* harmony import */ var _iconfont_svg_t_1601225478916__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
// Imports






var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_iconfont_eot_t_1601225478916__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_iconfont_eot_t_1601225478916__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_iconfont_woff_t_1601225478916__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_iconfont_ttf_t_1601225478916__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_iconfont_svg_t_1601225478916__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], { hash: "#iconfont" });
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@font-face {font-family: \"iconfont\";\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "); /* IE9 */\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('embedded-opentype'), \r\n  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAX0AAsAAAAACuQAAAWnAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDHAqJIIcxATYCJAMQCwoABCAFhG0HRhshCVGUTk6I7EeBu6dQWIbGUDqJA9rlMhyE4pd/wx0P/419u29mvmra3aQGJPEMiUQySyQ2WSJBCZTOoWSaeIaNf3h2b6+R1d8/T24gWpp0ksPEg7k5nICNOUtHKGyEGql1iviBfCEFSi9N/1n6PzhmvCywPJvNJaN1OMBRAg0sIv6twB4sQPFF/iHe6jJvE2ha4Aa6ub++QEuhqwJqXoa+Ba2EWalghLquWrCzXI73KurpbWoD4J33+/EXzKJOUsn0u+483rmw/KH9XK15NDtyLx87Gc4Jdh8Zm4BCPC1031cNlJueullUXHMBUDe+k/ih/czpufr/jJJuRV1HEf7hJZmo0tVt0J5LZDI/tC2jkDVOwCPxU61xkaiyo44OcQgQX4BOnvOyJKu/6t2aG5drjcqw3WgcfOYm9Fgwz8ItTqz98oZBFQ4y2dKnyaZq0zaU5+EriS2b+sh0VbXj6QhBgAT/HapQeltfham2v5rECSph+2YVI2w2lJjN6kbrSvtWZ86Re2OJ4ipgkmWRyhrAccjJMK4SFkkWLlUURpZpUSQlaWabSG9yQHnUwRQ6eHST6Vo4teqcDBnSpOE8iUI4BKlERTeYWu0hxCH2XHZDq+FKhdhej/KHhs6X6eahU3Iy2pPDwcHf3WCwQiS31CDcQcdOhVrZBokoWkHY35izEmhSjMFIpWQ5BepasZ9IGkows/GbUPpILIuGsitQlzZesiDHPiXCdcxXudqr+0L7PWm+SqUwAjLYoI2kAmMxmEfBQVe6jYETxfRU+QEJU3lGhanxinplAFR8UbJuEGMvyTbNCt5yYt7Jlafnnyo9hK8JUysRJSDTKkHce6bkQ9k/MXqUNkd7PCgAhdAVNmUw9P/s8+huPMZX5bDePd09o8HaaO9+7xQdE4/05sPpoeNeeJEYeWk5VY4/zHrec8/UdIypkWnLf5UzblMma6raNvyyGuK0/ZVnlie+xvoXHTM4RR8kc+3UmKazr6zXehIYHk/O35oKBrsayVBa2eBUjVRocDmUClJoMPCf5z51nlMsMDPr7j6nce78gSdPsnS/mxWeMGvviL+FrUoZMffPpv/DcM8Kt2jLVdXDHr63iY20s3Z2XKSt/fXxZ18ssvvB+g198W2+lyGt5dubjD1w9wr3KHjXKcu5JSnLSlH7C180W9koTB8XsEiPTK3qaS6uw+c5RAPYfM/DT+ceiZFe2l+ti12icPB7tiZtxOJ/m/4NBxP+Hj4oQM98NNLU1kodAS+Im4Jlxsfo2NxrCL0w2910aO/A0nHmy6yWQiZRYM+UDaUt0QEWUXDOIotlqmnvY0/iIDoZbtajpIbW37NtWOTfDQ2LGmSEmyW7/1BDmBY87056ekj61GWrV09LjJ+/4L1u/tdR/yzLhubSZht82mrDyuHIURZTKcFqN4y0/QE/7OsVy/Kw9N7l9E+ar+bO3F763ixMMozbvby3Eg85wGxO9X/1mLDm1s6qR9kz1W7Nop97lvYn89Ci4cV/9dbH7frMP2mgcTanueeYP1QiS37lonIGcGSKDCylSKJisSeu5BSn6smEpmHjB84zdG8I7aSx5GfWTiIBeGvmAbK6RUTBbEJFyzmoqrsCTRsS9reMTFAVpYF1iwmEvt2QdH2ErK8dUTB3oWLqLVT1I0PT3Rid2LIczzo3hCwlF+0vDB3OPNOmHb/2ifwysSQu85hvJEUYw6kHls4dKCMZYk3x7s9UPfSEU9yT+yhJGHPhiBwdBar5Yuw5pOiTRg6n0HGDIBZFXKjUFzScg2U8p7PqZH7+CfGVEhapaCnzvyGiEI6OvHjAGiAO6qxRy6U0T/TONzMJkx40hK1mKRSPTpIYaYbGFU+LEIcaGdYhmVvwxHZDmqpH02vTOzwETfqJJVLkKFFRe02qYea3DgN2BPaksPm05Ci0MgAA') format('woff2'),\r\n  url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('woff'),\r\n  url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype'), \r\n  url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('svg'); /* iOS 4.1- */\r\n}\r\n\r\n.iconfont {\r\n  font-family: \"iconfont\" !important;\r\n  font-size: 16px;\r\n  font-style: normal;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.icon-setting:before {\r\n  content: \"\\e605\";\r\n}\r\n\r\n.icon-zhongzhi:before {\r\n  content: \"\\e628\";\r\n}\r\n\r\n.icon-huojian:before {\r\n  content: \"\\e719\";\r\n}\r\n\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);

 //用户协议

if (/\.sflep\.com/.test(location.href)) {
  if (!_global__WEBPACK_IMPORTED_MODULE_0__[/* DEBUG_MODE */ "b"]) {
    var status = eval(GM_getValue("acceptAgreement", "false"));

    if (!status) {
      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        title: "使用须知",
        width: 700,
        html: "\n                <div style=\"text-align: left;\">\n                    <li>\u672C\u811A\u672C\u4EC5\u4F9B\u4E2A\u4EBA\u5B66\u4E60\u4EA4\u6D41\u4F7F\u7528\uFF0C\u52FF\u7528\u4E8E\u4EFB\u4F55\u8FDD\u6CD5\u4E0E\u5546\u4E1A\u884C\u4E3A</li>\n                    <li>\u672C\u811A\u672C\u5B8C\u5168\u5F00\u6E90\u514D\u8D39\uFF0C\u57FA\u4E8EGPL3.0\uFF0C\u6B22\u8FCE\u4E00\u8D77<a href=\"https://github.com/SSmJaE/WELearnHelper\" target=\"_blank\">\u5F00\u53D1</a></li>\n                    <li>\u56E0\u4F7F\u7528\u672C\u811A\u672C\u9020\u6210\u7684\u4EFB\u4F55\u95EE\u9898\uFF0C\u5747\u7531\u4F7F\u7528\u8005\u672C\u4EBA\u627F\u62C5</li>\n                    <li>\u53CD\u9988\u95EE\u9898\u8BF7\u5E26\u622A\u56FE + \u9898\u76EE\u94FE\u63A5 + \u5177\u4F53\u63CF\u8FF0</li>\n                </div>\n                ",
        icon: "warning",
        confirmButtonText: "接受",
        allowOutsideClick: false,
        showCancelButton: false
      }).then(function (result) {
        if (result.isConfirmed) {
          sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
            title: "使用提示",
            width: 700,
            html: "\n                        <div style=\"text-align: left;\">\n                            <li>\u6B64\u5904\u4EC5\u5305\u542B\u90E8\u5206\u4F7F\u7528\u65B9\u6CD5\uFF0C\u8BE6\u60C5\u8BF7\u81EA\u884C\u9605\u8BFB\u5B89\u88C5\u9875\u9762</li>\n                            <li>\u70B9\u51FB\u9F7F\u8F6E\u8FDB\u884C\u529F\u80FD\u8BBE\u5B9A</li>\n                            <li>\u5DE6\u952E\u6309\u4F4F\u201CWELearn Helper\u201D\u65B9\u53EF\u62D6\u52A8\u60AC\u6D6E\u7A97</li>\n                            <li>\u53CC\u51FB\u201CWELearn Helper\u201D\u5C55\u5F00\u60AC\u6D6E\u7A97</li>\n                        </div>\n                        ",
            icon: "info"
          });
          GM_setValue("acceptAgreement", "true");
        }
      });
    }
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_button_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n.my-button {\r\n  display: inline-block;\r\n  margin: 2px 0px;\r\n  padding: 5px 12px;\r\n  /* height: 20px; */\r\n  font-size: 20px;\r\n  cursor: pointer;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n  background-color: white;\r\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),\r\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n  font-family: \"华文新魏\", \"新宋体\";\r\n  border-radius: 4px;\r\n  line-height: normal;\n}\n.my-button:hover {\r\n  /* color: rgb(29, 161, 242); */\r\n  background-color: rgb(229, 229, 229);\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_panel_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n#welearn-helper {\r\n  top: 100px;\r\n  left: 100px;\r\n  z-index: 99;\r\n  position: fixed;\r\n\r\n  min-width: 300px;\r\n  max-width: 500px;\r\n\r\n  background: rgba(255, 255, 255, 0.95);\r\n  border-radius: 8px;\r\n  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),\r\n    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);\r\n\r\n  font-family: Georgia, \"Times New Roman\", Times, serif;\r\n  line-height: normal;\n}\n#welearn-helper:not(:hover) {\r\n  filter: brightness(98%);\n}\n#container-title {\r\n  cursor: -webkit-grab;\r\n  cursor: grab;\r\n  -webkit-user-select: none;\r\n     -moz-user-select: none;\r\n      -ms-user-select: none;\r\n          user-select: none;\r\n\r\n  font-size: 28px;\r\n  text-align: center;\r\n\r\n  background: rgba(0, 0, 0, 0);\n}\n#container-setting-button {\r\n  position: absolute;\r\n  top: 3px;\r\n  left: 3px;\r\n\r\n  font-size: 23px;\r\n\r\n  cursor: pointer;\n}\n#container-setting-button:hover {\r\n  color: rgb(0, 230, 227);\n}\n#container-control button {\r\n  font-size: 16px;\n}\n#container-messages {\r\n  /* margin: 0 10px; */\r\n  border: black 1px solid;\r\n  max-height: 400px;\r\n  overflow-y: auto;\n}\n.container-message {\r\n  font-size: 18px;\r\n  /* white-space: pre-wrap; */\r\n  position: relative;\r\n  -webkit-animation: content_slide_in 0.5s;\r\n          animation: content_slide_in 0.5s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\r\n\r\n  margin: 5px 10px;\r\n  padding: 0px;\r\n  padding-bottom: 3px;\r\n  line-height: 120%;\n}\n.container-message:hover:not(hr) {\r\n  padding-bottom: 1px;\r\n  border-bottom: 2px solid black;\r\n  cursor: copy;\n}\n#container-messages .error {\r\n  color: red;\n}\n#container-messages .success {\r\n  color: green;\n}\n#container-messages .info {\r\n  color: #2196f3;\n}\n#container-messages hr {\r\n  margin: 5px 0px;\n}\n@-webkit-keyframes content_slide_in {\nfrom {\r\n    left: -50%;\r\n    opacity: 0;\n}\nto {\r\n    left: 0%;\r\n    opacity: 1;\n}\n}\n@keyframes content_slide_in {\nfrom {\r\n    left: -50%;\r\n    opacity: 0;\n}\nto {\r\n    left: 0%;\r\n    opacity: 1;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_switch_vue_vue_type_style_index_0_id_5a70c9ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_switch_vue_vue_type_style_index_0_id_5a70c9ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_switch_vue_vue_type_style_index_0_id_5a70c9ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_switch_vue_vue_type_style_index_0_id_5a70c9ba_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\r\n/* 限定label标签属性，也就是checkbox的包装器 */\nlabel[data-v-5a70c9ba] {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 50px;\r\n  height: 25px;\r\n  /* margin: 2px 5px;\r\n    border: black 1px solid; */\r\n  border-radius: 38px;\r\n  /* vertical-align: middle; */\n}\r\n\r\n/* 不显示checkbox本身，通过点击外部的label实现点击input的效果 */\nlabel input[data-v-5a70c9ba] {\r\n  opacity: 0;\r\n  width: 0;\r\n  height: 0;\n}\r\n\r\n/* 未选中，滑条效果 */\n#slider[data-v-5a70c9ba] {\r\n  position: absolute;\r\n  z-index: 11;\r\n  /* cursor: pointer; */\r\n  top: 0;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  transition: 0.4s;\r\n  border-radius: 38px;\r\n  background-color: rgb(234, 234, 234);\n}\r\n\r\n/* 未选中，点击时滑条效果 */\ninput:not(:checked):active ~ #slider[data-v-5a70c9ba] {\r\n  background-color: rgb(187, 187, 187);\n}\r\n\r\n/* 选中时，滑条效果 */\ninput:checked ~ #slider[data-v-5a70c9ba] {\r\n  background-color: #2196f3;\n}\n#switch[data-v-5a70c9ba] {\r\n  position: absolute;\r\n  z-index: 12;\r\n  height: 23px;\r\n  width: 23px;\r\n  left: 1px;\r\n  bottom: 1px;\r\n  background-color: white;\r\n  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 0 rgba(0, 0, 0, 0.08);\r\n  border-radius: 50%;\n}\r\n\r\n/* 未选中，点击时滑块效果 */\ninput:active + #switch[data-v-5a70c9ba] {\r\n  border-radius: 38px;\r\n  -webkit-animation-name: widen_to_right-data-v-5a70c9ba;\r\n          animation-name: widen_to_right-data-v-5a70c9ba;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\n}\r\n\r\n/* 已选中，点击时滑块效果 */\ninput:checked:active + #switch[data-v-5a70c9ba] {\r\n  -webkit-animation-name: widen_to_left-data-v-5a70c9ba;\r\n          animation-name: widen_to_left-data-v-5a70c9ba;\r\n  -webkit-animation-duration: 0.4s;\r\n          animation-duration: 0.4s;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\n}\r\n\r\n/* 滑块点击右移效果 */\ninput:checked + #switch[data-v-5a70c9ba] {\r\n  -webkit-animation-name: slide_to_right-data-v-5a70c9ba;\r\n          animation-name: slide_to_right-data-v-5a70c9ba;\r\n  -webkit-animation-duration: 0.2s;\r\n          animation-duration: 0.2s;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\n}\r\n\r\n/* 滑块点击左移效果 */\ninput:not(:checked):not(:active) + #switch[data-v-5a70c9ba] {\r\n  left: 1%;\r\n  -webkit-animation-name: slide_to_left-data-v-5a70c9ba;\r\n          animation-name: slide_to_left-data-v-5a70c9ba;\r\n  -webkit-animation-duration: 0.2s;\r\n          animation-duration: 0.2s;\r\n  -webkit-animation-fill-mode: forwards;\r\n          animation-fill-mode: forwards;\n}\n@-webkit-keyframes slide_to_right-data-v-5a70c9ba {\n0% {\r\n    width: 36px;\n}\r\n\r\n  /* 80% { */\r\n  /* border-radius: 10px; */\r\n  /* } */\n100% {\r\n    left: 26px;\n}\n}\n@keyframes slide_to_right-data-v-5a70c9ba {\n0% {\r\n    width: 36px;\n}\r\n\r\n  /* 80% { */\r\n  /* border-radius: 10px; */\r\n  /* } */\n100% {\r\n    left: 26px;\n}\n}\n@-webkit-keyframes slide_to_left-data-v-5a70c9ba {\n0% {\r\n    width: 36px;\n}\r\n\r\n  /* 80% { */\r\n  /* border-radius: 10px; */\r\n  /* } */\n100% {\r\n    left: 1%;\n}\n}\n@keyframes slide_to_left-data-v-5a70c9ba {\n0% {\r\n    width: 36px;\n}\r\n\r\n  /* 80% { */\r\n  /* border-radius: 10px; */\r\n  /* } */\n100% {\r\n    left: 1%;\n}\n}\n@-webkit-keyframes widen_to_right-data-v-5a70c9ba {\n100% {\r\n    width: 36px;\n}\n}\n@keyframes widen_to_right-data-v-5a70c9ba {\n100% {\r\n    width: 36px;\n}\n}\n@-webkit-keyframes widen_to_left-data-v-5a70c9ba {\n0% {\r\n    left: 26px;\n}\n100% {\r\n    left: 13px;\r\n    width: 36px;\n}\n}\n@keyframes widen_to_left-data-v-5a70c9ba {\n0% {\r\n    left: 26px;\n}\n100% {\r\n    left: 13px;\r\n    width: 36px;\n}\n}\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_setting_vue_vue_type_style_index_0_id_234d1526_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_setting_vue_vue_type_style_index_0_id_234d1526_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_setting_vue_vue_type_style_index_0_id_234d1526_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_ref_2_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_node_modules_vue_loader_lib_index_js_vue_loader_options_setting_vue_vue_type_style_index_0_id_234d1526_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(false);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "\n#container-setting-base[data-v-234d1526] {\r\n  display: none;\r\n  position: fixed;\r\n\r\n  top: 20%;\r\n  left: 50%;\r\n  width: 700px;\r\n  margin: 20px;\r\n  z-index: 101;\r\n\r\n  font-size: 16px;\r\n  line-height: 100%;\r\n\r\n  background: rgba(255, 255, 255, 0.95);\r\n  border: black 2px solid;\r\n  border-radius: 20px;\r\n\r\n  transform: translate(-50%, 0%);\r\n  -webkit-animation: slide_in-data-v-234d1526 0.8s;\r\n          animation: slide_in-data-v-234d1526 0.8s;\r\n  -webkit-animation-timing-function: ease-out;\r\n          animation-timing-function: ease-out;\n}\n@-webkit-keyframes slide_in-data-v-234d1526 {\nfrom {\r\n    left: 0%;\r\n    opacity: 0;\n}\n80% {\r\n    left: 53%;\n}\nto {\r\n    left: 50%;\r\n    opacity: 1;\n}\n}\n@keyframes slide_in-data-v-234d1526 {\nfrom {\r\n    left: 0%;\r\n    opacity: 0;\n}\n80% {\r\n    left: 53%;\n}\nto {\r\n    left: 50%;\r\n    opacity: 1;\n}\n}\ndiv.section[data-v-234d1526] {\r\n  margin: 0 10px;\n}\ndiv.title[data-v-234d1526] {\r\n  text-align: center;\r\n  font-size: 24px;\r\n  cursor: pointer;\r\n  margin-bottom: 5px;\n}\ndiv.body[data-v-234d1526] {\r\n  overflow: hidden;\n}\r\n\r\n/* 旋转箭头 */\nsvg.arrow-down[data-v-234d1526] {\r\n  position: relative;\r\n  top: 5px;\r\n  left: 0px;\r\n  transition-duration: 0.6s;\n}\nsvg.arrow-down.opened[data-v-234d1526] {\r\n  transform: rotate(180deg);\n}\r\n/* -------------------- */\r\n\r\n/* 抽屉 */\n.toggle-slide-leave-active[data-v-234d1526],\r\n.toggle-slide-enter-active[data-v-234d1526] {\r\n  transition: all 0.6s;\n}\n.toggle-slide-enter[data-v-234d1526],\r\n.toggle-slide-leave-to[data-v-234d1526] {\r\n  max-height: 0;\r\n  opacity: 0;\n}\n.toggle-slide-enter-to[data-v-234d1526],\r\n.toggle-slide-leave[data-v-234d1526] {\r\n  max-height: 300px;\n}\r\n/* -------------------- */\ndiv.record[data-v-234d1526] {\r\n  display: table-row;\r\n  text-align: center;\r\n  margin: 5px 0px;\r\n  padding: 5px;\n}\n.record-left[data-v-234d1526] {\r\n  display: table-cell;\r\n  cursor: pointer;\r\n  width: 80px;\n}\r\n\r\n/* 中间部分居中对齐的实现 */\n.record-middle[data-v-234d1526] {\r\n  display: table-cell;\r\n  text-align: center;\r\n  min-width: 100px;\r\n  max-width: 100px;\r\n  min-height: 25px;\r\n  margin: 2px 5px;\r\n  padding: 0px;\n}\n.record-middle .input[data-v-234d1526] {\r\n  width: 80px;\r\n  height: 21px;\r\n  text-align: center;\r\n  font-size: 16px;\n}\n.record-middle .my-switch[data-v-234d1526] {\r\n  vertical-align: middle;\r\n  margin: 2px 5px;\n}\n.record-middle .readonly[data-v-234d1526] {\r\n  min-height: 25px;\r\n  margin-top: 5px;\n}\r\n/* -------------------- */\n.record-right[data-v-234d1526] {\r\n  display: table-cell;\r\n  text-align: left;\n}\nhr[data-v-234d1526] {\r\n  margin: 5px;\n}\n.container-setting-footer[data-v-234d1526] {\r\n  display: flex;\r\n  justify-content: center;\r\n  /* justify-content: flex-end; */\r\n  margin: 5px 0;\n}\n.container-setting-footer .my-button[data-v-234d1526] {\r\n  margin: 0 5px;\n}\r\n\r\n/* #container-setting-save {\r\n  position: relative;\r\n  margin: 5px;\r\n  left: 50%;\r\n  transform: translate(-55%, 5%);\r\n} */\r\n", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

// EXTERNAL MODULE: ./assets/iconfont/iconfont.css
var iconfont = __webpack_require__(29);

// EXTERNAL MODULE: ./src/global.ts
var global = __webpack_require__(0);

// CONCATENATED MODULE: ./src/settings.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// 放置通用(全局)设置
var settings_controlCenter = [{
  title: "用户",
  display: true,
  settings: [{
    id: "userAccount",
    name: "身份令牌",
    "default": "default",
    description: "随意设定，累计每个人贡献的题目数量"
  }, {
    id: "userPoints",
    name: "累计积分",
    type: "readonly",
    "default": 0,
    description: "上传答案获取，暂无用处"
  }]
}, {
  title: "悬浮窗",
  display: true,
  settings: [{
    id: "autoCopy",
    name: "自动复制",
    type: "switch",
    "default": true,
    description: "开启时，点击悬浮窗的对应消息自动复制到粘贴板"
  }, {
    id: "autoSlide",
    name: "自动下滑",
    type: "switch",
    "default": true,
    description: "有新消息时，窗口是否自动下滑到新消息处"
  }]
}];
/**
 * 合并所有插件的设置
 */

function mergeSettings(controlCenter, pluginSettings) {
  var _iterator = _createForOfIteratorHelper(pluginSettings),
      _step;

  try {
    var _loop = function _loop() {
      var target = _step.value;
      if (!controlCenter.some(function (section) {
        return section.title == target.title;
      })) controlCenter.push({
        title: target.title,
        display: target.display,
        settings: []
      });
      var index = void 0;

      for (var i = 0; i < controlCenter.length; i++) {
        if (controlCenter[i].title == target.title) {
          index = i;
        }
      }

      if (typeof index == "undefined") throw Error("error during get index ");

      var _iterator2 = _createForOfIteratorHelper(target.settings),
          _step2;

      try {
        var _loop2 = function _loop2() {
          var generic = _step2.value;
          var settings = controlCenter[index].settings;
          if (!settings.some(function (setting) {
            return setting.id == generic.id;
          })) controlCenter[index].settings.push(generic);
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };

    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop();
    } //todo 根据当前页面，动态设置display

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
} //*-----------------------------------------------------------------------------------


/**
 * 通过集成了所有插件设置的设置中心，设置USER_SETTINGS的默认值
 */

function setDefaultValues(controlCenter) {
  //todo 是都需要检查gm取出的值的合法性？
  var _iterator3 = _createForOfIteratorHelper(controlCenter),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var section = _step3.value;

      var _iterator4 = _createForOfIteratorHelper(section.settings),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var generic = _step4.value;
          if (global["c" /* Global */].USER_SETTINGS[generic.id] == undefined) global["c" /* Global */].USER_SETTINGS[generic.id] = generic["default"];
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}
function returnDefaultValues() {
  var _iterator5 = _createForOfIteratorHelper(settings_controlCenter),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var section = _step5.value;

      var _iterator6 = _createForOfIteratorHelper(section.settings),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var generic = _step6.value;
          global["c" /* Global */].USER_SETTINGS[generic.id] = generic["default"];
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }
}
// EXTERNAL MODULE: ./src/initial.ts
var initial = __webpack_require__(31);

// EXTERNAL MODULE: external "Vue"
var external_Vue_ = __webpack_require__(19);
var external_Vue_default = /*#__PURE__*/__webpack_require__.n(external_Vue_);

// CONCATENATED MODULE: ./node_modules/vue-ripple-directive/src/ripple.js
var Ripple = {
    bind: function(el, binding){

        // Default values.
        var props = {
            event: 'mousedown',
            transition: 600
        };

        setProps(Object.keys(binding.modifiers),props);

        el.addEventListener(props.event, function(event) {
            rippler(event, el, binding.value);
        });

        var bg = binding.value || Ripple.color || 'rgba(0, 0, 0, 0.35)';
        var zIndex = Ripple.zIndex || '9999';

        function rippler(event, el) {
            var target = el;
            // Get border to avoid offsetting on ripple container position
            var targetBorder = parseInt((getComputedStyle(target).borderWidth).replace('px', ''));

            // Get necessary variables
            var rect        = target.getBoundingClientRect(),
                left        = rect.left,
                top         = rect.top,
                width       = target.offsetWidth,
                height      = target.offsetHeight,
                dx          = event.clientX - left,
                dy          = event.clientY - top,
                maxX        = Math.max(dx, width - dx),
                maxY        = Math.max(dy, height - dy),
                style       = window.getComputedStyle(target),
                radius      = Math.sqrt((maxX * maxX) + (maxY * maxY)),
                border      = (targetBorder > 0 ) ? targetBorder : 0;

            // Create the ripple and its container
            var ripple = document.createElement("div"),
                rippleContainer = document.createElement("div");
                rippleContainer.className = 'ripple-container';
                ripple.className = 'ripple';

            //Styles for ripple
            ripple.style.marginTop= '0px';
            ripple.style.marginLeft= '0px';
            ripple.style.width= '1px';
            ripple.style.height= '1px';
            ripple.style.transition= 'all ' + props.transition + 'ms cubic-bezier(0.4, 0, 0.2, 1)';
            ripple.style.borderRadius= '50%';
            ripple.style.pointerEvents= 'none';
            ripple.style.position= 'relative';
            ripple.style.zIndex= zIndex;
            ripple.style.backgroundColor  = bg;

            //Styles for rippleContainer
            rippleContainer.style.position= 'absolute';
            rippleContainer.style.left = 0 - border + 'px';
            rippleContainer.style.top = 0 - border + 'px';
            rippleContainer.style.height = '0';
            rippleContainer.style.width = '0';
            rippleContainer.style.pointerEvents = 'none';
            rippleContainer.style.overflow = 'hidden';

            // Store target position to change it after
            var storedTargetPosition =  ((target.style.position).length > 0) ? target.style.position : getComputedStyle(target).position;
            // Change target position to relative to guarantee ripples correct positioning
            if (storedTargetPosition !== 'relative') {
                target.style.position = 'relative';
            }

            rippleContainer.appendChild(ripple);
            target.appendChild(rippleContainer);

            ripple.style.marginLeft   = dx + "px";
            ripple.style.marginTop    = dy + "px";

            // No need to set positioning because ripple should be child of target and to it's relative position.
            // rippleContainer.style.left    = left + (((window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0)) || 0) + "px";
            // rippleContainer.style.top     = top + (((window.pageYOffset || document.scrollTop) - (document.clientTop || 0)) || 0) + "px";
            rippleContainer.style.width   = width + "px";
            rippleContainer.style.height  = height + "px";
            rippleContainer.style.borderTopLeftRadius  = style.borderTopLeftRadius;
            rippleContainer.style.borderTopRightRadius  = style.borderTopRightRadius;
            rippleContainer.style.borderBottomLeftRadius  = style.borderBottomLeftRadius;
            rippleContainer.style.borderBottomRightRadius  = style.borderBottomRightRadius;

            rippleContainer.style.direction = 'ltr';

            setTimeout(function() {
                ripple.style.width  = radius * 2 + "px";
                ripple.style.height = radius * 2 + "px";
                ripple.style.marginLeft   = dx - radius + "px";
                ripple.style.marginTop    = dy - radius + "px";
            }, 0);

            function clearRipple() {
                setTimeout(function() {
                    ripple.style.backgroundColor = "rgba(0, 0, 0, 0)";
                }, 250);

                // Timeout set to get a smooth removal of the ripple
                setTimeout(function() {
                    rippleContainer.parentNode.removeChild(rippleContainer);
                }, 850);

                el.removeEventListener('mouseup', clearRipple, false);

                // After removing event set position to target to it's original one
                // Timeout it's needed to avoid jerky effect of ripple jumping out parent target
                setTimeout(function () {

                    var clearPosition = true;
                    for(var i = 0; i < target.childNodes.length; i++) {
                        if(target.childNodes[i].className === 'ripple-container') {
                            clearPosition = false;
                        }
                    }

                    if(clearPosition) {
                        if(storedTargetPosition !== 'static') {
                            target.style.position = storedTargetPosition;
                        } else {
                            target.style.position = '';
                        }
                    }

                }, props.transition + 250)
            }

            if(event.type === 'mousedown') {
                el.addEventListener('mouseup', clearRipple, false);
            } else {
                clearRipple();
            }
        }
    }
};

function setProps(modifiers,props) {
    modifiers.forEach(function(item) {
        if(isNaN(Number(item)))
            props.event = item;
        else
            props.transition = item;
    });
}

/* harmony default export */ var ripple = (Ripple);
// EXTERNAL MODULE: ./src/utils/common.ts
var common = __webpack_require__(2);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/panel.vue?vue&type=template&id=f8b1e34c&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.Global.collapse,
          expression: "Global.collapse"
        }
      ],
      attrs: { id: "container-panel" }
    },
    [
      _c("div", {
        staticClass: "iconfont icon-setting",
        attrs: { id: "container-setting-button" },
        on: {
          click: function($event) {
            return _vm.showSetting()
          }
        }
      }),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "container-control" } },
        [
          _vm.Global.showExamQueryButton
            ? _c("my-button", {
                attrs: {
                  id: "container-check",
                  label: "查询",
                  title:
                    "查询班级测试的答案，不一定有答案，如果没有答案，会返回每个选项的被其它同学选择的次数"
                },
                on: {
                  click: function($event) {
                    return _vm.retrieveAllQuestions()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _vm.Global.showExamUploadButton
            ? _c("my-button", {
                attrs: {
                  label: "上传",
                  title:
                    "尝试收录任务页面的所有任务的答案，1小时仅能上传一次，建议做完一个测试之后上传一次"
                },
                on: {
                  click: function($event) {
                    return _vm.upload()
                  }
                }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("my-button", {
            attrs: {
              label: "Github",
              onclick:
                "window.open('https://github.com/SSmJaE/WELearnHelper','_blank')",
              title: "本项目的仓库"
            }
          }),
          _vm._v(" "),
          _c("my-button", {
            attrs: { id: "container-comment", label: "留言" },
            on: {
              click: function($event) {
                return _vm.showComment()
              }
            }
          }),
          _vm._v(" "),
          _c("my-button", {
            attrs: { label: "折叠" },
            on: {
              click: function($event) {
                return _vm.collapsePanel()
              }
            }
          }),
          _vm._v(" "),
          _c("my-button", {
            attrs: {
              label: "交流群",
              onclick:
                "window.open('https://jq.qq.com/?_wv=1027&k=5AyCT4l','_blank')"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "div",
        { attrs: { id: "container-messages" } },
        _vm._l(_vm.Global.messages, function(message, index) {
          return _c("div", {
            key: index,
            staticClass: "container-message",
            class: message.type,
            domProps: {
              innerHTML: _vm._s(message.type == "hr" ? "<hr>" : message.info)
            },
            on: {
              click: function($event) {
                return _vm.autoCopy(message.info)
              }
            }
          })
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/views/panel.vue?vue&type=template&id=f8b1e34c&

// EXTERNAL MODULE: ./node_modules/sweetalert2/dist/sweetalert2.all.js
var sweetalert2_all = __webpack_require__(6);
var sweetalert2_all_default = /*#__PURE__*/__webpack_require__.n(sweetalert2_all);

// EXTERNAL MODULE: ./src/plugins/index.ts + 8 modules
var plugins = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/components/button.vue?vue&type=template&id=064c47be&
var buttonvue_type_template_id_064c47be_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [{ name: "ripple", rawName: "v-ripple" }],
      staticClass: "my-button",
      attrs: { title: _vm.title },
      on: {
        click: function($event) {
          return _vm.$emit("click", $event)
        }
      }
    },
    [_vm._v("\n  " + _vm._s(_vm.label) + "\n")]
  )
}
var buttonvue_type_template_id_064c47be_staticRenderFns = []
buttonvue_type_template_id_064c47be_render._withStripped = true


// CONCATENATED MODULE: ./src/views/components/button.vue?vue&type=template&id=064c47be&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/components/button.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var buttonvue_type_script_lang_js_ = ({
  name: "MyButton",
  props: {
    label: {
      type: String,
      "default": ""
    },
    title: {
      type: String,
      "default": ""
    }
  }
});
// CONCATENATED MODULE: ./src/views/components/button.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_buttonvue_type_script_lang_js_ = (buttonvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/components/button.vue?vue&type=style&index=0&lang=css&
var buttonvue_type_style_index_0_lang_css_ = __webpack_require__(32);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/views/components/button.vue






/* normalize component */

var component = normalizeComponent(
  components_buttonvue_type_script_lang_js_,
  buttonvue_type_template_id_064c47be_render,
  buttonvue_type_template_id_064c47be_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/views/components/button.vue"
/* harmony default export */ var components_button = (component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/panel.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global GM_setClipboard */




/* harmony default export */ var panelvue_type_script_lang_js_ = ({
  components: {
    "my-button": components_button
  },
  data: function data() {
    return {
      Global: global["c" /* Global */]
    };
  },
  computed: {
    points: function points() {
      return this.Global.points;
    }
  },
  methods: {
    retrieveAllQuestions: function retrieveAllQuestions() {
      console.log(111);

      Object(plugins["retrieveAllQuestions"])();

      console.log(222);
    },
    autoCopy: function autoCopy(text) {
      if (global["c" /* Global */].USER_SETTINGS.autoCopy) GM_setClipboard(text.replace(/^.*、/, ""), "text");
    },
    showComment: function showComment() {
      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
        var _yield$Swal$fire, text;

        return regenerator_default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return sweetalert2_all_default.a.fire({
                  title: "留言",
                  input: "textarea",
                  inputPlaceholder: "期待大家的反馈，如果有任何问题，都可以给我留言，我会定期查看。最好留下联系方式，方便后续交流。",
                  confirmButtonText: "发送",
                  width: 600
                });

              case 2:
                _yield$Swal$fire = _context.sent;
                text = _yield$Swal$fire.value;
                if (text) plugins["Requests"].sendComment(text);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    showSetting: function showSetting() {
      var settingBase = document.querySelector("#container-setting-base");
      settingBase.style.display = settingBase.style.display == "table" ? "none" : "table";
    },
    test: function test() {
      var _this = this;

      [{
        info: "We will do everything to ___________ peace.",
        type: "normal"
      }, {
        info: "preserve",
        type: "normal"
      }, {
        info: "新增收录",
        type: "normal"
      }, {
        info: "新增收录",
        type: "hr"
      }].forEach(function (e) {
        return _this.Global.messages.push(e);
      });
    },
    collapsePanel: function collapsePanel() {
      this.Global.collapse = false;
    },
    upload: function upload() {
      plugins["Requests"].upload();
    }
  }
});
// CONCATENATED MODULE: ./src/views/panel.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_panelvue_type_script_lang_js_ = (panelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/panel.vue?vue&type=style&index=0&lang=css&
var panelvue_type_style_index_0_lang_css_ = __webpack_require__(34);

// CONCATENATED MODULE: ./src/views/panel.vue






/* normalize component */

var panel_component = normalizeComponent(
  views_panelvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var panel_api; }
panel_component.options.__file = "src/views/panel.vue"
/* harmony default export */ var panel = (panel_component.exports);
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/setting.vue?vue&type=template&id=234d1526&scoped=true&
var settingvue_type_template_id_234d1526_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "container-setting-base" } },
    [
      _vm._l(_vm.sections, function(section, index) {
        return _c(
          "div",
          { key: index, staticClass: "section" },
          [
            index !== 0 ? _c("hr") : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "title",
                on: {
                  click: function($event) {
                    section.display = !section.display
                  }
                }
              },
              [
                _vm._v("\n      " + _vm._s(section.title) + "\n      "),
                _c(
                  "svg",
                  {
                    staticClass: "arrow-down",
                    class: section.display ? "opened" : "",
                    attrs: { width: "24", height: "24" }
                  },
                  [
                    _c("path", {
                      attrs: {
                        d:
                          "M12 13L8.285 9.218a.758.758 0 0 0-1.064 0 .738.738 0 0 0 0 1.052l4.249 4.512a.758.758 0 0 0 1.064 0l4.246-4.512a.738.738 0 0 0 0-1.052.757.757 0 0 0-1.063 0L12.002 13z",
                        "fill-rule": "evenodd"
                      }
                    })
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _c("transition", { attrs: { name: "toggle-slide" } }, [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: section.display,
                      expression: "section.display"
                    }
                  ],
                  staticClass: "body"
                },
                _vm._l(section.settings, function(setting) {
                  return _c("div", { key: setting.id, staticClass: "record" }, [
                    _c(
                      "label",
                      {
                        staticClass: "record-left",
                        attrs: { for: setting.id }
                      },
                      [_vm._v(_vm._s(setting.name))]
                    ),
                    _vm._v(" "),
                    _c(
                      "div",
                      { staticClass: "record-middle" },
                      [
                        setting.type === "readonly"
                          ? [
                              _c("div", { staticClass: "readonly" }, [
                                _vm._v(
                                  "\n                " +
                                    _vm._s(
                                      _vm.Global.USER_SETTINGS[setting.id]
                                    ) +
                                    "\n              "
                                )
                              ])
                            ]
                          : setting.type === "switch"
                          ? [
                              _c("my-switch", {
                                attrs: { id: setting.id },
                                model: {
                                  value: _vm.Global.USER_SETTINGS[setting.id],
                                  callback: function($$v) {
                                    _vm.$set(
                                      _vm.Global.USER_SETTINGS,
                                      setting.id,
                                      $$v
                                    )
                                  },
                                  expression: "Global.USER_SETTINGS[setting.id]"
                                }
                              })
                            ]
                          : [
                              _c("input", {
                                staticClass: "input",
                                attrs: { id: setting.id },
                                domProps: {
                                  value: _vm.Global.USER_SETTINGS[setting.id]
                                },
                                on: {
                                  input: function($event) {
                                    _vm.Global.USER_SETTINGS[setting.id] =
                                      $event.target.value
                                  }
                                }
                              })
                            ]
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "record-right" }, [
                      _vm._v(
                        "\n            " +
                          _vm._s(setting.description) +
                          "\n          "
                      )
                    ])
                  ])
                }),
                0
              )
            ])
          ],
          1
        )
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "container-setting-footer" },
        [
          _c("my-button", {
            attrs: { label: "保存 & 刷新" },
            on: { click: _vm.saveChange }
          }),
          _vm._v(" "),
          _c("my-button", {
            attrs: { label: "还原默认值" },
            on: { click: _vm.setDefault }
          })
        ],
        1
      )
    ],
    2
  )
}
var settingvue_type_template_id_234d1526_scoped_true_staticRenderFns = []
settingvue_type_template_id_234d1526_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/views/setting.vue?vue&type=template&id=234d1526&scoped=true&

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/components/switch.vue?vue&type=template&id=5a70c9ba&scoped=true&
var switchvue_type_template_id_5a70c9ba_scoped_true_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("label", { staticClass: "my-switch", style: _vm.labelStyle }, [
    _c("input", {
      ref: "input",
      style: _vm.inputStyle,
      attrs: { id: _vm.id, type: "checkbox", disabled: _vm.disabled },
      domProps: { checked: _vm.checked },
      on: {
        change: function($event) {
          return _vm.$emit("change", $event.target.checked)
        }
      }
    }),
    _vm._v(" "),
    _c("span", { attrs: { id: "switch" } }),
    _vm._v(" "),
    _c("span", { attrs: { id: "slider" } })
  ])
}
var switchvue_type_template_id_5a70c9ba_scoped_true_staticRenderFns = []
switchvue_type_template_id_5a70c9ba_scoped_true_render._withStripped = true


// CONCATENATED MODULE: ./src/views/components/switch.vue?vue&type=template&id=5a70c9ba&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/components/switch.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var switchvue_type_script_lang_js_ = ({
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    width: {
      type: Number,
      "default": 50
    },
    height: {
      type: Number,
      "default": 25
    },
    id: {
      type: String,
      "default": undefined
    }
  },
  computed: {
    labelStyle: function labelStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px"
      };
    },
    inputStyle: function inputStyle() {
      return {};
    }
  }
});
// CONCATENATED MODULE: ./src/views/components/switch.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_switchvue_type_script_lang_js_ = (switchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/components/switch.vue?vue&type=style&index=0&id=5a70c9ba&scoped=true&lang=css&
var switchvue_type_style_index_0_id_5a70c9ba_scoped_true_lang_css_ = __webpack_require__(36);

// CONCATENATED MODULE: ./src/views/components/switch.vue






/* normalize component */

var switch_component = normalizeComponent(
  components_switchvue_type_script_lang_js_,
  switchvue_type_template_id_5a70c9ba_scoped_true_render,
  switchvue_type_template_id_5a70c9ba_scoped_true_staticRenderFns,
  false,
  null,
  "5a70c9ba",
  null
  
)

/* hot reload */
if (false) { var switch_api; }
switch_component.options.__file = "src/views/components/switch.vue"
/* harmony default export */ var components_switch = (switch_component.exports);
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./src/views/setting.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* global GM_setValue */





/* harmony default export */ var settingvue_type_script_lang_js_ = ({
  components: {
    "my-switch": components_switch,
    "my-button": components_button
  },
  data: function data() {
    return {
      Global: global["c" /* Global */],
      version: global["e" /* VERSION */],
      sections: settings_controlCenter
    };
  },
  created: function created() {
    plugins["Requests"].initial();
    plugins["Requests"].updatePoints();
  },
  methods: {
    saveChange: function saveChange() {
      GM_setValue("USER_SETTINGS", JSON.stringify(global["c" /* Global */].USER_SETTINGS));
      location.reload(true);
    },
    setDefault: function setDefault() {
      returnDefaultValues();
    }
  }
});
// CONCATENATED MODULE: ./src/views/setting.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_settingvue_type_script_lang_js_ = (settingvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/setting.vue?vue&type=style&index=0&id=234d1526&scoped=true&lang=css&
var settingvue_type_style_index_0_id_234d1526_scoped_true_lang_css_ = __webpack_require__(38);

// CONCATENATED MODULE: ./src/views/setting.vue






/* normalize component */

var setting_component = normalizeComponent(
  views_settingvue_type_script_lang_js_,
  settingvue_type_template_id_234d1526_scoped_true_render,
  settingvue_type_template_id_234d1526_scoped_true_staticRenderFns,
  false,
  null,
  "234d1526",
  null
  
)

/* hot reload */
if (false) { var setting_api; }
setting_component.options.__file = "src/views/setting.vue"
/* harmony default export */ var setting = (setting_component.exports);
// CONCATENATED MODULE: ./src/main.ts


 //设置应该是最先导入的，有很多功能都是基于设置动态变化的




Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee() {
  var _yield$import, pluginSettings;

  return regenerator_default.a.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Promise.resolve(/* import() */).then(__webpack_require__.bind(null, 7));

        case 2:
          _yield$import = _context.sent;
          pluginSettings = _yield$import.pluginSettings;
          mergeSettings(settings_controlCenter, pluginSettings);
          _context.next = 7;
          return new Promise(function (resolve) {
            if (!global["b" /* DEBUG_MODE */]) {
              global["c" /* Global */].USER_SETTINGS = JSON.parse(GM_getValue("USER_SETTINGS", "{}"));
              setDefaultValues(settings_controlCenter);
            }

            resolve();
          });

        case 7:
          //应用所有插件的初始化执行
          Promise.resolve(/* import() */).then(__webpack_require__.bind(null, 41));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))(); //应用全局初始化



 //注册vue水波纹效果


external_Vue_default.a.directive("ripple", ripple);




if (global["b" /* DEBUG_MODE */] || location.href.includes("centercourseware.sflep.com") || //练习答题页面，子页面
location.href.includes(".sflep.com/2019/test/") || //考试答题页面
location.href.includes(".sflep.com/2019/student/course_info.aspx?") //基准页面
) {
    if (!document.querySelector("#welearn-helper")) {
      //这部分相当于创建了一个原生页面
      var container = document.createElement("div");
      container.innerHTML = "\n        <div id=\"welearn-helper\">\n            <div id=\"container-title\">WELearn Helper</div>\n            <div id=\"container-panel\"></div>\n        </div>\n        <div id=\"container-setting-base\"></div>\n        ";
      document.body.appendChild(container);
      var title = document.querySelector("#container-title");
      title.addEventListener("dblclick", function () {
        global["c" /* Global */].collapse = true;
      }, false); //应用拖动

      Object(common["b" /* makeDraggable */])(title, document.querySelector("#welearn-helper"));
      new external_Vue_default.a(panel).$mount("#welearn-helper #container-panel");
      new external_Vue_default.a(setting).$mount("#container-setting-base");
    }
  }

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/global.ts
var global = __webpack_require__(0);

// CONCATENATED MODULE: ./src/plugins/exam/utils.ts
//PlaySound使用的全局变量
// var resPath = "https://courseres.sflep.com/Test/";
// var soundfile = "";
// var bufferingTimer: any;

/**
 * 替换原生的playSound函数，以实现无限播放听力
 */
function hackPlaySound() {
  /*答卷过程中调用的方法*/
  unsafeWindow.PlaySound = function (src, id) {
    var count = $("#hdPlay_" + id).val();
    if (count <= 0) return;

    if (soundfile == "") {
      soundfile = resPath + "ItemRes/sound/" + src;
      createSoundPlayer();
    } else {
      soundfile = resPath + "ItemRes/sound/" + src;
      jwplayer("soundplayer").load([{
        file: soundfile
      }]);
    } // jwplayer("soundplayer").onPlaylistComplete(function() {
    //     jwplayer("soundplayer").load([{ file: "" }]);
    // });


    jwplayer("soundplayer").onBufferFull(function () {
      clearTimeout(bufferingTimer);
      var sp = $("#btnPlay_" + id);
      sp.html('<span class=" fa fa-play-circle play_symble">' + "无限" + "次播放机会</span>"); //以下为原生调用
      // if (sp.length > 0) {
      //     var count = $("#hdPlay_" + id).val();
      //     if (count > 0) count--;
      //     //sp.val('播放（' + count + '次机会）');
      //     $("#hdPlay_" + id).val(count);
      //     if (count == 0) {
      //         //$('#btnPlay_' + id).attr("disabled", "disabled");
      //         $("#btnPlay_" + id).attr("href", "javascript:void(0);");
      //     }
      //     // SaveCurrentPart(false, true); //异步保存，实时更新听力次数
      // }

      sp.removeClass("loading");
    });
    $("#btnPlay_" + id).val("正在加载");
    bufferingTimer = setTimeout("PlayerExpireCheck('" + id + "', 0)", 1000);
    $("#btnPlay_" + id).addClass("loading");
    jwplayer("soundplayer").play();
  };
}
// CONCATENATED MODULE: ./src/plugins/exam/initial.ts



if (location.href.includes(".sflep.com/2019/test/")) {
  global["c" /* Global */].showExamQueryButton = true;

  if (global["c" /* Global */].USER_SETTINGS.infiniteListening) {
    window.addEventListener("load", function () {
      setTimeout(function () {
        hackPlaySound();
      }, 3000);
    }, false);
  }
}

if (location.href.includes(".sflep.com/2019/student/course_info.aspx?")) {
  global["c" /* Global */].showExamUploadButton = true;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(1);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__(3);

// EXTERNAL MODULE: ./src/utils/common.ts
var common = __webpack_require__(2);

// CONCATENATED MODULE: ./src/plugins/exercise/et/parser.ts
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ANSWER_TYPES = ["et-tof", "et-blank", "et-select", "et-choice", "et-matching", "et-reference"];
function parseEt(dom) {
  var realAnswers = [];

  var _iterator = _createForOfIteratorHelper(ANSWER_TYPES),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var answerType = _step.value;
      var answers = dom.querySelectorAll(answerType);
      console.log(answers);
      var index = 1;

      var _iterator2 = _createForOfIteratorHelper(answers),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var element = _step2.value;
          var answer = parseAnswer(element);

          if (answer) {
            answer.index = index;
            console.log(answer);
            realAnswers.push(answer);
            index++;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return realAnswers;
}


function parseAnswer(element) {
  var tag = element.tagName.toLowerCase();
  var answerText = "";

  switch (tag) {
    case "et-tof":
      answerText = element.getAttribute("key");
      break;

    case "et-blank":
      if (isRepeat(element)) return;
      answerText = element.textContent.split("|")[0];
      if (element.hasAttribute("block")) tag = "et-textarea";
      break;

    case "et-select":
      answerText = element.getAttribute("key");

      try {
        //todo 这是哪个类型的题的故障处理？
        if (!answerText.length) answerText = element.firstElementChild.textContent;
      } catch (error) {
        answerText = "Answers will vary.";
      }

      break;

    case "et-choice":
      if (isRepeat(element)) {
        //针对有只有inline的情况(视听说2 4-2)，也就是说，不能跳
        if (element.hasAttribute("inline")) {
          return;
        }
      } //针对视听说2 7-1重复，


      answerText = element.getAttribute("key");
      break;

    case "et-matching":
      if (isRepeat(element)) return;
      answerText = element.getAttribute("key").split(",").join("\n\t");
      break;

    case "et-reference":
      if (!global["c" /* Global */].USER_SETTINGS.showReference) return;
      answerText = element.innerHTML; // content.style.whiteSpace = "normal";

      break;
  }

  return {
    text: answerText,
    type: tag,
    element: element
  };
}
/**通过检测父节点，解决答案重复的问题*/


function isRepeat(answerNode) {
  var parentElement = answerNode,
      parentTag;
  var webFlag = 0;
  var mobileFlag = 0;

  try {
    for (var i = 0; i < 9; i++) {
      if (i !== 0) {
        parentElement = parentElement.parentElement;
      }

      parentTag = parentElement.tagName;
      if (parentTag == "ET-MOBILE-ONLY") mobileFlag++;
      if (parentTag == "ET-WEB-ONLY") webFlag++;
    }
  } catch (error) {// if (USER_SETTINGS.debugMode) console.log(error);
  } finally {
    if (webFlag && mobileFlag) {
      //针对web下嵌套mobile的题目，如视听说2的3-2-3
      if (webFlag > 1) {
        //针对4重嵌套，unit test常见
        return true;
      } else {
        return false;
      }
    } else if (webFlag) {
      //web和mobile只留其一，这里保留mobile，丢弃web
      return true;
    } else {
      return false;
    }
  }
}
// CONCATENATED MODULE: ./src/plugins/exercise/et/solver.ts



function solver_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = solver_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function solver_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return solver_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return solver_arrayLikeToArray(o, minLen); }

function solver_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ready_in(element) {
  $(element).trigger("click").trigger("focus").trigger("keydown").trigger("input");
}

function event_trigger(element) {
  $(element).trigger("keyup").trigger("change").trigger("blur");

  try {
    angular.element(element).triggerHandler("hover");
    angular.element(element).triggerHandler("keyup");
    angular.element(element).triggerHandler("blur");
  } catch (error) {}
}



function solveEt(_x) {
  return _solveEt.apply(this, arguments);
}

function _solveEt() {
  _solveEt = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(answers) {
    var tofOnPaper, tofOrder, blankOnPaper, textareaOnPaper, blankOrder, textareaOrder, selectOnPaper, selectOrder, optionOnPaper, optionSpanOnPaper, liOrder, spanOrder, optionOrder, _iterator, _step, answer, tofOption, targetOption, options, optionCount, spanFlag, _iterator2, _step2, option, matchingOrder, targetCircle, x1, y1, x2, y2;

    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tofOnPaper = document.querySelectorAll("et-tof span.controls span");
            tofOrder = 0;
            blankOnPaper = document.querySelectorAll("et-blank span.blank");
            textareaOnPaper = document.querySelectorAll("et-blank textarea.blank");
            blankOrder = 0;
            textareaOrder = 0;
            selectOnPaper = document.querySelectorAll("et-select div");
            selectOrder = 0;
            optionOnPaper = document.querySelectorAll("et-choice li");
            optionSpanOnPaper = document.querySelectorAll("et-choice span");
            liOrder = 0;
            spanOrder = 0;
            optionOrder = 0;
            _iterator = solver_createForOfIteratorHelper(answers);
            _context.prev = 14;

            _iterator.s();

          case 16:
            if ((_step = _iterator.n()).done) {
              _context.next = 75;
              break;
            }

            answer = _step.value;
            _context.next = 20;
            return Object(common["d" /* sleep */])(global["c" /* Global */].USER_SETTINGS.solveInterval);

          case 20:
            _context.t0 = answer.type;
            _context.next = _context.t0 === "et-tof" ? 23 : _context.t0 === "et-blank" ? 35 : _context.t0 === "et-textarea" ? 40 : _context.t0 === "et-select" ? 43 : _context.t0 === "et-choice" ? 49 : _context.t0 === "et-matching" ? 59 : 73;
            break;

          case 23:
            tofOption = undefined;
            _context.t1 = answer.text;
            _context.next = _context.t1 === "t" ? 27 : _context.t1 === "T" ? 27 : _context.t1 === "f" ? 29 : _context.t1 === "F" ? 29 : 31;
            break;

          case 27:
            tofOption = 2 * tofOrder;
            return _context.abrupt("break", 32);

          case 29:
            tofOption = 2 * tofOrder + 1;
            return _context.abrupt("break", 32);

          case 31:
            throw new Error("tof解答出错");

          case 32:
            tofOnPaper[tofOption].click();
            tofOrder++;
            return _context.abrupt("break", 73);

          case 35:
            //普通填空题
            ready_in(blankOnPaper[blankOrder]);
            blankOnPaper[blankOrder].textContent = answer.text; // (blankOnPaper[blankOrder] as HTMLSpanElement).value = answer.text;

            event_trigger(blankOnPaper[blankOrder]);
            blankOrder++;
            return _context.abrupt("break", 73);

          case 40:
            //回答问题
            if (answer.text.length) {
              ready_in(textareaOnPaper[textareaOrder]);
              textareaOnPaper[textareaOrder].textContent = answer.text;
              textareaOnPaper[textareaOrder].value = answer.text;
              event_trigger(textareaOnPaper[textareaOrder]);
            } //有et-blank，但是无答案，不做处理


            textareaOrder++;
            return _context.abrupt("break", 73);

          case 43:
            selectOnPaper[selectOrder].classList.add("correct"); // ready_in(selectOnPaper[selectOrder].querySelector('.key'));

            selectOnPaper[selectOrder].querySelector("select").click(); // selectOnPaper[selectOrder].querySelector(".key").click();

            angular.element(selectOnPaper[selectOrder].querySelector(".key")).triggerHandler("change"); // angular.element(element).triggerHandler('');

            event_trigger(selectOnPaper[selectOrder].querySelector(".key"));
            selectOrder++;
            return _context.abrupt("break", 73);

          case 49:
            targetOption = void 0, options = void 0, optionCount = void 0;
            spanFlag = false;

            try {
              options = answer.text.split(",");
            } catch (error) {
              options = ["1"]; //不检查答案的选择题
            }

            console.log(options);

            if (!(optionCount = answer.element.querySelectorAll("li").length)) {
              optionCount = answer.element.querySelectorAll("span").length;

              if (optionCount) {
                spanFlag = true;
                optionOrder = spanOrder; //这个只解决了li在span之前的问题，如果li在span之后呢？
              } else {
                optionCount = 4; //针对进阶视听说2Practice Test One
              }
            } else {
              optionOrder = liOrder;
            }

            _iterator2 = solver_createForOfIteratorHelper(options);

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                option = _step2.value;

                if (isNaN(parseInt(option))) {
                  //key是字母
                  targetOption = optionCount * optionOrder + option.toUpperCase().charCodeAt() - 65;
                } else {
                  //key是数字
                  targetOption = optionCount * optionOrder + parseInt(option) - 1;
                }

                console.log("\u9898\u53F7".concat(optionOrder, " span").concat(spanOrder, " \u9009\u9879").concat(targetOption, " \u9009\u9879\u6570").concat(optionCount));

                if (spanFlag && optionCount) {
                  try {
                    optionSpanOnPaper[targetOption].click();
                  } catch (error) {
                    optionOnPaper[targetOption].click();
                  }
                } else {
                  optionOnPaper[targetOption].click();
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (spanFlag) {
              spanOrder++;
            } else {
              liOrder++;
            }

            optionOrder++;
            return _context.abrupt("break", 73);

          case 59:
            matchingOrder = 0;

          case 60:
            if (!(matchingOrder < answer.element.getAttribute("key").split(",").length)) {
              _context.next = 72;
              break;
            }

            _context.next = 63;
            return Object(common["d" /* sleep */])(global["c" /* Global */].USER_SETTINGS.solveInterval);

          case 63:
            targetCircle = answer.element.getAttribute("key").split(",")[matchingOrder].split("-")[1] - 1;
            x1 = leftCircles[matchingOrder].getAttribute("cx");
            y1 = leftCircles[matchingOrder].getAttribute("cy");
            x2 = rightCircles[targetCircle].getAttribute("cx");
            y2 = rightCircles[targetCircle].getAttribute("cy"); // ready_in(leftCircles[matchingOrder]);
            // ready_in(rightCircles[targetCircle]);

            lineElements[matchingOrder].innerHTML = "\n                    <line \n                        ng-class=\"{incorrect:!matching.isKey($parent.$index,b)}\"\n                        ng-click=\"matching.removeLine($parent.$index, b)\" \n                        ng-repeat=\"b in cb track by $index\" \n                        ng-attr-x1=\"{{matching.circles.xA}}\"\n                        ng-attr-x2=\"{{matching.circles.xB}}\" \n                        ng-attr-y1=\"{{matching.circles.A[$parent.$index]}}\" \n                        ng-attr-y2=\"{{matching.circles.B[b]}}\"\n                        x1=\"".concat(x1, "\" \n                        x2=\"").concat(x2, "\" \n                        y1=\"").concat(y1, "\" \n                        y2=\"").concat(y2, "\" \n                        class=\"\"\n                    ></line>"); // event_trigger(lineElements[matchingOrder]);
            // event_trigger(leftCircles[matchingOrder]);
            // event_trigger(rightCircles[targetCircle]);
            // event_trigger(document.querySelector('g.aidLine line'))

          case 69:
            matchingOrder++;
            _context.next = 60;
            break;

          case 72:
            return _context.abrupt("break", 73);

          case 73:
            _context.next = 16;
            break;

          case 75:
            _context.next = 80;
            break;

          case 77:
            _context.prev = 77;
            _context.t2 = _context["catch"](14);

            _iterator.e(_context.t2);

          case 80:
            _context.prev = 80;

            _iterator.f();

            return _context.finish(80);

          case 83:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[14, 77, 80, 83]]);
  }));
  return _solveEt.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/plugins/exercise/manifest/parser.ts
function parser_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = parser_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function parser_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return parser_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return parser_arrayLikeToArray(o, minLen); }

function parser_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function parseManifest(dom) {
  var realAnswers = [];
  var answers = dom.querySelectorAll("correctResponse value");
  console.log(answers);
  var index = 1;

  var _iterator = parser_createForOfIteratorHelper(answers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      var answerArray = parser_parseAnswer(element, dom);

      var _iterator2 = parser_createForOfIteratorHelper(answerArray),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var answer = _step2.value;

          if (answer) {
            answer.index = index;
            console.log(answer);
            realAnswers.push(answer);
          }

          index++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return realAnswers;
}

function parser_parseAnswer(element, dom) {
  var answerText = "";
  var answerType = "";
  var returnAnswers = [];
  var identifier = element.textContent;

  if (identifier.length == 36) {
    //选择题
    answerType = "choice";
    var selector = "[identifier=\"".concat(identifier, "\"]");

    try {
      answerText = dom.querySelector(selector).textContent; // console.log(answerText);
    } catch (error) {
      answerText = element.textContent; //高职第七八单元填空
    }

    returnAnswers.push({
      text: answerText,
      type: answerType,
      element: element,
      identifier: identifier
    }); //  else {
    //     //高职，非精编，综合，单元测试
    //     answerText = element.textContent;
    // }
  } else if (identifier.length > 200) {
    //纠错题
    var identifiers = identifier.split(",");

    var _iterator3 = parser_createForOfIteratorHelper(identifiers),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _identifier = _step3.value;

        var _selector = "[identifier=\"".concat(_identifier, "\"]");

        answerText = dom.querySelector(_selector).textContent;
        returnAnswers.push({
          text: answerText,
          type: "choice",
          element: element,
          identifier: _identifier
        });
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  } else {
    //填空题
    answerText = element.textContent;
    answerType = answerText == "(Open.)" ? "textarea" : "blank";
    returnAnswers.push({
      text: answerText,
      type: answerType,
      element: element
    });
  }

  return returnAnswers;
}
// CONCATENATED MODULE: ./src/plugins/exercise/manifest/solver.ts



function manifest_solver_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = manifest_solver_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function manifest_solver_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return manifest_solver_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return manifest_solver_arrayLikeToArray(o, minLen); }

function manifest_solver_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function solveManifest(_x) {
  return _solveManifest.apply(this, arguments);
}

function _solveManifest() {
  _solveManifest = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(answers) {
    var inputPatternOnPaper, inputOrder, optionLabelOnPaper, _iterator, _step, answer, _iterator2, _step2, inputAnswer, _iterator3, _step3, label, labelHeight;

    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputPatternOnPaper = document.querySelectorAll('.pattern input[type="text"]');
            inputOrder = 0;
            optionLabelOnPaper = document.querySelectorAll("label[for]");
            _iterator = manifest_solver_createForOfIteratorHelper(answers);
            _context.prev = 4;

            _iterator.s();

          case 6:
            if ((_step = _iterator.n()).done) {
              _context.next = 23;
              break;
            }

            answer = _step.value;
            _context.next = 10;
            return Object(common["d" /* sleep */])(global["c" /* Global */].USER_SETTINGS.solveInterval);

          case 10:
            _context.t0 = answer.type;
            _context.next = _context.t0 === "blank" ? 13 : _context.t0 === "textarea" ? 16 : _context.t0 === "choice" ? 18 : 21;
            break;

          case 13:
            _iterator2 = manifest_solver_createForOfIteratorHelper(answer.text.split(","));

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                inputAnswer = _step2.value;

                try {
                  inputPatternOnPaper[inputOrder].value = inputAnswer;
                } catch (error) {
                  document.querySelector(".pattern textarea").textContent = inputAnswer;
                } finally {
                  inputOrder++;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return _context.abrupt("break", 21);

          case 16:
            document.querySelector(".pattern textarea").value = global["c" /* Global */].USER_SETTINGS.defaultBlankAnswer;
            return _context.abrupt("break", 21);

          case 18:
            _iterator3 = manifest_solver_createForOfIteratorHelper(optionLabelOnPaper);

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                label = _step3.value;

                if (label.getAttribute("for").split("_")[1] == answer.identifier) {
                  label.click();

                  try {
                    labelHeight = label.getBoundingClientRect().top; //自动跳转页面至选项处

                    document.querySelector("#divTest").scrollTo(0, labelHeight - 50);
                  } catch (error) {}
                }
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            return _context.abrupt("break", 21);

          case 21:
            _context.next = 6;
            break;

          case 23:
            _context.next = 28;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](4);

            _iterator.e(_context.t1);

          case 28:
            _context.prev = 28;

            _iterator.f();

            return _context.finish(28);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 25, 28, 31]]);
  }));
  return _solveManifest.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/plugins/exercise/wordTest/parser.ts


var wordTestTimer;
function parseWordTest() {
  clearInterval(wordTestTimer); //manifest类型会重新加载页面，所以定时器会被自动清除，可以不用管

  wordTestTimer = setInterval(function () {
    try {
      global["c" /* Global */].messages = [];
      var answer = document.querySelector('ul[id^="wordTest"][style=""] > li:last-child').textContent;
      Object(common["a" /* addMessage */])(answer);
    } catch (error) {}
  }, 2000);
}
// CONCATENATED MODULE: ./src/plugins/exercise/dataSolution/parser.ts
function dataSolution_parser_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = dataSolution_parser_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function dataSolution_parser_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dataSolution_parser_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dataSolution_parser_arrayLikeToArray(o, minLen); }

function dataSolution_parser_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function parseDataSolution() {
  var realAnswers = [];
  var answers = document.querySelectorAll("[data-solution]");
  console.log(answers);
  var index = 1;

  var _iterator = dataSolution_parser_createForOfIteratorHelper(answers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      var answer = dataSolution_parser_parseAnswer(element);

      if (answer) {
        answer.index = index;
        console.log(answer);
        realAnswers.push(answer);
      }

      index++;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return realAnswers;
}

function dataSolution_parser_parseAnswer(element) {
  var answerText = element.getAttribute("data-solution");
  var answerType = "";

  if (answerText) {
    //填空题
    answerType = "blank";
  } else {
    //选择题
    try {
      answerText = element.firstElementChild.textContent;
      if (!answerText) answerText = element.textContent;
    } catch (error) {
      answerText = element.textContent;
    }

    answerType = "choice";
  }

  return {
    text: answerText,
    type: answerType,
    element: element
  };
}
// CONCATENATED MODULE: ./src/plugins/exercise/dataSolution/solver.ts



function dataSolution_solver_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = dataSolution_solver_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function dataSolution_solver_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return dataSolution_solver_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return dataSolution_solver_arrayLikeToArray(o, minLen); }

function dataSolution_solver_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function solveDataSolution(_x) {
  return _solveDataSolution.apply(this, arguments);
}

function _solveDataSolution() {
  _solveDataSolution = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(answers) {
    var inputOnPaper, inputOrder, _iterator, _step, answer;

    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inputOnPaper = document.querySelectorAll("input[data-itemtype]");
            inputOrder = 0;
            _iterator = dataSolution_solver_createForOfIteratorHelper(answers);
            _context.prev = 3;

            _iterator.s();

          case 5:
            if ((_step = _iterator.n()).done) {
              _context.next = 19;
              break;
            }

            answer = _step.value;
            _context.next = 9;
            return Object(common["d" /* sleep */])(global["c" /* Global */].USER_SETTINGS.solveInterval);

          case 9:
            _context.t0 = answer.type;
            _context.next = _context.t0 === "blank" ? 12 : _context.t0 === "choice" ? 15 : 17;
            break;

          case 12:
            // ready_in(inputOnPaper[inputOrder]);
            inputOnPaper[inputOrder].value = answer.text; // event_trigger(inputOnPaper[inputOrder]);

            inputOrder++;
            return _context.abrupt("break", 17);

          case 15:
            answer.element.click();
            return _context.abrupt("break", 17);

          case 17:
            _context.next = 5;
            break;

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t1 = _context["catch"](3);

            _iterator.e(_context.t1);

          case 24:
            _context.prev = 24;

            _iterator.f();

            return _context.finish(24);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 21, 24, 27]]);
  }));
  return _solveDataSolution.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/plugins/exercise/reading/parser.ts
function reading_parser_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = reading_parser_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function reading_parser_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return reading_parser_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return reading_parser_arrayLikeToArray(o, minLen); }

function reading_parser_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function parseReading(dom) {
  var realAnswers = [];
  var answers = dom.querySelectorAll("correctResponse value");
  console.log(answers);
  var index = 1;

  var _iterator = reading_parser_createForOfIteratorHelper(answers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      var answer = reading_parser_parseAnswer(element, dom);

      if (answer) {
        answer.index = index;
        console.log(answer);
        realAnswers.push(answer);
      }

      index++;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return realAnswers;
}

function reading_parser_parseAnswer(element, dom) {
  var answerText = element.textContent;
  var answerType = "";

  if (answerText.length == 36) {
    answerType = "choice"; //选择题

    var selector = "[identifier=\"".concat(answerText, "\"]");
    element = dom.querySelector(selector);
    answerText = /CDATA\[(.*)\]\]/.exec(element.innerHTML)[1].trim(); //从注释中提取答案
  } else if (answerText.length == 73) {
    //todo 找不到在哪里见到的了
    answerType = "matching"; //连线题
    // let leftMatching = document
    //     .querySelector(`[id="${identifier.split("|")[0]}"]`)
    //     .getAttribute("leftorder");
    // let rightMatching = document
    //     .querySelector(`[id="${identifier.split("|")[1]}"]`)
    //     .getAttribute("rightorder");
    // answerText = `${leftMatching}-${rightMatching}`;
  } else {
    answerType = "blank"; //填空题
  }

  return {
    text: answerText,
    type: answerType,
    element: element
  };
}
// CONCATENATED MODULE: ./src/plugins/exercise/main.ts



function main_createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = main_unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function main_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return main_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return main_arrayLikeToArray(o, minLen); }

function main_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**这种页面上直接就有答案了，id=hd里面，也就是identifier类型*/
var MANIFEST = ["https://centercourseware.sflep.com/new century college english secedition integration 2/unit_01/course/texta.html#c09175d4-f281-488f-83fe-87c6bcf2a2b6?nocache=0.6378400703106109", "new century college english secedition integration 1", "new century college english secedition integration 2", "new century college english secedition integration 3", "new century college english secedition integration 4", "https://centercourseware.sflep.com/an integrated skills course (2nd edition) 2 for vocational college english/unit_02/course/listening.html#f248a182-7d3b-4112-86e8-8fca2706c690?nocache=0.3470470678074564", "an integrated skills course (2nd edition) 1 for vocational college english", "an integrated skills course (2nd edition) 2 for vocational college english", "an integrated skills course (2nd edition) 3 for vocational college english", "an integrated skills course (2nd edition) 4 for vocational college english", "https://centercourseware.sflep.com/an integrated skills course 2/unit_07/course/comprehension.html#e2f3d085-ca82-4d79-b31a-1bfe83529d88?nocache=0.5703432807157427", "an integrated skills course 1", "an integrated skills course 2"];
/**直接在原始页面上query就可以*/

var DATA_SOLUTION = ["https://centercourseware.sflep.com/new progressive college english integrated course 3/unit_01/main10.html?3-1-6&nocache=0.8570993802491391", "new progressive college english integrated course 1", "new progressive college english integrated course 2", "new progressive college english integrated course 3", "new progressive college english integrated course 4", "https://centercourseware.sflep.com/new target college english integrated course 2/unit_05/main.html?2-5-10&nocache=0.7739324146362139", "new target college english integrated course 1", "new target college english integrated course 2", "new target college english integrated course 3", "new target college english integrated course 4"];
/**et类型(url中包含data)理论上可以直接在原始页面上找(Demcorazy就是这么做的)，不过也可以统一通过ajax请求获取*/

var ET = ["https://centercourseware.sflep.com/inspire%202/data/1/2-1-2.html", "inspire 1", "inspire 2", "inspire 3", "inspire 4", "https://centercourseware.sflep.com/New College English Viewing Listening Speaking 3/index.html#/1/1-1-1?nocache=0.2182374709016317", "New College English Viewing Listening Speaking 1", "New College English Viewing Listening Speaking 2", "New College English Viewing Listening Speaking 3", "New College English Viewing Listening Speaking 4", "https://centercourseware.sflep.com/New Target College English Video Course 1/index.html#/u1/TO/1-1?nocache=0.2502474772719703", "New Target College English Video Course 1", "New Target College English Video Course 2", "New Target College English Video Course 3", "New Target College English Video Course 4", "https://centercourseware.sflep.com/new century college english video thirdedition 1/index.html#/2/1-1-1?nocache=0.3053014048019431", "new century college english video thirdedition 1", "new century college english video thirdedition 2", "new century college english video thirdedition 3", "new century college english video thirdedition 4"];
/**泛读课程需要courseInfo和identifier(和et一样)，但是答案是dataSolution那种返回value的*/

var READING = ["https://centercourseware.sflep.com/new century extensive reading course for english majors 2/web.html?courseurl=210_01_05_01&nocache=0.2702018071769088", "new century extensive reading course for english majors 1", "new century extensive reading course for english majors 2", "new century extensive reading course for english majors 3", "new century extensive reading course for english majors 4"];
/**必须在手机上做的*/

var APP = ["https://centercourseware.sflep.com/Progressive English for Vocational Colleges Integrated Course 2/unit_01/main2.html?2-1-w1&nocache=0.2290241426227977", "Progressive English for Vocational Colleges Integrated Course 2", "https://centercourseware.sflep.com/Progressive English for Vocational Colleges A Viewing Listening and Speaking Course 2/unit_01/main2.html?2-1-la_1&nocache=0.450784809471354", "Progressive English for Vocational Colleges A Viewing Listening and Speaking Course 2", "https://centercourseware.sflep.com/A Viewing Listening and Speaking Course 2/unit_01/main8.html?2-1-7&nocache=0.8280064535686702", "A Viewing Listening and Speaking Course 2"]; //todo (坐等提pr)新世纪大学英语第二版(快速阅读，新世纪写作)

var UNSOLVED = ["https://centercourseware.sflep.com/college english skills news report listening/index.html#/2/4-2?nocache=0.7860960277619209", "college english skills news report listening", "https://centercourseware.sflep.com/listening and speaking course (2nd ed) 3 for vocational college english/unit8/pak22.html?nocache=0.10199328940787433", "listening and speaking course (2nd ed) 1 for vocational college english", "listening and speaking course (2nd ed) 2 for vocational college english", "listening and speaking course (2nd ed) 3 for vocational college english", "listening and speaking course (2nd ed) 4 for vocational college english"];
var PARSER = new DOMParser();

function queryData(_x) {
  return _queryData.apply(this, arguments);
}

function _queryData() {
  _queryData = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee(answerUrl) {
    var response, text, htmlDom;
    return regenerator_default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(answerUrl);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.text();

          case 5:
            text = _context.sent;
            htmlDom = PARSER.parseFromString(text, "text/html"); // if (DEBUG_MODE)

            console.log(htmlDom);
            return _context.abrupt("return", htmlDom);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _queryData.apply(this, arguments);
}

function queryManifest(_x2, _x3, _x4) {
  return _queryManifest.apply(this, arguments);
}

function _queryManifest() {
  _queryManifest = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee2(manifestUrl, identifier, courseInfo) {
    var response, text, selector, resource, answerUrl;
    return regenerator_default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch(manifestUrl);

          case 2:
            response = _context2.sent;
            _context2.next = 5;
            return response.text();

          case 5:
            text = _context2.sent;
            selector = "resource[identifier=\"".concat(identifier, "\"] file");
            resource = PARSER.parseFromString(text, "text/html").querySelector(selector).getAttribute("href");
            answerUrl = "https://centercourseware.sflep.com/".concat(courseInfo, "/").concat(resource);
            return _context2.abrupt("return", queryData(answerUrl));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _queryManifest.apply(this, arguments);
}

function outputAnswers(_x5) {
  return _outputAnswers.apply(this, arguments);
}

function _outputAnswers() {
  _outputAnswers = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee3(answers) {
    var bufferTag, _iterator, _step, answer, currentTag;

    return regenerator_default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bufferTag = "";
            _iterator = main_createForOfIteratorHelper(answers);
            _context3.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context3.next = 14;
              break;
            }

            answer = _step.value;

            if (!global["c" /* Global */].USER_SETTINGS.autoSolve) {
              _context3.next = 9;
              break;
            }

            _context3.next = 9;
            return Object(common["d" /* sleep */])(global["c" /* Global */].USER_SETTINGS.solveInterval);

          case 9:
            Object(common["a" /* addMessage */])("".concat(String(answer.index).padStart(2, "0"), "\u3001").concat(answer.text));
            currentTag = answer.element.tagName;

            if (bufferTag !== "" && currentTag !== bufferTag) {
              Object(common["a" /* addMessage */])("", "hr");
              bufferTag = currentTag;
            }

          case 12:
            _context3.next = 4;
            break;

          case 14:
            _context3.next = 19;
            break;

          case 16:
            _context3.prev = 16;
            _context3.t0 = _context3["catch"](2);

            _iterator.e(_context3.t0);

          case 19:
            _context3.prev = 19;

            _iterator.f();

            return _context3.finish(19);

          case 22:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 16, 19, 22]]);
  }));
  return _outputAnswers.apply(this, arguments);
}











function determineCourseType(_x6) {
  return _determineCourseType.apply(this, arguments);
}

function _determineCourseType() {
  _determineCourseType = Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regenerator_default.a.mark(function _callee4(iframeUrl) {
    var courseInfo, identifier, manifestUrl, answerUrl, dom, answers, _answerUrl;

    return regenerator_default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            courseInfo = /com\/(.*?)\//.exec(iframeUrl)[1];
            courseInfo = decodeURI(courseInfo);
            console.log(courseInfo);
            identifier = undefined;

            try {
              identifier = /#(.*)\?/.exec(iframeUrl)[1];
            } catch (error) {}

            manifestUrl = "https://centercourseware.sflep.com/".concat(courseInfo, "/resource/manifest.xml");
            answerUrl = "https://centercourseware.sflep.com/".concat(courseInfo, "/data").concat(identifier, ".html");
            answers = [];

            if (!MANIFEST.includes(courseInfo)) {
              _context4.next = 17;
              break;
            }

            _context4.next = 11;
            return queryManifest(manifestUrl, identifier, courseInfo);

          case 11:
            dom = _context4.sent;
            answers = parseManifest(dom);
            if (document.querySelector('div[id^="word"]')) parseWordTest();
            if (global["c" /* Global */].USER_SETTINGS.autoSolve) solveManifest(answers);
            _context4.next = 40;
            break;

          case 17:
            if (!ET.includes(courseInfo)) {
              _context4.next = 25;
              break;
            }

            _context4.next = 20;
            return queryData(answerUrl);

          case 20:
            dom = _context4.sent;
            answers = parseEt(dom);
            if (global["c" /* Global */].USER_SETTINGS.autoSolve) solveEt(answers);
            _context4.next = 40;
            break;

          case 25:
            if (!DATA_SOLUTION.includes(courseInfo)) {
              _context4.next = 29;
              break;
            }

            //直接在原始页面查找
            setTimeout(function () {
              answers = parseDataSolution();
              console.log(answers);
              outputAnswers(answers);
              if (global["c" /* Global */].USER_SETTINGS.autoSolve) solveDataSolution(answers);
            }, 2000);
            _context4.next = 40;
            break;

          case 29:
            if (!READING.includes(courseInfo)) {
              _context4.next = 37;
              break;
            }

            _answerUrl = location.href.split("&")[0].replace("web.html?courseurl=", "data/") + ".xml";
            _context4.next = 33;
            return queryData(_answerUrl);

          case 33:
            dom = _context4.sent;
            answers = parseReading(dom);
            _context4.next = 40;
            break;

          case 37:
            console.log("未处理的课程类型");
            console.log(courseInfo);
            console.log(identifier); // add_to_container("", document.querySelectorAll(".daan"));
            // add_to_container("", document.querySelectorAll(".tianking .tl_daan"));

          case 40:
            console.log(answers);
            outputAnswers(answers);

          case 42:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _determineCourseType.apply(this, arguments);
}
// CONCATENATED MODULE: ./src/plugins/exercise/initial.ts



if (location.href.includes("centercourseware.sflep.com")) {
  var initial_watcher = function watcher() {
    var currentUrl = location.href;
    console.log(currentUrl);

    if (currentUrl != bufferUrl) {
      global["c" /* Global */].messages = [];
      determineCourseType(currentUrl);
    }

    bufferUrl = currentUrl;
  };

  var bufferUrl = "";
  setInterval(initial_watcher, 2000);
}
// EXTERNAL MODULE: ./src/plugins/time/main.ts
var main = __webpack_require__(27);

// CONCATENATED MODULE: ./src/plugins/time/initial.ts
 //切换页面的按钮在外部，而不是在iframe内

if (location.href.includes(".sflep.com/student/StudyCourse.aspx?") || location.href.includes(".sflep.com/Course/TryCourse.aspx?")) {
  Object(main["a" /* autoRefresh */])();
}
// CONCATENATED MODULE: ./src/plugins/initial.ts
// 在此处注册(直接调用)各个插件中，app初始化时要执行的函数




/***/ })
/******/ ]);