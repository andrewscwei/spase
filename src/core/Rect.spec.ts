import { Rect } from './Rect'

describe('Rect', () => {
  it('should create a zero rect by default', () => {
    expect(Rect.make()).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
    })

    expect(Rect.zero).toEqual({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: 0,
      height: 0,
    })
  })

  it('should create a rect from descriptor', () => {
    expect(Rect.make({ x: 1, y: 2, width: 3, height: 4 })).toEqual({
      top: 2,
      right: 4,
      bottom: 6,
      left: 1,
      width: 3,
      height: 4,
    })
  })

  it('should create a rect from point and size', () => {
    expect(Rect.make({ x: 1, y: 2 }, { width: 3, height: 4 })).toEqual({
      top: 2,
      right: 4,
      bottom: 6,
      left: 1,
      width: 3,
      height: 4,
    })
  })

  it('should create a rect from numbers', () => {
    expect(Rect.make(1, 2, 3, 4)).toEqual({
      top: 2,
      right: 4,
      bottom: 6,
      left: 1,
      width: 3,
      height: 4,
    })
  })

  it('should clone a rect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.clone(r)).toEqual(r)
    expect(Rect.clone(r, { x: 10 })).toEqual({
      top: 2,
      right: 13,
      bottom: 6,
      left: 10,
      width: 3,
      height: 4,
    })

    expect(Rect.clone(r, { height: 20 })).toEqual({
      top: 2,
      right: 4,
      bottom: 22,
      left: 1,
      width: 3,
      height: 20,
    })
  })

  it('should get the center of a rect', () => {
    const r = Rect.make(0, 0, 10, 20)

    expect(Rect.center(r)).toEqual({ x: 5, y: 10 })
  })

  it('should get the size of a rect', () => {
    const r = Rect.make(0, 0, 10, 20)

    expect(Rect.size(r)).toEqual({ width: 10, height: 20 })
  })

  it('should get right and bottom', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.right(r)).toBe(4)
    expect(Rect.bottom(r)).toBe(6)
  })

  it('should concat two rects', () => {
    const a = Rect.make(0, 0, 2, 2)
    const b = Rect.make(1, 1, 2, 2)

    expect(Rect.concat(a, b)).toEqual({
      top: 0,
      right: 3,
      bottom: 3,
      left: 0,
      width: 3,
      height: 3,
    })
  })

  it('should invert a rect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.invert(r)).toEqual({
      top: 2,
      right: 1 + 4,
      bottom: 2 + 3,
      left: 1,
      width: 4,
      height: 3,
    })
  })

  it('should check equality', () => {
    const a = Rect.make(1, 2, 3, 4)
    const b = Rect.make(1, 2, 3, 4)
    const c = Rect.make(0, 0, 3, 4)

    expect(Rect.isEqual(a, b)).toBe(true)
    expect(Rect.isEqual(a, c)).toBe(false)
  })

  it('should check isZero', () => {
    expect(Rect.isZero(Rect.zero)).toBe(true)
    expect(Rect.isZero(Rect.make(0, 0, 1, 0))).toBe(false)
  })

  it('should validate descriptors', () => {
    expect(Rect.isValidDescriptor({ x: 1, y: 2, width: 3, height: 4 })).toBe(true)
    expect(Rect.isValidDescriptor({ x: 1, y: 2, width: 3 })).toBe(false)
    expect(Rect.isValidDescriptor({ x: 1, y: 2, height: 4 })).toBe(false)
    expect(Rect.isValidDescriptor({})).toBe(false)
  })

  it('should check isRect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.isRect(r)).toBe(true)
    expect(Rect.isRect({ x: 1, y: 2, width: 3, height: 4 })).toBe(false)
  })

  it('should convert to JSON', () => {
    const r = Rect.make(1, 2, 3, 4)
    const json = Rect.toJSON(r)

    expect(json).toEqual({
      top: 2,
      right: 4,
      bottom: 6,
      left: 1,
      width: 3,
      height: 4,
    })
    expect(Object.isFrozen(json)).toBe(true)
  })
})
