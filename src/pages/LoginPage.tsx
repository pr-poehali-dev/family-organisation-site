import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { getMembers } from '@/store/members';

interface LoginPageProps {
  onNavigate: (page: string, memberId?: number) => void;
}

export default function LoginPage({ onNavigate }: LoginPageProps) {
  const [role, setRole] = useState<'leader' | 'employee' | null>(null);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'leader') {
      onNavigate('leader-cabinet');
      return;
    }

    // Ищем участника по имени (или части имени) и паролю
    const members = getMembers();
    const found = members.find(m => {
      const nameMatch = m.name.toLowerCase().includes(login.trim().toLowerCase()) || login.trim() === '';
      const passMatch = m.password === password || (m.password === '' && password === '');
      return nameMatch && passMatch;
    });

    if (found) {
      onNavigate('employee-cabinet', found.id);
    } else {
      setError('Участник не найден или неверный пароль');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <div className="text-center mb-10 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Icon name="LogIn" size={28} className="text-white" />
          </div>
          <h1 className="font-display text-4xl text-white mb-2">Вход в кабинет</h1>
          <p className="text-white/50 font-body text-sm">Family Morris — закрытый портал</p>
        </div>

        {!role ? (
          <div className="space-y-4 animate-fade-in">
            <p className="text-white/60 font-body text-sm text-center mb-6">Выберите тип кабинета:</p>
            <button
              onClick={() => setRole('leader')}
              className="w-full glass gradient-border rounded-2xl p-6 text-left glass-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👑
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white">Кабинет лидера</h3>
                  <p className="text-white/40 font-body text-xs mt-0.5">Управление организацией и составом</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/30 ml-auto group-hover:text-white/60 transition-colors" />
              </div>
            </button>

            <button
              onClick={() => setRole('employee')}
              className="w-full glass gradient-border rounded-2xl p-6 text-left glass-hover group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  👤
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white">Кабинет сотрудника</h3>
                  <p className="text-white/40 font-body text-xs mt-0.5">Личный профиль и информация</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-white/30 ml-auto group-hover:text-white/60 transition-colors" />
              </div>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="w-full text-center text-white/40 font-body text-sm hover:text-white/60 transition-colors mt-4"
            >
              ← Вернуться на главную
            </button>
          </div>
        ) : (
          <div className="glass gradient-border rounded-2xl p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{role === 'leader' ? '👑' : '👤'}</span>
              <div>
                <h2 className="font-body font-semibold text-white">
                  {role === 'leader' ? 'Кабинет лидера' : 'Кабинет сотрудника'}
                </h2>
                <button
                  onClick={() => { setRole(null); setError(''); }}
                  className="text-white/40 font-body text-xs hover:text-white/60 transition-colors"
                >
                  Изменить →
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-white/60 font-body text-sm mb-2">
                  {role === 'leader' ? 'Логин' : 'Имя участника'}
                </label>
                <input
                  type="text"
                  placeholder={role === 'leader' ? 'morris_leader' : 'Например: Сара'}
                  value={login}
                  onChange={e => { setLogin(e.target.value); setError(''); }}
                  className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                />
              </div>
              <div>
                <label className="block text-white/60 font-body text-sm mb-2">Пароль</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setError(''); }}
                    className="w-full glass rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    <Icon name={showPass ? 'EyeOff' : 'Eye'} size={15} />
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <Icon name="AlertCircle" size={14} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-400 font-body text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-medium rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] mt-2"
              >
                Войти
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
