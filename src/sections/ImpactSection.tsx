import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ImpactSectionProps {
  onNavigate: (section: string) => void;
}

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onNavigate }) => {
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
        { x: '6vw', scale: 1.06, opacity: 0.7 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
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
        [paragraphRef.current, ctaRef.current],
        { y: '4vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.1
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
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
        [paragraphRef.current, ctaRef.current],
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
      id="impact"
      className="section-pinned z-50"
    >
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="bg-image"
        style={{ 
          backgroundImage: 'url(/images/impact_mountain_road.jpg)',
          opacity: 0.7,
          transform: 'translateX(6vw) scale(1.06)'
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-chalet-black/80 via-chalet-black/30 to-chalet-black/60 z-[2]" />

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
          <span className="block">WE DELIVER</span>
          <span className="block">THE UNEXPECTED</span>
        </h2>
      </div>

      {/* Bottom Left CTA */}
      <button 
        ref={ctaRef}
        onClick={() => onNavigate('contact')}
        className="absolute left-[8vw] bottom-[12vh] z-[4] btn-outline group"
        style={{ opacity: 0 }}
      >
        See milestones
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Bottom Right Paragraph */}
      <div 
        ref={paragraphRef}
        className="absolute right-[8vw] bottom-[12vh] z-[4] text-right"
        style={{ width: '34vw', maxWidth: '420px', opacity: 0 }}
      >
        <p className="body-text">
          Tight deadlines, complex systems, lean teams—we&rsquo;ve done it across industries.
        </p>
      </div>
    </section>
  );
};

export default ImpactSection;
