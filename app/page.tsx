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

const heroSlides = [
  { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=92', label: 'Living Room' },
  { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=92', label: 'Bedroom' },
  { image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2400&q=92', label: 'Kitchen' },
  { image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=92', label: 'Wardrobe' },
  { image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=92', label: 'Luxury Interior' },
  { image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=92', label: 'Home Office' },
  { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=92', label: 'Interior Detail' },
  { image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2400&q=92', label: 'Modern Home' },
  { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=92', label: 'Contemporary Home' },
  { image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=92', label: 'Living Space' },
  { image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=92', label: 'Luxury Living' },
  { image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2400&q=92', label: 'Designer Interior' },
  { image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=2400&q=92', label: 'Statement Furniture' },
  { image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=88', label: 'Modern Lounge' },
  { image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=88', label: 'Master Bedroom' },
  { image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2400&q=88', label: 'Custom Kitchen' },
  { image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=88', label: 'Built-in Storage' },
  { image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=88', label: 'Executive Office' },
  { image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=88', label: 'Fine Details' },
];

export default function Home() {
  const hero = useRef<HTMLDivElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    let position = Math.floor(Math.random() * heroSlides.length);
    setHeroIndex(position);
    const interval = window.setInterval(() => {
      setHeroIndex((current) => {
        let next = Math.floor(Math.random() * heroSlides.length);
        while (next === current) next = Math.floor(Math.random() * heroSlides.length);
        setPreviousIndex(current);
        return next;
      });
    }, 6800);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), 3000);
    return () => window.clearTimeout(timer);
  }, [previousIndex]);

  useEffect(() => {
    if (!hero.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => gsap.from(section, { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 82%' } }));
      gsap.utils.toArray<HTMLElement>('.collection-card').forEach((card) => gsap.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
    }, hero);
    return () => ctx.revert();
  }, []);

  const current = heroSlides[heroIndex];
  const previous = previousIndex === null ? null : heroSlides[previousIndex];

  return (
    <main ref={hero} className="bg-ink text-paper">
      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
        {previous && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${previous.image}')`, opacity: 0, animation: 'previousFade 2.9s cubic-bezier(.22,1,.36,1) forwards' }} />}
        <div key={current.image} className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${current.image}')`, animation: 'heroReveal 3.2s cubic-bezier(.16,1,.3,1) forwards', willChange: 'transform, opacity, filter' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/48 via-black/10 to-black/72" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,transparent_0%,rgba(0,0,0,.10)_55%,rgba(0,0,0,.36)_100%)]" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"><div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div><div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button></nav>
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14"><div className="mb-5 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/75"><span>Karachi · Custom Furniture</span><span className="h-px w-8 bg-white/40" /><span className="hero-label text-white/55">{current.label}</span></div><h1 className="max-w-5xl text-[10vw] font-light leading-[.9] tracking-[-.055em] md:text-[8vw]">Furniture,<br /><span className="italic">crafted for you.</span></h1><div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80">Custom furniture made for your home, your style, and your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[.12em] text-ink uppercase">Explore collections <ArrowDown size={15} className="ml-3 inline" /></a></div><div className="mt-8 flex items-center gap-2">{heroSlides.map((slide, index) => <button key={`${slide.label}-${index}`} aria-label={`Show ${slide.label}`} onClick={() => { setPreviousIndex(heroIndex); setHeroIndex(index); }} className={`h-px transition-all duration-700 ${index === heroIndex ? 'w-12 bg-white' : 'w-5 bg-white/35'}`} />)}</div></div>
        <style jsx>{`
          @keyframes heroReveal { 0% { opacity: 0; transform: scale(1.09) translate3d(1.5%,0,0); filter: blur(9px) saturate(.9); } 18% { opacity: 1; } 55% { filter: blur(0) saturate(1); transform: scale(1.045) translate3d(0,-.2%,0); } 100% { opacity: 1; transform: scale(1) translate3d(-.35%,-.35%,0); filter: blur(0) saturate(1.02); } }
          @keyframes previousFade { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 65% { opacity: .22; transform: scale(1.015) translate3d(-.5%,0,0); filter: blur(1px); } 100% { opacity: 0; transform: scale(1.03) translate3d(-1%,0,0); filter: blur(3px); } }
          .hero-label { animation: labelFade .9s ease both; }
          @keyframes labelFade { from { opacity: 0; transform: translateY(5px); } to { opacity: .55; transform: translateY(0); } }
        `}</style>
      </section>
      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>
      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => <article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div></section>
      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>
      <section id="contact" className="reveal-section grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-40 lg:px-14 lg:py-44"><div><p className="mb-8 text-xs tracking-[.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.92] tracking-[-.06em] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/60">Tell us about your space, measurements and ideas. We&apos;ll turn them into furniture made around you.</p><a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-4 text-xs tracking-[.15em] uppercase hover:bg-paper hover:text-ink">Start a project <ArrowUpRight size={15} className="ml-2 inline" /></a></div></section>
    </main>
  );
}
