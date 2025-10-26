import { Size } from './Size'

describe('Size', () => {
  it('should create a zero size by default', () => {
    expect(Size.make()).toEqual({ width: 0, height: 0 })
    expect(Size.zero).toEqual({ width: 0, height: 0 })
  })

  it('should create a size from numbers', () => {
    expect(Size.make(1, 2)).toEqual({ width: 1, height: 2 })
  })

  it('should create a size from array', () => {
    expect(Size.make([3, 4])).toEqual({ width: 3, height: 4 })
  })

  it('should create a size from object', () => {
    expect(Size.make({ width: 5, height: 6 })).toEqual({ width: 5, height: 6 })
  })

  it('should clone a size', () => {
    const s = { width: 7, height: 8 }
    expect(Size.clone(s)).toEqual(s)
    expect(Size.clone(s, { width: 9 })).toEqual({ width: 9, height: 8 })
    expect(Size.clone(s, { height: 10 })).toEqual({ width: 7, height: 10 })
  })

  it('should add two sizes', () => {
    expect(Size.add({ width: 1, height: 2 }, { width: 3, height: 4 })).toEqual({ width: 4, height: 6 })
  })

  it('should subtract two sizes', () => {
    expect(Size.subtract({ width: 5, height: 7 }, { width: 2, height: 3 })).toEqual({ width: 3, height: 4 })
  })

  it('should multiply two sizes', () => {
    expect(Size.multiply({ width: 2, height: 3 }, { width: 4, height: 5 })).toEqual({ width: 8, height: 15 })
  })

  it('should divide two sizes', () => {
    expect(Size.divide({ width: 8, height: 9 }, { width: 2, height: 3 })).toEqual({ width: 4, height: 3 })
  })

  it('should rotate a size', () => {
    expect(Size.rotate({ width: 11, height: 22 })).toEqual({ width: 22, height: 11 })
  })

  it('should check equality', () => {
    expect(Size.isEqual({ width: 1, height: 2 }, { width: 1, height: 2 })).toBe(true)
    expect(Size.isEqual({ width: 1, height: 2 }, { width: 2, height: 1 })).toBe(false)
  })

  it('should convert to JSON', () => {
    const json = Size.toJSON({ width: 3, height: 4 })

    expect(json).toEqual({ width: 3, height: 4 })
    expect(Object.isFrozen(json)).toBe(true)
  })

  it('should convert to array', () => {
    expect(Size.toArray({ width: 5, height: 6 })).toEqual([5, 6])
  })

  it('should validate descriptors', () => {
    expect(Size.isValidDescriptor([1, 2])).toBe(true)
    expect(Size.isValidDescriptor({ width: 1, height: 2 })).toBe(true)
    expect(Size.isValidDescriptor([1])).toBe(false)
    expect(Size.isValidDescriptor({ width: 1 })).toBe(false)
    expect(Size.isValidDescriptor('foo')).toBe(false)
  })

  it('should check if value is a Size', () => {
    expect(Size.isSize({ width: 1, height: 2 })).toBe(true)
    expect(Size.isSize({ width: 1 })).toBe(false)
    expect(Size.isSize([1, 2])).toBe(false)
  })

  it('should check if size is zero', () => {
    expect(Size.isZero({ width: 0, height: 0 })).toBe(true)
    expect(Size.isZero({ width: 1, height: 0 })).toBe(false)
    expect(Size.isZero({ width: 0, height: 1 })).toBe(false)
  })
})
