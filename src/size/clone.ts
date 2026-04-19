import { make } from './make.js'
import { type JSONDescriptor } from './types/JSONDescriptor.js'
import { type Size } from './types/Size.js'

/**
 * Clones and returns a new {@link Size}.
 *
 * @param size The {@link Size} to clone.
 * @param newDescriptor Optional new {@link Size} JSON descriptor to apply to
 *                      the clone.
 *
 * @returns The cloned {@link Size}.
 */
export function clone(size: Size, newDescriptor: Partial<JSONDescriptor> = {}): Size {
  return make({
    height: typeof newDescriptor.height === 'number' ? newDescriptor.height : size.height,
    width: typeof newDescriptor.width === 'number' ? newDescriptor.width : size.width,
  })
}
