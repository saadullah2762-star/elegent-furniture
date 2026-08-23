'use client';

import { ArrowDown, ArrowUpRight, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  ['01', 'Kitchens', 'Custom cabinetry & seamless living', 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=85'],
  ['02', 'Living Rooms', 'Statement pieces for everyday life', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'],
  ['03', 'Bedrooms', 'Quiet spaces, tailored to you', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85'],
  ['04', 'Wardrobes', 'Storage designed as architecture', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85'],
  ['05', 'Office', 'Focused spaces with character', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85'],
  ['06', 'Media Walls', 'A refined centre for the room', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'],
];

function DoorLeaf({ side }: { side: 'left' | 'right' }) {
  const isLeft = side === 'left';
  return (
    <div
      className={`door-leaf absolute top-0 h-full w-1/2 overflow-hidden bg-[#3b2415] ${isLeft ? 'left-0 origin-left' : 'right-0 origin-right'}`}
      style={{
        background: 'linear-gradient(90deg, #1c1009 0%, #5a351d 18%, #7b4b29 48%, #3d2415 82%, #180d07 100%)',
        boxShadow: isLeft ? 'inset -22px 0 40px rgba(0,0,0,.65)' : 'inset 22px 0 40px rgba(0,0,0,.65)',
      }}
    >
      <div className="absolute inset-0 opacity-45" style={{ backgroundImage: 'repeating-linear-gradient(92deg, transparent 0, transparent 17px, rgba(255,210,145,.055) 18px, transparent 20px, transparent 43px)' }} />
      <div className="absolute inset-[7%_9%] rounded-[3px] border border-[#c8945d]/30 p-[4%] shadow-[inset_0_0_35px_rgba(0,0,0,.4)]">
        <div className="h-[46%] rounded-[2px] border-[3px] border-[#1c1009]/70 bg-[linear-gradient(145deg,rgba(255,220,160,.09),rgba(0,0,0,.2))] shadow-[inset_0_0_20px_rgba(0,0,0,.45)]" />
        <div className="mt-[7%] h-[38%] rounded-[2px] border-[3px] border-[#1c1009]/70 bg-[linear-gradient(145deg,rgba(255,220,160,.08),rgba(0,0,0,.22))] shadow-[inset_0_0_20px_rgba(0,0,0,.45)]" />
      </div>
      <div className={`absolute top-1/2 z-20 h-16 w-5 -translate-y-1/2 rounded-full bg-gradient-to-b from-[#f1d08b] via-[#8d6128] to-[#f1d08b] shadow-[0_2px_12px_rgba(0,0,0,.7)] ${isLeft ? 'right-[-10px]' : 'left-[-10px]'}`} />
      <div className={`absolute bottom-8 text-[8px] tracking-[.35em] text-[#e8c48b]/45 ${isLeft ? 'left-8' : 'right-8'}`}>ELEGENT</div>
    </div>
  );
}

export default function Home() {
  const hero = useRef<HTMLDivElement>(null);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [showDoors, setShowDoors] = useState(true);

  useEffect(() => {
    const openTimer = window.setTimeout(() => setDoorsOpen(true), 900);
    const removeTimer = window.setTimeout(() => setShowDoors(false), 2800);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  useEffect(() => {
    if (!hero.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-image', { scale: 1.08, yPercent: 5, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => gsap.from(section, { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 82%' } }));
      gsap.utils.toArray<HTMLElement>('.collection-card').forEach((card) => gsap.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
    }, hero);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={hero} className="bg-ink text-paper">
      {showDoors && (
        <div className="fixed inset-0 z-[200] overflow-hidden bg-black" style={{ perspective: '1800px' }}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(170,105,55,.16),rgba(0,0,0,.88)_72%)]" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '1800px' }}>
            <div
              className="relative h-full w-full transition-transform duration-[1900ms] ease-[cubic-bezier(.77,0,.175,1)]"
              style={{ transformStyle: 'preserve-3d', transform: doorsOpen ? 'translateZ(-70px)' : 'translateZ(0)' }}
            >
              <div className="absolute inset-y-0 left-1/2 z-30 w-[2px] -translate-x-1/2 bg-black shadow-[0_0_16px_rgba(0,0,0,.9)]" />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{ opacity: doorsOpen ? 0 : 1 }}
              >
                <div className="absolute left-1/2 top-[7%] z-40 -translate-x-1/2 text-center text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.8)]">
                  <p className="text-[9px] tracking-[.55em] text-white/55">WELCOME TO</p>
                  <p className="mt-3 text-3xl font-light tracking-[.3em] md:text-5xl">ELEGENT</p>
                </div>
              </div>
              <div className="absolute inset-0 z-20" style={{ transformStyle: 'preserve-3d' }}>
                <div
                  className="absolute inset-y-0 left-0 w-1/2 transition-transform duration-[1900ms] ease-[cubic-bezier(.77,0,.175,1)]"
                  style={{ transform: doorsOpen ? 'rotateY(-102deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
                >
                  <DoorLeaf side="left" />
                </div>
                <div
                  className="absolute inset-y-0 right-0 w-1/2 transition-transform duration-[1900ms] ease-[cubic-bezier(.77,0,.175,1)]"
                  style={{ transform: doorsOpen ? 'rotateY(102deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
                >
                  <DoorLeaf side="right" />
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-[8px] tracking-[.45em] text-white/35 transition-opacity duration-500" style={{ opacity: doorsOpen ? 0 : 1 }}>
                ENTER
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
        <div className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"><div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div><div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button></nav>
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14"><p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-white/75">Karachi · Custom Furniture</p><h1 className="max-w-5xl text-[10vw] font-light leading-[.9] tracking-[-.055em] md:text-[8vw]">Furniture,<br /><span className="italic">crafted for you.</span></h1><div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80">Custom furniture made for your home, your style, and your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[.12em] text-ink uppercase">Explore collections <ArrowDown size={15} className="ml-3 inline" /></a></div></div>
      </section>
      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>
      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => <article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div></section>
      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>
      <section id="contact" className="reveal-section grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-40 lg:px-14 lg:py-44"><div><p className="mb-8 text-xs tracking-[.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.92] tracking-[-.06em] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/60">Tell us about your space, measurements and ideas. We&apos;ll turn them into furniture made around you.</p><a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-4 text-xs tracking-[.15em] uppercase hover:bg-paper hover:text-ink">Start a project <ArrowUpRight size={15} className="ml-2 inline" /></a></div></section>
    </main>
  );
}
