import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { NotchedFrame } from '../components/NotchedFrame';
import { Mail, MapPin, Linkedin, Palette, Shield, Send, Wine, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const FormSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Flowing section animation
      gsap.fromTo(
        leftColRef.current,
        { x: '-4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        formCardRef.current,
        { y: '6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', budget: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      id="form"
      className="relative z-[80] bg-chalet-charcoal py-16 md:py-24"
    >
      <div className="px-8 md:px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column */}
          <div 
            ref={leftColRef}
            className="lg:col-span-5"
            style={{ opacity: 0 }}
          >
            <h2 className="headline-lg text-chalet-ivory mb-6">
              START A PROJECT
            </h2>
            
            <p className="body-text mb-10 max-w-md">
              Share a brief, a timeline, and what success looks like. We'll respond with next steps.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chalet-black border border-chalet-ivory/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-chalet-gold" />
                </div>
                <div>
                  <span className="label-mono text-chalet-muted block mb-1">Email</span>
                  <a href="mailto:hello@chalethub.studio" className="text-chalet-ivory hover:text-chalet-gold transition-colors">
                    hello@chalethub.studio
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-chalet-black border border-chalet-ivory/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-chalet-gold" />
                </div>
                <div>
                  <span className="label-mono text-chalet-muted block mb-1">Location</span>
                  <p className="text-chalet-ivory">Remote / UTC±2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form Card */}
          <div 
            ref={formCardRef}
            className="lg:col-span-7"
            style={{ opacity: 0 }}
          >
            <div className="relative bg-chalet-black rounded-xl p-8 md:p-10">
              {/* Notched border decoration */}
              <div className="absolute inset-0 pointer-events-none">
                <NotchedFrame 
                  className="opacity-30"
                  inset={{ left: 1, right: 1, top: 1, bottom: 1 }}
                />
              </div>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-chalet-gold/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-chalet-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-chalet-ivory mb-3">
                    Message Sent!
                  </h3>
                  <p className="body-text">
                    We'll get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-mono text-chalet-muted block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="label-mono text-chalet-muted block mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="label-mono text-chalet-muted block mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input appearance-none cursor-pointer"
                    >
                      <option value="">Select a range</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label-mono text-chalet-muted block mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-input resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-chalet-black/30 border-t-chalet-black rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer 
        ref={footerRef}
        className="mt-20 pt-10 border-t border-chalet-ivory/10 px-8 md:px-[8vw]"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-chalet-muted text-sm">
            © Chalet Hub. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/canvas-and-chill" className="text-chalet-muted hover:text-chalet-gold transition-colors text-sm flex items-center gap-2">
              <Wine className="w-4 h-4" />
              Canvas &amp; Chill
            </Link>
            <Link to="/blog" className="text-chalet-muted hover:text-chalet-ivory transition-colors text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Journal
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
    </section>
  );
};

export default FormSection;
