import { type Size } from './types/Size.js'

/**
 * Checks if a {@link Size} only contains `0` values.
 *
 * @param size The {@link Size} to check.
 *
 * @returns `true` if the {@link Size} is `0`, `false` otherwise.
 */
export function isZero(size: Size): boolean {
  return size.width === 0 && size.height === 0
}
