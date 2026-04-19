import { is } from './is.js'
import { make } from './make.js'

describe('is', () => {
  it('should check isRect', () => {
    const r = make(1, 2, 3, 4)

    expect(is(r)).toBe(true)
    expect(is({ height: 4, width: 3, x: 1, y: 2 })).toBe(false)
  })
})
