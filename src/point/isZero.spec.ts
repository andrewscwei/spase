import { isZero } from './isZero.js'

describe('isZero', () => {
  it('should check if point is zero', () => {
    expect(isZero({ x: 0, y: 0 })).toBe(true)
    expect(isZero({ x: 1, y: 0 })).toBe(false)
    expect(isZero({ x: 0, y: 1 })).toBe(false)
  })
})
