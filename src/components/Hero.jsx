import React, { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 224

// ─── Chapter data ────────────────────────────────────────────────────────────
const CHAPTERS = [
  {
    id: 'prologue',
    progress: [0, 0.14],
    title: 'The Ancient Chronicles',
    subtitle: 'A SONG OF ICE AND FIRE',
    body: 'In the beginning, there were only the words of the Maesters — secrets sealed within ancient tomes, waiting for a hand brave enough to open them.',
    sigil: '✦',
  },
  {
    id: 'winterfell',
    progress: [0.14, 0.32],
    title: 'The North Remembers',
    subtitle: 'HOUSE STARK — WINTERFELL',
    body: 'Winter is coming. Beyond the ancient walls, the cold whispers of the North carry stories older than the Wall itself.',
    sigil: '⚔',
  },
  {
    id: 'westeros',
    progress: [0.32, 0.52],
    title: 'The Seven Kingdoms',
    subtitle: 'THE REALM OF WESTEROS',
    body: "From the Eyrie's clouded peaks to the red sands of Dorne — seven kingdoms, one throne, a thousand reasons to bleed.",
    sigil: '♜',
  },
  {
    id: 'kings-landing',
    progress: [0.52, 0.72],
    title: 'Where Crowns Are Won',
    subtitle: "KING'S LANDING — THE CAPITAL",
    body: 'The city that swallows kings whole. Gold and treachery perfume the air. Every smile here conceals a blade.',
    sigil: '👑',
  },
  {
    id: 'swords',
    progress: [0.72, 0.88],
    title: 'A Thousand Blades',
    subtitle: 'FORGED IN CONQUEST',
    body: 'One thousand swords, surrendered by enemies of Aegon the Conqueror. Melted. Reshaped. Made into something terrible and magnificent.',
    sigil: '⚒',
  },
  {
    id: 'throne',
    progress: [0.88, 1.0],
    title: 'The Iron Throne',
    subtitle: 'WHEN YOU PLAY THE GAME OF THRONES',
    body: 'You win — or you die.',
    sigil: '♔',
  },
]

const Hero = () => {
  const containerRef    = useRef(null)
  const stickyRef       = useRef(null)
  const canvasRef       = useRef(null)
  const overlayRef      = useRef(null)
  const titleRef        = useRef(null)
  const subtitleRef     = useRef(null)
  const bodyRef         = useRef(null)
  const sigilRef        = useRef(null)
  const progressRef     = useRef(null)
  const vignetteRef     = useRef(null)
  const chapterLabelRef = useRef(null)
  const runeBarRef      = useRef(null)

  const [activeChapter, setActiveChapter] = useState(0)
  const [loadPercent, setLoadPercent]     = useState(0)
  const [isReady, setIsReady]             = useState(false)

  const framesRef          = useRef([])
  const currentFrameRef    = useRef(0)
  const chapterTimelineRef = useRef(null)
  const prevChapter        = useRef(-1)

  // ─── Draw Frame on Canvas with Aspect-Ratio Cover ──────────────────────────
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = framesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight

    const hRatio = cw / iw
    const vRatio = ch / ih
    const ratio  = Math.max(hRatio, vRatio)

    const centerShiftX = (cw - iw * ratio) / 2
    const centerShiftY = (ch - ih * ratio) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, 0, 0, iw, ih, centerShiftX, centerShiftY, iw * ratio, ih * ratio)
    currentFrameRef.current = frameIndex
  }, [])

  // ─── Smooth Chapter Transitions ───────────────────────────────────────────
  const transitionChapter = (idx) => {
    if (prevChapter.current === idx) return
    prevChapter.current = idx
    setActiveChapter(idx)

    const ch = CHAPTERS[idx]
    if (!ch) return

    if (chapterTimelineRef.current) {
      chapterTimelineRef.current.kill()
    }

    const tl = gsap.timeline()
    chapterTimelineRef.current = tl

    // Fade out previous text
    tl.to([titleRef.current, subtitleRef.current, bodyRef.current, sigilRef.current], {
      y: -16,
      opacity: 0,
      duration: 0.22,
      ease: 'power2.in',
      stagger: 0.02,
      overwrite: 'auto',
    })
    // Swap content mid-transition
    .call(() => {
      if (titleRef.current)    titleRef.current.textContent    = ch.title
      if (subtitleRef.current) subtitleRef.current.textContent = ch.subtitle
      if (bodyRef.current)     bodyRef.current.textContent     = ch.body
      if (sigilRef.current)    sigilRef.current.textContent    = ch.sigil
    })
    // Fade in next text
    .fromTo(
      [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
      { y: 22, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.04, overwrite: 'auto' }
    )

    // Chapter badge label update
    if (chapterLabelRef.current) {
      chapterLabelRef.current.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(CHAPTERS.length).padStart(2, '0')}`
      gsap.fromTo(chapterLabelRef.current,
        { opacity: 0, x: 8 },
        { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' }
      )
    }
  }

  // ─── Preload Frames Sequence ──────────────────────────────────────────────
  useEffect(() => {
    let loadedCount = 0
    const images = []

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
      drawFrame(currentFrameRef.current)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    // Initialize first chapter texts
    const ch0 = CHAPTERS[0]
    if (titleRef.current)    titleRef.current.textContent    = ch0.title
    if (subtitleRef.current) subtitleRef.current.textContent = ch0.subtitle
    if (bodyRef.current)     bodyRef.current.textContent     = ch0.body
    if (sigilRef.current)    sigilRef.current.textContent    = ch0.sigil

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      const formattedNumber = String(i).padStart(4, '0')
      img.src = `/frames/frame_${formattedNumber}.webp`

      img.onload = () => {
        loadedCount++
        const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100)
        setLoadPercent(pct)

        if (i === 1) {
          drawFrame(0)
        }

        // When critical batch is loaded, allow interaction immediately
        if (loadedCount >= Math.min(30, TOTAL_FRAMES)) {
          setIsReady(true)
        }
      }
      images.push(img)
    }

    framesRef.current = images

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [drawFrame])

  // ─── GSAP ScrollTrigger Setup ─────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return

    // Pin the sticky wrapper across container height
    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top top',
      end:     'bottom bottom',
      pin:     stickyRef.current,
      pinSpacing: false,
      anticipatePin: 1,
    })

    // Scrub timeline for frame drawing + HUD feedback
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start:   'top top',
        end:     'bottom bottom',
        scrub:   0.4, // ultra-responsive buttery smooth scrub
        onUpdate: (self) => {
          const p = self.progress
          const frameIndex = Math.min(Math.floor(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)
          drawFrame(frameIndex)

          // Progress bar
          if (progressRef.current) {
            progressRef.current.style.width = `${p * 100}%`
          }

          // Chapter detection
          const idx = CHAPTERS.findIndex(c => p >= c.progress[0] && p < c.progress[1])
          const activeIdx = idx === -1 ? CHAPTERS.length - 1 : idx
          transitionChapter(activeIdx)

          // Vignette dynamic depth
          const vinInt = 0.55 + Math.sin(p * Math.PI) * 0.2
          if (vignetteRef.current) {
            vignetteRef.current.style.opacity = String(vinInt)
          }
        },
      },
    })

    // Overlay darkness progression
    const overlayTween = gsap.to(overlayRef.current, {
      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 60%)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    })

    // Rune bar decorative ticks entrance
    if (runeBarRef.current) {
      const ticks = runeBarRef.current.querySelectorAll('.rune-tick')
      gsap.fromTo(ticks,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1, opacity: 1, stagger: 0.04, duration: 0.5, ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 80%' }
        }
      )
    }

    // Initial entrance animation
    gsap.fromTo(
      [sigilRef.current, subtitleRef.current, titleRef.current, bodyRef.current],
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out', stagger: 0.08, delay: 0.2 }
    )

    return () => {
      scrubTl.kill()
      overlayTween.kill()
      pinTrigger.kill()
      if (chapterTimelineRef.current) {
        chapterTimelineRef.current.kill()
      }
    }
  }, [isReady, drawFrame])

  const scrollToHouses = () => {
    const el = document.getElementById('houses')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollNextChapter = () => {
    window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Loading screen ── */}
      <div className={`got-loading ${isReady ? 'hidden' : ''}`}>
        <div className="got-loading-logo">Game of Thrones</div>
        <div className="got-loading-sub">The Chronicles of Westeros</div>
        <div className="got-loading-bar-wrap">
          <div
            className="got-loading-bar-fill"
            style={{ width: `${loadPercent}%`, animation: 'none' }}
          />
        </div>
        <div className="got-loading-pct">{loadPercent}%</div>
      </div>

      {/* ── Main scroll container ── */}
      <div ref={containerRef} className="got-container">
        {/* ── Pinned sticky viewport ── */}
        <div ref={stickyRef} className="got-sticky">

          {/* Ultra-Smooth 60FPS Canvas */}
          <canvas
            ref={canvasRef}
            className="got-canvas"
          />

          {/* Visual Overlays */}
          <div ref={vignetteRef} className="got-vignette" />
          <div ref={overlayRef}  className="got-overlay" />
          <div className="got-grain" />

          {/* Corner Gothic Ornaments */}
          {['tl','tr','bl','br'].map(pos => (
            <div key={pos} className={`got-corner got-corner-${pos}`}>
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2 L2 20 M2 2 L20 2" stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.5"/>
                <path d="M2 2 L8 8" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.4"/>
                <rect x="1" y="1" width="4" height="4" fill="none" stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.6"/>
              </svg>
            </div>
          ))}

          {/* Top Nav */}
          <nav className="got-nav">
            <div className="got-nav-logo">Game of Thrones</div>

            <ul className="got-nav-links">
              <li><a href="#houses">Great Houses</a></li>
              <li><a href="#armory">Valyrian Armory</a></li>
              <li><a href="#chronicles">Chronicles</a></li>
            </ul>

            <button className="got-nav-explore-btn" onClick={scrollToHouses}>
              <span>Explore Realm</span>
              <svg viewBox="0 0 16 16" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M8 3v10M3 8l5 5 5-5"/>
              </svg>
            </button>
          </nav>

          {/* Decorative Rune Bar */}
          <div ref={runeBarRef} className="got-rune-bar">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="rune-tick" />
            ))}
          </div>

          {/* Dynamic Chapter Content */}
          <div className="got-content">
            <span ref={sigilRef} className="got-sigil" />
            <div className="got-divider">
              <div className="got-divider-line" />
              <div className="got-divider-diamond" />
              <div className="got-divider-line right" />
            </div>
            <span ref={subtitleRef} className="got-subtitle" />
            <h1 ref={titleRef} className="got-title" />
            <p ref={bodyRef} className="got-body" />
            <div className="got-cta-row">
              <button className="got-cta-btn" onClick={scrollNextChapter}>Begin the Journey</button>
              <button className="got-cta-ghost" onClick={scrollToHouses}>Explore the Realm</button>
            </div>
          </div>

          {/* Right Chapter Indicator */}
          <div className="got-right-panel">
            <div ref={chapterLabelRef} className="got-chapter-label">01 / 06</div>
            <div className="got-vert-line" />
            <div className="got-dots">
              {CHAPTERS.map((_, i) => (
                <div
                  key={i}
                  className={`got-dot ${i === activeChapter ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>

          {/* Scroll Hint */}
          <div className="got-scroll-hint" onClick={scrollNextChapter}>
            <span>Scroll</span>
            <div className="arrow" />
          </div>

          {/* Progress Bar */}
          <div className="got-progress-bar-wrap">
            <div ref={progressRef} className="got-progress-bar-fill" />
          </div>

        </div>{/* /sticky */}
      </div>{/* /container */}
    </>
  )
}

export default Hero