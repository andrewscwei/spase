import { zero } from './zero.js'

describe('zero', () => {
  it('should create a zero rect', () => {
    expect(zero).toEqual({
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    })
  })
})
