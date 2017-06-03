
export function h(nodeName, attributes, ...args){
  let children = args.length ? [].concat(...args) : null;
  return {nodeName, attributes, children}
}

export function render(vnode){
  if (vnode.split) {
    return document.createTextNode(vnode);
  }

  let n = document.createElement(vnode.nodeName);

  let a  = vnode.attributes || {};
  Object.keys(a).forEach(k => {
    n.setAttribute(k, a[k]);
  });

  (vnode.children||[]).forEach(c => n.appendChild(render(c)));

  return n;
}
