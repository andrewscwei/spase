# spase [![npm](https://img.shields.io/npm/v/spase.svg)](https://www.npmjs.com/package/spase) [![CI](https://github.com/andrewscwei/spase/workflows/CI/badge.svg)](https://github.com/andrewscwei/spase/actions?query=workflow%3ACI) [![CD](https://github.com/andrewscwei/spase/workflows/CD/badge.svg)](https://github.com/andrewscwei/spase/actions?query=workflow%3ACD)

Micro library for performing 2D spatial calculations of DOM elements.

## Usage

```js
import { hitTest, Point, Rect, Size } from 'spase';
```

## API

### `Point`

A type representing a point on a 2D plane.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `zero` | `Point` | A `Point` with `x` and `y` values of `0`. |

#### Methods

| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `make` | `descriptor: PointDescriptor` | `Point` | Creates a new `Point`. |
| `make` | `x: number`<br>`y: number` | `Point` | Creates a new `Point`. |
| `clone` | `point: Point`<br>`newDescriptor: Partial<PointJsonDescriptor>` | `Point` | Clones and returns a new `Point`. |
| `add` | `a: Point`<br>`b: Point` | `Point` | Returns the resulting `Point` by adding one to another. |
| `subtract` | `a: Point`<br>`b: Point` | `Point` | Returns the resulting `Point` by subtracting one from another. |
| `multiply` | `a: Point`<br>`b: Point` | `Point` | Returns the resulting `Point` by multiplying one by another. |
| `divide` | `a: Point`<br>`b: Point` | `Point` | Returns the resulting `Point` by dividing one by another. |
| `reflect` | `point: Point` | `Point` | Returns the resulting `Point` by reflecting x/y values. |
| `isEqual` | `a: Point`<br>`b: Point` | `boolean` | Checks to see if a `Point` is equivalent to another. |
| `toString` | `point: Point` | `string` | Returns the string representation of a `Point` |
| `toJSON` | `point: Point` | `PointJsonDescriptor` | Returns the JSON representation of a `Point`. |
| `toArray` | `point: Point` | `PointArrayDescriptor` | Returns the array representation of a `Point`. |
| `isValidDescriptor` | `value: any` | `boolean` | Checks if a value is a valid `Point` descriptor. |
| `isPoint` | `value: any` | `boolean` | Checks to see if a value is a `Point`. |
| `isZero` | `point: Point` | `boolean` | Checks to see if a `Point` only contains `0` values. |

### `Size`

A type that represents a size on a 2D plane.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `zero` | `Size` | A `Size` with `width` and `height` values of `0`. |

#### Methods

| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `make` | `descriptor: SizeDescriptor` | `Size` | Creates a new `Size`. |
| `make` | `width: number`<br>`height: number` | `Size` | Creates a new `Size`. |
| `clone` | `size: Size`<br>`newDescriptor: Partial<SizeJsonDescriptor>` | `Size` | Clones and returns a new `Size`. |
| `add` | `a: Size`<br>`b: Size` | `Size` | Returns the resulting `Size` by adding one to another. |
| `subtract` | `a: Size`<br>`b: Size` | `Size` | Returns the resulting `Size` by subtracting one from another. |
| `multiply` | `a: Size`<br>`b: Size` | `Size` | Returns the resulting `Size` by multiplying one by another. |
| `divide` | `a: Size`<br>`b: Size` | `Size` | Returns the resulting `Size` by dividing one by another. |
| `rotate` | `size: Size` | `Size` | Returns the resulting `Size` after applying a 90˚ rotation, essentially swapping the width/height values. |
| `isEqual` | `a: Size`<br>`b: Size` | `boolean` | Checks to see if a `Size` is equivalent to another. |
| `toString` | `size: Size` | `string` | Returns the string representation of a `Size` |
| `toJSON` | `size: Size` | `SizeJsonDescriptor` | Returns the JSON representation of a `Size`. |
| `toArray` | `size: Size` | `SizeArrayDescriptor` | Returns the array representation of a `Size`. |
| `isValidDescriptor` | `value: any` | `boolean` | Checks if a value is a valid `Size` descriptor. |
| `isSize` | `value: any` | `boolean` | Checks to see if a value is a `Size`. |
| `isZero` | `size: Size` | `boolean` | Checks if a `Size` only contains `0` values. |

