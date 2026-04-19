import { isValidDescriptor } from './isValidDescriptor.js'

describe('isValidDescriptor', () => {
  it('should validate descriptors', () => {
    expect(isValidDescriptor({ height: 4, width: 3, x: 1, y: 2 })).toBe(true)
    expect(isValidDescriptor({ width: 3, x: 1, y: 2 })).toBe(false)
    expect(isValidDescriptor({ height: 4, x: 1, y: 2 })).toBe(false)
    expect(isValidDescriptor({})).toBe(false)
  })
})
