import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CapabilitiesSectionProps {
  onNavigate: (section: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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
        leftPanelRef.current,
        { x: '-55vw', opacity: 1 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: '55vw' },
        { x: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        frameRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '10vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.08
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.12
      );

      // SETTLE (30% - 70%) - elements hold position

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-30vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        frameRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
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
      id="capabilities"
      className="section-pinned z-20"
    >
      {/* Left Photo Panel */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full z-[2]"
        style={{ 
          backgroundImage: 'url(/images/capabilities_portrait.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateX(-55vw)'
        }}
      />

      {/* Right Dark Panel */}
      <div 
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full dark-panel z-[2]"
        style={{ transform: 'translateX(55vw)' }}
      />

      {/* Right Notched Frame */}
      <div 
        ref={frameRef}
        className="absolute z-[3]"
        style={{ 
          left: '56vw', 
          right: '6vw', 
          top: '10vh', 
          bottom: '10vh',
          opacity: 0
        }}
      >
        <NotchedFrame inset={{ left: 2, right: 2, top: 2, bottom: 2 }} />
      </div>

      {/* Label */}
      <div 
        ref={labelRef}
        className="absolute z-[4]"
        style={{ left: '58vw', top: '14vh', opacity: 0 }}
      >
        <span className="label-mono text-chalet-gold">SERVICES</span>
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute z-[4]"
        style={{ 
          left: '58vw', 
          top: '54vh', 
          transform: 'translateY(-50%)',
          width: '34vw',
          opacity: 0
        }}
      >
        <h2 className="headline-lg text-chalet-ivory">
          <span className="block">CLOUD</span>
          <span className="block">AUTOMATION</span>
          <span className="block">OBSERVABILITY</span>
        </h2>
      </div>

      {/* Body */}
      <div 
        ref={bodyRef}
        className="absolute z-[4]"
        style={{ 
          left: '58vw', 
          top: '72vh',
          width: '30vw',
          maxWidth: '380px',
          opacity: 0
        }}
      >
        <p className="body-text">
          We architect resilient cloud systems, automate the path to production, and give you full visibility into how it all runs.
        </p>
      </div>

      {/* CTA */}
      <button 
        ref={ctaRef}
        onClick={() => onNavigate('process')}
        className="absolute z-[4] link-gold flex items-center gap-2 group"
        style={{ 
          left: '58vw', 
          bottom: '12vh',
          opacity: 0
        }}
      >
        See our process
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </section>
  );
};

export default CapabilitiesSection;
