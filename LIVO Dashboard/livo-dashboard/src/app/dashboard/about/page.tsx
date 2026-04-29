'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { AboutData, AboutPillar } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, SaveBar, FormRow, EditRow, Toolbar } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'

export default function AboutPage() {
  const [data, setData] = useState<AboutData | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => { api.about.get().then(d => setData(d as AboutData)) }, [])

  const save = async () => {
    if (!data) return
    await api.about.save(data)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const updatePillar = (i: number, key: keyof AboutPillar, val: string) => {
    if (!data) return
    const pillars = [...data.pillars]; pillars[i] = { ...pillars[i], [key]: val }
    setData({ ...data, pillars })
  }

  if (!data) return <div style={{ color: 'var(--text-soft)', padding: 40 }}>Loading...</div>

  return (
    <div>
      <PageHeader title="About Section" desc="Edit the about section content and pillars" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card>
          <CardTitle>Content</CardTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Badge"><input value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} /></Field>
            <FormRow cols={2}>
              <Field label="Title"><input value={data.title} onChange={e => setData({ ...data, title: e.target.value })} /></Field>
              <Field label="Title Gradient Part"><input value={data.titleGradient} onChange={e => setData({ ...data, titleGradient: e.target.value })} /></Field>
            </FormRow>
            <Field label="Paragraph 1"><textarea rows={3} value={data.desc1} onChange={e => setData({ ...data, desc1: e.target.value })} /></Field>
            <Field label="Paragraph 2"><textarea rows={3} value={data.desc2} onChange={e => setData({ ...data, desc2: e.target.value })} /></Field>
            <Field label="Founded Year"><input value={data.foundedYear} onChange={e => setData({ ...data, foundedYear: e.target.value })} /></Field>
          </div>
        </Card>
        <Card>
          <Toolbar>
            <CardTitle>Pillars</CardTitle>
            <Btn variant="cyan" onClick={() => setData({ ...data, pillars: [...data.pillars, { icon: 'Star', title: '', desc: '' }] })}>
              <Plus size={14} /> Add
            </Btn>
          </Toolbar>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.pillars.map((p, i) => (
              <EditRow key={i}>
                <FormRow cols={2}>
                  <Field label="Icon Name"><input value={p.icon} onChange={e => updatePillar(i, 'icon', e.target.value)} /></Field>
                  <Field label="Title"><input value={p.title} onChange={e => updatePillar(i, 'title', e.target.value)} /></Field>
                </FormRow>
                <Field label="Description"><textarea rows={2} value={p.desc} onChange={e => updatePillar(i, 'desc', e.target.value)} /></Field>
                <Btn variant="danger" onClick={() => setData({ ...data, pillars: data.pillars.filter((_, j) => j !== i) })}>
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
