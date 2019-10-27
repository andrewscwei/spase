# spase [![npm](https://img.shields.io/npm/v/spase.svg)](https://www.npmjs.com/package/spase) [![CircleCI](https://img.shields.io/circleci/build/github/andrewscwei/spase.svg)](https://circleci.com/gh/andrewscwei/spase)

Micro library for performing spatial calculations of DOM elements.

## Usage

```js
import * as spase from 'spase';
```

## API

### Class: `Point`

A class for defining structure and utilities for 2D vectors.

### Class: `Rect`

A class for defining a rectangle on a 2D plane.

#### `Rect.fromIntersect(...elements)`

Computes the intersecting rect of one or more elements. If only 1 element is specified, the intersection will be computed against the viewport.

- `@param elements: Element[]` — Element(s) to be used to compute the intersecting rect.
- `@return Rect | null` — The intersecting rect.

#### `Rect.from(target[, options])`

Gets the combined rect of one or more elements.

- `@param target: Rect | Window | Element | Element[]` — An element or array of elements to compute the combined rect.
- `@param options` — Additional options.
- `@param options.reference: Window | Element | undefined` — The element whose coordinate space the computed top, right, bottom and left values are relative to.
- `@return Rect | null` — The combined rect.

#### `Rect.fromViewport()`

Gets the rect of the viewport (current field of view). Think of this as the rect of the current window.

- `@return Rect` — The rect of the viewport.

### Class: `Size`

A class for defining structure and utilities for sizes.

### `hitTest(obj1, obj2)`

Hit-tests 2 objects. These objects can either be a single point, Rect instance(s) or Element instance(s).

- `@param obj1: Rect | Element | Element[] | Point | readonly [number number] | Readonly<{ x: number; y: number; }> | Rect[]` — First object.
- `@param obj2: Rect | Element | Element[] | Point | Rect[]` — Second object.
- `@return boolean` — `true` if test passes, `false` otherwise.

## Breaking Changes

### `v3.0.0`

- API changes: `getIntersectRect`, `getRect`, and `getViewportRect` are now static members of `Rect` class, as `Rect.fromIntersect`, `Rect.from`, and `Rect.fromViewport`, respectively.
