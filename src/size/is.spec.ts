import { is } from './is.js'

describe('is', () => {
  it('should check if value is a Size', () => {
    expect(is({ height: 2, width: 1 })).toBe(true)
    expect(is({ width: 1 })).toBe(false)
    expect(is([1, 2])).toBe(false)
  })
})
