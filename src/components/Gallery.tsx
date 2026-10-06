export default function Gallery() {
  return (
    <section className="relative bg-coal-900 border-t border-coal-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[420px] group">
          <img
            src="/Bild3.png"
            alt="Smashburgare från Ödsmålsburgaren"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal-900/50 to-transparent" />
        </div>
        <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto md:h-[420px] group">
          <img
            src="/Bild4.jpeg"
            alt="Matlagning hos Ödsmålsburgaren"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coal-900/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
