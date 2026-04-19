import { type ArrayDescriptor } from './types/ArrayDescriptor.js'
import { type Point } from './types/Point.js'

/**
 * Returns the array representation of a {@link Point}.
 *
 * @param point The {@link Point} to convert.
 *
 * @returns The resulting array.
 */
export function toArray(point: Point): ArrayDescriptor {
  return [point.x, point.y]
}
