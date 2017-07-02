const ENPTY = {};
/** @private */
let memoize = (fn, mem={}) => k => mem.hasOwnProperty(k) ? mem[k] : (mem[k] = fn(k));

let hooks = {};

export function h(nodeName, attributes, ...args){
  let children = args.length ? [].concat(...args) : null;
  return new VNode(nodeName, attributes, children);
}

export function render(component, parent){
  let built = _render(null, component),
      _component = built._component;
  trigger(_component, 'componentWillMount');
  parent.appendChild(built);
  trigger(_component, 'componentDidMount');
  return _render;
}

function getNodeProps(vnode){
  let props = extend({}, vnode.attributes);
  vnode.children && (props.children = vnode.children);
  vnode.text && (props._content = vnode.text);
  return props;
}

function buildComponentFromVNode(dom, vnode){
  let c = dom && dom._component;

  if (c && dom._componentConstructor === vnode.nodeName){
    let props = getNodeProps(vnode);
    c.setProps(props);
    return dom;
  } else {
    if(c){
      unmountComponent(dom, c);
    } else{
      return createComponentFromVNode(vnode);
    }
  }
}

function unmountComponent(dom, component){
  console.warn('unmounting mismatch component', component);

  delete dom._component;
  trigger(component, 'componentWillUnmount');
  let base = component.base;
  if (base && base.parentNode){
    base.parentNode.removeChild(base);
  }
  trigger(component, 'componentDidUnmount');
  componentRecycler.collect(component);
}

function createComponentFromVNode(vnode){
  let component = componentRecycler.create(vnode.nodeName);
  let props = getNodeProps(vnode);
  component.setProps(props, {render: false});
  component._render({build: true});

  let node = component.base;
  node._component = component;
  node._componentConstructor = node.nodeName;
  return node;
}

const componentRecycler = {
  component: {},
  create(nodeName){
    let name = nodeName.name,
        list = componentRecycler.component[name];

    if (list && list.length){
      return list.splice(0, 1)[0];
    }
    return new nodeName();

  },
  collect(component){
    let name = component.constructor.name,
        list = componentRecycler.component[name] && (componentRecycler.component[name] = []);
    list.push(component);
  }
}

/**
 * 将 vnode 渲染到实际 dom上
 * @param       {[type]} dom           [description]
 * @param       {[type]} vnode         [description]
 * @param       {[type]} rootComponent [description]
 * @constructor
 * @return      {[type]}               [description]
 */
