import getIntersectRect from './getIntersectRect';
import getRect from './getRect';
import Point from './Point';

/**
 * Hit-tests 2 objects. These objects can either be a single point, Rect
 * instance(s) or Element instance(s).
 *
 * @param {Point|Rect|Rect[]|Element|Element[]} t1
 * @param {Point|Rect|Rect[]|Element|Element[]} t2
 *
 * @return {boolean} `true` if test passes, `false` otherwise.
 */
export default function hitTestElement(t1, t2) {
  const p1 = Point.isValid(t1) && new Point(t1);
  const p2 = Point.isValid(t2) && new Point(t2);

  if (p1 && !p2) {
    const t = [].concat(t2);
    const n = t.length;

    for (let i = 0; i < n; i++) {
      const rect = getRect(t[i]);
      const cx = ((p1.x >= rect.left) && (p1.x <= rect.right));
      const cy = ((p1.y >= rect.top) && (p1.y <= rect.bottom));
      if (cx && cy) return true;
    }

    return false;
  }
  else if (!p1 && p2) {
    const t = [].concat(t1);
    const n = t.length;

    for (let i = 0; i < n; i++) {
      const rect = getRect(t[i]);
      const cx = ((p2.x >= rect.left) && (p2.x <= rect.right));
      const cy = ((p2.y >= rect.top) && (p2.y <= rect.bottom));
      if (cx && cy) return true;
    }

    return false;
  }
  else if (p1 && p2) {
    return p1.equals(p2);
  }
  else {
    const t = [].concat(t1).concat(t2);
    const r = getIntersectRect.apply(null, t);
    return (r.width * r.height !== 0);
  }
}
