import { clone } from './clone.js'
import { make } from './make.js'

describe('clone', () => {
  it('should clone a rect', () => {
    const r = make(1, 2, 3, 4)

    expect(clone(r)).toEqual(r)
    expect(clone(r, { x: 10 })).toEqual({
      bottom: 6,
      height: 4,
      left: 10,
      right: 13,
      top: 2,
      width: 3,
    })

    expect(clone(r, { height: 20 })).toEqual({
      bottom: 22,
      height: 20,
      left: 1,
      right: 4,
      top: 2,
      width: 3,
    })
  })
})
