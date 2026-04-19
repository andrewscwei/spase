import { make } from './make.js'
import { toJSON } from './toJSON.js'

describe('toJSON', () => {
  it('should convert to JSON', () => {
    const r = make(1, 2, 3, 4)
    const json = toJSON(r)

    expect(json).toEqual({
      bottom: 6,
      height: 4,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
    expect(Object.isFrozen(json)).toBe(true)
  })
})
