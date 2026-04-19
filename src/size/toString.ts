import { type Size } from './types/Size.js'

/**
 * Returns the string representation of a {@link Size}
 *
 * @param size The {@link Size} to convert.
 *
 * @returns The resulting string.
 */
export function toString(size: Size): string {
  return `Size(width=${size.width}, height=${size.height})`
}
