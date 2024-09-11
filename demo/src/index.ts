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
  let start: Point
  let offset = Point.make()
  let curr: Point
  let isActive = false

  el.addEventListener('pointerdown', event => {
    start = new Point({
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

  el.addEventListener('pointerup', event => {
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
  const rect = Rect.fromViewport()
  const fullRect = Rect.from(window, { overflow: true })

  viewportEl!.querySelector('.top')!.innerHTML = `${parseNum(rect.top)}`
  viewportEl!.querySelector('.right')!.innerHTML = `${parseNum(rect.right)}`
  viewportEl!.querySelector('.bottom')!.innerHTML = `${parseNum(rect.bottom)}`
  viewportEl!.querySelector('.left')!.innerHTML = `${parseNum(rect.left)}`
  viewportEl!.querySelector('.size')!.innerHTML = `${parseNum(rect.width)}x${parseNum(rect.height)}<br>${parseNum(fullRect!.width)}x${parseNum(fullRect!.height)}`
}

function updateMain() {
  const rect = Rect.from(mainEl)
  const childRect = Rect.from(boxEls, { reference: mainEl })

  mainEl!.querySelector('.top')!.innerHTML = `${parseNum(rect!.top)}<br>(${parseNum(childRect!.top)})`
  mainEl!.querySelector('.right')!.innerHTML = `${parseNum(rect!.right)}<br>(${parseNum(childRect!.right)})`
  mainEl!.querySelector('.bottom')!.innerHTML = `${parseNum(rect!.bottom)}<br>(${parseNum(childRect!.bottom)})`
  mainEl!.querySelector('.left')!.innerHTML = `${parseNum(rect!.left)}<br>(${parseNum(childRect!.left)})`
  mainEl!.querySelector('.size')!.innerHTML = `${parseNum(rect!.width)}x${parseNum(rect!.height)}<br>(${parseNum(childRect!.width)}x${parseNum(childRect!.height)})`
}

function updateBoxes() {
  boxEls.forEach(el => {
    const rect = Rect.from(el!)
    const refRect = Rect.from(el!, { reference: mainEl })
    const fullRect = Rect.from(el!, { overflow: true })
    const intersectRect = Rect.intersecting(el)

    el.querySelector('.top')!.innerHTML = `G:${parseNum(rect!.top)}<br>L:${parseNum(refRect!.top)}<br>V:${parseNum(intersectRect!.top)}`
    el.querySelector('.right')!.innerHTML = `G:${parseNum(rect!.right)}<br>L:${parseNum(refRect!.right)}<br>V:${parseNum(intersectRect!.right)}`
    el.querySelector('.bottom')!.innerHTML = `G:${parseNum(rect!.bottom)}<br>L:${parseNum(refRect!.bottom)}<br>V:${parseNum(intersectRect!.bottom)}`
    el.querySelector('.left')!.innerHTML = `G:${parseNum(rect!.left)}<br>L:${parseNum(refRect!.left)}<br>V:${parseNum(intersectRect!.left)}`
    el.querySelector('.size')!.innerHTML = `G:${parseNum(rect!.width)}x${parseNum(rect!.height)}<br>L:${parseNum(fullRect!.width)}x${parseNum(fullRect!.height)}<br>V:${parseNum(intersectRect!.width)}x${parseNum(intersectRect!.height)}`
  })
}

function updateIntersection() {
  const rect = Rect.intersecting(...boxEls)

  if (rect!.width * rect!.height > 0) {
    intersectionEl!.classList.add('active')
  }
  else {
    intersectionEl!.classList.remove('active')
  }

  intersectionEl!.querySelector('.top')!.innerHTML = `${parseNum(rect!.top)}`
  intersectionEl!.querySelector('.right')!.innerHTML = `${parseNum(rect!.right)}`
  intersectionEl!.querySelector('.bottom')!.innerHTML = `${parseNum(rect!.bottom)}`
  intersectionEl!.querySelector('.left')!.innerHTML = `${parseNum(rect!.left)}`
  intersectionEl!.querySelector('.size')!.innerHTML = `INTERSECTING<br>${parseNum(rect!.width)}x${parseNum(rect!.height)}`
}

function parseNum(val: number) {
  return Math.round(val * 100) / 100
}

update()
