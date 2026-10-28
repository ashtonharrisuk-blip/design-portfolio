import SectionHeader from '../components/SectionHeader.jsx'
import Tag from '../components/Tag.jsx'
import { projects } from '../data/projects.js'
import useSmoothAnchorScroll from '../hooks/useSmoothAnchorScroll.js'
import Contact from '../sections/Contact.jsx'
import Footer from '../sections/Footer.jsx'
import Header from '../sections/Header.jsx'
import './ProjectPage.css'

/** A project's own page: title, tags, description, then every image stacked. */
export default function ProjectPage({ projectId }) {
  useSmoothAnchorScroll()
  const project = projects.find((item) => item.id === projectId)
  if (!project) return null

  const { title, tags, description, gallery = [] } = project

  return (
    <>
      <Header linkBase="/" />
      <main>
        <span id="home" className="section-anchor" tabIndex={-1} />
        <section className="project-page section--light" aria-labelledby="project-title">
          <div className="container">
            <a className="project-page__back" href="/#work">
              ← BACK TO WORK
            </a>

            <SectionHeader number="01" label="PROJECT" tag="SHOWCASE" title={title} titleId="project-title" />

            <ul className="project-page__tags">
              {tags.map((tag) => (
                <li key={tag}>
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>

            <p className="project-page__description">{description}</p>

            <ul className="project-page__gallery">
              {gallery.map((src, index) => (
                <li key={src}>
                  <img
                    src={src}
                    alt={`${title} image ${index + 1} of ${gallery.length}`}
                    decoding="async"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <span id="contact" className="section-anchor" tabIndex={-1} />
        <Contact number="02" />
      </main>
      <Footer />
    </>
  )
}
