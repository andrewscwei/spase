import { make } from './make.js'
import { type Descriptor } from './types/Descriptor.js'
import { type Rect } from './types/Rect.js'

/**
 * Clones and returns a new {@link Rect}.
 *
 * @param rect Original {@link Rect} to clone.
 * @param newDescriptor Optional new {@link Rect} descriptor to apply to the
 *                      clone.
 *
 * @returns The cloned {@link Rect}.
 */
export function clone(rect: Rect, newDescriptor: Partial<Descriptor> = {}): Rect {
  return make({
    height: typeof newDescriptor.height === 'number' ? newDescriptor.height : rect.height,
    width: typeof newDescriptor.width === 'number' ? newDescriptor.width : rect.width,
    x: typeof newDescriptor.x === 'number' ? newDescriptor.x : rect.left,
    y: typeof newDescriptor.y === 'number' ? newDescriptor.y : rect.top,
  })
}
