import { ArrowDown, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[88svh] sm:min-h-[100svh] flex flex-col justify-center overflow-hidden bg-coal-900"
    >
      {/* Background food image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Saftig smashburgare"
          className="w-full h-full object-cover object-[center_60%] sm:object-center"
        />
        {/* Warm dark wash so text pops, food still glows */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal-900 via-coal-900/75 to-coal-900/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-coal-900/80 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Content — left aligned, foodtruck-poster feel */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-leaf-600/20 border border-leaf-500/40 text-leaf-300 text-xs font-display font-600 uppercase tracking-mega px-3 py-1.5">
              <MapPin size={12} />
              Rompen · Ellös
            </span>
            <span className="text-cream/50 font-display text-xs font-600 uppercase tracking-mega">
              Sedan 2015
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-900 text-cream leading-[0.92] tracking-tight uppercase">
            <span className="block text-[9vw] sm:text-6xl md:text-7xl text-leaf-400 whitespace-nowrap">Smashburgare</span>
            <span className="block text-[8vw] sm:text-5xl md:text-6xl text-flame-400 italic font-700 mt-1">
              från vår vagn i Ellös
            </span>
          </h1>

          <p className="font-body text-base md:text-lg text-cream/75 mt-6 max-w-lg leading-relaxed">
            Krispiga smashburgare från vår fasta plats på Rompen Street Food Market.
            Vi tar även catering och event — säg bara till.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mt-9">
            <a
              href="#boka"
              className="inline-flex items-center justify-center gap-2 bg-flame-500 hover:bg-flame-400 text-white font-display font-700 text-base uppercase tracking-wide px-7 py-4 transition-all duration-200 hover:-translate-y-0.5"
            >
              Boka catering
            </a>
            <a
              href="#meny"
              className="inline-flex items-center justify-center gap-2 bg-cream/5 hover:bg-cream/10 border border-cream/25 text-cream font-display font-700 text-base uppercase tracking-wide px-7 py-4 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Se menyn
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#schema"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cream/40 hover:text-leaf-400 transition-colors"
        aria-label="Scrolla ned"
      >
        <ArrowDown size={26} className="animate-bounce" />
      </a>
    </section>
  );
}