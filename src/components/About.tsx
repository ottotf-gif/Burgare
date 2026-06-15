import { Truck, UtensilsCrossed, PartyPopper, MapPin } from 'lucide-react';

const timeline = [
  { year: '2015', text: 'Jonas startar hemma i Ödsmål med att leverera förbokad lunch till privatpersoner och företag.' },
  { year: '2016', text: 'Det gick så bra att vi öppnade vår första lokal mitt i centrala Stenungsund.' },
  { year: '2024', text: 'Vi gick över till foodtruck på heltid — lunch och catering, dit folk var.' },
  { year: '2025', text: 'Vi flyttade in i en fast vagn på Rompen Street Food Market i Ellös och satsade på ett renodlat smashburgar-koncept. Trucken åker numera bara ut då och då.' },
];

const offers = [
  { icon: UtensilsCrossed, title: 'Smashburgare', desc: 'Krispiga smash från vagnen varje öppetdag.' },
  { icon: MapPin, title: 'Fast plats', desc: 'Rompen Street Food Market, Ellös — alltid här.' },
  { icon: Truck, title: 'Catering', desc: 'Vi kommer till er — kontor, fest eller fält.' },
  { icon: PartyPopper, title: 'Event & fest', desc: 'Födelsedag, student, AW. Stora som små.' },
];

export default function About() {
  return (
    <section id="om-oss" className="relative py-20 md:py-28 bg-coal-900">
      <div className="bg-grain absolute inset-0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* Left: story */}
          <div>
            <p className="font-display text-leaf-400 text-xs font-700 uppercase tracking-mega mb-3">
              Foodtruck sedan 2015
            </p>
            <h2 className="font-display font-900 text-4xl md:text-5xl text-cream uppercase leading-[0.95] mb-7">
              En vagn, smash<br />
              <span className="text-flame-400">och en hel del lök</span>
            </h2>

            <div className="space-y-4 font-body text-cream/75 leading-relaxed">
              <p>
                Jonas grundade Ödsmålsburgaren hemma i Ödsmål 2015 genom att leverera
                lunch som folk och företag bokat in i förväg.
              </p>
              <p>
                Det gick så pass bra att vi året därpå öppnade vår första lokal inne i centrala
                Stenungsund, där vi höll till fram till årsskiftet. 2024 gick vi över till
                foodtruck på heltid.
              </p>
              <p>
                Idag står vi i en fast vagn på Rompen Street Food Market i Ellös, med fullt
                fokus på smashburgare. Trucken åker fortfarande ut på catering och event då
                och då — men hemma är hos oss på Rompen.
              </p>
              <p className="text-cream/90 font-500">
                Vi är erfarna och har varit på alla typer av event, stora som små. Hoppas vi ses!
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-9 space-y-0">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex gap-5">
                  {/* Rail */}
                  <div className="flex flex-col items-center">
                    <span className="font-display font-900 text-butter-400 text-lg leading-none w-12 text-right pt-0.5">
                      {t.year}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-leaf-500 mt-1.5 shrink-0" />
                    {i < timeline.length - 1 && <span className="w-px flex-1 bg-coal-600 my-1" />}
                  </div>
                  <p className="font-body text-sm text-cream/65 pb-6 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + offers */}
          <div>
            <div className="relative overflow-hidden shadow-plate">
              <img
                src="https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Smashburgare som tillagas"
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coal-900/70 to-transparent" />
              <div className="absolute bottom-4 left-4 bg-coal-900/90 border border-coal-700 px-4 py-2.5">
                <p className="font-chalk text-butter-300 text-xl leading-none">smashat på plats</p>
              </div>
            </div>

            {/* Offers grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {offers.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-coal-850 border border-coal-700 p-4 hover:border-leaf-500/40 transition-colors">
                  <Icon className="text-flame-400 mb-2.5" size={22} />
                  <h4 className="font-display font-700 text-base text-cream mb-1">{title}</h4>
                  <p className="font-body text-xs text-cream/55 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}