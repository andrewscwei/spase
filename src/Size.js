/**
 * A class for defining structure and utilities for sizes.
 */
export default class Size {
  /**
   * Checks if an object can be used to instantiate a new Size instance.
   *
   * @param {Array|Object} descriptor - Descriptor used to instantiate a new
   *                                    Size instance.
   *
   * @return {boolean} `true` if valid, `false` otherwise.
   */
  static isValid(descriptor) {
    if (descriptor instanceof Array) {
      if (descriptor.length !== 2) return false;
      if (typeof descriptor[0] !== `number`) return false;
      if (typeof descriptor[1] !== `number`) return false;
      return true;
    }
    else if (typeof descriptor === `object`) {
      if (typeof descriptor.width !== `number`) return false;
      if (typeof descriptor.height !== `number`) return false;
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Creates a new Size instance.
   *
   * @param {Object|Array} [descriptor=[0,0]] - Either an array of exactly 2
   *                                            numbers or a valid object with
   *                                            `x` and `y` keys.
   */
  constructor(descriptor = [0, 0]) {
    if (!Size.isValid(descriptor)) throw new Error(`Invalid parameters passed to constructor`);

    if (descriptor instanceof Array) {
      Object.defineProperty(this, `width`, { value: descriptor[0], writable: false, enumerable: true });
      Object.defineProperty(this, `height`, { value: descriptor[1], writable: false, enumerable: true });
    }
    else {
      Object.defineProperty(this, `width`, { value: descriptor.width, writable: false, enumerable: true });
      Object.defineProperty(this, `height`, { value: descriptor.height, writable: false, enumerable: true });
    }
  }

  /**
   * Clones the current Size and returns a new Size.
   *
   * @return {Size} The cloned instance.
   */
  clone() {
    return new Size({
      width: this.width,
      height: this.height
    });
  }

  /**
   * Checks to see if the current Size is equivalent to another Size.
   *
   * @param {Size} size - Size instance to compare with.
   *
   * @return {boolean} `true` if equal, `false` otherwise.
   */
  equals(size) {
    if (this.width !== size.width) return false;
    if (this.height !== size.height) return false;
    return true;
  }

  /**
   * Returns a JSON object that represents the current Size.
   *
   * @return {Object} The resulting JSON object.
   */
  toJSON() {
    return Object.freeze({
      width: this.width,
      height: this.height
    });
  }

  /**
   * Returns an array that represents the current Size.
   *
   * @return {Array} The resulting array.
   */
  toArray() {
    return [this.width, this.height];
  }
}