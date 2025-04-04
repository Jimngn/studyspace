'use client'

import { useState } from 'react'
import Link from 'next/link'

interface StudyGroup {
  id: string
  name: string
  course: string
  members: number
  lastActive: string
  isPublic: boolean
  pendingRequests?: number
}

export default function Dashboard() {
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: '',
    course: '',
    description: '',
    isPublic: false,
  })
  const [pendingRequests, setPendingRequests] = useState<Record<string, number>>({
    '1': 3, // Mock data for group 1 having 3 pending requests
    '2': 0,
    '3': 1,
  })

  // Mock data - replace with actual data from Supabase
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'COMP110 Study Group',
      course: 'COMP110-01',
      members: 5,
      lastActive: '2 hours ago',
      isPublic: true,
      pendingRequests: 3,
    },
    {
      id: '2',
      name: 'Calc Study Group',
      course: 'MATH232-08',
      members: 8,
      lastActive: '1 day ago',
      isPublic: false,
    },
    {
      id: '3',
      name: 'Disecting the frog',
      course: 'BIO103-05L',
      members: 10,
      lastActive: '1 day ago',
      isPublic: true,
      pendingRequests: 1,
    },
  ]

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement group creation with Supabase
    console.log('Creating new group:', newGroup)
    setShowCreateGroup(false)
    setNewGroup({ name: '', course: '', description: '', isPublic: false })
  }

  // Handle join request for public groups
  const handleJoinRequest = (groupId: string) => {
    // In a real app, this would send a request to the backend
    alert(`Join request sent for group ${groupId}. Waiting for approval.`);
  };

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
                <div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">
                      Privacy Setting
                    </label>
                    <div className="flex items-center">
                      <input
                        id="public"
                        name="privacy"
                        type="radio"
                        checked={newGroup.isPublic}
                        onChange={() => setNewGroup({ ...newGroup, isPublic: true })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="public" className="ml-2 block text-sm text-gray-700">
                        Public (Others can request to join)
                      </label>
                    </div>
                    <div className="flex items-center ml-6">
                      <input
                        id="private"
                        name="privacy"
                        type="radio"
                        checked={!newGroup.isPublic}
                        onChange={() => setNewGroup({ ...newGroup, isPublic: false })}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="private" className="ml-2 block text-sm text-gray-700">
                        Private (Invite only)
                      </label>
                    </div>
                  </div>
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
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900">{group.name}</h3>
                    <div className={`text-xs px-2 py-1 rounded-full ${group.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {group.isPublic ? 'Public' : 'Private'}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{group.course}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{group.members} members</span>
                      <span className="mx-2">•</span>
                      <span>Last active {group.lastActive}</span>
                    </div>
                    <div className="flex space-x-3 items-center">
                      {group.isPublic && group.pendingRequests === undefined && (
                        <button 
                          onClick={() => handleJoinRequest(group.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                          Request to Join
                        </button>
                      )}
                      {group.pendingRequests !== undefined && group.pendingRequests > 0 && (
                        <span className="text-amber-600 text-sm font-medium">
                          {group.pendingRequests} pending {group.pendingRequests === 1 ? 'request' : 'requests'}
                        </span>
                      )}
                      <Link
                        href={`/groups/${group.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View Group
                      </Link>
                    </div>
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