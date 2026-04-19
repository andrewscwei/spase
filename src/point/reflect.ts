import { make } from './make.js'
import { type Point } from './types/Point.js'

/**
 * Returns the resulting {@link Point} by reflecting x/y values.
 *
 * @param point The {@link Point} to reflect.
 *
 * @returns The resulting {@link Point}.
 */
export function reflect(point: Point): Point {
  return make({
    x: point.y,
    y: point.x,
  })
}
