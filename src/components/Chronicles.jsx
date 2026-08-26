import React, { useState, useRef, useEffect } from 'react'
import './Chronicles.css'

const CHRONICLES = [
  {
    id: 'dawn-age',
    year: '12,000 BAC',
    title: 'The Dawn Age & First Men',
    subtitle: 'The Arrival & The Ancient Pact',
    sigil: '🌿',
    banner: 'The Arm of Dorne',
    quote: '"Before the dragons, before the iron swords, there were only the trees and the children."',
    content:
      'The First Men crossed the Arm of Dorne bearing bronze swords and leather shields. After centuries of bloody conflict, they carved a sacred peace with the Children of the Forest beneath the carved weirwoods of the Isle of Faces.',
    keyFigure: 'Brandon the Builder · The Green Men',
  },
  {
    id: 'long-night',
    year: '8,000 BAC',
    title: 'The Long Night',
    subtitle: 'The Darkness That Lasted a Generation',
    sigil: '❄️',
    banner: 'The Lands of Always Winter',
    quote: '"Thousands of years ago, there came a night that lasted a generation. Kings froze to death in their castles."',
    content:
      'A terrible winter enveloped the known world. In the pitch blackness, the Others emerged with cold blades and armies of the dead. Only the alliance of the Last Hero, the Night\'s Watch, and the raising of the 700-foot Wall preserved humanity.',
    keyFigure: 'The Last Hero · Azor Ahai',
  },
  {
    id: 'doom-valyria',
    year: '114 BAC',
    title: 'The Doom of Valyria',
    subtitle: 'The Cataclysm of Fourteen Flames',
    sigil: '🌋',
    banner: 'The Valyrian Peninsula',
    quote: '"In a single day and night, the greatest empire the world had ever seen melted into smoke and boiling sea."',
    content:
      'Every hill for five hundred miles split asunder. The Fourteen Flames erupted into the heavens, raining fire and dragonglass. Magic and civilization collapsed in hours, leaving only the Targaryens on Dragonstone as surviving dragonlords.',
    keyFigure: 'Daenys the Dreamer · Aenar Targaryen',
  },
  {
    id: 'aegons-conquest',
    year: '2 BAC - 1 AC',
    title: "Aegon's Conquest",
    subtitle: 'Six Kingdoms Melted into One',
    sigil: '👑',
    banner: "King's Landing",
    quote: '"There is only one king in Westeros now, and he sits upon a throne of swords."',
    content:
      'Aegon Targaryen and his sister-wives Visenya and Rhaenys set sail with Balerion, Vhagar, and Meraxes. Through the Field of Fire and the burning of Harrenhal, six kingdoms bent the knee, forging the Iron Throne from thousands of surrendered blades.',
    keyFigure: 'Aegon the Conqueror · Balerion the Dread',
  },
  {
    id: 'dance-dragons',
    year: '129 - 131 AC',
    title: 'Dance of the Dragons',
    subtitle: 'The Civil War of Greens and Blacks',
    sigil: '🐉',
    banner: 'The God\'s Eye',
    quote: '"It was a war fought in the clouds, where brother killed brother and dragons tore dragons from the sky."',
    content:
      'The disputed succession between Princess Rhaenyra and King Aegon II fractured the realm. The sky burned from Dragonstone to King\'s Landing. By the end, the Targaryen dynasty was shattered and the last great dragons lay dead in the ashes.',
    keyFigure: 'Rhaenyra Targaryen · Daemon Targaryen',
  },
  {
    id: 'roberts-rebellion',
    year: '281 - 283 AC',
    title: "Robert's Rebellion",
    subtitle: 'The Fall of the Dragon Kings',
    sigil: '⚡',
    banner: 'The Trident',
    quote: '"They told me that at the Battle of the Trident, Robert shattered Rhaegar\'s breastplate with a single blow of his warhammer."',
    content:
      'Sparked by the abduction of Lyanna Stark and the execution of Rickard and Brandon Stark by the Mad King Aerys II. Robert Baratheon, Eddard Stark, and Jon Arryn raised their banners, bringing three centuries of Targaryen rule to an end.',
    keyFigure: 'Robert Baratheon · Eddard Stark · Rhaegar Targaryen',
  },
]

const Chronicles = () => {
  const [activeEra, setActiveEra] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('chronicles-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="chronicles" ref={sectionRef} className="chronicles-section">
      <div className="chronicles-bg-gradient" />
      <div className="chronicles-grain" />

      {/* Header */}
      <header className="chronicles-header">
        <p className="chronicles-eyebrow">THE EPOCHS OF ICE AND FIRE</p>
        <div className="chronicles-ornament">
          <span className="chronicles-line" />
          <span className="chronicles-rune">📜</span>
          <span className="chronicles-line" />
        </div>
        <h2 className="chronicles-title">
          Chronicles of<br />
          <em>Westeros</em>
        </h2>
        <p className="chronicles-subtitle">
          Major historical epochs and cataclysms that shaped the known world over twelve millennia.
        </p>
      </header>

      {/* Timeline Navigation Bar */}
      <div className="chronicles-timeline-nav">
        {CHRONICLES.map((era, i) => (
          <button
            key={era.id}
            className={`timeline-dot-btn ${i === activeEra ? 'active' : ''}`}
            onClick={() => setActiveEra(i)}
          >
            <span className="dot-badge">{era.year}</span>
            <span className="dot-circle" />
            <span className="dot-title">{era.title.split('&')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Chronicle Showcase */}
      <div className="chronicles-content-wrap">
        <div className="chronicle-card">
          <div className="chronicle-card-header">
            <div className="chronicle-year-tag">
              <span>{CHRONICLES[activeEra].year}</span>
              <span className="tag-dot">✦</span>
              <span>{CHRONICLES[activeEra].banner}</span>
            </div>
            <span className="chronicle-sigil">{CHRONICLES[activeEra].sigil}</span>
          </div>

          <h3 className="chronicle-main-title">{CHRONICLES[activeEra].title}</h3>
          <p className="chronicle-sub-title">{CHRONICLES[activeEra].subtitle}</p>

          <blockquote className="chronicle-quote">
            {CHRONICLES[activeEra].quote}
          </blockquote>

          <p className="chronicle-body-text">{CHRONICLES[activeEra].content}</p>

          <div className="chronicle-footer-bar">
            <span className="figure-label">KEY FIGURES:</span>
            <span className="figure-val">{CHRONICLES[activeEra].keyFigure}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Chronicles
