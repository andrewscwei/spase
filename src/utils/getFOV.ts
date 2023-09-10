import { Point, Rect } from '../core'
import type { FOV } from '../types'

/**
 * Options for computing an element's field-of-view.
 */
type FOVOptions = Readonly<{

  /**
   * The element whose coordinate space the computed field-of-view is relative
   * to.
   */
  reference?: Window | Element | null
}>

/**
 * Computes the field-of-view (`FOV`) of an element.
 *
 * @param element - The target element.
 * @param options - See {@link FOVOptions}.
 *
 * @returns The `FOV` if it is computable, `null` otherwise.
 */
export function getFOV(element?: Element | null, options: FOVOptions = {}): FOV | null {
  if (!element) return null

  const reference = options.reference ?? window
  const refRect = reference instanceof Window ? Rect.fromViewport() : Rect.from(reference)
  const rect = Rect.from(element, { reference })

  if (!refRect || !rect) return null

  const posX = refRect.right - rect.left
  const posY = refRect.bottom - rect.top
  const stepX = posX / rect.width
  const stepY = posY / rect.height
  const intersection = reference instanceof Window ? Rect.intersecting(element) : Rect.intersecting(element, reference)

  if (!intersection) return null

  return {
    position: new Point([posX, posY]),
    step: new Point([stepX, stepY]),
    rect: intersection,
  }
}
