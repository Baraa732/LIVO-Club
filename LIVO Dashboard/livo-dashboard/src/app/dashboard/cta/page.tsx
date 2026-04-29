'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { CtaData } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, SaveBar, FormRow, EditRow, Toolbar } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'

export default function CtaPage() {
  const [data, setData] = useState<CtaData | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { api.cta.get().then(d => setData(d as CtaData)) }, [])

  const save = async () => {
    if (!data) return
    await api.cta.save(data)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const updatePerk = (i: number, val: string) => {
    if (!data) return
    const perks = [...data.perks]; perks[i] = val; setData({ ...data, perks })
  }

  if (!data) return <div style={{ color: 'var(--text-soft)', padding: 40 }}>Loading...</div>

  return (
    <div>
      <PageHeader title="CTA / Join Section" desc="Manage the join section content and floating cards" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <CardTitle>Content</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Badge"><input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
            <FormRow cols={2}>
              <Field label="Title"><input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
              <Field label="Title Gradient Part"><input value={data.titleGradient} onChange={e => setData({ ...data, titleGradient: e.target.value })} /></Field>
            </FormRow>
            <Field label="Description"><textarea rows={3} value={data.description} onChange={e => setData({ ...data, description: e.target.value })} /></Field>
            <Field label="Button Label"><input value={data.btnLabel} onChange={e => setData({ ...data, btnLabel: e.target.value })} /></Field>
          </div>
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card>
            <Toolbar>
              <CardTitle>Perks List</CardTitle>
              <Btn variant="cyan" onClick={() => setData({ ...data, perks: [...data.perks, ''] })}><Plus size={14} /> Add</Btn>
            </Toolbar>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {data.perks.map((perk, i) => (
                <div key={i} style={{ display: 'flex', gap: 8 }}>
                  <input value={perk} onChange={e => updatePerk(i, e.target.value)} />
                  <Btn variant="danger" onClick={() => setData({ ...data, perks: data.perks.filter((_, j) => j !== i) })}><Trash2 size={13} /></Btn>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <CardTitle>Floating Cards</CardTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map(n => (
                <EditRow key={n}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Card {n}</div>
                  <FormRow cols={3}>
                    <Field label="Icon"><input value={data[`card${n}Icon` as keyof CtaData] as string} onChange={e => setData({ ...data, [`card${n}Icon`]: e.target.value })} /></Field>
                    <Field label="Title"><input value={data[`card${n}Title` as keyof CtaData] as string} onChange={e => setData({ ...data, [`card${n}Title`]: e.target.value })} /></Field>
                    <Field label="Subtitle"><input value={data[`card${n}Sub` as keyof CtaData] as string} onChange={e => setData({ ...data, [`card${n}Sub`]: e.target.value })} /></Field>
                  </FormRow>
                </EditRow>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
