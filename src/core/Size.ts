/**
 * Array representation of a {@link Size}.
 */
export type SizeArrayDescriptor = Readonly<[number, number]>

/**
 * JSON representation of a {@link Size}.
 */
export type SizeJsonDescriptor = Readonly<{

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
  * A type that can be used to instantiate a {@link Size}.
  */
export type SizeDescriptor = SizeArrayDescriptor | SizeJsonDescriptor

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
   * Creates a new {@link Size} instance.
   *
   * @param descriptor Either an array of exactly 2 numbers (i.e. `[width,
   *                   height]`) or a valid object with `width` and `height`
   *                   keys.
   */
  constructor(descriptor?: SizeDescriptor)

  /**
   * Creates a new {@link Size} instance.
   *
   * @param width Width.
   * @param height Height.
   */
  constructor(width: number, height: number)

  constructor(widthOrDescriptor: number | SizeDescriptor = 0, height: number = 0) {
    if (typeof widthOrDescriptor === 'number') {
      const width = widthOrDescriptor

      this.width = width
      this.height = height
    }
    else {
      if (!Size.isValid(widthOrDescriptor)) throw new Error('Invalid parameters passed to constructor')

      if (widthOrDescriptor instanceof Array) {
        this.width = widthOrDescriptor[0]
        this.height = widthOrDescriptor[1]
      }
      else {
        this.width = (widthOrDescriptor as Record<string, number>).width
        this.height = (widthOrDescriptor as Record<string, number>).height
      }
    }
  }

  /**
   * Checks if an object can be used to instantiate a new {@link Size} instance.
   *
   * @param descriptor Descriptor used to instantiate a new {@link Size}
   *                   instance.
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
   * Creates a new {@link Size} instance.
   *
   * @param descriptor Either an array of exactly 2 numbers (i.e. `[width,
   *                   height]`) or a valid object with `width` and `height`
   *                   keys.
   *
   * @returns The resulting {@link Size} instance.
   */
  static make(descriptor: SizeDescriptor): Size

  /**
   * Creates a new {@link Size} instance.
   *
   * @param width Width.
   * @param height Height.
   *
   * @returns The resulting {@link Size} instance.
   */
  static make(width: number, height: number): Size

  static make(widthOrDescriptor: number | SizeDescriptor = 0, height: number = 0): Size {
    if (typeof widthOrDescriptor === 'number') return new Size(widthOrDescriptor, height)

    return new Size(widthOrDescriptor)
  }

  /**
   * Clones the current {@link Size} and returns a new {@link Size}.
   *
   * @param newDescriptor New {@link Size} descriptor to replace the existing
   *                      one.
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
   * Adds a {@link Size} to the current Size.
   *
   * @param size The {@link Size} to add.
   *
   * @returns The resulting {@link Size}.
   */
  add(size: Size): Size {
    return new Size({
      width: this.width + size.width,
      height: this.height + size.height,
    })
  }

  /**
   * Subtracts a {@link Size} from the current {@link Size}.
   *
   * @param size The {@link Size} to subtract.
   *
   * @returns The resulting {@link Size}.
   */
  subtract(size: Size): Size {
    return new Size({
      width: this.width - size.width,
      height: this.height - size.height,
    })
  }

  /**
   * Multiplies a {@link Size} with current {@link Size}.
   *
   * @param size The {@link Size} to multiply.
   *
   * @returns The resulting {@link Size}.
   */
  multiply(size: Size): Size {
    return new Size({
      width: this.width * size.width,
      height: this.height * size.height,
    })
  }

  /**
   * Devices the current {@link Size} by another {@link Size}.
   *
   * @param size The {@link Size} divisor.
   *
   * @returns The resulting {@link Size}.
   */
  divideBy(size: Size): Size {
    return new Size({
      width: this.width / size.width,
      height: this.height / size.height,
    })
  }

  /**
   * Returns a new {@link Size} with inverted width/height values.
   *
   * @returns The resulting {@link Size}.
   */
  invert(): Size {
    return new Size({
      width: this.height,
      height: this.width,
    })
  }

  /**
   * Checks to see if the current {@link Size} is equivalent to another
   * {@link Size}.
   *
   * @param size {@link Size} instance to compare with.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  equals(size: Size): boolean {
    if (this.width !== size.width) return false
    if (this.height !== size.height) return false

    return true
  }

  /**
   * Returns a JSON object that represents the current {@link Size}.
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
   * Returns an array that represents the current {@link Size}.
   *
   * @returns The resulting array.
   */
  toArray(): SizeArrayDescriptor {
    return [this.width, this.height]
  }
}
