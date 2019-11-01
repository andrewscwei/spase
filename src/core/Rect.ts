import { typeIsWindow } from '../types';
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
    if (typeof descriptor.top !== 'number') return false;
    if (typeof descriptor.right !== 'number') return false;
    if (typeof descriptor.bottom !== 'number') return false;
    if (typeof descriptor.left !== 'number') return false;
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
      if (typeIsWindow(target)) return Rect.fromViewport(options);
      if (target instanceof Rect) return target;

      const e = target instanceof Array ? target : [target];
      const n = e.length;
      const ref = options.reference || window;
      const overflow = typeof options.overflow === 'boolean' ? options.overflow : false;
      const refRect = Rect.from(ref);
      const winRect = Rect.from(window);

      const rect: { [key: string]: number } = {};

      for (let i = 0; i < n; i++) {
        const element = e[i];
        const clientRect = element.getBoundingClientRect();

        const width = overflow ? element.scrollWidth : clientRect.width;
        const height = overflow ? element.scrollHeight : clientRect.height;
        let top = clientRect.top + winRect!.top;
        if (ref !== window) top -= refRect!.top;
        let left = clientRect.left + winRect!.left;
        if (ref !== window) left -= refRect!.left;
        const bottom = top + height;
        const right = left + width;

        rect.left = (rect.left === undefined) ? left : Math.min(rect.left, left);
        rect.right = (rect.right === undefined) ? right : Math.max(rect.right, right);
        rect.top = (rect.top === undefined) ? top : Math.min(rect.top, top);
        rect.bottom = (rect.bottom === undefined) ? bottom : Math.max(rect.bottom, bottom);
      }

      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;

      return new Rect({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
    }
    catch (err) {
      /* tslint:disable-next-line no-console */
      console.error(err);
      return null;
    }
  }

  /**
   * Gets the rect of the viewport (current field of view). Think of this as the
   * rect of the current window. By default the overflow size is omitted.
   *
   * @param options - @see RectOptions
   *
   * @return The rect of the viewport.
   */
  static fromViewport({ overflow = false }: RectOptions = {}): Rect {
    const width = overflow ? document.documentElement.scrollWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = overflow ? document.documentElement.scrollHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const left = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    const right = left + width;
    const bottom = top + height;
    return new Rect({ top, right, bottom, left, width, height });
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

    children.splice(0, children.length - childIndex - 1)

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
  static fromPointAndSize(point: Point | PointDescriptor, size: Size | SizeDescriptor): RectDescriptor {
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

      return new Rect({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height });
    }
    catch (err) {
      /* tslint:disable-next-line no-console */
      console.error(err);
      return null;
    }
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
