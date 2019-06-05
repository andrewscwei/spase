import Rect from './Rect';

/**
 * Gets the rect of the viewport (current field of view). Think of this as the
 * rect of the current window.
 *
 * @return The rect of the viewport.
 */
export default function getViewportRect(): Rect {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  const left = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
  const right = left + width;
  const bottom = top + height;
  return new Rect({ top, right, bottom, left, width, height });
}
