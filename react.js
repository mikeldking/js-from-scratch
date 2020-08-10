class Component extends Object {
  constructor(props) {}
}

export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: { nodeValue: text },
  };
}

export function createElement(elementType, props, ...children) {
  const el = {
    type: elementType,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === "object" ? child : createTextElement(child);
      }),
    },
  };
  return el;
}

let hooks = [];
let idx = 0;
let dirty = false;

export function useState(initVal) {
  const _idx = idx++;
  const state = hooks[_idx] || initVal;
  const setState = (newVal) => {
    console.log("setting new val " + newVal);
    dirty = true;
    hooks[_idx] = newVal;
  };
  return [state, setState];
}

export function render(element, container) {
  element = typeof element === "function" ? element() : element;
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((key) => {
      dom[key] = element.props[key];
    });
  if (element.props.children) {
    element.props.children.forEach((child) => {
      render(child, dom);
    });
  }
  container.appendChild(dom);
}

export default {
  createElement,
  useState,
  render: (element, container) => {
    render(element, container);
    setInterval(() => {
      if (dirty) {
        console.log("re-render");
        idx = 0;
        container.innerHTML = "";
        render(element, container);
        dirty = false;
      }
    }, 10);
  },
};
