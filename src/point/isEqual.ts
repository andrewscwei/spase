import { type Point } from './types/Point.js'

/**
 * Checks to see if a {@link Point} is equivalent to another.
 *
 * @param a The first {@link Point}.
 * @param b The second {@link Point} to compare.
 *
 * @returns `true` if equal, `false` otherwise.
 */
export function isEqual(a: Point, b: Point): boolean {
  if (a.x !== b.x) return false
  if (a.y !== b.y) return false

  return true
}
