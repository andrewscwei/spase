import { make } from './make.js'
import { type Size } from './types/Size.js'

/**
 * Returns the resulting {@link Size} by multiplying one by another.
 *
 * @param a The {@link Size} to multiply.
 * @param b The {@link Size} to multiply by.
 *
 * @returns The resulting {@link Size}.
 */
export function multiply(a: Size, b: Size): Size {
  return make({
    height: a.height * b.height,
    width: a.width * b.width,
  })
}
