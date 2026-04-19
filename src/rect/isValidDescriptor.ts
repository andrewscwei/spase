import { type Descriptor } from './types/Descriptor.js'

/**
 * Checks if an object can be used to create a new {@link Rect}.
 *
 * @param value Value to check.
 *
 * @returns `true` if valid, `false` otherwise.
 */
export function isValidDescriptor(value: any): value is Descriptor {
  if (typeof value.x !== 'number') return false
  if (typeof value.y !== 'number') return false
  if (typeof value.width !== 'number') return false
  if (typeof value.height !== 'number') return false

  return true
}
