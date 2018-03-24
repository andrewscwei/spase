export default class Point {
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

  clone() {
    return new Point({
      x: this.x,
      y: this.y
    });
  }

  equals(point) {
    if (this.x !== point.x) return false;
    if (this.y !== point.y) return false;
    return true;
  }

  toJSON() {
    return Object.freeze({
      x: this.x,
      y: this.y
    });
  }

  toArray() {
    return [this.x, this.y];
  }
}