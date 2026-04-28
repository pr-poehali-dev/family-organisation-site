import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

type Photo = {
  id: number;
  url: string;
  caption: string;
  author: string;
  album: string;
  date: string;
};

const initialAlbums = [
  { title: 'Летний съезд 2024', count: 48, year: '2024', emoji: '🏡', color: 'from-blue-500/20 to-violet-600/20' },
  { title: 'День основания', count: 32, year: '2023', emoji: '🎉', color: 'from-violet-500/20 to-purple-600/20' },
  { title: 'Зимнее собрание', count: 21, year: '2023', emoji: '❄️', color: 'from-cyan-500/20 to-blue-600/20' },
  { title: 'Семейный пикник', count: 67, year: '2023', emoji: '🌿', color: 'from-green-500/20 to-blue-600/20' },
  { title: 'Архив Morris', count: 124, year: '1987–2010', emoji: '🏛️', color: 'from-yellow-500/20 to-orange-500/20' },
  { title: 'Портреты семьи', count: 36, year: 'Разные годы', emoji: '👨‍👩‍👧‍👦', color: 'from-pink-500/20 to-violet-600/20' },
];

const memories = [
  { emoji: '🥂', text: '«Тост Уильяма на юбилее. Мы все плакали.»', author: 'Элизабет М.' },
  { emoji: '🌅', text: '«Рассвет в день летнего съезда — незабываемо.»', author: 'Оливия М.' },
  { emoji: '🎵', text: '«Томас сыграл нашу семейную песню впервые за 10 лет.»', author: 'Сара М.' },
];