function _render(dom, vnode, rootComponent){
  let out = dom,
      nodeName = vnode.nodeName;

  if (typeof nodeName === 'function'){
    return buildComponentFromVNode(dom, vnode);
  }

  if (typeof vnode === 'string') { //如果是字符串，直接创建文本节点，object没有split方法
    if (dom){
      if (dom.nodeType === 3){
        dom.textContent = vnode;
        return dom;
      } else {
        if (dom.nodeType === 1){
          recycler.collect(dom);
        }
      }
    }
    return document.createTextNode(vnode);
  }

  if (nodeName === null || nodeName === undefined){
    nodeName = 'x-undefined-element';
  }

  if (!dom){
    out = recycler.create(nodeName);
  } else if (dom.nodeName.toLowerCase() !== nodeName){
    out = recycler.create(nodeName);
    appendChildren(out, Array.prototype.slice.call(dom.childNodes));
    if (dom.nodeType === 1){
      recycler.collect(dom);
    }
  } else if (dom._component && dom._component !== rootComponent){
    unmountComponent(dom, dom._component);
  }

  let old = getNodeAttributes(out)||ENPTY,
      attrs = vnode.attributes||ENPTY;

  // 移除新attrs中值为 false, null, undefined的attr
  if (old !== ENPTY){
    for(let i in old){
      if (old.hasOwnProperty(i)){
        let val = attrs[i];
        if (val === undefined || val === null || val===false){
          setAccessor(out, i, null, old[i]);
        }
      }
    }
  }

  // set and update new attrs
  if (attrs !== ENPTY){
    for (let i in attrs){
      if (attrs.hasOwnProperty(i)){
        let val = attrs[i];
        if (val !== undefined && val !== null && val !== false){
          let prev = getAccessor(out, i, old[i]);
          if (val !== prev){
            setAccessor(out, i, val, prev);
          }
        }
      }
    }
  }

  //处理完这一层dom的attrs之后，就开始处理 children, 并进行递归

  // childNodes本是类数组，但原型是 childNodes， 转换并拷贝成 纯数组，原型是 array
  let children = Array.prototype.slice.call(out.childNodes);
  // 建立一个keymap，以便实现dom复用，减少排序类的dom变动
  let keyed = {};
  for (let i = children.length; i--; ){
    let nodeType = children[i].nodeType;
    let key;
    if (nodeType === 3){
      key = nodeType.key;
    } else if (nodeType === 1){
      key = children[i].getAttribute('key');
    } else {
      continue;
    }

    if (key){
      keyed[key] = children.splice(i, 1)[0];
    }
  }

  let newChildren = [];
  if (vnode.children){
    for (let i = 0, vlen = vnode.children.length; i < vlen; i++){
      let vchild = vnode.children[i],
          attr = vchild.attributes,
          key, child;
      if (attr){
        key = attr.key;
        child = key || keyed[key];
      }
      // 找已存在的dom
      if  (!child){
        let len = children.length;
        if (len){
          for (let j=0; j < len; j++){
            if (isSameNodeType(children[j], vchild)){
              child = children.spliec(j, 1)[0];
            }
          }
        }
      }

      // 不管找不找得到，rebuild dom from vnode;
      newChildren.push(_render(child, vchild));
    }
  }

  // 插入新建的 children;
  for(let i=0, len = newChildren.length; i< len; i++ ){
    if (out.childNodes[i] !== newChildren[i]){
      let child = newChildren[i],
          component = child._component,
          next = out.childNodes[i+1];
      if (component){ trigger(component, 'componentWillMount'); }
      if (next){
        out.insertBefore(child, next);
      } else {
        out.appendChild(child);
      }
      if (component){ trigger(component, 'componentDidMount');}
    }
  }

  //删除无用的children;
  for (let i = 0, len = children.length; i< len; i++){
    let child = children[i],
        component = child._component;
    if (component){ trigger(component, 'componentWillUnmount'); }
    child.parentNode.removeChild(child);
    if (component){
      trigger(component, 'componentDidUnmount');
      componentRecycler.collect(child);
    } else if (child.nodeType === 1){
      recycler.collect(child);
    }
  };

  return out;
}

function appendChildren(parent, children){
  let len = children.length;
  if (len<=2){
    parent.appendChild(parend, children[0]);
    if (len === 2){
      parent.appendChild(parent, children[1]);
    }
    return;
  }

  let fragments = document.createDocumentFragment();
  for (let i=0; i < len; i++){
    fragments.appendChild(children[i]);
  }
  parent.appendChild(fragments);
}

function isSameNodeType(node, vnode){
	if (node.nodeType === 3){
    return typeof vnode === 'string';
  }
  let nodeName = vnode.nodeName;
  if (typeof nodeName === 'function'){
    return node._componentConstructor === nodeName;
  }
  return node.nodeName.toLowerCase === nodeName;
}

let recycler = {
  node: {},
  create(nodeName){
    let name = recycler.normalizeName(nodeName),
        list = recycler.node[nodeName];
    return list && list.pop() || document.createElement(nodeName);
  },
  collect(node){
    recycler.clean(node);
    let name = recycler.normalizeName(node.nodeName),
        list = recycler.node[name];
    list ? (list.push(node)): (recycler.node[name] = [node]);
  },
  clean(node){
    node.remove();
    let len = node.attributes && node.attributes.length;
    if (len){
      for (let i = len; i--; ){
        node.removeAttribute(node.attributes[i].name);
      }
    }
  },
  normalizeName: memoize(name => name.toUpperCase())
}
class VNode{
  constructor(nodeName, attributes, children){
    this.nodeName = nodeName;
    this.attributes = attributes;
    this.children = children
  }
}

