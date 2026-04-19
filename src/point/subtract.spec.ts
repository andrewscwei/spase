import { subtract } from './subtract.js'

describe('subtract', () => {
  it('should subtract two points', () => {
    expect(subtract({ x: 5, y: 7 }, { x: 2, y: 3 })).toEqual({ x: 3, y: 4 })
  })
})
