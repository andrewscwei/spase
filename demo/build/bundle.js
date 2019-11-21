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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/index.js":
/*!************************!*\
  !*** ./build/index.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {!function(t,e){if(true)module.exports=e();else { var n, r; }}(global,(function(){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=3)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(e){if(void 0===e&&(e=[0,0]),!t.isValid(e))throw new Error("Invalid parameters passed to constructor");e instanceof Array?(this.x=e[0],this.y=e[1]):(this.x=e.x,this.y=e.y)}return t.isValid=function(t){return t instanceof Array?2===t.length&&("number"==typeof t[0]&&"number"==typeof t[1]):"object"==typeof t&&("number"==typeof t.x&&"number"==typeof t.y)},t.prototype.clone=function(e){return void 0===e&&(e={}),new t({x:"number"==typeof e.x?e.x:this.x,y:"number"==typeof e.y?e.y:this.y})},t.prototype.add=function(e){return new t({x:this.x+e.x,y:this.y+e.y})},t.prototype.subtract=function(e){return new t({x:this.x-e.x,y:this.y-e.y})},t.prototype.multiply=function(e){return new t({x:this.x*e.x,y:this.y*e.y})},t.prototype.divideBy=function(e){return new t({x:this.x/e.x,y:this.y/e.y})},t.prototype.invert=function(){return new t({x:this.y,y:this.x})},t.prototype.equals=function(t){return this.x===t.x&&this.y===t.y},t.prototype.toJSON=function(){return Object.freeze({x:this.x,y:this.y})},t.prototype.toArray=function(){return[this.x,this.y]},t}();e.default=n},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=r(4),o=n(r(0)),h=n(r(2)),f=function(){function t(e){if(void 0===e&&(e={x:0,y:0,width:0,height:0}),!t.isValid(e))throw new Error("Invalid parameters passed to constructor");this.left=e.x,this.top=e.y,this.width=e.width,this.height=e.height}return t.isValid=function(t){return"number"==typeof t.x&&("number"==typeof t.y&&("number"==typeof t.width&&"number"==typeof t.height))},t.from=function(e,r){void 0===r&&(r={});try{if(null==e)return null;if(e instanceof t)return e;if(i.typeIsWindow(e))return t.from(document.documentElement||document.body.parentNode||document.body,r);for(var n=e instanceof Array?e:[e],o=n.length,h=r.reference||window,f=t.fromViewport(),u=i.typeIsWindow(h)?f:t.from(r.reference),d=null,l=0;l<o;l++){var c=n[l],s=c.getBoundingClientRect(),a=new t({x:s.left+f.left-(i.typeIsWindow(h)?0:u.left),y:s.top+f.top-(i.typeIsWindow(h)?0:u.top),width:r.overflow?c.scrollWidth:s.width,height:r.overflow?c.scrollHeight:s.height});d=d?d.concat(a):a}return d}catch(t){return console.error(t),null}},t.fromViewport=function(){var e=Math.max(document.documentElement.clientWidth,window.innerWidth||0),r=Math.max(document.documentElement.clientHeight,window.innerHeight||0);return new t({x:void 0!==window.pageXOffset?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft,y:void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,width:e,height:r})},t.fromChildrenOf=function(e,r){return void 0===r&&(r={}),e?i.typeIsWindow(e)?t.from(Array.from(document.body.children)):t.from(Array.from(e.children),{overflow:r.overflow,reference:r.reference||e}):null},t.fromChildrenBefore=function(e,r,n){if(void 0===n&&(n={}),!r)return null;var i=Array.from(r.children);return e<=0?new t:e>=i.length?t.from(i,{reference:n.reference,overflow:!1}):(i.splice(e),t.from(i,{reference:n.reference||r,overflow:!1}))},t.fromChildrenAfter=function(e,r,n){if(void 0===n&&(n={}),!r)return null;var i=Array.from(r.children);return e<0?t.from(i,{reference:n.reference,overflow:!1}):e>=i.length-1?new t:(i.splice(0,i.length-e-1),t.from(i,{reference:n.reference||r,overflow:!1}))},t.fromChildAt=function(e,r,n){if(void 0===n&&(n={}),!r)return null;var i=r.children[e];return t.from(i,{overflow:n.overflow,reference:n.reference||r})},t.fromPointAndSize=function(e,r){return e instanceof o.default||(e=new o.default(e)),r instanceof h.default||(r=new h.default(r)),new t({x:e.x,y:e.y,width:r.width,height:r.height})},t.intersecting=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{for(var n=e.length,i={},o=null,h=null,f=0;f<n;f++){if(o||(o=t.from(e[f])),0===f&&f+1===n)h=t.fromViewport();else{if(!(f+1<n))break;h=t.from(e[f+1])}i.width=Math.max(0,Math.min(o.right,h.right)-Math.max(o.left,h.left)),i.height=Math.max(0,Math.min(o.bottom,h.bottom)-Math.max(o.top,h.top)),i.y=Math.max(o.top,h.top),i.x=Math.max(o.left,h.left),i.width*i.height==0&&(i.width=0,i.height=0,i.y=NaN,i.x=NaN),o=new t(i)}return new t(i)}catch(t){return console.error(t),null}},Object.defineProperty(t.prototype,"center",{get:function(){return new o.default({x:(this.right-this.left)/2+this.left,y:(this.bottom-this.top)/2+this.top})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"size",{get:function(){return new h.default({width:this.width,height:this.height})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"right",{get:function(){return this.left+this.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bottom",{get:function(){return this.top+this.height},enumerable:!0,configurable:!0}),t.prototype.clone=function(e){return void 0===e&&(e={}),new t({x:"number"==typeof e.x?e.x:this.left,y:"number"==typeof e.y?e.y:this.top,width:"number"==typeof e.width?e.width:this.width,height:"number"==typeof e.height?e.height:this.height})},t.prototype.concat=function(e){return new t({x:Math.min(this.left,e.left),y:Math.min(this.top,e.top),width:Math.max(this.right,e.right)-Math.min(this.left,e.left),height:Math.max(this.bottom,e.bottom)-Math.min(this.top,e.top)})},t.prototype.invert=function(){return new t({x:this.left,y:this.top,width:this.height,height:this.width})},t.prototype.equals=function(t){return this.top===t.top&&(this.right===t.right&&(this.bottom===t.bottom&&this.left===t.left))},t.prototype.toJSON=function(){return Object.freeze({top:this.top,right:this.right,bottom:this.bottom,left:this.left,width:this.width,height:this.height})},t}();e.default=f},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(e){if(void 0===e&&(e=[0,0]),!t.isValid(e))throw new Error("Invalid parameters passed to constructor");e instanceof Array?(this.width=e[0],this.height=e[1]):(this.width=e.width,this.height=e.height)}return t.isValid=function(t){return t instanceof Array?2===t.length&&("number"==typeof t[0]&&"number"==typeof t[1]):"object"==typeof t&&("number"==typeof t.width&&"number"==typeof t.height)},t.prototype.clone=function(e){return void 0===e&&(e={}),new t({width:"number"==typeof e.width?e.width:this.width,height:"number"==typeof e.height?e.height:this.height})},t.prototype.add=function(e){return new t({width:this.width+e.width,height:this.height+e.height})},t.prototype.subtract=function(e){return new t({width:this.width-e.width,height:this.height-e.height})},t.prototype.multiply=function(e){return new t({width:this.width*e.width,height:this.height*e.height})},t.prototype.divideBy=function(e){return new t({width:this.width/e.width,height:this.height/e.height})},t.prototype.invert=function(){return new t({width:this.height,height:this.width})},t.prototype.equals=function(t){return this.width===t.width&&this.height===t.height},t.prototype.toJSON=function(){return Object.freeze({width:this.width,height:this.height})},t.prototype.toArray=function(){return[this.width,this.height]},t}();e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0);e.Point=n.default;var i=r(1);e.Rect=i.default;var o=r(2);e.Size=o.default;var h=r(5);e.hitTest=h.default},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.typeIsWindow=function(t){return t===window}},function(t,e,r){"use strict";var n=this&&this.__spreadArrays||function(){for(var t=0,e=0,r=arguments.length;e<r;e++)t+=arguments[e].length;var n=Array(t),i=0;for(e=0;e<r;e++)for(var o=arguments[e],h=0,f=o.length;h<f;h++,i++)n[i]=o[h];return n},i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=i(r(0)),h=i(r(1));e.default=function(t,e){try{var r=o.default.isValid(t)&&new o.default(t),i=o.default.isValid(e)&&new o.default(e);if(r&&!i){for(var f=(s=e instanceof Array?e:[e]).length,u=0;u<f;u++){var d=h.default.from(s[u]),l=r.x>=d.left&&r.x<=d.right,c=r.y>=d.top&&r.y<=d.bottom;if(l&&c)return!0}return!1}if(!r&&i){for(f=(s=t instanceof Array?t:[t]).length,u=0;u<f;u++){d=h.default.from(s[u]),l=i.x>=d.left&&i.x<=d.right,c=i.y>=d.top&&i.y<=d.bottom;if(l&&c)return!0}return!1}if(r&&i)return r.equals(i);var s=n(t instanceof Array?t:[t],e instanceof Array?e:[e]),a=h.default.intersecting.apply(null,s);return a.width*a.height!=0}catch(t){return console.error(t),!1}}}])}));
//# sourceMappingURL=index.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./demo/src/index.ts":
/*!***************************!*\
  !*** ./demo/src/index.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../build */ "./build/index.js");
