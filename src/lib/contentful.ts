import { createClient, type EntryFieldTypes } from 'contentful';
import type { Document } from '@contentful/rich-text-types';
import type { BlogCategory } from './blogCategories';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as string | undefined;
const environment = (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) || 'master';

export const isContentfulConfigured = Boolean(spaceId && accessToken);

export const contentfulClient = isContentfulConfigured
  ? createClient({ space: spaceId as string, accessToken: accessToken as string, environment })
  : null;

export interface BlogPost {
  slug: string;
  title: string;
  category: BlogCategory;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  coverImageUrl?: string;
  body: Document;
}

interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    category: EntryFieldTypes.Symbol<BlogCategory>;
    publishDate: EntryFieldTypes.Date;
    readTime: EntryFieldTypes.Symbol;
    excerpt: EntryFieldTypes.Text;
    author?: EntryFieldTypes.Symbol;
    coverImage?: EntryFieldTypes.AssetLink;
    body: EntryFieldTypes.RichText;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapEntry(entry: any): BlogPost {
  const f = entry.fields;
  return {
    slug: f.slug,
    title: f.title,
    category: f.category,
    date: f.publishDate,
    readTime: f.readTime,
    excerpt: f.excerpt,
    author: f.author || 'Chalet Hub',
    coverImageUrl: f.coverImage?.fields?.file?.url
      ? `https:${f.coverImage.fields.file.url}`
      : undefined,
    body: f.body,
  };
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  if (!contentfulClient) return [];
  const res = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  });
  return res.items.map(mapEntry);
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!contentfulClient) return null;
  const res = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return res.items[0] ? mapEntry(res.items[0]) : null;
}

export async function fetchRelatedPosts(
  slug: string,
  category: BlogCategory,
  count = 2
): Promise<BlogPost[]> {
  if (!contentfulClient) return [];
  const res = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.category': category,
    order: ['-fields.publishDate'],
    limit: count + 1,
  });
  return res.items.map(mapEntry).filter((p) => p.slug !== slug).slice(0, count);
}
