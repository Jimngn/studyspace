'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

interface GroupMember {
  id: string
  name: string
  avatar: string
}

export default function GroupPage() {
  const params = useParams()
  const groupId = params.id as string
  const [editor, setEditor] = useState<Editor | null>(null)
  const [members, setMembers] = useState<GroupMember[]>([])

  useEffect(() => {
    // Create a new Y.Doc
    const ydoc = new Y.Doc()
    
    // Initialize the WebSocket provider
    const provider = new WebsocketProvider(
      'ws://localhost:1234', // Replace with your WebSocket server
      `group-${groupId}`,
      ydoc
    )

    // Initialize the editor with collaboration features
    const editorInstance = new Editor({
      extensions: [
        StarterKit,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: 'Current User', // Replace with actual user name
            color: '#f783ac',
          },
        }),
      ],
    })

    setEditor(editorInstance)

    // Mock members data - replace with actual data from Supabase
    setMembers([
      { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    ])

    return () => {
      editorInstance.destroy()
      provider.destroy()
      ydoc.destroy()
    }
  }, [groupId])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Group Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CS101 Study Group</h1>
              <p className="mt-1 text-sm text-gray-500">Introduction to Computer Science</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {members.map((member) => (
                  <img
                    key={member.id}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    src={member.avatar}
                    alt={member.name}
                    title={member.name}
                  />
                ))}
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Invite Members
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Notes Section */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Collaborative Notes</h2>
                <div className="prose max-w-none">
                  {editor && (
                    <div className="border rounded-lg p-4 min-h-[400px]">
                      {/* Editor content will be rendered here */}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div>
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Shared Resources</h2>
                <div className="space-y-4">
                  <button className="w-full bg-gray-50 border border-gray-300 rounded-lg p-4 text-left hover:bg-gray-100">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-gray-700">Upload New Resource</span>
                    </div>
                  </button>
                  {/* Resource list will go here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 