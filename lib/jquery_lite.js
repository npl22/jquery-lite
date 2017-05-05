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
  }
  else if (arg instanceof HTMLElement){
    return new DomNodeCollection([arg]);
  }
  else if (arg instanceof Function) {
    document.addEventListener('DOMContentLoaded', arg);
  }
}

$l.extend = (...objects) => {
  const mergedObj = objects[0];
  objects.slice(1).forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      mergedObj[key] = obj[key];
    });
  });
  return mergedObj;
};

const defaultOptions = {
  method: 'GET',
  url: window.location.href,
  data: {},
  contentType: 'json',
  success: res => console.log(res),
  error: res => console.error("hello")
};

$l.ajax = (options) => {
  const ajaxOptions = $l.extend(defaultOptions, options);
  console.log(ajaxOptions);

  const xhr = new XMLHttpRequest();

  xhr.open(ajaxOptions.method, ajaxOptions.url);
  // xhr.setRequestHeader('Content-Type', ajaxOptions.contentType);

  xhr.onload = function () {
    console.log(xhr.status); // for status info
    console.log(xhr.responseType); //the type of data that was returned
    console.log(xhr.response); //the actual response. For json api calls, this will be a json string
  };

  xhr.send(ajaxOptions.data);
};

$l.ajax({
      method: 'GET',
      url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
      success(data) {
        console.log("We have your weather!");
        console.log(data);
      },
      error() {
        console.error("An error occurred.");
      },
   });

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
    this.each((el) => {
      el.classList.add(className);
    });
  }

  removeClass(className) {
    this.each((el) => {
      el.classList.remove(className);
    });
  }

  attr(attrName, attrValue) {
    if (typeof attrValue === "string") {
      this.each((el) => {
        el.setAttribute(attrName, attrValue);
      });
    } else {
      return this.htmlElements[0].getAttribute(attrName);
    }
  }

  children() {
    const array = [];
    this.each((node) => {
      let htmlCollection = node.children;
      for (let i = 0; i < htmlCollection.length; i++) {
        array.push(htmlCollection.item(i));
      }
    });
    return new DomNodeCollection(array);
  }

  parent() {
    const array = [];
    let lastInsertedNode;
    this.each((node) => {
      if (lastInsertedNode === undefined ||
          node.parentNode !== lastInsertedNode) {
        array.push(node.parentNode);
        lastInsertedNode = node.parentNode;
      }
    });

    return array;
  }

  find(selector) {
    const array = [];
    let nodeList;
    this.each((node) => {
      nodeList = node.querySelectorAll(selector);
      nodeList.forEach((el) => {
        array.push(el);
      });
    });
    return new DomNodeCollection(array);
  }

  remove() {
    this.each((node) => {
      node.outerHTML = "";
    });
    this.outerHTML = "";
  }

  on(event, callback) {
    this.each((node) => {
      node.addEventListener(event, callback);
      node.eventCallback = callback;
    });
  }

  off(event) {
    this.each((node) => {
      node.removeEventListener(event, node.eventCallback);
    });
  }

}

module.exports = DomNodeCollection;

// $ul = $l("ul");


/***/ })
/******/ ]);