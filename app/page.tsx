'use client';

import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Menu, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const raw = 'https://raw.githubusercontent.com/saadullah2762-star/elegent-furniture/main/';

const tourScenes = [
  { label: '01 / ARRIVAL', title: 'Welcome home.', copy: 'Begin the journey with a cinematic look at the space.', video: `${raw}istockphoto-1473178154-640_adpp_is.mp4` },
  { label: '02 / ENTRANCE', title: 'Step inside.', copy: 'Move naturally from the entrance into a home shaped around you.', video: `${raw}istockphoto-2195195471-640_adpp_is.mp4` },
  { label: '03 / KITCHEN', title: 'The heart of home.', copy: 'Custom kitchens designed for everyday life and beautiful moments.', video: `${raw}istockphoto-1820077487-640_adpp_is.mp4` },
  { label: '04 / LIVING ROOM', title: 'Make room for living.', copy: 'Comfort, proportion and furniture made to belong together.', video: `${raw}istockphoto-1398590932-640_adpp_is.mp4` },
  { label: '05 / DINING', title: 'Gather around.', copy: 'A space made for conversations, meals and memories.', video: `${raw}istockphoto-1447910411-640_adpp_is.mp4` },
  { label: '06 / BEDROOM', title: 'A quieter place.', copy: 'Soft textures and considered furniture for your private space.', video: `${raw}istockphoto-2203026934-640_adpp_is.mp4` },
  { label: '07 / DETAIL', title: 'Made around you.', copy: 'The final details are what turn a house into your home.', video: `${raw}istockphoto-2211729787-640_adpp_is.mp4` },
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
  const tourVideo = useRef<HTMLVideoElement>(null);
  const [tourIndex, setTourIndex] = useState(0);
  const [tourDone, setTourDone] = useState(false);
  const [muted, setMuted] = useState(true);

  const scene = tourScenes[tourIndex];

  useEffect(() => {
    if (!tourVideo.current) return;
    tourVideo.current.currentTime = 0;
    const play = tourVideo.current.play();
    if (play) play.catch(() => undefined);
  }, [tourIndex]);

  useEffect(() => {
    if (!hero.current || tourDone) return;
    const video = hero.current.querySelector('.tour-video');
    const content = hero.current.querySelector('.tour-content');
    if (!video || !content) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.fromTo(video, { scale: 1.08, xPercent: 2 }, { scale: 1, xPercent: 0, duration: 1.1 })
      .fromTo('.tour-top', { y: -18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.75')
      .fromTo(content, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.35');
    return () => { tl.kill(); };
  }, [tourDone]);

  useEffect(() => {
    if (!hero.current || tourDone || tourIndex === 0) return;
    const video = hero.current.querySelector('.tour-video');
    const content = hero.current.querySelector('.tour-content');
    if (!video || !content) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });
    tl.to(content, { x: -55, opacity: 0, duration: 0.22 })
      .to(video, { xPercent: -7, scale: 1.06, duration: 0.28 }, '<')
      .set(content, { x: 65 })
      .to(video, { xPercent: 0, scale: 1, duration: 0.52 })
      .to(content, { x: 0, opacity: 1, duration: 0.38 }, '-=0.25');
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
  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    if (tourVideo.current) tourVideo.current.muted = next;
  };

  return (
    <main ref={hero} className="bg-ink text-paper">
      {!tourDone && (
        <section className="fixed inset-0 z-[100] min-h-screen overflow-hidden bg-black text-paper">
          <video ref={tourVideo} key={scene.video} className="tour-video absolute inset-0 h-full w-full object-cover" src={scene.video} autoPlay muted={muted} playsInline preload="auto" onEnded={() => { if (tourIndex < tourScenes.length - 1) setTourIndex((i) => i + 1); else setTourDone(true); }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/15 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

          <div className="tour-top absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14">
            <span className="text-sm font-medium tracking-[0.28em]">ELEGENT</span>
            <div className="flex items-center gap-2">
              <button onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Mute sound'} className="rounded-full border border-white/35 p-3 hover:bg-white hover:text-black">{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
              <button onClick={skipTour} className="rounded-full border border-white/40 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase hover:bg-white hover:text-black">Skip tour</button>
            </div>
          </div>

          <div className="tour-content absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-8 p-6 md:p-10 lg:p-14">
            <div className="max-w-2xl">
              <p className="mb-4 text-[10px] tracking-[0.3em] text-white/65">{scene.label}</p>
              <h1 className="max-w-3xl text-5xl font-light leading-[.9] tracking-[-.05em] md:text-7xl lg:text-[7rem]">{scene.title}</h1>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/75 md:text-base">{scene.copy}</p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button onClick={() => changeScene(-1)} disabled={tourIndex === 0} aria-label="Previous scene" className="rounded-full border border-white/30 p-4 transition hover:bg-white hover:text-black disabled:opacity-25"><ChevronLeft size={18} /></button>
              <button onClick={() => changeScene(1)} disabled={tourIndex === tourScenes.length - 1} aria-label="Next scene" className="rounded-full border border-white/30 p-4 transition hover:bg-white hover:text-black disabled:opacity-25"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {tourScenes.map((item, index) => <button key={item.label} aria-label={`Go to ${item.label}`} onClick={() => setTourIndex(index)} className={`h-1.5 rounded-full transition-all duration-500 ${index === tourIndex ? 'w-10 bg-white' : 'w-3 bg-white/30'}`} />)}
          </div>
        </section>
      )}

      <section className="hero-section relative flex min-h-screen flex-col overflow-hidden">
        <div className="hero-image absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=90')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/65" />
        <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-14"><div className="text-sm font-medium tracking-[0.24em] uppercase">ELEGENT</div><div className="hidden items-center gap-9 text-[11px] tracking-[0.2em] uppercase md:flex"><a href="#collections">Collections</a><a href="#story">Our Story</a><a href="#contact">Contact</a></div><button aria-label="Open menu" className="rounded-full border border-white/30 p-3 md:hidden"><Menu size={18} /></button></nav>
        <div className="relative z-10 mt-auto px-6 pb-10 md:px-10 md:pb-14 lg:px-14"><p className="mb-5 text-[10px] tracking-[0.3em] uppercase text-white/75">Karachi · Custom Furniture</p><h2 className="max-w-5xl text-[10vw] font-light leading-[.9] tracking-[-.055em] md:text-[8vw]">Furniture,<br /><span className="italic">crafted for you.</span></h2><div className="mt-7 flex flex-col justify-between gap-7 md:flex-row md:items-end"><p className="max-w-sm text-sm leading-6 text-white/80">Custom furniture made for your home, your style, and your space.</p><a href="#collections" className="w-fit rounded-full bg-paper px-6 py-4 text-xs font-medium tracking-[.12em] text-ink uppercase">Explore collections <ArrowDown size={15} className="ml-3 inline" /></a></div></div>
      </section>

      <section id="story" className="reveal-section grid gap-14 px-6 py-28 md:grid-cols-2 md:px-10 md:py-40 lg:px-14"><p className="text-xs tracking-[.24em] uppercase text-paper/45">01 / The philosophy</p><div><h2 className="max-w-4xl text-4xl font-light leading-[1.05] tracking-[-.04em] md:text-6xl lg:text-7xl">Good furniture doesn&apos;t fill a room. <span className="text-paper/45">It gives the room its identity.</span></h2><p className="mt-10 max-w-xl text-sm leading-7 text-paper/60 md:text-base">From the first measurement to the final installation, every detail is considered around the way you live. Our approach is custom, tactile and quietly luxurious.</p></div></section>
      <section id="collections" className="reveal-section px-6 pb-28 md:px-10 md:pb-40 lg:px-14"><div className="mb-14 flex items-end justify-between border-b border-paper/15 pb-6"><div><p className="mb-3 text-xs tracking-[.24em] uppercase text-paper/45">02 / Collections</p><h2 className="text-4xl font-light tracking-[-.04em] md:text-6xl">Made for the way you live.</h2></div><span className="hidden text-xs text-paper/40 md:block">06 categories</span></div><div className="grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">{categories.map(([number, title, description, image]) => <article key={number} className="collection-card group relative min-h-[390px] overflow-hidden bg-ink md:min-h-[470px]"><img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-110 group-hover:opacity-85" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" /><div className="relative flex h-full flex-col justify-between p-7"><div className="flex justify-between text-xs text-white/70"><span>{number}</span><ArrowUpRight size={16} /></div><div><h3 className="text-3xl font-light md:text-4xl">{title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-white/65">{description}</p></div></div></article>)}</div></section>
      <section className="reveal-section relative mx-6 min-h-[70vh] overflow-hidden md:mx-10 lg:mx-14"><div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=90')" }} /><div className="absolute inset-0 bg-black/35" /><div className="relative flex min-h-[70vh] flex-col justify-between p-7 md:p-12"><p className="text-xs tracking-[.24em] uppercase text-white/70">03 / Craftsmanship</p><h2 className="max-w-4xl text-5xl font-light leading-[.95] tracking-[-.05em] md:text-7xl lg:text-8xl">Details you can<br /><span className="italic">feel.</span></h2></div></section>
      <section id="contact" className="reveal-section grid gap-16 px-6 py-28 md:grid-cols-[1.35fr_.65fr] md:px-10 md:py-40 lg:px-14 lg:py-44"><div><p className="mb-8 text-xs tracking-[.24em] uppercase text-paper/45">04 / Your space</p><h2 className="max-w-5xl text-6xl font-light leading-[.92] tracking-[-.06em] md:text-8xl">Let&apos;s create something <span className="italic">beautiful.</span></h2></div><div className="self-end"><p className="max-w-sm text-sm leading-7 text-paper/60">Tell us about your space, measurements and ideas. We&apos;ll turn them into furniture made around you.</p><a href="https://wa.me/923000000000" className="mt-8 inline-block rounded-full border border-paper/30 px-6 py-4 text-xs tracking-[.15em] uppercase hover:bg-paper hover:text-ink">Start a project <ArrowUpRight size={15} className="ml-2 inline" /></a></div></section>
    </main>
  );
}
