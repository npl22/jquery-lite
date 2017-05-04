const DomNodeCollection = require("./dom_node_collection.js");

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
