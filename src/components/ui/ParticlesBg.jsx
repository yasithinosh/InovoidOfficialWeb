import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticlesBg() {
  const [inited, setInited] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => setInited(true))
  }, [])

  const options = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: { enable: true },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: ['#00f5ff', '#7c3aed', '#ec4899'] },
      links: {
        color: '#00f5ff',
        distance: 150,
        enable: true,
        opacity: 0.12,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: { default: 'bounce' },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: { density: { enable: true, area: 900 }, value: 80 },
      opacity: { value: { min: 0.2, max: 0.6 } },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  }

  if (!inited) return null

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  )
}
