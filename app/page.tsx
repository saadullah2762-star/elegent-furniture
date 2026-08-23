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
    return () => { tl.kill(); };
  }, [tourDone]);

  useEffect(() => {
    if (!hero.current || tourDone || tourIndex === 0) return;
    const image = hero.current.querySelector('.tour-image');
    const content = hero.current.querySelector('.tour-content');
    if (!image || !content) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.to(content, { x: -65, opacity: 0, duration: 0.24 })
      .to(image, { xPercent: -6, scale: 1.07, duration: 0.3 }, '<')
      .set(content, { x: 80 })
      .to(image, { xPercent: 0, scale: 1, duration: 0.58 })
      .to(content, { x: 0, opacity: 1, duration: 0.42 }, '-=0.34');
    return () => { tl.kill(); };
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

  const skipTour = () => setTourDone(true);
  const changeScene = (direction: number) => setTourIndex((current) => Math.min(tourScenes.length - 1, Math.max(0, current + direction)));
  const scene = tourScenes[tourIndex];

  return (
    <main ref={hero} className="bg-ink text-paper">
      {!tourDone && (
        <section className="fixed inset-0 z-[100] min-h-screen overflow-hidden bg-ink text-paper">
          <img key={scene.image} src={scene.image} alt={scene.title} className="tour-image absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/25" />
          <div className="tour-top absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"><span className="text-sm font-medium tracking-[0.24em]">ELEGENT</span><button onClick={skipTour} className="rounded-full border border-white/40 px-5 py-2 text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black">Skip tour</button></div>
          <div className="tour-content absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-8 p-6 md:p-10 lg:p-14"><div className="max-w-xl"><p className="mb-4 text-[10px] tracking-[0.3em] text-white/65">{scene.label}</p><h1 className="text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">{scene.title}</h1><p className="mt-5 max-w-md text-sm leading-6 text-white/75 md:text-base">{scene.copy}</p></div><div className="hidden items-center gap-2 md:flex"><button onClick={() => changeScene(-1)} aria-label="Previous room" className="rounded-full border border-white/30 p-4 hover:bg-white hover:text-black"><ChevronLeft size={18} /></button><button onClick={() => changeScene(1)} aria-label="Next room" className="rounded-full border border-white/30 p-4 hover:bg-white hover:text-black"><ChevronRight size={18} /></button></div></div>
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">{tourScenes.map((_, index) => <span key={index} className={`h-1 w-8 rounded-full transition ${index === tourIndex ? 'bg-white' : 'bg-white/25'}`} />)}</div>
        </section>
      )}

      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden"><div className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90')" }} /><div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" /><nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"><div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div><div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button></nav><div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14"><p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-white/75">Karachi · Custom Furniture</p><h2 className="max-w-5xl text-[10vw] font-light leading-[.9] tracking-[-.055em] md:text-[8vw]">Furniture,<br /><span className="italic">crafted for you.</span></h2><div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80">Custom furniture made for your home, your style, and your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[.12em] text-ink uppercase">Explore collections <ArrowDown size={15} className="ml-3 inline" /></a></div></div></section>

      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>
      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => <article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div></section>
      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>
      <section id="contact" className="reveal-section grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-40 lg:px-14 lg:py-44"><div><p className="mb-8 text-xs tracking-[.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.92] tracking-[-.06em] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/60">Tell us about your space, measurements and ideas. We&apos;ll turn them into furniture made around you.</p><a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-4 text-xs tracking-[.15em] uppercase hover:bg-paper hover:text-ink">Start a project <ArrowUpRight size={15} className="ml-2 inline" /></a></div></section>
    </main>
  );
}
