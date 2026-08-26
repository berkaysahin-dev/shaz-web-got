import React from 'react'
import './Footer.css'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="got-footer">
      {/* Background ambient lighting */}
      <div className="footer-bg-glow" />
      <div className="footer-grain" />

      <div className="footer-inner">
        {/* Top Ornament */}
        <div className="footer-top-ornament">
          <span className="footer-ornament-line" />
          <div className="footer-crest">
            <span className="footer-crest-symbol">♔</span>
          </div>
          <span className="footer-ornament-line" />
        </div>

        {/* Brand Section */}
        <div className="footer-brand-section">
          <h2 className="footer-brand-title">THE IRON THRONE</h2>
          <p className="footer-brand-tagline">
            "When you play the game of thrones, you win or you die. There is no middle ground."
          </p>
        </div>

        {/* Action Links & Motto */}
        <div className="footer-links-row">
          <a href="#houses" className="footer-link-btn">
            Explore Great Houses
          </a>
          <a href="#armory" className="footer-link-btn">
            Valyrian Armory
          </a>
          <a href="#chronicles" className="footer-link-btn">
            Ancient Chronicles
          </a>
          <button onClick={scrollToTop} className="footer-scroll-top-btn" title="Return to Top">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            <span>Ascend to Top</span>
          </button>
        </div>

        {/* Lore Divider */}
        <div className="footer-lore-divider">
          <span>Winter Is Coming</span>
          <span className="lore-dot">◆</span>
          <span>Fire and Blood</span>
          <span className="lore-dot">◆</span>
          <span>Hear Me Roar</span>
          <span className="lore-dot">◆</span>
          <span>Ours Is The Fury</span>
          <span className="lore-dot">◆</span>
          <span>Growing Strong</span>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            Crafted with passion by{' '}
            <a href="https://shazvision.com" target="_blank" rel="noopener noreferrer">
              Shaz Vision
            </a>{' '}
            ·{' '}
            <a href="https://shazvision.com" target="_blank" rel="noopener noreferrer">
              shazvision.com
            </a>
          </p>
          <p className="footer-disclaimer">
            Game of Thrones and all related lore elements are inspired by the works of George R.R. Martin and HBO.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
