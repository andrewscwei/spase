import { clone } from './clone.js'

describe('clone', () => {
  it('should clone a point', () => {
    const p = { x: 7, y: 8 }

    expect(clone(p)).toEqual(p)
    expect(clone(p, { x: 9 })).toEqual({ x: 9, y: 8 })
    expect(clone(p, { y: 10 })).toEqual({ x: 7, y: 10 })
  })
})
