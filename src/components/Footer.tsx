import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { MAPS_URL } from '../lib/location';

interface FooterProps {
  onAdminClick: () => void;
}

const links: [string, string][] = [
  ['Hitta oss', '#schema'],
  ['Meny', '#meny'],
  ['Om oss', '#om-oss'],
  ['Boka catering', '#boka'],
];

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="relative bg-coal-950 border-t border-coal-700">
      <div className="bg-grain absolute inset-0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/odsmallogo.png"
                alt="Ödsmålsburgaren"
                className="h-12 w-auto object-contain"
                onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
              />
              <span className="font-display font-800 text-lg text-cream">Ödsmålsburgaren</span>
            </div>
            <p className="font-body text-sm text-cream/55 leading-relaxed max-w-sm">
              Smashburgare från vår vagn på Golv till Tak i Stenungsund. Vi har
              hållit på sedan 2015 — och tar även catering och event.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/p/%C3%96dsm%C3%A5lsburgaren-Foodtruck-61556800327343/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 bg-coal-800 border border-coal-700 hover:border-flame-500 hover:text-flame-400 text-cream/70 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/odsmals_burgaren/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 bg-coal-800 border border-coal-700 hover:border-flame-500 hover:text-flame-400 text-cream/70 transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-xs font-700 uppercase tracking-mega text-cream/50 mb-4">Sidor</h4>
            <ul className="space-y-2.5">
              {links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="font-body text-sm text-cream/65 hover:text-leaf-300 transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-xs font-700 uppercase tracking-mega text-cream/50 mb-4">Kontakt</h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-flame-400 mt-0.5 shrink-0" />
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-cream/65 hover:text-leaf-300 transition-colors"
                >
                  Golv till Tak, Stenungsund
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-flame-400 shrink-0" />
                <a href="tel:+46763473350" className="font-body text-sm text-cream/65 hover:text-cream transition-colors">
                  076-347 33 50
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-flame-400 shrink-0" />
                <a href="mailto:odsmalsburgaren@gmail.com" className="font-body text-sm text-cream/65 hover:text-cream transition-colors break-all">
                  odsmalsburgaren@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-coal-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/40">
            © {new Date().getFullYear()} Ödsmålsburgaren
          </p>
          <div className="flex items-center gap-4">
            <p className="font-body text-xs text-cream/40">
              Drivs av{' '}
              <a href="https://ottoniq.se" className="text-cream/60 hover:text-leaf-300 transition-colors">
                Ottoniq.se
              </a>
            </p>
            <button
              onClick={onAdminClick}
              className="font-body text-xs text-coal-600 hover:text-coal-500 transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}