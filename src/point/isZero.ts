import { type Point } from './types/Point.js'

/**
 * Checks to see if a {@link Point} only contains `0` values.
 *
 * @param point The {@link Point} to check.
 *
 * @returns `true` if the {@link Point} is `0`, `false` otherwise.
 */
export function isZero(point: Point): boolean {
  return point.x === 0 && point.y === 0
}
