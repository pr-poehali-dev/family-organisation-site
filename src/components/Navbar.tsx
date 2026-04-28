import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'history', label: 'История' },
  { id: 'members', label: 'Участники' },
  { id: 'events', label: 'События' },
  { id: 'garage', label: 'Автопарк' },
  { id: 'gallery', label: 'Фотографии' },
  { id: 'contact', label: 'Контакты' },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white">
              M
            </div>
            <span className="font-display text-xl text-white/90 tracking-wide">
              Family <span className="gradient-text font-semibold">Morris</span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`nav-link text-sm font-body font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-violet-400 active'
                    : 'text-white/60 hover:text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('cabinet')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Icon name="LogIn" size={14} />
              Войти
            </button>
            <button
              className="md:hidden text-white/60"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? 'X' : 'Menu'} size={22} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-4 border-t border-white/5">
            <div className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'text-violet-400 bg-violet-500/10'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('cabinet')}
                className="mt-2 py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium"
              >
                Войти в кабинет
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}