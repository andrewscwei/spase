import { type Point, type Descriptor as PointDescriptor } from '../point/index.js'
import { hitTest } from '../utils/hitTest.js'
import { type Rect } from './types/Rect.js'

/**
 * Checks if a {@link Rect} contains any part of another spatial object, i.e.
 * a {@link Point}, {@link PointDescriptor}, {@link Rect}(s), or
 * {@link Element}(s).
 *
 * @param rect The {@link Rect} to check against.
 * @param obj The target object.
 *
 * @returns `true` if test passes, `false` otherwise.
 */
export function contains(rect: Rect, obj: Element | Element[] | Point | PointDescriptor | Rect | Rect[]): boolean {
  return hitTest(obj, rect)
}
