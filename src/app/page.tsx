// src/app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="py-20">
        <h1 className="text-6xl font-bold mb-6">
          Welcome to Your Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Share your thoughts, ideas, and stories with the world.
        </p>
        <Link 
          href="/blog" 
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Read Blog Posts
        </Link>
      </section>
    </div>
  )
}