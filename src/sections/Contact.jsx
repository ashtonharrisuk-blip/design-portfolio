import { useState } from 'react'
import Button from '../components/Button.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { contact, contactForm } from '../data/site.js'
import './Contact.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY_FORM = { name: '', email: '', message: '' }

function validate(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

const SEND_TIMEOUT_MS = 15000

// Sends the message through Web3Forms, which emails it on.
// Returns 'sent', 'failed' or 'not-configured'.
// Sent as form data, not JSON: Web3Forms rejects the browser's pre-check
// (CORS preflight) that a JSON request triggers.
async function submitContactForm(values, botcheck) {
  if (!contactForm.accessKey) return 'not-configured'

  const body = new FormData()
  body.append('access_key', contactForm.accessKey)
  body.append('subject', contactForm.subject)
  body.append('from_name', 'Portfolio contact form')
  body.append('name', values.name.trim() || 'Not given')
  body.append('email', values.email.trim())
  body.append('replyto', values.email.trim())
  body.append('message', values.message.trim())
  // Any botcheck value at all marks the message as spam, so only send it
  // when the hidden box was ticked.
  if (botcheck) body.append('botcheck', 'on')

  // Give up rather than leave the visitor stuck on "Sending…".
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), SEND_TIMEOUT_MS)
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
      signal: controller.signal,
    })
    const result = await response.json()
    return response.ok && result.success ? 'sent' : 'failed'
  } catch {
    return 'failed'
  } finally {
    clearTimeout(timer)
  }
}

export default function Contact({ number = '03' }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
    setStatus(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      setStatus(null)
      event.currentTarget.elements[firstInvalid].focus()
      return
    }

    if (sending) return
    setSending(true)
    setStatus({ type: 'notice', text: 'Sending…' })
    const botcheck = event.currentTarget.elements.botcheck.checked
    const result = await submitContactForm(values, botcheck)
    setSending(false)

    if (result === 'sent') {
      setValues(EMPTY_FORM)
      setStatus({ type: 'success', text: 'Thanks, your message has been sent.' })
    } else if (result === 'not-configured') {
      setStatus({
        type: 'notice',
        text: 'This form isn’t connected yet, so your message has not been sent.',
      })
    } else {
      setStatus({
        type: 'error',
        text: 'Sorry, something went wrong and your message wasn’t sent. Please try again.',
      })
    }
  }

  return (
    <section className="contact stack-section stack-section--flow" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader number={number} label="GET IN TOUCH" tag="CONTACT" title="Contact Me" titleId="contact-title" />

        <div className="contact__content">
          <div className="contact__info">
            <h3 className="contact__heading">{contact.heading}</h3>
            <p className="contact__blurb">{contact.blurb}</p>

            <dl className="contact__details">
              {contact.details.map((detail) => (
                <div key={detail.label}>
                  <dt>{detail.label}</dt>
                  <dd>{detail.value}</dd>
                </div>
              ))}
            </dl>

            <SocialLinks />
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__field">
              <label className="visually-hidden" htmlFor="contact-name">
                Name
              </label>
              <input
                id="contact-name"
                className="contact__input"
                type="text"
                name="name"
                placeholder="Name"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="contact__field">
              <label className="visually-hidden" htmlFor="contact-email">
                Email (required)
              </label>
              <input
                id="contact-email"
                className="contact__input"
                type="email"
                name="email"
                placeholder="Email*"
                autoComplete="email"
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="contact__error" id="contact-email-error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="contact__field">
              <label className="visually-hidden" htmlFor="contact-message">
                Message (required)
              </label>
              <textarea
                id="contact-message"
                className="contact__input contact__input--message"
                name="message"
                placeholder="Message*"
                required
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                value={values.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="contact__error" id="contact-message-error">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Spam trap: hidden from people, bots tick it and get filtered out. */}
            <input
              className="visually-hidden"
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="contact__submit">
              <Button variant="solid" type="submit" disabled={sending} aria-busy={sending}>
                SUBMIT
              </Button>
              <p className={`contact__status${status ? ` contact__status--${status.type}` : ''}`} role="status">
                {status?.text}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
