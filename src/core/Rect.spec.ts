import { Rect } from './Rect'

describe('Rect', () => {
  it('should create a zero rect by default', () => {
    expect(Rect.make()).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    })

    expect(Rect.zero).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    })
  })

  it('should create a rect from descriptor', () => {
    expect(Rect.make({ height: 4, width: 3, x: 1, y: 2 })).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should create a rect from point and size', () => {
    expect(Rect.make({ x: 1, y: 2 }, { height: 4, width: 3 })).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should create a rect from numbers', () => {
    expect(Rect.make(1, 2, 3, 4)).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should clone a rect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.clone(r)).toEqual(r)
    expect(Rect.clone(r, { x: 10 })).toEqual({
      bottom: 6,
      height: 4,
      left: 10,
      right: 13,
      top: 2,
      width: 3,
    })

    expect(Rect.clone(r, { height: 20 })).toEqual({
      bottom: 22,
      height: 20,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should get the center of a rect', () => {
    const r = Rect.make(0, 0, 10, 20)

    expect(Rect.center(r)).toEqual({ x: 5, y: 10 })
  })

  it('should get the size of a rect', () => {
    const r = Rect.make(0, 0, 10, 20)

    expect(Rect.size(r)).toEqual({ height: 20, width: 10 })
  })

  it('should concat two rects', () => {
    const a = Rect.make(0, 0, 2, 2)
    const b = Rect.make(1, 1, 2, 2)

    expect(Rect.concat(a, b)).toEqual({
      bottom: 3,
      height: 3,
      left: 0,
      right: 3,
      top: 0,
      width: 3,
    })
  })

  it('should rotate a rect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.rotate(r)).toEqual({
      bottom: 2 + 3,
      height: 3,
      left: 1,
      right: 1 + 4,
      top: 2,
      width: 4,
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
    expect(Rect.isValidDescriptor({ height: 4, width: 3, x: 1, y: 2 })).toBe(true)
    expect(Rect.isValidDescriptor({ width: 3, x: 1, y: 2 })).toBe(false)
    expect(Rect.isValidDescriptor({ height: 4, x: 1, y: 2 })).toBe(false)
    expect(Rect.isValidDescriptor({})).toBe(false)
  })

  it('should check isRect', () => {
    const r = Rect.make(1, 2, 3, 4)

    expect(Rect.isRect(r)).toBe(true)
    expect(Rect.isRect({ height: 4, width: 3, x: 1, y: 2 })).toBe(false)
  })

  it('should convert to JSON', () => {
    const r = Rect.make(1, 2, 3, 4)
    const json = Rect.toJSON(r)

    expect(json).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
    expect(Object.isFrozen(json)).toBe(true)
  })
})
