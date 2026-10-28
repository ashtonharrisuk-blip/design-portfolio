import { useEffect, useState } from 'react'
import Button from '../components/Button.jsx'
import { contactHref, navLinks } from '../data/site.js'
import './Header.css'

const DESKTOP_QUERY = '(min-width: 769px)'

// linkBase: "" on the home page; "/" on other pages so HOME, WORK and ABOUT
// lead back to the home page. CONTACT stays on the current page.
export default function Header({ linkBase = '' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [overHero, setOverHero] = useState(false)

  // Over the hero until the section after it slides up under the header.
  useEffect(() => {
    const hero = document.querySelector('.hero')
    const next = document.querySelector('.work')
    if (!hero || !next) {
      setOverHero(false)
      return undefined
    }
    const update = () => {
      const header = document.querySelector('.header')
      const headerBottom = header ? header.offsetHeight : 0
      setOverHero(next.getBoundingClientRect().top > headerBottom)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const closeOnDesktop = (event) => {
      if (event.matches) setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`header${menuOpen ? ' header--open' : ''}${overHero && !menuOpen ? ' header--over-hero' : ''}`}>
      <div className="container header__inner">
        <a
          className="header__logo"
          href={`${linkBase}#home`}
          aria-label={linkBase ? 'Ashton Harris, home page' : 'Ashton Harris, back to top'}
          onClick={closeMenu}
        >
          A
        </a>

        <nav className="header__nav" aria-label="Primary">
          <ul className="header__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="header__link" href={linkBase + link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button className="header__contact" href={contactHref} variant="pill" arrow>
            CONTACT
          </Button>
          <button
            className="header__toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="header__toggle-bar" />
            <span className="header__toggle-bar" />
          </button>
        </div>
      </div>

      <nav id="mobile-menu" className="header__menu" aria-label="Mobile" hidden={!menuOpen}>
        <ul className="container header__menu-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a className="header__menu-link" href={linkBase + link.href} onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a className="header__menu-link" href={contactHref} onClick={closeMenu}>
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