/* harmony import */ var _build__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_build__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @file This is a very dumb demo. It needs to be revised, but for now, it's
 *       just a quick way during development to test the API.
 */

var mainEl = document.getElementById('main');
var intersectionEl = document.getElementById('intersection');
var viewportEl = document.getElementById('viewport');
var boxEls = Array.from(document.querySelectorAll('#main .box'));
window.localStorage.debug = 'spase*';
window.addEventListener('resize', function () {
  return update();
});
window.addEventListener('scroll', function () {
  return update();
});
boxEls.forEach(function (el) {
  var start;
  var offset = new _build__WEBPACK_IMPORTED_MODULE_0__["Point"]();
  var curr;
  var isActive = false;
  el.addEventListener('mousedown', function (event) {
    start = new _build__WEBPACK_IMPORTED_MODULE_0__["Point"]({
      x: event.clientX - offset.x,
      y: event.clientY - offset.y
    });
    if (event.target === el) isActive = true;
    update();
  });
  window.addEventListener('mousemove', function (event) {
    if (!isActive) return;
    event.preventDefault();
    curr = new _build__WEBPACK_IMPORTED_MODULE_0__["Point"]({
      x: event.clientX - start.x,
      y: event.clientY - start.y
    });
    offset = curr;
    el.style.transform = "translate3d(".concat(curr.x, "px, ").concat(curr.y, "px, 0)");
    update();
  });
  el.addEventListener('mouseup', function (event) {
    start = curr;
    isActive = false;
    update();
  });
});

