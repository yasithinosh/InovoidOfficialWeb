import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import GalleryPage from './pages/GalleryPage'

/* ---- Loading Screen ---- */
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#05050f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        zIndex: 9999,
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 900,
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.02em',
        }}
      >
        InoVoid
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ color: '#4a5568', fontSize: '0.85rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}
      >
        Development
      </motion.div>

      {/* Progress bar */}
      <div style={{ width: '180px', height: '2px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.7, ease: 'easeInOut' }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #00f5ff, #7c3aed)', borderRadius: '2px' }}
        />
      </div>
    </motion.div>
  )
}

/* ---- Custom Cursor ---- */
function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let raf
    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = e => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    function loop() {
      if (dot.current) { dot.current.style.transform = `translate(${mx - 6}px, ${my - 6}px)` }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring.current) { ring.current.style.transform = `translate(${rx - 20}px, ${ry - 20}px)` }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div ref={dot} style={{
        position: 'fixed', top: 0, left: 0, width: '12px', height: '12px',
        background: '#00f5ff', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 10000, mixBlendMode: 'screen',
      }} />
      <div ref={ring} style={{
        position: 'fixed', top: 0, left: 0, width: '40px', height: '40px',
        border: '1px solid rgba(0,245,255,0.4)', borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999,
      }} />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <CustomCursor />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(10,10,26,0.95)',
            border: '1px solid rgba(0,245,255,0.2)',
            color: '#f0f0ff',
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}
