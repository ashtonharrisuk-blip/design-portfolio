// Projects shown in the Work section, in display order.
// Tags are uppercase to match the design.
// links: [{ label, url }]. External links open in a new tab; links starting
// with "/" are pages on this site and open in the same tab.
// image: src/assets/work/<id>.webp (5:3). A missing file shows a placeholder.
// page: optional project page, with gallery images from src/assets/work/<id>/
// shown one above the other. Each page also needs an entry in vite.config.js.
const workImages = import.meta.glob('../assets/work/*.webp', { eager: true, import: 'default' })
const galleryImages = import.meta.glob('../assets/work/*/*.webp', { eager: true, import: 'default' })
const imageFor = (id) => workImages[`../assets/work/${id}.webp`] ?? null
const galleryFor = (id) =>
  Object.keys(galleryImages)
    .filter((path) => path.startsWith(`../assets/work/${id}/`))
    .sort()
    .map((path) => galleryImages[path])

const BEHANCE_LABEL = 'VIEW FULL PROJECT ON BEHANCE'

export const projects = [
  {
    id: 'freebird',
    title: 'Freebird',
    tags: ['BRANDING', 'LOGO IDENTITY'],
    description:
      'A conceptual travel brand built around discovery, experiences and collecting memories. Combining a distinctive visual identity with a playful approach to travel, Freebird encourages people to explore more, collect their adventures and turn every journey into a story.',
    links: [{ label: BEHANCE_LABEL, url: 'https://www.behance.net/gallery/253987107/Freebird-Travel-Branding' }],
    image: imageFor('freebird'),
  },
  {
    // Real client work.
    id: 'qiao',
    title: 'QIAO',
    tags: ['BRANDING', 'LOGO IDENTITY'],
    description:
      'A brand identity for an independent M&A advisory business supporting founders through buying and selling companies. Inspired by the Chinese word for “bridge”, the custom wordmark uses interconnecting arches to represent connection, transition and trust, bringing a meaningful concept to a refined, professional identity.',
    links: [{ label: BEHANCE_LABEL, url: 'https://www.behance.net/gallery/246692669/Qiao-Logo-Identity' }],
    image: imageFor('qiao'),
  },
  {
    id: 'pyramid-car-care',
    title: 'Pyramid Car Care',
    tags: ['EDITORIAL', 'GRAPHIC DESIGN'],
    description:
      'A premium trade brochure designed in collaboration with Driven Marketing Agency, showcasing Pyramid Car Care’s paint protection film products, installer training and business support. A clean, automotive-inspired layout brings the brand’s offering together in a clear and polished editorial design.',
    links: [{ label: BEHANCE_LABEL, url: 'https://www.behance.net/gallery/252657895/Pyramid-Car-Care-Brochure-Design' }],
    image: imageFor('pyramid-car-care'),
  },
  {
    // Uncommissioned concept for a local business; not adopted by them.
    id: 'bobapom',
    title: 'Bobapom',
    tags: ['BRANDING', 'LOGO IDENTITY'],
    description:
      'A conceptual logo identity for a local bubble tea and dessert brand. Developed to give the business a distinctive personality, the design explores a playful visual direction suited to a modern destination for drinks, sweet treats and indulgent moments.',
    links: [{ label: 'VIEW FULL PROJECT', url: '/work/bobapom/' }],
    image: imageFor('bobapom'),
    page: '/work/bobapom/',
    gallery: galleryFor('bobapom'),
  },
  {
    // Professional in-house design work.
    id: 'terrace',
    title: 'Terrace',
    tags: ['GRAPHIC DESIGN', 'SPORTS'],
    description:
      'A collection of design work created during my time as an in-house Graphic Designer at Terrace, producing artwork and promotional materials for football clubs and sporting organisations across England. Spanning merchandise, product graphics and marketing assets, the work combines creative problem-solving with the practical demands of commercial sports design.',
    links: [{ label: BEHANCE_LABEL, url: 'https://www.behance.net/gallery/212456529/Terrace-Artwork-Portfolio' }],
    image: imageFor('terrace'),
  },
  {
    id: 'motionlabs',
    title: 'MotionLabs',
    tags: ['WEBSITE DESIGN', 'UI DESIGN'],
    description:
      'A conceptual website for a modern fitness and wellness brand focused on performance, community and movement. The design combines bold typography, a confident visual identity and a streamlined user experience to create an engaging digital presence built around an active lifestyle.',
    links: [
      { label: 'LIVE WEBSITE', url: 'https://motionlabs-eosin.vercel.app' },
      { label: 'BEHANCE', url: 'https://www.behance.net/gallery/244785221/MotionLabs-Website-Design' },
    ],
    image: imageFor('motionlabs'),
  },
  {
    id: 'wmbl',
    title: 'WMBL',
    tags: ['BRANDING', 'LOGO IDENTITY'],
    description:
      'A conceptual identity for the West Midlands Basketball League, inspired by the energy of competitive basketball and the character of its local sporting community. The redesign explores a sharper, more distinctive visual identity designed to stand out among regional leagues while reflecting the sport’s dynamic and competitive nature.',
    links: [
      {
        label: BEHANCE_LABEL,
        url: 'https://www.behance.net/gallery/222868259/West-Midlands-Basketball-League-(Logo-Identity)',
      },
    ],
    image: imageFor('wmbl'),
  },
  {
    id: 'krest',
    title: 'Krest Typeface',
    tags: ['TYPOGRAPHY', 'TYPE DESIGN'],
    description:
      'An original display typeface designed for bold headlines and expressive typography. Combining sleek, futuristic styling with a sporty character, Krest is available in three weights and is free for commercial use, making it a versatile choice for branding, editorial and visual communication.',
    links: [
      {
        label: 'DOWNLOAD TYPEFACE',
        url: 'https://www.dropbox.com/scl/fi/u02uqc4dqe7aamr9il6th/KrestSans.zip?rlkey=ing7unw23t7dy79az2ei0bepm&e=1&dl=0',
      },
    ],
    image: imageFor('krest'),
  },
]
