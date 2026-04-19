import { type ArrayDescriptor } from './types/ArrayDescriptor.js'
import { type Size } from './types/Size.js'

/**
 * Returns the array representation of a {@link Size}.
 *
 * @param size The {@link Size} to convert.
 *
 * @returns The resulting array.
 */
export function toArray(size: Size): ArrayDescriptor {
  return [size.width, size.height]
}
