import { Point, Rect } from '..'

/**
 * Current position info of an element. This object provides information on how far the current
 * scroll position (in the coordinate space of the reference element) is away from the top of the
 * target element, how much of the target's maximum visible scrollable distance (relative to the
 * reference element) has been completed, and the current visible `Rect` (with respect to the
 * reference element).
 */
export type PositionInfo = {

  /**
   * The ratio of the current scroll position vs. the maximum visble scrollable distance of the
   * target element.
   */
  step: Point

  /**
   * The scroll position (in pixels) inside the reference element where `0` is when the top of the
   * target element is scrolled to view. Before that, this value is negative (indicating how many
   * pixels the current scroll position is away from seeing the top of the target element).
   */
  position: Point

  /**
   * The `Rect` that is visible with respect to the reference element (i.e. the window).
   */
  visible: Rect
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
 * /**
 * Computes the current position info of an element. The `PositionInfo` provides information on how
 * far the current scroll position (in the coordinate space of the reference element) is away from
 * the top of the target element, how much of the target's maximum visible scrollable distance
 * (relative to the reference element) has been completed, and the current visible `Rect` (with
 * respect to the reference element).
 *
 * @param element The target element.
 * @param options @see `PositionInfoOptions`
 *
 * @returns The `PositionInfo` if it is calculatable, `null` otherwise.
 */
export default function getPositionInfo(element?: Element | null, options: PositionInfoOptions = {}): PositionInfo | null {
  if (!element) return null

  const reference = options.reference ?? window
  const refRect = Rect.from(reference)
  const rect = Rect.from(element, { reference })

  if (!refRect || !rect) return null

  const dx = (refRect.right - rect.left)
  const dy = (refRect.bottom - rect.top)
  const stepX = dx / rect.width
  const stepY = dy / rect.height
  const intersection = (reference instanceof Window) ? Rect.intersecting(element) : Rect.intersecting(element, reference)

  if (!intersection) return null

  return {
    step: new Point([stepX, stepY]),
    position: new Point([dx, dy]),
    visible: intersection,
  }
}
