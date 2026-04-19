import { type Rect } from './types/Rect.js'

/**
 * Checks to see if a {@link Rect} only contains `0` values.
 *
 * @param rect The {@link Rect} to check.
 *
 * @returns `true` if the {@link Rect} only contains `0` values, `false`
 */
export function isZero(rect: Rect): boolean {
  return (
    rect.top === 0 &&
    rect.right === 0 &&
    rect.bottom === 0 &&
    rect.left === 0 &&
    rect.width === 0 &&
    rect.height === 0
  )
}
