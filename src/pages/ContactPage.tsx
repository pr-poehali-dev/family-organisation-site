import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-blue-400 font-body text-sm tracking-widest uppercase mb-3">Связаться</p>
          <h1 className="font-display text-6xl md:text-7xl text-white font-light mb-6">
            Написать <span className="gradient-text">нам</span>
          </h1>
          <p className="text-white/50 font-body text-lg max-w-xl mx-auto">
            Есть вопросы о семье Morris? Хотите вступить или узнать больше? Мы всегда на связи.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact info */}
          <div>
            <h2 className="font-display text-3xl text-white mb-8">Способы связи</h2>
            <div className="space-y-5">
              {[
                {
                  icon: 'Mail',
                  label: 'Email организации',
                  value: 'contact@family-morris.org',
                  sub: 'Ответим в течение 24 часов',
                },
                {
                  icon: 'Phone',
                  label: 'Телефон лидера',
                  value: '+7 (999) 123-45-67',
                  sub: 'Пн–Пт, 10:00–20:00',
                },
                {
                  icon: 'MapPin',
                  label: 'Основной адрес',
                  value: 'Москва, ул. Морриса, 1',
                  sub: 'Усадьба семьи',
                },
                {
                  icon: 'MessageCircle',
                  label: 'Telegram',
                  value: '@family_morris',
                  sub: 'Быстрая связь',
                },
              ].map((item, i) => (
                <div key={i} className="glass gradient-border rounded-xl p-4 flex items-center gap-4 glass-hover">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-violet-600/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon} fallback="Circle" size={18} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white/40 font-body text-xs mb-0.5">{item.label}</p>
                    <p className="text-white font-body text-sm font-medium">{item.value}</p>
                    <p className="text-white/30 font-body text-xs">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 glass gradient-border rounded-2xl p-6">
              <h3 className="font-display text-xl text-white mb-3">Социальные сети</h3>
              <div className="flex gap-3">
                {['VK', 'TG', 'YT'].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all font-body text-xs font-bold"
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display text-3xl text-white mb-8">Написать сообщение</h2>
            {sent ? (
              <div className="glass gradient-border rounded-2xl p-10 text-center animate-fade-in">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-display text-2xl text-white mb-2">Сообщение отправлено!</h3>
                <p className="text-white/50 font-body text-sm">
                  Мы свяжемся с вами в ближайшее время.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-5 text-blue-400 font-body text-sm hover:text-blue-300 transition-colors"
                >
                  Отправить ещё одно →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Ваше имя', key: 'name', type: 'text', placeholder: 'Иван Иванов' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'ivan@mail.ru' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-white/60 font-body text-sm mb-2">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-white/60 font-body text-sm mb-2">Сообщение</label>
                  <textarea
                    rows={5}
                    placeholder="Расскажите о себе или задайте вопрос..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-medium rounded-xl hover:opacity-90 transition-all hover:scale-[1.01]"
                >
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}