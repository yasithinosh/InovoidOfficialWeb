import { motion } from 'framer-motion'
import { Github, Twitter, Instagram, Linkedin, Mail, Globe } from 'lucide-react'

const socials = [
  { icon: Github, href: 'https://github.com/inovoid', label: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/inovoid', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/inovoid', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/inovoid', label: 'LinkedIn' },
]

const footerLinks = {
  'Company': ['About', 'Services', 'Projects', 'Gallery'],
  'Contact': ['contact@inovoid.me', 'inovoid.me'],
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 24px 40px',
      background: 'rgba(5,5,15,0.8)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '60px',
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '16px',
            }}>
              InoVoid
            </div>
            <p style={{ color: '#8892aa', lineHeight: 1.7, fontSize: '0.9rem', maxWidth: '240px' }}>
              Building the future, one pixel at a time. We create stunning digital experiences.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, color: '#00f5ff' }}
                  style={{
                    color: '#4a5568',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.04)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h4 style={{
                color: '#f0f0ff',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                marginBottom: '20px',
                fontSize: '1rem',
              }}>
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a
                      href={item.includes('@') ? `mailto:${item}` : item.includes('.') ? `https://${item}` : `#${item.toLowerCase()}`}
                      style={{
                        color: '#8892aa',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s ease',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={e => e.target.style.color = '#00f5ff'}
                      onMouseLeave={e => e.target.style.color = '#8892aa'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: '#4a5568', fontSize: '0.85rem' }}>
            © {new Date().getFullYear()} InoVoid Development. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4a5568', fontSize: '0.85rem' }}>
            <Globe size={14} />
            <span>inovoid.me</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
