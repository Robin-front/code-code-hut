import * as _IntersectionObserver from './IntersectionObserver.js'
import * as _IntersectionObserverEntry from './IntersectionObserverEntry.js'

'use strict';

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
  window.IntersectionObserver = _IntersectionObserver;
  window.IntersectionObserverEntry = _IntersectionObserverEntry;
}

export default IntersectionObserver;
export { IntersectionObserver, IntersectionObserverEntry }
