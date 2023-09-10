import type { Point, Rect } from '../core'

/**
 * Array representation of a `Point` in the format of `[x, y]`.
 */
export type PointArrayDescriptor = Readonly<[number, number]>

/**
* JSON representation of a `Point`.
*/
export type PointJsonDescriptor = Readonly<{

  /**
  * The `x` value.
  */
  x: number

  /**
  * The `y` value.
  */
  y: number
}>

/**
 * A type that can be used to instantiate a `Point`.
 */
export type PointDescriptor = PointArrayDescriptor | PointJsonDescriptor

/**
 * Array representation of a `Size`.
 */
export type SizeArrayDescriptor = Readonly<[number, number]>

/**
* JSON representation of a `Size`.
*/
export type SizeJsonDescriptor = Readonly<{

  /**
  * The `width` value.
  */
  width: number

  /**
  * The `height` value.
  */
  height: number
}>

/**
 * A type that can be used to instantiate a `Size`.
 */
export type SizeDescriptor = SizeArrayDescriptor | SizeJsonDescriptor

/**
 * A type that can be used to instantiate a `Rect`.
 */
export type RectDescriptor = Readonly<{

  /**
   * The `x` value.
   */
  x: number

  /**
   * The `y` value.
   */
  y: number

  /**
   * The `width` value.
   */
  width: number

  /**
   * The `height` value.
   */
  height: number
}>

/**
 * JSON representation of a `Rect`.
 */
export type RectJsonDescriptor = Readonly<{

  /**
   * The top bound.
   */
  top: number

  /**
   * The right bound.
   */
  right: number

  /**
   * The bottom bound.
   */
  bottom: number

  /**
   * The left bound.
   */
  left: number

  /**
   * The `width` value.
   */
  width: number

  /**
   * The `height` value.
   */
  height: number
}>

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
   * The `Rect` value of the field-of-view.
   */
  rect: Rect
}

/**
 * Type guard for `Window`.
 *
 * @param val - Any value.
 *
 * @returns `true` if value is a `Window`, `false` otherwise.
 */
export function typeIsWindow(val: any): val is Window {
  return val === window
}
