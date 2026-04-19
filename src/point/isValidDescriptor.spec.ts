import { isValidDescriptor } from './isValidDescriptor.js'

describe('isValidDescriptor', () => {
  it('should validate descriptors', () => {
    expect(isValidDescriptor([1, 2])).toBe(true)
    expect(isValidDescriptor({ x: 1, y: 2 })).toBe(true)
    expect(isValidDescriptor([1])).toBe(false)
    expect(isValidDescriptor({ x: 1 })).toBe(false)
    expect(isValidDescriptor('foo')).toBe(false)
  })
})
