import { add } from './add.js'

describe('add', () => {
  it('should add two sizes', () => {
    expect(add({ height: 2, width: 1 }, { height: 4, width: 3 })).toEqual({ height: 6, width: 4 })
  })
})
