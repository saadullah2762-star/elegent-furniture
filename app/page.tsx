'use client';

import { ArrowDown, ArrowUpRight, Menu, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroVideo = 'https://raw.githubusercontent.com/saadullah2762-star/elegent-furniture/main/istockphoto-1473178154-640_adpp_is.mp4';

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
  const video = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!hero.current) return;
    const ctx = gsap.context(() => {
      gsap.to('.hero-video', { scale: 1.06, yPercent: 4, ease: 'none', scrollTrigger: { trigger: hero.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => gsap.from(section, { y: 70, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 82%' } }));
      gsap.utils.toArray<HTMLElement>('.collection-card').forEach((card) => gsap.from(card, { y: 50, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
    }, hero);
    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (video.current) video.current.muted = next;
  };

  return (
    <main ref={hero} className="bg-ink text-paper">
      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
        <video ref={video} className="hero-video absolute inset-0 h-full w-full object-cover" src={heroVideo} autoPlay loop muted={muted} playsInline preload="auto" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/20" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          <div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div>
          <div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div>
          <div className="flex items-center gap-2"><button onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Mute sound'} className="rounded-full border border-white/30 p-3 transition hover:bg-white hover:text-black">{muted ? <VolumeX size={17} /> : <Volume2 size={17} />}</button><button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button></div>
        </nav>
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-white/75">Karachi · Custom Furniture</p>
          <h1 className="max-w-5xl text-[10vw] font-light leading-[.9] tracking-[-.055em] md:text-[8vw]">Furniture,<br /><span className="italic">crafted for you.</span></h1>
          <div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80">Custom furniture made for your home, your style, and your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[.12em] text-ink uppercase">Explore collections <ArrowDown size={15} className="ml-3 inline" /></a></div>
        </div>
      </section>

      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>
      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => <article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div></section>
      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>
      <section id="contact" className="reveal-section grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-40 lg:px-14 lg:py-44"><div><p className="mb-8 text-xs tracking-[.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.92] tracking-[-.06em] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/60">Tell us about your space, measurements and ideas. We&apos;ll turn them into furniture made around you.</p><a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-4 text-xs tracking-[.15em] uppercase hover:bg-paper hover:text-ink">Start a project <ArrowUpRight size={15} className="ml-2 inline" /></a></div></section>
    </main>
  );
}
