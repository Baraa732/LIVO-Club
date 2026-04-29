'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { RuleSection, RuleItem } from '@/lib/store'
import { PageHeader, Card, Field, Btn, SaveBar, FormRow, EditRow, Toolbar } from '@/components/ui'
import { Plus, Trash2 } from 'lucide-react'

export default function RulesPage() {
  const [sections, setSections] = useState<RuleSection[]>([])
  const [saved, setSaved] = useState(false)

  useEffect(() => { api.rules.get().then(d => setSections(d as RuleSection[])) }, [])

  const save = async () => {
    await api.rules.save(sections)
    setSaved(true); setTimeout(() => setSaved(false), 2500)
  }

  const updateSection = (si: number, val: string) => {
    const s = [...sections]; s[si] = { ...s[si], category: val }; setSections(s)
  }
  const updateRule = (si: number, ri: number, key: keyof RuleItem, val: string) => {
    const s = [...sections]; const rules = [...s[si].rules]; rules[ri] = { ...rules[ri], [key]: val }
    s[si] = { ...s[si], rules }; setSections(s)
  }
  const addRule = (si: number) => {
    const s = [...sections]; s[si] = { ...s[si], rules: [...s[si].rules, { title: '', desc: '' }] }; setSections(s)
  }
  const removeRule = (si: number, ri: number) => {
    const s = [...sections]; s[si] = { ...s[si], rules: s[si].rules.filter((_, i) => i !== ri) }; setSections(s)
  }

  return (
    <div>
      <PageHeader title="Rules & Regulations" desc="Manage club rules displayed on the website" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{sections.length} categories</div>
        <Btn onClick={() => setSections([...sections, { category: 'New Category', rules: [] }])}><Plus size={15} /> Add Category</Btn>
      </Toolbar>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((sec, si) => (
          <Card key={si}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1 }}><Field label="Category Name"><input value={sec.category} onChange={e => updateSection(si, e.target.value)} /></Field></div>
              <Btn variant="cyan" onClick={() => addRule(si)}><Plus size={14} /> Add Rule</Btn>
              <Btn variant="danger" onClick={() => setSections(sections.filter((_, i) => i !== si))}><Trash2 size={14} /></Btn>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sec.rules.map((rule, ri) => (
                <EditRow key={ri}>
                  <FormRow cols={2}>
                    <Field label="Title"><input value={rule.title} onChange={e => updateRule(si, ri, 'title', e.target.value)} /></Field>
                    <Field label="Description"><input value={rule.desc} onChange={e => updateRule(si, ri, 'desc', e.target.value)} /></Field>
                  </FormRow>
                  <Btn variant="danger" onClick={() => removeRule(si, ri)}><Trash2 size={13} /> Remove</Btn>
                </EditRow>
              ))}
            </div>
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  )
}
