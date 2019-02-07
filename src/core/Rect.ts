import Point, { PointDescriptor } from './Point';
import Size, { SizeDescriptor } from './Size';

export type RectDescriptor = Readonly<{
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}>;

/**
 * A class for defining a rectangle on a 2D plane.
 */
export default class Rect {
  /**
   * Checks if an object can be used to instantiate a new Rect instance.
   *
   * @param descriptor - Descriptor used to instantiate a new Rect instance.
   *
   * @return `true` if valid, `false` otherwise.
   */
  static isValid(descriptor: any): descriptor is RectDescriptor {
    if (typeof descriptor.top !== 'number') return false;
    if (typeof descriptor.right !== 'number') return false;
    if (typeof descriptor.bottom !== 'number') return false;
    if (typeof descriptor.left !== 'number') return false;
    if (typeof descriptor.width !== 'number') return false;
    if (typeof descriptor.height !== 'number') return false;
    return true;
  }

  /**
   * Creates a new Rect instance from a Point value and a Size value.
   *
   * @param point - Point instance to use.
   * @param size - Size instance to use.
   *
   * @return The created Rect instance.
   */
  static createFromPointAndSize(point: Point | PointDescriptor, size: Size | SizeDescriptor): RectDescriptor {
    if (!(point instanceof Point)) point = new Point(point);
    if (!(size instanceof Size)) size = new Size(size);

    return new Rect({
      top: point.y,
      right: point.x + size.width,
      bottom: point.y + size.height,
      left: point.x,
      width: size.width,
      height: size.height,
    });
  }

  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;

  /**
   * Gets the center point of the current Rect.
   *
   * @return The center point.
   */
  get center(): Point {
    return new Point({
      x: (this.right - this.left) / 2 + this.left,
      y: (this.bottom - this.top) / 2 + this.top,
    });
  }

  /**
   * Gets the size of the current Rect.
   *
   * @return Size of the current Rect.
   */
  get size(): Size {
    return new Size({
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Creates a new Rect instance.
   *
   * @param descriptor - Object used to describe the Rect to be instantiated.
   *                     Defaults to a Rect with all properties at zero value.
   */
  constructor(descriptor: RectDescriptor = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }) {
    if (!Rect.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor');
    this.top = descriptor.top;
    this.right = descriptor.right;
    this.bottom = descriptor.bottom;
    this.left = descriptor.left;
    this.width = descriptor.width;
    this.height = descriptor.height;
  }

  /**
   * Clones the current Rect and returns a new Rect.
   *
   * @return The cloned Rect.
   */
  clone(): Rect {
    return new Rect({
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width,
      height: this.height,
    });
  }

  /**
   * Checks to see if the current Rect is equivalent to another Rect.
   *
   * @param rect - Rect instance to compare with.
   *
   * @return `true` if equal, `false` otherwise.
   */
  equals(rect: Rect): boolean {
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
   * @return} The JSON object.
   */
  toJSON(): RectDescriptor {
    return Object.freeze({
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
      width: this.width,
      height: this.height,
    });
  }
}
