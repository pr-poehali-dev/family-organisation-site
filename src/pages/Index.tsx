import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from './HomePage';
import HistoryPage from './HistoryPage';
import MembersPage from './MembersPage';
import EventsPage from './EventsPage';
import GalleryPage from './GalleryPage';
import ContactPage from './ContactPage';
import LoginPage from './LoginPage';
import LeaderCabinet from './LeaderCabinet';
import EmployeeCabinet from './EmployeeCabinet';

const pagesWithNav = ['home', 'history', 'members', 'events', 'gallery', 'contact', 'cabinet', 'leader-cabinet', 'employee-cabinet'];

export default function Index() {
  const [page, setPage] = useState('home');

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={setPage} />;
      case 'history': return <HistoryPage />;
      case 'members': return <MembersPage />;
      case 'events': return <EventsPage />;
      case 'gallery': return <GalleryPage />;
      case 'contact': return <ContactPage />;
      case 'cabinet': return <LoginPage onNavigate={setPage} />;
      case 'leader-cabinet': return <LeaderCabinet onNavigate={setPage} />;
      case 'employee-cabinet': return <EmployeeCabinet onNavigate={setPage} />;
      default: return <HomePage onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-background mesh-bg">
      {pagesWithNav.includes(page) && (
        <Navbar currentPage={page} onNavigate={setPage} />
      )}
      <main key={page} className="animate-fade-in">
        {renderPage()}
      </main>

      <footer className="border-t border-white/5 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
                M
              </div>
              <span className="font-display text-base text-white/60">Family Morris</span>
            </div>
            <p className="text-white/30 font-body text-xs text-center">
              © 2025 Family Morris Organization · Все права защищены
            </p>
            <div className="flex gap-4">
              {[
                { label: 'Главная', page: 'home' },
                { label: 'История', page: 'history' },
                { label: 'Контакты', page: 'contact' },
              ].map(item => (
                <button
                  key={item.label}
                  onClick={() => setPage(item.page)}
                  className="text-white/30 font-body text-xs hover:text-white/60 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
