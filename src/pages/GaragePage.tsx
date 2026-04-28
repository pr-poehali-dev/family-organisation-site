import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Car = {
  id: number;
  name: string;
  year: string;
  plate: string;
  color: string;
  owner: string;
  status: 'available' | 'in-use' | 'reserved';
  tag: string;
  tagColor: string;
  desc: string;
};

const initialCars: Car[] = [
  {
    id: 1,
    name: 'Mercedes-Benz S-Class',
    year: '2023',
    plate: 'M 001 OR',
    color: 'Obsidian Black',
    owner: 'Джеймс Моррис',
    status: 'available',
    tag: 'Лидер',
    tagColor: 'from-yellow-500 to-orange-500',
    desc: 'Представительский седан. Используется для официальных мероприятий семьи.',
  },
  {
    id: 2,
    name: 'Range Rover Autobiography',
    year: '2022',
    plate: 'M 002 OR',
    color: 'Fuji White',
    owner: 'Уильям Моррис',
    status: 'available',
    tag: 'Патриарх',
    tagColor: 'from-violet-500 to-purple-600',
    desc: 'Флагманский внедорожник. Личный автомобиль основателя семьи.',
  },
  {
    id: 3,
    name: 'BMW 7 Series',
    year: '2021',
    plate: 'M 003 OR',
    color: 'Mineral White',
    owner: 'Томас Моррис',
    status: 'in-use',
    tag: 'Казначей',
    tagColor: 'from-blue-500 to-cyan-500',
    desc: 'Деловой седан для поездок на встречи и переговоры.',
  },
  {
    id: 4,
    name: 'Porsche Cayenne',
    year: '2023',
    plate: 'M 004 OR',
    color: 'Night Blue',
    owner: 'Семья Morris',
    status: 'available',
    tag: 'Общий',
    tagColor: 'from-green-500 to-emerald-600',
    desc: 'Общий автомобиль семьи. Доступен для бронирования членами организации.',
  },
  {
    id: 5,
    name: 'Tesla Model S',
    year: '2024',
    plate: 'M 005 OR',
    color: 'Midnight Silver',
    owner: 'Оливия Моррис',
    status: 'available',
    tag: 'Участник',
    tagColor: 'from-pink-500 to-rose-500',
    desc: 'Электрический флагман нового поколения Morris.',
  },
  {
    id: 6,
    name: 'Rolls-Royce Ghost',
    year: '2020',
    plate: 'M 006 OR',
    color: 'Seashell',
    owner: 'Архив Morris',
    status: 'reserved',
    tag: 'Исторический',
    tagColor: 'from-gray-400 to-gray-600',
    desc: 'Легендарный автомобиль семьи. Используется только на торжественных событиях.',
  },
];

