'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Game } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, Badge, FormRow, Toolbar, ListCard, ListCardLeft, ListCardIcon, ListCardInfo, ListCardActions } from '@/components/ui'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'

const empty = (): Game => ({ id: Date.now().toString(), name: '', category: '', players: '', color: '#00E6FF', emoji: '', image: '', desc: '', tags: [], activePlayers: 0, tournaments: 0 })

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([])
  const [editing, setEditing] = useState<Game | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [tagsInput, setTagsInput] = useState('')

  const load = () => api.games.get().then(d => setGames(d as Game[]))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    const g = { ...editing, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean) }
    if (isNew) await api.games.add(g)
    else await api.games.update(editing.id, g)
    await load(); setEditing(null); setIsNew(false)
  }

  const startEdit = (g: Game) => { setEditing(g); setTagsInput(g.tags.join(', ')); setIsNew(false) }

  return (
    <div>
      <PageHeader title="Games" desc="Manage all game disciplines shown on the website" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{games.length} games total</div>
        <Btn onClick={() => { setEditing(empty()); setTagsInput(''); setIsNew(true) }}><Plus size={15} /> Add Game</Btn>
      </Toolbar>

      {editing && (
        <Card style={{ marginBottom: 24 }}>
          <CardTitle>{isNew ? 'New Game' : 'Edit Game'}</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FormRow cols={3}>
              <Field label="ID (slug)"><input value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value })} disabled={!isNew} /></Field>
              <Field label="Name"><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></Field>
              <Field label="Category"><input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} /></Field>
            </FormRow>
            <FormRow cols={4}>
              <Field label="Players Format"><input value={editing.players} onChange={e => setEditing({ ...editing, players: e.target.value })} /></Field>
              <Field label="Active Players"><input type="number" value={editing.activePlayers} onChange={e => setEditing({ ...editing, activePlayers: Number(e.target.value) })} /></Field>
              <Field label="Tournaments"><input type="number" value={editing.tournaments} onChange={e => setEditing({ ...editing, tournaments: Number(e.target.value) })} /></Field>
              <Field label="Accent Color"><input type="color" value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} /></Field>
            </FormRow>
            <FormRow cols={2}>
              <Field label="Logo Image Path"><input value={editing.emoji} onChange={e => setEditing({ ...editing, emoji: e.target.value })} /></Field>
              <Field label="Background Image Path"><input value={editing.image} onChange={e => setEditing({ ...editing, image: e.target.value })} /></Field>
            </FormRow>
            <Field label="Description"><textarea rows={2} value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} /></Field>
            <Field label="Tags (comma separated)"><input value={tagsInput} onChange={e => setTagsInput(e.target.value)} /></Field>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save}><Check size={14} /> Save</Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {games.map(g => (
          <ListCard key={g.id}>
            <ListCardLeft>
              <ListCardIcon color={g.color}>{g.name[0]}</ListCardIcon>
              <ListCardInfo title={g.name} meta={<><Badge label={g.category} color={g.color} /><span style={{ fontSize: '0.78rem', color: 'var(--text-soft)' }}>{g.players} · {g.activePlayers} players · {g.tournaments} tournaments</span></>} />
            </ListCardLeft>
            <ListCardActions>
              <Btn variant="ghost" onClick={() => startEdit(g)}><Pencil size={14} /></Btn>
              <Btn variant="danger" onClick={async () => { await api.games.remove(g.id); load() }}><Trash2 size={14} /></Btn>
            </ListCardActions>
          </ListCard>
        ))}
      </div>
    </div>
  )
}