### `Rect`

A type representing a rectangle on a 2D plane.

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `zero` | `Rect` | A `Rect` with `top`, `right`, `bottom` and `left` values of `0`. |

#### Methods

| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `make` | `descriptor: Rect.Descriptor` | `Rect` | Creates a new `Rect`. |
| `make` | `point: Point`<br>`size: Size` | `Rect` | Creates a new `Rect`. |
| `make` | `x: number`<br>`y: number`<br>`width: number`<br>`height: number` | `Rect` | Creates a new `Rect`. |
| `center` | `rect: Rect` | `Point` | Gets the center point of a `Rect`. |
| `size` | `rect: Rect` | `Size` | Gets the size of the current `Rect`. |
| `from` | `target: Rect \| Window \| Element \| Element[]`<br>`options: Rect.Options` | `Rect` | Gets the combined `Rect` of one or more spatial objects. |
| `fromViewport` | | `Rect` | Computes and returns the `Rect` of the viewport (a.k.a. the window). |
| `fromChildrenOf` | `parent: Element \| Window`<br>`options: Rect.Options` | `Rect` | Gets the `Rect` of all the children of an element. This automatically sets the reference to the parent element. |
| `fromChildrenBefore` | `childIndex: number`<br>`parent: Element`<br>`options: Rect.Options` | `Rect` | Gets the `Rect` of the children of an element up to the specified index. This automatically sets the reference to the parent element. |
| `fromChildrenAfter` | `childIndex: number`<br>`parent: Element`<br>`options: Rect.Options` | `Rect` | Gets the `Rect` of the children of an element after the specified index. This automatically sets the reference to the parent element. |
| `fromChildAt` | `childIndex: number`<br>`parent: Element`<br>`options: Rect.Options` | `Rect` | Gets the `Rect` of a child of an element at its index. This automatically sets the reference to the parent element. |
| `intersecting` | `...elements: Element[]` | `Rect` | Computes the intersecting `Rect` of a rect against one or more elements. If only 1 element is specified, the intersection will be computed against the viewport. |
| `clone` | `rect: Rect`<br>`newDescriptor: Partial<Rect.Descriptor>` | `Rect` | Clones and returns a new `Rect`. |
| `concat` | `a: Rect`<br>`b: Rect` | `Rect` | Concatenates one `Rect` with another. |
| `rotate` | `rect: Rect` | `Rect` | Returns a new `Rect` after applying a 90˚ rotation, essentially swapping the width/height values. |
| `isEqual` | `a: Rect`<br>`b: Rect` | `boolean` | Checks to see if the current `Rect` is equivalent to another `Rect`. |
| `contains` | `rect: Rect`<br>`obj: Point \| PointDescriptor \| Rect \| Rect[] \| Element \| Element[]` | `boolean` | Checks if a `Rect` contains any part of another spatial object, i.e. a `Point`, `PointDescriptor`, `Rect`(s), or `Element`(s). |
| `toString` | `rect: Rect` | `string` | Returns the string representation of a `Rect` |
| `toJSON` | `rect: Rect` | `Rect.JSONDescriptor` | Returns the JSON representation of a `Rect`. |
| `isValidDescriptor` | `value: any` | `boolean` | Checks if an object can be used to create a new `Rect`. |
| `isRect` | `value: any` | `boolean` | Checks to see if a value is a `Rect`. |
| `isZero` | `rect: Rect` | `boolean` | Checks to see if a `Rect` only contains `0` values. |

### Utilities

| Method | Params | Returns | Description |
|--------|--------|---------|-------------|
| `hitTest` | `a: Point \| PointDescriptor \| Rect \| Rect[] \| Element \| Element[]`<br>`b: Point \| Rect \| Rect[] \| Element \| Element[]` | `boolean` | Hit-tests one spatial object against one or more spatial objects. In order for the test to pass, the object just needs to collide with at least one of the specified objects. |
