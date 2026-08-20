import React from 'react';
import { Layers, Cloud, Activity, Sparkles } from 'lucide-react';

// Aligned to the four content pillars in the Chalet Hub Business &
// Architecture Vision (v2): Software Architecture, Cloud Architecture,
// DevOps & Observability, AI & Emerging Technology.
export const BLOG_CATEGORIES = [
  'Software Architecture',
  'Cloud Architecture',
  'DevOps & Observability',
  'AI & Emerging Technology',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const ICONS: Record<BlogCategory, React.ComponentType<{ className?: string }>> = {
  'Software Architecture': Layers,
  'Cloud Architecture': Cloud,
  'DevOps & Observability': Activity,
  'AI & Emerging Technology': Sparkles,
};

export const categoryIcon = (category: BlogCategory) => {
  const Icon = ICONS[category];
  if (!Icon) return null;
  return React.createElement(Icon, { className: 'w-4 h-4' });
};
