'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import styles from './Header.module.scss'
import { NAV_ITEMS } from './navData'
import { scrollToSection } from './scrollUtils'
import type { NavItem } from './navData'

// ── Desktop dropdown ──────────────────────────────────────────
function Dropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }, [])

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setOpen(false), 150)
  }, [])

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current) }, [])

  const handleClick = useCallback((href: string) => {
    scrollToSection(href)
    setOpen(false)
  }, [])

  if (!item.dropdown) {
    return (
      <button className={styles.navLink} onClick={() => handleClick(item.href)}>
        {item.label}
      </button>
    )
  }

  return (
    <div
      className={`${styles.dropdownWrap} ${open ? styles.dropdownOpen : ''}`}
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button className={styles.navLink} onClick={() => handleClick(item.href)}>
        {item.label}
        <ChevronDown size={13} className={styles.chevron} />
      </button>

      <div className={styles.dropdown} role="menu">
        <div className={styles.dropdownInner}>
          {item.dropdown.map((child) => (
            <button
              key={child.label}
              role="menuitem"
              className={styles.dropItem}
              onClick={() => handleClick(child.href)}
            >
              <span className={styles.dropIcon}>
                <child.icon size={16} />
              </span>
              <span className={styles.dropText}>
                <span className={styles.dropLabel}>
                  {child.label}
                  {child.badge && <span className={styles.dropBadge}>{child.badge}</span>}
                </span>
                <span className={styles.dropDesc}>{child.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Mobile accordion item ─────────────────────────────────────
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false)

  const handleClick = useCallback((href: string) => {
    scrollToSection(href)
    onClose()
  }, [onClose])

  if (!item.dropdown) {
    return (
      <button className={styles.mobileLink} onClick={() => handleClick(item.href)}>
        <item.icon size={16} className={styles.mobileLinkIcon} />
        {item.label}
      </button>
    )
  }

  return (
    <div className={styles.mobileGroup}>
      <button
        className={`${styles.mobileLink} ${styles.mobileLinkToggle}`}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <item.icon size={16} className={styles.mobileLinkIcon} />
        {item.label}
        <ChevronDown
          size={14}
          className={`${styles.mobileChevron} ${open ? styles.mobileChevronOpen : ''}`}
        />
      </button>

      {open && (
        <div className={styles.mobileDropdown}>
          {item.dropdown.map((child) => (
            <button
              key={child.label}
              className={styles.mobileDropItem}
              onClick={() => handleClick(child.href)}
            >
              <span className={styles.mobileDropIcon}><child.icon size={14} /></span>
              <span className={styles.mobileDropLabel}>
                {child.label}
                {child.badge && <span className={styles.dropBadge}>{child.badge}</span>}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Main Header ───────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLogoClick = useCallback(() => {
    scrollToSection('#home')
    setMenuOpen(false)
  }, [])

  const handleJoinClick = useCallback(() => {
    scrollToSection('#join')
    setMenuOpen(false)
  }, [])

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>

          {/* Logo */}
          <button className={styles.logo} onClick={handleLogoClick} aria-label="Go to home">
            <Image src="/logo.png" alt="LIVO Club" width={120} height={120} priority className={styles.logoImg} sizes="120px" />
            <div className={styles.logoText}>
              <span className={styles.logoName}>LIVO <span>Club</span></span>
              <span className={styles.logoSub}>Esports &amp; Sports</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className={styles.nav} aria-label="Main navigation">
            {NAV_ITEMS.map(item => (
              <Dropdown key={item.label} item={item} />
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.liveChip}>
              <span className={styles.liveDot} />
              <span>Season Active</span>
            </div>

            <button className={styles.ctaBtn} onClick={handleJoinClick}>
              <Zap size={14} />
              Join Now
            </button>

            <button
              className={`${styles.menuBtn} ${menuOpen ? styles.menuBtnOpen : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`${styles.mobileOverlay} ${menuOpen ? styles.mobileOverlayOpen : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileDrawer} ${menuOpen ? styles.mobileDrawerOpen : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className={styles.drawerHeader}>
          <button className={styles.logo} onClick={handleLogoClick} aria-label="Go to home">
            <Image src="/logo.png" alt="LIVO Club" width={88} height={88} className={styles.logoImg} sizes="88px" loading="lazy" />
            <div className={styles.logoText}>
              <span className={styles.logoName}>LIVO <span>Club</span></span>
            </div>
          </button>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map(item => (
            <MobileNavItem key={item.label} item={item} onClose={() => setMenuOpen(false)} />
          ))}
        </nav>

        <div className={styles.drawerFooter}>
          <button className={styles.drawerCta} onClick={handleJoinClick}>
            <Zap size={15} /> Join Now — It's Free
          </button>
        </div>
      </div>
    </>
  )
}
