import { is } from './is.js'

describe('is', () => {
  it('should check if value is a Point', () => {
    expect(is({ x: 1, y: 2 })).toBe(true)
    expect(is({ x: 1 })).toBe(false)
    expect(is([1, 2])).toBe(false)
  })
})
