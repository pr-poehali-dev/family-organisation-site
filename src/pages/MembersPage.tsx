import { useState } from 'react';
import { useMembers } from '@/store/members';
import ApplicationModal from '@/components/ApplicationModal';

const genLabel: Record<number, string> = { 1: 'I', 2: 'II', 3: 'III' };

export default function MembersPage() {
  const [members] = useMembers();
  const [genFilter, setGenFilter] = useState(0);
  const [showAppModal, setShowAppModal] = useState(false);

  const filtered = genFilter === 0
    ? members
    : members.filter(m => m.generation === genFilter);

  return (
    <>
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
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {[
            { label: `Все (${members.length})`, value: 0 },
            { label: 'I поколение', value: 1 },
            { label: 'II поколение', value: 2 },
            { label: 'III поколение', value: 3 },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setGenFilter(f.value)}
              className={`px-4 py-2 rounded-lg font-body text-sm transition-all ${
                genFilter === f.value
                  ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white'
                  : 'glass text-white/50 hover:text-white/80'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="glass gradient-border rounded-2xl p-16 text-center">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-white/40 font-body">Участников не найдено</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((member) => (
              <div key={member.id} className="glass gradient-border rounded-2xl p-6 glass-hover group cursor-pointer">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-violet-500/20 flex items-center justify-center text-3xl flex-shrink-0">
                    {member.avatar || '👤'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-body font-semibold text-white text-base leading-tight">
                        {member.name}
                      </h3>
                      {member.status === 'pending' && (
                        <span className="text-yellow-400 font-body text-xs">○ Ожидает</span>
                      )}
                    </div>
                    <p className="text-white/50 font-body text-sm">{member.role}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium text-white bg-gradient-to-r ${member.badgeColor}`}>
                      {member.badge}
                    </span>
                  </div>
                </div>
                {member.bio ? (
                  <p className="text-white/50 font-body text-sm leading-relaxed mb-4">{member.bio}</p>
                ) : (
                  <p className="text-white/25 font-body text-sm leading-relaxed mb-4 italic">Биография не заполнена</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-violet-400/60 font-body text-xs">
                    {genLabel[member.generation] || member.generation} поколение
                  </span>
                  <button className="text-xs text-blue-400 hover:text-blue-300 font-body transition-colors">
                    Подробнее →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 glass gradient-border rounded-2xl p-8 text-center">
          <div className="text-4xl mb-3">🤝</div>
          <h3 className="font-display text-2xl text-white mb-2">Хотите присоединиться?</h3>
          <p className="text-white/50 font-body text-sm mb-5">
            Новые члены принимаются по приглашению лидера семьи или действующего участника.
          </p>
          <button
            onClick={() => setShowAppModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Подать заявку
          </button>
        </div>
      </div>
    </div>

    {showAppModal && <ApplicationModal onClose={() => setShowAppModal(false)} />}
    </>
  );
}