import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Globe, CheckCircle, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import SectionHeading from '../ui/SectionHeading'
import { supabase } from '../../lib/supabase'

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '12px',
  color: '#f0f0ff',
  fontSize: '0.9rem',
  fontFamily: "'Inter', sans-serif",
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box',
}

const info = [
  { icon: Mail, label: 'Email', value: 'contact@inovoid.me', href: 'mailto:contact@inovoid.me' },
  { icon: Globe, label: 'Website', value: 'inovoid.me', href: 'https://inovoid.me' },
  { icon: MapPin, label: 'Location', value: 'Sri Lanka 🇱🇰', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setLoading(true)
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      }])
      if (error) throw error
      setSent(true)
      toast.success("Message sent! We'll get back to you soon.")
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send. Please email us directly at contact@inovoid.me')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" style={{ padding: '100px 24px', position: 'relative' }}>
      {/* glow */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '30%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
        <SectionHeading
          badge="Get In Touch"
          title="Let's Build"
          highlight="Together"
          subtitle="Have a project in mind? Drop us a message and we'll get back to you within 24 hours."
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Info panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '32px',
            }}>
              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#f0f0ff',
                marginBottom: '24px',
              }}>
                Contact Info
              </h3>
              {info.map(({ icon: Icon, label, value, href }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(0,245,255,0.08)',
                    border: '1px solid rgba(0,245,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00f5ff',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p style={{ color: '#4a5568', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>{label}</p>
                    {href
                      ? <a href={href} style={{ color: '#c8d0e0', fontSize: '0.9rem', textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.color = '#00f5ff'}
                          onMouseLeave={e => e.target.style.color = '#c8d0e0'}>{value}</a>
                      : <p style={{ color: '#c8d0e0', fontSize: '0.9rem' }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.06), rgba(124,58,237,0.08))',
              border: '1px solid rgba(0,245,255,0.15)',
              borderRadius: '20px',
              padding: '24px',
              textAlign: 'center',
            }}>
              <p style={{ color: '#8892aa', fontSize: '0.85rem', lineHeight: 1.7 }}>
                Typically respond within <strong style={{ color: '#00f5ff' }}>24 hours</strong>. For urgent projects, email us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#8892aa', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 500 }}>
                  Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#8892aa', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 500 }}>
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#8892aa', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 500 }}>
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#8892aa', fontSize: '0.8rem', marginBottom: '8px', fontWeight: 500 }}>
                Message *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project..."
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                onFocus={e => e.target.style.borderColor = 'rgba(0,245,255,0.4)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading || sent}
              whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(0,245,255,0.35)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                background: sent ? 'rgba(16,185,129,0.2)' : 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                border: sent ? '1px solid rgba(16,185,129,0.4)' : 'none',
                color: sent ? '#10b981' : '#fff',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: '1rem',
                cursor: loading ? 'wait' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              {sent ? <><CheckCircle size={20} /> Message Sent!</> : loading ? 'Sending...' : <><Send size={18} /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
