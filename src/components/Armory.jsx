import React, { useState, useRef, useEffect } from 'react'
import './Armory.css'

const WEAPONS = [
  {
    id: 'longclaw',
    name: 'Longclaw',
    type: 'Bastard Sword',
    house: 'House Stark & Mormont',
    origin: 'Valyrian Freehold',
    wielder: 'Jon Snow',
    length: '115 cm',
    sigil: '🐺',
    accentColor: '#8ea4b8',
    bgGradient: 'linear-gradient(135deg, rgba(14, 20, 28, 0.95), rgba(8, 12, 16, 0.98))',
    quote: '"The sword is made of Valyrian steel, spell-forged and dark. It keeps its edge forever."',
    description:
      'The ancestral weapon of House Mormont for five centuries. Bestowed upon Jon Snow by Lord Commander Jeor Mormont, its pommel was refashioned with a pale direwolf head carved from stone with eyes of red garnet.',
    stats: {
      sharpness: 98,
      legend: 96,
      balance: 94,
    },
  },
  {
    id: 'ice',
    name: 'Ice',
    type: 'Greatsword',
    house: 'House Stark',
    origin: 'Ancient Valyria',
    wielder: 'Eddard Stark',
    length: '175 cm',
    sigil: '⚔',
    accentColor: '#c8d4e0',
    bgGradient: 'linear-gradient(135deg, rgba(16, 22, 30, 0.95), rgba(6, 9, 14, 0.98))',
    quote: '"The man who passes the sentence should swing the sword."',
    description:
      'A massive two-handed greatsword as wide across as a man\'s hand and taller even than a teenage Bran. Forged 400 years before the Conquest, it was used primarily in ceremonies and justice executions.',
    stats: {
      sharpness: 95,
      legend: 99,
      balance: 88,
    },
  },
  {
    id: 'blackfyre',
    name: 'Blackfyre',
    type: 'Bastard Sword',
    house: 'House Targaryen',
    origin: 'Old Valyria',
    wielder: 'Aegon I Targaryen',
    length: '120 cm',
    sigil: '🐉',
    accentColor: '#c41e3a',
    bgGradient: 'linear-gradient(135deg, rgba(28, 8, 10, 0.95), rgba(12, 4, 6, 0.98))',
    quote: '"The blade of kings, carried in the conquest of the Seven Kingdoms."',
    description:
      'The ancestral Valyrian steel sword of House Targaryen. Carried by Aegon the Conqueror during his unification of Westeros. The blade came to symbolize the rightful king and sparked the legendary Blackfyre Rebellions.',
    stats: {
      sharpness: 99,
      legend: 100,
      balance: 96,
    },
  },
  {
    id: 'dark-sister',
    name: 'Dark Sister',
    type: 'Longsword',
    house: 'House Targaryen',
    origin: 'Pre-Conquest Valyria',
    wielder: 'Visenya & Daemon Targaryen',
    length: '105 cm',
    sigil: '🔥',
    accentColor: '#e04860',
    bgGradient: 'linear-gradient(135deg, rgba(24, 6, 8, 0.95), rgba(10, 3, 5, 0.98))',
    quote: '"Forged slender for a woman\'s hand, but thirsty for the blood of kings."',
    description:
      'One of two ancestral blades brought by Targaryens to Dragonstone. Wielded by Queen Visenya and later the Rogue Prince Daemon Targaryen during the Dance of the Dragons.',
    stats: {
      sharpness: 100,
      legend: 97,
      balance: 99,
    },
  },
  {
    id: 'catspaw',
    name: 'Catspaw Dagger',
    type: 'Curved Dagger',
    house: 'Valyrian Relic',
    origin: 'Valyrian Dragonlords',
    wielder: 'Arya Stark',
    length: '45 cm',
    sigil: '🗡',
    accentColor: '#c9a84c',
    bgGradient: 'linear-gradient(135deg, rgba(24, 18, 6, 0.95), rgba(10, 7, 2, 0.98))',
    quote: '"There is only one thing we say to Death: Not today."',
    description:
      'Crafted with a hilt of fine dragonbone and gold leaf around a Valyrian steel blade. Illustrated in ancient tomes of the Targaryen dynasty, it became the weapon that ended the Long Night in the Godswood.',
    stats: {
      sharpness: 97,
      legend: 98,
      balance: 95,
    },
  },
  {
    id: 'heartsbane',
    name: 'Heartsbane',
    type: 'Two-Handed Greatsword',
    house: 'House Tarly',
    origin: 'Valyrian Freehold',
    wielder: 'Randyll & Samwell Tarly',
    length: '165 cm',
    sigil: '🏹',
    accentColor: '#5a9e48',
    bgGradient: 'linear-gradient(135deg, rgba(8, 20, 8, 0.95), rgba(3, 10, 4, 0.98))',
    quote: '"Five hundred years this blade has defended the Reach."',
    description:
      'The ancestral Valyrian steel greatsword of House Tarly of Horn Hill. Kept mounted above the hearth for generations, it was reclaimed by Samwell Tarly and later wielded by Ser Jorah Mormont in battle.',
    stats: {
      sharpness: 96,
      legend: 92,
      balance: 90,
    },
  },
]

