const events = [
  {
    date: '15 Июня 2025',
    title: 'Летний семейный съезд',
    location: 'Усадьба Моррис, Подмосковье',
    type: 'Ежегодный',
    typeColor: 'from-blue-500 to-cyan-500',
    desc: 'Главное мероприятие года. Все ветви семьи собираются вместе, подводим итоги и строим планы.',
    upcoming: true,
  },
  {
    date: '12 Сентября 2025',
    title: 'День основания организации',
    location: 'Онлайн + Москва',
    type: 'Памятный',
    typeColor: 'from-yellow-500 to-orange-500',
    desc: 'Праздник в честь основания Family Morris. Торжественная часть и награждение отличившихся.',
    upcoming: true,
  },
  {
    date: '28 Ноября 2025',
    title: 'Зимнее собрание совета',
    location: 'Дом Джеймса Морриса',
    type: 'Совет',
    typeColor: 'from-violet-500 to-purple-600',
    desc: 'Закрытое заседание совета семьи. Обсуждение ключевых вопросов организации.',
    upcoming: true,
  },
  {
    date: '3 Марта 2025',
    title: 'Весенний пикник',
    location: 'Парк Останкино',
    type: 'Прошедший',
    typeColor: 'from-gray-500 to-gray-600',
    desc: 'Неформальная встреча молодого поколения Morris. Прошло прекрасно!',
    upcoming: false,
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наша жизнь</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Семейные <span className="gradient-text">события</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Встречи, праздники и важные даты — мы создаём воспоминания вместе.
          </p>
        </div>

        {/* Upcoming highlight */}
        <div className="glass gradient-border rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
              Ближайшее событие
            </span>
            <h2 className="font-display text-4xl text-white mb-2">Летний семейный съезд</h2>
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="text-white/50 font-body text-sm flex items-center gap-1.5">
                📅 15 Июня 2025
              </span>
              <span className="text-white/50 font-body text-sm flex items-center gap-1.5">
                📍 Усадьба Моррис, Подмосковье
              </span>
            </div>
            <p className="text-white/60 font-body leading-relaxed mb-6 max-w-2xl">
              Главное мероприятие года. Все ветви семьи собираются вместе, подводим итоги года и строим планы на будущее. Торжественный ужин, семейные конкурсы и много тёплых воспоминаний.
            </p>
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Подтвердить участие
            </button>
          </div>
        </div>

        {/* Events list */}
        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className={`glass gradient-border rounded-2xl p-6 glass-hover ${!event.upcoming ? 'opacity-60' : ''}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-center md:text-left md:w-32 flex-shrink-0">
                  <div className="font-display text-3xl gradient-text font-semibold leading-none">
                    {event.date.split(' ')[0]}
                  </div>
                  <div className="text-white/40 font-body text-sm">
                    {event.date.split(' ').slice(1).join(' ')}
                  </div>
                </div>
                <div className="w-px h-12 bg-white/10 hidden md:block" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="font-body font-semibold text-white">{event.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${event.typeColor}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-blue-400/60 font-body text-xs mb-2">📍 {event.location}</p>
                  <p className="text-white/50 font-body text-sm leading-relaxed">{event.desc}</p>
                </div>
                {event.upcoming && (
                  <button className="self-center flex-shrink-0 px-4 py-2 glass text-white/70 font-body text-sm rounded-lg hover:text-white hover:bg-white/10 transition-all">
                    Участвую
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
