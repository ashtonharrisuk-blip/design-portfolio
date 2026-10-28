import Tag from './Tag.jsx'
import './ProjectCard.css'

// Links starting with "/" are pages on this site; anything else opens in a new tab.
const isInternal = (url) => url.startsWith('/')

export default function ProjectCard({ project }) {
  const { title, tags, description, links = [], image, page } = project

  const imageLink = page ?? links[0]?.url
  const picture = image && <img src={image} alt={`${title} project preview`} loading="lazy" />

  return (
    <article className="project-card">
      <div className="project-card__info">
        <h3 className="project-card__title">{title}</h3>

        <ul className="project-card__tags">
          {tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <p className="project-card__description">{description}</p>

        {links.length > 0 && (
          <ul className="project-card__links">
            {links.map(({ label, url }) =>
              isInternal(url) ? (
                <li key={url}>
                  <a className="project-card__link" href={url}>
                    {label} &gt;
                  </a>
                </li>
              ) : (
                <li key={url}>
                  <a className="project-card__link" href={url} target="_blank" rel="noopener noreferrer">
                    {label} &gt;
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ),
            )}
          </ul>
        )}
      </div>

      {/* The image links to the project page if there is one, otherwise to the
          first link. It is skipped by keyboard and screen readers since the
          text link does the same job. */}
      {imageLink ? (
        <a
          className="project-card__media"
          href={imageLink}
          tabIndex={-1}
          aria-hidden="true"
          {...(isInternal(imageLink) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {picture}
        </a>
      ) : (
        <div className="project-card__media">{picture}</div>
      )}
    </article>
  )
}
