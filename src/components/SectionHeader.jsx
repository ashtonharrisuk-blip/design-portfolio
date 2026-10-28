import './SectionHeader.css'

/** The ruled "01 / MY WORK / SHOWCASE" row with the centred section title. */
export default function SectionHeader({ number, label, tag, title, titleId }) {
  return (
    <header className="section-header">
      <div className="section-header__meta">
        <span>{number}</span>
        <span>{label}</span>
        <span>{tag}</span>
      </div>
      <h2 className="section-header__title" id={titleId}>
        {title}
      </h2>
    </header>
  )
}
