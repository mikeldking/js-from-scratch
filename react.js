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

export default {
  createElement,
};
