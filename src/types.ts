export interface Event {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string;
  description: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  event_date: string;
  guests: number | null;
  location: string | null;
  message: string | null;
  created_at: string;
}

export interface Burger {
  name: string;
  description: string;
  tag?: string;
}