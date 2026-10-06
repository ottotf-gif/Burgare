export default function Gallery() {
  return (
    <section className="relative bg-coal-900 border-t border-coal-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="relative overflow-hidden group bg-coal-950">
          <img
            src="/Bild3.png"
            alt="Teamet bakom Ödsmålsburgaren"
            className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal-900/50 to-transparent" />
        </div>
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[420px] group bg-coal-950">
          <img
            src="/0A38030E-8F85-4210-829F-810FD77ABE98_1_105_c.jpeg"
            alt="Ödsmålsburgarens vagn på Strandvägen 29"
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal-900/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
