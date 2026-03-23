import { motion } from 'framer-motion'

export default function SectionHeading({ badge, title, highlight, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{ textAlign: 'center', marginBottom: '64px' }}
    >
      {badge && (
        <span style={{
          display: 'inline-block',
          padding: '6px 16px',
          borderRadius: '100px',
          background: 'rgba(0,245,255,0.1)',
          border: '1px solid rgba(0,245,255,0.25)',
          color: '#00f5ff',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: "'Outfit', sans-serif",
        }}>
          {badge}
        </span>
      )}
      <h2 style={{
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 800,
        color: '#f0f0ff',
        marginBottom: '16px',
        fontFamily: "'Outfit', sans-serif",
      }}>
        {title}{' '}
        {highlight && (
          <span style={{
            background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p style={{
          color: '#8892aa',
          fontSize: '1.05rem',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
