import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NotchedFrame } from '../components/NotchedFrame';
import { ArrowRight, Mail, MapPin, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  onNavigate: (section: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const floatingCardRef = useRef<HTMLDivElement>(null);

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
        0.7
      );

      scrollTl.fromTo(
        rightPanelRef.current,
        { x: 0, opacity: 1 },
        { x: '20vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, headlineRef.current, bodyRef.current, ctaRef.current],
        { y: 0, opacity: 1 },
        { y: '-6vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        floatingCardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        frameRef.current,
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
      id="contact"
      className="section-pinned z-[60]"
    >
      {/* Left Photo Panel */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 w-1/2 h-full z-[2]"
        style={{ 
          backgroundImage: 'url(/images/contact_collab.jpg)',
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
        <span className="label-mono text-chalet-gold">CONTACT</span>
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
          <span className="block">LET'S</span>
          <span className="block">CONNECT</span>
        </h2>
      </div>

      {/* Body */}
      <div 
        ref={bodyRef}
        className="absolute z-[4]"
        style={{ 
          left: '58vw', 
          top: '70vh',
          width: '30vw',
          maxWidth: '380px',
          opacity: 0
        }}
      >
        <p className="body-text">
          Questions, ideas, or just want to say hello? We'll reply within 48 hours.
        </p>
      </div>

      {/* CTA */}
      <button 
        ref={ctaRef}
        onClick={() => onNavigate('closing')}
        className="absolute z-[4] btn-primary group"
        style={{ 
          left: '58vw', 
          bottom: '12vh',
          opacity: 0
        }}
      >
        Send a message
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

      {/* Floating Contact Card */}
      <div 
        ref={floatingCardRef}
        className="absolute z-[5] floating-card animate-float"
        style={{ 
          left: '44vw', 
          top: '18vh', 
          width: '26vw',
          minWidth: '280px',
          opacity: 0
        }}
      >
        <div className="p-6 bg-chalet-black/90 backdrop-blur-sm rounded-lg border border-chalet-ivory/10">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Mail className="w-4 h-4 text-chalet-gold" />
                <span className="label-mono text-chalet-muted">Email</span>
              </div>
              <p className="text-chalet-ivory font-medium">hello@chalethub.co.za</p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-chalet-gold" />
                <span className="label-mono text-chalet-muted">Location</span>
              </div>
              <p className="text-chalet-ivory font-medium">Remote / UTC+02:00</p>
            </div>
            
            <div className="pt-2 border-t border-chalet-ivory/10">
              <button className="link-gold flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                Book a call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
