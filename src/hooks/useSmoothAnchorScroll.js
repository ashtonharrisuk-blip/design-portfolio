import { useEffect } from 'react'

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

// Handles every in-page link (href="#...") with one eased scroll to the exact
// target, instead of the browser's native smooth scroll, which can jump near
// the end of its glide around the pinned sections. Stops if the visitor
// scrolls themselves, and jumps instantly when reduced motion is preferred.
export default function useSmoothAnchorScroll() {
  useEffect(() => {
    let frame = 0

    const cancel = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    // Where the page must scroll to so the target sits just below the header.
    const targetY = (target) => {
      const header = document.querySelector('.header')
      const headerHeight = header ? header.offsetHeight : 0
      const maxY = document.documentElement.scrollHeight - window.innerHeight
      return Math.max(0, Math.min(maxY, target.getBoundingClientRect().top + window.scrollY - headerHeight))
    }

    const scrollToTarget = (target) => {
      cancel()
      const startY = window.scrollY
      const endY = targetY(target)
      const distance = endY - startY
      if (distance === 0) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.scrollTo({ top: endY, behavior: 'instant' })
        return
      }

      const duration = Math.min(1100, Math.max(500, 300 + Math.abs(distance) * 0.15))
      const start = performance.now()

      const step = (now) => {
        const progress = Math.min(1, (now - start) / duration)
        window.scrollTo({ top: startY + distance * easeInOutCubic(progress), behavior: 'instant' })
        frame = progress < 1 ? requestAnimationFrame(step) : 0
      }
      frame = requestAnimationFrame(step)
    }

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href').slice(1)
      const target = id && document.getElementById(id)
      if (!target) return

      event.preventDefault()
      history.pushState(null, '', `#${id}`)
      target.focus({ preventScroll: true })
      scrollToTarget(target)
    }

    // Hand control back as soon as the visitor scrolls themselves.
    const userScroll = () => frame && cancel()
    const userKey = (event) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']
      if (keys.includes(event.key)) userScroll()
    }

    // Arriving from another page with a #section in the address (e.g. WORK on
    // a project page): the browser looked for it before the page was drawn,
    // so jump there now that it exists.
    const arrivalId = decodeURIComponent(window.location.hash.slice(1))
    const arrivalTarget = arrivalId && document.getElementById(arrivalId)
    if (arrivalTarget) {
      frame = requestAnimationFrame(() => {
        frame = 0
        window.scrollTo({ top: targetY(arrivalTarget), behavior: 'instant' })
      })
    }

    document.addEventListener('click', onClick)
    window.addEventListener('wheel', userScroll, { passive: true })
    window.addEventListener('touchstart', userScroll, { passive: true })
    window.addEventListener('keydown', userKey)

    return () => {
      cancel()
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', userScroll)
      window.removeEventListener('touchstart', userScroll)
      window.removeEventListener('keydown', userKey)
    }
  }, [])
}
