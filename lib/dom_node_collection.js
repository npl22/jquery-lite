class DomNodeCollection {

  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(htmlString) {
    if (htmlString) {
      this.htmlElements.forEach((el) => {
        el.innerHTML = htmlString;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.htmlElements.forEach((el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    console.log(arg);
    if (arg instanceof DomNodeCollection) {
        this.htmlElements.forEach((htmlElement) => {
          arg.htmlElements.forEach((argHtmlElement) => {
            htmlElement.innerHTML += argHtmlElement.outerHTML;
          });
        });
    }
    else if (arg instanceof HTMLElement) {
      this.htmlElements.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
    else {
      this.htmlElements.forEach((el) => {
        el.innerHTML += arg;
      });
    }
  }
}

module.exports = DomNodeCollection;

// $ul = $l("ul");
