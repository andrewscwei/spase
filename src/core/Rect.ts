import { hitTest } from '../utils/hitTest.js'
import { Point } from './Point.js'
import { Size } from './Size.js'

/**
 * A type representing a rectangle on a 2D plane.
 */
export type Rect = {
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
}

export namespace Rect {
  /**
   * A type that can be used to create a {@link Rect}.
   */
  export type Descriptor = Readonly<{
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
   * JSON representation of a {@link Rect}.
   */
  export type JSONDescriptor = Readonly<Rect>

  /**
   * Options for creating a {@link Rect}.
   */
  export type Options = Readonly<{
    /**
     * The element whose coordinate space the computed `top`, `right`, `bottom`
     * and `left` values are relative to.
     */
    reference?: Window | Element | null

    /**
     * Specifies whether the overflow `width`/`height` should be accounted for.
     * Overflow means the `width` or `height` that extend beyond the CSS-specified
     * `width` or `height`.
     */
    overflow?: boolean
  }>

  /**
   * A {@link Rect} with `top`, `right`, `bottom` and `left` values of `0`.
   */
  export const zero: Rect = make()

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

  export function make(xOrPointOrDescriptor: number | Point | Descriptor = 0, yOrSize: number | Size = 0, width: number = 0, height: number = 0): Rect {
    if (typeof xOrPointOrDescriptor === 'number' && typeof yOrSize === 'number') {
      const x = xOrPointOrDescriptor
      const y = yOrSize

      return {
        top: y,
        right: x + width,
        bottom: y + height,
        left: x,
        width,
        height,
      }
    }
    else if (Point.isPoint(xOrPointOrDescriptor) && Size.isSize(yOrSize)) {
      const p = xOrPointOrDescriptor
      const s = yOrSize

      return {
        top: p.y,
        right: p.x + s.width,
        bottom: p.y + s.height,
        left: p.x,
        width: s.width,
        height: s.height,
      }
    }
    else {
      const descriptor = xOrPointOrDescriptor
      if (!isValidDescriptor(descriptor)) throw Error('Invalid parameters passed to constructor')

      return {
        top: descriptor.y,
        right: descriptor.x + descriptor.width,
        bottom: descriptor.y + descriptor.height,
        left: descriptor.x,
        width: descriptor.width,
        height: descriptor.height,
      }
    }
  }

  /**
   * Gets the center point of a {@link Rect}.
   *
   * @param rect The {@link Rect} to get the center point of.
   *
   * @returns The center point.
   */
  export function center(rect: Rect): Point {
    return Point.make({
      x: (rect.right - rect.left) / 2 + rect.left,
      y: (rect.bottom - rect.top) / 2 + rect.top,
    })
  }

  /**
   * Gets the size of the current {@link Rect}.
   *
   * @param rect The {@link Rect} to get the size of.
   *
   * @returns Size of the current {@link Rect}.
   */
  export function size(rect: Rect): Size {
    return Size.make({
      width: rect.width,
      height: rect.height,
    })
  }

  /**
   * Gets the combined {@link Rect} of one or more spatial objects.
   *
   * @param target An element or array of spatial objects to compute the
   *               combined {@link Rect}.
   * @param options See {@link Rect.Options}.
   *
   * @returns The combined {@link Rect} or {@link Rect.zero} if no valid result
   *          could be computed.
   */
  export function from(target?: Rect | Window | Element | Element[] | null, options: Options = {}): Rect {
    try {
      if (target === undefined || target === null) return zero
      if (isRect(target)) return target
      if (typeIsWindow(target)) return from(document.documentElement || document.body.parentNode || document.body, options)

      const e = target instanceof Array ? target : [target]
      const n = e.length
      const reference = options.reference || window
      const winRect = fromViewport()
      const refRect = typeIsWindow(reference) ? winRect : from(options.reference)

      if (!winRect || !refRect) return zero

      let combinedRect

      for (let i = 0; i < n; i++) {
        const element = e[i]
        const clientRect = element.getBoundingClientRect()
        const rect = make({
          x: clientRect.left + winRect.left - (typeIsWindow(reference) ? 0 : refRect.left),
          y: clientRect.top + winRect.top - (typeIsWindow(reference) ? 0 : refRect.top),
          width: options.overflow ? element.scrollWidth : element instanceof HTMLElement ? element.offsetWidth : clientRect.width,
          height: options.overflow ? element.scrollHeight : element instanceof HTMLElement ? element.offsetHeight : clientRect.height,
        })

        combinedRect = combinedRect ? concat(combinedRect, rect) : rect
      }

      return combinedRect ?? zero
    }
    catch (err) {
      console.error(err)

      return zero
    }
  }

  /**
   * Computes and returns the {@link Rect} of the viewport (a.k.a. the window).
   *
   * @returns The {@link Rect} of the viewport.
   */
  export function fromViewport(): Rect {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const x = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
    const y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

    return make({ x, y, width, height })
  }

  /**
   * Gets the {@link Rect} of all the children of an element. This automatically
   * sets the reference to the parent element.
   *
   * @param parent The parent element of the child.
   * @param options See {@link Rect.Options}.
   *
   * @returns The {@link Rect} of the children or {@link Rect.zero} if no valid
   *          result could be computed.
   */
  export function fromChildrenOf(parent?: Element | Window | null, options: Options = {}): Rect {
    if (!parent) return zero

    if (typeIsWindow(parent)) {
      return from(Array.from(document.body.children))
    }
    else {
      return from(Array.from(parent.children), {
        overflow: options.overflow,
        reference: options.reference || parent,
      })
    }
  }

  /**
   * Gets the {@link Rect} of the children of an element up to the specified
   * index. This automatically sets the reference to the parent element.
   *
   * @param childIndex The {@link Rect} of the parent's children will be
   *                   computed up to this child index.
   * @param parent The parent element of the children.
   * @param options See {@link Rect.Options}.
   *
   * @returns The {@link Rect} of the children or {@link Rect.zero} if no valid
   *          result could be computed.
   */
  export function fromChildrenBefore(childIndex: number, parent?: Element | null, options: Options = {}): Rect {
    if (!parent) return zero

    const children = Array.from(parent.children)

    if (childIndex <= 0) return make()
    if (childIndex >= children.length) return from(children, { reference: options.reference, overflow: false })

    children.splice(childIndex)

    return from(children, { reference: options.reference || parent, overflow: false })
  }

  /**
   * Gets the {@link Rect} of the children of an element after the specified
   * index. This automatically sets the reference to the parent element.
   *
   * @param childIndex The {@link Rect} of the parent's children will be
   *                   computed after this child index.
   * @param parent The parent element of the children.
   * @param options See {@link Rect.Options}.
   *
   * @returns The {@link Rect} of the children or {@link Rect.zero} if no valid
   *          result could be computed.
   */
  export function fromChildrenAfter(childIndex: number, parent?: Element | null, options: Options = {}): Rect {
    if (!parent) return zero

    const children = Array.from(parent.children)

    if (childIndex < 0) return from(children, { reference: options.reference, overflow: false })
    if (childIndex >= children.length - 1) return make()

    children.splice(0, children.length - childIndex - 1)

    return from(children, { reference: options.reference || parent, overflow: false })
  }

  /**
   * Gets the {@link Rect} of a child of an element at its index. This
   * automatically sets the reference to the parent element.
   *
   * @param childIndex The child index.
   * @param parent The parent element of the child.
   * @param options See {@link Rect.Options}.
   *
   * @returns The {@link Rect} of the child or {@link Rect.zero} if no valid
   *          result could be computed.
   */
  export function fromChildAt(childIndex: number, parent?: Element | null, options: Options = {}): Rect {
    if (!parent) return zero

    const child = parent.children[childIndex]

    return from(child, {
      overflow: options.overflow,
      reference: options.reference || parent,
    })
  }

  /**
   * Computes the intersecting {@link Rect} of a rect against one or more
   * elements. If only 1 element is specified, the intersection will be computed
   * against the viewport.
   *
   * @param elements Element(s) to be used to compute the intersecting
   *                 {@link Rect}.
   *
   * @returns The intersecting {@link Rect} or {@link Rect.zero} if no valid
   *          result could be computed.
   */
  export function intersecting(...elements: Element[]): Rect {
    try {
      const n = elements.length

      const descriptor: Record<string, number> = {}
      let currRect: Rect | undefined
      let nextRect: Rect | undefined

      for (let i = 0; i < n; i++) {
        if (!currRect) currRect = from(elements[i])

        if (i === 0 && i + 1 === n) {
          nextRect = fromViewport()
        }
        else if (i + 1 < n) {
          nextRect = from(elements[i + 1])
        }
        else {
          break
        }

        if (!currRect || !nextRect) continue

        descriptor.width = Math.max(0.0, Math.min(currRect.right, nextRect.right) - Math.max(currRect.left, nextRect.left))
        descriptor.height = Math.max(0.0, Math.min(currRect.bottom, nextRect.bottom) - Math.max(currRect.top, nextRect.top))
        descriptor.y = Math.max(currRect.top, nextRect.top)
        descriptor.x = Math.max(currRect.left, nextRect.left)

        if (descriptor.width * descriptor.height === 0) {
          descriptor.width = 0
          descriptor.height = 0
          descriptor.y = NaN
          descriptor.x = NaN
        }

        currRect = make(descriptor as Descriptor)
      }

      return make(descriptor as Descriptor)
    }
    catch (err) {
      console.error(err)

      return zero
    }
  }

  /**
   * Clones and returns a new {@link Rect}.
   *
   * @param rect Original {@link Rect} to clone.
   * @param newDescriptor Optional new {@link Rect} descriptor to apply to the
   *                      clone.
   *
   * @returns The cloned {@link Rect}.
   */
  export function clone(rect: Rect, newDescriptor: Partial<Descriptor> = {}): Rect {
    return make({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : rect.left,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : rect.top,
      width: typeof newDescriptor.width === 'number' ? newDescriptor.width : rect.width,
      height: typeof newDescriptor.height === 'number' ? newDescriptor.height : rect.height,
    })
  }

  /**
   * Concatenates one {@link Rect} with another.
   *
   * @param a The first {@link Rect}.
   * @param b The second {@link Rect} to concatenate.
   *
   * @returns The resulting {@link Rect}.
   */
  export function concat(a: Rect, b: Rect): Rect {
    return make({
      x: Math.min(a.left, b.left),
      y: Math.min(a.top, b.top),
      width: Math.max(a.right, b.right) - Math.min(a.left, b.left),
      height: Math.max(a.bottom, b.bottom) - Math.min(a.top, b.top),
    })
  }

  /**
   * Returns a new {@link Rect} after applying a 90˚ rotation, essentially
   * swapping the width/height values.
   *
   * @param rect The {@link Rect} to rotate.
   *
   * @returns The resulting {@link Rect}.
   */
  export function rotate(rect: Rect): Rect {
    return make({
      x: rect.left,
      y: rect.top,
      width: rect.height,
      height: rect.width,
    })
  }

  /**
   * Checks to see if the current {@link Rect} is equivalent to another
   * {@link Rect}.
   *
   * @param rect {@link Rect} instance to compare with.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  export function isEqual(a: Rect, b: Rect): boolean {
    if (a.top !== b.top) return false
    if (a.right !== b.right) return false
    if (a.bottom !== b.bottom) return false
    if (a.left !== b.left) return false
    if (a.width !== b.width) return false
    if (a.height !== b.height) return false

    return true
  }

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
  export function contains(rect: Rect, obj: Point | Point.Descriptor | Rect | Rect[] | Element | Element[]): boolean {
    return hitTest(obj, rect)
  }

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

  /**
   * Returns the JSON representation of a {@link Rect}.
   *
   * @param rect The {@link Rect} to convert.
   *
   * @returns The JSON object.
   */
  export function toJSON(rect: Rect): JSONDescriptor {
    return Object.freeze({
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    })
  }

  /**
   * Checks if an object can be used to create a new {@link Rect}.
   *
   * @param value Value to check.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  export function isValidDescriptor(value: any): value is Descriptor {
    if (typeof value.x !== 'number') return false
    if (typeof value.y !== 'number') return false
    if (typeof value.width !== 'number') return false
    if (typeof value.height !== 'number') return false

    return true
  }

  /**
   * Checks to see if a value is a {@link Rect}.
   *
   * @param value Value to check.
   *
   * @returns `true` if the value is a {@link Rect}, `false` otherwise.
   */
  export function isRect(value: any): value is Rect {
    return (
      typeof value === 'object' &&
      typeof value.top === 'number' &&
      typeof value.right === 'number' &&
      typeof value.bottom === 'number' &&
      typeof value.left === 'number' &&
      typeof value.width === 'number' &&
      typeof value.height === 'number'
    )
  }

  /**
   * Checks to see if a {@link Rect} only contains `0` values.
   *
   * @param rect The {@link Rect} to check.
   *
   * @returns `true` if the {@link Rect} only contains `0` values, `false`
   */
  export function isZero(rect: Rect): boolean {
    return (
      rect.top === 0 &&
      rect.right === 0 &&
      rect.bottom === 0 &&
      rect.left === 0 &&
      rect.width === 0 &&
      rect.height === 0
    )
  }
}

function typeIsWindow(val: any): val is Window {
  return val === window
}
