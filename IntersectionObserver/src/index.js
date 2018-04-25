import _IntersectionObserver from './IntersectionObserver.js'
// import _IntersectionObserverEntry from './IntersectionObserverEntry.js'

'use strict';

let IntersectionObserver = window.IntersectionObserver;
// export let IntersectionObserver = window.IntersectionObserver;
// export let IntersectionObserverEntry = window.IntersectionObserverEntry;

if ('IntersectionObserver' in window &&
    'IntersectionObserverEntry' in window &&
    'intersectionRatio' in IntersectionObserverEntry.prototype) {

  // Minimal polyfill for Edge 15's lack of `isIntersecting`
  // See: https://github.com/WICG/IntersectionObserver/issues/211
  if (!('isIntersecting' in IntersectionObserverEntry.prototype)) {
    Object.defineProperty(IntersectionObserverEntry.prototype, 'isIntersecting', {
      get: function () {
        return this.intersectionRatio > 0;
      }
    });
  }
} else {
  IntersectionObserver = _IntersectionObserver;
  // IntersectionObserverEntry = _IntersectionObserverEntry;
}

export default IntersectionObserver;