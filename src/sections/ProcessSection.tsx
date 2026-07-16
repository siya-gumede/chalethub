import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProcessSectionProps {
  onNavigate: (section: string) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        frameRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: '8vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        paragraphRef.current,
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.05, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        frameRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [ctaRef.current, paragraphRef.current],
        { y: 0, opacity: 1 },
        { y: '6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="process"
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="bg-image"
        style={{ 
          backgroundImage: 'url(/images/process_workspace.jpg)',
          opacity: 0.6,
          transform: 'scale(1.08)'
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-chalet-black/70 via-chalet-black/40 to-chalet-black/70 z-[2]" />

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

      {/* Label */}
      <div 
        ref={labelRef}
        className="absolute left-[8vw] top-[10vh] z-[4]"
        style={{ opacity: 0 }}
      >
        <span className="label-mono text-chalet-gold">STUDIO</span>
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute left-[8vw] top-[52vh] -translate-y-1/2 z-[4]"
        style={{ width: '70vw', opacity: 0 }}
      >
        <h2 className="headline-xl text-chalet-ivory">
          <span className="block">BUILT WITH CARE</span>
          <span className="block">SHIPPED WITH PRIDE</span>
        </h2>
      </div>

      {/* Bottom Left CTA */}
      <button 
        ref={ctaRef}
        onClick={() => onNavigate('contact')}
        className="absolute left-[8vw] bottom-[12vh] z-[4] btn-outline group"
        style={{ opacity: 0 }}
      >
        Meet the team
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Bottom Right Paragraph */}
      <div 
        ref={paragraphRef}
        className="absolute right-[8vw] bottom-[12vh] z-[4] text-right"
        style={{ width: '34vw', maxWidth: '420px', opacity: 0 }}
      >
        <p className="body-text">
          From first design doc to production—clear timelines, honest tradeoffs, and systems that hold up under load.
        </p>
      </div>
    </section>
  );
};

export default ProcessSection;
