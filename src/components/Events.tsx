import { useEffect, useState } from 'react';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { MAPS_URL } from '../lib/location';
import type { Event } from '../types';

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleDateString('sv-SE', { month: 'short' }).replace('.', '').toUpperCase(),
    weekday: d.toLocaleDateString('sv-SE', { weekday: 'long' }),
  };
}

function isPast(dateStr: string): boolean {
  return new Date(dateStr + 'T23:59:59') < new Date();
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        setError('Kunde inte ladda kommande datum just nu.');
      } else {
        setEvents(data ?? []);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const upcoming = events.filter((e) => !isPast(e.date));

  return (
    <section id="schema" className="relative py-16 md:py-20 bg-coal-850 border-y border-coal-700">
      <div className="bg-grain absolute inset-0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-9">
          <p className="font-display text-leaf-400 text-xs font-700 uppercase tracking-mega mb-2">
            Vår plats
          </p>
          <h2 className="font-display font-900 text-3xl md:text-4xl text-cream uppercase leading-none">
            Här hittar du <span className="text-flame-400">oss</span>
          </h2>
        </div>

        {/* Home base — permanent spot, always visible */}
        <article className="relative overflow-hidden bg-coal-800 border border-leaf-500/40 shadow-plate">
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Image */}
            <div className="relative md:col-span-2 h-48 md:h-auto">
              <img
                src="/rompen.jpg"
                alt="Vår vagn på Rompen Street Food Market"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.pexels.com/photos/1058277/pexels-photo-1058277.jpeg?auto=compress&cs=tinysrgb&w=900';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-coal-800 via-coal-800/30 to-transparent" />
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-leaf-600 text-white text-xs font-display font-700 uppercase tracking-wide px-3 py-1.5">
                Alltid här
              </span>
            </div>

            {/* Info */}
            <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
              <p className="font-chalk text-butter-300 text-2xl leading-none mb-1.5">vår fasta plats</p>
              <h3 className="font-display font-800 text-2xl md:text-3xl text-cream leading-tight mb-3">
                Rompen Street Food Market
              </h3>
              <p className="flex items-start gap-2.5 font-body text-cream/75 leading-relaxed mb-5">
                <MapPin size={17} className="text-flame-400 shrink-0 mt-0.5" />
                Lavö Hamn 950, 474 92 Tuvesvik, Ellös
              </p>
              <p className="font-body text-sm text-cream/60 leading-relaxed mb-6">
                Vår vagn står här — här smashar vi burgare som vanligt. Kom förbi, beställ
                och häng en stund. Ingen jakt på var trucken är idag, vi har hemmaplan.
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start bg-flame-500 hover:bg-flame-400 text-white font-display font-700 text-sm uppercase tracking-wide px-5 py-3 transition-colors"
              >
                <Navigation size={15} />
                Vägbeskrivning
              </a>
            </div>
          </div>
        </article>

        {/* Secondary — occasional truck dates */}
        <div className="mt-12">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="font-display font-800 text-xl text-cream uppercase tracking-wide whitespace-nowrap">
              Vi kommer också ut ibland
            </h3>
            <span className="flex-1 h-px bg-coal-600" />
            <span className="font-chalk text-butter-300 text-lg whitespace-nowrap">truck på resande fot</span>
          </div>

          {loading && (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 rounded-full border-2 border-coal-600 border-t-leaf-400 animate-spin" />
            </div>
          )}

          {error && (
            <div className="py-8 font-body text-cream/60">{error}</div>
          )}

          {!loading && !error && upcoming.length === 0 && (
            <p className="font-body text-cream/55 py-4">
              Inga inbokade datum utanför vagnen just nu — men du hittar oss alltid på Rompen ovan.
            </p>
          )}

          {!loading && upcoming.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcoming.map((event) => {
                const dt = formatDate(event.date);
                return (
                  <article
                    key={event.id}
                    className="group bg-coal-800 border border-coal-700 hover:border-leaf-500/50 transition-colors duration-300"
                  >
                    {/* Date strip */}
                    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-coal-700 bg-coal-850">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-900 text-2xl text-flame-400 leading-none">{dt.day}</span>
                        <span className="font-display font-700 text-xs text-cream/60 uppercase tracking-wide">{dt.month}</span>
                      </div>
                      <span className="font-body text-xs text-cream/50 capitalize ml-auto">{dt.weekday}</span>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                      <h4 className="font-display font-700 text-base text-cream leading-snug mb-2.5">{event.title}</h4>
                      <div className="space-y-1.5">
                        {event.time && (
                          <p className="inline-flex items-center gap-2 font-body text-sm text-cream/70">
                            <Clock size={13} className="text-butter-400 shrink-0" />
                            {event.time}
                          </p>
                        )}
                        <p className="flex items-start gap-2 font-body text-sm text-cream/70">
                          <MapPin size={13} className="text-butter-400 shrink-0 mt-0.5" />
                          {event.location}
                        </p>
                      </div>
                      {event.description && (
                        <p className="mt-2.5 pt-2.5 border-t border-coal-700 font-body text-sm text-cream/55 leading-relaxed">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}