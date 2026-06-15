/*
# Create events and bookings tables for Ödsmålsburgaren

1. New Tables
   - `events`
     - `id` (uuid, primary key)
     - `title` (text, required) — event name e.g. "Lunchservering vid Stenungsund torg"
     - `date` (date, required) — event date
     - `time` (text) — display string e.g. "11:00–18:00"
     - `location` (text, required) — where the food truck will be
     - `description` (text) — optional extra info
     - `created_at` (timestamptz)
   - `bookings`
     - `id` (uuid, primary key)
     - `name` (text, required)
     - `company` (text, optional)
     - `email` (text, required)
     - `phone` (text, required)
     - `event_date` (date, required)
     - `guests` (integer)
     - `location` (text)
     - `message` (text)
     - `created_at` (timestamptz)

2. Security
   - RLS enabled on both tables.
   - events: anon + authenticated can SELECT (public calendar). Only authenticated can INSERT/UPDATE/DELETE (admin only).
   - bookings: anon + authenticated can INSERT (customers submit inquiries). Only authenticated can SELECT/DELETE (admin reads inquiries).

3. Seed data
   - Three sample upcoming events inserted so the calendar has content on first load.
*/

CREATE TABLE IF NOT EXISTS events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  date        date NOT NULL,
  time        text,
  location    text NOT NULL,
  description text,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS events_date_idx ON events (date);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_events" ON events;
CREATE POLICY "public_select_events" ON events FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_events" ON events;
CREATE POLICY "admin_insert_events" ON events FOR INSERT
TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_events" ON events;
CREATE POLICY "admin_update_events" ON events FOR UPDATE
TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_events" ON events;
CREATE POLICY "admin_delete_events" ON events FOR DELETE
TO authenticated USING (true);

---

CREATE TABLE IF NOT EXISTS bookings (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  company    text,
  email      text NOT NULL,
  phone      text NOT NULL,
  event_date date NOT NULL,
  guests     integer,
  location   text,
  message    text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_bookings" ON bookings;
CREATE POLICY "public_insert_bookings" ON bookings FOR INSERT
TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_bookings" ON bookings;
CREATE POLICY "admin_select_bookings" ON bookings FOR SELECT
TO authenticated USING (true);

DROP POLICY IF EXISTS "admin_delete_bookings" ON bookings;
CREATE POLICY "admin_delete_bookings" ON bookings FOR DELETE
TO authenticated USING (true);

---

INSERT INTO events (title, date, time, location, description)
VALUES
  ('Lunchservering – Stenungsund Torg', '2026-06-20', '11:00–15:00', 'Stenungsund Torg, Stenungsund', 'Kom och njut av en riktigt god burgare mitt i stan!'),
  ('Grillkväll – Orust Camping', '2026-06-27', '16:00–21:00', 'Orust Camping, Henån', 'Sommarkväll med BBQ, burgare och gott sällskap. Välkommen!'),
  ('Cateringevent – Stenungsunds IF', '2026-07-05', '12:00–17:00', 'Stenungsunds IF Hemmaarena', 'Burgarbuffé för hela familjen i samband med cupen.')
ON CONFLICT DO NOTHING;
