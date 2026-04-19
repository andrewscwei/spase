import { make } from './make.js'
import { type Rect } from './types/Rect.js'

/**
 * Options for {@link fromViewport}.
 */
type Options = {
  /**
   * Whether to include the overflow area of the viewport. If `true`, the
   * returned {@link Rect} will include the entire scrollable area of the
   * document. If `false`, it will only include the visible area of the
   * viewport.
   */
  overflow?: boolean
}

/**
 * Computes and returns the {@link Rect} of the viewport (a.k.a. the window). By
 * default, it returns the visible area of the viewport. If the `overflow`
 * option is set to `true`, it returns the entire scrollable area of the
 * document.
 *
 * @param options See {@link Options}.
 *
 * @returns The {@link Rect} of the viewport.
 */
export function fromViewport({ overflow = false }: Options = {}): Rect {
  if (overflow) {
    const width = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.documentElement.clientHeight, window.innerHeight || 0)
    const x = 0
    const y = 0

    return make({ height, width, x, y })
  } else {
    const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    const x = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft
    const y = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

    return make({ height, width, x, y })
  }
}
