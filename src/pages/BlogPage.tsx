import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Gamepad2, Cpu } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { blogPosts } from '../data/blogPosts';

type Filter = 'All' | 'Gaming' | 'AI';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

const categoryIcon = (category: string) =>
  category === 'Gaming' ? (
    <Gamepad2 className="w-4 h-4" />
  ) : (
    <Cpu className="w-4 h-4" />
  );

export const BlogPage: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');

  const posts = useMemo(() => {
    const sorted = [...blogPosts].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return filter === 'All' ? sorted : sorted.filter((p) => p.category === filter);
  }, [filter]);

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
          Thoughts on game production, MVP builds, and where AI actually earns its place in the
          stack — written by the people shipping the work.
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mt-10">
          {(['All', 'Gaming', 'AI'] as Filter[]).map((f) => (
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

      {/* Post grid */}
      <section className="px-6 md:px-[8vw] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
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

        {posts.length === 0 && (
          <p className="body-text text-center py-20">No posts in this category yet.</p>
        )}
      </section>

      <PageFooter />
    </div>
  );
};

export default BlogPage;
