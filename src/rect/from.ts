import { concat } from './concat.js'
import { fromViewport } from './fromViewport.js'
import { typeIsWindow } from './helpers/typeIsWindow.js'
import { is } from './is.js'
import { make } from './make.js'
import { type Options } from './types/Options.js'
import { type Rect } from './types/Rect.js'
import { zero } from './zero.js'

/**
 * Gets the combined {@link Rect} of one or more spatial objects.
 *
 * @param target An element or array of spatial objects to compute the combined
 *               {@link Rect}.
 * @param options See {@link Options}.
 *
 * @returns The combined {@link Rect} or {@link zero} if no valid result could
 *          be computed.
 */
export function from(target?: Element | Element[] | null | Rect | Window, options: Options = {}): Rect {
  try {
    if (target === undefined || target === null) return zero
    if (is(target)) return target
    if (typeIsWindow(target)) return from(document.documentElement || document.body.parentNode || document.body, options)

    const e = target instanceof Array ? target : [target]
    const n = e.length
    const reference = options.reference || window
    const winRect = fromViewport()
    const refRect = typeIsWindow(reference) ? winRect : from(options.reference)

    let combinedRect

    for (let i = 0; i < n; i++) {
      const element = e[i]
      const clientRect = element.getBoundingClientRect()
      const rect = make({
        height: options.overflow ? element.scrollHeight : element instanceof HTMLElement ? element.offsetHeight : clientRect.height,
        width: options.overflow ? element.scrollWidth : element instanceof HTMLElement ? element.offsetWidth : clientRect.width,
        x: clientRect.left + winRect.left - (typeIsWindow(reference) ? 0 : refRect.left),
        y: clientRect.top + winRect.top - (typeIsWindow(reference) ? 0 : refRect.top),
      })

      combinedRect = combinedRect ? concat(combinedRect, rect) : rect
    }

    return combinedRect ?? zero
  } catch (err) {
    console.error(err)

    return zero
  }
}
