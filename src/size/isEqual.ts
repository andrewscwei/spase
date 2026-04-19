import { type Size } from './types/Size.js'

/**
 * Checks to see if a {@link Size} is equivalent to another.
 *
 * @param a The first {@link Size}.
 * @param b The second {@link Size} to compare.
 *
 * @returns `true` if equal, `false` otherwise.
 */
export function isEqual(a: Size, b: Size): boolean {
  if (a.width !== b.width) return false
  if (a.height !== b.height) return false

  return true
}
