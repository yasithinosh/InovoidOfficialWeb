import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Tag, Loader2 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import AnimatedButton from '../ui/AnimatedButton'
import { useProjects } from '../../hooks/useProjects'

/* ---- Static demo data (shown when Supabase has no projects yet) ---- */
const demoProjects = [
  {
    id: 1,
    name: 'InoVoid Portal',
    description: 'A full-stack SaaS dashboard with real-time analytics, user management, and subscription billing.',
    live_url: 'https://portal.inovoid.me',
    github_url: 'https://github.com/inovoid',
    thumbnail_url: null,
    tags: ['React', 'Node.js', 'PostgreSQL'],
    featured: true,
  },
  {
    id: 2,
    name: 'ShopX E-Commerce',
    description: 'Modern e-commerce platform with cart, payments via PayHere, and order tracking built on Next.js.',
    live_url: 'https://shopx.inovoid.me',
    github_url: null,
    thumbnail_url: null,
    tags: ['Next.js', 'Supabase', 'PayHere'],
  },
  {
    id: 3,
    name: 'EduSync LMS',
    description: 'Learning management system with live classes, quizzes, progress tracking and a mobile app.',
    live_url: 'https://edusync.inovoid.me',
    github_url: null,
    thumbnail_url: null,
    tags: ['React', 'Flutter', 'Firebase'],
  },
  {
    id: 4,
    name: 'GreenTrack IoT',
    description: 'Real-time environmental sensor monitoring platform connected with AWS IoT Core and live dashboards.',
    live_url: null,
    github_url: 'https://github.com/inovoid',
    thumbnail_url: null,
    tags: ['IoT', 'AWS', 'React', 'Python'],
  },
  {
    id: 5,
    name: 'AgriAI Assistant',
    description: 'AI-powered crop disease detection app using computer vision and a Flutter mobile interface.',
    live_url: 'https://agriai.inovoid.me',
    github_url: null,
    thumbnail_url: null,
    tags: ['Python', 'TensorFlow', 'Flutter'],
  },
  {
    id: 6,
    name: 'Eventify Platform',
    description: 'Event ticketing and management platform with QR-code scanning, seat selection, and live streams.',
    live_url: 'https://eventify.inovoid.me',
    github_url: null,
    thumbnail_url: null,
    tags: ['React', 'Node.js', 'Stripe'],
  },
]

const ALL = 'All'

function tagColors(tag) {
  const map = {
    React: '#00f5ff', 'Next.js': '#7c3aed', 'Node.js': '#10b981',
    PostgreSQL: '#6366f1', Supabase: '#3ecf8e', PayHere: '#f59e0b',
    Flutter: '#54c5f8', Firebase: '#ffca28', Python: '#f59e0b',
    AWS: '#ff9900', IoT: '#ec4899', TensorFlow: '#ff6f00',
    Stripe: '#635bff', Docker: '#2496ed', TypeScript: '#3178c6',
  }
  return map[tag] || '#8892aa'
}

export default function Projects() {
  const { projects: live, loading } = useProjects()
  const projects = live.length > 0 ? live : demoProjects

  const allTags = [ALL, ...new Set(projects.flatMap(p => p.tags || []))]
  const [active, setActive] = useState(ALL)

  const filtered = active === ALL ? projects : projects.filter(p => p.tags?.includes(active))

  return (
    <section id="projects" style={{ padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          badge="Portfolio"
          title="Live"
          highlight="Projects"
          subtitle="Real-world solutions we've built — click any card to see it live."
        />

        {/* Tag Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '48px',
        }}>
          {allTags.map(tag => (
            <motion.button
              key={tag}
              onClick={() => setActive(tag)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '8px 18px',
                borderRadius: '100px',
                border: `1px solid ${active === tag ? '#00f5ff' : 'rgba(255,255,255,0.1)'}`,
                background: active === tag ? 'rgba(0,245,255,0.12)' : 'rgba(255,255,255,0.03)',
                color: active === tag ? '#00f5ff' : '#8892aa',
                fontSize: '0.82rem',
                fontWeight: 600,
                fontFamily: "'Outfit', sans-serif",
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '60px' }}>
            <Loader2 size={32} color="#00f5ff" style={{ animation: 'spin 1s linear infinite' }} />
          </div>
        )}

        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(0,245,255,0.1)' }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'all 0.35s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  height: '180px',
                  background: `linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.12))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {project.thumbnail_url ? (
                    <img src={project.thumbnail_url} alt={project.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: '2.5rem',
                      background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      letterSpacing: '-0.03em',
                    }}>
                      {project.name.slice(0, 2)}
                    </div>
                  )}
                  {project.featured && (
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      background: 'rgba(0,245,255,0.15)',
                      border: '1px solid rgba(0,245,255,0.3)',
                      borderRadius: '6px',
                      color: '#00f5ff',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      fontFamily: "'Outfit', sans-serif",
                    }}>
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    color: '#f0f0ff',
                  }}>
                    {project.name}
                  </h3>
                  <p style={{ color: '#8892aa', fontSize: '0.87rem', lineHeight: 1.7, flex: 1 }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {project.tags?.map(tag => (
                      <span key={tag} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        background: `${tagColors(tag)}15`,
                        border: `1px solid ${tagColors(tag)}30`,
                        color: tagColors(tag),
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}>
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                        style={{
                          flex: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '10px',
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                          color: '#fff',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          fontFamily: "'Outfit', sans-serif",
                          textDecoration: 'none',
                          transition: 'opacity 0.2s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                        style={{
                          padding: '10px 16px',
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.1)',
                          background: 'rgba(255,255,255,0.04)',
                          color: '#8892aa',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#f0f0ff' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#8892aa' }}
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </section>
  )
}
