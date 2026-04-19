import { type Rect } from './types/Rect.js'

/**
 * Checks to see if a value is a {@link Rect}.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is a {@link Rect}, `false` otherwise.
 */
export function is(value: any): value is Rect {
  return (
    typeof value === 'object' &&
    typeof value.top === 'number' &&
    typeof value.right === 'number' &&
    typeof value.bottom === 'number' &&
    typeof value.left === 'number' &&
    typeof value.width === 'number' &&
    typeof value.height === 'number'
  )
}
