import { divide } from './divide.js'

describe('divide', () => {
  it('should divide two points', () => {
    expect(divide({ x: 8, y: 9 }, { x: 2, y: 3 })).toEqual({ x: 4, y: 3 })
  })
})
