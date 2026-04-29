'use client'
import Image from 'next/image'
import Link from 'next/link'
import { GitBranch, Share2, Camera, Video, Mail, MapPin } from 'lucide-react'
import styles from './Footer.module.scss'

const links = {
  Club: ['About Us', 'Our Team', 'History', 'Partners'],
  Games: ['CS2', 'Chess', 'Ping Pong', 'Football'],
  Events: ['Tournaments', 'Workshops', 'Meetups', 'Archive'],
  Support: ['FAQ', 'Contact', 'Rules', 'Privacy Policy'],
}

const socials = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Share2, href: '#', label: 'Twitter' },
  { icon: Video, href: '#', label: 'YouTube' },
  { icon: GitBranch, href: '#', label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className="container">
        <div className={styles.main}>
          <div className={styles.brand}>
            <Link href="#home" className={styles.logoWrap}>
              <Image src="/logo.png" alt="LIVO Club" width={112} height={112} className={styles.logoImg} />
              <div>
                <div className={styles.logoName}>LIVO Club</div>
                <div className={styles.logoSub}>Esports &amp; Sports</div>
              </div>
            </Link>
            <p className={styles.brandDesc}>
              The official esports and sports club of the College of Computer Engineering Informatics.
              Compete. Connect. Conquer.
            </p>
            <div className={styles.contact}>
              <div className={styles.contactItem}>
                <Mail size={14} /> <span>iitcclub@university.edu</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={14} /> <span>LIVO Campus, Jordan</span>
              </div>
            </div>
            <div className={styles.socials}>
              {socials.map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} className={styles.social} aria-label={label}>
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category} className={styles.col}>
              <h4 className={styles.colTitle}>{category}</h4>
              <ul className={styles.colLinks}>
                {items.map(item => (
                  <li key={item}>
                    <Link href="#" className={styles.colLink}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} LIVO Club. All rights reserved.
          </p>
          <p className={styles.made}>
          </p>
        </div>
      </div>
    </footer>
  )
}
