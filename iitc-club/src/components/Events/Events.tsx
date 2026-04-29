'use client'
import { useEffect, useState } from 'react'
import { Calendar, MapPin, Users, ChevronRight } from 'lucide-react'
import styles from './Events.module.scss'

interface Event {
  id: string
  day: string
  month: string
  title: string
  mode: string
  type: string
  spots: string
  color: string
}

const FALLBACK: Event[] = [
  { id: '1', day: '15', month: 'Feb', title: 'CS2 Spring Championship', mode: 'Online', type: 'FPS', spots: '32 Teams', color: '#FF6B35' },
  { id: '2', day: '22', month: 'Feb', title: 'Chess Grand Prix', mode: 'On-Campus', type: 'Strategy', spots: '64 Players', color: '#7A3CFF' },
  { id: '3', day: '01', month: 'Mar', title: 'Ping Pong Open', mode: 'On-Campus', type: 'Sports', spots: '48 Players', color: '#00FFD5' },
  { id: '4', day: '10', month: 'Mar', title: 'Football League S2', mode: 'On-Campus', type: 'Sports', spots: '8 Teams', color: '#19E28F' },
]

export default function Events() {
  const [events, setEvents] = useState<Event[]>(FALLBACK)

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1'
    fetch(`${base}/events`)
      .then(r => r.json())
      .then(json => {
        const data = json?.data ?? json
        if (Array.isArray(data) && data.length > 0) setEvents(data)
      })
      .catch(() => {/* keep fallback */})
  }, [])

  return (
    <section className={styles.section} id="events">
      <div className="container">
        <div className={styles.header}>
          <div className="section-badge">
            <Calendar size={13} /> Upcoming Events
          </div>
          <h2 className={styles.title}>
            Don't Miss the <span className="gradient-text">Next Battle</span>
          </h2>
          <p className={styles.sub}>Register early — spots fill up fast.</p>
        </div>

        <div className={styles.grid}>
          {events.map((ev) => (
            <div key={ev.id} className={styles.card} style={{ '--accent': ev.color } as React.CSSProperties}>
              <div className={styles.dateBox}>
                <span className={styles.day}>{ev.day}</span>
                <span className={styles.month}>{ev.month}</span>
              </div>

              <div className={styles.body}>
                <div className={styles.tags}>
                  <span className={styles.tag} style={{ color: ev.color, borderColor: `${ev.color}33`, background: `${ev.color}11` }}>
                    {ev.type}
                  </span>
                  <span className={styles.modeTag}>
                    <MapPin size={11} /> {ev.mode}
                  </span>
                </div>
                <h3 className={styles.eventTitle}>{ev.title}</h3>
                <div className={styles.spots}>
                  <Users size={13} /> {ev.spots}
                </div>
              </div>

              <button className={styles.registerBtn}>
                Register <ChevronRight size={15} />
              </button>

              <div className={styles.accentLine} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
