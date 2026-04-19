import { make } from './make.js'

describe('make', () => {
  it('should create a zero point by default', () => {
    expect(make()).toEqual({ x: 0, y: 0 })
  })

  it('should create a point from numbers', () => {
    expect(make(1, 2)).toEqual({ x: 1, y: 2 })
  })

  it('should create a point from array', () => {
    expect(make([3, 4])).toEqual({ x: 3, y: 4 })
  })

  it('should create a point from object', () => {
    expect(make({ x: 5, y: 6 })).toEqual({ x: 5, y: 6 })
  })
})
