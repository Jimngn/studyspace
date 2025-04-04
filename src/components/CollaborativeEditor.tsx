'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'

interface CollaborativeEditorProps {
  groupId: string
  noteId?: string
}

export default function CollaborativeEditor({ groupId, noteId }: CollaborativeEditorProps) {
  // Pre-defined content for different notes to simulate saved content
  const noteContents: Record<string, string> = {
    '1-1': '<h2>Week 1: Introduction</h2><p>Welcome to the course! This week we will cover the basic principles and get familiar with the key concepts.</p><ul><li>Course overview</li><li>Basic definitions</li><li>History and background</li></ul>',
    '1-2': '<h2>Week 2: Basic Concepts</h2><p>Building on our introduction, we will dive deeper into the fundamental theories and methodologies.</p><p>Key topics include:</p><ul><li>Theoretical frameworks</li><li>Practical applications</li><li>Case studies</li></ul>',
    '2-1': '<h2>Homework 1</h2><p>Due date: November 15, 2023</p><p>Instructions:</p><ol><li>Complete exercises 1-5 on page 42</li><li>Write a 500-word reflection on the readings</li><li>Prepare questions for discussion</li></ol>',
    '2-2': '<h2>Project Proposal</h2><p>Your project proposal should include the following sections:</p><ul><li>Project title</li><li>Research question</li><li>Methodology</li><li>Expected outcomes</li><li>Timeline</li><li>Resource requirements</li></ul>'
  }

  const editor = useEditor({
    extensions: [StarterKit],
    content: noteId ? noteContents[noteId] || '<p>Start editing this note!</p>' : '<p>No note selected</p>',
    editable: true,
  })

  // Update editor content when noteId changes
  useEffect(() => {
    if (editor && noteId && noteContents[noteId]) {
      editor.commands.setContent(noteContents[noteId])
    }
  }, [noteId, editor])

  if (!editor) {
    return (
      <div className="bg-white rounded-lg shadow p-4 text-gray-700">
        <p>Loading editor...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="prose max-w-none text-gray-900">
        <EditorContent editor={editor} />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>This is a simplified version of the collaborative editor for the wireframe.</p>
        <p>Editing is enabled, but changes won't be saved or synchronized.</p>
      </div>
    </div>
  )
} 