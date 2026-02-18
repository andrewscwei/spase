import { Size } from './Size'

describe('Size', () => {
  it('should create a zero size by default', () => {
    expect(Size.make()).toEqual({ height: 0, width: 0 })
    expect(Size.zero).toEqual({ height: 0, width: 0 })
  })

  it('should create a size from numbers', () => {
    expect(Size.make(1, 2)).toEqual({ height: 2, width: 1 })
  })

  it('should create a size from array', () => {
    expect(Size.make([3, 4])).toEqual({ height: 4, width: 3 })
  })

  it('should create a size from object', () => {
    expect(Size.make({ height: 6, width: 5 })).toEqual({ height: 6, width: 5 })
  })

  it('should clone a size', () => {
    const s = { height: 8, width: 7 }
    expect(Size.clone(s)).toEqual(s)
    expect(Size.clone(s, { width: 9 })).toEqual({ height: 8, width: 9 })
    expect(Size.clone(s, { height: 10 })).toEqual({ height: 10, width: 7 })
  })

  it('should add two sizes', () => {
    expect(Size.add({ height: 2, width: 1 }, { height: 4, width: 3 })).toEqual({ height: 6, width: 4 })
  })

  it('should subtract two sizes', () => {
    expect(Size.subtract({ height: 7, width: 5 }, { height: 3, width: 2 })).toEqual({ height: 4, width: 3 })
  })

  it('should multiply two sizes', () => {
    expect(Size.multiply({ height: 3, width: 2 }, { height: 5, width: 4 })).toEqual({ height: 15, width: 8 })
  })

  it('should divide two sizes', () => {
    expect(Size.divide({ height: 9, width: 8 }, { height: 3, width: 2 })).toEqual({ height: 3, width: 4 })
  })

  it('should rotate a size', () => {
    expect(Size.rotate({ height: 22, width: 11 })).toEqual({ height: 11, width: 22 })
  })

  it('should check equality', () => {
    expect(Size.isEqual({ height: 2, width: 1 }, { height: 2, width: 1 })).toBe(true)
    expect(Size.isEqual({ height: 2, width: 1 }, { height: 1, width: 2 })).toBe(false)
  })

  it('should convert to JSON', () => {
    const json = Size.toJSON({ height: 4, width: 3 })

    expect(json).toEqual({ height: 4, width: 3 })
    expect(Object.isFrozen(json)).toBe(true)
  })

  it('should convert to array', () => {
    expect(Size.toArray({ height: 6, width: 5 })).toEqual([5, 6])
  })

  it('should validate descriptors', () => {
    expect(Size.isValidDescriptor([1, 2])).toBe(true)
    expect(Size.isValidDescriptor({ height: 2, width: 1 })).toBe(true)
    expect(Size.isValidDescriptor([1])).toBe(false)
    expect(Size.isValidDescriptor({ width: 1 })).toBe(false)
    expect(Size.isValidDescriptor('foo')).toBe(false)
  })

  it('should check if value is a Size', () => {
    expect(Size.isSize({ height: 2, width: 1 })).toBe(true)
    expect(Size.isSize({ width: 1 })).toBe(false)
    expect(Size.isSize([1, 2])).toBe(false)
  })

  it('should check if size is zero', () => {
    expect(Size.isZero({ height: 0, width: 0 })).toBe(true)
    expect(Size.isZero({ height: 0, width: 1 })).toBe(false)
    expect(Size.isZero({ height: 1, width: 0 })).toBe(false)
  })
})
