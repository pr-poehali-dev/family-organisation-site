const albums = [
  {
    title: 'Летний съезд 2024',
    count: 48,
    year: '2024',
    emoji: '🏡',
    color: 'from-blue-500/20 to-violet-600/20',
  },
  {
    title: 'День основания',
    count: 32,
    year: '2023',
    emoji: '🎉',
    color: 'from-violet-500/20 to-purple-600/20',
  },
  {
    title: 'Зимнее собрание',
    count: 21,
    year: '2023',
    emoji: '❄️',
    color: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    title: 'Семейный пикник',
    count: 67,
    year: '2023',
    emoji: '🌿',
    color: 'from-green-500/20 to-blue-600/20',
  },
  {
    title: 'Архив Morris',
    count: 124,
    year: '1987–2010',
    emoji: '🏛️',
    color: 'from-yellow-500/20 to-orange-500/20',
  },
  {
    title: 'Портреты семьи',
    count: 36,
    year: 'Разные годы',
    emoji: '👨‍👩‍👧‍👦',
    color: 'from-pink-500/20 to-violet-600/20',
  },
];

const memories = [
  { emoji: '🥂', text: '«Тост Уильяма на юбилее. Мы все плакали.»', author: 'Элизабет М.' },
  { emoji: '🌅', text: '«Рассвет в день летнего съезда — незабываемо.»', author: 'Оливия М.' },
  { emoji: '🎵', text: '«Томас сыграл нашу семейную песню впервые за 10 лет.»', author: 'Сара М.' },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наши воспоминания</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Фотоархив <span className="gradient-text">Morris</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Каждая фотография — это кусочек нашей общей истории, бережно сохранённый для потомков.
          </p>
        </div>

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden mb-12 aspect-video">
          <img
            src="https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/4d4df31c-9bea-4f48-866a-1babd297fe5b.jpg"
            alt="Семья Morris"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <p className="font-display text-3xl text-white mb-1">Летний съезд 2024</p>
            <p className="text-white/50 font-body text-sm">48 фотографий · Июнь 2024</p>
          </div>
          <div className="absolute top-6 right-6">
            <button className="px-4 py-2 glass text-white/80 font-body text-sm rounded-lg hover:bg-white/10 transition-all">
              Открыть альбом →
            </button>
          </div>
        </div>

        {/* Albums grid */}
        <h2 className="font-display text-3xl text-white mb-6">Все альбомы</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {albums.map((album, i) => (
            <button
              key={i}
              className="glass gradient-border rounded-2xl p-6 text-left glass-hover group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${album.color} border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {album.emoji}
              </div>
              <h3 className="font-body font-semibold text-white mb-1">{album.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-body text-xs">{album.year}</span>
                <span className="text-violet-400 font-body text-xs">{album.count} фото</span>
              </div>
            </button>
          ))}
        </div>

        {/* Memories */}
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-white font-light">
            Тёплые <span className="gradient-text">воспоминания</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {memories.map((mem, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-6">
              <div className="text-3xl mb-4">{mem.emoji}</div>
              <p className="text-white/70 font-body text-sm leading-relaxed italic mb-3">
                {mem.text}
              </p>
              <p className="text-violet-400 font-body text-xs">— {mem.author}</p>
            </div>
          ))}
        </div>

        <div className="glass gradient-border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">📸</div>
          <h3 className="font-display text-2xl text-white mb-2">Добавить фотографии</h3>
          <p className="text-white/50 font-body text-sm mb-5 max-w-md mx-auto">
            Поделитесь своими воспоминаниями с семьёй. Загрузите фотографии в общий архив.
          </p>
          <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            Загрузить фото
          </button>
        </div>
      </div>
    </div>
  );
}
