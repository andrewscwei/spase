import { is as isPoint, type Point } from '../point/index.js'
import { is as isSize, type Size } from '../size/index.js'
import { isValidDescriptor } from './isValidDescriptor.js'
import { type Descriptor } from './types/Descriptor.js'
import { type Rect } from './types/Rect.js'

/**
 * Creates a new {@link Rect}.
 *
 * @param descriptor Object used to describe the {@link Rect}.
 *
 * @returns The resulting {@link Rect}.
 */
export function make(descriptor?: Descriptor): Rect

/**
 * Creates a new {@link Rect}.
 *
 * @param point {@link Point}.
 * @param size {@link Size}.
 *
 * @returns The resulting {@link Rect}.
 */
export function make(point: Point, size: Size): Rect

/**
 * Creates a new {@link Rect}.
 *
 * @param x `x` value.
 * @param y `y` value.
 * @param width Width.
 * @param height Height.
 *
 * @returns The resulting {@link Rect}.
 */
export function make(x: number, y: number, width: number, height: number): Rect

export function make(xOrPointOrDescriptor: Descriptor | number | Point = 0, yOrSize: number | Size = 0, width: number = 0, height: number = 0): Rect {
  if (typeof xOrPointOrDescriptor === 'number' && typeof yOrSize === 'number') {
    const x = xOrPointOrDescriptor
    const y = yOrSize

    return {
      bottom: y + height,
      height,
      left: x,
      right: x + width,
      top: y,
      width,
    }
  } else if (isPoint(xOrPointOrDescriptor) && isSize(yOrSize)) {
    const p = xOrPointOrDescriptor
    const s = yOrSize

    return {
      bottom: p.y + s.height,
      height: s.height,
      left: p.x,
      right: p.x + s.width,
      top: p.y,
      width: s.width,
    }
  } else {
    const descriptor = xOrPointOrDescriptor
    if (!isValidDescriptor(descriptor)) throw Error('Invalid parameters passed to constructor')

    return {
      bottom: descriptor.y + descriptor.height,
      height: descriptor.height,
      left: descriptor.x,
      right: descriptor.x + descriptor.width,
      top: descriptor.y,
      width: descriptor.width,
    }
  }
}
