import { make } from './make.js'
import { type Size } from './types/Size.js'

/**
 * Returns the resulting {@link Size} by dividing one by another.
 *
 * @param a The dividend {@link Size}.
 * @param b The divisor {@link Size}.
 *
 * @returns The resulting {@link Size}.
 */
export function divide(a: Size, b: Size): Size {
  return make({
    height: a.height / b.height,
    width: a.width / b.width,
  })
}
