// src/app/blog/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/contentful'

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts?.map((post: any) => (
          <article key={post.fields.slug} className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.fields.featuredImage && (
              <div className="relative h-48">
                <Image
                  src={`https:${post.fields.featuredImage.fields.file.url}`}
                  alt={post.fields.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/blog/${post.fields.slug}`} className="hover:text-blue-600">
                  {post.fields.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.fields.excerpt}</p>
              <div className="flex items-center">
                {post.fields.author?.fields.picture && (
                  <Image
                    src={`https:${post.fields.author.fields.picture.fields.file.url}`}
                    alt={post.fields.author.fields.name}
                    width={40}
                    height={40}
                    className="rounded-full mr-3"
                  />
                )}
                <div>
                  <p className="font-medium">{post.fields.author?.fields.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(post.fields.publishDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}