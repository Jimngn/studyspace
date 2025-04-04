'use client'

import { useState } from 'react'
import { use } from 'react'
import CollaborativeEditor from '@/components/CollaborativeEditor'

export default function GroupPage({ params }: { params: { id: string } }) {
  // Unwrap params with React.use()
  const unwrappedParams = use(params)
  const groupId = unwrappedParams.id
  
  const [activeNote, setActiveNote] = useState<string | null>('1-1') // Set default active note
  const [folders, setFolders] = useState([
    { id: '1', name: 'Lecture Notes', notes: [
      { id: '1-1', title: 'Week 1: Introduction' },
      { id: '1-2', title: 'Week 2: Basic Concepts' }
    ]},
    { id: '2', name: 'Assignments', notes: [
      { id: '2-1', title: 'Homework 1' },
      { id: '2-2', title: 'Project Proposal' }
    ]},
    { id: '3', name: 'Shared Resources', notes: [
      { id: '3-1', title: 'Past Exam PDF' },
      { id: '3-2', title: 'Professor Slides' }
    ]}
  ])
  const [selectedFolder, setSelectedFolder] = useState('1')
  const [uploading, setUploading] = useState(false)

  // Handle new note creation
  const handleNewNote = () => {
    const folderIndex = folders.findIndex(folder => folder.id === selectedFolder)
    if (folderIndex === -1) {
      alert('Please select a folder first')
      return
    }
    
    const noteTitle = prompt('Enter a name for the new note:')
    if (!noteTitle) return // User cancelled
    
    // Create new note with unique ID
    const newNoteId = `${selectedFolder}-${Date.now()}`
    const newNote = { id: newNoteId, title: noteTitle }
    
    // Create updated folders array with new note
    const updatedFolders = [...folders]
    updatedFolders[folderIndex].notes.push(newNote)
    
    // Update state
    setFolders(updatedFolders)
    setActiveNote(newNoteId) // Set the new note as active
  }

  // Handle new folder creation
  const handleNewFolder = () => {
    const folderName = prompt('Enter a name for the new folder:')
    if (!folderName) return // User cancelled
    
    // Create new folder with unique ID
    const newFolderId = `folder-${Date.now()}`
    const newFolder = { id: newFolderId, name: folderName, notes: [] }
    
    // Update folders array
    setFolders([...folders, newFolder])
    setSelectedFolder(newFolderId) // Set as selected folder
  }

  // Handle folder selection
  const handleFolderSelect = (folderId: string) => {
    setSelectedFolder(folderId)
  }

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    setUploading(true);
    
    // Get the selected file
    const file = event.target.files[0];
    
    // In a real app, you would upload the file to a server here
    // For this demonstration, we'll just create a new note with the file name
    
    // Determine target folder (default to "Shared Resources")
    let targetFolderId = '3'; // ID for "Shared Resources" folder
    
    // Check if "Shared Resources" folder exists, create it if not
    let folderIndex = folders.findIndex(folder => folder.id === targetFolderId);
    if (folderIndex === -1) {
      const newFolder = { id: targetFolderId, name: 'Shared Resources', notes: [] };
      setFolders([...folders, newFolder]);
      folderIndex = folders.length; // Will be the index of the newly added folder
    }
    
    // Create a new note for the uploaded file
    const fileExtension = file.name.split('.').pop()?.toUpperCase() || '';
    const newNoteId = `${targetFolderId}-${Date.now()}`;
    const newNote = { id: newNoteId, title: `${file.name} (${fileExtension})` };
    
    // Add the new note to the folder
    const updatedFolders = [...folders];
    if (!updatedFolders[folderIndex]) {
      // If the folder wasn't found (unlikely but possible due to state updates)
      setUploading(false);
      return;
    }
    
    updatedFolders[folderIndex].notes.push(newNote);
    
    // Update state
    setFolders(updatedFolders);
    setSelectedFolder(targetFolderId);
    setActiveNote(newNoteId);
    setUploading(false);
    
    // Show a success message
    alert(`File "${file.name}" uploaded successfully`);
    
    // Reset the file input
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md p-4 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-900">Notes</h2>
            <button 
              className="w-full bg-blue-600 text-white px-4 py-2 rounded mb-2"
              onClick={handleNewNote}
            >
              New Note
            </button>
            <button 
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded mb-2"
              onClick={handleNewFolder}
            >
              New Folder
            </button>
            
            {/* File Upload Button */}
            <div className="relative w-full bg-green-600 text-white px-4 py-2 rounded text-center cursor-pointer mb-2">
              {uploading ? "Uploading..." : "Upload Past Notes/Lectures"}
              <input 
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.jpg,.png"
                disabled={uploading}
              />
            </div>
          </div>
          
          {/* Folders and Notes */}
          <div className="space-y-4">
            {folders.map(folder => (
              <div key={folder.id} className="space-y-2">
                <div 
                  className={`flex items-center justify-between cursor-pointer p-1 rounded ${
                    selectedFolder === folder.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleFolderSelect(folder.id)}
                >
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
              <CollaborativeEditor groupId={groupId} noteId={activeNote} />
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