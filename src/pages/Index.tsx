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
import GaragePage from './GaragePage';

const pagesWithNav = ['home', 'history', 'members', 'events', 'garage', 'gallery', 'contact', 'cabinet', 'leader-cabinet', 'employee-cabinet'];

export default function Index() {
  const [page, setPage] = useState('home');
  const [role, setRole] = useState<'leader' | 'employee' | null>(null);
  const [memberId, setMemberId] = useState<number | undefined>(undefined);

  const handleNavigate = (p: string, mid?: number) => {
    if (p === 'leader-cabinet') setRole('leader');
    if (p === 'employee-cabinet') { setRole('employee'); setMemberId(mid); }
    if (p === 'home' || p === 'cabinet') { setRole(null); setMemberId(undefined); }
    setPage(p);
  };

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={handleNavigate} />;
      case 'history': return <HistoryPage />;
      case 'members': return <MembersPage />;
      case 'events': return <EventsPage />;
      case 'garage': return <GaragePage isLeader={role === 'leader'} onNavigate={handleNavigate} />;
      case 'gallery': return <GalleryPage />;
      case 'contact': return <ContactPage />;
      case 'cabinet': return <LoginPage onNavigate={handleNavigate} />;
      case 'leader-cabinet': return <LeaderCabinet onNavigate={handleNavigate} />;
      case 'employee-cabinet': return <EmployeeCabinet onNavigate={handleNavigate} memberId={memberId} />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background mesh-bg">
      {pagesWithNav.includes(page) && (
        <Navbar currentPage={page} onNavigate={handleNavigate} />
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
            <div className="text-center">
              <p className="text-white/30 font-body text-xs">
                © 2026 Family Morris Organization · Все права защищены
              </p>
              <p className="text-white/20 font-body text-xs mt-1">
                Разработчик:{' '}
                <a
                  href="https://vk.com/id1089780734"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400/60 hover:text-violet-400 transition-colors"
                >
                  Ethan_Santoro
                </a>
              </p>
            </div>
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