import { type Point } from './types/Point.js'

/**
 * Returns the string representation of a {@link Point}
 *
 * @param point The {@link Point} to convert.
 *
 * @returns The resulting string.
 */
export function toString(point: Point): string {
  return `Point(x=${point.x}, y=${point.y})`
}
