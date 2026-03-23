import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'

const techStack = [
  'React', 'Next.js', 'Node.js', 'Python', 'TypeScript',
  'PostgreSQL', 'Supabase', 'Docker', 'Vercel', 'Figma',
  'TailwindCSS', 'GraphQL', 'AWS', 'Firebase', 'Flutter',
]

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let current = 0
        const step = target / 60
        const id = setInterval(() => {
          current = Math.min(current + step, target)
          setCount(Math.round(current))
          if (current >= target) clearInterval(id)
        }, 25)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref} style={{
      fontFamily: "'Outfit', sans-serif",
      fontSize: 'clamp(2rem, 4vw, 2.8rem)',
      fontWeight: 800,
      background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {count}{suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" style={{ padding: '100px 24px', position: 'relative' }}>
      {/* faint grid lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <SectionHeading
          badge="About Us"
          title="Who We"
          highlight="Are"
          subtitle="We're a passionate team of developers and designers building the digital future from Sri Lanka to the world."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '64px',
        }}>
          {[
            { label: 'Projects Delivered', value: 50, suffix: '+' },
            { label: 'Happy Clients', value: 30, suffix: '+' },
            { label: 'Years of Experience', value: 3, suffix: '+' },
            { label: 'Tech Stack Size', value: 15, suffix: '+' },
          ].map(({ label, value, suffix }, i) => (
            <GlassCard key={label} delay={i * 0.1} style={{ textAlign: 'center', padding: '40px 24px' }}>
              <Counter target={value} suffix={suffix} />
              <p style={{ color: '#8892aa', marginTop: '8px', fontSize: '0.9rem' }}>{label}</p>
            </GlassCard>
          ))}
        </div>

        {/* Story + tech */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}>
          <GlassCard delay={0}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              marginBottom: '16px',
              color: '#f0f0ff',
            }}>
              Our Story
            </h3>
            <p style={{ color: '#8892aa', lineHeight: 1.8, marginBottom: '16px' }}>
              InoVoid Development was born from a simple idea: technology should feel magical. We combine cutting-edge engineering with thoughtful design to create digital products that people love.
            </p>
            <p style={{ color: '#8892aa', lineHeight: 1.8 }}>
              From sleek startup MVPs to enterprise-grade platforms, we deliver solutions that scale — built with clean code, fast performance, and outstanding user experiences.
            </p>
          </GlassCard>

          <GlassCard delay={0.15}>
            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              marginBottom: '20px',
              color: '#f0f0ff',
            }}>
              Tech Stack
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.08, borderColor: 'rgba(0,245,255,0.5)', color: '#00f5ff' }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: 'rgba(0,245,255,0.05)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    color: '#8892aa',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    cursor: 'default',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
