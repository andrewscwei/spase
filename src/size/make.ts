import { isValidDescriptor } from './isValidDescriptor.js'
import { type Descriptor } from './types/Descriptor.js'
import { type Size } from './types/Size.js'

/**
 * Creates a new {@link Size}.
 *
 * @param descriptor Either an array of exactly 2 numbers (i.e. `[width,
 *                   height]`) or a valid object with `width` and `height` keys.
 *
 * @returns The resulting {@link Size}.
 */
export function make(descriptor?: Descriptor): Size

/**
 * Creates a new {@link Size}.
 *
 * @param width Width.
 * @param height Height.
 *
 * @returns The resulting {@link Size}.
 */
export function make(width: number, height: number): Size

export function make(widthOrDescriptor: Descriptor | number = 0, height: number = 0): Size {
  if (typeof widthOrDescriptor === 'number') {
    const width = widthOrDescriptor

    return { height, width }
  } else {
    if (!isValidDescriptor(widthOrDescriptor)) throw Error('Invalid parameters passed to constructor')
    if (widthOrDescriptor instanceof Array) {
      return {
        height: widthOrDescriptor[1],
        width: widthOrDescriptor[0],
      }
    } else {
      return {
        height: (widthOrDescriptor as Record<string, number>).height,
        width: (widthOrDescriptor as Record<string, number>).width,
      }
    }
  }
}
