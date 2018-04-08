/**
 * A class for defining structure and utilities for 2D vectors.
 */
export default class Point {
  /**
   * Checks if an object can be used to instantiate a new Point instance.
   *
   * @param {Array|Object} descriptor - Descriptor used to instantiate a new
   *                                    Point instance.
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
      if (typeof descriptor.x !== `number`) return false;
      if (typeof descriptor.y !== `number`) return false;
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * Creates a new Point instance.
   *
   * @param {Object|Array} [descriptor=[0,0]] - Either an array of exactly 2
   *                                            numbers or a valid object with
   *                                            `x` and `y` keys.
   */
  constructor(descriptor = [0, 0]) {
    if (!Point.isValid(descriptor)) throw new Error(`Invalid parameters passed to constructor`);

    if (descriptor instanceof Array) {
      Object.defineProperty(this, `x`, { value: descriptor[0], writable: false, enumerable: true });
      Object.defineProperty(this, `y`, { value: descriptor[1], writable: false, enumerable: true });
    }
    else {
      Object.defineProperty(this, `x`, { value: descriptor.x, writable: false, enumerable: true });
      Object.defineProperty(this, `y`, { value: descriptor.y, writable: false, enumerable: true });
    }
  }

  /**
   * Clones the current Point and returns a new Point.
   *
   * @return {Point} The cloned instance.
   */
  clone() {
    return new Point({
      x: this.x,
      y: this.y
    });
  }

  /**
   * Checks to see if the current Point is equivalent to another Point.
   *
   * @param {Point} point - Point instance to compare with.
   *
   * @return {boolean} `true` if equal, `false` otherwise.
   */
  equals(point) {
    if (this.x !== point.x) return false;
    if (this.y !== point.y) return false;
    return true;
  }

  /**
   * Returns a JSON object that represents the current Point.
   *
   * @return {Object} The resulting JSON object.
   */
  toJSON() {
    return Object.freeze({
      x: this.x,
      y: this.y
    });
  }

  /**
   * Returns an array that represents the current Point.
   *
   * @return {Array} The resulting array.
   */
  toArray() {
    return [this.x, this.y];
  }
}