import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Journal', to: '/blog' },
  { label: 'Canvas & Chill', to: '/canvas-and-chill' },
];

export const PageHeader: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-chalet-black/90 backdrop-blur-md border-b border-chalet-ivory/10">
      <div className="flex items-center justify-between px-6 md:px-[8vw] py-4">
        <Link to="/" className="label-mono text-chalet-ivory hover:text-chalet-gold transition-colors">
          CHALET HUB
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.to || (item.to === '/blog' && pathname.startsWith('/blog'));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`label-mono transition-colors ${
                  isActive ? 'text-chalet-gold' : 'text-chalet-muted hover:text-chalet-ivory'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
