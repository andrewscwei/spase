/**
 * A type representing a point on a 2D plane.
 */
export type Point = {
  /**
   * The `x` value.
   */
  x: number

  /**
   * The `y` value.
   */
  y: number
}

export namespace Point {
  /**
   * Array representation of a {@link Point} in the format of `[x, y]`.
   */
  export type ArrayDescriptor = Readonly<[number, number]>

  /**
   * JSON representation of a {@link Point}.
   */
  export type JSONDescriptor = Readonly<Point>

  /**
   * A type that can be used to create a {@link Point}.
   */
  export type Descriptor = ArrayDescriptor | JSONDescriptor

  /**
   * A {@link Point} with `x` and `y` values of `0`.
   */
  export const zero: Point = make()

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

  /**
   * Clones and returns a new {@link Point}.
   *
   * @param point Original {@link Point} to clone.
   * @param newDescriptor Optional new {@link Point} JSON descriptor to apply to
   *                      the clone.
   *
   * @returns The cloned {@link Point}.
   */
  export function clone(point: Point, newDescriptor: Partial<JSONDescriptor> = {}): Point {
    return make({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : point.x,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : point.y,
    })
  }

  /**
   * Returns the resulting {@link Point} by adding one to another.
   *
   * @param a The first {@link Point}.
   * @param b The second {@link Point} to add.
   *
   * @returns The resulting {@link Point}.
   */
  export function add(a: Point, b: Point): Point {
    return make({
      x: a.x + b.x,
      y: a.y + b.y,
    })
  }

  /**
   * Returns the resulting {@link Point} by subtracting one from another.
   *
   * @param a The {@link Point} to subtract from.
   * @param b The {@link Point} to subtract.
   *
   * @returns The resulting {@link Point}.
   */
  export function subtract(a: Point, b: Point): Point {
    return make({
      x: a.x - b.x,
      y: a.y - b.y,
    })
  }

  /**
   * Returns the resulting {@link Point} by multiplying one by another.
   *
   * @param a The {@link Point} to multiply.
   * @param b The {@link Point} to multiply by.
   *
   * @returns The resulting {@link Point}.
   */
  export function multiply(a: Point, b: Point): Point {
    return make({
      x: a.x * b.x,
      y: a.y * b.y,
    })
  }

  /**
   * Returns the resulting {@link Point} by dividing one by another.
   *
   * @param a The dividend {@link Point}.
   * @param b The divisor {@link Point}.
   *
   * @returns The resulting {@link Point}.
   */
  export function divide(a: Point, b: Point): Point {
    return make({
      x: a.x / b.x,
      y: a.y / b.y,
    })
  }

  /**
   * Returns the resulting {@link Point} by reflecting x/y values.
   *
   * @param point The {@link Point} to reflect.
   *
   * @returns The resulting {@link Point}.
   */
  export function reflect(point: Point): Point {
    return make({
      x: point.y,
      y: point.x,
    })
  }

  /**
   * Checks to see if a {@link Point} is equivalent to another.
   *
   * @param a The first {@link Point}.
   * @param b The second {@link Point} to compare.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  export function isEqual(a: Point, b: Point): boolean {
    if (a.x !== b.x) return false
    if (a.y !== b.y) return false

    return true
  }

  /**
   * Returns the string representation of a {@link Point}
   *
   * @param point The {@link Point} to convert.
   *
   * @returns The resulting string.
   */
  export function toString(point: Point): string {
    return `Point(x=${point.x}, y=${point.y})`
  }

  /**
   * Returns the JSON representation of a {@link Point}.
   *
   * @param point The {@link Point} to convert.
   *
   * @returns The resulting JSON object.
   */
  export function toJSON(point: Point): JSONDescriptor {
    return Object.freeze({
      x: point.x,
      y: point.y,
    })
  }

  /**
   * Returns the array representation of a {@link Point}.
   *
   * @param point The {@link Point} to convert.
   *
   * @returns The resulting array.
   */
  export function toArray(point: Point): ArrayDescriptor {
    return [point.x, point.y]
  }

  /**
   * Checks if a value is a valid {@link Point} descriptor.
   *
   * @param value Value to check.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  export function isValidDescriptor(value: any): value is Descriptor {
    if (value instanceof Array) {
      if (value.length !== 2) return false
      if (typeof value[0] !== 'number') return false
      if (typeof value[1] !== 'number') return false

      return true
    } else if (typeof value === 'object') {
      if (typeof value.x !== 'number') return false
      if (typeof value.y !== 'number') return false

      return true
    } else {
      return false
    }
  }

  /**
   * Checks to see if a value is a {@link Point}.
   *
   * @param value Value to check.
   *
   * @returns `true` if the value is a {@link Point}, `false` otherwise.
   */
  export function isPoint(value: any): value is Point {
    return (
      typeof value === 'object' &&
      typeof value.x === 'number' &&
      typeof value.y === 'number'
    )
  }

  /**
   * Checks to see if a {@link Point} only contains `0` values.
   *
   * @param point The {@link Point} to check.
   *
   * @returns `true` if the {@link Point} is `0`, `false` otherwise.
   */
  export function isZero(point: Point): boolean {
    return point.x === 0 && point.y === 0
  }
}
