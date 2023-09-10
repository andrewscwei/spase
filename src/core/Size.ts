import type { SizeArrayDescriptor, SizeDescriptor, SizeJsonDescriptor } from '../types'

/**
 * A type representing a size on a 2D plane.
 */
export class Size {
  /**
   * The `width` value.
   */
  readonly width: number

  /**
   * The `height` value.
   */
  readonly height: number

  /**
   * Creates a new `Size` instance.
   *
   * @param descriptor Either an array of exactly 2 numbers (i.e. `[width,
   *                   height]`) or a valid object with `width` and `height`
   *                   keys.
   */
  constructor(descriptor: SizeDescriptor = [0, 0]) {
    if (!Size.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor')

    if (descriptor instanceof Array) {
      this.width = descriptor[0]
      this.height = descriptor[1]
    }
    else {
      this.width = (descriptor as Record<string, number>).width
      this.height = (descriptor as Record<string, number>).height
    }
  }

  /**
   * Checks if an object can be used to instantiate a new `Size` instance.
   *
   * @param descriptor Descriptor used to instantiate a new `Size` instance.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is SizeDescriptor {
    if (descriptor instanceof Array) {
      if (descriptor.length !== 2) return false
      if (typeof descriptor[0] !== 'number') return false
      if (typeof descriptor[1] !== 'number') return false

      return true
    }
    else if (typeof descriptor === 'object') {
      if (typeof descriptor.width !== 'number') return false
      if (typeof descriptor.height !== 'number') return false

      return true
    }
    else {
      return false
    }
  }

  /**
   * Clones the current `Size` and returns a new `Size`.
   *
   * @param newDescriptor New `Size` descriptor to replace the existing one.
   *
   * @returns The cloned instance.
   */
  clone(newDescriptor: Partial<SizeJsonDescriptor> = {}): Size {
    return new Size({
      width: typeof newDescriptor.width === 'number' ? newDescriptor.width : this.width,
      height: typeof newDescriptor.height === 'number' ? newDescriptor.height : this.height,
    })
  }

  /**
   * Adds a `Size` to the current Size.
   *
   * @param size The `Size` to add.
   *
   * @returns The resulting `Size`.
   */
  add(size: Size): Size {
    return new Size({
      width: this.width + size.width,
      height: this.height + size.height,
    })
  }

  /**
   * Subtracts a `Size` from the current `Size`.
   *
   * @param size The `Size` to subtract.
   *
   * @returns The resulting `Size`.
   */
  subtract(size: Size): Size {
    return new Size({
      width: this.width - size.width,
      height: this.height - size.height,
    })
  }

  /**
   * Multiplies a `Size` with current `Size`.
   *
   * @param size The `Size` to multiply.
   *
   * @returns The resulting `Size`.
   */
  multiply(size: Size): Size {
    return new Size({
      width: this.width * size.width,
      height: this.height * size.height,
    })
  }

  /**
   * Devices the current `Size` by another `Size`.
   *
   * @param size The `Size` divisor.
   *
   * @returns The resulting `Size`.
   */
  divideBy(size: Size): Size {
    return new Size({
      width: this.width / size.width,
      height: this.height / size.height,
    })
  }

  /**
   * Returns a new `Size` with inverted width/height values.
   *
   * @returns The resulting `Size`.
   */
  invert(): Size {
    return new Size({
      width: this.height,
      height: this.width,
    })
  }

  /**
   * Checks to see if the current `Size` is equivalent to another `Size`.
   *
   * @param size `Size` instance to compare with.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  equals(size: Size): boolean {
    if (this.width !== size.width) return false
    if (this.height !== size.height) return false

    return true
  }

  /**
   * Returns a JSON object that represents the current `Size`.
   *
   * @returns The resulting JSON object.
   */
  toJSON(): SizeJsonDescriptor {
    return Object.freeze({
      width: this.width,
      height: this.height,
    })
  }

  /**
   * Returns an array that represents the current `Size`.
   *
   * @returns The resulting array.
   */
  toArray(): SizeArrayDescriptor {
    return [this.width, this.height]
  }
}
