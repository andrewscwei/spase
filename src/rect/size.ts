import { make as makeSize, type Size } from '../size/index.js'
import { type Rect } from './types/Rect.js'

/**
 * Gets the size of the current {@link Rect}.
 *
 * @param rect The {@link Rect} to get the size of.
 *
 * @returns Size of the current {@link Rect}.
 */
export function size(rect: Rect): Size {
  return makeSize({
    height: rect.height,
    width: rect.width,
  })
}
