import { make } from './make.js'

describe('make', () => {
  it('should create a zero rect by default', () => {
    expect(make()).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    })
  })

  it('should create a rect from descriptor', () => {
    expect(make({ height: 4, width: 3, x: 1, y: 2 })).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should create a rect from point and size', () => {
    expect(make({ x: 1, y: 2 }, { height: 4, width: 3 })).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })

  it('should create a rect from numbers', () => {
    expect(make(1, 2, 3, 4)).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })
})
