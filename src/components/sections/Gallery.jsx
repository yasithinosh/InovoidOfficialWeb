import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedButton from '../ui/AnimatedButton'
import { useGallery } from '../../hooks/useGallery'

/* Demo gallery items when Supabase has no data */
const demoItems = [
  { id: 1, title: 'Team Hackathon 2024', category: 'Events', media_url: null },
  { id: 2, title: 'Award Recognition', category: 'Achievements', media_url: null },
  { id: 3, title: 'Office Open Day', category: 'Team', media_url: null },
  { id: 4, title: 'Product Launch "ShopX"', category: 'Events', media_url: null },
  { id: 5, title: 'Best Startup Award', category: 'Achievements', media_url: null },
  { id: 6, title: 'Design Sprint Week', category: 'Team', media_url: null },
]

const COLORS = ['#00f5ff', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#6366f1']

function PlaceholderImg({ title, idx }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${COLORS[idx % COLORS.length]}15, ${COLORS[(idx + 2) % COLORS.length]}20)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '16px',
    }}>
      <Images size={28} color={COLORS[idx % COLORS.length]} opacity={0.6} />
      <span style={{
        color: '#8892aa',
        fontSize: '0.78rem',
        textAlign: 'center',
        lineHeight: 1.4,
        fontFamily: "'Inter', sans-serif",
      }}>
        {title}
      </span>
    </div>
  )
}

function Lightbox({ items, idx, onClose, onPrev, onNext }) {
  const item = items[idx]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(12px)',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative',
        maxWidth: '860px',
        width: '90vw',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ height: '500px', maxHeight: '70vh', background: '#111' }}>
          {item.media_url
            ? <img src={item.media_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <PlaceholderImg title={item.title} idx={idx} />
          }
        </div>
        <div style={{
          background: 'rgba(5,5,15,0.95)',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <h4 style={{ color: '#f0f0ff', fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>{item.title}</h4>
            <span style={{ color: '#00f5ff', fontSize: '0.8rem', fontWeight: 600 }}>{item.category}</span>
          </div>
          <span style={{ color: '#4a5568', fontSize: '0.85rem' }}>{idx + 1} / {items.length}</span>
        </div>
        {/* Controls */}
        {[
          { onClick: onClose, icon: <X size={20} />, pos: { top: '12px', right: '12px' } },
          { onClick: onPrev, icon: <ChevronLeft size={22} />, pos: { left: '12px', top: '50%', transform: 'translateY(-50%)' } },
          { onClick: onNext, icon: <ChevronRight size={22} />, pos: { right: '12px', top: '50%', transform: 'translateY(-50%)' } },
        ].map((btn, i) => (
          <button key={i} onClick={btn.onClick} style={{
            position: 'absolute',
            ...btn.pos,
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#f0f0ff',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            {btn.icon}
          </button>
        ))}
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { items: live } = useGallery()
  const items = live.length > 0 ? live : demoItems
  const preview = items.slice(0, 6)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  return (
    <section id="gallery" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          badge="Gallery"
          title="Our"
          highlight="Journey"
          subtitle="From events and achievements to team moments — captured in pixels."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {preview.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setLightboxIdx(i)}
              style={{
                height: i === 0 || i === 3 ? '260px' : '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(255,255,255,0.07)',
                position: 'relative',
              }}
            >
              {item.media_url
                ? <img src={item.media_url} alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <PlaceholderImg title={item.title} idx={i} />
              }
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5,5,15,0.8), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                <div>
                  <p style={{ color: '#f0f0ff', fontWeight: 600, fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem' }}>{item.title}</p>
                  <p style={{ color: '#00f5ff', fontSize: '0.75rem' }}>{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <AnimatedButton href="/gallery" variant="outline">
            <Images size={18} />
            View Full Gallery
          </AnimatedButton>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            items={preview}
            idx={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(i => (i - 1 + preview.length) % preview.length)}
            onNext={() => setLightboxIdx(i => (i + 1) % preview.length)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
