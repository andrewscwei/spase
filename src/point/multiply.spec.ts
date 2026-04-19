import { multiply } from './multiply.js'

describe('multiply', () => {
  it('should multiply two points', () => {
    expect(multiply({ x: 2, y: 3 }, { x: 4, y: 5 })).toEqual({ x: 8, y: 15 })
  })
})
