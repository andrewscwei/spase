import { type Rect } from './types/Rect.js'

/**
 * Checks to see if the current {@link Rect} is equivalent to another
 * {@link Rect}.
 *
 * @param rect {@link Rect} instance to compare with.
 *
 * @returns `true` if equal, `false` otherwise.
 */
export function isEqual(a: Rect, b: Rect): boolean {
  if (a.top !== b.top) return false
  if (a.right !== b.right) return false
  if (a.bottom !== b.bottom) return false
  if (a.left !== b.left) return false
  if (a.width !== b.width) return false
  if (a.height !== b.height) return false

  return true
}
