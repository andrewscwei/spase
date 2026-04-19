import { from } from './from.js'
import { type Options } from './types/Options.js'
import { type Rect } from './types/Rect.js'
import { zero } from './zero.js'

/**
 * Gets the {@link Rect} of a child of an element at its index. This
 * automatically sets the reference to the parent element.
 *
 * @param childIndex The child index.
 * @param parent The parent element of the child.
 * @param options See {@link Options}.
 *
 * @returns The {@link Rect} of the child or {@link zero} if no valid
 *          result could be computed.
 */
export function fromChildAt(childIndex: number, parent?: Element | null, options: Options = {}): Rect {
  if (!parent) return zero

  const child = parent.children[childIndex]

  return from(child, {
    overflow: options.overflow,
    reference: options.reference || parent,
  })
}
