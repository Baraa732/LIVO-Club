'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { HeroData, HeroStat } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, SaveBar, FormRow, EditRow, Toolbar } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'

export default function HeroPage() {
  const [data, setData] = useState<HeroData | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { api.hero.get().then(d => setData(d as HeroData)) }, [])

  const save = async () => {
    if (!data) return
    await api.hero.save(data)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const updateStat = (i: number, key: string, val: string | number) => {
    if (!data) return
    const stats = [...data.stats]
    stats[i] = { ...stats[i], [key]: key === 'value' ? Number(val) : val }
    setData({ ...data, stats })
  }

  if (!data) return <div style={{ color: 'var(--text-soft)', padding: 40 }}>Loading...</div>

  return (
    <div>
      <PageHeader title="Hero Section" desc="Edit the main hero content displayed at the top of the website" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <CardTitle>Content</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Badge Text"><input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
            <FormRow cols={3}>
              <Field label="Line 1"><input value={data.line1} onChange={e => setData({ ...data, line1: e.target.value })} /></Field>
              <Field label="Line 2"><input value={data.line2} onChange={e => setData({ ...data, line2: e.target.value })} /></Field>
              <Field label="Line 3 (Gradient)"><input value={data.line3} onChange={e => setData({ ...data, line3: e.target.value })} /></Field>
            </FormRow>
            <Field label="Description"><textarea rows={3} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} /></Field>
            <FormRow cols={2}>
              <Field label="CTA Button Label"><input value={data.ctaLabel} onChange={e => setData({ ...data, ctaLabel: e.target.value })} /></Field>
              <Field label="Video Button Label"><input value={data.videoLabel} onChange={e => setData({ ...data, videoLabel: e.target.value })} /></Field>
            </FormRow>
          </div>
        </Card>
        <Card>
          <Toolbar>
            <CardTitle>Stats</CardTitle>
            <Btn variant="cyan" onClick={() => setData({ ...data, stats: [...data.stats, { value: 0, suffix: '+', label: 'New Stat' }] })}>
              <Plus size={14} /> Add Stat
            </Btn>
          </Toolbar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.stats.map((stat, i) => (
              <EditRow key={i}>
                <FormRow cols={3}>
                  <Field label="Value"><input type="number" value={stat.value} onChange={e => updateStat(i, 'value', e.target.value)} /></Field>
                  <Field label="Suffix"><input value={stat.suffix} onChange={e => updateStat(i, 'suffix', e.target.value)} /></Field>
                  <Field label="Label"><input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} /></Field>
                </FormRow>
                <Btn variant="danger" onClick={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })}>
                  <Trash2 size={14} /> Remove
                </Btn>
              </EditRow>
            ))}
          </div>
        </Card>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
