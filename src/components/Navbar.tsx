import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
}

const navLinks = [
  { label: 'Hitta oss', href: '#schema' },
  { label: 'Meny', href: '#meny' },
  { label: 'Om oss', href: '#om-oss' },
  { label: 'Boka', href: '#boka' },
];

export default function Navbar({ onAdminClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-coal-900/95 backdrop-blur-md border-b border-coal-700 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
            <img
              src="/odsmallogo.png"
              alt="Ödsmålsburgaren"
              className="h-9 md:h-11 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <span className="font-display font-800 text-base md:text-lg text-cream tracking-tight group-hover:text-leaf-400 transition-colors">
              Ödsmålsburgaren
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-display text-sm font-600 uppercase tracking-wide text-cream/70 hover:text-cream transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#boka"
              className="hidden md:inline-flex items-center gap-2 bg-flame-500 hover:bg-flame-400 text-white font-display font-700 text-sm uppercase tracking-wide px-5 py-2.5 transition-colors"
            >
              Boka catering
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-cream/80 hover:text-cream p-2 -mr-2"
              aria-label="Öppna meny"
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-coal-850 border-t border-coal-700`}
      >
        <div className="px-4 py-3 flex flex-col">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={close}
              className="font-display text-base font-600 uppercase tracking-wide text-cream/80 hover:text-leaf-400 py-3 border-b border-coal-700 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#boka"
            onClick={close}
            className="mt-4 text-center bg-flame-500 hover:bg-flame-400 text-white font-display font-700 text-sm uppercase tracking-wide px-5 py-3 transition-colors"
          >
            Boka catering
          </a>
          <button
            onClick={() => { onAdminClick(); close(); }}
            className="mt-2 text-center text-coal-500 hover:text-coal-400 text-xs py-2 transition-colors"
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
}