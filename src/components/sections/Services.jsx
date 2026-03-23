import { motion } from 'framer-motion'
import { Globe, Smartphone, Palette, Cpu, ShoppingCart, BarChart3 } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Blazing-fast, SEO-optimized websites and web apps built with modern React, Next.js, and Node.js.',
    color: '#00f5ff',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'Cross-platform mobile applications with React Native and Flutter that feel natively performant.',
    color: '#7c3aed',
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Visually stunning interfaces designed with Figma — focused on usability, aesthetics, and delight.',
    color: '#ec4899',
  },
  {
    icon: Cpu,
    title: 'IoT & Embedded',
    description: 'Smart devices and IoT solutions — from prototype firmware to full cloud connectivity.',
    color: '#f59e0b',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description: 'Full-featured online stores powered by scalable backends with seamless payment integration.',
    color: '#10b981',
  },
  {
    icon: BarChart3,
    title: 'SaaS Platforms',
    description: 'Scalable software-as-a-service platforms with auth, subscriptions, dashboards, and analytics.',
    color: '#6366f1',
  },
]

export default function Services() {
  return (
    <section id="services" style={{
      padding: '100px 24px',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent, rgba(124,58,237,0.04) 50%, transparent)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeading
          badge="What We Do"
          title="Our"
          highlight="Services"
          subtitle="From concept to launch — we handle every layer of your digital product."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
        }}>
          {services.map(({ icon: Icon, title, description, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -8,
                borderColor: `${color}40`,
                boxShadow: `0 20px 60px ${color}15`,
              }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '36px 28px',
                cursor: 'default',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                opacity: 0.6,
              }} />

              {/* Icon */}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: `${color}15`,
                border: `1px solid ${color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color,
              }}>
                <Icon size={26} />
              </div>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#f0f0ff',
                marginBottom: '10px',
              }}>
                {title}
              </h3>
              <p style={{ color: '#8892aa', lineHeight: 1.7, fontSize: '0.9rem' }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
