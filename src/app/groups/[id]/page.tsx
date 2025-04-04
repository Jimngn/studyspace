'use client'

import { useState } from 'react'
import CollaborativeEditor from '@/components/CollaborativeEditor'

export default function GroupPage({ params }: { params: { id: string } }) {
  const [activeNote, setActiveNote] = useState<string | null>('1-1') // Set default active note
  const [folders, setFolders] = useState([
    { id: '1', name: 'Lecture Notes', notes: [
      { id: '1-1', title: 'Week 1: Introduction' },
      { id: '1-2', title: 'Week 2: Basic Concepts' }
    ]},
    { id: '2', name: 'Assignments', notes: [
      { id: '2-1', title: 'Homework 1' },
      { id: '2-2', title: 'Project Proposal' }
    ]}
  ])

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Notes</h2>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2">
              New Note
            </button>
            <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded">
              New Folder
            </button>
          </div>
          
          {/* Folders and Notes */}
          <div className="space-y-4">
            {folders.map(folder => (
              <div key={folder.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{folder.name}</h3>
                  <button className="text-gray-700 hover:text-gray-900">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <div className="pl-4 space-y-1">
                  {folder.notes.map(note => (
                    <button
                      key={note.id}
                      className={`w-full text-left px-2 py-1 rounded hover:bg-gray-200 ${
                        activeNote === note.id ? 'bg-blue-100 text-blue-800' : 'text-gray-800'
                      }`}
                      onClick={() => setActiveNote(note.id)}
                    >
                      {note.title}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
          {/* Editor Section */}
          <div className="flex-1 p-4 overflow-auto">
            {activeNote ? (
              <CollaborativeEditor groupId={params.id} noteId={activeNote} />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-700 bg-white rounded-lg shadow p-4">
                Select a note to start editing
              </div>
            )}
          </div>

          {/* Calendar Section - Fixed height and scrollable */}
          <div className="h-72 border-t border-gray-200 p-4 bg-white overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Group Calendar</h2>
            <div className="grid grid-cols-7 gap-1">
              {/* Calendar Header */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-medium text-sm text-gray-800">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="h-14 border rounded p-1 text-sm bg-white"
                >
                  <div className="text-right text-gray-700">{i + 1}</div>
                  {/* Example events */}
                  {i === 5 && (
                    <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 truncate">
                      Study Session
                    </div>
                  )}
                  {i === 12 && (
                    <div className="text-xs bg-green-100 text-green-800 rounded px-1 truncate">
                      Assignment Due
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 