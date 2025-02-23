// src/app/blog/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import type { Metadata } from 'next'
import type { Document } from '@contentful/rich-text-types'

interface BlogPost {
  fields: {
    title: string
    slug: string
    content: Document
    excerpt: string
    publishDate: string
    featuredImage?: {
      fields: {
        file: {
          url: string
        }
      }
    }
    seoKeywords?: string
    author?: {
      fields: {
        name: string
        picture?: {
          fields: {
            file: {
              url: string
            }
          }
        }
      }
    }
  }
}

interface Props {
  params: {
    slug: string
  }
}

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p className="mb-4">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (_node: any, children: React.ReactNode) => (
      <h1 className="text-4xl font-bold my-6">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
      <h2 className="text-3xl font-bold my-5">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
      <h3 className="text-2xl font-bold my-4">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
      <ul className="list-disc ml-6 mb-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
      <ol className="list-decimal ml-6 mb-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
      <li className="mb-2">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {children}
      </blockquote>
    ),
  },
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <strong className="font-bold">{text}</strong>
    ),
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <em className="italic">{text}</em>
    ),
    [MARKS.CODE]: (text: React.ReactNode) => (
      <code className="bg-gray-100 rounded px-2 py-1">{text}</code>
    ),
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug) as BlogPost | undefined | any

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.fields.title,
    description: post.fields.excerpt,
    keywords: post.fields?.["seo-keyword"],
    openGraph: {
      title: post.fields.title,
      description: post.fields.excerpt,
      images: post.fields.featuredImage ? [
        {
          url: `https:${post.fields.featuredImage.fields.file.url}`,
        },
      ] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug) as BlogPost | undefined | any

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto">
      {post.fields.featuredImage && (
        <div className="relative h-[400px] mb-8">
          <Image
            src={`https:${post.fields.featuredImage.fields.file.url}`}
            alt={post.fields.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      <h1 className="text-4xl font-bold mb-4">{post.fields.title}</h1>
      <div className="flex items-center mb-8">
        {post.fields.author?.fields.picture && (
          <Image
            src={`https:${post.fields.author.fields.picture.fields.file.url}`}
            alt={post.fields.author.fields.name}
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
        )}
        <div>
          <p className="font-medium">{post.fields.author?.fields.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(post.fields.publishDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="prose prose-lg max-w-none">
        {documentToReactComponents(post.fields.content, options)}
      </div>
    </article>
  )
}