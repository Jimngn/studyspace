'use client'

import { useState } from 'react'
import Link from 'next/link'

interface StudyGroup {
  id: string
  name: string
  course: string
  members: number
  lastActive: string
}

export default function Dashboard() {
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    course: '',
    description: '',
  })

  // Mock data - replace with actual data from Supabase
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'CS101 Study Group',
      course: 'Introduction to Computer Science',
      members: 5,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Math Study Group',
      course: 'Calculus II',
      members: 8,
      lastActive: '1 day ago',
    },
  ]

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement group creation with Supabase
    console.log('Creating new group:', newGroup)
    setShowCreateGroup(false)
    setNewGroup({ name: '', course: '', description: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Study Groups</h1>
            <button
              onClick={() => setShowCreateGroup(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create New Group
            </button>
          </div>

          {showCreateGroup && (
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Create New Study Group</h2>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Group Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <input
                    type="text"
                    id="course"
                    value={newGroup.course}
                    onChange={(e) => setNewGroup({ ...newGroup, course: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateGroup(false)}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Create Group
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studyGroups.map((group) => (
              <div
                key={group.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{group.course}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{group.members} members</span>
                      <span className="mx-2">•</span>
                      <span>Last active {group.lastActive}</span>
                    </div>
                    <Link
                      href={`/groups/${group.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Group
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 