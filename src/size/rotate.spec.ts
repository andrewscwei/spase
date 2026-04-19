import { rotate } from './rotate.js'

describe('rotate', () => {
  it('should rotate a size', () => {
    expect(rotate({ height: 22, width: 11 })).toEqual({ height: 11, width: 22 })
  })
})
