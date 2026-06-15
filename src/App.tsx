import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Menu from './components/Menu';
import About from './components/About';
import Booking from './components/Booking';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  if (showAdmin) {
    return <AdminPanel onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-coal-900">
      <Navbar onAdminClick={() => setShowAdmin(true)} />
      <main>
        <Hero />
        <Events />
        <Menu />
        <About />
        <Booking />
      </main>
      <Footer onAdminClick={() => setShowAdmin(true)} />
    </div>
  );
}