import { type Descriptor } from './types/Descriptor.js'

/**
 * Checks if a value is a valid {@link Point} descriptor.
 *
 * @param value Value to check.
 *
 * @returns `true` if valid, `false` otherwise.
 */
export function isValidDescriptor(value: any): value is Descriptor {
  if (value instanceof Array) {
    if (value.length !== 2) return false
    if (typeof value[0] !== 'number') return false
    if (typeof value[1] !== 'number') return false

    return true
  } else if (typeof value === 'object') {
    if (typeof value.x !== 'number') return false
    if (typeof value.y !== 'number') return false

    return true
  } else {
    return false
  }
}
