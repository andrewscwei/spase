import { from } from './from.js'
import { fromViewport } from './fromViewport.js'
import { make } from './make.js'
import { type Rect } from './types/Rect.js'

/**
 * Computes and returns the {@link Rect} of the given element relative to the
 * viewport. This is useful for determining the position of an element within
 * the visible area of the page, especially when the page is scrolled.
 *
 * @param element The element for which to compute the {@link Rect} relative to
 *                the viewport.
 *
 * @returns The {@link Rect} of the element relative to the viewport.
 */
export function inViewport(element: Element): Rect {
  const rect = from(element)
  const vrect = fromViewport()

  const { left: dx, top: dy } = vrect

  return make({
    height: rect.height,
    width: rect.width,
    x: rect.left - dx,
    y: rect.top - dy,
  })
}
