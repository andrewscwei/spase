import { reflect } from './reflect.js'

describe('reflect', () => {
  it('should reflect a point', () => {
    expect(reflect({ x: 11, y: 22 })).toEqual({ x: 22, y: 11 })
  })
})