const statusLabels: Record<string, { label: string; color: string; dot: string }> = {
  available: { label: 'Свободен', color: 'text-green-400', dot: 'bg-green-400' },
  'in-use': { label: 'В использовании', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  reserved: { label: 'Зарезервирован', color: 'text-violet-400', dot: 'bg-violet-400' },
};

const emptyForm = { name: '', year: '', plate: '', color: '', owner: '', status: 'available' as Car['status'], tag: '', desc: '' };

interface GaragePageProps {
  isLeader?: boolean;
  onNavigate?: (page: string) => void;
}

export default function GaragePage({ isLeader = false, onNavigate }: GaragePageProps) {
  const [filter, setFilter] = useState<'all' | 'available' | 'in-use' | 'reserved'>('all');
  const [selected, setSelected] = useState<number | null>(null);
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = filter === 'all' ? cars : cars.filter(c => c.status === filter);
  const selectedCar = cars.find(c => c.id === selected);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.plate.trim()) return;
    const newCar: Car = {
      id: Date.now(),
      name: form.name,
      year: form.year || new Date().getFullYear().toString(),
      plate: form.plate,
      color: form.color || 'Не указан',
      owner: form.owner || 'Семья Morris',
      status: form.status,
      tag: form.tag || 'Общий',
      tagColor: 'from-blue-500 to-violet-600',
      desc: form.desc || 'Автомобиль семьи Morris.',
    };
    setCars([...cars, newCar]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setCars(cars.filter(c => c.id !== id));
    if (selected === id) setSelected(null);
    setDeleteConfirm(null);
  };

  const handleStatusChange = (id: number, status: Car['status']) => {
    setCars(cars.map(c => c.id === id ? { ...c, status } : c));
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Транспорт</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Автопарк <span className="gradient-text">Morris</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Официальный транспортный парк семейной организации. Управление и бронирование автомобилей.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: cars.length, label: 'Автомобилей', color: 'from-blue-500 to-violet-600' },
            { value: cars.filter(c => c.status === 'available').length, label: 'Свободно', color: 'from-green-500 to-emerald-500' },
            { value: cars.filter(c => c.status === 'in-use').length, label: 'В использовании', color: 'from-yellow-500 to-orange-500' },
          ].map((stat, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-5 text-center">
              <div className={`font-display text-4xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-semibold`}>
                {stat.value}
              </div>
              <div className="text-white/40 font-body text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters + add button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Все' },
              { id: 'available', label: 'Свободные' },
              { id: 'in-use', label: 'В использовании' },
              { id: 'reserved', label: 'Зарезервированы' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as typeof filter)}
                className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                  filter === f.id
                    ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                    : 'glass text-white/50 hover:text-white/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          {isLeader && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              <Icon name="Plus" size={15} />
              Добавить авто
            </button>
          )}
        </div>

        {/* Cars grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
          {filtered.map(car => (
            <div
              key={car.id}
              className={`glass gradient-border rounded-2xl p-6 glass-hover group transition-all cursor-pointer ${
                selected === car.id ? 'ring-1 ring-violet-500/60' : ''
              }`}
              onClick={() => setSelected(car.id === selected ? null : car.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  🚗
                </div>
                <div className="text-right">
                  <div className="font-body text-xs font-semibold text-white/70 bg-white/10 px-2 py-1 rounded-lg tracking-widest">
                    {car.plate}
                  </div>
                </div>
              </div>
              <h3 className="font-body font-semibold text-white text-base leading-tight mb-1">{car.name}</h3>
              <p className="text-white/40 font-body text-xs mb-3">{car.year} · {car.color}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${statusLabels[car.status].dot}`} />
                  <span className={`font-body text-xs ${statusLabels[car.status].color}`}>
                    {statusLabels[car.status].label}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${car.tagColor}`}>
                  {car.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selectedCar && (
          <div className="glass gradient-border rounded-2xl p-7 animate-fade-in mb-8">
            <div className="flex items-start justify-between mb-5">
              <div>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${selectedCar.tagColor} mb-2`}>
                  {selectedCar.tag}
                </span>
                <h2 className="font-display text-3xl text-white">{selectedCar.name}</h2>
                <p className="text-white/40 font-body text-sm mt-1">{selectedCar.year} · {selectedCar.color}</p>
              </div>
              <div className="flex items-center gap-2">
                {isLeader && (
                  <button
                    onClick={() => setDeleteConfirm(selectedCar.id)}
                    className="p-2 glass rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Удалить из реестра"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                )}
                <button
                  onClick={() => setSelected(null)}
                  className="text-white/30 hover:text-white/60 transition-colors font-body text-sm px-2 py-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <p className="text-white/60 font-body text-sm leading-relaxed mb-5">{selectedCar.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Владелец', value: selectedCar.owner },
                    { label: 'Гос. номер', value: selectedCar.plate },
                    { label: 'Год выпуска', value: selectedCar.year },
                    { label: 'Цвет', value: selectedCar.color },
                  ].map((info, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-3">
                      <p className="text-white/30 font-body text-xs mb-0.5">{info.label}</p>
                      <p className="text-white font-body text-sm font-medium">{info.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className={`p-4 rounded-xl border ${
                  selectedCar.status === 'available' ? 'bg-green-500/5 border-green-500/20'
                  : selectedCar.status === 'in-use' ? 'bg-yellow-500/5 border-yellow-500/20'
                  : 'bg-violet-500/5 border-violet-500/20'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${statusLabels[selectedCar.status].dot}`} />
                    <span className={`font-body text-sm font-medium ${statusLabels[selectedCar.status].color}`}>
                      {statusLabels[selectedCar.status].label}
                    </span>
                  </div>
                  <p className="text-white/30 font-body text-xs">Текущий статус</p>
                </div>

                {isLeader ? (
                  <div className="space-y-2">
                    <p className="text-white/40 font-body text-xs">Изменить статус:</p>
                    {(['available', 'in-use', 'reserved'] as Car['status'][]).map(s => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(selectedCar.id, s)}
                        className={`w-full py-2 px-3 rounded-lg font-body text-xs transition-all text-left flex items-center gap-2 ${
                          selectedCar.status === s
                            ? 'bg-white/10 text-white'
                            : 'glass text-white/50 hover:text-white/80'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${statusLabels[s].dot}`} />
                        {statusLabels[s].label}
                      </button>
                    ))}
                  </div>
                ) : (
                  selectedCar.status === 'available' && (
                    <button className="py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">
                      Забронировать
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* CTA — only for non-leaders */}
        {!isLeader && (
          <div className="glass gradient-border rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🔑</div>
            <h3 className="font-display text-2xl text-white mb-2">Добавить автомобиль</h3>
            <p className="text-white/50 font-body text-sm mb-5 max-w-md mx-auto">
              Только лидер организации может добавлять транспортные средства в реестр семьи Morris.
            </p>
            <button
              onClick={() => onNavigate?.('cabinet')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Войти как лидер
            </button>
          </div>
        )}
      </div>

      {/* Add car modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative glass gradient-border rounded-2xl p-7 w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl text-white">Добавить автомобиль</h3>
                <p className="text-white/40 font-body text-xs mt-0.5">Реестр семьи Morris</p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-white/30 hover:text-white/60 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Марка и модель *</label>
                  <input
                    required
                    placeholder="BMW 7 Series"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Год выпуска</label>
                  <input
                    placeholder="2024"
                    value={form.year}
                    onChange={e => setForm({ ...form, year: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Гос. номер *</label>
                  <input
                    required
                    placeholder="M 007 OR"
                    value={form.plate}
                    onChange={e => setForm({ ...form, plate: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Цвет</label>
                  <input
                    placeholder="Midnight Black"
                    value={form.color}
                    onChange={e => setForm({ ...form, color: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Владелец</label>
                  <input
                    placeholder="Джеймс Моррис"
                    value={form.owner}
                    onChange={e => setForm({ ...form, owner: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Категория</label>
                  <input
                    placeholder="Лидер / Общий / ..."
                    value={form.tag}
                    onChange={e => setForm({ ...form, tag: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Статус</label>
                  <div className="flex gap-2">
                    {(['available', 'in-use', 'reserved'] as Car['status'][]).map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, status: s })}
                        className={`flex-1 py-2 px-3 rounded-lg font-body text-xs transition-all flex items-center justify-center gap-1.5 ${
                          form.status === s
                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                            : 'glass text-white/50 hover:text-white/80'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${statusLabels[s].dot}`} />
                        {statusLabels[s].label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Описание</label>
                  <textarea
                    rows={3}
                    placeholder="Краткое описание автомобиля..."
                    value={form.desc}
                    onChange={e => setForm({ ...form, desc: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  Добавить в реестр
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-scale-in text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-display text-2xl text-white mb-2">Удалить авто?</h3>
            <p className="text-white/50 font-body text-sm mb-5">
              {cars.find(c => c.id === deleteConfirm)?.name} будет удалён из реестра.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-body text-sm rounded-lg hover:opacity-90"
              >
                Удалить
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
