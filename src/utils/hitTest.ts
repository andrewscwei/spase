import Point, { PointDescriptor } from '../core/Point';
import Rect from '../core/Rect';

/**
 * Hit-tests 2 objects. These objects can either be a single point, Rect
 * instance(s) or Element instance(s).
 *
 * @param obj1 - First object.
 * @param obj2 - Second object.
 *
 * @return `true` if test passes, `false` otherwise.
 */
export default function hitTest(obj1: Point | PointDescriptor | Rect | Rect[] | Element | Element[] , obj2: Point | Rect | Rect[] | Element | Element[]): boolean {
  try {
    const p1 = Point.isValid(obj1) && new Point(obj1);
    const p2 = Point.isValid(obj2) && new Point(obj2);

    if (p1 && !p2) {
      const t = obj2 instanceof Array ? obj2 : [obj2];
      const n = t.length;

      for (let i = 0; i < n; i++) {
        const rect = Rect.from(t[i] as any);
        const cx = ((p1.x >= rect!.left) && (p1.x <= rect!.right));
        const cy = ((p1.y >= rect!.top) && (p1.y <= rect!.bottom));
        if (cx && cy) return true;
      }

      return false;
    }
    else if (!p1 && p2) {
      const t = obj1 instanceof Array ? obj1 : [obj1];
      const n = t.length;

      for (let i = 0; i < n; i++) {
        const rect = Rect.from(t[i] as any);
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
        ...(obj1 instanceof Array ? obj1 : [obj1]),
        ...(obj2 instanceof Array ? obj2 : [obj2]),
      ];
      const r = Rect.intersecting.apply(null, t as any[]);
      return (r!.width * r!.height !== 0);
    }
  }
  catch (err) {
    /* tslint:disable-next-line no-console */
    console.error(err);
    return false;
  }
}
