import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { useMembers, type Member } from '@/store/members';

interface EmployeeCabinetProps {
  onNavigate: (page: string) => void;
  memberId?: number;
}

const myEvents = [
  { title: 'Летний съезд 2026', date: '15 Июня 2026', status: 'upcoming' },
  { title: 'День основания', date: '12 Сентября 2026', status: 'upcoming' },
  { title: 'Зимнее собрание', date: '20 Декабря 2025', status: 'past' },
];

const genRoman: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III' };

export default function EmployeeCabinet({ onNavigate, memberId }: EmployeeCabinetProps) {
  const [members, setMembers] = useMembers();
  const [editMode, setEditMode] = useState(false);

  const member: Member | undefined = memberId
    ? members.find(m => m.id === memberId)
    : members.find(m => m.status === 'active') ?? members[0];

  const [form, setForm] = useState<Partial<Member>>({});

  if (!member) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 font-body">Профиль не найден</p>
          <button onClick={() => onNavigate('home')} className="mt-4 text-blue-400 font-body text-sm hover:underline">На главную</button>
        </div>
      </div>
    );
  }

  const openEdit = () => {
    setForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      avatar: member.avatar,
    });
    setEditMode(true);
  };

  const saveEdit = () => {
    setMembers(members.map(m => m.id === member.id ? { ...m, ...form } : m));
    setEditMode(false);
  };

  const avatarOptions = ['👤', '👩‍💼', '👨‍💼', '👩', '👨', '👵', '👴', '👩‍💻', '👨‍💻', '👷', '🧑‍🎨', '👩‍🏫'];

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
              {editMode ? (
                <>
                  <p className="text-white/50 font-body text-xs mb-2">Выберите аватар</p>
                  <div className="grid grid-cols-6 gap-1.5 mb-4">
                    {avatarOptions.map(av => (
                      <button
                        key={av}
                        onClick={() => setForm(f => ({ ...f, avatar: av }))}
                        className={`text-2xl p-1 rounded-lg transition-all ${form.avatar === av ? 'bg-violet-500/30 ring-1 ring-violet-400' : 'hover:bg-white/10'}`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-3 text-left">
                    <div>
                      <label className="block text-white/50 font-body text-xs mb-1">Имя</label>
                      <input
                        value={form.name ?? ''}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full glass rounded-lg px-3 py-2 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                      />
                    </div>
                    <div>
                      <label className="block text-white/50 font-body text-xs mb-1">Роль в семье</label>
                      <input
                        value={form.role ?? ''}
                        onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                        className="w-full glass rounded-lg px-3 py-2 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={saveEdit} className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90">Сохранить</button>
                    <button onClick={() => setEditMode(false)} className="flex-1 py-2 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-4xl">
                    {member.avatar || '👤'}
                  </div>
                  <h2 className="font-body font-semibold text-white text-lg">{member.name}</h2>
                  <p className="text-violet-400 font-body text-sm mb-1">{member.role}</p>
                  <p className="text-white/40 font-body text-xs mb-4">
                    {genRoman[member.generation] ?? member.generation} поколение
                  </p>
                  {member.warnings > 0 && (
                    <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-4">
                      <Icon name="AlertTriangle" size={13} className="text-yellow-400" />
                      <span className="text-yellow-400 font-body text-xs">
                        {member.warnings} действующий выговор
                      </span>
                    </div>
                  )}
                  <button
                    onClick={openEdit}
                    className="w-full py-2 bg-gradient-to-r from-blue-600/30 to-violet-600/30 border border-violet-500/30 rounded-lg text-violet-300 font-body text-sm hover:from-blue-600/50 hover:to-violet-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Icon name="Pencil" size={13} /> Редактировать профиль
                  </button>
                </>
              )}
            </div>

            {/* Bio card */}
            {!editMode && (
              <div className="glass gradient-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-body font-semibold text-white text-sm">О себе</h3>
                </div>
                {member.bio ? (
                  <p className="text-white/60 font-body text-sm leading-relaxed">{member.bio}</p>
                ) : (
                  <p className="text-white/25 font-body text-xs italic">Биография не заполнена</p>
                )}
              </div>
            )}

            {editMode && (
              <div className="glass gradient-border rounded-2xl p-5">
                <label className="block text-white/50 font-body text-xs mb-2">О себе</label>
                <textarea
                  rows={4}
                  value={form.bio ?? ''}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  placeholder="Расскажите о себе..."
                  className="w-full glass rounded-lg px-3 py-2 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 resize-none"
                />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="md:col-span-2 space-y-5">
            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Мои события</h3>
              <div className="space-y-3">
                {myEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-4 py-2">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${event.status === 'upcoming' ? 'bg-blue-400' : 'bg-white/20'}`} />
                    <div className="flex-1">
                      <span className="text-white font-body text-sm">{event.title}</span>
                    </div>
                    <span className={`font-body text-xs ${event.status === 'upcoming' ? 'text-blue-400' : 'text-white/30'}`}>
                      {event.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Состав семьи</h3>
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="flex -space-x-2">
                  {members.slice(0, 5).map(m => (
                    <div key={m.id} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 border-2 border-background flex items-center justify-center text-sm">
                      {m.avatar || '👤'}
                    </div>
                  ))}
                  {members.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-background flex items-center justify-center text-white/60 font-body text-xs">
                      +{members.length - 5}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-body text-sm font-medium">{members.length} участников</p>
                  <p className="text-white/40 font-body text-xs">{members.filter(m => m.status === 'active').length} активных</p>
                </div>
              </div>
            </div>

            <div className="glass gradient-border rounded-2xl p-6">
              <h3 className="font-body font-semibold text-white mb-4">Уведомления</h3>
              <div className="space-y-3">
                {[
                  { text: 'Летний съезд 2026 — подтвердите участие', type: 'info', time: '2 часа назад' },
                  { text: 'Новый документ в архиве семьи', type: 'update', time: '1 день назад' },
                  ...(member.warnings > 0 ? [{ text: `Выговор от лидера: ${member.warnings} шт.`, type: 'warning', time: 'Недавно' }] : []),
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
