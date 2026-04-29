import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { addApplication } from '@/store/applications';

interface ApplicationModalProps {
  onClose: () => void;
}

const emptyForm = {
  name: '',
  age: '',
  timezone: '',
  about: '',
  screenshotUrl: '',
  hoursPerDay: '',
  lookingFor: '',
  whyJoin: '',
  willChangeSurname: '' as 'yes' | 'no' | '',
  agreeRules: '' as 'yes' | 'no' | '',
  prevOrgs: '',
};

export default function ApplicationModal({ onClose }: ApplicationModalProps) {
  const [form, setForm] = useState(emptyForm);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [screenshotName, setScreenshotName] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof emptyForm, val: string) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => { const n = { ...e }; delete n[key]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Обязательное поле';
    if (!form.age.trim()) e.age = 'Укажите возраст';
    if (!form.timezone.trim()) e.timezone = 'Укажите часовой пояс';
    if (!form.about.trim()) e.about = 'Расскажите о себе';
    if (!form.hoursPerDay.trim()) e.hoursPerDay = 'Укажите время в игре';
    if (!form.lookingFor.trim()) e.lookingFor = 'Обязательное поле';
    if (!form.whyJoin.trim()) e.whyJoin = 'Обязательное поле';
    if (!form.willChangeSurname) e.willChangeSurname = 'Выберите ответ';
    if (!form.agreeRules) e.agreeRules = 'Выберите ответ';
    if (!form.prevOrgs.trim()) e.prevOrgs = 'Укажите или напишите «Нет»';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    addApplication(form);
    setStep('success');
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      set('screenshotUrl', ev.target?.result as string);
      setScreenshotName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const inputCls = (key: string) =>
    `w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none border transition-all ${
      errors[key] ? 'border-red-500/50 focus:ring-1 focus:ring-red-500' : 'border-white/10 focus:ring-1 focus:ring-violet-500'
    }`;

  const RadioGroup = ({ field, label }: { field: 'willChangeSurname' | 'agreeRules'; label: string }) => (
    <div>
      <label className="block text-white/70 font-body text-sm mb-2">{label}</label>
      <div className="flex gap-3">
        {[{ val: 'yes', txt: 'Да' }, { val: 'no', txt: 'Нет' }].map(opt => (
          <button
            key={opt.val}
            type="button"
            onClick={() => set(field, opt.val as 'yes' | 'no')}
            className={`flex-1 py-2.5 rounded-xl font-body text-sm border transition-all ${
              form[field] === opt.val
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-transparent'
                : 'glass border-white/10 text-white/60 hover:text-white/80'
            }`}
          >
            {opt.txt}
          </button>
        ))}
      </div>
      {errors[field] && <p className="text-red-400 font-body text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass gradient-border rounded-3xl shadow-2xl animate-fade-in">
        {step === 'success' ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-4xl">
              ✅
            </div>
            <h2 className="font-display text-3xl text-white mb-3">Заявка отправлена!</h2>
            <p className="text-white/50 font-body text-sm mb-8">
              Лидер семьи Morris рассмотрит вашу заявку и свяжется с вами. Обычно это занимает 1–3 дня.
            </p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-blue-400 font-body text-xs tracking-widest uppercase mb-1">Family Morris</p>
                <h2 className="font-display text-2xl text-white">Заявка на вступление</h2>
              </div>
              <button onClick={onClose} className="p-2 glass rounded-xl text-white/40 hover:text-white/70 transition-colors flex-shrink-0">
                <Icon name="X" size={18} />
              </button>
            </div>

            <div className="space-y-5">
              {/* Секция 1 */}
              <div className="glass rounded-2xl p-5 space-y-4 border border-white/5">
                <p className="text-violet-400 font-body text-xs tracking-wider uppercase font-semibold">Основная информация</p>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">1. Имя <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ваше имя в игре" className={inputCls('name')} />
                  {errors.name && <p className="text-red-400 font-body text-xs mt-1">{errors.name}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 font-body text-sm mb-2">2. Возраст <span className="text-red-400">*</span></label>
                    <input value={form.age} onChange={e => set('age', e.target.value)} placeholder="Например: 22" type="number" min="12" max="99" className={inputCls('age')} />
                    {errors.age && <p className="text-red-400 font-body text-xs mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="block text-white/70 font-body text-sm mb-2">3. Часовой пояс <span className="text-red-400">*</span></label>
                    <input value={form.timezone} onChange={e => set('timezone', e.target.value)} placeholder="Например: UTC+3 (Москва)" className={inputCls('timezone')} />
                    {errors.timezone && <p className="text-red-400 font-body text-xs mt-1">{errors.timezone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">4. Расскажите о себе <span className="text-red-400">*</span></label>
                  <textarea value={form.about} onChange={e => set('about', e.target.value)} rows={3} placeholder="Кто вы, чем занимаетесь, ваш игровой опыт..." className={inputCls('about') + ' resize-none'} />
                  {errors.about && <p className="text-red-400 font-body text-xs mt-1">{errors.about}</p>}
                </div>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">5. Скрин статистики (M → Статистика)</label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
                    className="glass rounded-xl border border-dashed border-white/20 hover:border-violet-500/50 p-5 text-center cursor-pointer transition-all"
                  >
                    {form.screenshotUrl ? (
                      <div>
                        <img src={form.screenshotUrl} alt="Скрин" className="max-h-32 mx-auto rounded-lg mb-2 object-contain" />
                        <p className="text-white/50 font-body text-xs">{screenshotName}</p>
                      </div>
                    ) : (
                      <>
                        <Icon name="ImagePlus" size={24} className="text-white/30 mx-auto mb-2" />
                        <p className="text-white/50 font-body text-sm">Нажмите или перетащите файл</p>
                        <p className="text-white/25 font-body text-xs mt-1">PNG, JPG до 10 МБ</p>
                      </>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
                </div>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">6. Сколько времени уделяете игре в день? <span className="text-red-400">*</span></label>
                  <input value={form.hoursPerDay} onChange={e => set('hoursPerDay', e.target.value)} placeholder="Например: 3-4 часа" className={inputCls('hoursPerDay')} />
                  {errors.hoursPerDay && <p className="text-red-400 font-body text-xs mt-1">{errors.hoursPerDay}</p>}
                </div>
              </div>

              {/* Секция 2 */}
              <div className="glass rounded-2xl p-5 space-y-4 border border-white/5">
                <p className="text-violet-400 font-body text-xs tracking-wider uppercase font-semibold">Дополнительная информация</p>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">7. Что вы ищете в организации? <span className="text-red-400">*</span></label>
                  <textarea value={form.lookingFor} onChange={e => set('lookingFor', e.target.value)} rows={2} placeholder="Общение, развитие, командная игра..." className={inputCls('lookingFor') + ' resize-none'} />
                  {errors.lookingFor && <p className="text-red-400 font-body text-xs mt-1">{errors.lookingFor}</p>}
                </div>

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">8. Почему решили вступить в семью Morris? <span className="text-red-400">*</span></label>
                  <textarea value={form.whyJoin} onChange={e => set('whyJoin', e.target.value)} rows={2} placeholder="Что привлекло вас именно в Family Morris?" className={inputCls('whyJoin') + ' resize-none'} />
                  {errors.whyJoin && <p className="text-red-400 font-body text-xs mt-1">{errors.whyJoin}</p>}
                </div>

                <RadioGroup field="willChangeSurname" label="9. Будет ли смена фамилии в течение 3-х дней? *" />

                <RadioGroup field="agreeRules" label="10. Согласны ли вы соблюдать правила организации? *" />

                <div>
                  <label className="block text-white/70 font-body text-sm mb-2">11. Состояли ранее в организациях? <span className="text-red-400">*</span></label>
                  <textarea value={form.prevOrgs} onChange={e => set('prevOrgs', e.target.value)} rows={2} placeholder="Если да — укажите названия. Если нет — напишите «Нет»" className={inputCls('prevOrgs') + ' resize-none'} />
                  {errors.prevOrgs && <p className="text-red-400 font-body text-xs mt-1">{errors.prevOrgs}</p>}
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <Icon name="AlertCircle" size={15} className="text-red-400 flex-shrink-0" />
                  <p className="text-red-400 font-body text-sm">Заполните все обязательные поля</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body font-semibold rounded-xl hover:opacity-90 transition-all hover:scale-[1.01] text-sm"
              >
                Отправить заявку
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
