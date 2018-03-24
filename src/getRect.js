import getViewportRect from './getViewportRect';
import Rect from './Rect';

/**
 * Gets the combined rect of one or more elements.
 *
 * @param {Element|Element[]} t - An element or array of elements to compute the
 *                                combined rect.
 * @param {Object} [options] - Additional options.
 * @param {Object} [options.ref=window] - The element whose coordinate space the
 *                                        computed top, right, bottom and left
 *                                        values are relative to.
 *
 * @return {Rect} @see module:fov.Rect
 */
export default function getRect(t, { ref } = {}) {
  try {
    if (t === window) return getViewportRect();
    if (t instanceof Rect) return t;
    if (!ref) ref = window;

    const e = [].concat(t);
    const n = e.length;
    const refRect = getRect(ref);
    const winRect = getRect(window);

    let rect = {};

    for (let i = 0; i < n; i++) {
      const element = e[i];
      const clientRect = element.getBoundingClientRect();

      let width = clientRect.width;
      let height = clientRect.height;
      let top = clientRect.top + winRect.top;
      if (ref !== window) top -= refRect.top;
      let left = clientRect.left + winRect.left;
      if (ref !== window) left -= refRect.left;
      let bottom = top + height;
      let right = left + width;

      rect.left = (rect.left === undefined) ? left : Math.min(rect.left, left);
      rect.right = (rect.right === undefined) ? right : Math.max(rect.right, right);
      rect.top = (rect.top === undefined) ? top : Math.min(rect.top, top);
      rect.bottom = (rect.bottom === undefined) ? bottom : Math.max(rect.bottom, bottom);
    }

    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;

    return new Rect({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
  }
  catch (err) {
    return null;
  }
}
