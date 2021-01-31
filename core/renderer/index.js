export function createElement(vDom, containRoot) {
  const {tag, props, children} = vDom
  const el = document.createElement(tag)

  if (props) {
    for(const key in props) {
      const value = props[key]
      el.setAttribute(key, value)
    }
  }

  if (typeof children === 'string') {
    const _node = document.createTextNode(children)
    el.append(_node)
  } else if (children && Array.isArray(children) && Array.length > 0) {
    children.forEach(child => createElement(child, el))
  }

  containRoot.append(el)
}
