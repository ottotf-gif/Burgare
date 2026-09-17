import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Event, Booking } from '../types';
import {
  LogOut, Plus, Pencil, Trash2, X, Check, ChevronLeft,
  Calendar, Inbox, Lock, Mail, Clock,
} from 'lucide-react';

type AdminView = 'events' | 'bookings';

interface EventFormData {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const emptyForm: EventFormData = { title: '', date: '', time: '', location: '', description: '' };

const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

// ─── Login ───────────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Felaktig e-post eller lösenord.');
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-coal-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-flame-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-leaf-600/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-coal-800 border border-coal-700 mb-5">
            <img
              src="/odsmallogo.png"
              alt="Ödsmålsburgaren"
              className="h-12 w-auto object-contain"
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
          </div>
          <h1 className="font-display font-900 text-3xl text-cream uppercase tracking-tight">
            Admin
          </h1>
          <p className="font-body text-sm text-cream/45 mt-2">
            Logga in för att hantera evenemang och förfrågningar
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="bg-coal-850/90 backdrop-blur-md border border-coal-700 shadow-plate p-8"
        >
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="flex items-center gap-1.5 font-display text-xs font-600 uppercase tracking-wide text-cream/50 mb-2">
                <Mail size={11} />
                E-post
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full bg-coal-800 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/50 focus:ring-1 focus:ring-leaf-500/30 transition-colors"
                placeholder="admin@email.se"
              />
            </div>
            {/* Password */}
            <div>
              <label className="flex items-center gap-1.5 font-display text-xs font-600 uppercase tracking-wide text-cream/50 mb-2">
                <Lock size={11} />
                Lösenord
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-coal-800 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/50 focus:ring-1 focus:ring-leaf-500/30 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 flex items-center gap-2 bg-flame-500/10 border border-flame-500/30 px-4 py-3">
              <X size={14} className="text-flame-400 shrink-0" />
              <p className="font-body text-sm text-flame-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full bg-flame-500 hover:bg-flame-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-display font-700 text-sm uppercase tracking-wide px-6 py-3.5 transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <>
                <Lock size={15} />
                Logga in
              </>
            )}
          </button>
        </form>

        <p className="text-center font-body text-xs text-cream/30 mt-6">
          Sessionen löper ut automatiskt efter 30 minuters inaktivitet
        </p>
      </div>
    </div>
  );
}

// ─── Event Form Modal ─────────────────────────────────────────────────────────

