import Point from '../core/Point'
import Rect from '../core/Rect'
import { FOV } from '../types'

/**
 * Options for computing an element's field-of-view.
 */
type FOVOptions = Readonly<{

  /**
   * The element whose coordinate space the computed field-of-view is relative to.
   */
  reference?: Window | Element | null
}>

/**
 * Computes the field-of-view (`FOV`) of an element.
 *
 * @param element The target element.
 * @param options @see `FOVOptions`
 *
 * @returns The `FOV` if it is computable, `null` otherwise.
 */
export default function getFOV(element?: Element | null, options: FOVOptions = {}): FOV | null {
  if (!element) return null

  const reference = options.reference ?? window
  const refRect = (reference instanceof Window) ? Rect.fromViewport() : Rect.from(reference)
  const rect = Rect.from(element, { reference })

  if (!refRect || !rect) return null

  const dx = (refRect.right - rect.left)
  const dy = (refRect.bottom - rect.top)
  const stepX = dx / rect.width
  const stepY = dy / rect.height
  const intersection = (reference instanceof Window) ? Rect.intersecting(element) : Rect.intersecting(element, reference)

  if (!intersection) return null

  return {
    delta: new Point([dx, dy]),
    step: new Point([stepX, stepY]),
    rect: intersection,
  }
}
