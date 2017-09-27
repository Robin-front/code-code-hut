export const getEmptyRect = () => {
  return {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0
  };
};

export const now = () => {
  if (window.performance && performance.now) {
    return performance.now();
  } else {
    return new Date().getTime();
  }
};

export const throttle = (fn, timeout, opts = {
  maxTime: 1000
}) => {
  let timer = null;
  let lastTime = 0;
  let {maxTime} = opts;
  return function() {
    if (!timer) {
      timer = setTimeout(function() {
        lastTime = utils.now();
        fn();
        timer = null;
      }, timeout);
    } else if ((utils.now() - lastTime) > maxTime) {
      fn();
      clearTimeout(timer);
      timer = null;
    }
  };
};

export const computeRectIntersection = (rect1, rect2) => {
  var top = Math.max(rect1.top, rect2.top);
  var bottom = Math.min(rect1.bottom, rect2.bottom);
  var left = Math.max(rect1.left, rect2.left);
  var right = Math.min(rect1.right, rect2.right);
  var width = right - left;
  var height = bottom - top;

  return (width >= 0 && height >= 0) && {
    top: top,
    bottom: bottom,
    left: left,
    right: right,
    width: width,
    height: height
  };
};

export const getBoundingClientRect = el => {
  var rect;

  try {
    rect = el.getBoundingClientRect();
  } catch (err) {
    // Ignore Windows 7 IE11 "Unspecified error"
    // https://github.com/WICG/IntersectionObserver/pull/205
  }

  if (!rect)
    return utils.getEmptyRect();

  // Older IE
  if (!(rect.width && rect.height)) {
    rect = {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };
  }
  return rect;
};

export const containsDeep = (parent, child) => {
  var node = child;
  while (node) {
    if (node == parent)
      return true;

    node = utils.getParentNode(node);
  }
  return false;
};

export const getParentNode = (node) => {
  var parent = node.parentNode;

  if (parent && parent.nodeType == 11 && parent.host) {
    // If the parent is a shadow root, return the host element.
    return parent.host;
  }
  return parent;
};
