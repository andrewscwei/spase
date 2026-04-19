import { make as makePoint, type Point } from '../point/index.js'
import { type Rect } from './types/Rect.js'

/**
 * Gets the center point of a {@link Rect}.
 *
 * @param rect The {@link Rect} to get the center point of.
 *
 * @returns The center point.
 */
export function center(rect: Rect): Point {
  return makePoint({
    x: (rect.right - rect.left) / 2 + rect.left,
    y: (rect.bottom - rect.top) / 2 + rect.top,
  })
}
