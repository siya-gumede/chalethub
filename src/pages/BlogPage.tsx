import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { fetchAllPosts, isContentfulConfigured, type BlogPost } from '../lib/contentful';
import { BLOG_CATEGORIES, categoryIcon, type BlogCategory } from '../lib/blogCategories';

type Filter = 'All' | BlogCategory;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error' | 'unconfigured'>(() =>
    isContentfulConfigured ? 'loading' : 'unconfigured'
  );

  useEffect(() => {
    if (!isContentfulConfigured) return;
    let cancelled = false;
    fetchAllPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = useMemo(
    () => (filter === 'All' ? posts : posts.filter((p) => p.category === filter)),
    [filter, posts]
  );

  return (
    <div className="bg-chalet-black min-h-screen">
      <PageHeader />

      {/* Hero */}
      <section className="px-6 md:px-[8vw] pt-20 pb-14 border-b border-chalet-ivory/10">
        <span className="label-mono text-chalet-gold">THE JOURNAL</span>
        <h1 className="headline-xl text-chalet-ivory mt-4 max-w-3xl">
          NOTES FROM THE STUDIO.
        </h1>
        <p className="body-text max-w-xl mt-6 text-base md:text-lg">
          Thoughts on cloud architecture, automation, and observability — with the occasional
          detour into gaming and AI.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mt-10">
          {(['All', ...BLOG_CATEGORIES] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`label-mono px-5 py-2 rounded-full border transition-colors ${
                filter === f
                  ? 'bg-chalet-gold text-chalet-black border-chalet-gold'
                  : 'text-chalet-muted border-chalet-ivory/15 hover:text-chalet-ivory hover:border-chalet-ivory/30'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Post grid / states */}
      <section className="px-6 md:px-[8vw] py-16">
        {status === 'loading' && (
          <div className="flex items-center gap-3 text-chalet-muted py-20 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading posts...
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="max-w-lg mx-auto text-center py-20 border border-dashed border-chalet-ivory/15 rounded-xl">
            <AlertCircle className="w-6 h-6 text-chalet-gold mx-auto mb-4" />
            <p className="body-text mb-2">Contentful isn&rsquo;t connected yet.</p>
            <p className="text-chalet-muted text-sm">
              Set <code className="font-mono text-chalet-gold">VITE_CONTENTFUL_SPACE_ID</code> and{' '}
              <code className="font-mono text-chalet-gold">VITE_CONTENTFUL_ACCESS_TOKEN</code> to
              see live posts here.
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="max-w-lg mx-auto text-center py-20 border border-dashed border-chalet-ivory/15 rounded-xl">
            <AlertCircle className="w-6 h-6 text-chalet-gold mx-auto mb-4" />
            <p className="body-text">Couldn&rsquo;t load posts right now. Please try again shortly.</p>
          </div>
        )}

        {status === 'ready' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-chalet-charcoal border border-chalet-ivory/10 rounded-xl p-7 flex flex-col hover:border-chalet-gold/40 transition-colors"
                >
                  <div className="flex items-center gap-2 label-mono text-chalet-gold mb-4">
                    {categoryIcon(post.category)}
                    {post.category}
                  </div>
                  <h2 className="font-display text-xl font-semibold text-chalet-ivory mb-3 leading-snug group-hover:text-chalet-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="body-text mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-chalet-ivory/10">
                    <span className="text-chalet-muted text-xs">
                      {formatDate(post.date)} · {post.readTime}
                    </span>
                    <ArrowRight className="w-4 h-4 text-chalet-gold transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <p className="body-text text-center py-20">No posts in this category yet.</p>
            )}
          </>
        )}
      </section>

      <PageFooter />
    </div>
  );
};

export default BlogPage;
