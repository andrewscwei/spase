/**
 * Options for creating a {@link Rect}.
 */
export type Options = Readonly<{
  /**
   * The element whose coordinate space the computed `top`, `right`, `bottom`
   * and `left` values are relative to.
   */
  reference?: Element | null | Window

  /**
   * Specifies whether the overflow `width`/`height` should be accounted for.
   * Overflow means the `width` or `height` that extend beyond the CSS-specified
   * `width` or `height`.
   */
  overflow?: boolean
}>
