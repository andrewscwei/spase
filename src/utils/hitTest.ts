import { Point, type PointDescriptor } from '../core/Point.js'
import { Rect } from '../core/Rect.js'

/**
 * Hit-tests one spatial object against one or more spatial objects. In order
 * for the test to pass, the object just needs to collide with at least one of
 * the specified objects.
 *
 * @param a The object to test.
 * @param b Object(s) to test against.
 *
 * @returns `true` if test passes, `false` otherwise.
 */
export function hitTest(a: Point | PointDescriptor | Rect | Rect[] | Element | Element[], b: Point | Rect | Rect[] | Element | Element[]): boolean {
  try {
    const p1 = Point.isValidDescriptor(a) && Point.make(a)
    const p2 = Point.isValidDescriptor(b) && Point.make(b)

    if (p1 && !p2) {
      const t = b instanceof Array ? b : [b]
      const n = t.length

      for (let i = 0; i < n; i++) {
        const rect = Rect.from(t[i] as any)
        if (!rect) continue

        const cx = p1.x >= rect.left && p1.x <= rect.right
        const cy = p1.y >= rect.top && p1.y <= rect.bottom

        if (cx && cy) return true
      }

      return false
    }
    else if (!p1 && p2) {
      const t = a instanceof Array ? a : [a]
      const n = t.length

      for (let i = 0; i < n; i++) {
        const rect = Rect.from(t[i] as any)
        if (!rect) continue
        const cx = p2.x >= rect.left && p2.x <= rect.right
        const cy = p2.y >= rect.top && p2.y <= rect.bottom
        if (cx && cy) return true
      }

      return false
    }
    else if (p1 && p2) {
      return Point.isEqual(p1, p2)
    }
    else {
      const t = [
        ...a instanceof Array ? a : [a],
        ...b instanceof Array ? b : [b],
      ]
      const r = Rect.intersecting.apply(null, t as any[])
      if (!r) return false

      return r.width * r.height !== 0
    }
  }
  catch (err) {
    console.error(err)

    return false
  }
}
