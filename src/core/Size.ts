/**
 * A type representing a size on a 2D plane.
 */
export type Size = {
  /**
   * The `width` value.
   */
  width: number

  /**
   * The `height` value.
   */
  height: number
}

/**
 * Array representation of a {@link Size} in the format of `[width, height]`.
 */
export type SizeArrayDescriptor = Readonly<[number, number]>

/**
 * JSON representation of a {@link Size}.
 */
export type SizeJsonDescriptor = Readonly<Size>

/**
 * A type that can be used to create a {@link Size}.
 */
export type SizeDescriptor = SizeArrayDescriptor | SizeJsonDescriptor

export namespace Size {
  /**
   * A {@link Size} with `width` and `height` values of `0`.
   */
  export const zero: Size = make()

  /**
   * Creates a new {@link Size}.
   *
   * @param descriptor Either an array of exactly 2 numbers (i.e. `[width,
   *                   height]`) or a valid object with `width` and `height`
   *                   keys.
   *
   * @returns The resulting {@link Size}.
   */
  export function make(descriptor?: SizeDescriptor): Size

  /**
   * Creates a new {@link Size}.
   *
   * @param width Width.
   * @param height Height.
   *
   * @returns The resulting {@link Size}.
   */
  export function make(width: number, height: number): Size

  export function make(widthOrDescriptor: number | SizeDescriptor = 0, height: number = 0): Size {
    if (typeof widthOrDescriptor === 'number') {
      const width = widthOrDescriptor

      return { width, height }
    }
    else {
      if (!isValidDescriptor(widthOrDescriptor)) throw Error('Invalid parameters passed to constructor')
      if (widthOrDescriptor instanceof Array) {
        return {
          width: widthOrDescriptor[0],
          height: widthOrDescriptor[1],
        }
      }
      else {
        return {
          width: (widthOrDescriptor as Record<string, number>).width,
          height: (widthOrDescriptor as Record<string, number>).height,
        }
      }
    }
  }

  /**
   * Clones and returns a new {@link Size}.
   *
   * @param size The {@link Size} to clone.
   * @param newDescriptor Optional new {@link Size} JSON descriptor to apply to
   *                      the clone.
   *
   * @returns The cloned {@link Size}.
   */
  export function clone(size: Size, newDescriptor: Partial<SizeJsonDescriptor> = {}): Size {
    return make({
      width: typeof newDescriptor.width === 'number' ? newDescriptor.width : size.width,
      height: typeof newDescriptor.height === 'number' ? newDescriptor.height : size.height,
    })
  }

  /**
   * Returns the resulting {@link Size} by adding one to another.
   *
   * @param a The first {@link Size}.
   * @param b The second {@link Size} to add.
   *
   * @returns The resulting {@link Size}.
   */
  export function add(a: Size, b: Size): Size {
    return make({
      width: a.width + b.width,
      height: a.height + b.height,
    })
  }

  /**
   * Returns the resulting {@link Size} by subtracting one from another.
   *
   * @param a The {@link Size} to subtract from.
   * @param b The {@link Size} to subtract.
   *
   * @returns The resulting {@link Size}.
   */
  export function subtract(a: Size, b: Size): Size {
    return make({
      width: a.width - b.width,
      height: a.height - b.height,
    })
  }

  /**
   * Returns the resulting {@link Size} by multiplying one by another.
   *
   * @param a The {@link Size} to multiply.
   * @param b The {@link Size} to multiply by.
   *
   * @returns The resulting {@link Size}.
   */
  export function multiply(a: Size, b: Size): Size {
    return make({
      width: a.width * b.width,
      height: a.height * b.height,
    })
  }

  /**
   * Returns the resulting {@link Size} by dividing one by another.
   *
   * @param a The dividend {@link Size}.
   * @param b The divisor {@link Size}.
   *
   * @returns The resulting {@link Size}.
   */
  export function divide(a: Size, b: Size): Size {
    return make({
      width: a.width / b.width,
      height: a.height / b.height,
    })
  }

  /**
   * Returns the resulting {@link Size} by inverting width/height values.
   *
   * @param size The {@link Size} to invert.
   *
   * @returns The resulting {@link Size}.
   */
  export function invert(size: Size): Size {
    return make({
      width: size.height,
      height: size.width,
    })
  }

  /**
   * Checks to see if a {@link Size} is equivalent to another.
   *
   * @param a The first {@link Size}.
   * @param b The second {@link Size} to compare.
   *
   * @returns `true` if equal, `false` otherwise.
   */
  export function isEqual(a: Size, b: Size): boolean {
    if (a.width !== b.width) return false
    if (a.height !== b.height) return false

    return true
  }

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

  /**
   * Returns the JSON representation of a {@link Size}.
   *
   * @param size The {@link Size} to convert.
   *
   * @returns The resulting JSON object.
   */
  export function toJSON(size: Size): SizeJsonDescriptor {
    return Object.freeze({
      width: size.width,
      height: size.height,
    })
  }

  /**
   * Returns the array representation of a {@link Size}.
   *
   * @param size The {@link Size} to convert.
   *
   * @returns The resulting array.
   */
  export function toArray(size: Size): SizeArrayDescriptor {
    return [size.width, size.height]
  }

  /**
   * Checks if a value is a valid {@link Size} descriptor.
   *
   * @param value Value to check.
   *
   * @returns `true` if valid, `false` otherwise.
   */
  export function isValidDescriptor(value: any): value is SizeDescriptor {
    if (value instanceof Array) {
      if (value.length !== 2) return false
      if (typeof value[0] !== 'number') return false
      if (typeof value[1] !== 'number') return false
      return true
    }
    else if (typeof value === 'object') {
      if (typeof value.width !== 'number') return false
      if (typeof value.height !== 'number') return false
      return true
    }
    else {
      return false
    }
  }

  /**
   * Checks to see if a value is a {@link Size}.
   *
   * @param value Value to check.
   *
   * @returns `true` if the value is a {@link Size}, `false` otherwise.
   */
  export function isSize(value: any): value is Size {
    return (
      typeof value === 'object' &&
      typeof value.width === 'number' &&
      typeof value.height === 'number'
    )
  }

  /**
   * Checks if a {@link Size} only contains `0` values.
   *
   * @param size The {@link Size} to check.
   *
   * @returns `true` if the {@link Size} is `0`, `false` otherwise.
   */
  export function isZero(size: Size): boolean {
    return size.width === 0 && size.height === 0
  }
}
