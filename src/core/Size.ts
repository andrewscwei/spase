type SizeArrayDescriptor = Readonly<[number, number]>;
type SizeJsonDescriptor = Readonly<{ width: number, height: number }>;
export type SizeDescriptor = SizeArrayDescriptor | SizeJsonDescriptor;

/**
 * A class for defining structure and utilities for sizes.
 */
export default class Size {
  /**
   * Checks if an object can be used to instantiate a new Size instance.
   *
   * @param descriptor - Descriptor used to instantiate a new Size instance.
   *
   * @return `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is SizeDescriptor {
    if (descriptor instanceof Array) {
      if (descriptor.length !== 2) return false;
      if (typeof descriptor[0] !== 'number') return false;
      if (typeof descriptor[1] !== 'number') return false;
      return true;
    }
    else if (typeof descriptor === 'object') {
      if (typeof descriptor.width !== 'number') return false;
      if (typeof descriptor.height !== 'number') return false;
      return true;
    }
    else {
      return false;
    }
  }

  readonly width: number;
  readonly height: number;

  /**
   * Creates a new Size instance.
   *
   * @param descriptor - Either an array of exactly 2 numbers or a valid object
   *                     with `width` and `height` keys.
   */
  constructor(descriptor: SizeDescriptor = [0, 0]) {
    if (!Size.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor');

    if (descriptor instanceof Array) {
      this.width = descriptor[0];
      this.height = descriptor[1];
    }
    else {
      this.width = descriptor.width;
      this.height = descriptor.height;
    }
  }

  /**
   * Clones the current Size and returns a new Size.
   *
   * @return The cloned instance.
   */
  clone(): Size {
    return new Size({
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Checks to see if the current Size is equivalent to another Size.
   *
   * @param size - Size instance to compare with.
   *
   * @return `true` if equal, `false` otherwise.
   */
  equals(size: Size): boolean {
    if (this.width !== size.width) return false;
    if (this.height !== size.height) return false;
    return true;
  }

  /**
   * Returns a JSON object that represents the current Size.
   *
   * @return The resulting JSON object.
   */
  toJSON(): SizeJsonDescriptor {
    return Object.freeze({
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Returns an array that represents the current Size.
   *
   * @return The resulting array.
   */
  toArray(): SizeArrayDescriptor {
    return [this.width, this.height];
  }
}
