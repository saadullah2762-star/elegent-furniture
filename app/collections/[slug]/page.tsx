import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const DATA: Record<string, { title: string; intro: string; query: string }> = {
  kitchens: { title: 'Kitchens', intro: 'Custom cabinetry, islands, storage and complete kitchen interiors designed around your home.', query: 'luxury,modern,kitchen,interior' },
  'living-rooms': { title: 'Living Rooms', intro: 'Sofas, tables, media furniture and complete living spaces with a refined, comfortable feel.', query: 'luxury,modern,livingroom,furniture' },
  bedrooms: { title: 'Bedrooms', intro: 'Beds, wardrobes, bedside furniture and calm interiors made for everyday comfort.', query: 'luxury,modern,bedroom,furniture' },
  wardrobes: { title: 'Wardrobes', intro: 'Built-in wardrobes, dressing rooms and smart storage designed to fit your room perfectly.', query: 'luxury,walkin,closet,wardrobe,interior' },
  office: { title: 'Office', intro: 'Desks, storage and executive furniture for focused, elegant workspaces.', query: 'luxury,modern,homeoffice,desk,furniture' },
  'media-walls': { title: 'Media Walls', intro: 'Architectural TV units, shelving and feature walls that become the centre of the room.', query: 'luxury,modern,tv,mediawall,livingroom' },
};

export function generateStaticParams() { return Object.keys(DATA).map((slug) => ({ slug })); }

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const item = DATA[params.slug] ?? DATA.kitchens;
  const photos = Array.from({ length: 100 }, (_, index) => `https://loremflickr.com/1600/1100/${encodeURIComponent(item.query)}?lock=${index + 1}`);
  return <main className="min-h-screen bg-ink text-paper">
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink/90 px-6 py-5 backdrop-blur-xl md:px-12">
      <Link href="/" className="text-sm tracking-[.24em]">ELEGENT</Link>
      <Link href="/collections" className="flex items-center gap-2 text-[10px] uppercase tracking-[.2em] text-paper/60"><ArrowLeft size={14}/> All collections</Link>
    </header>
    <section className="px-6 pb-20 pt-20 md:px-12 md:pb-28 md:pt-28">
      <p className="text-[10px] uppercase tracking-[.3em] text-paper/40">Collection · Karachi</p>
      <h1 className="mt-5 text-7xl font-light leading-[.85] tracking-[-.06em] md:text-[10vw]">{item.title}.</h1>
      <div className="mt-8 flex max-w-3xl flex-col justify-between gap-8 md:flex-row md:items-end"><p className="text-sm leading-7 text-paper/55 md:text-base">{item.intro}</p><Link href="/contact" className="w-fit rounded-full bg-paper px-7 py-4 text-[10px] uppercase tracking-[.18em] text-ink">Start your project <ArrowUpRight size={14} className="ml-2 inline"/></Link></div>
    </section>
    <section className="grid grid-cols-1 gap-1 bg-white/10 px-1 md:grid-cols-2 lg:grid-cols-3">
      {photos.map((src, index) => <article key={src} className="group relative aspect-[4/3] overflow-hidden bg-black"><img src={src} alt={`${item.title} design ${index + 1}`} loading={index < 6 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70"/><div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-white/70"><span>{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span></div></article>)}
    </section>
    <section className="px-6 py-28 text-center md:px-12 md:py-40"><p className="text-[10px] uppercase tracking-[.3em] text-paper/40">Ready to make yours?</p><h2 className="mx-auto mt-5 max-w-4xl text-5xl font-light leading-[.9] tracking-[-.05em] md:text-7xl">Let&apos;s create a {item.title.toLowerCase()} that fits your life.</h2><Link href="/contact" className="mt-10 inline-block rounded-full bg-paper px-8 py-4 text-[10px] uppercase tracking-[.2em] text-ink">Contact ELEGENT</Link></section>
  </main>;
}
