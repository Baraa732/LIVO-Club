'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { TournamentMeta, TournamentRound, TournamentMatch, MatchStatus, TournamentStanding, TournamentStatus, TournamentRule } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, SaveBar, Badge, FormRow, EditRow, Tabs, Toolbar } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'
import uiStyles from '@/components/ui.module.scss'

const statusColors: Record<MatchStatus, string> = { done: '#19E28F', live: '#FF6B35', upcoming: '#8b9ab5' }

interface TournamentData { meta: TournamentMeta; bracket: TournamentRound[]; standings: TournamentStanding[]; rules: TournamentRule[] }

export default function TournamentPage() {
  const [tab, setTab] = useState('meta')
  const [d, setD] = useState<TournamentData | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { api.tournament.get().then(data => setD(data as TournamentData)) }, [])

  const save = async () => {
    if (!d) return
    await api.tournament.save(d)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const updateMatch = (ri: number, mi: number, key: keyof TournamentMatch, val: string | number | null) => {
    if (!d) return
    setD({ ...d, bracket: d.bracket.map((r, i) => i !== ri ? r : { ...r, matches: r.matches.map((m, j) => j !== mi ? m : { ...m, [key]: val }) }) })
  }

  const updateStanding = (i: number, key: keyof TournamentStanding, val: string | number) => {
    if (!d) return
    const s = [...d.standings]; s[i] = { ...s[i], [key]: key === 'name' || key === 'status' ? val : Number(val) }; setD({ ...d, standings: s })
  }

  if (!d) return <div style={{ color: 'var(--text-soft)', padding: 40 }}>Loading...</div>

  const tabs = [{ id: 'meta', label: 'Meta Info' }, { id: 'bracket', label: 'Bracket' }, { id: 'standings', label: 'Standings' }, { id: 'rules', label: 'Rules' }]

  return (
    <div>
      <PageHeader title="Tournament" desc="Manage tournament meta, bracket, standings and rules" />
      <Tabs tabs={tabs} active={tab} onChange={setTab} />

      {tab === 'meta' && (
        <Card>
          <CardTitle>Tournament Info</CardTitle>
          <FormRow cols={3}>
            <Field label="Name"><input value={d.meta.name} onChange={e => setD({ ...d, meta: { ...d.meta, name: e.target.value } })} /></Field>
            <Field label="Season"><input value={d.meta.season} onChange={e => setD({ ...d, meta: { ...d.meta, season: e.target.value } })} /></Field>
            <Field label="Prize Pool"><input value={d.meta.prizePool} onChange={e => setD({ ...d, meta: { ...d.meta, prizePool: e.target.value } })} /></Field>
            <Field label="Game"><input value={d.meta.game} onChange={e => setD({ ...d, meta: { ...d.meta, game: e.target.value } })} /></Field>
            <Field label="Format"><input value={d.meta.format} onChange={e => setD({ ...d, meta: { ...d.meta, format: e.target.value } })} /></Field>
            <Field label="Teams"><input type="number" value={d.meta.teams} onChange={e => setD({ ...d, meta: { ...d.meta, teams: Number(e.target.value) } })} /></Field>
            <Field label="Start Date"><input value={d.meta.startDate} onChange={e => setD({ ...d, meta: { ...d.meta, startDate: e.target.value } })} /></Field>
          </FormRow>
        </Card>
      )}

      {tab === 'bracket' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {d.bracket.map((round, ri) => (
            <Card key={round.id}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1 }}><Field label="Round Label"><input value={round.label} onChange={e => { const b = [...d.bracket]; b[ri] = { ...b[ri], label: e.target.value }; setD({ ...d, bracket: b }) }} /></Field></div>
                <Btn variant="cyan" onClick={() => { const b = [...d.bracket]; b[ri] = { ...b[ri], matches: [...b[ri].matches, { id: Date.now().toString(), team1: 'TBD', team2: 'TBD', score1: null, score2: null, status: 'upcoming' }] }; setD({ ...d, bracket: b }) }}><Plus size={14} /> Add Match</Btn>
                <Btn variant="danger" onClick={() => setD({ ...d, bracket: d.bracket.filter((_, i) => i !== ri) })}><Trash2 size={14} /></Btn>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {round.matches.map((m, mi) => (
                  <EditRow key={m.id}>
                    <div style={{ marginBottom: 4 }}><Badge label={m.status} color={statusColors[m.status]} /></div>
                    <FormRow cols={4}>
                      <Field label="Team 1"><input value={m.team1} onChange={e => updateMatch(ri, mi, 'team1', e.target.value)} /></Field>
                      <Field label="Score 1"><input type="number" value={m.score1 ?? ''} onChange={e => updateMatch(ri, mi, 'score1', e.target.value === '' ? null : Number(e.target.value))} /></Field>
                      <Field label="Team 2"><input value={m.team2} onChange={e => updateMatch(ri, mi, 'team2', e.target.value)} /></Field>
                      <Field label="Score 2"><input type="number" value={m.score2 ?? ''} onChange={e => updateMatch(ri, mi, 'score2', e.target.value === '' ? null : Number(e.target.value))} /></Field>
                    </FormRow>
                    <FormRow cols={2}>
                      <Field label="Status"><select value={m.status} onChange={e => updateMatch(ri, mi, 'status', e.target.value as MatchStatus)}><option value="upcoming">Upcoming</option><option value="live">Live</option><option value="done">Done</option></select></Field>
                      <Field label="Time"><input value={m.time ?? ''} onChange={e => updateMatch(ri, mi, 'time', e.target.value)} /></Field>
                    </FormRow>
                    <Btn variant="danger" onClick={() => { const b = [...d.bracket]; b[ri] = { ...b[ri], matches: b[ri].matches.filter((_, j) => j !== mi) }; setD({ ...d, bracket: b }) }}><Trash2 size={13} /> Remove</Btn>
                  </EditRow>
                ))}
              </div>
            </Card>
          ))}
          <Btn variant="ghost" onClick={() => setD({ ...d, bracket: [...d.bracket, { id: Date.now().toString(), label: 'New Round', matches: [] }] })}><Plus size={14} /> Add Round</Btn>
        </div>
      )}

      {tab === 'standings' && (
        <Card>
          <Toolbar>
            <CardTitle>Standings</CardTitle>
            <Btn variant="cyan" onClick={() => setD({ ...d, standings: [...d.standings, { rank: d.standings.length + 1, name: 'New Team', played: 0, w: 0, l: 0, pts: 0, status: 'pending' }] })}><Plus size={14} /> Add Team</Btn>
          </Toolbar>
          <table className={uiStyles.table}>
            <thead><tr>{['Rank', 'Name', 'Played', 'W', 'L', 'Pts', 'Status', ''].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {d.standings.map((s, i) => (
                <tr key={i}>
                  {(['rank', 'name', 'played', 'w', 'l', 'pts'] as const).map(key => (
                    <td key={key}><input value={s[key]} onChange={e => updateStanding(i, key, e.target.value)} style={{ padding: '5px 8px', fontSize: '0.8rem' }} /></td>
                  ))}
                  <td><select value={s.status} onChange={e => updateStanding(i, 'status', e.target.value)} style={{ padding: '5px 8px', fontSize: '0.8rem' }}><option value="qualified">Qualified</option><option value="pending">Pending</option><option value="eliminated">Eliminated</option></select></td>
                  <td><Btn variant="danger" onClick={() => setD({ ...d, standings: d.standings.filter((_, j) => j !== i) })}><Trash2 size={13} /></Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tab === 'rules' && (
        <Card>
          <Toolbar>
            <CardTitle>Tournament Rules</CardTitle>
            <Btn variant="cyan" onClick={() => setD({ ...d, rules: [...d.rules, { title: '', desc: '' }] })}><Plus size={14} /> Add Rule</Btn>
          </Toolbar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {d.rules.map((r, i) => (
              <EditRow key={i}>
                <FormRow cols={2}>
                  <Field label="Title"><input value={r.title} onChange={e => { const rs = [...d.rules]; rs[i] = { ...rs[i], title: e.target.value }; setD({ ...d, rules: rs }) }} /></Field>
                  <Field label="Description"><input value={r.desc} onChange={e => { const rs = [...d.rules]; rs[i] = { ...rs[i], desc: e.target.value }; setD({ ...d, rules: rs }) }} /></Field>
                </FormRow>
                <Btn variant="danger" onClick={() => setD({ ...d, rules: d.rules.filter((_, j) => j !== i) })}><Trash2 size={13} /> Remove</Btn>
              </EditRow>
            ))}
          </div>
        </Card>
      )}

      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
