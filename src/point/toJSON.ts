import { type JSONDescriptor } from './types/JSONDescriptor.js'
import { type Point } from './types/Point.js'

/**
 * Returns the JSON representation of a {@link Point}.
 *
 * @param point The {@link Point} to convert.
 *
 * @returns The resulting JSON object.
 */
export function toJSON(point: Point): JSONDescriptor {
  return Object.freeze({
    x: point.x,
    y: point.y,
  })
}
