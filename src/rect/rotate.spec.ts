import { make } from './make.js'
import { rotate } from './rotate.js'

describe('rotate', () => {
  it('should rotate a rect', () => {
    const r = make(1, 2, 3, 4)

    expect(rotate(r)).toEqual({
      bottom: 2 + 3,
      height: 3,
      left: 1,
      right: 1 + 4,
      top: 2,
      width: 4,
    })
  })
})
