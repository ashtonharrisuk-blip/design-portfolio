import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {new Date().getFullYear()} Ashton Harris</p>
        <a className="footer__top" href="#home">
          BACK TO TOP ↑
        </a>
      </div>
    </footer>
  )
}
