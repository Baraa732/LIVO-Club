'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Team, TeamStatus } from '@/lib/store'
import { PageHeader, Card, Field, Btn, Badge, FormRow, Toolbar } from '@/components/ui'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import uiStyles from '@/components/ui.module.scss'

const statusColors: Record<TeamStatus, string> = { Champion: '#FFB020', Qualified: '#19E28F', Pending: '#00E6FF', Eliminated: '#FF4D6D' }
const empty = (): Team => ({ rank: 0, name: '', game: 'CS2', players: 5, w: 0, l: 0, pts: 0, status: 'Pending' })

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [editing, setEditing] = useState<Team | null>(null)
  const [origRank, setOrigRank] = useState<number | null>(null)
  const [isNew, setIsNew] = useState(false)

  const load = () => api.teams.get().then(d => setTeams(d as Team[]))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (isNew) await api.teams.add(editing)
    else await api.teams.update(origRank!, editing)
    await load(); setEditing(null); setIsNew(false)
  }

  return (
    <div>
      <PageHeader title="Teams & Rankings" desc="Manage team standings and scores" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{teams.length} teams</div>
        <Btn onClick={() => { setEditing(empty()); setIsNew(true) }}><Plus size={15} /> Add Team</Btn>
      </Toolbar>

      {editing && (
        <Card style={{ marginBottom: 24 }}>
          <FormRow cols={4}>
            <Field label="Rank"><input type="number" value={editing.rank} onChange={e => setEditing({ ...editing, rank: Number(e.target.value) })} /></Field>
            <Field label="Team Name"><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Game"><input value={editing.game} onChange={e => setEditing({ ...editing, game: e.target.value })} /></Field>
            <Field label="Players"><input type="number" value={editing.players} onChange={e => setEditing({ ...editing, players: Number(e.target.value) })} /></Field>
            <Field label="Wins"><input type="number" value={editing.w} onChange={e => setEditing({ ...editing, w: Number(e.target.value) })} /></Field>
            <Field label="Losses"><input type="number" value={editing.l} onChange={e => setEditing({ ...editing, l: Number(e.target.value) })} /></Field>
            <Field label="Points"><input type="number" value={editing.pts} onChange={e => setEditing({ ...editing, pts: Number(e.target.value) })} /></Field>
            <Field label="Status">
              <select value={editing.status} onChange={e => setEditing({ ...editing, status: e.target.value as TeamStatus })}>
                <option>Champion</option><option>Qualified</option><option>Pending</option><option>Eliminated</option>
              </select>
            </Field>
          </FormRow>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save}><Check size={14} /> Save</Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <Card>
        <table className={uiStyles.table}>
          <thead><tr>{['Rank', 'Team', 'Game', 'Players', 'W', 'L', 'Pts', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {[...teams].sort((a, b) => a.rank - b.rank).map(t => (
              <tr key={t.rank}>
                <td style={{ fontWeight: 700, color: t.rank <= 3 ? '#FFB020' : 'var(--text)' }}>#{t.rank}</td>
                <td style={{ fontWeight: 600 }}>{t.name}</td>
                <td style={{ color: 'var(--text-soft)' }}>{t.game}</td>
                <td style={{ color: 'var(--text-soft)' }}>{t.players}</td>
                <td style={{ color: '#19E28F', fontWeight: 600 }}>{t.w}</td>
                <td style={{ color: '#FF4D6D', fontWeight: 600 }}>{t.l}</td>
                <td style={{ fontWeight: 700 }}>{t.pts}</td>
                <td><Badge label={t.status} color={statusColors[t.status]} /></td>
                <td>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn variant="ghost" onClick={() => { setEditing(t); setOrigRank(t.rank); setIsNew(false) }}><Pencil size={13} /></Btn>
                    <Btn variant="danger" onClick={async () => { await api.teams.remove(t.rank); load() }}><Trash2 size={13} /></Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
