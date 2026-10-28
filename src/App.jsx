import Header from './sections/Header.jsx'
import Hero from './sections/Hero.jsx'
import Work from './sections/Work.jsx'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import useSmoothAnchorScroll from './hooks/useSmoothAnchorScroll.js'
import useStackedSections from './hooks/useStackedSections.js'

export default function App() {
  useStackedSections()
  useSmoothAnchorScroll()

  return (
    <>
      <Header />
      {/* Link targets sit outside the sections: a pinned section reports its
          pinned position, so linking to it directly would stop short. */}
      <main>
        <span id="home" className="section-anchor" tabIndex={-1} />
        <Hero />
        <span id="work" className="section-anchor" tabIndex={-1} />
        <Work />
        <span id="about" className="section-anchor" tabIndex={-1} />
        <About />
        <span id="contact" className="section-anchor" tabIndex={-1} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
