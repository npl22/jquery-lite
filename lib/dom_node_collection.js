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
    if (attrValue) {
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

}

module.exports = DomNodeCollection;

// $ul = $l("ul");
