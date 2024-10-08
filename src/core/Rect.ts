import { hitTest } from '../utils/index.js'
import { Point, type PointDescriptor } from './Point.js'
import { Size, type SizeDescriptor } from './Size.js'

/**
 * Type guard for `Window`.
 *
 * @param val Any value.
 *
 * @returns `true` if value is a `Window`, `false` otherwise.
 */
export function typeIsWindow(val: any): val is Window {
  return val === window
}

/**
  * A type that can be used to instantiate a {@link Rect}.
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
 * JSON representation of a {@link Rect}.
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
 * Options for instantiating a {@link Rect}.
 */
type RectOptions = Readonly<{

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
 * A type representing a rectangle on a 2D plane.
 */
export class Rect {
  /**
   * The top bound.
   */
  readonly top: number

  /**
   * The left bound.
   */
  readonly left: number

  /**
   * The `width` value.
   */
  readonly width: number

  /**
   * The `height` value.
   */
  readonly height: number

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param descriptor Object used to describe the {@link Rect} to be
   *                   instantiated. Defaults to a {@link Rect} with all
   *                   properties at zero value.
   */
  constructor(descriptor?: RectDescriptor)

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param point {@link Point}.
   * @param size {@link Size}.
   */
  constructor(point: Point, size: Size)

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param x `x` value.
   * @param y `y` value.
   * @param width Width.
   * @param height Height.
   */
  constructor(x: number, y: number, width: number, height: number)

  constructor(xOrPointOrDescriptor: number | Point | RectDescriptor = 0, yOrSize: number | Size = 0, width: number = 0, height: number = 0) {
    if (typeof xOrPointOrDescriptor === 'number' && typeof yOrSize === 'number') {
      const x = xOrPointOrDescriptor
      const y = yOrSize

      this.left = x
      this.top = y
      this.width = width
      this.height = height
    }
    else if (xOrPointOrDescriptor instanceof Point && yOrSize instanceof Size) {
      const point = xOrPointOrDescriptor
      const size = yOrSize

      this.left = point.x
      this.top = point.y
      this.width = size.width
      this.height = size.height
    }
    else {
      const descriptor = xOrPointOrDescriptor
      if (!Rect.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor')

      this.left = descriptor.x
      this.top = descriptor.y
      this.width = descriptor.width
      this.height = descriptor.height
    }
  }

  /**
   * Gets the center point of the current {@link Rect}.
   *
   * @returns The center point.
   */
  get center(): Point {
    return new Point({
      x: (this.right - this.left) / 2 + this.left,
      y: (this.bottom - this.top) / 2 + this.top,
    })
  }

  /**
   * Gets the size of the current {@link Rect}.
   *
   * @returns Size of the current {@link Rect}.
   */
  get size(): Size {
    return new Size({
      width: this.width,
      height: this.height,
    })
  }

  /**
   * Gets the right bound of the current {@link Rect}.
   *
   * @returns Right bound of the current {@link Rect}.
   */
  get right(): number {
    return this.left + this.width
  }

  /**
   * Gets the bottom bound of the current {@link Rect}.
   *
   * @returns Bottom bound of the current {@link Rect}.
   */
  get bottom(): number {
    return this.top + this.height
  }

  /**
   * Checks if an object can be used to instantiate a new {@link Rect} instance.
   *
   * @param descriptor Descriptor used to instantiate a new {@link Rect}
   *                   instance.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is RectDescriptor {
    if (typeof descriptor.x !== 'number') return false
    if (typeof descriptor.y !== 'number') return false
    if (typeof descriptor.width !== 'number') return false
    if (typeof descriptor.height !== 'number') return false

    return true
  }

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param descriptor Object used to describe the {@link Rect} to be
   *                   instantiated. Defaults to a {@link Rect} with all
   *                   properties at zero value.
   *
   * @returns The resulting {@link Rect} instance.
   */
  static make(descriptor?: RectDescriptor): Rect

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param point {@link Point}.
   * @param size {@link Size}.
   *
   * @returns The resulting {@link Rect} instance.
   */
  static make(point: Point, size: Size): Rect

  /**
   * Creates a new {@link Rect} instance.
   *
   * @param x `x` value.
   * @param y `y` value.
   * @param width Width.
   * @param height Height.
   *
   * @returns The resulting {@link Rect} instance.
   */
  static make(x: number, y: number, width: number, height: number): Rect

  static make(xOrPointOrDescriptor: number | Point | RectDescriptor = 0, yOrSize: number | Size = 0, width: number = 0, height: number = 0): Rect {
    return new Rect(xOrPointOrDescriptor as any, yOrSize as any, width, height)
  }

  /**
   * Gets the combined {@link Rect} of one or more elements.
   *
   * @param target An element or array of elements to compute the combined
   *               {@link Rect}.
   * @param options See {@link RectOptions}.
   *
   * @returns The combined {@link Rect}.
   */
  static from(target?: Rect | Window | Element | Element[] | null, options: RectOptions = {}): Rect | null {
    try {
      if (target === undefined || target === null) return null
      if (target instanceof Rect) return target
      if (typeIsWindow(target)) return Rect.from(document.documentElement || document.body.parentNode || document.body, options)

      const e = target instanceof Array ? target : [target]
      const n = e.length
      const reference = options.reference || window
      const winRect = Rect.fromViewport()
      const refRect = typeIsWindow(reference) ? winRect : Rect.from(options.reference)

      if (!winRect || !refRect) return null

      let combinedRect = null

      for (let i = 0; i < n; i++) {
        const element = e[i]
        const clientRect = element.getBoundingClientRect()
        const rect = new Rect({
          x: clientRect.left + winRect.left - (typeIsWindow(reference) ? 0 : refRect.left),
          y: clientRect.top + winRect.top - (typeIsWindow(reference) ? 0 : refRect.top),
          width: options.overflow ? element.scrollWidth : element instanceof HTMLElement ? element.offsetWidth : clientRect.width,
          height: options.overflow ? element.scrollHeight : element instanceof HTMLElement ? element.offsetHeight : clientRect.height,
        })

        combinedRect = combinedRect ? combinedRect.concat(rect) : rect
      }

      return combinedRect
    }
    catch (err) {
      console.error(err)

      return null
    }
  }

  /**
   * Gets the {@link Rect} of the viewport (current field of view). Think of
   * this as the {@link Rect} of the current window.
   *
   * @returns The {@link Rect} of the viewport.
   */
  static fromViewport(): Rect {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const x = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
    const y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

    return new Rect({ x, y, width, height })
  }

  /**
   * Gets the {@link Rect} of all the children of an element. This automatically
   * sets the reference to the parent element.
   *
   * @param parent The parent element of the child.
   * @param options See {@link RectOptions}.
   *
   * @returns The {@link Rect} of the child.
   */
  static fromChildrenOf(parent?: Element | Window | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null

    if (typeIsWindow(parent)) {
      return Rect.from(Array.from(document.body.children))
    }
    else {
      return Rect.from(Array.from(parent.children), {
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
   * @param options See {@link RectOptions}.
   *
   * @returns The {@link Rect} of the child.
   */
  static fromChildrenBefore(childIndex: number, parent?: Element | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null

    const children = Array.from(parent.children)

    if (childIndex <= 0) return new Rect()
    if (childIndex >= children.length) return Rect.from(children, { reference: options.reference, overflow: false })

    children.splice(childIndex)

    return Rect.from(children, { reference: options.reference || parent, overflow: false })
  }

  /**
   * Gets the {@link Rect} of the children of an element after the specified
   * index. This automatically sets the reference to the parent element.
   *
   * @param childIndex The {@link Rect} of the parent's children will be
   *                   computed after this child index.
   * @param parent The parent element of the children.
   * @param options See {@link RectOptions}.
   *
   * @returns The {@link Rect} of the child.
   */
  static fromChildrenAfter(childIndex: number, parent?: Element | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null

    const children = Array.from(parent.children)

    if (childIndex < 0) return Rect.from(children, { reference: options.reference, overflow: false })
    if (childIndex >= children.length - 1) return new Rect()

    children.splice(0, children.length - childIndex - 1)

    return Rect.from(children, { reference: options.reference || parent, overflow: false })
  }

  /**
   * Gets the {@link Rect} of a child of an element at its index. This
   * automatically sets the reference to the parent element.
   *
   * @param childIndex The child index.
   * @param parent The parent element of the child.
   * @param options See {@link RectOptions}.
   *
   * @returns The {@link Rect} of the child.
   */
  static fromChildAt(childIndex: number, parent?: Element | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null

    const child = parent.children[childIndex]

    return Rect.from(child, {
      overflow: options.overflow,
      reference: options.reference || parent,
    })
  }

  /**
   * Creates a new {@link Rect} instance from a Point value and a Size value.
   *
   * @param pointOrDescriptor Point instance to use.
   * @param sizeOrDescriptor Size instance to use.
   *
   * @returns The created {@link Rect} instance.
   */
  static fromPointAndSize(pointOrDescriptor: Point | PointDescriptor, sizeOrDescriptor: Size | SizeDescriptor): Rect {
    const point = pointOrDescriptor instanceof Point ? pointOrDescriptor : new Point(pointOrDescriptor)
    const size = sizeOrDescriptor instanceof Size ? sizeOrDescriptor : new Size(sizeOrDescriptor)

    return new Rect({
      x: point.x,
      y: point.y,
      width: size.width,
      height: size.height,
    })
  }

  /**
   * Computes the intersecting {@link Rect} of one or more elements. If only 1
   * element is specified, the intersection will be computed against the
   * viewport.
   *
   * @param elements Element(s) to be used to compute the intersecting
   *                 {@link Rect}.
   *
   * @returns The intersecting {@link Rect}.
   */
  static intersecting(...elements: Element[]): Rect | null {
    try {
      const n = elements.length

      const rect: Record<string, number> = {}
      let currRect: Rect | null = null
      let nextRect: Rect | null = null

      for (let i = 0; i < n; i++) {
        if (!currRect) currRect = Rect.from(elements[i])

        if (i === 0 && i + 1 === n) {
          nextRect = Rect.fromViewport()
        }
        else if (i + 1 < n) {
          nextRect = Rect.from(elements[i + 1])
        }
        else {
          break
        }

        if (!currRect || !nextRect) continue

        rect.width = Math.max(0.0, Math.min(currRect.right, nextRect.right) - Math.max(currRect.left, nextRect.left))
        rect.height = Math.max(0.0, Math.min(currRect.bottom, nextRect.bottom) - Math.max(currRect.top, nextRect.top))
        rect.y = Math.max(currRect.top, nextRect.top)
        rect.x = Math.max(currRect.left, nextRect.left)

        if (rect.width * rect.height === 0) {
          rect.width = 0
          rect.height = 0
          rect.y = NaN
          rect.x = NaN
        }

        currRect = new Rect(rect as RectDescriptor)
      }

      return new Rect(rect as RectDescriptor)
    }
    catch (err) {
      console.error(err)

      return null
    }
  }

  /**
   * Clones the current {@link Rect} and returns a new {@link Rect}.
   *
   * @param newDescriptor New {@link Rect} descriptor to replace the current
   *                      one.
   *
   * @returns The cloned {@link Rect}.
   */
  clone(newDescriptor: Partial<RectDescriptor> = {}): Rect {
    return new Rect({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : this.left,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : this.top,
      width: typeof newDescriptor.width === 'number' ? newDescriptor.width : this.width,
      height: typeof newDescriptor.height === 'number' ? newDescriptor.height : this.height,
    })
  }

  /**
   * Concatenates with another {@link Rect}.
   *
   * @param rect The {@link Rect} to concatenate.
   *
   * @returns The resulting {@link Rect}.
   */
  concat(rect: Rect): Rect {
    return new Rect({
      x: Math.min(this.left, rect.left),
      y: Math.min(this.top, rect.top),
      width: Math.max(this.right, rect.right) - Math.min(this.left, rect.left),
      height: Math.max(this.bottom, rect.bottom) - Math.min(this.top, rect.top),
    })
  }

  /**
   * Returns a new {@link Rect} with inverted width/height values.
   *
   * @returns The resulting {@link Rect}.
   */
  invert(): Rect {
    return new Rect({
      x: this.left,
      y: this.top,
      width: this.height,
      height: this.width,
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
  equals(rect: Rect): boolean {
    if (this.top !== rect.top) return false
    if (this.right !== rect.right) return false
    if (this.bottom !== rect.bottom) return false
    if (this.left !== rect.left) return false

    return true
  }

  /**
   * Checks if this rect contains any part of a {@link Point},
   * {@link PointDescriptor}, {@link Rect}(s), or {@link Element}(s).
   *
   * @param obj The target object.
   *
   * @returns `true` if test passes, `false` otherwise.
   */
  contains(obj: Point | PointDescriptor | Rect | Rect[] | Element | Element[]) {
    return hitTest(obj, this)
  }

  /**
   * Returns a JSON object that represents the current {@link Rect}.
   *
   * @returns The JSON object.
   */
  toJSON(): RectJsonDescriptor {
    return Object.freeze({
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width,
      height: this.height,
    })
  }
}
