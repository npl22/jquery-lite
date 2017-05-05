const DomNodeCollection = require("./dom_node_collection.js");

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
