'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { GalleryItem, GallerySize } from '@/lib/store'
import { PageHeader, Card, CardTitle, Field, Btn, Badge, FormRow, Toolbar, ListCard, ListCardLeft, ListCardIcon, ListCardInfo, ListCardActions } from '@/components/ui'
import { Plus, Pencil, Trash2, X, Check, Image } from 'lucide-react'

const empty = (): GalleryItem => ({ id: Date.now(), label: '', size: 'medium', color: '#00E6FF' })

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [isNew, setIsNew] = useState(false)

  const load = () => api.gallery.get().then(d => setItems(d as GalleryItem[]))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    if (isNew) await api.gallery.add(editing)
    else await api.gallery.update(editing.id, editing)
    await load(); setEditing(null); setIsNew(false)
  }

  return (
    <div>
      <PageHeader title="Gallery" desc="Manage gallery items displayed on the website" />
      <Toolbar>
        <div style={{ fontSize: '0.855rem', color: 'var(--text-soft)' }}>{items.length} items</div>
        <Btn onClick={() => { setEditing(empty()); setIsNew(true) }}><Plus size={15} /> Add Item</Btn>
      </Toolbar>

      {editing && (
        <Card style={{ marginBottom: 24 }}>
          <CardTitle>{isNew ? 'New Gallery Item' : 'Edit Gallery Item'}</CardTitle>
          <FormRow cols={3}>
            <Field label="Label"><input value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} /></Field>
            <Field label="Size">
              <select value={editing.size} onChange={e => setEditing({ ...editing, size: e.target.value as GallerySize })}>
                <option value="large">Large</option><option value="medium">Medium</option><option value="small">Small</option>
              </select>
            </Field>
            <Field label="Accent Color"><input type="color" value={editing.color} onChange={e => setEditing({ ...editing, color: e.target.value })} /></Field>
          </FormRow>
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <Btn onClick={save}><Check size={14} /> Save</Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setIsNew(false) }}><X size={14} /> Cancel</Btn>
          </div>
        </Card>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {items.map(item => (
          <ListCard key={item.id}>
            <ListCardLeft>
              <ListCardIcon color={item.color}><Image size={18} /></ListCardIcon>
              <ListCardInfo title={item.label} meta={<Badge label={item.size} color={item.color} />} />
            </ListCardLeft>
            <ListCardActions>
              <Btn variant="ghost" onClick={() => { setEditing(item); setIsNew(false) }}><Pencil size={13} /></Btn>
              <Btn variant="danger" onClick={async () => { await api.gallery.remove(item.id); load() }}><Trash2 size={13} /></Btn>
            </ListCardActions>
          </ListCard>
        ))}
      </div>
    </div>
  )
}
