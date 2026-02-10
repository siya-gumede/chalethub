import React, { useState, useEffect } from 'react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Work', section: 'featured' },
    { label: 'Services', section: 'capabilities' },
    { label: 'Studio', section: 'process' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-chalet-black/80 backdrop-blur-md border-b border-chalet-ivory/10">
        <div className="flex items-center justify-between px-8 py-4">
          <button 
            onClick={() => onNavigate('hero')}
            className="label-mono text-chalet-ivory hover:text-chalet-gold transition-colors"
          >
            CHALET HUB
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => onNavigate(item.section)}
                className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
