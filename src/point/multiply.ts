import { make } from './make.js'
import { type Point } from './types/Point.js'

/**
 * Returns the resulting {@link Point} by multiplying one by another.
 *
 * @param a The {@link Point} to multiply.
 * @param b The {@link Point} to multiply by.
 *
 * @returns The resulting {@link Point}.
 */
export function multiply(a: Point, b: Point): Point {
  return make({
    x: a.x * b.x,
    y: a.y * b.y,
  })
}
