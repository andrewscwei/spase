import { make } from './make.js'
import { type Size } from './types/Size.js'

/**
 * Returns the resulting {@link Size} by adding one to another.
 *
 * @param a The first {@link Size}.
 * @param b The second {@link Size} to add.
 *
 * @returns The resulting {@link Size}.
 */
export function add(a: Size, b: Size): Size {
  return make({
    height: a.height + b.height,
    width: a.width + b.width,
  })
}
