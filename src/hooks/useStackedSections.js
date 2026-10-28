import { useEffect } from 'react'

// Pins each `.stack-section` once its bottom edge reaches the bottom of the
// viewport, so the next section scrolls up over it. Sections taller than the
// screen still scroll through fully before pinning. See .stack-section in
// global.css.
export default function useStackedSections() {
  useEffect(() => {
    const sections = [...document.querySelectorAll('.stack-section')]
    const header = document.querySelector('.header')

    const update = () => {
      const headerHeight = header ? header.offsetHeight : 0
      for (const section of sections) {
        const top = Math.min(headerHeight, window.innerHeight - section.offsetHeight)
        section.style.setProperty('--stack-top', `${top}px`)
      }
    }

    update()
    const observer = new ResizeObserver(update)
    sections.forEach((section) => observer.observe(section))
    window.addEventListener('resize', update)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])
}
