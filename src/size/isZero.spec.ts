import { isZero } from './isZero.js'

describe('isZero', () => {
  it('should check if size is zero', () => {
    expect(isZero({ height: 0, width: 0 })).toBe(true)
    expect(isZero({ height: 0, width: 1 })).toBe(false)
    expect(isZero({ height: 1, width: 0 })).toBe(false)
  })
})
