import { add } from './add.js'

describe('add', () => {
  it('should add two points', () => {
    expect(add({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 4, y: 6 })
  })
})
