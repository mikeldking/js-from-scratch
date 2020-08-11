(function (_global) {
  /**
   * Represents a selection of DOM elements
   */
  class Selection extends Object {
    elements;
    constructor(selector) {
      super();
      this.elements = Array.from(document.querySelectorAll(selector));
    }
    css(propertyName, value) {
      if (propertyName && value) {
        this.elements.forEach((el) => {
          el.setAttribute("style", `${propertyName}: ${value}`);
        });
        return this;
      }
    }
    click(fn) {
      this.elements.forEach((el) => {
        el.addEventListener("click", fn.bind(this));
      });
    }
    html(htmlStr) {
      this.elements.forEach((el) => {
        el.innerHTML = htmlStr;
      });
    }
  }

  /**
   * Ajax class attached to the $ as a utility class
   */
  class Ajax extends Object {
    doneHandlers = [];
    constructor(options) {
      super();
      fetch(options.url)
        .then((res) => res.json())
        .then((responseJson) => {
          this.json = responseJson;
          this.doneHandlers.forEach((handler) => {
            handler(this.json);
          });
        });
    }
    done(fn) {
      if (this.json) {
        fn(this.json);
      } else {
        this.doneHandlers.push(fn);
      }
      return this;
    }
  }

  /**
   * Main jQuery function
   * @param {string | this} selector
   */
  function jQueryFn(selector) {
    if (typeof selector === "string") {
      return new Selection(selector);
    }
    if (selector instanceof Selection) {
      return selector;
    }
  }

  jQueryFn.ajax = function (requestConfig) {
    return new Ajax(requestConfig);
  };

  _global.$ = jQueryFn;
})(window);
