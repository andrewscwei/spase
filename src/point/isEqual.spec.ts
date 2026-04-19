import { isEqual } from './isEqual.js'

describe('isEqual', () => {
  it('should check equality', () => {
    expect(isEqual({ x: 1, y: 2 }, { x: 1, y: 2 })).toBe(true)
    expect(isEqual({ x: 1, y: 2 }, { x: 2, y: 1 })).toBe(false)
  })
})
