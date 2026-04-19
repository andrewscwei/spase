import { isEqual } from './isEqual.js'

describe('isEqual', () => {
  it('should check equality', () => {
    expect(isEqual({ height: 2, width: 1 }, { height: 2, width: 1 })).toBe(true)
    expect(isEqual({ height: 2, width: 1 }, { height: 1, width: 2 })).toBe(false)
  })
})
