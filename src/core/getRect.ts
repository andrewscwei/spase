import getViewportRect from './getViewportRect';
import Rect from './Rect';

function typeIsWindow(val: any): val is Window {
  return val === window;
}

/**
 * Gets the combined rect of one or more elements.
 *
 * @param target - An element or array of elements to compute the combined rect.
 * @param options - Additional options.
 * @param options.reference - The element whose coordinate space the computed
 *                            top, right, bottom and left values are relative
 *                            to.
 *
 * @return The combined rect.
 */
export default function getRect(target: Rect | Window | Element | Element[], { reference = window }: { reference?: Window | Element } = {}): Rect | null {
  try {
    if (typeIsWindow(target)) return getViewportRect();
    if (target instanceof Rect) return target;

    const e = target instanceof Array ? target : [target];
    const n = e.length;
    const refRect = getRect(reference);
    const winRect = getRect(window);

    const rect: { [key: string]: number } = {};

    for (let i = 0; i < n; i++) {
      const element = e[i];
      const clientRect = element.getBoundingClientRect();

      const width = clientRect.width;
      const height = clientRect.height;
      let top = clientRect.top + winRect!.top;
      if (reference !== window) top -= refRect!.top;
      let left = clientRect.left + winRect!.left;
      if (reference !== window) left -= refRect!.left;
      const bottom = top + height;
      const right = left + width;

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
    console.error(err);
    return null;
  }
}
