import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Phone, Mail, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  event_date: string;
  guests: string;
  location: string;
  message: string;
}

const empty: FormData = {
  name: '', company: '', email: '', phone: '',
  event_date: '', guests: '', location: '', message: '',
};

export default function Booking() {
  const [form, setForm] = useState<FormData>(empty);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const payload = {
      name: form.name.trim(),
      company: form.company.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim(),
      event_date: form.event_date,
      guests: form.guests ? parseInt(form.guests) : null,
      location: form.location.trim() || null,
      message: form.message.trim() || null,
    };

    const { error } = await supabase.from('bookings').insert(payload);
    if (error) {
      setStatus('error');
      setErrorMsg('Något gick fel. Försök igen, eller ring oss direkt på 076-347 33 50.');
    } else {
      setStatus('success');
      setForm(empty);
    }
  };

  return (
    <section id="boka" className="relative py-20 md:py-28 bg-coal-850 border-t border-coal-700">
      <div className="bg-grain absolute inset-0 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Left: pitch + contact (2/5) */}
          <div className="lg:col-span-2">
            <p className="font-display text-leaf-400 text-xs font-700 uppercase tracking-mega mb-3">
              Boka oss
            </p>
            <h2 className="font-display font-900 text-4xl md:text-5xl text-cream uppercase leading-[0.95] mb-5">
              Vi tar smashen<br />
              <span className="text-flame-400">till er</span>
            </h2>
            <p className="font-body text-cream/75 leading-relaxed mb-7">
              Födelsedag, student eller AW? Hör av dig så löser vi maten. Vi har varit på
              alla typer av event, stora som små — säg bara till vad ni behöver.
            </p>

            {/* Lunch-villkor */}
            <div className="flex gap-3 bg-coal-800 border-l-2 border-butter-400 px-4 py-3 mb-7">
              <Info size={16} className="text-butter-400 shrink-0 mt-0.5" />
              <p className="font-body text-sm text-cream/70 leading-relaxed">
                Event på lunchtid måndag–fredag: vi behöver sälja minst <strong className="text-cream">50 burgare</strong>.
              </p>
            </div>

            {/* Direct contact */}
            <div className="space-y-3">
              <a
                href="tel:+46763473350"
                className="flex items-center gap-3 group"
              >
                <span className="w-10 h-10 bg-coal-800 border border-coal-700 flex items-center justify-center text-leaf-400 group-hover:border-leaf-500/50 transition-colors shrink-0">
                  <Phone size={16} />
                </span>
                <span className="font-display font-700 text-lg text-cream group-hover:text-leaf-300 transition-colors">
                  076-347 33 50
                </span>
              </a>
              <a
                href="mailto:odsmalsburgaren@gmail.com"
                className="flex items-center gap-3 group"
              >
                <span className="w-10 h-10 bg-coal-800 border border-coal-700 flex items-center justify-center text-leaf-400 group-hover:border-leaf-500/50 transition-colors shrink-0">
                  <Mail size={16} />
                </span>
                <span className="font-body text-base text-cream/80 group-hover:text-cream transition-colors break-all">
                  odsmalsburgaren@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Right: form (3/5) */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div className="bg-leaf-600/10 border border-leaf-500/30 p-10 text-center">
                <CheckCircle className="mx-auto mb-4 text-leaf-400" size={48} />
                <h3 className="font-display font-800 text-2xl text-cream uppercase mb-2">Tack för din förfrågan!</h3>
                <p className="font-body text-cream/75">Vi hör av oss så snart vi kan. Vi ser fram emot att höra mer om ert event!</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-7 font-display text-sm font-700 uppercase tracking-wide text-cream/60 hover:text-cream transition-colors"
                >
                  Skicka en ny förfrågan
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-coal-800 border border-coal-700 p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Namn *" name="name" value={form.name} onChange={handleChange} required placeholder="Ditt namn" />
                  <Field label="Företag" name="company" value={form.company} onChange={handleChange} placeholder="Frivilligt" />
                  <Field label="E-post *" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="din@email.se" />
                  <Field label="Telefon *" name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="070-123 45 67" />
                  <Field label="Datum *" name="event_date" type="date" value={form.event_date} onChange={handleChange} required />
                  <Field label="Antal gäster" name="guests" type="number" value={form.guests} onChange={handleChange} placeholder="Ca antal" min="1" />
                  <div className="sm:col-span-2">
                    <Field label="Plats / ort" name="location" value={form.location} onChange={handleChange} placeholder="Adress eller ort" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-display text-xs font-600 uppercase tracking-wide text-cream/60 mb-1.5">Meddelande</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Berätta om eventet, antal, allergier eller önskemål…"
                      className="w-full bg-coal-850 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/60 transition-colors resize-none"
                    />
                  </div>
                </div>

                {status === 'error' && (
                  <div className="mt-4 flex items-center gap-2 bg-flame-500/10 border border-flame-500/30 px-4 py-3">
                    <AlertCircle className="text-flame-400 shrink-0" size={16} />
                    <p className="font-body text-sm text-flame-400">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mt-6 w-full flex items-center justify-center gap-2.5 bg-flame-500 hover:bg-flame-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-display font-700 text-base uppercase tracking-wide px-8 py-4 transition-colors"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  ) : (
                    <Send size={17} />
                  )}
                  {status === 'loading' ? 'Skickar…' : 'Skicka förfrågan'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
}

function Field({ label, name, value, onChange, type = 'text', required, placeholder, min }: FieldProps) {
  return (
    <div>
      <label className="block font-display text-xs font-600 uppercase tracking-wide text-cream/60 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        className="w-full bg-coal-850 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/60 transition-colors"
      />
    </div>
  );
}