function getNodeAttributes(node){
  let list = node.attributes;
  if (!list || !list.getNameItem){
    return list;
  }
  if (list.length){
    return getNodeAttriAsObject(list);
  }
}

// 将实际 dom 的 NamedNodeMap(数组形式) 转换成 obj
function getNodeAttriAsObject(list){
  let attrs = {};
  for(let i = list.length; i--; ){
    let item = list[i];
    attrs[item.name] = item.value;
  }
  return attrs;
}

function getAccessor(node, name, value){
  if (name === 'class'){ return node.className;}
  if (name === 'style'){ return node.style.cssText;}
  return value;
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
        //对 events 进行缓存，更新时直接替换 value,每种事件只能有一个value
		if (!l[type]){
      node.addEventListener(type, eventProxy)
    };
		l[type] = value;
		return;
	}

	let type = typeof value;
	if (value===null) {
		node.removeAttribute(name);
	} else if (type!=='function' && type!=='object') {
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

export class Component {
  constructor() {
    this._dirty = this._disablerendering = false;
    this.nextProps = this.base = null;
    this.props = trigger(this, 'getDefaultProps') || {};
    this.state = trigger(this, 'getInitialState') || {};
    trigger(this, 'initialize');
  }

  shouldComponentUpdate(props, state){
    return true;
  }

  setState(state){
    extend(this.state, state);
    this.triggerRender();
  }

  triggerRender(){
    if (this._dirty !== true){
      this._dirty = true;
      renderQueue.add(this);
    }
  }

  setProps(props, opts=ENPTY){
    let d = this._disablerendering;
    this._disablerendering = true;
    trigger(this, 'componentWillReceiveProps', props, this.props);
    this.nextProps = props;
    this._disablerendering = d;
    if (opts.renderSync === true && opts.syncComponentUpdates === true){
      this._render();
    } else if (opts.render !== false){
      this.triggerRender();
    }
  }

  _render(opts=ENPTY){
    console.log('_render');
    if (this._disablerendering === true) { return;}
    this._dirty = false;

    if (this.base && trigger(this, 'shouldComponentUpdate', this.props, this.state) === false){
      this.props = this.nextProps;
      return;
    }

    this.props = this.nextProps;
    trigger(this, 'componentWillUpdate');

    let rendered = trigger(this, 'render', this.props, this.state);
    if (this.base || opts.build === true){
      let base = _render(this.base, rendered||'', this);
      console.log('base', base);
      if (this.base && base !== this.base){
        let parent = this.base.parentNode;
        parent && parent.replaceChild(base, this.base);
      }
      this.base = base;
    }
    trigger(this, 'componentDidUpdate');
  }

  render(props, state){
    return h('div', {component: this.constructor.name}, props.children);
  }

}

function extend(obj, props){
  for(let i in props){
    if (props.hasOwnProperty(i)){
      obj[i] = props[i];
    }
  }
  return obj;
}

const renderQueue = {
  items: [],
  itemsOffline: [],
  add(component){
    if (renderQueue.items.push(component) !== 1){ return;}
    let d = hooks.debounceRendering;
    if (d){
      d(renderQueue.process());
    } else{
      setTimeout(renderQueue.process, 0);
    }
  },
  process(){
    let items = renderQueue.items,
        len = items.length;

    renderQueue.items = renderQueue.itemsOffline;
    renderQueue.items.length = 0;
    renderQueue.itemsOffline = items;

    while (len--) {
      if (items[len]._dirty){
        items[len]._render();
      }
    }
  }
}


export default { render, h, Component };
