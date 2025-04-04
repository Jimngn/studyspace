'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

interface CollaborativeEditorProps {
  groupId: string
  noteId?: string
}

export default function CollaborativeEditor({ groupId, noteId }: CollaborativeEditorProps) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null)

  useEffect(() => {
    if (!noteId) return

    const doc = new Y.Doc()
    const wsProvider = new WebsocketProvider(
      'ws://localhost:1234',
      `group-${groupId}-note-${noteId}`,
      doc
    )

    setProvider(wsProvider)

    return () => {
      wsProvider.destroy()
    }
  }, [groupId, noteId])

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Start collaborating!</p>',
  })

  if (!editor || !provider) {
    return <div>Loading editor...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="prose max-w-none">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
} 