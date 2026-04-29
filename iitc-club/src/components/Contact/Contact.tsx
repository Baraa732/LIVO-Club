'use client'
import { Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import styles from './Contact.module.scss'

const channels = [
  { icon: Mail,    label: 'Email',    value: 'iitcclub@university.edu',  desc: 'We reply within 24 hours'   },
  { icon: MapPin,  label: 'Location', value: 'LIVO Campus, Jordan',      desc: 'Building A, Room 204'       },
  { icon: Clock,   label: 'Hours',    value: 'Sun – Thu, 9AM – 5PM',     desc: 'During academic semester'   },
]

export default function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">
            <MessageSquare size={13} /> Contact
          </div>
          <h2 className={styles.title}>
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className={styles.sub}>Have a question or want to collaborate? We'd love to hear from you.</p>
        </div>

        <div className={styles.inner}>
          {/* Info column */}
          <div className={styles.info}>
            {channels.map(({ icon: Icon, label, value, desc }) => (
              <div key={label} className={styles.channel}>
                <div className={styles.channelIcon}><Icon size={18} /></div>
                <div>
                  <div className={styles.channelLabel}>{label}</div>
                  <div className={styles.channelValue}>{value}</div>
                  <div className={styles.channelDesc}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form column */}
          <form className={styles.form} onSubmit={e => e.preventDefault()}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} type="text" placeholder="Your full name" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Subject</label>
              <input className={styles.input} type="text" placeholder="What's this about?" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea className={styles.textarea} rows={5} placeholder="Tell us more..." />
            </div>
            <button type="submit" className={styles.submit}>
              <Send size={15} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
