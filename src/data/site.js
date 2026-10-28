import aboutPhoto from '../assets/about/about-me.webp'

export const navLinks = [
  { label: 'HOME', href: '#home' },
  { label: 'WORK', href: '#work' },
  { label: 'ABOUT', href: '#about' },
]

export const contactHref = '#contact'

export const hero = {
  subtitle: 'Design Portfolio',
  tagline: ['Making Things Look Good,', 'Designed With Purpose.'],
  disciplines: ['BRANDING', 'WEBSITES', 'GRAPHIC DESIGN'],
  // Animated background: one drifting blob per colour, over the #111 page colour.
  gradient: ['#000000', '#1f1f1f', '#050505', '#1a1a1a', '#242424'],
}

export const socialLinks = [
  { label: 'Behance', href: 'https://www.behance.net/AshtonHarris' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ashtonlinked/' },
  { label: 'Email', href: 'mailto:ashtonharrisuk@gmail.com' },
]

export const about = {
  name: 'Ashton Harris',
  // One string per paragraph.
  bio: [
    "I'm Ashton, a graphic designer with a love for branding, identity design and web design. I love the process of turning ideas into designs, from developing the initial concept to refining the typography and finer details. I'm drawn to work with personality, combining creative thinking, bold visuals and distinctive design to make brands stand out.",
    "Outside of design, I love travelling, exploring new places and discovering new things. I'm naturally curious, always looking for inspiration in new places and experiences, and keen to keep learning, experimenting and getting better at what I do.",
  ],
  image: aboutPhoto,
  imageAlt: 'Ashton Harris smiling beside a turquoise lake with forested mountains behind',
}

export const contact = {
  heading: 'Get In Touch',
  blurb:
    "Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you. Drop me a message and let's see what we can create.",
  details: [
    { label: 'Where I’m From', value: 'United Kingdom' },
    { label: 'My Focus', value: 'Branding & Web' },
  ],
}

// Contact form submissions are emailed by Web3Forms (web3forms.com).
// The access key is safe to publish: it can only send to the email it was
// created for. Paste it in below; while empty the form shows a notice instead.
export const contactForm = {
  accessKey: '99d002df-805a-4ff7-89c7-9cf7e16d7fa8',
  subject: 'New message from your portfolio',
}
