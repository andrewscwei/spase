import { isEqual } from './isEqual.js'
import { make } from './make.js'

describe('isEqual', () => {
  it('should check equality', () => {
    const a = make(1, 2, 3, 4)
    const b = make(1, 2, 3, 4)
    const c = make(0, 0, 3, 4)

    expect(isEqual(a, b)).toBe(true)
    expect(isEqual(a, c)).toBe(false)
  })
})
