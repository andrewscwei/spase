import { make } from './make.js'
import { type Size } from './types/Size.js'

/**
 * Returns the resulting {@link Size} by subtracting one from another.
 *
 * @param a The {@link Size} to subtract from.
 * @param b The {@link Size} to subtract.
 *
 * @returns The resulting {@link Size}.
 */
export function subtract(a: Size, b: Size): Size {
  return make({
    height: a.height - b.height,
    width: a.width - b.width,
  })
}
