import type { Burger } from '../types';

const burgers: Burger[] = [
  {
    name: 'Ödsmålsburgaren',
    description: 'Dressing, sallad, lök, ost, bacon, ketchup & bröd',
    tag: 'Husets',
  },
  {
    name: 'Gourmet',
    description: 'Tryffelmajjo, sallad, lök, ost, bacon, karamelliserad lök & bröd',
  },
  {
    name: 'Jalapeño Burger 2.0',
    description: 'Jalapeño/limedressing, jalapeño, sallad, karamelliserad lök, ost, bacon & bröd',
    tag: 'Het',
  },
  {
    name: 'Orustarn',
    description: 'Majjo, hickorysås, picklad lök, rostad lök, ost, bacon & bröd',
  },
  {
    name: 'VM-Burgaren',
    description: 'Sriracha-majjo, picklad rödlök, ost, sallad, bacon & bröd',
  },
  {
    name: 'Garlic & Bourbon',
    description: 'Sallad, rökig bourbondressing, vitlöksmajjo, ost & bröd',
  },
  {
    name: 'Cheese',
    description: 'Picklad gurka, senapsdressing, lök, dubbel ost & bröd',
  },
  {
    name: 'DeLuxe',
    description: '"Emmy"-dressing, karamelliserad lök, ost & bröd',
  },
];

interface PriceTier {
  title: string;
  note?: string;
  single: string;
  double: string;
  triple: string;
}

const priceTiers: PriceTier[] = [
  {
    title: 'Burgare',
    single: '80',
    double: '105',
    triple: '130',
  },
  {
    title: 'Meny',
    note: 'Burgare, pommes & dryck',
    single: '110',
    double: '135',
    triple: '160',
  },
  {
    title: 'Lunch',
    note: '11–14 · burgare, pommes & dryck',
    single: '100',
    double: '125',
    triple: '150',
  },
];

const tagColors: Record<string, string> = {
  Husets: 'bg-leaf-600/25 text-leaf-300 border-leaf-500/40',
  Het: 'bg-flame-500/20 text-flame-400 border-flame-500/40',
};

function PriceCard({ tier }: { tier: PriceTier }) {
  return (
    <div className="bg-coal-800 border border-coal-700 p-5">
      <div className="mb-4">
        <h3 className="font-display font-800 text-xl text-cream uppercase tracking-wide">{tier.title}</h3>
        {tier.note && <p className="font-body text-xs text-cream/50 mt-0.5">{tier.note}</p>}
      </div>
      <dl className="space-y-2.5">
        {[
          ['Singel', '100g', tier.single],
          ['Dubbel', '200g', tier.double],
          ['Trippel', '300g', tier.triple],
        ].map(([size, weight, price]) => (
          <div key={size} className="flex items-baseline gap-2">
            <dt className="font-body text-sm text-cream/80">
              {size} <span className="text-cream/40">{weight}</span>
            </dt>
            <span className="flex-1 border-b border-dotted border-coal-600 translate-y-[-3px]" />
            <dd className="font-display font-800 text-lg text-butter-400 tabular-nums">{price}:-</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Menu() {
  return (
    <section id="meny" className="relative py-20 md:py-28 bg-chalkboard">
      <div className="bg-grain absolute inset-0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-chalk text-butter-300 text-2xl mb-1">det här smashar vi</p>
          <h2 className="font-display font-900 text-4xl md:text-6xl text-cream uppercase leading-none">
            Menyn
          </h2>
          <p className="mt-4 font-body text-cream/60 max-w-md mx-auto text-sm">
            Välj burgare, välj storlek. Allt smashas på plats — singel, dubbel eller trippel.
          </p>
        </div>

        {/* Price tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {priceTiers.map((tier) => (
            <PriceCard key={tier.title} tier={tier} />
          ))}
        </div>

        {/* Burger list */}
        <div className="mb-6 flex items-center gap-4">
          <h3 className="font-display font-800 text-2xl text-cream uppercase tracking-wide whitespace-nowrap">
            Våra burgare
          </h3>
          <span className="flex-1 h-px bg-coal-600" />
          <span className="font-chalk text-butter-300 text-xl whitespace-nowrap">8 att välja på</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1">
          {burgers.map((b) => (
            <div
              key={b.name}
              className="group flex items-start gap-3 py-4 border-b border-coal-700/70"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h4 className="font-display font-700 text-lg text-cream group-hover:text-leaf-300 transition-colors">
                    {b.name}
                  </h4>
                  {b.tag && (
                    <span className={`text-[10px] font-display font-600 uppercase tracking-wider px-2 py-0.5 border ${tagColors[b.tag] ?? 'bg-coal-700 text-cream/60 border-coal-600'}`}>
                      {b.tag}
                    </span>
                  )}
                </div>
                <p className="font-body text-sm text-cream/55 mt-1 leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-sm text-cream/45">
          Priser gäller i vagnen. Vid catering och event sätter vi ihop ett upplägg som passar er.
        </p>
      </div>
    </section>
  );
}