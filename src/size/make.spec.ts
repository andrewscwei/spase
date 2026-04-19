import { make } from './make.js'

describe('make', () => {
  it('should create a zero size by default', () => {
    expect(make()).toEqual({ height: 0, width: 0 })
  })

  it('should create a size from numbers', () => {
    expect(make(1, 2)).toEqual({ height: 2, width: 1 })
  })

  it('should create a size from array', () => {
    expect(make([3, 4])).toEqual({ height: 4, width: 3 })
  })

  it('should create a size from object', () => {
    expect(make({ height: 6, width: 5 })).toEqual({ height: 6, width: 5 })
  })
})
