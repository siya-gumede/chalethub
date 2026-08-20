import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const target = document.getElementById('form');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const scrollItems = [
    { label: 'Work', section: 'featured' },
    { label: 'Pillars', section: 'capabilities' },
    { label: 'Journey', section: 'process' },
    { label: 'Contact', section: 'contact' },
  ];

  const routeItems = [
    { label: 'Journal', to: '/blog', accent: true },
    { label: 'Canvas & Chill', to: '/canvas-and-chill', accent: false },
  ];

  const handleScrollClick = (section: string) => {
    setIsMenuOpen(false);
    onNavigate(section);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 opacity-100 translate-y-0 ${
        isVisible
          ? 'md:opacity-100 md:translate-y-0'
          : 'md:opacity-0 md:-translate-y-4 md:pointer-events-none'
      }`}
    >
      <div className="bg-chalet-black/90 md:bg-chalet-black/80 backdrop-blur-md border-b border-chalet-ivory/10">
        <div className="flex items-center justify-between px-6 md:px-8 py-4">
          <button
            onClick={() => handleScrollClick('hero')}
            className="label-mono text-chalet-ivory hover:text-chalet-gold transition-colors"
          >
            CHALET HUB
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {scrollItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors"
              >
                {item.label}
              </button>
            ))}
            <span className="w-px h-4 bg-chalet-ivory/15" />
            {routeItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`label-mono transition-colors ${
                  item.accent
                    ? 'text-chalet-gold hover:text-chalet-ivory'
                    : 'text-chalet-muted hover:text-chalet-ivory'
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
            {scrollItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleScrollClick(item.section)}
                className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors text-left py-3 border-b border-chalet-ivory/5"
              >
                {item.label}
              </button>
            ))}
            {routeItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`label-mono transition-colors text-left py-3 ${
                  item.accent ? 'text-chalet-gold' : 'text-chalet-muted hover:text-chalet-ivory'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
