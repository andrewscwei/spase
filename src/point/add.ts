import { make } from './make.js'
import { type Point } from './types/Point.js'

/**
 * Returns the resulting {@link Point} by adding one to another.
 *
 * @param a The first {@link Point}.
 * @param b The second {@link Point} to add.
 *
 * @returns The resulting {@link Point}.
 */
export function add(a: Point, b: Point): Point {
  return make({
    x: a.x + b.x,
    y: a.y + b.y,
  })
}
