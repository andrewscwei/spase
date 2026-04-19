import { concat } from './concat.js'
import { make } from './make.js'

describe('concat', () => {
  it('should concat two rects', () => {
    const a = make(0, 0, 2, 2)
    const b = make(1, 1, 2, 2)

    expect(concat(a, b)).toEqual({
      bottom: 3,
      height: 3,
      left: 0,
      right: 3,
      top: 0,
      width: 3,
    })
  })
})
