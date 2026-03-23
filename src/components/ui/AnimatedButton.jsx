import { motion } from 'framer-motion'

export default function AnimatedButton({ children, variant = 'primary', onClick, href, className = '' }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 28px',
    borderRadius: '12px',
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    position: 'relative',
    overflow: 'hidden',
  }

  const styles = {
    primary: {
      ...base,
      background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
      color: '#fff',
      boxShadow: '0 0 20px rgba(0,245,255,0.3)',
    },
    outline: {
      ...base,
      background: 'transparent',
      color: '#00f5ff',
      border: '1px solid rgba(0,245,255,0.4)',
      boxShadow: 'inset 0 0 20px rgba(0,245,255,0.05)',
    },
    ghost: {
      ...base,
      background: 'rgba(255,255,255,0.05)',
      color: '#f0f0ff',
      border: '1px solid rgba(255,255,255,0.08)',
    },
  }

  const Component = href ? 'a' : 'button'
  const props = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick }

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: 'inline-block' }}
      className={className}
    >
      <Component style={styles[variant]} {...props}>
        {children}
      </Component>
    </motion.div>
  )
}
