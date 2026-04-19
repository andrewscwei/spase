import { isValidDescriptor } from './isValidDescriptor.js'
import { type Descriptor } from './types/Descriptor.js'
import { type Point } from './types/Point.js'

/**
 * Creates a new {@link Point}.
 *
 * @param descriptor Either an array of exactly 2 numbers or a valid object
 *                   with `x` and `y` keys.
 *
 * @returns The resulting {@link Point}.
 */
export function make(descriptor?: Descriptor): Point

/**
 * Creates a new {@link Point}.
 *
 * @param x `x` value.
 * @param y `y` value.
 *
 * @returns The resulting {@link Point}.
 */
export function make(x: number, y: number): Point

export function make(xOrDescriptor: Descriptor | number = 0, y: number = 0): Point {
  if (typeof xOrDescriptor === 'number') {
    const x = xOrDescriptor

    return { x, y }
  } else {
    if (!isValidDescriptor(xOrDescriptor)) throw Error('Invalid parameters passed to constructor')

    if (xOrDescriptor instanceof Array) {
      return {
        x: xOrDescriptor[0],
        y: xOrDescriptor[1],
      }
    } else {
      return {
        x: (xOrDescriptor as Record<string, number>).x,
        y: (xOrDescriptor as Record<string, number>).y,
      }
    }
  }
}
