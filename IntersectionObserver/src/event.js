export const addEvent = (node, event, fn, opt_useCapture = false) => {
  if (node.addEventListener) {
    node.addEventListener(event, fn, opt_useCapture);
  } else if (node.attachEvent) {
    node.attachEvent('on' + event, fn);
  }
};

export const removeEvent = (node, event, fn, opt_useCapture = false) => {
  if (node.removeEventListener) {
    node.removeEventListener(event, fn, opt_useCapture);
  } else if (node.detatchEvent) {
    node.detatchEvent('on' + event, fn);
  }
};
