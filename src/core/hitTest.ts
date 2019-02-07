import getIntersectRect from './getIntersectRect';
import getRect from './getRect';
import Point, { PointDescriptor } from './Point';
import Rect from './Rect';

/**
 * Hit-tests 2 objects. These objects can either be a single point, Rect
 * instance(s) or Element instance(s).
 *
 * @param val1
 * @param val2
 *
 * @return `true` if test passes, `false` otherwise.
 */
export default function hitTestElement(val1: Point | PointDescriptor | Rect | Rect[] | Element | Element[] , val2: Point | Rect | Rect[] | Element | Element[]): boolean {
  try {
    const p1 = Point.isValid(val1) && new Point(val1);
    const p2 = Point.isValid(val2) && new Point(val2);

    if (p1 && !p2) {
      const t = val2 instanceof Array ? val2 : [val2];
      const n = t.length;

      for (let i = 0; i < n; i++) {
        const rect = getRect(t[i] as any);
        const cx = ((p1.x >= rect!.left) && (p1.x <= rect!.right));
        const cy = ((p1.y >= rect!.top) && (p1.y <= rect!.bottom));
        if (cx && cy) return true;
      }

      return false;
    }
    else if (!p1 && p2) {
      const t = val1 instanceof Array ? val1 : [val1];
      const n = t.length;

      for (let i = 0; i < n; i++) {
        const rect = getRect(t[i] as any);
        const cx = ((p2.x >= rect!.left) && (p2.x <= rect!.right));
        const cy = ((p2.y >= rect!.top) && (p2.y <= rect!.bottom));
        if (cx && cy) return true;
      }

      return false;
    }
    else if (p1 && p2) {
      return p1.equals(p2);
    }
    else {
      const t = [
        ...(val1 instanceof Array ? val1 : [val1]),
        ...(val2 instanceof Array ? val2 : [val2]),
      ];
      const r = getIntersectRect.apply(null, t as any[]);
      return (r!.width * r!.height !== 0);
    }
  }
  catch (err) {
    console.error(err);
    return false;
  }
}
