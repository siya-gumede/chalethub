import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Journal', to: '/blog' },
  { label: 'Canvas & Chill', to: '/canvas-and-chill' },
];

export const PageHeader: React.FC = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (to: string) => pathname === to || (to === '/blog' && pathname.startsWith('/blog'));

  return (
    <header className="sticky top-0 z-50 bg-chalet-black/90 backdrop-blur-md border-b border-chalet-ivory/10">
      <div className="flex items-center justify-between px-6 md:px-[8vw] py-4">
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="label-mono text-chalet-ivory hover:text-chalet-gold transition-colors"
        >
          CHALET HUB
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`label-mono transition-colors ${
                isActive(item.to) ? 'text-chalet-gold' : 'text-chalet-muted hover:text-chalet-ivory'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="md:hidden text-chalet-ivory p-1 -mr-1"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-1 border-t border-chalet-ivory/10">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className={`label-mono transition-colors text-left py-3 border-b border-chalet-ivory/5 last:border-b-0 ${
                isActive(item.to) ? 'text-chalet-gold' : 'text-chalet-muted hover:text-chalet-ivory'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default PageHeader;
