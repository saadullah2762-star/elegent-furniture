import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

type Collection = {
  title: string;
  intro: string;
  tag: string;
};

const DATA: Record<string, Collection> = {
  kitchens: {
    title: 'Kitchens',
    intro: 'Custom cabinetry, islands, storage and complete kitchen interiors designed around your home.',
    tag: 'kitchen',
  },
  'living-rooms': {
    title: 'Living Rooms',
    intro: 'Sofas, tables, media furniture and complete living spaces with a refined, comfortable feel.',
    tag: 'livingroom',
  },
  bedrooms: {
    title: 'Bedrooms',
    intro: 'Beds, wardrobes, bedside furniture and calm interiors made for everyday comfort.',
    tag: 'bedroom',
  },
  wardrobes: {
    title: 'Wardrobes',
    intro: 'Built-in wardrobes, dressing rooms and smart storage designed to fit your room perfectly.',
    tag: 'wardrobe',
  },
  office: {
    title: 'Office',
    intro: 'Desks, storage and executive furniture for focused, elegant workspaces.',
    tag: 'homeoffice',
  },
  'media-walls': {
    title: 'Media Walls',
    intro: 'Architectural TV units, shelving and feature walls that become the centre of the room.',
    tag: 'mediawall',
  },
};

export function generateStaticParams() {
  return Object.keys(DATA).map((slug) => ({ slug }));
}

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const item = DATA[params.slug] ?? DATA.kitchens;

  // Each card gets its own lock value. This removes the old 8-image repeat system.
  // The tag is category-specific, so a Kitchens page requests kitchen photos only, etc.
  const photos = Array.from({ length: 100 }, (_, index) =>
    `https://loremflickr.com/1800/1350/${item.tag}?lock=${index + 1}`
  );

  return (
    <main className="min-h-screen bg-ink text-paper">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-ink/95 px-6 py-5 backdrop-blur-xl md:px-12">
        <Link href="/" className="text-sm tracking-[.24em]">ELEGENT</Link>
        <nav className="hidden items-center gap-8 text-[10px] uppercase tracking-[.2em] md:flex">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/about">Our Story</Link>
          <Link href="/process">Process</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/contact" className="rounded-full bg-paper px-5 py-3 text-[9px] uppercase tracking-[.18em] text-ink">Start your project ↗</Link>
      </header>

      <section className="px-6 pb-16 pt-14 md:px-12 md:pb-20 md:pt-20">
        <div className="mb-10 flex items-center gap-2 text-[10px] uppercase tracking-[.18em] text-paper/40">
          <Link href="/">Home</Link><span>›</span><Link href="/collections">Collections</Link><span>›</span><span className="text-paper/70">{item.title}</span>
        </div>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] uppercase tracking-[.3em] text-paper/40">Collection · Karachi</p>
            <h1 className="mt-5 text-7xl font-light leading-[.85] tracking-[-.06em] md:text-[9vw]">{item.title}</h1>
            <p className="mt-7 max-w-2xl text-sm leading-7 text-paper/55 md:text-base">{item.intro}</p>
          </div>
          <Link href="/collections" className="w-fit shrink-0 rounded-full border border-paper/25 px-6 py-4 text-[10px] uppercase tracking-[.18em]">← Back to collections</Link>
        </div>
        <div className="mt-14 flex items-end justify-between border-b border-paper/15 pb-5">
          <div><span className="text-4xl font-light">100</span><span className="ml-3 text-[10px] uppercase tracking-[.2em] text-paper/50">Designs</span></div>
          <span className="text-[10px] uppercase tracking-[.2em] text-paper/40">Newest first</span>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-px bg-black/40 px-1 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((src, index) => (
          <article key={src} className="group relative aspect-[4/3] overflow-hidden bg-neutral-950">
            <img
              src={src}
              alt={`${item.title} design ${index + 1}`}
              loading={index < 9 ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-105"
              onError={(event) => {
                const image = event.currentTarget;
                image.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[.18em] text-white/75">
              <span>{String(index + 1).padStart(2, '0')}</span><span>{item.title}</span>
            </div>
            <div className="absolute right-5 top-5 rounded-full border border-white/25 px-3 py-2 text-white/70 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={14}/></div>
          </article>
        ))}
      </section>

      <section className="px-6 py-28 text-center md:px-12 md:py-40">
        <p className="text-[10px] uppercase tracking-[.3em] text-paper/40">Ready to make yours?</p>
        <h2 className="mx-auto mt-5 max-w-4xl text-5xl font-light leading-[.9] tracking-[-.05em] md:text-7xl">Let&apos;s create a {item.title.toLowerCase()} that fits your life.</h2>
        <Link href="/contact" className="mt-10 inline-block rounded-full bg-paper px-8 py-4 text-[10px] uppercase tracking-[.2em] text-ink">Contact ELEGENT</Link>
      </section>
    </main>
  );
}
