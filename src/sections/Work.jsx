import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { projects } from '../data/projects.js'
import './Work.css'

export default function Work() {
  return (
    <section className="work section--light stack-section" aria-labelledby="work-title">
      {/* Tab poking up into the hero, hinting there is more below. */}
      <a className="work__notch" href="#work" aria-label="Scroll down to my work">
        <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
          <path d="M8 2v11M3 8.5 8 13.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </a>

      <div className="container">
        <SectionHeader number="01" label="MY WORK" tag="SHOWCASE" title="Work Showcase" titleId="work-title" />

        <div className="work__list">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
