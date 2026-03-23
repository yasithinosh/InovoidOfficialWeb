import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

const testimonials = [
  {
    name: 'Nimal Perera',
    role: 'CEO, TechStart LK',
    text: 'InoVoid delivered our platform in record time with exceptional quality. The attention to detail and communication throughout the project was outstanding.',
    rating: 5,
  },
  {
    name: 'Sasanka Silva',
    role: 'Founder, EduPath',
    text: 'Working with the InoVoid team was a game-changer. They transformed our ideas into a stunning, functional product that our users absolutely love.',
    rating: 5,
  },
  {
    name: 'Priya Jayawardena',
    role: 'CTO, FinWave',
    text: 'Brilliant engineers, creative problem-solvers, and truly reliable partners. Our fintech dashboard went from concept to live in just 6 weeks.',
    rating: 5,
  },
  {
    name: 'Ravindu Kumara',
    role: 'Director, GreenEarth NGO',
    text: 'They built our environmental monitoring system with precision and passion. The IoT dashboard is beautiful and our team loves using it.',
    rating: 5,
  },
  {
    name: 'Amali Fernando',
    role: 'Product Manager, ShopNow',
    text: 'From UI design to backend infrastructure — InoVoid handled everything flawlessly. Highly recommended for any serious digital project.',
    rating: 5,
  },
]

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#f59e0b', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{
      padding: '100px 24px',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.03) 50%, transparent)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          badge="Testimonials"
          title="What Clients"
          highlight="Say"
          subtitle="Don't just take our word for it — hear from the people we've built for."
        />
      </div>

      {/* Marquee track */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* fade edges */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          background: 'linear-gradient(to right, #05050f, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '100px',
          background: 'linear-gradient(to left, #05050f, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          style={{ display: 'flex', gap: '24px', width: 'max-content' }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} style={{
              width: '340px',
              flexShrink: 0,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '28px',
            }}>
              <Stars count={t.rating} />
              <p style={{
                color: '#c8d0e0',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                marginBottom: '20px',
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: '1rem',
                  flexShrink: 0,
                }}>
                  {t.name[0]}
                </div>
                <div>
                  <div style={{ color: '#f0f0ff', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Outfit', sans-serif" }}>
                    {t.name}
                  </div>
                  <div style={{ color: '#4a5568', fontSize: '0.78rem' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
