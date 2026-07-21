import React from 'react';
import { Gamepad2, Cpu, Network, Cloud, Activity } from 'lucide-react';

export const BLOG_CATEGORIES = [
  'Gaming',
  'AI',
  'System Design',
  'Cloud Architecture',
  'Observability',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const ICONS: Record<BlogCategory, React.ComponentType<{ className?: string }>> = {
  Gaming: Gamepad2,
  AI: Cpu,
  'System Design': Network,
  'Cloud Architecture': Cloud,
  Observability: Activity,
};

export const categoryIcon = (category: BlogCategory) => {
  const Icon = ICONS[category];
  return React.createElement(Icon, { className: 'w-4 h-4' });
};
