import { Point, Rect } from '..'

/**
 * Current position info of an element.
 */
export type PositionInfo = {

  /**
   * The scroll position (in pixels) inside the reference element's coordinate space relative to the
   * top of the target element, where `0` is when the target element is scrolled into view. Before
   * that, this value is negative (indicating how many pixels the current scroll position is away
   * from seeing the top of the target element).
   */
  position: Point

  /**
   * The ratio of `position` vs. the maximum visble scrollable distance (i.e. the visible height) of
   * the target element.
   */
  step: Point

  /**
   * The `Rect` that is visible with respect to the reference element (i.e. the window).
   */
  visibleRect: Rect
}

/**
 * Options for getting an element's position info.
 */
 export type PositionInfoOptions = Readonly<{

  /**
   * The element whose coordinate space the computed position info  values are relative to.
   */
  reference?: Window | Element | null
}>

/**
 * Computes the current position info of an element. The `PositionInfo` describes the current scroll
 * position of the target element with respect to the reference element (defaults to the window if
 * unspecified).
 *
 * @param element The target element.
 * @param options @see `PositionInfoOptions`
 *
 * @returns The `PositionInfo` if it is calculatable, `null` otherwise.
 */
export default function getPositionInfo(element?: Element | null, options: PositionInfoOptions = {}): PositionInfo | null {
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
    position: new Point([dx, dy]),
    step: new Point([stepX, stepY]),
    visibleRect: intersection,
  }
}
