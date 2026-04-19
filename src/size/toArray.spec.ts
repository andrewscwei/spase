import { toArray } from './toArray.js'

describe('toArray', () => {
  it('should convert to array', () => {
    expect(toArray({ height: 6, width: 5 })).toEqual([5, 6])
  })
})
