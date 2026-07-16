import React, { useState } from 'react';
import {
  Wine,
  Palette,
  Users,
  Sparkles,
  ArrowRight,
  Clock,
  Utensils,
  Shirt,
  Gift,
  Camera,
  Send,
  Instagram,
} from 'lucide-react';
import { PageHeader } from '../components/PageHeader';
import { PageFooter } from '../components/PageFooter';

const audience = [
  'Married couples (28–45)',
  'Young professionals',
  'Business owners',
  'Couples wanting a unique date night',
  'Lifestyle creators (5k–50k followers)',
  'Friends who enjoy premium experiences',
];

const timeline = [
  {
    time: '5:30 PM',
    title: 'Arrival & Welcome Drink',
    body: 'Guests arrive to soft Afro Soul / Jazz, first-name-only name tags, and a welcome pour.',
  },
  {
    time: '6:00 PM',
    title: 'Welcome',
    body: '"Tonight isn\u2019t about painting the perfect picture. It\u2019s about slowing down, connecting and having fun." Five minutes is enough.',
  },
  {
    time: '6:10 PM',
    title: 'Painting Begins',
    body: 'Brushes down, music up — a curated playlist while we walk the room and get couples talking.',
  },
  {
    time: '7:00 PM',
    title: 'Grazing Break',
    body: 'Cheese, biltong, crackers, grapes, strawberries — and the best photo op of the night.',
  },
  {
    time: '7:15 PM',
    title: 'Back to the Canvas',
    body: 'Couples help each other finish up — this is where the real laughs happen.',
  },
  {
    time: '8:00 PM',
    title: 'Photo Session',
    body: 'A branded backdrop under the pergola. This is where the content gets made.',
  },
  {
    time: '8:30 PM',
    title: 'Networking',
    body: 'Wine, music, conversation. No pressure to leave — the night winds down on its own terms.',
  },
];

const dressCode = ['Neutral', 'White', 'Beige', 'Stone', 'Cream', 'Black'];
const food = ['Cheese', 'Crackers', 'Fruit', 'Chocolate', 'Olives', 'Biltong'];
const touches = [
  'Personalized place cards',
  'Welcome sign',
  'Candles',
  'Fresh flowers',
  'Branded aprons',
  'Matching wine glasses',
  'Linen napkins',
  'Ambient music before doors open',
];
const giftBag = [
  'Mini chocolate',
  'Thank-you card',
  'Discount for the next event',
  'Small branded paintbrush',
  'QR code to the photo gallery',
];

