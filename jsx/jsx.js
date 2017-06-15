
export function h(nodeName, attributes, ...args){
  let children = args.length ? [].concat(...args) : null;
  return new VNode(nodeName, attributes, children);
}

export function render(vnode, parent){
  let dom = _render(vnode);
  parent.appendChild(dom);
  return dom;
}

function _render(vnode){
  if (vnode.split) { //如果是字符串，直接创建文本节点，object没有split方法
    return document.createTextNode(vnode);
  }

  let n = document.createElement(vnode.nodeName);

  let a  = vnode.attributes || {};
  Object.keys(a).forEach(k => {
    // n.setAttribute(k, a[k]);
    setAccessor(n, k, a[k]);
  });

  (vnode.children||[]).forEach(c => n.appendChild(_render(c))); // 递归

  return n;
}


class VNode{
  constructor(nodeName, attributes, children){
    this.nodeName = nodeName;
    this.attributes = attributes;
    this.children = children
  }
}


/** @private Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 */
function setAccessor(node, name, value, old) {
	if (name==='class') {
		node.className = value;
	}
	else if (name==='style') {
		node.style.cssText = value;
	}
	else {
		setComplexAccessor(node, name, value, old);
	}
}


/** @private For props without explicit behavior, apply to a Node as event handlers or attributes. */
function setComplexAccessor(node, name, value, old) {
	if (name.substring(0,2)==='on') {
		let type = name.substring(2).toLowerCase(),
			l = node._listeners || (node._listeners = {});
		if (!l[type]) node.addEventListener(type, value);
		l[type] = value;
		// @TODO automatically remove proxy event listener when no handlers are left
		return;
	}

	let type = typeof value;
	if (value===null) {
		node.removeAttribute(name);
	}
	else if (type!=='function' && type!=='object') {
		node.setAttribute(name, value);
	}
}
