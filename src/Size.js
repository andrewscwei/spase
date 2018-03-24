export default class Size {
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

  clone() {
    return new Size({
      width: this.width,
      height: this.height
    });
  }

  equals(size) {
    if (this.width !== size.width) return false;
    if (this.height !== size.height) return false;
    return true;
  }

  toJSON() {
    return Object.freeze({
      width: this.width,
      height: this.height
    });
  }

  toArray() {
    return [this.width, this.height];
  }
}