import { type Size } from './types/Size.js'

/**
 * Checks to see if a value is a {@link Size}.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is a {@link Size}, `false` otherwise.
 */
export function is(value: any): value is Size {
  return (
    typeof value === 'object' &&
    typeof value.width === 'number' &&
    typeof value.height === 'number'
  )
}
