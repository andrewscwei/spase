import { center } from './center.js'
import { make } from './make.js'

describe('center', () => {
  it('should get the center of a rect', () => {
    const r = make(0, 0, 10, 20)

    expect(center(r)).toEqual({ x: 5, y: 10 })
  })
})
