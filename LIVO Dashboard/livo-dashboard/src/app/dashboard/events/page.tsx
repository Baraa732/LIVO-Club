'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Event } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, Badge, FormRow, Toolbar, ListCard, ListCardLeft, ListCardIcon, ListCardInfo, ListCardActions } from '@/components/ui'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

const empty = (): Event => ({ id: Date.now().toString(), day: '', month: '', title: '', mode: 'Online', type: '', spots: '', color: '#00E6FF' })

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [editing, setEditing] = useState<Event | null>(null)
  const [isNew, setIsNew] = useState(false)

  const load = () => api.events.get().then(d => setEvents(d as Event[]))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (isNew) await api.events.add(editing)
    else await api.events.update(editing.id, editing)
    await load(); setEditing(null); setIsNew(false)
  }

  return (
    <div>
      <PageHeader title="Events" desc="Manage upcoming events displayed on the website" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{events.length} events total</div>
        <Btn onClick={() => { setEditing(empty()); setIsNew(true) }}><Plus size={15} /> Add Event</Btn>
      </Toolbar>

      {editing && (
        <Card style={{ marginBottom: 24 }}>
          <CardTitle>{isNew ? 'New Event' : 'Edit Event'}</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Title"><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></Field>
            <FormRow cols={3}>
              <Field label="Day"><input value={editing.day} onChange={e => setEditing({ ...editing, day: e.target.value })} /></Field>
              <Field label="Month"><input value={editing.month} onChange={e => setEditing({ ...editing, month: e.target.value })} /></Field>
              <Field label="Type"><input value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })} /></Field>
            </FormRow>
            <FormRow cols={3}>
              <Field label="Mode">
                <select value={editing.mode} onChange={e => setEditing({ ...editing, mode: e.target.value })}>
                  <option>Online</option><option>On-Campus</option><option>Hybrid</option>
                </select>
              </Field>
              <Field label="Spots"><input value={editing.spots} onChange={e => setEditing({ ...editing, spots: e.target.value })} /></Field>
              <Field label="Accent Color"><input type="color" value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} /></Field>
            </FormRow>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save}><Check size={14} /> Save</Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {events.map(ev => (
          <ListCard key={ev.id}>
            <ListCardLeft>
              <ListCardIcon color={ev.color}>
                <div style={{ textAlign: 'center', lineHeight: 1 }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{ev.day}</div>
                  <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{ev.month}</div>
                </div>
              </ListCardIcon>
              <ListCardInfo title={ev.title} meta={<><Badge label={ev.type} color={ev.color} /><Badge label={ev.mode} color="#8b9ab5" /><span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>{ev.spots}</span></>} />
            </ListCardLeft>
            <ListCardActions>
              <Btn variant="ghost" onClick={() => { setEditing(ev); setIsNew(false) }}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={async () => { await api.events.remove(ev.id); load() }}><Trash2 size={14} /></Btn>
            </ListCardActions>
          </ListCard>
        ))}
      </div>
    </div>
  )
}
