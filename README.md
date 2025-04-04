# StudyGroup - Collaborative Learning Platform

StudyGroup is a modern web application that enables students to form study groups and collaborate on academic materials in real-time. The platform provides features for creating study groups, sharing resources, and collaborative note-taking.

## Features

- **User Authentication**: Secure signup and login system
- **Study Groups**: Create and join study groups based on courses or academic interests
- **Real-time Collaboration**: Collaborative note-taking with multiple users
- **Resource Sharing**: Share textbooks, lecture notes, and other study materials
- **Modern UI**: Clean and intuitive user interface built with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Real-time Collaboration**: Yjs with Tiptap
- **Authentication**: Supabase
- **Database**: Supabase PostgreSQL

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/studygroup.git
   cd studygroup
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
studygroup/
├── src/
│   ├── app/                 # Next.js app directory
│   │   ├── dashboard/       # Dashboard page
│   │   ├── groups/          # Group pages
│   │   ├── login/           # Login page
│   │   ├── signup/          # Signup page
│   │   └── layout.tsx       # Root layout
│   ├── components/          # Reusable components
│   └── lib/                 # Utility functions
├── public/                  # Static assets
└── package.json             # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
