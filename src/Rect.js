import Point from './Point';
import Size from './Size';

export default class Rect {
  static isValid(descriptor) {
    if (typeof descriptor.top !== `number`) return false;
    if (typeof descriptor.right !== `number`) return false;
    if (typeof descriptor.bottom !== `number`) return false;
    if (typeof descriptor.left !== `number`) return false;
    if (!Size.isValid(descriptor)) return false;
    return true;
  }

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

  get point() {
    return new Point({ x: this.left, y: this.top });
  }

  get size() {
    return new Size({ width: this.width, height: this.height });
  }

  constructor(descriptor = { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }) {
    if (!Rect.isValid(descriptor)) throw new Error(`Invalid parameters passed to constructor`);
    Object.defineProperty(this, `top`, { value: descriptor.top, writable: false, enumerable: true });
    Object.defineProperty(this, `right`, { value: descriptor.right, writable: false, enumerable: true });
    Object.defineProperty(this, `bottom`, { value: descriptor.bottom, writable: false, enumerable: true });
    Object.defineProperty(this, `left`, { value: descriptor.left, writable: false, enumerable: true });
    Object.defineProperty(this, `width`, { value: descriptor.width, writable: false, enumerable: true });
    Object.defineProperty(this, `height`, { value: descriptor.height, writable: false, enumerable: true });
  }

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

  equals(rect) {
    if (this.top !== rect.top) return false;
    if (this.right !== rect.right) return false;
    if (this.bottom !== rect.bottom) return false;
    if (this.left !== rect.left) return false;
    if (this.width !== rect.width) return false;
    if (this.height !== rect.height) return false;
    return true;
  }

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