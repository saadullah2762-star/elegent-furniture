'use client';

import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const heroImages = [
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=92',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2400&q=92',
  'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=2400&q=92',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2400&q=92',
];

const featured = [
  ['01', 'Kitchens', 'kitchens', 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1600&q=90'],
  ['02', 'Living Rooms', 'living-rooms', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90'],
  ['03', 'Bedrooms', 'bedrooms', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90'],
  ['04', 'Wardrobes', 'wardrobes', 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1600&q=90'],
  ['05', 'Home Office', 'office', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=90'],
  ['06', 'Media Walls', 'media-walls', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90'],
];

export default function Home() {
  const [index, setIndex] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((v) => (v + 1) % heroImages.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper">
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        {heroImages.map((src, i) => (
          <div key={src} className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')`, opacity: i === index ? 1 : 0, transform: i === index ? 'scale(1)' : 'scale(1.06)', transition: 'opacity 2200ms ease, transform 7000ms ease' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />
        <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
          <Link href="/" className="text-sm tracking-[.28em]">ELEGENT</Link>
          <div className="hidden items-center gap-9 text-[10px] uppercase tracking-[.22em] md:flex">
            <Link href="/collections">Collections</Link>
            <Link href="/about">Our Story</Link>
            <Link href="/process">Process</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <button onClick={() => setMenu(!menu)} className="rounded-full border border-white/30 p-3 md:hidden" aria-label="Menu">{menu ? <X size={17} /> : <Menu size={17} />}</button>
        </nav>
        {menu && <div className="absolute right-5 top-20 z-30 rounded-2xl border border-white/15 bg-black/90 p-6 backdrop-blur-xl md:hidden"><div className="flex flex-col gap-5 text-xs uppercase tracking-[.2em]"><Link href="/collections" onClick={() => setMenu(false)}>Collections</Link><Link href="/about" onClick={() => setMenu(false)}>Our Story</Link><Link href="/process" onClick={() => setMenu(false)}>Process</Link><Link href="/contact" onClick={() => setMenu(false)}>Contact</Link></div></div>}
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14">
          <p className="mb-5 text-[10px] uppercase tracking-[.3em] text-white/70">Karachi · Custom Furniture</p>
          <h1 className="max-w-6xl text-[15vw] font-light leading-[.84] tracking-[-.07em] md:text-[10vw]">Furniture,<br /><span className="italic">crafted for you.</span></h1>
          <div className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/75">Custom furniture designed, made and finished around your space.</p>
            <Link href="/collections" className="w-fit rounded-full bg-paper px-7 py-4 text-[10px] uppercase tracking-[.18em] text-ink">Explore collections <ArrowDown size={14} className="ml-3 inline" /></Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-28 md:px-10 md:py-40 lg:px-14">
        <p className="text-[10px] uppercase tracking-[.28em] text-paper/40">ELEGENT · KARACHI</p>
        <h2 className="mt-6 max-w-5xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl">Furniture that makes a house feel <span className="italic text-paper/45">like yours.</span></h2>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-paper/55">Explore our complete furniture collections, learn how we work and start a custom project.</p>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-40 lg:px-14">
        <div className="mb-12 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-[10px] uppercase tracking-[.28em] text-paper/40">Featured</p><h2 className="text-4xl font-light md:text-6xl">Explore the collections.</h2></div><Link href="/collections" className="text-[10px] uppercase tracking-[.18em] text-paper/55">View all →</Link></div>
        <div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">
          {featured.map(([number, title, slug, image]) => (
            <Link href={`/collections/${slug}`} key={slug} className="group relative min-h-[430px] overflow-hidden bg-ink">
              <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-1000 group-hover:scale-110 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-7"><span className="text-xs text-white/50">{number}</span><div><h3 className="text-3xl font-light">{title}</h3><span className="mt-5 inline-flex items-center text-[10px] uppercase tracking-[.2em] text-white/75">View collection <ArrowUpRight size={14} className="ml-2" /></span></div></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-10 border-y border-paper/15 px-6 py-20 md:grid-cols-4 md:px-10 lg:px-14">
        <div><p className="text-4xl font-light">100%</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Custom made</p></div>
        <div><p className="text-4xl font-light">Karachi</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Local service</p></div>
        <div><p className="text-4xl font-light">01—01</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Your space</p></div>
        <div><p className="text-4xl font-light">Detail</p><p className="mt-2 text-[10px] uppercase tracking-[.2em] text-paper/40">Finish focused</p></div>
      </section>

      <section className="px-6 py-28 md:px-10 md:py-40 lg:px-14">
        <div className="grid gap-12 md:grid-cols-2 md:items-end"><div><p className="text-[10px] uppercase tracking-[.28em] text-paper/40">Our approach</p><h2 className="mt-5 text-5xl font-light leading-[.95] md:text-7xl">Thoughtful furniture.<br /><span className="italic text-paper/45">Made for you.</span></h2></div><div><p className="max-w-lg text-sm leading-7 text-paper/55">From first measurements to final installation, we build each project around your room, lifestyle and taste.</p><Link href="/process" className="mt-8 inline-block rounded-full border border-paper/25 px-6 py-4 text-[10px] uppercase tracking-[.18em]">See our process ↗</Link></div></div>
      </section>

      <section className="px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="relative min-h-[65vh] overflow-hidden"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90" alt="Elegant interior" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/45" /><div className="relative flex min-h-[65vh] flex-col justify-end p-7 md:p-12"><p className="text-[10px] uppercase tracking-[.28em] text-white/65">Your next space</p><h2 className="mt-4 max-w-5xl text-5xl font-light leading-[.9] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2><Link href="/contact" className="mt-8 w-fit rounded-full bg-paper px-7 py-4 text-[10px] uppercase tracking-[.18em] text-ink">Start a project ↗</Link></div></div></section>
    </main>
  );
}
