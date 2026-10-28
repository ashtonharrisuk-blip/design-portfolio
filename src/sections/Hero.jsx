import AnimatedGradient from '../components/AnimatedGradient.jsx'
import Button from '../components/Button.jsx'
import Wordmark from '../components/Wordmark.jsx'
import { contactHref, hero } from '../data/site.js'
import dot from '../assets/dot.svg'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero stack-section">
      <AnimatedGradient colors={hero.gradient} coveredBy=".work" />
      <div className="hero__inner">
        <h1 className="hero__title">
          <Wordmark />
        </h1>

        {/* Collapsed at first so the wordmark sits centred, then expands and
            pushes it up to its final position (see Hero.css). */}
        <div className="hero__reveal">
          <div className="hero__reveal-inner">
            <p className="hero__subtitle">{hero.subtitle}</p>

            <div className="hero__cta">
              <p className="hero__tagline">
                {hero.tagline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <Button href={contactHref} arrow>
                CONTACT ME
              </Button>
            </div>

            <ul className="hero__disciplines">
              {hero.disciplines.map((discipline, index) => (
                <li key={discipline} className="hero__discipline">
                  {index > 0 && <img className="hero__dot" src={dot} alt="" />}
                  {discipline}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
