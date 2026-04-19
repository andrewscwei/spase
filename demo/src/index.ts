import { Point, Rect } from 'spase'

import './styles.css'

const mainEl = document.getElementById('main')
const intersectionEl = document.getElementById('intersection')
const viewportEl = document.getElementById('viewport')
const boxEls = Array.from(document.querySelectorAll('#main .box'))

window.localStorage.debug = 'spase*'
window.addEventListener('resize', () => update())
window.addEventListener('scroll', () => update())

boxEls.forEach(el => {
  let start: Point.Point
  let offset = Point.make()
  let curr: Point.Point
  let isActive = false

  el.addEventListener('pointerdown', event => {
    start = Point.make({
      x: (event as MouseEvent).clientX - offset.x,
      y: (event as MouseEvent).clientY - offset.y,
    })

    if (event.target === el) isActive = true

    update()
  })

  window.addEventListener('pointermove', event => {
    if (!isActive) return

    event.preventDefault()

    curr = Point.make((event as MouseEvent).clientX - start.x, (event as MouseEvent).clientY - start.y)
    offset = curr;

    (el as HTMLElement).style.transform = `translate3d(${curr.x}px, ${curr.y}px, 0)`

    update()
  })

  el.addEventListener('pointerup', () => {
    start = curr
    isActive = false

    update()
  })
})

function update() {
  updateViewport()
  updateMain()
  updateBoxes()
  updateIntersection()
}

function updateViewport() {
  if (!viewportEl) return

  const rect = Rect.fromViewport()
  const fullRect = Rect.fromViewport({ overflow: true })

  viewportEl.querySelector('.top')!.innerHTML = `${t(rect.top)}`
  viewportEl.querySelector('.right')!.innerHTML = `${t(rect.right)}`
  viewportEl.querySelector('.bottom')!.innerHTML = `${t(rect.bottom)}`
  viewportEl.querySelector('.left')!.innerHTML = `${t(rect.left)}`
  viewportEl.querySelector('.size')!.innerHTML = `${t(rect.width)}x${t(rect.height)}<br>${t(fullRect.width)}x${t(fullRect.height)}`
}

function updateMain() {
  if (!mainEl) return

  const rect = Rect.from(mainEl)
  const childRect = Rect.from(boxEls, { reference: mainEl })

  mainEl.querySelector('.top')!.innerHTML = `${t(rect!.top)}<br>(${t(childRect.top)})`
  mainEl.querySelector('.right')!.innerHTML = `${t(rect!.right)}<br>(${t(childRect.right)})`
  mainEl.querySelector('.bottom')!.innerHTML = `${t(rect!.bottom)}<br>(${t(childRect.bottom)})`
  mainEl.querySelector('.left')!.innerHTML = `${t(rect!.left)}<br>(${t(childRect.left)})`
  mainEl.querySelector('.size')!.innerHTML = `${t(rect!.width)}x${t(rect.height)}<br>(${t(childRect.width)}x${t(childRect.height)})`
}

function updateBoxes() {
  boxEls.forEach(el => {
    if (!el) return

    const rect = Rect.from(el)
    const refRect = Rect.from(el, { reference: mainEl })
    const fullRect = Rect.from(el, { overflow: true, reference: mainEl })
    const rectInViewport = Rect.inViewport(el)

    el.querySelector('.top')!.innerHTML = `G:${t(rect.top)}<br>L:${t(refRect.top)}<br>V:${t(rectInViewport.top)}`
    el.querySelector('.right')!.innerHTML = `G:${t(rect.right)}<br>L:${t(refRect.right)}<br>V:${t(rectInViewport.right)}`
    el.querySelector('.bottom')!.innerHTML = `G:${t(rect.bottom)}<br>L:${t(refRect.bottom)}<br>V:${t(rectInViewport.bottom)}`
    el.querySelector('.left')!.innerHTML = `G:${t(rect.left)}<br>L:${t(refRect.left)}<br>V:${t(rectInViewport.left)}`
    el.querySelector('.size')!.innerHTML = `G:${t(rect.width)}x${t(rect.height)}<br>L:${t(fullRect.width)}x${t(fullRect.height)}<br>V:${t(rectInViewport.width)}x${t(rectInViewport.height)}`
  })
}

function updateIntersection() {
  if (!intersectionEl) return

  const rect = Rect.intersecting(...boxEls)

  if (rect.width * rect.height > 0) {
    intersectionEl.classList.add('active')
  } else {
    intersectionEl.classList.remove('active')
  }

  intersectionEl.querySelector('.top')!.innerHTML = `${t(rect.top)}`
  intersectionEl.querySelector('.right')!.innerHTML = `${t(rect.right)}`
  intersectionEl.querySelector('.bottom')!.innerHTML = `${t(rect.bottom)}`
  intersectionEl.querySelector('.left')!.innerHTML = `${t(rect.left)}`
  intersectionEl.querySelector('.size')!.innerHTML = `INTERSECTION<br>${t(rect.width)}x${t(rect.height)}`
}

function t(val: number) {
  return Math.round(val * 100) / 100
}

update()
