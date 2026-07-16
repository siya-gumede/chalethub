import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      entranceTl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 0.9 },
        0
      );

      // Frame entrance
      entranceTl.fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9 },
        0.2
      );

      // Label entrance
      entranceTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.4
      );

      // Headline staggered entrance
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        entranceTl.fromTo(
          headlineLines,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          0.5
        );
      }

      // Microcopy + CTA entrance
      entranceTl.fromTo(
        [microcopyRef.current, ctaRef.current],
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        0.8
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([bgRef.current, frameRef.current, labelRef.current], { opacity: 1, x: 0, y: 0, scale: 1 });
            if (headlineLines) gsap.set(headlineLines, { opacity: 1, x: 0, y: 0 });
            gsap.set([microcopyRef.current, ctaRef.current], { opacity: 1, x: 0, y: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      if (headlineLines) {
        scrollTl.fromTo(
          headlineLines,
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        microcopyRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        frameRef.current,
        { scale: 1, opacity: 0.75 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1 },
        { scale: 1.05, ease: 'none' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="hero"
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="bg-image"
        style={{ 
          backgroundImage: 'url(/images/hero_cabin_night.jpg)',
          opacity: 0 
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-chalet-black/40 via-transparent to-chalet-black/60 z-[2]" />

      {/* Notched Frame */}
      <div 
        ref={frameRef}
        className="absolute z-[3]"
        style={{ 
          left: '6vw', 
          right: '6vw', 
          top: '7vh', 
          bottom: '7vh',
          opacity: 0
        }}
      >
        <NotchedFrame />
      </div>

      {/* Top Left Label */}
      <div 
        ref={labelRef}
        className="absolute left-[8vw] top-[10vh] z-[4]"
        style={{ opacity: 0 }}
      >
        <span className="label-mono text-chalet-ivory">CHALET HUB</span>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute right-[8vw] top-[10vh] z-[4] hidden md:flex items-center gap-8">
        <button onClick={() => onNavigate('featured')} className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors">
          Work
        </button>
        <button onClick={() => onNavigate('capabilities')} className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors">
          Services
        </button>
        <button onClick={() => onNavigate('process')} className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors">
          Studio
        </button>
        <button onClick={() => onNavigate('contact')} className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors">
          Contact
        </button>
        <span className="w-px h-4 bg-chalet-ivory/15" />
        <Link to="/canvas-and-chill" className="label-mono text-chalet-gold hover:text-chalet-ivory transition-colors">
          Canvas &amp; Chill
        </Link>
        <Link to="/blog" className="label-mono text-chalet-muted hover:text-chalet-ivory transition-colors">
          Journal
        </Link>
      </div>

      {/* Hero Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[8vw] top-[52vh] -translate-y-1/2 z-[4]"
        style={{ width: '62vw' }}
      >
        <h1 className="headline-xl text-chalet-ivory">
          <span className="headline-line block">CRAFTING</span>
          <span className="headline-line block">WORLDS</span>
          <span className="headline-line block">SHIPPING PRODUCTS</span>
        </h1>
      </div>

      {/* Bottom Left Microcopy */}
      <div 
        ref={microcopyRef}
        className="absolute left-[8vw] bottom-[12vh] z-[4]"
        style={{ width: '34vw', maxWidth: '400px' }}
      >
        <p className="body-text">
          Game assets & MVP builds—designed, built, and delivered.
        </p>
      </div>

      {/* Bottom Right CTA */}
      <button 
        ref={ctaRef}
        onClick={() => onNavigate('featured')}
        className="absolute right-[8vw] bottom-[12vh] z-[4] btn-primary group"
      >
        View selected work
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default HeroSection;
