import { useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import { Navigation } from '../components/Navigation';
import { HeroSection } from '../sections/HeroSection';
import { CapabilitiesSection } from '../sections/CapabilitiesSection';
import { ProcessSection } from '../sections/ProcessSection';
import { FeaturedSection } from '../sections/FeaturedSection';
import { ImpactSection } from '../sections/ImpactSection';
import { ContactSection } from '../sections/ContactSection';
import { ClosingSection } from '../sections/ClosingSection';
import { FormSection } from '../sections/FormSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function HomePage() {
  // Navigation handler
  const handleNavigate = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 0 },
        ease: 'power3.inOut'
      });
    }
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from actual pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      // Clean up all ScrollTriggers created on this page when we navigate away
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isFormField =
        target &&
        (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable);
      if (isFormField) return;

      const pinnedSections = ['hero', 'capabilities', 'process', 'featured', 'impact', 'contact', 'closing'];
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find current section
      let currentIndex = 0;
      for (let i = 0; i < pinnedSections.length; i++) {
        const section = document.getElementById(pinnedSections[i]);
        if (section && section.offsetTop <= currentScroll + windowHeight / 2) {
          currentIndex = i;
        }
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        const nextIndex = Math.min(currentIndex + 1, pinnedSections.length - 1);
        handleNavigate(pinnedSections[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        const prevIndex = Math.max(currentIndex - 1, 0);
        handleNavigate(pinnedSections[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNavigate]);

  return (
    <div className="relative bg-chalet-black min-h-screen">
      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main content */}
      <main className="relative">
        <HeroSection onNavigate={handleNavigate} />
        <CapabilitiesSection onNavigate={handleNavigate} />
        <ProcessSection />
        <FeaturedSection />
        <ImpactSection onNavigate={handleNavigate} />
        <ContactSection onNavigate={handleNavigate} />
        <ClosingSection onNavigate={handleNavigate} />
        <FormSection />
      </main>
    </div>
  );
}

export default HomePage;
