import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface LeaderCabinetProps {
  onNavigate: (page: string) => void;
}

const members = [
  { id: 1, name: 'Уильям Моррис', role: 'Патриарх', status: 'active', warnings: 0 },
  { id: 2, name: 'Элизабет Моррис', role: 'Матриарх', status: 'active', warnings: 0 },
  { id: 3, name: 'Джеймс Моррис', role: 'Лидер', status: 'active', warnings: 0 },
  { id: 4, name: 'Сара Моррис', role: 'Секретарь', status: 'active', warnings: 1 },
  { id: 5, name: 'Томас Моррис', role: 'Казначей', status: 'active', warnings: 0 },
  { id: 6, name: 'Оливия Моррис', role: 'Участник', status: 'pending', warnings: 0 },
];

export default function LeaderCabinet({ onNavigate }: LeaderCabinetProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [memberList, setMemberList] = useState(members);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '' });
  const [showWarningModal, setShowWarningModal] = useState<number | null>(null);
  const [warningText, setWarningText] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const addMember = () => {
    if (!newMember.name.trim()) return;
    setMemberList([...memberList, {
      id: memberList.length + 1,
      name: newMember.name,
      role: newMember.role || 'Участник',
      status: 'pending',
      warnings: 0,
    }]);
    setNewMember({ name: '', role: '' });
    setShowAddForm(false);
  };

  const removeMember = (id: number) => {
    setMemberList(memberList.filter(m => m.id !== id));
    setConfirmDelete(null);
  };

  const issueWarning = (id: number) => {
    setMemberList(memberList.map(m =>
      m.id === id ? { ...m, warnings: m.warnings + 1 } : m
    ));
    setShowWarningModal(null);
    setWarningText('');
  };

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'members', label: 'Состав', icon: 'Users' },
    { id: 'warnings', label: 'Выговора', icon: 'AlertTriangle' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <Icon name="Crown" size={18} className="text-white" />
              </div>
              <span className="text-yellow-400 font-body text-sm font-semibold tracking-wide uppercase">
                Кабинет лидера
              </span>
            </div>
            <h1 className="font-display text-4xl text-white">Джеймс Моррис</h1>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="glass px-4 py-2 rounded-lg text-white/60 font-body text-sm hover:text-white/80 transition-colors flex items-center gap-2"
          >
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 glass rounded-xl p-1.5 w-fit">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              <Icon name={tab.icon as Parameters<typeof Icon>[0]['name']} fallback="Circle" size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Всего участников', value: memberList.length, color: 'from-blue-500 to-cyan-500', icon: 'Users' },
                { label: 'Активных', value: memberList.filter(m => m.status === 'active').length, color: 'from-green-500 to-emerald-500', icon: 'CheckCircle' },
                { label: 'На рассмотрении', value: memberList.filter(m => m.status === 'pending').length, color: 'from-yellow-500 to-orange-500', icon: 'Clock' },
                { label: 'Выговоров', value: memberList.reduce((a, m) => a + m.warnings, 0), color: 'from-red-500 to-rose-600', icon: 'AlertTriangle' },
              ].map((stat, i) => (
                <div key={i} className="glass gradient-border rounded-2xl p-5">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-3`}>
                    <Icon name={stat.icon as Parameters<typeof Icon>[0]['name']} fallback="Circle" size={18} className="text-white" />
                  </div>
                  <div className="font-display text-3xl gradient-text font-semibold">{stat.value}</div>
                  <div className="text-white/50 font-body text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass gradient-border rounded-2xl p-6">
                <h3 className="font-body font-semibold text-white mb-4">Последние действия</h3>
                <div className="space-y-3">
                  {[
                    { text: 'Оливия Моррис запросила вступление', time: '2 часа назад', color: 'bg-blue-500' },
                    { text: 'Сара Моррис получила выговор', time: 'Вчера', color: 'bg-yellow-500' },
                    { text: 'Добавлено событие: Летний съезд', time: '3 дня назад', color: 'bg-green-500' },
                  ].map((action, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${action.color} flex-shrink-0`} />
                      <span className="text-white/70 font-body text-sm flex-1">{action.text}</span>
                      <span className="text-white/30 font-body text-xs">{action.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass gradient-border rounded-2xl p-6">
                <h3 className="font-body font-semibold text-white mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => { setActiveTab('members'); setShowAddForm(true); }}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity text-left flex items-center gap-3"
                  >
                    <Icon name="UserPlus" size={16} />
                    Добавить участника
                  </button>
                  <button
                    onClick={() => setActiveTab('warnings')}
                    className="w-full py-2.5 px-4 glass text-white/70 font-body text-sm rounded-lg hover:bg-white/10 transition-all text-left flex items-center gap-3"
                  >
                    <Icon name="AlertTriangle" size={16} />
                    Выдать выговор
                  </button>
                  <button
                    onClick={() => onNavigate('events')}
                    className="w-full py-2.5 px-4 glass text-white/70 font-body text-sm rounded-lg hover:bg-white/10 transition-all text-left flex items-center gap-3"
                  >
                    <Icon name="Calendar" size={16} />
                    Создать событие
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members tab */}
        {activeTab === 'members' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-white">Управление составом</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity"
              >
                <Icon name="UserPlus" size={14} />
                Добавить
              </button>
            </div>

            {showAddForm && (
              <div className="glass gradient-border rounded-2xl p-6 mb-6 animate-fade-in">
                <h3 className="font-body font-semibold text-white mb-4">Новый участник</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <input
                    placeholder="Имя участника"
                    value={newMember.name}
                    onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                    className="glass rounded-lg px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                  <input
                    placeholder="Роль (необязательно)"
                    value={newMember.role}
                    onChange={e => setNewMember({ ...newMember, role: e.target.value })}
                    className="glass rounded-lg px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={addMember} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90">
                    Добавить
                  </button>
                  <button onClick={() => setShowAddForm(false)} className="px-5 py-2 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">
                    Отмена
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {memberList.map(member => (
                <div key={member.id} className="glass gradient-border rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-body font-medium text-sm">{member.name}</span>
                      <span className="text-white/40 font-body text-xs">{member.role}</span>
                      {member.warnings > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/20">
                          ⚠️ {member.warnings} выговор
                        </span>
                      )}
                    </div>
                    <span className={`text-xs font-body ${member.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {member.status === 'active' ? '● Активен' : '○ На рассмотрении'}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setShowWarningModal(member.id)}
                      className="p-2 glass rounded-lg text-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all"
                      title="Выдать выговор"
                    >
                      <Icon name="AlertTriangle" size={14} />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(member.id)}
                      className="p-2 glass rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      title="Удалить участника"
                    >
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warnings tab */}
        {activeTab === 'warnings' && (
          <div className="animate-fade-in">
            <h2 className="font-display text-2xl text-white mb-6">Журнал выговоров</h2>
            <div className="space-y-3">
              {memberList.filter(m => m.warnings > 0).map(member => (
                <div key={member.id} className="glass gradient-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-white font-body font-medium text-sm block">{member.name}</span>
                        <span className="text-white/40 font-body text-xs">{member.role}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400 border border-red-500/20 font-body">
                      {member.warnings} выговор{member.warnings > 1 ? 'а' : ''}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowWarningModal(member.id)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-body transition-colors"
                  >
                    + Добавить выговор
                  </button>
                </div>
              ))}
              {memberList.filter(m => m.warnings > 0).length === 0 && (
                <div className="text-center py-16 text-white/30 font-body">
                  <div className="text-5xl mb-3">✅</div>
                  <p>Выговоров нет — всё хорошо!</p>
                </div>
              )}
              <div className="glass gradient-border rounded-xl p-5">
                <p className="text-white/50 font-body text-sm mb-3">Выдать выговор участнику:</p>
                <div className="flex flex-wrap gap-2">
                  {memberList.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setShowWarningModal(m.id)}
                      className="px-3 py-1.5 glass rounded-lg text-white/60 font-body text-xs hover:text-white hover:bg-white/10 transition-all"
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Warning Modal */}
      {showWarningModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowWarningModal(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <h3 className="font-display text-2xl text-white mb-2">Выдать выговор</h3>
            <p className="text-white/50 font-body text-sm mb-4">
              {memberList.find(m => m.id === showWarningModal)?.name}
            </p>
            <textarea
              rows={4}
              placeholder="Причина выговора..."
              value={warningText}
              onChange={e => setWarningText(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 border border-white/10 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => issueWarning(showWarningModal)}
                className="flex-1 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-body text-sm rounded-lg hover:opacity-90"
              >
                Выдать выговор
              </button>
              <button
                onClick={() => setShowWarningModal(null)}
                className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-scale-in">
            <div className="text-4xl mb-3 text-center">⚠️</div>
            <h3 className="font-display text-2xl text-white text-center mb-2">Удалить участника?</h3>
            <p className="text-white/50 font-body text-sm text-center mb-5">
              {memberList.find(m => m.id === confirmDelete)?.name} будет исключён из семьи.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => removeMember(confirmDelete)}
                className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-body text-sm rounded-lg hover:opacity-90"
              >
                Удалить
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
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
