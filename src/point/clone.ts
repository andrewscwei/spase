import { make } from './make.js'
import { type JSONDescriptor } from './types/JSONDescriptor.js'
import { type Point } from './types/Point.js'

/**
 * Clones and returns a new {@link Point}.
 *
 * @param point Original {@link Point} to clone.
 * @param newDescriptor Optional new {@link Point} JSON descriptor to apply to
 *                      the clone.
 *
 * @returns The cloned {@link Point}.
 */
export function clone(point: Point, newDescriptor: Partial<JSONDescriptor> = {}): Point {
  return make({
    x: typeof newDescriptor.x === 'number' ? newDescriptor.x : point.x,
    y: typeof newDescriptor.y === 'number' ? newDescriptor.y : point.y,
  })
}
