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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

function $l (arg) {
  if (typeof arg === 'string') {
    const array = [];
    const nodeList = document.querySelectorAll(arg);
    nodeList.forEach((el) => {
      array.push(el);
    });
    return new DomNodeCollection(array);
  } else if (arg instanceof HTMLElement){
    return new DomNodeCollection([arg]);
  }

  // console.log("argument is not a string");
}

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DomNodeCollection {

  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  each(callback) {
    this.htmlElements.forEach((el, index) => {
      callback(el, index);
    });
  }

  html(htmlString) {
    if (htmlString) {
      this.each((el) => {
        el.innerHTML = htmlString;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.each((el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    console.log(arg);
    if (arg instanceof DomNodeCollection) {
        this.each((htmlElement) => {
          arg.each((argHtmlElement) => {
            htmlElement.innerHTML += argHtmlElement.outerHTML;
          });
        });
    }
    else if (arg instanceof HTMLElement) {
      this.each((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
    else {
      this.each((el) => {
        el.innerHTML += arg;
      });
    }
  }

  addClass(className) {

  }

}

module.exports = DomNodeCollection;

// $ul = $l("ul");


/***/ })
/******/ ]);