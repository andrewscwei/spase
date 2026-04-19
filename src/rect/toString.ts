import { type Rect } from './types/Rect.js'

/**
 * Returns the string representation of a {@link Rect}
 *
 * @param rect The {@link Rect} to convert.
 *
 * @returns The resulting string.
 */
export function toString(rect: Rect): string {
  return `Rect(top=${rect.top}, right=${rect.right}, bottom=${rect.bottom}, left=${rect.left}, width=${rect.width}, height=${rect.height})`
}
