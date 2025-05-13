import { Point } from './Point.js'

describe('Point', () => {
  it('should create a zero point by default', () => {
    expect(Point.make()).toEqual({ x: 0, y: 0 })
    expect(Point.zero).toEqual({ x: 0, y: 0 })
  })

  it('should create a point from numbers', () => {
    expect(Point.make(1, 2)).toEqual({ x: 1, y: 2 })
  })

  it('should create a point from array', () => {
    expect(Point.make([3, 4])).toEqual({ x: 3, y: 4 })
  })

  it('should create a point from object', () => {
    expect(Point.make({ x: 5, y: 6 })).toEqual({ x: 5, y: 6 })
  })

  it('should clone a point', () => {
    const p = { x: 7, y: 8 }

    expect(Point.clone(p)).toEqual(p)
    expect(Point.clone(p, { x: 9 })).toEqual({ x: 9, y: 8 })
    expect(Point.clone(p, { y: 10 })).toEqual({ x: 7, y: 10 })
  })

  it('should add two points', () => {
    expect(Point.add({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 4, y: 6 })
  })

  it('should subtract two points', () => {
    expect(Point.subtract({ x: 5, y: 7 }, { x: 2, y: 3 })).toEqual({ x: 3, y: 4 })
  })

  it('should multiply two points', () => {
    expect(Point.multiply({ x: 2, y: 3 }, { x: 4, y: 5 })).toEqual({ x: 8, y: 15 })
  })

  it('should divide two points', () => {
    expect(Point.divide({ x: 8, y: 9 }, { x: 2, y: 3 })).toEqual({ x: 4, y: 3 })
  })

  it('should invert a point', () => {
    expect(Point.invert({ x: 11, y: 22 })).toEqual({ x: 22, y: 11 })
  })

  it('should check equality', () => {
    expect(Point.isEqual({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true)
    expect(Point.isEqual({ x: 1, y: 2 }, { x: 2, y: 1 })).toBe(false)
  })

  it('should convert to JSON', () => {
    const json = Point.toJSON({ x: 3, y: 4 })

    expect(json).toEqual({ x: 3, y: 4 })
    expect(Object.isFrozen(json)).toBe(true)
  })

  it('should convert to array', () => {
    expect(Point.toArray({ x: 5, y: 6 })).toEqual([5, 6])
  })

  it('should validate descriptors', () => {
    expect(Point.isValidDescriptor([1, 2])).toBe(true)
    expect(Point.isValidDescriptor({ x: 1, y: 2 })).toBe(true)
    expect(Point.isValidDescriptor([1])).toBe(false)
    expect(Point.isValidDescriptor({ x: 1 })).toBe(false)
    expect(Point.isValidDescriptor('foo')).toBe(false)
  })

  it('should check if value is a Point', () => {
    expect(Point.isPoint({ x: 1, y: 2 })).toBe(true)
    expect(Point.isPoint({ x: 1 })).toBe(false)
    expect(Point.isPoint([1, 2])).toBe(false)
  })

  it('should check if point is zero', () => {
    expect(Point.isZero({ x: 0, y: 0 })).toBe(true)
    expect(Point.isZero({ x: 1, y: 0 })).toBe(false)
    expect(Point.isZero({ x: 0, y: 1 })).toBe(false)
  })
})
