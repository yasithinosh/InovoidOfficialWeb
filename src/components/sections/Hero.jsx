import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, Zap } from 'lucide-react'
import ParticlesBg from '../ui/ParticlesBg'
import AnimatedButton from '../ui/AnimatedButton'

const words = ['Websites', 'Apps', 'Experiences', 'Solutions', 'Products']

function TypeWriter() {
  const ref = useRef(null)

  useEffect(() => {
    let wordIdx = 0
    let charIdx = 0
    let deleting = false
    let timer

    function type() {
      const current = words[wordIdx]
      if (!ref.current) return

      if (!deleting) {
        ref.current.textContent = current.slice(0, charIdx + 1)
        charIdx++
        if (charIdx === current.length) {
          deleting = true
          timer = setTimeout(type, 1800)
          return
        }
      } else {
        ref.current.textContent = current.slice(0, charIdx - 1)
        charIdx--
        if (charIdx === 0) {
          deleting = false
          wordIdx = (wordIdx + 1) % words.length
        }
      }
      timer = setTimeout(type, deleting ? 60 : 90)
    }

    timer = setTimeout(type, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span
      ref={ref}
      style={{
        background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        borderRight: '3px solid #00f5ff',
        paddingRight: '4px',
        animation: 'blink 1s step-end infinite',
      }}
    />
  )
}

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
}
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '120px 24px 60px',
      }}
    >
      {/* Radial glow orbs */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <ParticlesBg />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '900px', width: '100%' }}>
        <motion.div variants={stagger} initial="initial" animate="animate">
          {/* Badge */}
          <motion.div variants={fadeInUp}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 20px',
              borderRadius: '100px',
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid rgba(0,245,255,0.2)',
              color: '#00f5ff',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              fontFamily: "'Outfit', sans-serif",
              marginBottom: '32px',
            }}>
              <Zap size={14} />
              Next-Gen Digital Studio
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '8px',
              color: '#f0f0ff',
              letterSpacing: '-0.02em',
            }}
          >
            We Build Digital
          </motion.h1>
          <motion.h1
            variants={fadeInUp}
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '32px',
              letterSpacing: '-0.02em',
              minHeight: '1.2em',
            }}
          >
            <TypeWriter />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            style={{
              color: '#8892aa',
              fontSize: 'clamp(1rem, 2.5vw, 1.18rem)',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: 1.8,
            }}
          >
            InoVoid Development crafts high-performance websites, apps, and digital experiences that push the boundaries of what's possible.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <AnimatedButton href="#projects" variant="primary">
              <Code2 size={18} />
              View Projects
            </AnimatedButton>
            <AnimatedButton href="#contact" variant="outline">
              Let's Talk
              <ArrowRight size={18} />
            </AnimatedButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            style={{
              display: 'flex',
              gap: '48px',
              justifyContent: 'center',
              marginTop: '72px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '50+', label: 'Projects Delivered' },
              { value: '30+', label: 'Happy Clients' },
              { value: '3+', label: 'Years Building' },
            ].map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '2rem',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {value}
                </div>
                <div style={{ color: '#8892aa', fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: '#4a5568',
          fontSize: '0.75rem',
          zIndex: 1,
        }}
      >
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,245,255,0.5))',
        }} />
        scroll
      </motion.div>

      <style>{`@keyframes blink { 0%,100%{border-color:transparent} 50%{border-color:#00f5ff} }`}</style>
    </section>
  )
}
