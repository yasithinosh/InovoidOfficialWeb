import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Images, ArrowLeft, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useGallery } from '../hooks/useGallery'

const demoItems = [
  { id: 1, title: 'Team Hackathon 2024', category: 'Events', media_url: null, description: 'Our team competing at the national hackathon' },
  { id: 2, title: 'Award Recognition', category: 'Achievements', media_url: null, description: 'Best Digital Startup award from ICTA Sri Lanka' },
  { id: 3, title: 'Office Open Day', category: 'Team', media_url: null, description: 'Behind the scenes at InoVoid HQ' },
  { id: 4, title: 'Product Launch ShopX', category: 'Events', media_url: null, description: 'Launch event for our ShopX e-commerce platform' },
  { id: 5, title: 'Best Startup Award 2023', category: 'Achievements', media_url: null, description: 'Recognized among top 10 startups in Sri Lanka' },
  { id: 6, title: 'Design Sprint Week', category: 'Team', media_url: null, description: 'Week-long design thinking workshop' },
  { id: 7, title: 'Client Demo Day', category: 'Events', media_url: null, description: 'Presenting live demos to enterprise clients' },
  { id: 8, title: 'Tech Conference 2024', category: 'Events', media_url: null, description: 'Speaking at the national IT conference' },
  { id: 9, title: 'Innovation Grant', category: 'Achievements', media_url: null, description: 'Received SLIIT innovation grant for IoT project' },
  { id: 10, title: 'Team Building Day', category: 'Team', media_url: null, description: 'Annual team retreat and activities' },
  { id: 11, title: 'University Workshop', category: 'Events', media_url: null, description: 'Tech workshop for SLIIT undergrads' },
  { id: 12, title: 'UX Excellence Award', category: 'Achievements', media_url: null, description: 'Awarded for outstanding UX design' },
]

const COLORS = ['#00f5ff', '#7c3aed', '#ec4899', '#f59e0b', '#10b981', '#6366f1']
const categories = ['All', 'Events', 'Achievements', 'Team']

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
      padding: '12px',
    }}>
      <Images size={24} color={COLORS[idx % COLORS.length]} opacity={0.6} />
      <span style={{ color: '#8892aa', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.4 }}>{title}</span>
    </div>
  )
}

export default function GalleryPage() {
  const { items: live } = useGallery()
  const items = live.length > 0 ? live : demoItems
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory)

  function openLightbox(idx) { setLightboxIdx(idx) }
  function closeLightbox() { setLightboxIdx(null) }
  function prevItem() { setLightboxIdx(i => (i - 1 + filtered.length) % filtered.length) }
  function nextItem() { setLightboxIdx(i => (i + 1) % filtered.length) }

  return (
    <div style={{ minHeight: '100vh', background: '#05050f', paddingTop: '90px' }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 20px',
      }}>
        <Link to="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: '#8892aa',
          textDecoration: 'none',
          fontSize: '0.85rem',
          marginBottom: '32px',
          transition: 'color 0.2s ease',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#00f5ff'}
          onMouseLeave={e => e.currentTarget.style.color = '#8892aa'}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
          }}>
            Gallery
          </span>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            marginBottom: '12px',
          }}>
            Our{' '}
            <span style={{
              background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Journey</span>
          </h1>
          <p style={{ color: '#8892aa', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.7, marginBottom: '40px' }}>
            A visual timeline of our events, achievements, and team moments.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          <Filter size={16} color="#4a5568" style={{ alignSelf: 'center', marginRight: '4px' }} />
          {categories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 20px',
                borderRadius: '100px',
                border: `1px solid ${activeCategory === cat ? '#00f5ff' : 'rgba(255,255,255,0.1)'}`,
                background: activeCategory === cat ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.03)',
                color: activeCategory === cat ? '#00f5ff' : '#8892aa',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
              {activeCategory === cat && (
                <span style={{ marginLeft: '8px', opacity: 0.8, fontSize: '0.75rem' }}>
                  ({filtered.length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '16px',
            paddingBottom: '80px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => {
              const origIdx = items.indexOf(item)
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => openLightbox(i)}
                  style={{
                    height: (i % 5 === 0 || i % 5 === 3) ? '260px' : '200px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.07)',
                    position: 'relative',
                    background: '#0a0a1a',
                  }}
                >
                  {item.media_url
                    ? <img src={item.media_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <PlaceholderImg title={item.title} idx={origIdx} />
                  }
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5,5,15,0.9), transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '0'}
                  >
                    <p style={{ color: '#f0f0ff', fontWeight: 600, fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem', marginBottom: '4px' }}>{item.title}</p>
                    <span style={{ color: '#00f5ff', fontSize: '0.72rem', fontWeight: 600 }}>{item.category}</span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.93)',
              backdropFilter: 'blur(16px)',
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <div onClick={e => e.stopPropagation()} style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ height: '520px', maxHeight: '70vh', background: '#111' }}>
                {filtered[lightboxIdx]?.media_url
                  ? <img src={filtered[lightboxIdx].media_url} alt={filtered[lightboxIdx].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <PlaceholderImg title={filtered[lightboxIdx]?.title} idx={lightboxIdx} />
                }
              </div>
              <div style={{
                background: 'rgba(5,5,15,0.97)',
                padding: '20px 28px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                <div>
                  <h4 style={{ color: '#f0f0ff', fontFamily: "'Outfit', sans-serif", fontWeight: 700 }}>
                    {filtered[lightboxIdx]?.title}
                  </h4>
                  <p style={{ color: '#8892aa', fontSize: '0.82rem' }}>{filtered[lightboxIdx]?.description}</p>
                  <span style={{ color: '#00f5ff', fontSize: '0.78rem', fontWeight: 600 }}>{filtered[lightboxIdx]?.category}</span>
                </div>
                <span style={{ color: '#4a5568', fontSize: '0.85rem' }}>
                  {lightboxIdx + 1} / {filtered.length}
                </span>
              </div>
              {/* Controls */}
              <button onClick={closeLightbox} style={{
                position: 'absolute', top: '12px', right: '12px',
                background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#f0f0ff', width: '40px', height: '40px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <X size={18} />
              </button>
              <button onClick={prevItem} style={{
                position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#f0f0ff', width: '44px', height: '44px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <ChevronLeft size={22} />
              </button>
              <button onClick={nextItem} style={{
                position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.15)',
                color: '#f0f0ff', width: '44px', height: '44px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