export const CanvasAndChillPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', guests: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', guests: '', message: '' });
    }, 1400);
  };

  return (
    <div className="bg-chalet-black min-h-screen">
      <PageHeader />

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/canvas_chill_venue.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-chalet-black via-chalet-black/70 to-chalet-black/30" />

        <div className="relative z-10 px-6 md:px-[8vw] pb-16 md:pb-24 w-full">
          <span className="label-mono text-chalet-gold flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4" />A Chalet Hub Experience
          </span>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-chalet-ivory leading-[1.02]">
            Canvas <span className="font-script text-chalet-gold font-normal text-6xl md:text-8xl align-middle">&amp; Chill</span>
          </h1>
          <p className="label-mono text-chalet-muted mt-6 tracking-[0.25em]">
            PAINT &nbsp;·&nbsp; SIP &nbsp;·&nbsp; CONNECT
          </p>
          <p className="body-text max-w-xl mt-6 text-base md:text-lg">
            An intimate evening of wine, conversation and creativity. This isn&rsquo;t an art
            class — it&rsquo;s a curated social evening where couples disconnect from work and
            reconnect with each other, while meeting interesting people.
          </p>
          <div className="flex flex-wrap gap-4 mt-10">
            <a href="#reserve" className="btn-primary group">
              Reserve your spot
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#details" className="btn-outline">
              See how the evening flows
            </a>
          </div>
        </div>
      </section>

      {/* Exclusivity / Audience */}
      <section className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <span className="label-mono text-chalet-gold">WHO IT&rsquo;S FOR</span>
            <h2 className="headline-lg text-chalet-ivory mt-4 mb-6">
              EXCLUSIVE.
              <br />
              LIMITED TO 12 COUPLES.
            </h2>
            <p className="body-text max-w-md">
              This isn&rsquo;t &ldquo;everyone welcome.&rdquo; It&rsquo;s a small room, on
              purpose — every event is capped so the evening stays intimate and every couple
              gets a real moment.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {audience.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-chalet-charcoal border border-chalet-ivory/10 rounded-lg px-5 py-4"
                >
                  <Users className="w-4 h-4 text-chalet-gold flex-shrink-0" />
                  <span className="text-chalet-ivory text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="label-mono text-chalet-muted mt-6">
              10 couples comfortably · 12 couples maximum · first events start at 8–10
            </p>
          </div>
        </div>
      </section>

      {/* Event flow timeline */}
      <section id="details" className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <span className="label-mono text-chalet-gold">THE EVENING</span>
        <h2 className="headline-lg text-chalet-ivory mt-4 mb-14 max-w-2xl">
          FIVE HOURS, NO RUSH.
        </h2>

        <div className="space-y-0">
          {timeline.map((step, i) => (
            <div
              key={step.time}
              className={`flex flex-col md:flex-row gap-4 md:gap-10 py-8 ${
                i !== timeline.length - 1 ? 'border-b border-chalet-ivory/10' : ''
              }`}
            >
              <div className="md:w-40 flex-shrink-0 flex items-center gap-2">
                <Clock className="w-4 h-4 text-chalet-gold" />
                <span className="label-mono text-chalet-gold">{step.time}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-chalet-ivory mb-2">
                  {step.title}
                </h3>
                <p className="body-text max-w-xl">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The details: dress code, food, drinks */}
      <section className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-chalet-charcoal rounded-xl p-8 border border-chalet-ivory/10">
            <Shirt className="w-6 h-6 text-chalet-gold mb-4" />
            <h3 className="font-display text-lg font-semibold text-chalet-ivory mb-2">Dress Code</h3>
            <p className="body-text mb-5">
              Neutral tones make every photo cohesive — think a single, calm palette in the room.
            </p>
            <div className="flex flex-wrap gap-2">
              {dressCode.map((c) => (
                <span
                  key={c}
                  className="label-mono text-chalet-muted border border-chalet-ivory/15 rounded-full px-3 py-1"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-chalet-charcoal rounded-xl p-8 border border-chalet-ivory/10">
            <Utensils className="w-6 h-6 text-chalet-gold mb-4" />
            <h3 className="font-display text-lg font-semibold text-chalet-ivory mb-2">Grazing, Not Dinner</h3>
            <p className="body-text mb-5">
              Boards over plates. It looks luxurious, keeps the room mingling, and costs less.
            </p>
            <div className="flex flex-wrap gap-2">
              {food.map((f) => (
                <span
                  key={f}
                  className="label-mono text-chalet-muted border border-chalet-ivory/15 rounded-full px-3 py-1"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-chalet-charcoal rounded-xl p-8 border border-chalet-ivory/10">
            <Wine className="w-6 h-6 text-chalet-gold mb-4" />
            <h3 className="font-display text-lg font-semibold text-chalet-ivory mb-2">Drinks</h3>
            <p className="body-text mb-5">
              A welcome glass of wine is included, plus water and juice throughout the evening.
            </p>
            <p className="label-mono text-chalet-muted">Extra drinks available separately</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <span className="label-mono text-chalet-gold">PRICING</span>
        <h2 className="headline-lg text-chalet-ivory mt-4 mb-14 max-w-2xl">
          SIMPLE, PER-PERSON PRICING.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative bg-chalet-black border-2 border-chalet-gold rounded-xl p-8 md:p-10">
            <span className="label-mono text-chalet-gold">LAUNCH EVENT</span>
            <div className="font-serif text-5xl font-semibold text-chalet-ivory mt-4 mb-6">
              R450 <span className="text-lg text-chalet-muted font-sans">/ person</span>
            </div>
            <ul className="space-y-3">
              {['Canvas, paint & brushes', 'Welcome drink', 'Grazing snacks', 'Event photos', 'Gift bag'].map(
                (inc) => (
                  <li key={inc} className="flex items-center gap-3 text-chalet-ivory text-sm">
                    <Palette className="w-4 h-4 text-chalet-gold flex-shrink-0" />
                    {inc}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="bg-chalet-charcoal border border-chalet-ivory/10 rounded-xl p-8 md:p-10">
            <span className="label-mono text-chalet-muted">REGULAR EVENTS</span>
            <div className="font-serif text-5xl font-semibold text-chalet-ivory mt-4 mb-6">
              R550&ndash;650 <span className="text-lg text-chalet-muted font-sans">/ person</span>
            </div>
            <p className="body-text">
              Same full experience — canvas, paint, welcome drink, grazing snacks, photos and a gift
              bag — priced for our ongoing calendar once the launch event has sold out.
            </p>
          </div>
        </div>
      </section>

      {/* Premium touches + gift bag */}
      <section className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="label-mono text-chalet-gold">MADE TO FEEL PREMIUM</span>
            <h2 className="headline-lg text-chalet-ivory mt-4 mb-8 max-w-md">
              THE SMALL TOUCHES.
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {touches.map((t) => (
                <li key={t} className="flex items-center gap-3 text-chalet-ivory text-sm">
                  <Sparkles className="w-4 h-4 text-chalet-gold flex-shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="label-mono text-chalet-gold">EVERYONE LEAVES WITH</span>
            <h2 className="headline-lg text-chalet-ivory mt-4 mb-8 max-w-md">
              THE GIFT BAG.
            </h2>
            <ul className="space-y-3">
              {giftBag.map((g) => (
                <li key={g} className="flex items-center gap-3 text-chalet-ivory text-sm">
                  <Gift className="w-4 h-4 text-chalet-gold flex-shrink-0" />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Signature feature + creator collab */}
      <section className="px-6 md:px-[8vw] py-20 md:py-28 border-b border-chalet-ivory/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-chalet-charcoal to-chalet-black rounded-xl p-8 md:p-10 border border-chalet-gold/30">
            <Camera className="w-6 h-6 text-chalet-gold mb-4" />
            <h3 className="font-display text-xl font-semibold text-chalet-ivory mb-3">
              The Signature Spot
            </h3>
            <p className="body-text">
              A warm-white neon &ldquo;Canvas &amp; Chill&rdquo; sign under the pergola, flowing
              beige curtains, lounge seating and candles everywhere. Every guest wants a photo
              there — and every post becomes free advertising for the next event.
            </p>
          </div>

          <div className="bg-chalet-charcoal rounded-xl p-8 md:p-10 border border-chalet-ivory/10">
            <Instagram className="w-6 h-6 text-chalet-gold mb-4" />
            <h3 className="font-display text-xl font-semibold text-chalet-ivory mb-3">
              Creator Collab
            </h3>
            <p className="body-text">
              A handful of lifestyle creators and couple-content creators join select evenings as
              guests. If you make content and love the concept, get in touch — we&rsquo;d love to
              have you at the table.
            </p>
          </div>
        </div>
      </section>

      {/* Booking / interest form */}
      <section id="reserve" className="px-6 md:px-[8vw] py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="label-mono text-chalet-gold">RESERVE YOUR SPOT</span>
            <h2 className="headline-lg text-chalet-ivory mt-4 mb-6">
              JOIN THE NEXT EVENING.
            </h2>
            <p className="body-text max-w-md">
              Tell us a little about you and we&rsquo;ll be in touch with the next available
              date. Spots are limited to 12 couples per event.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-chalet-black rounded-xl p-8 md:p-10 border border-chalet-ivory/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-chalet-gold/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-chalet-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-chalet-ivory mb-3">
                    You&rsquo;re on the list!
                  </h3>
                  <p className="body-text">We&rsquo;ll reach out with the next available date.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="label-mono text-chalet-muted block mb-2">Name</label>
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
                      <label className="label-mono text-chalet-muted block mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-mono text-chalet-muted block mb-2">Number of guests</label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="form-input appearance-none cursor-pointer"
                    >
                      <option value="">Select</option>
                      <option value="1 couple">1 couple (2 guests)</option>
                      <option value="2 couples">2 couples (4 guests)</option>
                      <option value="3+ couples">3+ couples</option>
                    </select>
                  </div>

                  <div>
                    <label className="label-mono text-chalet-muted block mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Anything we should know?"
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
                        Request an invite
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
};

export default CanvasAndChillPage;
