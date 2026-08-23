'use client';

import Link from 'next/link';

const items = [
  ['Kitchens','Custom cabinetry, islands and complete kitchen interiors.','https://images.unsplash.com/photo-1556912173-46c336c7fd55?auto=format&fit=crop&w=1800&q=90'],
  ['Living Rooms','Sofas, media walls, tables and complete living spaces.','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90'],
  ['Bedrooms','Beds, side tables, dressing and storage made together.','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=90'],
  ['Wardrobes','Built-in wardrobes and storage designed to fit your room.','https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1800&q=90'],
  ['Office','Desks, storage and executive furniture for focused spaces.','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90'],
  ['Media Walls','Architectural media walls that become the centre of the room.','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=90'],
];

export default function Collections(){return <main className="min-h-screen bg-ink text-paper"><header className="flex items-center justify-between px-6 py-7 md:px-12"><Link href="/" className="text-sm tracking-[.24em]">ELEGENT</Link><Link href="/" className="text-xs tracking-[.18em] uppercase text-paper/60">Home</Link></header><section className="px-6 py-20 md:px-12 md:py-28"><p className="mb-5 text-xs tracking-[.25em] uppercase text-paper/45">01 / Collections</p><h1 className="max-w-5xl text-6xl font-light leading-[.9] tracking-[-.055em] md:text-8xl">Furniture for<br/><span className="italic">every room.</span></h1><div className="mt-20 grid gap-1 md:grid-cols-2">{items.map(([title,copy,image],i)=><article key={title} className="group relative min-h-[520px] overflow-hidden"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"/><div className="relative flex h-full flex-col justify-end p-7 md:p-10"><span className="text-xs text-white/55">0{i+1}</span><h2 className="mt-3 text-4xl font-light">{title}</h2><p className="mt-3 max-w-md text-sm leading-6 text-white/70">{copy}</p></div></article>)}</div></section></main>}
