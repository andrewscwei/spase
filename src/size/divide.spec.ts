import { divide } from './divide.js'

describe('divide', () => {
  it('should divide two sizes', () => {
    expect(divide({ height: 9, width: 8 }, { height: 3, width: 2 })).toEqual({ height: 3, width: 4 })
  })
})
