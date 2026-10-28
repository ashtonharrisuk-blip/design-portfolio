import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'
import ProjectPage from './pages/ProjectPage.jsx'

// Entry for the project pages (e.g. work/bobapom/index.html). The page's
// root element names the project to show.
const root = document.getElementById('root')

createRoot(root).render(
  <StrictMode>
    <ProjectPage projectId={root.dataset.project} />
  </StrictMode>,
)