const Armory = () => {
  const [selectedWeapon, setSelectedWeapon] = useState(WEAPONS[0])
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('armory-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="armory" ref={sectionRef} className="armory-section">
      <div className="armory-bg-radial" />
      <div className="armory-grain" />

      {/* Header */}
      <header className="armory-header">
        <p className="armory-eyebrow">SPELL-FORGED IN DRAGONFIRE</p>
        <div className="armory-ornament">
          <span className="armory-line" />
          <span className="armory-rune">⚔</span>
          <span className="armory-line" />
        </div>
        <h2 className="armory-title">
          The Valyrian<br />
          <em>Armory</em>
        </h2>
        <p className="armory-subtitle">
          Blades of folded steel and forgotten sorcery, sharper than razor and lighter than iron.
        </p>
      </header>

      {/* Interactive Showcase Container */}
      <div className="armory-showcase">
        {/* Left Side: Weapon Selection Tabs */}
        <div className="armory-tabs">
          {WEAPONS.map((w) => (
            <button
              key={w.id}
              className={`armory-tab-btn ${selectedWeapon.id === w.id ? 'active' : ''}`}
              style={{ '--tab-accent': w.accentColor }}
              onClick={() => setSelectedWeapon(w)}
            >
              <span className="tab-sigil">{w.sigil}</span>
              <div className="tab-info">
                <span className="tab-name">{w.name}</span>
                <span className="tab-house">{w.house}</span>
              </div>
              <span className="tab-arrow">→</span>
            </button>
          ))}
        </div>

        {/* Right Side: Weapon Detailed Focus Card */}
        <div
          className="armory-focus-card"
          style={{
            '--focus-accent': selectedWeapon.accentColor,
            background: selectedWeapon.bgGradient,
          }}
        >
          {/* Card Ornaments */}
          <span className="armory-card-corner armory-corner-tl" />
          <span className="armory-card-corner armory-corner-tr" />
          <span className="armory-card-corner armory-corner-bl" />
          <span className="armory-card-corner armory-corner-br" />

          {/* Top Info Row */}
          <div className="focus-top-row">
            <div className="focus-tag-wrap">
              <span className="focus-tag">{selectedWeapon.type}</span>
              <span className="focus-origin">{selectedWeapon.origin}</span>
            </div>
            <span className="focus-sigil-icon">{selectedWeapon.sigil}</span>
          </div>

          <h3 className="focus-name">{selectedWeapon.name}</h3>
          <p className="focus-wielder">
            <span>Primary Wielder:</span> {selectedWeapon.wielder}
          </p>

          <blockquote className="focus-quote">
            {selectedWeapon.quote}
          </blockquote>

          <p className="focus-desc">{selectedWeapon.description}</p>

          {/* Stats Bar */}
          <div className="focus-stats-grid">
            <div className="stat-item">
              <div className="stat-label">
                <span>Sharpness</span>
                <span>{selectedWeapon.stats.sharpness}%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${selectedWeapon.stats.sharpness}%` }}
                />
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-label">
                <span>Legend Status</span>
                <span>{selectedWeapon.stats.legend}%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${selectedWeapon.stats.legend}%` }}
                />
              </div>
            </div>

            <div className="stat-item">
              <div className="stat-label">
                <span>Balance</span>
                <span>{selectedWeapon.stats.balance}%</span>
              </div>
              <div className="stat-bar-bg">
                <div
                  className="stat-bar-fill"
                  style={{ width: `${selectedWeapon.stats.balance}%` }}
                />
              </div>
            </div>
          </div>

          {/* Bottom Metas */}
          <div className="focus-bottom-meta">
            <div className="meta-box">
              <span className="meta-title">LENGTH</span>
              <span className="meta-val">{selectedWeapon.length}</span>
            </div>
            <div className="meta-box">
              <span className="meta-title">MATERIAL</span>
              <span className="meta-val">Valyrian Steel</span>
            </div>
            <div className="meta-box">
              <span className="meta-title">HOUSE</span>
              <span className="meta-val">{selectedWeapon.house}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Armory
