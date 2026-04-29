import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useEvents, canManageEvents, type FamilyEvent } from '@/store/events';
import { getMembers } from '@/store/members';

interface EventsPageProps {
  isLeader?: boolean;
  memberId?: number;
}

const TYPE_OPTIONS = [
  { label: 'Ежегодный', color: 'from-blue-500 to-cyan-500' },
  { label: 'Памятный', color: 'from-yellow-500 to-orange-500' },
  { label: 'Совет', color: 'from-violet-500 to-purple-600' },
  { label: 'Прошедший', color: 'from-gray-500 to-gray-600' },
  { label: 'Прочее', color: 'from-pink-500 to-rose-500' },
];

const emptyForm = {
  date: '',
  title: '',
  location: '',
  type: 'Ежегодный',
  desc: '',
  upcoming: true,
};

export default function EventsPage({ isLeader, memberId }: EventsPageProps) {
  const [events, setEvents] = useEvents();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  // Определяем право управления
  const canManage = (() => {
    if (isLeader) return true;
    if (memberId) {
      const member = getMembers().find(m => m.id === memberId);
      if (member) return canManageEvents(member.role);
    }
    return false;
  })();

  const nearest = events.filter(e => e.upcoming)[0];

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (ev: FamilyEvent) => {
    setForm({ date: ev.date, title: ev.title, location: ev.location, type: ev.type, desc: ev.desc, upcoming: ev.upcoming });
    setEditId(ev.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title.trim() || !form.date.trim()) return;
    const typeColor = TYPE_OPTIONS.find(t => t.label === form.type)?.color ?? 'from-blue-500 to-cyan-500';
    if (editId !== null) {
      setEvents(events.map(e => e.id === editId ? { ...e, ...form, typeColor } : e));
    } else {
      setEvents([...events, { id: Date.now(), ...form, typeColor }]);
    }
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    setConfirmDelete(null);
  };

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

        {/* Nearest event */}
        {nearest && (
          <div className="glass gradient-border rounded-3xl p-8 mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
                Ближайшее событие
              </span>
              <h2 className="font-display text-4xl text-white mb-2">{nearest.title}</h2>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className="text-white/50 font-body text-sm">📅 {nearest.date}</span>
                <span className="text-white/50 font-body text-sm">📍 {nearest.location}</span>
              </div>
              <p className="text-white/60 font-body leading-relaxed mb-6 max-w-2xl">{nearest.desc}</p>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                Подтвердить участие
              </button>
            </div>
          </div>
        )}

        {/* Add button — только для лидера/зама */}
        {canManage && (
          <div className="flex justify-end mb-6">
            <button
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              <Icon name="Plus" size={14} /> Добавить событие
            </button>
          </div>
        )}

        {/* Events list */}
        {events.length === 0 ? (
          <div className="glass gradient-border rounded-2xl p-16 text-center">
            <div className="text-5xl mb-3">📅</div>
            <p className="text-white/40 font-body">Событий пока нет</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className={`glass gradient-border rounded-2xl p-6 glass-hover ${!event.upcoming ? 'opacity-60' : ''}`}>
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
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {event.upcoming && !canManage && (
                      <button className="px-4 py-2 glass text-white/70 font-body text-sm rounded-lg hover:text-white hover:bg-white/10 transition-all">
                        Участвую
                      </button>
                    )}
                    {canManage && (
                      <>
                        <button
                          onClick={() => openEdit(event)}
                          className="p-2 glass rounded-lg text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                          title="Редактировать"
                        >
                          <Icon name="Pencil" size={14} />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(event.id)}
                          className="p-2 glass rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Форма добавления/редактирования */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg glass gradient-border rounded-3xl shadow-2xl animate-fade-in">
            <div className="max-h-[90vh] overflow-y-auto rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl text-white">{editId ? 'Редактировать событие' : 'Новое событие'}</h3>
                <button onClick={() => setShowForm(false)} className="p-2 glass rounded-xl text-white/40 hover:text-white/70 transition-colors">
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Название <span className="text-red-400">*</span></label>
                  <input
                    value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Летний семейный съезд"
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/60 font-body text-xs mb-1.5">Дата <span className="text-red-400">*</span></label>
                    <input
                      value={form.date}
                      onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                      placeholder="15 Июня 2026"
                      className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 font-body text-xs mb-1.5">Тип</label>
                    <select
                      value={form.type}
                      onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                      className="w-full glass rounded-xl px-4 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 bg-transparent"
                    >
                      {TYPE_OPTIONS.map(t => <option key={t.label} value={t.label} className="bg-gray-900">{t.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Место проведения</label>
                  <input
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder="Усадьба Моррис, Подмосковье"
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Описание</label>
                  <textarea
                    value={form.desc}
                    onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
                    rows={3}
                    placeholder="Краткое описание события..."
                    className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 resize-none"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, upcoming: !f.upcoming }))}
                    className={`w-10 h-5 rounded-full transition-all relative ${form.upcoming ? 'bg-gradient-to-r from-blue-600 to-violet-600' : 'bg-white/20'}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${form.upcoming ? 'left-5' : 'left-0.5'}`} />
                  </button>
                  <span className="text-white/60 font-body text-sm">Предстоящее событие</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-medium rounded-xl hover:opacity-90"
                >
                  {editId ? 'Сохранить' : 'Добавить'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-5 py-3 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Подтверждение удаления */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-fade-in text-center">
            <div className="text-4xl mb-3">🗓️</div>
            <h3 className="font-body font-semibold text-white mb-2">Удалить событие?</h3>
            <p className="text-white/50 font-body text-sm mb-5">Это действие нельзя отменить</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 bg-red-500/80 text-white font-body text-sm rounded-xl hover:bg-red-500">Удалить</button>
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
