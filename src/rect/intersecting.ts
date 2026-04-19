import { from } from './from.js'
import { fromViewport } from './fromViewport.js'
import { make } from './make.js'
import { type Descriptor } from './types/Descriptor.js'
import { type Rect } from './types/Rect.js'
import { zero } from './zero.js'

/**
 * Computes the intersecting {@link Rect} of a rect against one or more
 * elements. If only 1 element is specified, the intersection will be computed
 * against the viewport.
 *
 * @param elements Element(s) to be used to compute the intersecting
 *                 {@link Rect}.
 *
 * @returns The intersecting {@link Rect} or {@link zero} if no valid result
 *          could be computed.
 */
export function intersecting(...elements: Element[]): Rect {
  try {
    const n = elements.length

    const descriptor: Record<string, number> = {}
    let currRect: Rect | undefined
    let nextRect: Rect | undefined

    for (let i = 0; i < n; i++) {
      if (!currRect) currRect = from(elements[i])

      if (i === 0 && i + 1 === n) {
        nextRect = fromViewport()
      } else if (i + 1 < n) {
        nextRect = from(elements[i + 1])
      } else {
        break
      }

      if (!currRect || !nextRect) continue

      descriptor.width = Math.max(0.0, Math.min(currRect.right, nextRect.right) - Math.max(currRect.left, nextRect.left))
      descriptor.height = Math.max(0.0, Math.min(currRect.bottom, nextRect.bottom) - Math.max(currRect.top, nextRect.top))
      descriptor.y = Math.max(currRect.top, nextRect.top)
      descriptor.x = Math.max(currRect.left, nextRect.left)

      if (descriptor.width * descriptor.height === 0) {
        descriptor.width = 0
        descriptor.height = 0
        descriptor.y = NaN
        descriptor.x = NaN
      }

      currRect = make(descriptor as Descriptor)
    }

    return make(descriptor as Descriptor)
  } catch (err) {
    console.error(err)

    return zero
  }
}
