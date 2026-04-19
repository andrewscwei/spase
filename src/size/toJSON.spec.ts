import { toJSON } from './toJSON.js'

describe('toJSON', () => {
  it('should convert to JSON', () => {
    const json = toJSON({ height: 4, width: 3 })

    expect(json).toEqual({ height: 4, width: 3 })
    expect(Object.isFrozen(json)).toBe(true)
  })
})
