import { Point } from '../core/Point.js'
import { Rect } from '../core/Rect.js'

/**
 * A type that describes the current field-of-view of a DOM element relative to
 * the coordinate space of a reference object. The reference object is either
 * another DOM element or the browser window and is specified at the time of
 * computing the field-of-view.
 */
export type FOV = {
  /**
   * The dimensions on both x and y axes of the FOV that is visible within the
   * coordinate space of the reference object. If the FOV is not visible yet,
   * the values represent the distance until the FOV is scrolled into view.
   * These values will never exceed the visible width and height of the target
   * element.
   */
  position: Point

  /**
   * The ratio between `position` and the visible size of the target element,
   * i.e. if the FOV has a height of 10px and the target element has a visible
   * height of 100px, `step.y` will be `0.1`. Note that the values are not
   * clamped to 0 and 1 to indicate whether the target element is scrolled into
   * view.
   */
  step: Point

  /**
   * The {@link Rect} value of the field-of-view.
   */
  rect: Rect
}

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
 * Computes the field-of-view ({@link FOV}) of an element.
 *
 * @param element The target element.
 * @param options See {@link FOVOptions}.
 *
 * @returns The {@link FOV} if it is computable, `undefined` otherwise.
 */
export function fov(element?: Element | null, options: FOVOptions = {}): FOV | undefined {
  if (!element) return undefined

  const reference = options.reference ?? window
  const refRect = reference instanceof Window ? Rect.fromViewport() : Rect.from(reference)
  const rect = Rect.from(element, { reference })

  if (!refRect || !rect) return undefined

  const posX = refRect.right - rect.left
  const posY = refRect.bottom - rect.top
  const stepX = posX / rect.width
  const stepY = posY / rect.height
  const intersection = reference instanceof Window ? Rect.intersecting(element) : Rect.intersecting(element, reference)

  if (!intersection) return undefined

  return {
    position: Point.make([posX, posY]),
    step: Point.make([stepX, stepY]),
    rect: intersection,
  }
}
