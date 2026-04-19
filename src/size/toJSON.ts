import { type JSONDescriptor } from './types/JSONDescriptor.js'
import { type Size } from './types/Size.js'

/**
 * Returns the JSON representation of a {@link Size}.
 *
 * @param size The {@link Size} to convert.
 *
 * @returns The resulting JSON object.
 */
export function toJSON(size: Size): JSONDescriptor {
  return Object.freeze({
    height: size.height,
    width: size.width,
  })
}
