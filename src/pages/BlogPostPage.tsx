import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Gamepad2, Cpu } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="bg-chalet-black min-h-screen">
        <PageHeader />
        <div className="px-6 md:px-[8vw] py-32 text-center">
          <h1 className="headline-lg text-chalet-ivory mb-6">POST NOT FOUND</h1>
          <p className="body-text mb-8">That entry doesn&rsquo;t exist — or may have moved.</p>
          <Link to="/blog" className="btn-primary inline-flex">
            Back to the Journal
          </Link>
        </div>
        <PageFooter />
      </div>
    );
  }

  const related = getRelatedPosts(post.slug);

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
            {post.category === 'Gaming' ? (
              <Gamepad2 className="w-4 h-4" />
            ) : (
              <Cpu className="w-4 h-4" />
            )}
            {post.category}
          </div>

          <h1 className="headline-lg text-chalet-ivory mb-6">{post.title.toUpperCase()}</h1>

          <p className="text-chalet-muted text-sm mb-12">
            {formatDate(post.date)} · {post.readTime} · Chalet Hub Studio
          </p>

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="body-text text-base md:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
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
