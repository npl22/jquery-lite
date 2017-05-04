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
