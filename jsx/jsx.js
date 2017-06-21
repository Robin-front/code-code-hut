
/** @private */
let memoize = (fn, mem={}) => k => mem.hasOwnProperty(k) ? mem[k] : (mem[k] = fn(k));

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
    // setAttribute and addEvents
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


/** @private 属性设置 */
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


function setComplexAccessor(node, name, value, old) {
	if (name.substring(0,2)==='on') {
		let type = name.substring(2).toLowerCase(),
			l = node._listeners || (node._listeners = {});
		if (!l[type]) node.addEventListener(type, eventProxy);
		l[type] = value;
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

// 改变事件上下文
function eventProxy(e){
  let l = this._listeners,
      fn = l[toLowerCase(e.type)];
  if (fn){
    return fn.call(this, e);
  }
}

const toLowerCase = memoize(name => name.toLowerCase());

/** @private */
function trigger(obj, name, ...args) {
	let fn = obj[name];
	if (fn && typeof fn==='function') return fn.apply(obj, args);
}
