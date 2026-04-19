import { from } from './from.js'
import { typeIsWindow } from './helpers/typeIsWindow.js'
import { type Options } from './types/Options.js'
import { type Rect } from './types/Rect.js'
import { zero } from './zero.js'

/**
 * Gets the {@link Rect} of all the children of an element. This automatically
 * sets the reference to the parent element.
 *
 * @param parent The parent element of the child.
 * @param options See {@link Options}.
 *
 * @returns The {@link Rect} of the children or {@link zero} if no valid
 *          result could be computed.
 */
export function fromChildrenOf(parent?: Element | null | Window, options: Options = {}): Rect {
  if (!parent) return zero

  if (typeIsWindow(parent)) {
    return from(Array.from(document.body.children))
  } else {
    return from(Array.from(parent.children), {
      overflow: options.overflow,
      reference: options.reference || parent,
    })
  }
}
