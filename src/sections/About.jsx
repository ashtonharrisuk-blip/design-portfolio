import Button from '../components/Button.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import { about, contactHref } from '../data/site.js'
import './About.css'

export default function About() {
  return (
    <section className="about stack-section stack-section--flow" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader number="02" label="ABOUT ME" tag="ASHTON HARRIS" title="About Me" titleId="about-title" />

        <div className="about__content">
          <div className="about__info">
            <h3 className="about__name">{about.name}</h3>
            <div className="about__bio">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="about__actions">
              <SocialLinks />
              <Button href={contactHref} arrow>
                CONTACT ME
              </Button>
            </div>
          </div>

          <div className="about__image">{about.image && <img src={about.image} alt={about.imageAlt} loading="lazy" />}</div>
        </div>
      </div>
    </section>
  )
}
