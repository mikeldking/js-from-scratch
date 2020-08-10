export function render(element, container) {
  console.dir(element);
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
  render,
};
