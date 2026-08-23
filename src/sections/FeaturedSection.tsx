import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FeaturedSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=85%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: '-55vw' },
        { x: 0, ease: 'none' },
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
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { y: '6vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none', stagger: 0.02 },
        0.08
      );

      scrollTl.fromTo(
        floatingCardRef.current,
        { x: '20vw', scale: 0.92, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: 'none' },
        0.1
      );

      // SETTLE (30% - 70%) - hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        leftPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '-20vw', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        floatingCardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.5
      );

      scrollTl.fromTo(
        frameRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.55
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="featured"
      className="section-pinned z-40"
    >
      {/* Left Dark Panel */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full dark-panel z-[2]"
        style={{ transform: 'translateX(-55vw)' }}
      />

      {/* Right Photo Panel */}
      <div 
        ref={rightPanelRef}
        className="absolute right-0 top-0 w-1/2 h-full z-[2]"
        style={{ 
          backgroundImage: 'url(/images/featured_cabin_exterior.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'translateX(55vw)'
        }}
      />

      {/* Left Notched Frame */}
      <div 
        ref={frameRef}
        className="absolute z-[3]"
        style={{ 
          left: '6vw', 
          right: '56vw', 
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
        style={{ left: '8vw', top: '14vh', opacity: 0 }}
      >
        <span className="label-mono text-chalet-gold">IN PRACTICE</span>
      </div>

      {/* Headline */}
      <div 
        ref={headlineRef}
        className="absolute z-[4]"
        style={{ 
          left: '8vw', 
          top: '54vh', 
          transform: 'translateY(-50%)',
          width: '34vw',
          opacity: 0
        }}
      >
        <h2 className="headline-lg text-chalet-ivory">
          <span className="block">ONE DASHBOARD</span>
          <span className="block">EVERY SIGNAL</span>
        </h2>
      </div>

      {/* Body */}
      <div 
        ref={bodyRef}
        className="absolute z-[4]"
        style={{ 
          left: '8vw', 
          top: '70vh',
          width: '32vw',
          maxWidth: '400px',
          opacity: 0
        }}
      >
        <p className="body-text">
          A Grafana observability platform federating Prometheus, BigQuery, and CloudWatch into a single pane of glass.
        </p>
      </div>

      {/* CTA */}
      <Link 
        ref={ctaRef}
        to="/blog/metrics-logs-traces-one-question-three-ways"
        className="absolute z-[4] link-gold flex items-center gap-2 group"
        style={{ 
          left: '8vw', 
          bottom: '12vh',
          opacity: 0
        }}
      >
        Read how it works
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>

      {/* Floating Image Card */}
      <div 
        ref={floatingCardRef}
        className="absolute z-[5] floating-card animate-float"
        style={{ 
          left: '44vw', 
          top: '18vh', 
          width: '26vw', 
          height: '34vh',
          opacity: 0
        }}
      >
        <div 
          className="w-full h-full rounded-lg overflow-hidden"
          style={{
            backgroundImage: 'url(/images/featured_interior_card.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 border border-chalet-ivory/20 rounded-lg pointer-events-none" />
      </div>
    </section>
  );
};

export default FeaturedSection;
