import { type JSONDescriptor } from './types/JSONDescriptor.js'
import { type Rect } from './types/Rect.js'

/**
 * Returns the JSON representation of a {@link Rect}.
 *
 * @param rect The {@link Rect} to convert.
 *
 * @returns The JSON object.
 */
export function toJSON(rect: Rect): JSONDescriptor {
  return Object.freeze({
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
  })
}
