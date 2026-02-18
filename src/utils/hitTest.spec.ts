import { describe, expect, it } from 'vitest'

import { hitTest } from './hitTest'

describe('hitTest', () => {
  const rectA = { bottom: 10, height: 10, left: 0, right: 10, top: 0, width: 10 }
  const rectB = { bottom: 15, height: 10, left: 5, right: 15, top: 5, width: 10 }
  const pointA = { x: 5, y: 5 }
  const pointB = { x: 20, y: 20 }
  const pointC = { x: 50, y: 50 }
  const elementA: any = { getBoundingClientRect: () => ({ bottom: 10, height: 10, left: 0, right: 10, top: 0, width: 10 }) }
  const elementB: any = { getBoundingClientRect: () => ({ bottom: 30, height: 10, left: 20, right: 30, top: 20, width: 10 }) }

  it('should return true if point is inside rect', () => {
    expect(hitTest(pointA, rectA)).toBe(true)
  })

  it('should return false if point is outside rect', () => {
    expect(hitTest(pointB, rectA)).toBe(false)
  })

  it('should return true if rect contains point', () => {
    expect(hitTest(rectA, pointA)).toBe(true)
  })

  it('should return false if rect does not contain point', () => {
    expect(hitTest(rectA, pointB)).toBe(false)
  })

  it('should return true if points are equal', () => {
    expect(hitTest(pointA, { x: 5, y: 5 })).toBe(true)
  })

  it('should return false if points are not equal', () => {
    expect(hitTest(pointA, pointB)).toBe(false)
  })

  it('should return true if rects intersect', () => {
    expect(hitTest(rectA, rectB)).toBe(true)
  })

  it('should return false if rects do not intersect', () => {
    expect(hitTest(rectA, elementB)).toBe(false)
  })

  it('should return true if element contains point', () => {
    expect(hitTest(elementA, pointA)).toBe(true)
  })

  it('should return false if element does not contain point', () => {
    expect(hitTest(elementB, pointA)).toBe(false)
  })

  it('should return true if point is inside element', () => {
    expect(hitTest(pointA, elementA)).toBe(true)
  })

  it('should return false if point is outside element', () => {
    expect(hitTest(pointB, elementA)).toBe(false)
  })

  it('should handle arrays of rects', () => {
    expect(hitTest(pointA, [rectA, rectB])).toBe(true)
    expect(hitTest(pointB, [rectA, rectB])).toBe(false)
  })

  it('should handle arrays of elements', () => {
    expect(hitTest(pointA, [elementA, elementB])).toBe(true)
    expect(hitTest(pointB, [elementA, elementB])).toBe(true)
    expect(hitTest(pointC, [elementA, elementB])).toBe(false)
  })
})