const initialPhotos: Photo[] = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/4d4df31c-9bea-4f48-866a-1babd297fe5b.jpg',
    caption: 'Летний съезд 2024',
    author: 'Джеймс Моррис',
    album: 'Летний съезд 2024',
    date: 'Июнь 2024',
  },
  {
    id: 2,
    url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/0abf9031-de7d-434d-9fae-95c7600b180b.jpg',
    caption: 'Семейное древо Morris',
    author: 'Сара Моррис',
    album: 'Архив Morris',
    date: '2023',
  },
  {
    id: 3,
    url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/f4fa4f66-3b0c-45d9-8ab9-a1591366224f.jpg',
    caption: 'Герб семьи Morris',
    author: 'Уильям Моррис',
    album: 'Архив Morris',
    date: '1987',
  },
];

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [albums] = useState(initialAlbums);
  const [showUpload, setShowUpload] = useState(false);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const [form, setForm] = useState({ caption: '', author: '', album: albums[0].title });
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preview) return;
    const newPhoto: Photo = {
      id: Date.now(),
      url: preview,
      caption: form.caption || fileName || 'Без названия',
      author: form.author || 'Анонимно',
      album: form.album,
      date: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
    };
    setPhotos([newPhoto, ...photos]);
    setPreview(null);
    setFileName('');
    setForm({ caption: '', author: '', album: albums[0].title });
    setShowUpload(false);
  };

  const deletePhoto = (id: number) => {
    setPhotos(photos.filter(p => p.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Наши воспоминания</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Фотоархив <span className="gradient-text">Morris</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Каждая фотография — это кусочек нашей общей истории, бережно сохранённый для потомков.
          </p>
        </div>

        {/* Hero photo */}
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
        </div>

        {/* Photo grid with header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl text-white">Все фотографии</h2>
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Icon name="Upload" size={15} />
            Загрузить фото
          </button>
        </div>

        {photos.length === 0 ? (
          <div className="glass gradient-border rounded-2xl p-16 text-center mb-12">
            <div className="text-5xl mb-3">📷</div>
            <p className="text-white/40 font-body">Пока нет фотографий. Будьте первым!</p>
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 mb-12 space-y-4">
            {photos.map(photo => (
              <div key={photo.id} className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer" onClick={() => setLightbox(photo)}>
                <img src={photo.url} alt={photo.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-body text-sm font-medium leading-tight">{photo.caption}</p>
                  <p className="text-white/60 font-body text-xs mt-0.5">{photo.author} · {photo.date}</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); deletePhoto(photo.id); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Albums */}
        <h2 className="font-display text-3xl text-white mb-6">Альбомы</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {albums.map((album, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-6 glass-hover group cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${album.color} border border-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {album.emoji}
              </div>
              <h3 className="font-body font-semibold text-white mb-1">{album.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-white/40 font-body text-xs">{album.year}</span>
                <span className="text-violet-400 font-body text-xs">{album.count} фото</span>
              </div>
            </div>
          ))}
        </div>

        {/* Memories */}
        <div className="text-center mb-10">
          <h2 className="font-display text-4xl text-white font-light">Тёплые <span className="gradient-text">воспоминания</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {memories.map((mem, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-6">
              <div className="text-3xl mb-4">{mem.emoji}</div>
              <p className="text-white/70 font-body text-sm leading-relaxed italic mb-3">{mem.text}</p>
              <p className="text-violet-400 font-body text-xs">— {mem.author}</p>
            </div>
          ))}
        </div>

        {/* Upload CTA */}
        <div className="glass gradient-border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">📸</div>
          <h3 className="font-display text-2xl text-white mb-2">Добавить фотографии</h3>
          <p className="text-white/50 font-body text-sm mb-5 max-w-md mx-auto">
            Поделитесь своими воспоминаниями с семьёй. Загрузите фотографии в общий архив.
          </p>
          <button
            onClick={() => setShowUpload(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Загрузить фото
          </button>
        </div>
      </div>

      {/* ── UPLOAD MODAL ── */}
      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowUpload(false)} />
          <div className="relative glass gradient-border rounded-2xl w-full max-w-lg animate-scale-in overflow-hidden">
            {/* Modal header */}
            <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/8">
              <div>
                <h3 className="font-display text-2xl text-white">Загрузить фото</h3>
                <p className="text-white/40 font-body text-xs mt-0.5">Фотоархив Family Morris</p>
              </div>
              <button onClick={() => setShowUpload(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
              {/* Drop zone */}
              <div
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 ${
                  dragOver
                    ? 'border-violet-500 bg-violet-500/10'
                    : preview
                    ? 'border-green-500/40 bg-green-500/5'
                    : 'border-white/15 hover:border-white/30 bg-white/3'
                }`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />

                {preview ? (
                  <div className="relative">
                    <img src={preview} alt="preview" className="w-full h-52 object-cover rounded-2xl" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                      <p className="text-white font-body text-sm flex items-center gap-2">
                        <Icon name="RefreshCw" size={14} /> Заменить
                      </p>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500/80 text-white font-body text-xs flex items-center gap-1.5">
                      <Icon name="Check" size={11} /> Готово
                    </div>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col items-center gap-3 cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                      <Icon name="ImagePlus" size={24} className="text-violet-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 font-body text-sm font-medium">Нажмите или перетащите файл</p>
                      <p className="text-white/30 font-body text-xs mt-1">PNG, JPG, WEBP — до 10 МБ</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Подпись к фото</label>
                  <input
                    placeholder="Летний съезд 2024..."
                    value={form.caption}
                    onChange={e => setForm({ ...form, caption: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-body text-xs mb-1.5">Автор</label>
                    <input
                      placeholder="Ваше имя"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs mb-1.5">Альбом</label>
                    <select
                      value={form.album}
                      onChange={e => setForm({ ...form, album: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 bg-transparent"
                    >
                      {albums.map(a => (
                        <option key={a.title} value={a.title} className="bg-[#0e0f1e] text-white">{a.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-1">
                <button
                  type="submit"
                  disabled={!preview}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Icon name="Upload" size={15} />
                  Добавить в архив
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="flex-1 py-3 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="relative max-w-4xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.caption} className="w-full max-h-[75vh] object-contain rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <p className="text-white font-body font-medium">{lightbox.caption}</p>
              <p className="text-white/50 font-body text-sm mt-0.5">{lightbox.author} · {lightbox.album} · {lightbox.date}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
