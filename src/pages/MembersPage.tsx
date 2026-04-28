const members = [
  {
    name: 'Уильям Моррис',
    role: 'Патриарх',
    badge: 'Основатель',
    badgeColor: 'from-yellow-500 to-orange-500',
    generation: 1,
    bio: 'Основатель семейной организации Morris. Человек, объединивший всех под одной крышей.',
    avatar: '👴',
  },
  {
    name: 'Элизабет Моррис',
    role: 'Матриарх',
    badge: 'Старейшина',
    badgeColor: 'from-violet-500 to-purple-600',
    generation: 1,
    bio: 'Хранитель традиций и семейной мудрости. Любимая бабушка для всего третьего поколения.',
    avatar: '👵',
  },
  {
    name: 'Джеймс Моррис',
    role: 'Лидер',
    badge: 'Администратор',
    badgeColor: 'from-blue-500 to-cyan-500',
    generation: 2,
    bio: 'Руководит семейной организацией. Отвечает за принятие ключевых решений.',
    avatar: '👨‍💼',
  },
  {
    name: 'Сара Моррис',
    role: 'Секретарь',
    badge: 'Сотрудник',
    badgeColor: 'from-green-500 to-emerald-600',
    generation: 2,
    bio: 'Ведёт летопись семьи, организует встречи и хранит архив документов.',
    avatar: '👩‍💼',
  },
  {
    name: 'Томас Моррис',
    role: 'Казначей',
    badge: 'Сотрудник',
    badgeColor: 'from-green-500 to-emerald-600',
    generation: 2,
    bio: 'Управляет семейным фондом и финансовыми вопросами организации.',
    avatar: '👨‍💻',
  },
  {
    name: 'Оливия Моррис',
    role: 'Участник',
    badge: 'Участник',
    badgeColor: 'from-pink-500 to-rose-500',
    generation: 3,
    bio: 'Молодое и яркое поколение Morris. Отвечает за социальные медиа семьи.',
    avatar: '👩',
  },
];

export default function MembersPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наши люди</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Члены <span className="gradient-text">семьи</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Каждый человек в семье Morris — уникальная личность с особой ролью и историей.
          </p>
        </div>

        {/* Generation filter */}
        <div className="flex gap-3 justify-center mb-12">
          {['Все', 'I поколение', 'II поколение', 'III поколение'].map((label, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                i === 0
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                  : 'glass text-white/50 hover:text-white/80'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {members.map((member, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-6 glass-hover group cursor-pointer">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-violet-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white text-base leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-white/50 font-body text-sm">{member.role}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${member.badgeColor}`}>
                    {member.badge}
                  </span>
                </div>
              </div>
              <p className="text-white/50 font-body text-sm leading-relaxed mb-4">{member.bio}</p>
              <div className="flex items-center justify-between">
                <span className="text-violet-400/60 font-body text-xs">
                  {member.generation} поколение
                </span>
                <button className="text-xs text-blue-400 hover:text-blue-300 font-body transition-colors">
                  Подробнее →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass gradient-border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="font-display text-2xl text-white mb-2">Хотите присоединиться?</h3>
          <p className="text-white/50 font-body text-sm mb-5">
            Новые члены принимаются по приглашению лидера семьи или действующего участника.
          </p>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            Запросить приглашение
          </button>
        </div>
      </div>
    </div>
  );
}