function update() {
  updateViewport();
  updateMain();
  updateBoxes();
  updateIntersection();
}

function updateViewport() {
  var rect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].fromViewport();
  var fullRect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(window, {
    overflow: true
  });
  viewportEl.querySelector('.top').innerHTML = "".concat(parseNum(rect.top));
  viewportEl.querySelector('.right').innerHTML = "".concat(parseNum(rect.right));
  viewportEl.querySelector('.bottom').innerHTML = "".concat(parseNum(rect.bottom));
  viewportEl.querySelector('.left').innerHTML = "".concat(parseNum(rect.left));
  viewportEl.querySelector('.size').innerHTML = "".concat(parseNum(rect.width), "x").concat(parseNum(rect.height), "<br>").concat(parseNum(fullRect.width), "x").concat(parseNum(fullRect.height));
}

function updateMain() {
  var rect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(mainEl);
  var childRect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(boxEls, {
    reference: mainEl
  });
  mainEl.querySelector('.top').innerHTML = "".concat(parseNum(rect.top), "<br>(").concat(parseNum(childRect.top), ")");
  mainEl.querySelector('.right').innerHTML = "".concat(parseNum(rect.right), "<br>(").concat(parseNum(childRect.right), ")");
  mainEl.querySelector('.bottom').innerHTML = "".concat(parseNum(rect.bottom), "<br>(").concat(parseNum(childRect.bottom), ")");
  mainEl.querySelector('.left').innerHTML = "".concat(parseNum(rect.left), "<br>(").concat(parseNum(childRect.left), ")");
  mainEl.querySelector('.size').innerHTML = "".concat(parseNum(rect.width), "x").concat(parseNum(rect.height), "<br>(").concat(parseNum(childRect.width), "x").concat(parseNum(childRect.height), ")");
}

function updateBoxes() {
  boxEls.forEach(function (el) {
    var rect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(el);
    var refRect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(el, {
      reference: mainEl
    });
    var fullRect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].from(el, {
      overflow: true
    });
    var intersectRect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].intersecting(el);
    el.querySelector('.top').innerHTML = "G:".concat(parseNum(rect.top), "<br>L:").concat(parseNum(refRect.top), "<br>V:").concat(parseNum(intersectRect.top));
    el.querySelector('.right').innerHTML = "G:".concat(parseNum(rect.right), "<br>L:").concat(parseNum(refRect.right), "<br>V:").concat(parseNum(intersectRect.right));
    el.querySelector('.bottom').innerHTML = "G:".concat(parseNum(rect.bottom), "<br>L:").concat(parseNum(refRect.bottom), "<br>V:").concat(parseNum(intersectRect.bottom));
    el.querySelector('.left').innerHTML = "G:".concat(parseNum(rect.left), "<br>L:").concat(parseNum(refRect.left), "<br>V:").concat(parseNum(intersectRect.left));
    el.querySelector('.size').innerHTML = "G:".concat(parseNum(rect.width), "x").concat(parseNum(rect.height), "<br>L:").concat(parseNum(fullRect.width), "x").concat(parseNum(fullRect.height), "<br>V:").concat(parseNum(intersectRect.width), "x").concat(parseNum(intersectRect.height));
  });
}

function updateIntersection() {
  var rect = _build__WEBPACK_IMPORTED_MODULE_0__["Rect"].intersecting.apply(_build__WEBPACK_IMPORTED_MODULE_0__["Rect"], _toConsumableArray(boxEls));

  if (rect.width * rect.height > 0) {
    intersectionEl.classList.add('active');
  } else {
    intersectionEl.classList.remove('active');
  }

  intersectionEl.querySelector('.top').innerHTML = "".concat(parseNum(rect.top));
  intersectionEl.querySelector('.right').innerHTML = "".concat(parseNum(rect.right));
  intersectionEl.querySelector('.bottom').innerHTML = "".concat(parseNum(rect.bottom));
  intersectionEl.querySelector('.left').innerHTML = "".concat(parseNum(rect.left));
  intersectionEl.querySelector('.size').innerHTML = "INTERSECTING<br>".concat(parseNum(rect.width), "x").concat(parseNum(rect.height));
}

function parseNum(val) {
  return Math.round(val * 100) / 100;
}

update();

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map