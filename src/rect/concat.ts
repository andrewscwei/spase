import { make } from './make.js'
import { type Rect } from './types/Rect.js'

/**
 * Concatenates one {@link Rect} with another.
 *
 * @param a The first {@link Rect}.
 * @param b The second {@link Rect} to concatenate.
 *
 * @returns The resulting {@link Rect}.
 */
export function concat(a: Rect, b: Rect): Rect {
  return make({
    height: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top),
    width: Math.max(a.right, b.right) - Math.min(a.left, b.left),
    x: Math.min(a.left, b.left),
    y: Math.min(a.top, b.top),
  })
}
