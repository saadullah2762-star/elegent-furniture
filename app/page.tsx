'use client';

import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tourScenes = [
  { label: '01 / LIVING ROOM', title: 'The living room.', copy: 'Statement seating, warm timber and a room built around the way you live.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90' },
  { label: '02 / DINING', title: 'Gather around.', copy: 'A dining space designed for long conversations and everyday moments.', image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2400&q=90' },
  { label: '03 / BEDROOM', title: 'A quieter place.', copy: 'Soft textures, considered storage and furniture that lets the room breathe.', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=90' },
  { label: '04 / WARDROBE', title: 'Storage, refined.', copy: 'Built around your measurements, your routine and your sense of style.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90' },
  { label: '05 / MEDIA WALL', title: 'The centre of the room.', copy: 'A refined focal point where materials, lighting and technology come together.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2400&q=90' },
];

const categories = [
  ['01', 'Kitchens', 'Custom cabinetry & seamless living', 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1400&q=85'],
  ['02', 'Living Rooms', 'Statement pieces for everyday life', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85'],
  ['03', 'Bedrooms', 'Quiet spaces, tailored to you', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85'],
  ['04', 'Wardrobes', 'Storage designed as architecture', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1400&q=85'],
  ['05', 'Office', 'Focused spaces with character', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85'],
  ['06', 'Media Walls', 'A refined centre for the room', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'],
];

export default function Home() {
  const hero = useRef<HTMLDivElement>(null);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourDone, setTourDone] = useState(false);

  useEffect(() => {
    if (tourDone) return;
    const timer = window.setTimeout(() => {
      setTourIndex((current) => {
        if (current >= tourScenes.length - 1) {
          setTourDone(true);
          return current;
        }
        return current + 1;
      });
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [tourIndex, tourDone]);

  useEffect(() => {
    if (!hero.current || tourDone) return;
    const image = hero.current.querySelector('.tour-image');
    const content = hero.current.querySelector('.tour-content');
    if (!image || !content) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.fromTo(image, { scale: 1.12, xPercent: 5 }, { scale: 1, xPercent: 0, duration: 1.2 })
      .fromTo('.tour-top', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.8')
      .fromTo(content, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.4');
    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!hero.current || tourDone) return;
    const image = hero.current.querySelector('.tour-image');
    const content = hero.current.querySelector('.tour-content');
    if (!image || !content || tourIndex === 0) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.to(content, { x: -65, opacity: 0, duration: 0.24 })
      .to(image, { xPercent: -6, scale: 1.07, duration: 0.3 }, '<')
      .set(content, { x: 80 })
      .to(image, { xPercent: 0, scale: 1, duration: 0.58 })
      .to(content, { x: 0, opacity: 1, duration: 0.42 }, '-=0.34');
    return () => tl.kill();
  }, [tourIndex, tourDone]);

  useEffect(() => {
    if (!hero.current || !tourDone) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-image', { scale: 1.08, yPercent: 5, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => gsap.from(section, { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 82%' } }));
      gsap.utils.toArray<HTMLElement>('.collection-card').forEach((card) => gsap.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
    }, hero);
    return () => ctx.revert();
  }, [tourDone]);

  const scene = tourScenes[tourIndex];
  const goNext = () => setTourIndex((i) => Math.min(i + 1, tourScenes.length - 1));
  const goPrev = () => setTourIndex((i) => Math.max(i - 1, 0));

  return (
    <main ref={hero} className="bg-ink text-paper">
      {!tourDone && (
        <section className="tour-stage fixed inset-0 z-[100] overflow-hidden bg-black text-white">
          <img className="tour-image absolute inset-0 h-full w-full object-cover" src={scene.image} alt="Luxury furniture interior tour" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
          <div className="tour-top absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
            <span className="text-sm tracking-[0.28em] uppercase">ELEGENT</span>
            <span className="hidden text-[10px] tracking-[0.25em] text-white/65 uppercase md:block">Private home furniture tour</span>
            <button onClick={() => setTourDone(true)} className="rounded-full border border-white/35 px-4 py-2 text-[10px] tracking-[0.2em] uppercase transition hover:bg-white hover:text-black">Skip tour</button>
          </div>
          <div className="tour-content absolute bottom-20 left-6 z-10 max-w-3xl md:left-10 lg:left-14">
            <p className="mb-5 text-[10px] tracking-[0.3em] text-white/65 uppercase">{scene.label}</p>
            <h1 className="tour-title text-5xl font-light leading-[0.92] tracking-[-0.055em] md:text-7xl lg:text-[7vw]">{scene.title}</h1>
            <p className="tour-copy mt-5 max-w-md text-sm leading-6 text-white/75 md:text-base">{scene.copy}</p>
            <div className="mt-8 flex items-center gap-3">
              <button onClick={goPrev} aria-label="Previous room" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 transition hover:bg-white hover:text-black"><ChevronLeft size={17} /></button>
              <button onClick={goNext} aria-label="Next room" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 transition hover:bg-white hover:text-black"><ChevronRight size={17} /></button>
              <span className="ml-2 text-[10px] tracking-[0.2em] text-white/55">{String(tourIndex + 1).padStart(2, '0')} / {String(tourScenes.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="absolute bottom-7 left-6 right-6 z-10 md:left-10 md:right-10 lg:left-14 lg:right-14">
            <div className="h-px overflow-hidden bg-white/20"><div className="h-full origin-left bg-white transition-transform duration-500" style={{ transform: `scaleX(${(tourIndex + 1) / tourScenes.length})` }} /></div>
            <div className="mt-3 flex justify-between text-[9px] tracking-[0.22em] text-white/45 uppercase"><span>Living</span><span>Dining</span><span>Bedroom</span><span>Wardrobe</span><span>Media</span></div>
          </div>
        </section>
      )}

      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
        <div className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          <div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div>
          <div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div>
          <button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button>
          <a href="#contact" className="hidden rounded-full border border-white/40 px-5 py-3 text-[10px] tracking-[0.2em] uppercase transition hover:bg-white hover:text-ink md:block">Start a project</a>
        </nav>
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-white/75">Karachi · Custom Furniture</p>
          <div className="max-w-5xl overflow-hidden"><h2 className="text-[10vw] font-light leading-[0.9] tracking-[-0.055em] md:text-[8vw] lg:text-[7.2vw]">Furniture,<br /><span className="italic">crafted for you.</span></h2></div>
          <div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80 md:text-base">Custom furniture made for your home, your style, and your space.</p><div className="flex items-center gap-3"><a href="#collections" className="group flex items-center gap-4 rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[0.12em] text-ink uppercase">Explore collections <ArrowDown size={15} /></a><a href="#story" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40"><ArrowUpRight size={17} /></a></div></div>
        </div>
      </section>

      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[0.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-0.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>

      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[0.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-0.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => (<article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 ease-out group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light tracking-[-0.03em] md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>))}</div></section>

      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[0.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>

      <section id="contact" className="reveal-section px-6 py-28 md:px-10 md:py-40 lg:px-14 lg:py-44"><p className="mb-8 text-xs tracking-[0.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[0.92] tracking-[-0.06em] md:text-8xl lg:text-[8vw]">Let&apos;s create something <span className="italic">beautiful.</span></h2><a href="#" className="mt-12 inline-flex rounded-full bg-paper px-7 py-4 text-xs font-medium tracking-[0.15em] text-ink uppercase">Start your project <ArrowUpRight size={15} className="ml-3" /></a></section>

      <footer className="flex flex-col gap-4 border-t border-paper/10 px-6 py-8 text-[10px] text-paper/45 md:flex-row md:items-center md:justify-between md:px-10 lg:px-14"><span>ELEGENT — Furniture & Interiors</span><span>Karachi, Pakistan</span><span>© 2026 Elegent</span></footer>
    </main>
  );
}
