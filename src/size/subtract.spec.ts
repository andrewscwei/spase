import { subtract } from './subtract.js'

describe('subtract', () => {
  it('should subtract two sizes', () => {
    expect(subtract({ height: 7, width: 5 }, { height: 3, width: 2 })).toEqual({ height: 4, width: 3 })
  })
})
