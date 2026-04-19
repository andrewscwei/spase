import { isValidDescriptor } from './isValidDescriptor.js'

describe('isValidDescriptor', () => {
  it('should validate descriptors', () => {
    expect(isValidDescriptor([1, 2])).toBe(true)
    expect(isValidDescriptor({ height: 2, width: 1 })).toBe(true)
    expect(isValidDescriptor([1])).toBe(false)
    expect(isValidDescriptor({ width: 1 })).toBe(false)
    expect(isValidDescriptor('foo')).toBe(false)
  })
})
