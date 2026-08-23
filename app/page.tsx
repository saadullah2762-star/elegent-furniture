'use client';

import { ArrowDown, ArrowRight, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = {
  hero: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=92',
  story: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90',
  craft: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90',
  kitchen: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=88',
  living: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=88',
  bedroom: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=88',
  wardrobe: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=88',
  office: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=88',
  media: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=88',
};

const heroSlides = [
  [images.living, 'Living Room'], [images.bedroom, 'Bedroom'], [images.kitchen, 'Kitchen'],
  [images.wardrobe, 'Wardrobe'], [images.office, 'Home Office'], [images.media, 'Media Wall'],
  [images.story, 'Luxury Interior'], [images.craft, 'Craftsmanship'],
];

const collections = [
  ['01', 'Kitchens', 'Custom cabinetry, considered storage and seamless finishes.', images.kitchen],
  ['02', 'Living Rooms', 'Statement furniture designed around how you actually live.', images.living],
  ['03', 'Bedrooms', 'Calm proportions, soft textures and tailored storage.', images.bedroom],
  ['04', 'Wardrobes', 'Built-in storage that feels like part of the architecture.', images.wardrobe],
  ['05', 'Home Office', 'Focused workspaces with warmth, function and character.', images.office],
  ['06', 'Media Walls', 'A refined centrepiece for your living space.', images.media],
];

const process = [
  ['01', 'Tell us your vision', 'Share your room, measurements, inspiration and what you need from the space.'],
  ['02', 'We design around you', 'We refine proportions, materials, colours and storage around your home.'],
  ['03', 'We build with care', 'Every piece is made with attention to finish, fit and everyday durability.'],
  ['04', 'We install & finish', 'Our work comes together in your space with a clean, considered final installation.'],
];

export default function Home() {
  const page = useRef<HTMLDivElement>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!page.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%' } });
      });
      gsap.utils.toArray<HTMLElement>('[data-image]').forEach((el) => {
        gsap.fromTo(el, { scale: 1.12 }, { scale: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
    }, page);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={page} className="overflow-hidden bg-ink text-paper selection:bg-paper selection:text-ink">
      {/* HERO */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        {heroSlides.map(([src, label], i) => (
          <div key={src} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')`, opacity: i === heroIndex ? 1 : 0, transform: i === heroIndex ? 'scale(1)' : 'scale(1.06)', transition: 'opacity 2200ms cubic-bezier(.22,1,.36,1), transform 7000ms cubic-bezier(.16,1,.3,1)' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,transparent,rgba(0,0,0,.3))]" />
        <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          <a href="#top" className="text-sm font-medium tracking-[.26em]">ELEGENT</a>
          <div className="hidden items-center gap-10 text-[10px] uppercase tracking-[.22em] md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#process">Process</a><a href="#contact">Contact</a></div>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" className="rounded-full border border-white/30 p-3 md:hidden">{menuOpen ? <X size={17} /> : <Menu size={17} />}</button>
        </nav>
        {menuOpen && <div className="absolute right-5 top-20 z-30 w-56 rounded-2xl border border-white/15 bg-black/80 p-5 backdrop-blur-xl md:hidden"><div className="flex flex-col gap-5 text-xs uppercase tracking-[.2em]"><a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a><a href="#story" onClick={() => setMenuOpen(false)}>Our Story</a><a href="#process" onClick={() => setMenuOpen(false)}>Process</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></div></div>}
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[.3em] text-white/70"><span>Karachi · Custom Furniture</span><span className="h-px w-8 bg-white/40" /><span>{heroSlides[heroIndex][1]}</span></div>
          <h1 className="max-w-6xl text-[15vw] font-light leading-[.82] tracking-[-.07em] md:text-[10vw]">Furniture,<br /><span className="italic">crafted for you.</span></h1>
          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><p className="max-w-md text-sm leading-7 text-white/75 md:text-base">Custom furniture for homes that deserve more than ordinary. Designed, made and finished around your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-7 py-4 text-[10px] font-medium uppercase tracking-[.18em] text-ink transition hover:scale-105">Explore collections <ArrowDown size={14} className="ml-3 inline" /></a></div>
          <div className="mt-8 flex gap-2">{heroSlides.map(([_, label], i) => <button key={`${label}-${i}`} onClick={() => setHeroIndex(i)} aria-label={label} className={`h-px transition-all duration-700 ${i === heroIndex ? 'w-12 bg-white' : 'w-5 bg-white/35'}`} />)}</div>
        </div>
      </section>

      {/* INTRO */}
      <section id="story" className="grid gap-16 px-6 py-28 md:grid-cols-[.7fr_1.3fr] md:px-10 md:py-40 lg:px-14" data-reveal>
        <div><p className="text-[10px] uppercase tracking-[.28em] text-paper/40">01 / The philosophy</p></div>
        <div><h2 className="max-w-5xl text-4xl font-light leading-[1.02] tracking-[-.045em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t just fill a room. <span className="text-paper/40">It gives the room its identity.</span></h2><p className="mt-10 max-w-2xl text-sm leading-7 text-paper/60 md:text-base">We create custom furniture around the way you live. Every measurement, material, colour and detail is considered so the finished space feels natural—not designed for someone else.</p></div>
      </section>

      {/* FEATURE */}
      <section className="mx-6 grid overflow-hidden md:mx-10 md:grid-cols-2 lg:mx-14" data-reveal>
        <div className="relative min-h-[520px] overflow-hidden"><img data-image src={images.story} alt="Luxury custom furniture interior" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" /><div className="absolute bottom-7 left-7 text-xs uppercase tracking-[.25em] text-white/75">Made around you</div></div>
        <div className="flex min-h-[520px] flex-col justify-between bg-paper p-8 text-ink md:p-12 lg:p-16"><p className="text-[10px] uppercase tracking-[.28em] opacity-45">02 / Our approach</p><h2 className="max-w-xl text-4xl font-light leading-[1] tracking-[-.04em] md:text-5xl">From an empty room to a space that feels unmistakably yours.</h2><div className="flex items-end justify-between gap-8"><p className="max-w-sm text-sm leading-6 opacity-60">No one-size-fits-all packages. Just thoughtful furniture, built for your home.</p><a href="#process" className="rounded-full border border-ink/25 p-4 transition hover:bg-ink hover:text-paper"><ArrowRight size={18} /></a></div></div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="px-6 py-28 md:px-10 md:py-40 lg:px-14" data-reveal>
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-paper/15 pb-7 md:flex-row md:items-end"><div><p className="mb-3 text-[10px] uppercase tracking-[.28em] text-paper/40">03 / Collections</p><h2 className="text-4xl font-light tracking-[-.045em] md:text-6xl">Made for the way you live.</h2></div><p className="max-w-xs text-sm leading-6 text-paper/45">Furniture across every important room, designed as one complete language.</p></div>
        <div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{collections.map(([number, title, description, image]) => <article key={number} className="group relative min-h-[450px] overflow-hidden bg-ink"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-1000 group-hover:scale-110 group-hover:opacity-90" /><div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/80" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/60"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div>
      </section>

      {/* CRAFT */}
      <section className="relative mx-6 min-h-[75vh] overflow-hidden md:mx-10 lg:mx-14" data-reveal><img data-image src={images.craft} alt="Furniture craftsmanship" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/40" /><div className="relative flex min-h-[75vh] flex-col justify-between p-7 md:p-12 lg:p-16"><p className="text-[10px] uppercase tracking-[.28em] text-white/65">04 / Craftsmanship</p><div><p className="mb-4 text-sm text-white/60">The difference is in the details.</p><h2 className="max-w-5xl text-5xl font-light leading-[.9] tracking-[-.055em] md:text-7xl lg:text-8xl">Built to be lived with.<br /><span className="italic">Made to last.</span></h2></div></div></section>

      {/* PROCESS */}
      <section id="process" className="px-6 py-28 md:px-10 md:py-40 lg:px-14" data-reveal><div className="grid gap-14 md:grid-cols-[.65fr_1.35fr]"><div><p className="text-[10px] uppercase tracking-[.28em] text-paper/40">05 / The process</p><h2 className="mt-5 max-w-md text-4xl font-light leading-[1] tracking-[-.04em] md:text-5xl">Simple from the outside. Precise underneath.</h2></div><div className="divide-y divide-paper/15">{process.map(([number, title, text]) => <div key={number} className="grid gap-5 py-8 md:grid-cols-[80px_1fr] md:gap-8"><span className="text-xs text-paper/35">{number}</span><div><h3 className="text-2xl font-light">{title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-paper/50">{text}</p></div></div>)}</div></div></section>

      {/* TRUST */}
      <section className="border-y border-paper/15 px-6 py-16 md:px-10 lg:px-14" data-reveal><div className="grid gap-10 md:grid-cols-4"><div><p className="text-4xl font-light">100%</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Custom made</p></div><div><p className="text-4xl font-light">01—01</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Designed for your space</p></div><div><p className="text-4xl font-light">Karachi</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Local service</p></div><div><p className="flex items-center gap-2 text-4xl font-light"><Check size={28} /> Detail</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Finish focused</p></div></div></section>

      {/* CTA */}
      <section id="contact" className="grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-44 lg:px-14" data-reveal><div><p className="mb-7 text-[10px] uppercase tracking-[.28em] text-paper/40">06 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.9] tracking-[-.06em] md:text-8xl">Let&apos;s make your space <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/55">Tell us what you are building, renovating or changing. We&apos;ll help shape the furniture around it.</p><a href="#collections" className="mt-8 inline-flex items-center rounded-full bg-paper px-7 py-4 text-[10px] font-medium uppercase tracking-[.18em] text-ink transition hover:scale-105">View collections <ArrowUpRight size={15} className="ml-3" /></a></div></section>

      {/* FOOTER */}
      <footer className="border-t border-paper/15 px-6 py-10 md:px-10 lg:px-14"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-sm tracking-[.26em]">ELEGENT</p><p className="mt-3 text-xs text-paper/40">Custom furniture · Karachi, Pakistan</p></div><div className="flex gap-7 text-[10px] uppercase tracking-[.2em] text-paper/45"><a href="#collections">Collections</a><a href="#story">Story</a><a href="#contact">Contact</a></div></div><div className="mt-10 text-[9px] uppercase tracking-[.2em] text-paper/25">© {new Date().getFullYear()} ELEGENT Furniture. Crafted around you.</div></footer>
    </main>
  );
}
