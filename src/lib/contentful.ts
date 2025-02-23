// src/lib/contentful.ts
import { createClient } from 'contentful'

if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing required environment variables for Contentful');
}

export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export interface BlogPost {
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage: {
    fields: {
      file: {
        url: string
      }
    }
  }
  publishDate: string
  author: {
    fields: {
      name: string
      picture: {
        fields: {
          file: {
            url: string
          }
        }
      }
    }
  }
}

export async function getBlogPosts() {
  const response = await client.getEntries({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  })
  
  return response.items
}

export async function getBlogPost(slug: string) {
  const response = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  })
  
  return response.items[0]
}