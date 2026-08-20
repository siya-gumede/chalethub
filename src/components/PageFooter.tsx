import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Palette, Shield, Wine, BookOpen } from 'lucide-react';

export const PageFooter: React.FC = () => {
  return (
    <footer className="mt-20 pt-10 pb-10 border-t border-chalet-ivory/10 px-6 md:px-[8vw] bg-chalet-charcoal">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-chalet-muted text-sm">
          <Mail className="w-4 h-4 text-chalet-gold" />
          <a href="mailto:hello@chalethub.co.za" className="hover:text-chalet-ivory transition-colors">
            hello@chalethub.co.za
          </a>
        </div>

        <p className="text-chalet-muted text-sm">© Chalet Hub. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <Link to="/blog" className="text-chalet-muted hover:text-chalet-gold transition-colors text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Journal
          </Link>
          <Link to="/canvas-and-chill" className="text-chalet-muted hover:text-chalet-ivory transition-colors text-sm flex items-center gap-2">
            <Wine className="w-4 h-4" />
            Canvas &amp; Chill
          </Link>
          <a href="#" className="text-chalet-muted hover:text-chalet-ivory transition-colors text-sm flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </a>
          <a href="#" className="text-chalet-muted hover:text-chalet-ivory transition-colors text-sm flex items-center gap-2">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a href="#" className="text-chalet-muted hover:text-chalet-ivory transition-colors text-sm flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Behance
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PageFooter;
