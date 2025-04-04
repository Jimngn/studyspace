import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="text-center px-4 py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Collaborative Learning Made Easy
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join study groups, share notes, and learn together with students from around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Study Groups</h3>
            <p className="text-gray-600">
              Create or join study groups based on your courses and academic interests.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Real-time Collaboration</h3>
            <p className="text-gray-600">
              Work together on notes and study materials in real-time with your group members.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Resource Sharing</h3>
            <p className="text-gray-600">
              Share textbooks, lecture notes, and other study resources with your group.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
