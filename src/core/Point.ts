import { type PointArrayDescriptor, type PointDescriptor, type PointJsonDescriptor } from '../types'

/**
 * A type representing a point on a 2D plane.
 */
export class Point {
  /**
   * The `x` value.
   */
  readonly x: number

  /**
   * The `y` value.
   */
  readonly y: number

  /**
   * Creates a new {@link Point} instance.
   *
   * @param descriptor Either an array of exactly 2 numbers or a valid object
   *                   with `x` and `y` keys.
   */
  constructor(descriptor: PointDescriptor = [0, 0]) {
    if (!Point.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor')

    if (descriptor instanceof Array) {
      this.x = descriptor[0]
      this.y = descriptor[1]
    }
    else {
      this.x = (descriptor as Record<string, number>).x
      this.y = (descriptor as Record<string, number>).y
    }
  }

  /**
   * Checks if an object can be used to instantiate a new {@link Point}
   * instance.
   *
   * @param descriptor Descriptor used to instantiate a new {@link Point}
   *                   instance.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is PointDescriptor {
    if (descriptor instanceof Array) {
      if (descriptor.length !== 2) return false
      if (typeof descriptor[0] !== 'number') return false
      if (typeof descriptor[1] !== 'number') return false

      return true
    }
    else if (typeof descriptor === 'object') {
      if (typeof descriptor.x !== 'number') return false
      if (typeof descriptor.y !== 'number') return false

      return true
    }
    else {
      return false
    }
  }

  /**
   * Clones the current {@link Point} and returns a new {@link Point}.
   *
   * @param newDescriptor New {@link Point} descriptor to replace the current
   *                      one.
   *
   * @returns The cloned instance.
   */
  clone(newDescriptor: Partial<PointJsonDescriptor> = {}): Point {
    return new Point({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : this.x,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : this.y,
    })
  }

  /**
   * Adds a {@link Point} to the current {@link Point}.
   *
   * @param point The {@link Point} to add.
   *
   * @returns The resulting {@link Point}.
   */
  add(point: Point): Point {
    return new Point({
      x: this.x + point.x,
      y: this.y + point.y,
    })
  }

  /**
   * Subtracts a {@link Point} from the current {@link Point}.
   *
   * @param point The {@link Point} to subtract.
   *
   * @returns The resulting {@link Point}.
   */
  subtract(point: Point): Point {
    return new Point({
      x: this.x - point.x,
      y: this.y - point.y,
    })
  }

  /**
   * Multiplies a {@link Point} with current {@link Point}.
   *
   * @param point The {@link Point} to multiply.
   *
   * @returns The resulting {@link Point}.
   */
  multiply(point: Point): Point {
    return new Point({
      x: this.x * point.x,
      y: this.y * point.y,
    })
  }

  /**
   * Devices the current {@link Point} by another {@link Point}.
   *
   * @param point The {@link Point} divisor.
   *
   * @returns The resulting {@link Point}.
   */
  divideBy(point: Point): Point {
    return new Point({
      x: this.x / point.x,
      y: this.y / point.y,
    })
  }

  /**
   * Returns a new {@link Point} with inverted x/y values.
   *
   * @returns The resulting {@link Point}.
   */
  invert(): Point {
    return new Point({
      x: this.y,
      y: this.x,
    })
  }

  /**
   * Checks to see if the current {@link Point} is equivalent to another
   * {@link Point}.
   *
   * @param point {@link Point} instance to compare with.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  equals(point: Point): boolean {
    if (this.x !== point.x) return false
    if (this.y !== point.y) return false

    return true
  }

  /**
   * Returns a JSON object that represents the current {@link Point}.
   *
   * @returns The resulting JSON object.
   */
  toJSON(): PointJsonDescriptor {
    return Object.freeze({
      x: this.x,
      y: this.y,
    })
  }

  /**
   * Returns an array that represents the current {@link Point}.
   *
   * @returns The resulting array.
   */
  toArray(): PointArrayDescriptor {
    return [this.x, this.y]
  }
}
