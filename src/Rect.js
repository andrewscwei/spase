import Point from './Point';
import Size from './Size';

/**
 * A class for defining a rectangle on a 2D plane.
 */
export default class Rect {
  /**
   * Checks if an object can be used to instantiate a new Rect instance.
   *
   * @param {Object} descriptor - Descriptor used to instantiate a new Rect
   *                              instance.
   *
   * @return {boolean} `true` if valid, `false` otherwise.
   */
  static isValid(descriptor) {
    if (typeof descriptor.top !== `number`) return false;
    if (typeof descriptor.right !== `number`) return false;
    if (typeof descriptor.bottom !== `number`) return false;
    if (typeof descriptor.left !== `number`) return false;
    if (!Size.isValid(descriptor)) return false;
    return true;
  }

  /**
   * Creates a new Rect instance from a Point value and a Size value.
   *
   * @param {Point} point - Point instance to use.
   * @param {Size} size - Size instance to use.
   *
   * @return {Rect} The created Rect instance.
   */
  static createFromPointAndSize(point, size) {
    if (!(point instanceof Point)) point = new Point(point);
    if (!(size instanceof Size)) size = new Size(size);

    return new Rect({
      top: point.y,
      right: point.x + size.width,
      bottom: point.y + size.height,
      left: point.x,
      width: size.width,
      height: size.height
    });
  }

  /**
   * Gets the center point of the current Rect.
   *
   * @return {Point} The center point.
   */
  get center() {
    return new Point({ x: (this.right - this.left) / 2 + this.left, y: (this.bottom - this.top) / 2 + this.top });
  }

  /**
   * Gets the size of the current Rect.
   *
   * @return {Size} Size of the current Rect.
   */
  get size() {
    return new Size({ width: this.width, height: this.height });
  }

  /**
   * Creates a new Rect instance.
   *
   * @param {Object} [descriptor] - Object used to describe the Rect to be
   *                                instantiated. Defaults to a Rect with all
   *                                properties at zero value.
   */
  constructor(descriptor = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }) {
    if (!Rect.isValid(descriptor)) throw new Error(`Invalid parameters passed to constructor`);
    Object.defineProperty(this, `top`, { value: descriptor.top, writable: false, enumerable: true });
    Object.defineProperty(this, `right`, { value: descriptor.right, writable: false, enumerable: true });
    Object.defineProperty(this, `bottom`, { value: descriptor.bottom, writable: false, enumerable: true });
    Object.defineProperty(this, `left`, { value: descriptor.left, writable: false, enumerable: true });
    Object.defineProperty(this, `width`, { value: descriptor.width, writable: false, enumerable: true });
    Object.defineProperty(this, `height`, { value: descriptor.height, writable: false, enumerable: true });
  }

  /**
   * Clones the current Rect and returns a new Rect.
   *
   * @return {Rect} The cloned Rect.
   */
  clone() {
    return new Rect({
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width,
      height: this.height
    });
  }

  /**
   * Checks to see if the current Rect is equivalent to another Rect.
   *
   * @param {Rect} rect - Rect instance to compare with.
   *
   * @return {boolean} `true` if equal, `false` otherwise.
   */
  equals(rect) {
    if (this.top !== rect.top) return false;
    if (this.right !== rect.right) return false;
    if (this.bottom !== rect.bottom) return false;
    if (this.left !== rect.left) return false;
    if (this.width !== rect.width) return false;
    if (this.height !== rect.height) return false;
    return true;
  }

  /**
   * Returns a JSON object that represents the current Rect.
   *
   * @return {Object} The JSON object.
   */
  toJSON() {
    return Object.freeze({
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width,
      height: this.height
    });
  }
}
