import { toJSON } from './toJSON.js'

describe('toJSON', () => {
  it('should convert to JSON', () => {
    const json = toJSON({ x: 3, y: 4 })

    expect(json).toEqual({ x: 3, y: 4 })
    expect(Object.isFrozen(json)).toBe(true)
  })
})
