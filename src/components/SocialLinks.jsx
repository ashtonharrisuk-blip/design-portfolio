import { socialLinks } from '../data/site.js'
import './SocialLinks.css'

// Brand marks (shapes from Simple Icons, CC0) and a plain envelope for email.
const ICONS = {
  Behance: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.94 4.1c.7 0 1.33.06 1.9.19.58.12 1.07.33 1.48.6.41.29.73.66.96 1.13.22.46.33 1.04.33 1.72 0 .74-.17 1.36-.5 1.86-.34.5-.84.9-1.5 1.22.91.26 1.58.72 2.03 1.38.45.66.67 1.46.67 2.39 0 .75-.15 1.4-.43 1.95-.29.55-.68 1-1.17 1.35-.49.35-1.05.6-1.68.77-.63.17-1.27.25-1.93.25H0V4.1h6.94Zm-.42 5.9c.58 0 1.06-.14 1.43-.42.38-.27.56-.72.56-1.33 0-.34-.06-.62-.18-.84a1.37 1.37 0 0 0-.49-.52 2.03 2.03 0 0 0-.7-.26 4.4 4.4 0 0 0-.82-.07H3.1V10h3.42Zm.18 6.64c.32 0 .62-.03.9-.09.29-.06.54-.16.76-.31.22-.15.39-.35.52-.6.13-.25.19-.58.19-.97 0-.77-.22-1.32-.65-1.65-.43-.33-1.01-.49-1.72-.49H3.1v4.11H6.7Zm10.21-.03c.44.43 1.07.64 1.9.64.59 0 1.1-.15 1.53-.45.42-.3.68-.61.78-.94h2.58c-.41 1.28-1.05 2.2-1.9 2.75-.85.55-1.88.83-3.09.83-.84 0-1.6-.13-2.27-.4a4.73 4.73 0 0 1-1.72-1.15 5.13 5.13 0 0 1-1.08-1.78 6.5 6.5 0 0 1-.38-2.27c0-.8.13-1.54.39-2.23.26-.69.63-1.28 1.11-1.78.48-.5 1.05-.9 1.71-1.18a5.55 5.55 0 0 1 2.24-.43c.92 0 1.72.18 2.4.53.68.36 1.24.84 1.68 1.44.44.6.75 1.29.95 2.06.19.77.26 1.58.2 2.42h-7.7c.04.96.29 1.66.73 2.09v-.15Zm3.37-5.6c-.35-.39-.89-.58-1.6-.58-.47 0-.86.08-1.17.24-.31.16-.56.36-.75.59-.19.24-.32.49-.39.75-.08.27-.12.5-.13.71h4.77c-.14-.75-.38-1.32-.73-1.71ZM15.5 5.6h5.97v1.46H15.5V5.6Z"
      />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="2.5 2.5 19 19" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45Z"
      />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <rect x="2.75" y="5" width="18.5" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="m3.5 6 8.5 7 8.5-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
}

export default function SocialLinks({ label = 'Social links' }) {
  return (
    <ul className="social-links" aria-label={label}>
      {socialLinks.map((link) => {
        const isExternal = /^https?:/.test(link.href)
        return (
          <li key={link.label}>
            <a
              className="social-links__link"
              href={link.href}
              aria-label={isExternal ? `${link.label} (opens in a new tab)` : link.label}
              title={link.label}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {ICONS[link.label]}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
