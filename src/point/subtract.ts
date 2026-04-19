import { make } from './make.js'
import { type Point } from './types/Point.js'

/**
 * Returns the resulting {@link Point} by subtracting one from another.
 *
 * @param a The {@link Point} to subtract from.
 * @param b The {@link Point} to subtract.
 *
 * @returns The resulting {@link Point}.
 */
export function subtract(a: Point, b: Point): Point {
  return make({
    x: a.x - b.x,
    y: a.y - b.y,
  })
}
