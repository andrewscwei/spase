import { clone } from './clone.js'

describe('clone', () => {
  it('should clone a size', () => {
    const s = { height: 8, width: 7 }
    expect(clone(s)).toEqual(s)
    expect(clone(s, { width: 9 })).toEqual({ height: 8, width: 9 })
    expect(clone(s, { height: 10 })).toEqual({ height: 10, width: 7 })
  })
})
