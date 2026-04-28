export default function HistoryPage() {
  const timeline = [
    {
      year: '1987',
      title: 'Основание',
      desc: 'Семья Morris объединилась под общим именем. Первые собрания проходили в доме Уильяма Морриса — патриарха и основателя организации.',
    },
    {
      year: '1995',
      title: 'Расширение',
      desc: 'К семье присоединились три новые ветви. Приняты первые семейные ценности и кодекс чести Morris.',
    },
    {
      year: '2003',
      title: 'Новые традиции',
      desc: 'Введена традиция ежегодного летнего съезда. Основан семейный фонд для поддержки молодых членов.',
    },
    {
      year: '2012',
      title: 'Третье поколение',
      desc: 'Представители третьего поколения Morris взяли на себя ключевые роли. Семья насчитывает уже более 40 человек.',
    },
    {
      year: '2024',
      title: 'Цифровая эра',
      desc: 'Создание официального портала семьи Morris. Новая глава в истории — объединение через технологии.',
    },
  ];

  const values = [
    { emoji: '🤝', title: 'Единство', desc: 'Мы всегда рядом друг с другом — в радости и в трудные времена.' },
    { emoji: '⚖️', title: 'Честь', desc: 'Имя Morris — синоним достоинства, порядочности и уважения.' },
    { emoji: '🌱', title: 'Рост', desc: 'Каждый член семьи стремится к развитию и помогает расти другим.' },
    { emoji: '🏛️', title: 'Традиции', desc: 'Мы чтим прошлое и передаём ценности следующим поколениям.' },
    { emoji: '💡', title: 'Мудрость', desc: 'Решения принимаются с заботой о всех членах семьи.' },
    { emoji: '❤️', title: 'Забота', desc: 'Благополучие каждого — ответственность всей семьи Morris.' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наше прошлое</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            История <span className="gradient-text">Morris</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            Больше 35 лет мы строим семью, основанную на взаимном уважении, любви и общих ценностях.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/0abf9031-de7d-434d-9fae-95c7600b180b.jpg"
              alt="Семейное дерево Morris"
              className="w-full h-full object-cover aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-2xl text-white">Семейное древо</p>
              <p className="text-white/50 text-sm font-body">3 поколения</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 mt-2 bg-gradient-to-b from-violet-600/40 to-transparent" />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-violet-400 font-body font-semibold text-sm">{item.year}</span>
                    <span className="text-white font-body font-medium">{item.title}</span>
                  </div>
                  <p className="text-white/50 font-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="font-display text-5xl text-white font-light mb-4">
            Ценности <span className="gradient-text">семьи</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {values.map((val, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-6 glass-hover">
              <div className="text-3xl mb-4">{val.emoji}</div>
              <h3 className="font-display text-xl text-white mb-2">{val.title}</h3>
              <p className="text-white/50 font-body text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
