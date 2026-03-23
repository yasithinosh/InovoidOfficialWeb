import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', style = {}, delay = 0, hover = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={hover ? { y: -8, boxShadow: '0 20px 60px rgba(0,245,255,0.12)' } : undefined}
      className={className}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
