import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '0 24px',
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(5,5,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px',
      }}>
        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Ino<span style={{ WebkitTextFillColor: '#f0f0ff', color: '#f0f0ff' }}>Void</span>
          </motion.div>
        </a>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex',
          gap: '36px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }} className="nav-links-desktop">
          {links.map(({ label, href }) => (
            <li key={href}>
              <motion.a
                href={href}
                whileHover={{ color: '#00f5ff' }}
                style={{
                  color: '#8892aa',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  fontFamily: "'Inter', sans-serif",
                  transition: 'color 0.2s ease',
                  textDecoration: 'none',
                }}
              >
                {label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,245,255,0.4)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
            color: '#fff',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: '0.88rem',
            textDecoration: 'none',
            display: 'none',
          }}
          className="nav-cta"
        >
          Let's Talk
        </motion.a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          style={{
            background: 'none',
            border: 'none',
            color: '#f0f0ff',
            cursor: 'pointer',
            display: 'none',
            padding: '8px',
          }}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(5,5,15,0.97)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <ul style={{
              listStyle: 'none',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}>
              {links.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: '#f0f0ff',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      fontFamily: "'Outfit', sans-serif",
                      textDecoration: 'none',
                    }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width:768px) {
          .nav-links-desktop { display:none !important; }
          .nav-hamburger { display:flex !important; }
        }
        @media (min-width:769px) {
          .nav-cta { display:inline-flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
