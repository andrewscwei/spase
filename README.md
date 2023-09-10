# spase [![npm](https://img.shields.io/npm/v/spase.svg)](https://www.npmjs.com/package/spase) [![CI](https://github.com/andrewscwei/spase/workflows/CI/badge.svg)](https://github.com/andrewscwei/spase/actions?query=workflow%3ACI) [![CD](https://github.com/andrewscwei/spase/workflows/CD/badge.svg)](https://github.com/andrewscwei/spase/actions?query=workflow%3ACD)

Micro library for performing 2D spatial calculations of DOM elements.

## Usage

```js
import { getFOV, hitTest, Point, Rect, Size } from 'spase';
```

## API

### Class: `Point`

A type representing a point on a 2D plane.

### Class: `Size`

A type that represents a size on a 2D plane.

### Class: `Rect`

A type representing a rectangle on a 2D plane.

#### `Rect.intersecting(...elements)`

Computes the intersecting `Rect` of one or more elements. If only 1 element is specified, the intersection will be computed against the viewport.

- `@param elements: Element[]` — Element(s) to be used to compute the intersecting `Rect`.
- `@returns Rect | null` — The intersecting `Rect`.

#### `Rect.from(target[, options])`

Gets the combined `Rect` of one or more elements.

- `@param target: Rect | Window | Element | Element[]` — An element or array of elements to compute the combined `Rect`.
- `@param options` — Additional options.
- `@param options.reference: Window | Element | undefined` — The element whose coordinate space the computed top, right, bottom and left values are relative to.
- `@param options.overflow: boolean` Specifies whether the overflow width/height should be accounted for.
- `@returns Rect | null` — The combined `Rect`.

#### `Rect.fromViewport()`

Gets the `Rect` of the viewport (current field of view). Think of this as the `Rect` of the current window.

- `@returns Rect` — The `Rect` of the viewport.

### `getFOV(element[, options])`

Computes the field-of-view (`FOV`) of an element.

- `@param element: Element | null` The target element.
- `@param options` Additional options.
- `@param options.reference: Window | Element | undefined` — The element whose coordinate space the computed field-of-view is relative to.
- `@returns FOV | null` - The `FOV` if it is computable, `null` otherwise.

### `hitTest(obj1, obj2)`

Hit-tests 2 objects. These objects can either be `Point`'s, `Rect`'s or `Element`'s.

- `@param obj1: Rect | Element | Element[] | Point | readonly [number number] | Readonly<{ x: number; y: number; }> | Rect[]` — First object.
- `@param obj2: Rect | Element | Element[] | Point | Rect[]` — Second object.
- `@returns boolean` — `true` if test passes, `false` otherwise.

## Caveats

Note that this library is intended to be used for 2D DOM elements only. If an element has `transform` styles applied to it, the `top`, `right`, `bottom` and `left` properties will be obscured. This is because the underlying method of calculating these values depends on the native `getBoundingClientRect` function.

## Breaking Changes

### `v4.0.0`

- Widths and heights now use `offsetWidth` and `offsetHeight` when applicable.

### `v3.0.0`

- API changes: `getIntersectRect`, `getRect`, and `getViewportRect` are now static members of `Rect` class, as `Rect.intersecting`, `Rect.from`, and `Rect.fromViewport`, respectively.
