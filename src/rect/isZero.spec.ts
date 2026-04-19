import { isZero } from './isZero.js'
import { make } from './make.js'
import { zero } from './zero.js'

describe('isZero', () => {
  it('should check isZero', () => {
    expect(isZero(zero)).toBe(true)
    expect(isZero(make(0, 0, 1, 0))).toBe(false)
  })
})
