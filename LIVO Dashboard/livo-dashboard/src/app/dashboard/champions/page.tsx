'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Champion } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, FormRow, Toolbar, ListCard, ListCardLeft, ListCardIcon, ListCardInfo, ListCardActions } from '@/components/ui'
import { Plus, Pencil, Trash2, X, Check, Crown } from 'lucide-react'

const rankColors = ['#FFB020', '#A8B6C9', '#CD7F32', '#00E6FF']
const empty = (): Champion => ({ id: Date.now().toString(), name: '', title: '', season: '', game: '', rank: 1 })

export default function ChampionsPage() {
  const [champions, setChampions] = useState<Champion[]>([])
  const [editing, setEditing] = useState<Champion | null>(null)
  const [isNew, setIsNew] = useState(false)

  const load = () => api.champions.get().then(d => setChampions(d as Champion[]))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (isNew) await api.champions.add(editing)
    else await api.champions.update(editing.id, editing)
    await load(); setEditing(null); setIsNew(false)
  }

  return (
    <div>
      <PageHeader title="Champions" desc="Manage the Hall of Fame section" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{champions.length} champions</div>
        <Btn onClick={() => { setEditing(empty()); setIsNew(true) }}><Plus size={15} /> Add Champion</Btn>
      </Toolbar>

      {editing && (
        <Card style={{ marginBottom: 24 }}>
          <CardTitle>{isNew ? 'New Champion' : 'Edit Champion'}</CardTitle>
          <FormRow cols={3}>
            <Field label="Name"><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Title"><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></Field>
            <Field label="Game"><input value={editing.game} onChange={e => setEditing({ ...editing, game: e.target.value })} /></Field>
            <Field label="Season"><input value={editing.season} onChange={e => setEditing({ ...editing, season: e.target.value })} /></Field>
            <Field label="Rank"><input type="number" value={editing.rank} onChange={e => setEditing({ ...editing, rank: Number(e.target.value) })} /></Field>
          </FormRow>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save}><Check size={14} /> Save</Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[...champions].sort((a, b) => a.rank - b.rank).map((c, i) => {
          const color = rankColors[i] ?? '#8b9ab5'
          return (
            <ListCard key={c.id}>
              <ListCardLeft>
                <ListCardIcon color={color}><Crown size={18} /></ListCardIcon>
                <ListCardInfo title={c.name} meta={<><span style={{ color }}>{c.title}</span><span style={{ color: 'var(--text-soft)', fontSize: '0.78rem' }}>{c.game} · {c.season}</span></>} />
              </ListCardLeft>
              <ListCardActions>
                <Btn variant="ghost" onClick={() => { setEditing(c); setIsNew(false) }}><Pencil size={14} /></Btn>
                <Btn variant="danger" onClick={async () => { await api.champions.remove(c.id); load() }}><Trash2 size={14} /></Btn>
              </ListCardActions>
            </ListCard>
          )
        })}
      </div>
    </div>
  )
}
