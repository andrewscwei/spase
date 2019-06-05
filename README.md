# spase [![CircleCI](https://circleci.com/gh/andrewscwei/spase.svg?style=svg)](https://circleci.com/gh/andrewscwei/spase)

This library contains utility functions for performing spatial calculations of DOM elements.

## API

### Classes

#### `class Point`

A class for defining structure and utilities for 2D vectors.

---

#### `class Rect`

A class for defining a rectangle on a 2D plane.

---

#### `class Size`

A class for defining structure and utilities for sizes.

### Utility Functions

#### `function getIntersectRect(...elements)`

Computes the intersecting rect of one or more elements. If only 1 element is specified, the intersection will be computed against the viewport.

`@param elements: Element[]` — Element(s) to be used to compute the intersecting rect.

`@return Rect | null` — The intersecting rect.

---

#### `function getRect(target, options?)`

Gets the combined rect of one or more elements.

`@param target: Rect | Window | Element | Element[]` — An element or array of elements to compute the combined rect.

`@param options` — Additional options.

`@param options.reference: Window | Element | undefined` — The element whose coordinate space the computed top, right, bottom and left values are relative to.

`@return Rect | null` — The combined rect.

---

#### `function getViewportRect()`

Gets the rect of the viewport (current field of view). Think of this as the rect of the current window.

`@return Rect` — The rect of the viewport.

---

#### `function hitTestElement(obj1, obj2)`

Hit-tests 2 objects. These objects can either be a single point, Rect instance(s) or Element instance(s).

`@param obj1: Rect | Element | Element[] | Point | readonly [number number] | Readonly<{ x: number; y: number; }> | Rect[]` — First object.

`@param obj2: Rect | Element | Element[] | Point | Rect[]` — Second object.

`@return boolean` — `true` if test passes, `false` otherwise.
