import { make } from './make.js'
import { type Size } from './types/Size.js'

/**
 * Returns the resulting {@link Size} after applying a 90˚ rotation, essentially
 * swapping the width/height values.
 *
 * @param size The {@link Size} to rotate.
 *
 * @returns The resulting {@link Size}.
 */
export function rotate(size: Size): Size {
  return make({
    height: size.width,
    width: size.height,
  })
}
