import { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';

const CONSENT_KEY = 'odsmalsburgaren-cookie-consent';

type ConsentChoice = 'accepted' | 'declined';

interface CookieBannerProps {
  onChoice: (choice: ConsentChoice) => void;
}

export function getSavedConsent(): ConsentChoice | null {
  const saved = window.localStorage.getItem(CONSENT_KEY);
  return saved === 'accepted' || saved === 'declined' ? saved : null;
}

export default function CookieBanner({ onChoice }: CookieBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!getSavedConsent());
  }, []);

  const choose = (choice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_KEY, choice);
    setVisible(false);
    onChoice(choice);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] px-4 pb-4 pointer-events-none">
      <div className="pointer-events-auto max-w-4xl mx-auto bg-coal-950 border border-coal-600 shadow-2xl shadow-black/60 p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex items-start gap-3 flex-1">
            <Cookie size={22} className="text-butter-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display font-800 text-base text-cream uppercase tracking-wide">
                Cookies och externa tjänster
              </h2>
              <p className="font-body text-sm text-cream/60 leading-relaxed mt-1.5">
                Vi använder inga onödiga cookies. Om du godkänner laddas Google Maps för att visa vår plats.
                Du kan välja bara nödvändiga funktioner.
              </p>
            </div>
            <button
              onClick={() => choose('declined')}
              aria-label="Stäng cookie-informationen"
              className="md:hidden text-cream/40 hover:text-cream transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => choose('declined')}
              className="bg-coal-800 hover:bg-coal-700 border border-coal-600 text-cream/75 font-display font-700 text-xs uppercase tracking-wide px-4 py-3 transition-colors"
            >
              Bara nödvändiga
            </button>
            <button
              onClick={() => choose('accepted')}
              className="bg-flame-500 hover:bg-flame-400 text-white font-display font-700 text-xs uppercase tracking-wide px-4 py-3 transition-colors"
            >
              Godkänn alla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
