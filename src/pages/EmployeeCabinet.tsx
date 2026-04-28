import Icon from '@/components/ui/icon';

interface EmployeeCabinetProps {
  onNavigate: (page: string) => void;
}

const myEvents = [
  { title: 'Летний съезд 2025', date: '15 Июня 2025', status: 'upcoming' },
  { title: 'День основания', date: '12 Сентября 2025', status: 'upcoming' },
  { title: 'Весенний пикник', date: '3 Марта 2025', status: 'past' },
];

export default function EmployeeCabinet({ onNavigate }: EmployeeCabinetProps) {
  const profile = {
    name: 'Сара Моррис',
    role: 'Секретарь',
    generation: 2,
    joined: '1995',
    email: 'sara@family-morris.org',
    phone: '+7 (999) 234-56-78',
    bio: 'Отвечаю за ведение семейного архива, организацию встреч и хранение важных документов. Горжусь своей ролью в поддержании истории семьи Morris.',
    achievements: [
      'Составила семейное древо 2020',
      'Организовала 8 крупных встреч',
      'Архив 500+ фотографий',
    ],
    warnings: 1,
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Icon name="User" size={18} className="text-white" />
            </div>
            <span className="text-green-400 font-body text-sm font-semibold tracking-wide uppercase">
              Личный кабинет
            </span>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="glass px-4 py-2 rounded-lg text-white/60 font-body text-sm hover:text-white/80 transition-colors flex items-center gap-2"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="md:col-span-1 space-y-5">
            <div className="glass gradient-border rounded-2xl p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-4xl">
                👩‍💼
              </div>
              <h2 className="font-body font-semibold text-white text-lg">{profile.name}</h2>
              <p className="text-violet-400 font-body text-sm mb-1">{profile.role}</p>
              <p className="text-white/40 font-body text-xs mb-4">
                {profile.generation} поколение · с {profile.joined} года
              </p>
              {profile.warnings > 0 && (
                <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-4">
                  <Icon name="AlertTriangle" size={13} className="text-yellow-400" />
                  <span className="text-yellow-400 font-body text-xs">
                    {profile.warnings} действующий выговор
                  </span>
                </div>
              )}
              <button className="w-full py-2 glass rounded-lg text-white/60 font-body text-sm hover:text-white/80 hover:bg-white/10 transition-all">
                Редактировать профиль
              </button>
            </div>

            <div className="glass gradient-border rounded-2xl p-5">
              <h3 className="font-body font-semibold text-white text-sm mb-3">Контакты</h3>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={14} className="text-white/40 flex-shrink-0" />
                  <span className="text-white/60 font-body text-xs">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={14} className="text-white/40 flex-shrink-0" />
                  <span className="text-white/60 font-body text-xs">{profile.phone}</span>
                </div>
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-5">
              <h3 className="font-body font-semibold text-white text-sm mb-3">Достижения</h3>
              <div className="space-y-2">
                {profile.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-violet-400 text-xs mt-0.5">✦</span>
                    <span className="text-white/60 font-body text-xs leading-relaxed">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-5">
            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-3">О себе</h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">{profile.bio}</p>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Мои события</h3>
              <div className="space-y-3">
                {myEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-4 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      event.status === 'upcoming' ? 'bg-blue-400' : 'bg-white/20'
                    }`} />
                    <div className="flex-1">
                      <span className="text-white font-body text-sm">{event.title}</span>
                    </div>
                    <span className={`font-body text-xs ${
                      event.status === 'upcoming' ? 'text-blue-400' : 'text-white/30'
                    }`}>
                      {event.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Статистика участия</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '12', label: 'Встреч посещено' },
                  { value: '8', label: 'Лет в организации' },
                  { value: '3', label: 'Проекта завершено' },
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-white/5 rounded-xl">
                    <div className="font-display text-3xl gradient-text font-semibold">{stat.value}</div>
                    <div className="text-white/40 font-body text-xs mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Уведомления</h3>
              <div className="space-y-3">
                {[
                  { text: 'Летний съезд — подтвердите участие', type: 'info', time: '2 часа назад' },
                  { text: 'Новый документ в архиве семьи', type: 'update', time: '1 день назад' },
                  { text: 'Выговор от лидера: нарушение регламента', type: 'warning', time: '3 дня назад' },
                ].map((notif, i) => (
                  <div key={i} className={`flex gap-3 p-3 rounded-xl border ${
                    notif.type === 'warning'
                      ? 'bg-yellow-500/5 border-yellow-500/20'
                      : notif.type === 'info'
                      ? 'bg-blue-500/5 border-blue-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <span className="text-base">
                      {notif.type === 'warning' ? '⚠️' : notif.type === 'info' ? '📅' : '📄'}
                    </span>
                    <div className="flex-1">
                      <p className="text-white/70 font-body text-sm">{notif.text}</p>
                      <p className="text-white/30 font-body text-xs mt-0.5">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
