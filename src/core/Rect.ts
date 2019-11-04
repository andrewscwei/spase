import { typeIsWindow } from '../types';
import Point, { PointDescriptor } from './Point';
import Size, { SizeDescriptor } from './Size';

export type RectDescriptor = Readonly<{
  x: number;
  y: number;
  width: number;
  height: number;
}>;

export type RectJsonDescriptor = Readonly<{
  top: number;
  right: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}>;

export type RectOptions = Readonly<{
  /**
   * The element whose coordinate space the computed top, right, bottom and left
   * values are relative to.
   */
  reference?: Window | Element | null;

  /**
   * Specifies whether the overflow width/height should be accounted for.
   */
  overflow?: boolean;
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
    if (typeof descriptor.x !== 'number') return false;
    if (typeof descriptor.y !== 'number') return false;
    if (typeof descriptor.width !== 'number') return false;
    if (typeof descriptor.height !== 'number') return false;
    return true;
  }

  /**
   * Gets the combined rect of one or more elements.
   *
   * @param target - An element or array of elements to compute the combined rect.
   * @param options - @see RectOptions
   *
   * @return The combined rect.
   */
  static from(target?: Rect | Window | Element | Element[] | null, options: RectOptions = {}): Rect | null {
    try {
      if (target === undefined || target === null) return null;
      if (typeIsWindow(target)) return Rect.from(document.documentElement || document.body.parentNode || document.body, options);
      if (target instanceof Rect) return target;

      const e = target instanceof Array ? target : [target];
      const n = e.length;
      const ref = options.reference || window;
      const overflow = typeof options.overflow === 'boolean' ? options.overflow : false;
      const rect: { [key: string]: number } = {};

      for (let i = 0; i < n; i++) {
        const element = e[i];

        let width = NaN;
        let height = NaN;

        if (overflow) {
          width = element.scrollWidth;
          height = element.scrollHeight;
        }
        else {
          ({ width, height } = element.getBoundingClientRect());
        }

        const top = (element as HTMLElement).offsetTop - (ref === window ? 0 : (ref as HTMLElement).offsetTop);
        const left = (element as HTMLElement).offsetLeft - (ref === window ? 0 : (ref as HTMLElement).offsetLeft);
        const bottom = top + height;
        const right = left + width;

        rect.left = (rect.left === undefined) ? left : Math.min(rect.left, left);
        rect.right = (rect.right === undefined) ? right : Math.max(rect.right, right);
        rect.top = (rect.top === undefined) ? top : Math.min(rect.top, top);
        rect.bottom = (rect.bottom === undefined) ? bottom : Math.max(rect.bottom, bottom);
      }

      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;

      return new Rect({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
    }
    catch (err) {
      /* tslint:disable-next-line no-console */
      console.error(err);
      return null;
    }
  }

  /**
   * Gets the rect of the viewport (current field of view). Think of this as the
   * rect of the current window.
   *
   * @return The rect of the viewport.
   */
  static fromViewport(): Rect {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const x = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const y = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return new Rect({ x, y, width, height });
  }

  /**
   * Gets the rect of all the children of an element.
   *
   * @param parent - The parent element of the child.
   * @param options - @see RectOptions
   *
   * @return The rect of the child.
   */
  static fromChildrenOf(parent?: Element | Window | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null;

    if (typeIsWindow(parent)) {
      return Rect.from(Array.from(document.body.children));
    }
    else {
      return Rect.from(Array.from(parent.children), options);
    }
  }

  /**
   * Gets the rect of the children of an element up to the specified index.
   *
   * @param childIndex - The rect of the parent's children will be computed up to
   *                     this child index.
   * @param parent - The parent element of the children.
   * @param options - @see RectOptions
   *
   * @return The rect of the child.
   */
  static fromChildrenBefore(childIndex: number, parent?: Element | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null;

    const children = Array.from(parent.children);

    if (childIndex <= 0) return new Rect();
    if (childIndex >= children.length) return Rect.from(children, { reference: options.reference, overflow: false });

    children.splice(childIndex);

    return Rect.from(children, { reference: options.reference, overflow: false });
  }

  /**
   * Gets the rect of the children of an element after the specified index.
   *
   * @param childIndex - The rect of the parent's children will be computed after
   *                     this child index.
   * @param parent - The parent element of the children.
   * @param options - @see RectOptions
   *
   * @return The rect of the child.
   */
  static fromChildrenAfter(childIndex: number, parent?: Element | null, options: RectOptions= {}): Rect | null {
    if (!parent) return null;

    const children = Array.from(parent.children);

    if (childIndex < 0) return Rect.from(children, { reference: options.reference, overflow: false });
    if (childIndex >= (children.length - 1)) return new Rect();

    children.splice(0, children.length - childIndex - 1);

    return Rect.from(children, { reference: options.reference, overflow: false });
  }

  /**
   * Gets the rect of a child of an element at its index.
   *
   * @param childIndex - The child index.
   * @param parent - The parent element of the child.
   * @param options - @see RectOptions
   *
   * @return The rect of the child.
   */
  static fromChildAt(childIndex: number, parent?: Element | null, options: RectOptions = {}): Rect | null {
    if (!parent) return null;

    const child = parent.children[childIndex];
    return Rect.from(child, options);
  }

  /**
   * Creates a new Rect instance from a Point value and a Size value.
   *
   * @param point - Point instance to use.
   * @param size - Size instance to use.
   *
   * @return The created Rect instance.
   */
  static fromPointAndSize(point: Point | PointDescriptor, size: Size | SizeDescriptor): Rect {
    if (!(point instanceof Point)) point = new Point(point);
    if (!(size instanceof Size)) size = new Size(size);

    return new Rect({
      x: point.x,
      y: point.y,
      width: size.width,
      height: size.height,
    });
  }

  /**
   * Computes the intersecting rect of one or more elements. If only 1 element is
   * specified, the intersection will be computed against the viewport.
   *
   * @param elements - Element(s) to be used to compute the intersecting rect.
   *
   * @return The intersecting rect.
   */
  static intersecting(...elements: Element[]): Rect | null {
    try {
      const n = elements.length;

      const rect: { [key: string]: number} = {};
      let currRect: Rect | null = null;
      let nextRect: Rect | null = null;

      for (let i = 0; i < n; i++) {
        if (!currRect) currRect = Rect.from(elements[i]);

        if (i === 0 && ((i + 1) === n)) {
          nextRect = Rect.from(window);
        }
        else if ((i + 1) < n) {
          nextRect = Rect.from(elements[i + 1]);
        }
        else {
          break;
        }

        rect.width = Math.max(0.0, Math.min(currRect!.right, nextRect!.right) - Math.max(currRect!.left, nextRect!.left));
        rect.height = Math.max(0.0, Math.min(currRect!.bottom, nextRect!.bottom) - Math.max(currRect!.top, nextRect!.top));
        rect.top = Math.max(currRect!.top, nextRect!.top);
        rect.left = Math.max(currRect!.left, nextRect!.left);
        rect.bottom = rect.top + rect.height;
        rect.right = rect.left + rect.width;

        if (rect.width * rect.height === 0) {
          rect.width = 0;
          rect.height = 0;
          rect.top = 0;
          rect.left = 0;
          rect.bottom = 0;
          rect.right = 0;
        }

        currRect = new Rect(rect as RectDescriptor);
      }

      return new Rect({ x: rect.left, y: rect.top, width: rect.right - rect.left, height: rect.bottom - rect.top });
    }
    catch (err) {
      /* tslint:disable-next-line no-console */
      console.error(err);
      return null;
    }
  }

  readonly top: number;
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
   * Gets the right bound of the current Rect.
   *
   * @return Right bound of the current Rect.
   */
  get right(): number {
    return this.left + this.width;
  }

  /**
   * Gets the bottom bound of the current Rect.
   *
   * @return Bottom bound of the current Rect.
   */
  get bottom(): number {
    return this.top + this.height;
  }

  /**
   * Creates a new Rect instance.
   *
   * @param descriptor - Object used to describe the Rect to be instantiated.
   *                     Defaults to a Rect with all properties at zero value.
   */
  constructor(descriptor: RectDescriptor = { x: 0, y: 0, width: 0, height: 0 }) {
    if (!Rect.isValid(descriptor)) throw new Error('Invalid parameters passed to constructor');
    this.left = descriptor.x;
    this.top = descriptor.y;
    this.width = descriptor.width;
    this.height = descriptor.height;
  }

  /**
   * Clones the current Rect and returns a new Rect.
   *
   * @param newDescriptor - New Rect descriptor to replace the current one.
   *
   * @return The cloned Rect.
   */
  clone(newDescriptor: Partial<RectDescriptor> = {}): Rect {
    return new Rect({
      x: typeof newDescriptor.x === 'number' ? newDescriptor.x : this.left,
      y: typeof newDescriptor.y === 'number' ? newDescriptor.y : this.top,
      width: typeof newDescriptor.width === 'number' ? newDescriptor.width : this.width,
      height: typeof newDescriptor.height === 'number' ? newDescriptor.height : this.height,
    });
  }

  /**
   * Concatenates with another Rect.
   *
   * @param rect - The Rect to concatenate.
   *
   * @return The resulting Rect.
   */
  concat(rect: Rect): Rect {
    return new Rect({
      x: Math.min(this.left, rect.left),
      y: Math.min(this.top, rect.top),
      width: Math.max(this.right, rect.right) - Math.min(this.left, rect.left),
      height: Math.max(this.bottom, rect.bottom) - Math.min(this.top, rect.top),
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
    return true;
  }

  /**
   * Returns a JSON object that represents the current Rect.
   *
   * @return} The JSON object.
   */
  toJSON(): RectJsonDescriptor {
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
