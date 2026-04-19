import { toArray } from './toArray.js'

describe('toArray', () => {
  it('should convert to array', () => {
    expect(toArray({ x: 5, y: 6 })).toEqual([5, 6])
  })
})
