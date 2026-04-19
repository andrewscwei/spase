import { multiply } from './multiply.js'

describe('multiply', () => {
  it('should multiply two sizes', () => {
    expect(multiply({ height: 3, width: 2 }, { height: 5, width: 4 })).toEqual({ height: 15, width: 8 })
  })
})
