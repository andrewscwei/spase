import { from } from './from.js'
import { make } from './make.js'
import { type Options } from './types/Options.js'
import { type Rect } from './types/Rect.js'
import { zero } from './zero.js'

/**
 * Gets the {@link Rect} of the children of an element up to the specified
 * index. This automatically sets the reference to the parent element.
 *
 * @param childIndex The {@link Rect} of the parent's children will be
 *                   computed up to this child index.
 * @param parent The parent element of the children.
 * @param options See {@link Options}.
 *
 * @returns The {@link Rect} of the children or {@link zero} if no valid
 *          result could be computed.
 */
export function fromChildrenBefore(childIndex: number, parent?: Element | null, options: Options = {}): Rect {
  if (!parent) return zero

  const children = Array.from(parent.children)

  if (childIndex <= 0) return make()
  if (childIndex >= children.length) return from(children, { overflow: false, reference: options.reference })

  children.splice(childIndex)

  return from(children, { overflow: false, reference: options.reference || parent })
}
