import { make } from './make.js'
import { type Point } from './types/Point.js'

/**
 * Returns the resulting {@link Point} by dividing one by another.
 *
 * @param a The dividend {@link Point}.
 * @param b The divisor {@link Point}.
 *
 * @returns The resulting {@link Point}.
 */
export function divide(a: Point, b: Point): Point {
  return make({
    x: a.x / b.x,
    y: a.y / b.y,
  })
}
