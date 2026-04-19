import { make } from './make.js'
import { type Rect } from './types/Rect.js'

/**
 * Returns a new {@link Rect} after applying a 90˚ rotation, essentially
 * swapping the width/height values.
 *
 * @param rect The {@link Rect} to rotate.
 *
 * @returns The resulting {@link Rect}.
 */
export function rotate(rect: Rect): Rect {
  return make({
    height: rect.width,
    width: rect.height,
    x: rect.left,
    y: rect.top,
  })
}
