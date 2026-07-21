import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { RichTextRenderer } from '../components/RichTextRenderer';
import {
  fetchPostBySlug,
  fetchRelatedPosts,
  isContentfulConfigured,
  type BlogPost,
} from '../lib/contentful';
import { categoryIcon } from '../lib/blogCategories';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'not-found' | 'error' | 'unconfigured'>(
    () => (isContentfulConfigured ? 'loading' : 'unconfigured')
  );

  useEffect(() => {
    if (!slug || !isContentfulConfigured) return;

    let cancelled = false;
    // Reset to loading when the slug changes — the standard data-fetching
    // effect pattern from react.dev (reset state, then fetch, guarded by a
    // cancelled flag for cleanup).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStatus('loading');

    fetchPostBySlug(slug)
      .then(async (data) => {
        if (cancelled) return;
        if (!data) {
          setStatus('not-found');
          return;
        }
        setPost(data);
        setStatus('ready');
        const relatedPosts = await fetchRelatedPosts(data.slug, data.category);
        if (!cancelled) setRelated(relatedPosts);
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="bg-chalet-black min-h-screen">
        <PageHeader />
        <div className="flex items-center gap-3 text-chalet-muted py-32 justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading post...
        </div>
        <PageFooter />
      </div>
    );
  }

  if (status === 'unconfigured') {
    return (
      <div className="bg-chalet-black min-h-screen">
        <PageHeader />
        <div className="px-6 md:px-[8vw] py-32 text-center max-w-lg mx-auto">
          <AlertCircle className="w-6 h-6 text-chalet-gold mx-auto mb-4" />
          <p className="body-text mb-2">Contentful isn&rsquo;t connected yet.</p>
          <p className="text-chalet-muted text-sm mb-8">
            Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN to see live posts here.
          </p>
          <Link to="/blog" className="btn-primary inline-flex">
            Back to the Journal
          </Link>
        </div>
        <PageFooter />
      </div>
    );
  }

  if (status === 'not-found' || status === 'error' || !post) {
    return (
      <div className="bg-chalet-black min-h-screen">
        <PageHeader />
        <div className="px-6 md:px-[8vw] py-32 text-center">
          <h1 className="headline-lg text-chalet-ivory mb-6">
            {status === 'error' ? 'SOMETHING WENT WRONG' : 'POST NOT FOUND'}
          </h1>
          <p className="body-text mb-8">
            {status === 'error'
              ? 'Couldn\u2019t load this post right now. Please try again shortly.'
              : 'That entry doesn\u2019t exist \u2014 or may have moved.'}
          </p>
          <Link to="/blog" className="btn-primary inline-flex">
            Back to the Journal
          </Link>
        </div>
        <PageFooter />
      </div>
    );
  }

  return (
    <div className="bg-chalet-black min-h-screen">
      <PageHeader />

      <article className="px-6 md:px-[8vw] py-16 md:py-24">
        <Link
          to="/blog"
          className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors inline-flex items-center gap-2 mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to the Journal
        </Link>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 label-mono text-chalet-gold mb-6">
            {categoryIcon(post.category)}
            {post.category}
          </div>

          <h1 className="headline-lg text-chalet-ivory mb-6">{post.title.toUpperCase()}</h1>

          <p className="text-chalet-muted text-sm mb-12">
            {formatDate(post.date)} · {post.readTime} · {post.author}
          </p>

          {post.coverImageUrl && (
            <img
              src={post.coverImageUrl}
              alt={post.title}
              className="w-full rounded-xl mb-12 border border-chalet-ivory/10"
            />
          )}

          <RichTextRenderer document={post.body} />
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-6 md:px-[8vw] pb-20">
          <div className="border-t border-chalet-ivory/10 pt-14">
            <span className="label-mono text-chalet-gold">MORE FROM THE JOURNAL</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/blog/${r.slug}`}
                  className="group bg-chalet-charcoal border border-chalet-ivory/10 rounded-xl p-6 hover:border-chalet-gold/40 transition-colors"
                >
                  <h3 className="font-display text-base font-semibold text-chalet-ivory mb-2 group-hover:text-chalet-gold transition-colors">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-2 text-chalet-muted text-xs">
                    {formatDate(r.date)}
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <PageFooter />
    </div>
  );
};

export default BlogPostPage;
