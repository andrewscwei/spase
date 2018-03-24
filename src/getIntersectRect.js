import getRect from './getRect';
import Rect from './Rect';

/**
 * Computes the intersecting rect of one or more elements. If only 1 element is
 * specified, the intersection will be computed against the viewport.
 *
 * @param {...Element} elements - Element(s) to be used to compute the
 *                                intersecting rect.
 *
 * @return {Rect} @see module:fov.Rect
 */
export default function getIntersectRect(...elements) {
  try {
    const n = elements.length;

    let rect = {};
    let currRect, nextRect;

    for (let i = 0; i < n; i++) {
      if (!currRect) currRect = getRect(elements[i]);

      if (i === 0 && ((i + 1) === n)) {
        nextRect = getRect(window);
      }
      else if ((i + 1) < n) {
        nextRect = getRect(elements[i + 1]);
      }
      else {
        break;
      }

      rect.width = Math.max(0.0, Math.min(currRect.right, nextRect.right) - Math.max(currRect.left, nextRect.left));
      rect.height = Math.max(0.0, Math.min(currRect.bottom, nextRect.bottom) - Math.max(currRect.top, nextRect.top));
      rect.top = Math.max(currRect.top, nextRect.top);
      rect.left = Math.max(currRect.left, nextRect.left);
      rect.bottom = rect.top + rect.height;
      rect.right = rect.left + rect.width;

      if (rect.width * rect.height === 0) {
        rect.width = 0;
        rect.height = 0;
        rect.top = 0;
        rect.left = 0;
        rect.bottom = 0;
        rect.right = 0;
      }

      currRect = rect;
    }

    return new Rect({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
  }
  catch (err) {
    return null;
  }
}
