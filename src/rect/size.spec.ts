import { make } from './make.js'
import { size } from './size.js'

describe('size', () => {
  it('should get the size of a rect', () => {
    const r = make(0, 0, 10, 20)

    expect(size(r)).toEqual({ height: 20, width: 10 })
  })
})
