import { useMembers } from '@/store/members';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [members] = useMembers();
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/4d4df31c-9bea-4f48-866a-1babd297fe5b.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(230,35%,7%)]/70 via-[hsl(230,35%,7%)]/50 to-[hsl(230,35%,7%)]" />

        <div className="relative z-10 text-center px-6 animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-2 border-violet-500/40 shadow-lg shadow-violet-500/20">
            <img
              src="https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/f4fa4f66-3b0c-45d9-8ab9-a1591366224f.jpg"
              alt="Герб Morris"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm font-body font-medium tracking-[0.3em] text-blue-400 uppercase mb-4">
            Семейная организация
          </p>
          <h1 className="font-display text-6xl md:text-8xl font-light text-white mb-4 leading-none">
            Family
          </h1>
          <h1 className="font-display text-6xl md:text-8xl font-semibold gradient-text mb-8 leading-none">
            Morris
          </h1>
          <p className="text-white/60 font-body text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Единство, традиции и взаимная поддержка — основа нашей семьи. Мы строим будущее вместе.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('history')}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-medium rounded-xl hover:opacity-90 transition-all hover:scale-105"
            >
              Узнать историю
            </button>
            <button
              onClick={() => onNavigate('members')}
              className="px-8 py-3.5 glass gradient-border text-white font-body font-medium rounded-xl hover:bg-white/8 transition-all"
            >
              Наши члены
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 mesh-bg">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '1987', label: 'Год основания' },
              { value: String(members.length), label: 'Членов семьи' },
              { value: String(new Set(members.map(m => m.generation)).size), label: 'Поколения' },
              { value: '12', label: 'Ежегодных встреч' },
            ].map((stat, i) => (
              <div key={i} className="glass gradient-border rounded-2xl p-6 text-center glass-hover">
                <div className="font-display text-4xl md:text-5xl gradient-text font-semibold mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 font-body text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наш портал</p>
          <h2 className="font-display text-5xl text-white font-light">Всё в одном месте</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: 'Users',
              title: 'Профили членов',
              desc: 'Подробная информация о каждом члене семьи Morris — история, достижения и роль в организации.',
              page: 'members',
            },
            {
              icon: 'Calendar',
              title: 'Семейные события',
              desc: 'Встречи, праздники и памятные даты. Никогда не пропускайте важные семейные мероприятия.',
              page: 'events',
            },
            {
              icon: 'Image',
              title: 'Фотоархив',
              desc: 'Воспоминания и фотографии из жизни семьи Morris, бережно хранимые для будущих поколений.',
              page: 'gallery',
            },
          ].map((feature, i) => (
            <button
              key={i}
              onClick={() => onNavigate(feature.page)}
              className="glass gradient-border rounded-2xl p-8 text-left glass-hover group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-violet-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <span className="text-violet-400 text-xl">
                  {feature.icon === 'Users' ? '👥' : feature.icon === 'Calendar' ? '📅' : '🖼️'}
                </span>
              </div>
              <h3 className="font-display text-2xl text-white mb-3">{feature.title}</h3>
              <p className="text-white/50 font-body text-sm leading-relaxed">{feature.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}