function EventModal({
  initial,
  onSave,
  onClose,
}: {
  initial: (EventFormData & { id?: string }) | null;
  onSave: () => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EventFormData>(initial ?? emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      title: form.title.trim(),
      date: form.date,
      time: form.time.trim() || null,
      location: form.location.trim(),
      description: form.description.trim() || null,
    };

    let err;
    if (initial?.id) {
      ({ error: err } = await supabase.from('events').update(payload).eq('id', initial.id));
    } else {
      ({ error: err } = await supabase.from('events').insert(payload));
    }

    if (err) {
      setError('Kunde inte spara. Försök igen.');
    } else {
      onSave();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-lg bg-coal-850 border border-coal-700 shadow-2xl shadow-black/60 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-coal-700 bg-coal-800">
          <h3 className="font-display font-800 text-xl text-cream uppercase tracking-tight">
            {initial?.id ? 'Redigera evenemang' : 'Nytt evenemang'}
          </h3>
          <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <InputField label="Titel" name="title" value={form.title} onChange={handleChange} required placeholder="Lunchservering vid Stenungsund Torg" />
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Datum" name="date" type="date" value={form.date} onChange={handleChange} required />
            <InputField label="Tid" name="time" value={form.time} onChange={handleChange} placeholder="11:00–15:00" />
          </div>
          <InputField label="Plats" name="location" value={form.location} onChange={handleChange} required placeholder="Stenungsund Torg" />
          <div>
            <label className="block font-display text-xs font-600 uppercase tracking-wide text-cream/50 mb-2">Beskrivning</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Kort info om eventet..."
              className="w-full bg-coal-800 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/50 focus:ring-1 focus:ring-leaf-500/30 transition-colors resize-none"
            />
          </div>

          {error && <p className="font-body text-sm text-flame-400">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-coal-800 hover:bg-coal-700 border border-coal-700 text-cream/70 font-display text-sm font-600 uppercase tracking-wide px-5 py-3 transition-colors"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-flame-500 hover:bg-flame-400 disabled:opacity-50 text-white font-display text-sm font-700 uppercase tracking-wide px-5 py-3 transition-all flex items-center justify-center gap-2"
            >
              {saving ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> : <Check size={15} />}
              Spara
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = 'text', required, placeholder }: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-display text-xs font-600 uppercase tracking-wide text-cream/50 mb-2">{label}{required && ' *'}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-coal-800 border border-coal-700 text-cream placeholder-coal-500 px-4 py-3 font-body text-sm focus:outline-none focus:border-leaf-500/50 focus:ring-1 focus:ring-leaf-500/30 transition-colors"
      />
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [view, setView] = useState<AdminView>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState<(EventFormData & { id?: string }) | null | false>(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [sessionWarning, setSessionWarning] = useState(false);

  const lastActivityRef = useRef<number>(Date.now());
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    setSessionWarning(false);
  }, []);

  // Auto-logout after inactivity
  useEffect(() => {
    if (!authenticated) return;

    const events: Array<keyof WindowEventMap> = ['mousedown', 'keydown', 'touchstart', 'scroll'];

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
      setSessionWarning(false);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

      // Warning 2 min before logout
      warningTimerRef.current = setTimeout(() => setSessionWarning(true), INACTIVITY_LIMIT_MS - 2 * 60 * 1000);
      // Logout
      logoutTimerRef.current = setTimeout(() => {
        supabase.auth.signOut();
      }, INACTIVITY_LIMIT_MS);
    };

    events.forEach((evt) => window.addEventListener(evt, updateActivity, { passive: true }));
    updateActivity();

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, updateActivity));
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    };
  }, [authenticated]);

  // Check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(!!data.session);
      setCheckingAuth(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (authenticated) {
      fetchEvents();
      fetchBookings();
    }
  }, [authenticated]);

  async function fetchEvents() {
    setLoading(true);
    const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
    setEvents(data ?? []);
    setLoading(false);
  }

  async function fetchBookings() {
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    setBookings(data ?? []);
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Ta bort detta evenemang?')) return;
    setDeleting(id);
    await supabase.from('events').delete().eq('id', id);
    await fetchEvents();
    setDeleting(null);
  };

  const handleDeleteBooking = async (id: string) => {
    if (!confirm('Ta bort denna förfrågan?')) return;
    await supabase.from('bookings').delete().eq('id', id);
    await fetchBookings();
  };

  const openNew = () => setModalData(null);
  const openEdit = (ev: Event) => setModalData({ id: ev.id, title: ev.title, date: ev.date, time: ev.time ?? '', location: ev.location, description: ev.description ?? '' });
  const closeModal = () => setModalData(false);
  const afterSave = () => { closeModal(); fetchEvents(); };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-coal-950 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-coal-700 border-t-flame-500 animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-coal-950 relative" onMouseDown={resetActivity}>
      <div className="absolute inset-0 bg-grain pointer-events-none" />

      {/* Session warning banner */}
      {sessionWarning && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-flame-500 text-white px-4 py-2.5 flex items-center justify-center gap-2 font-body text-sm">
          <Clock size={15} />
          Sessionen löper ut snart på grund av inaktivitet. Rör musen för att fortsätta.
        </div>
      )}

      {/* Top bar */}
      <div className="relative bg-coal-900 border-b border-coal-700 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <button onClick={onClose} className="text-cream/40 hover:text-cream transition-colors flex items-center gap-1.5 font-body text-sm">
            <ChevronLeft size={18} />
            Tillbaka till sidan
          </button>
          <h1 className="font-display font-800 text-base text-cream uppercase tracking-tight">Admin Panel</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-cream/40 hover:text-flame-400 font-body text-sm transition-colors">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logga ut</span>
          </button>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* View tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setView('events')}
            className={`flex items-center gap-2 font-display text-sm font-700 uppercase tracking-wide px-5 py-2.5 transition-all ${view === 'events' ? 'bg-flame-500 text-white' : 'bg-coal-800 border border-coal-700 text-cream/50 hover:text-cream'}`}
          >
            <Calendar size={15} />
            Evenemang
          </button>
          <button
            onClick={() => setView('bookings')}
            className={`flex items-center gap-2 font-display text-sm font-700 uppercase tracking-wide px-5 py-2.5 transition-all ${view === 'bookings' ? 'bg-flame-500 text-white' : 'bg-coal-800 border border-coal-700 text-cream/50 hover:text-cream'}`}
          >
            <Inbox size={15} />
            Förfrågningar
            {bookings.length > 0 && (
              <span className="bg-butter-400 text-coal-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {bookings.length}
              </span>
            )}
          </button>
        </div>

        {/* Events view */}
        {view === 'events' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-900 text-2xl text-cream uppercase tracking-tight">Evenemang</h2>
              <button
                onClick={openNew}
                className="flex items-center gap-2 bg-flame-500 hover:bg-flame-400 text-white font-display text-sm font-700 uppercase tracking-wide px-5 py-2.5 transition-all hover:-translate-y-0.5"
              >
                <Plus size={16} />
                Lägg till
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 rounded-full border-2 border-coal-700 border-t-flame-500 animate-spin" />
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-16 text-cream/40 font-body">Inga evenemang ännu. Lägg till ditt första!</div>
            ) : (
              <div className="space-y-3">
                {events.map((ev) => (
                  <div key={ev.id} className="flex items-center gap-4 bg-coal-850 border border-coal-700 px-5 py-4 hover:border-coal-600 transition-colors">
                    <div className="shrink-0 text-center w-14 bg-coal-800 border border-coal-700 py-2">
                      <p className="font-display font-900 text-xl text-flame-400 leading-none">
                        {new Date(ev.date + 'T00:00:00').getDate().toString().padStart(2, '0')}
                      </p>
                      <p className="font-body text-xs text-cream/40 mt-0.5">
                        {new Date(ev.date + 'T00:00:00').toLocaleDateString('sv-SE', { month: 'short' }).toUpperCase()}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-700 text-lg text-cream truncate">{ev.title}</p>
                      <p className="font-body text-sm text-cream/45 mt-0.5 truncate">{ev.location}{ev.time ? ` · ${ev.time}` : ''}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEdit(ev)}
                        className="w-8 h-8 flex items-center justify-center bg-coal-800 border border-coal-700 hover:border-leaf-500/40 text-cream/50 hover:text-leaf-400 transition-colors"
                        title="Redigera"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(ev.id)}
                        disabled={deleting === ev.id}
                        className="w-8 h-8 flex items-center justify-center bg-coal-800 border border-coal-700 hover:border-flame-500/40 text-cream/50 hover:text-flame-400 transition-colors disabled:opacity-50"
                        title="Ta bort"
                      >
                        {deleting === ev.id ? <span className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings view */}
        {view === 'bookings' && (
          <div>
            <h2 className="font-display font-900 text-2xl text-cream uppercase tracking-tight mb-6">Inkomna förfrågningar</h2>
            {bookings.length === 0 ? (
              <div className="text-center py-16 text-cream/40 font-body">Inga förfrågningar än.</div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-coal-850 border border-coal-700 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="font-display font-700 text-lg text-cream">{b.name}{b.company ? ` — ${b.company}` : ''}</p>
                        <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1">
                          <span className="font-body text-sm text-cream/50">{b.email}</span>
                          <span className="font-body text-sm text-cream/50">{b.phone}</span>
                          {b.event_date && <span className="font-body text-sm text-butter-300">{new Date(b.event_date + 'T00:00:00').toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                          {b.guests && <span className="font-body text-sm text-cream/50">{b.guests} gäster</span>}
                          {b.location && <span className="font-body text-sm text-cream/50">{b.location}</span>}
                        </div>
                        {b.message && <p className="mt-3 font-body text-sm text-cream/55 bg-coal-800 border border-coal-700 px-3 py-2">{b.message}</p>}
                        <p className="mt-2 font-body text-xs text-cream/30">{new Date(b.created_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteBooking(b.id)}
                        className="shrink-0 w-8 h-8 flex items-center justify-center bg-coal-800 border border-coal-700 hover:border-flame-500/40 text-cream/50 hover:text-flame-400 transition-colors"
                        title="Ta bort"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event modal */}
      {modalData !== false && (
        <EventModal initial={modalData} onSave={afterSave} onClose={closeModal} />
      )}
    </div>
  );
}
