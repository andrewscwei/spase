import { type Point } from './types/Point.js'

/**
 * Checks to see if a value is a {@link Point}.
 *
 * @param value Value to check.
 *
 * @returns `true` if the value is a {@link Point}, `false` otherwise.
 */
export function is(value: any): value is Point {
  return (
    typeof value === 'object' &&
    typeof value.x === 'number' &&
    typeof value.y === 'number'
  )
}
