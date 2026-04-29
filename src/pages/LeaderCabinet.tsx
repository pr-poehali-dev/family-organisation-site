import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useMembers } from '@/store/members';
import { useApplications, updateApplicationStatus, type Application } from '@/store/applications';

type Photo = {
  id: number;
  url: string;
  caption: string;
  author: string;
  album: string;
  date: string;
};

const initialPhotos: Photo[] = [
  { id: 1, url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/4d4df31c-9bea-4f48-866a-1babd297fe5b.jpg', caption: 'Летний съезд 2024', author: 'Джеймс Моррис', album: 'Летний съезд 2024', date: 'Июнь 2024' },
  { id: 2, url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/0abf9031-de7d-434d-9fae-95c7600b180b.jpg', caption: 'Семейное древо Morris', author: 'Сара Моррис', album: 'Архив Morris', date: '2023' },
  { id: 3, url: 'https://cdn.poehali.dev/projects/163c87f7-5b8d-46b0-a849-f811b2313afb/files/f4fa4f66-3b0c-45d9-8ab9-a1591366224f.jpg', caption: 'Герб семьи Morris', author: 'Уильям Моррис', album: 'Архив Morris', date: '1987' },
];

const photoAlbums = ['Летний съезд 2024', 'День основания', 'Зимнее собрание', 'Семейный пикник', 'Архив Morris', 'Портреты семьи'];
const emptyPhotoForm = { caption: '', author: '', album: photoAlbums[0] };

interface LeaderCabinetProps {
  onNavigate: (page: string) => void;
}



type CarStatus = 'available' | 'in-use' | 'reserved';
type Car = {
  id: number;
  name: string;
  year: string;
  plate: string;
  color: string;
  owner: string;
  status: CarStatus;
  tag: string;
};

const initialCars: Car[] = [
  { id: 1, name: 'Mercedes-Benz S-Class', year: '2023', plate: 'M 001 OR', color: 'Obsidian Black', owner: 'Джеймс Моррис', status: 'available', tag: 'Лидер' },
  { id: 2, name: 'Range Rover Autobiography', year: '2022', plate: 'M 002 OR', color: 'Fuji White', owner: 'Уильям Моррис', status: 'available', tag: 'Патриарх' },
  { id: 3, name: 'BMW 7 Series', year: '2021', plate: 'M 003 OR', color: 'Mineral White', owner: 'Томас Моррис', status: 'in-use', tag: 'Казначей' },
  { id: 4, name: 'Porsche Cayenne', year: '2023', plate: 'M 004 OR', color: 'Night Blue', owner: 'Семья Morris', status: 'available', tag: 'Общий' },
  { id: 5, name: 'Tesla Model S', year: '2024', plate: 'M 005 OR', color: 'Midnight Silver', owner: 'Оливия Моррис', status: 'available', tag: 'Участник' },
  { id: 6, name: 'Rolls-Royce Ghost', year: '2020', plate: 'M 006 OR', color: 'Seashell', owner: 'Архив Morris', status: 'reserved', tag: 'Исторический' },
];

const statusLabels: Record<CarStatus, { label: string; color: string; dot: string }> = {
  available: { label: 'Свободен', color: 'text-green-400', dot: 'bg-green-400' },
  'in-use': { label: 'В использовании', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  reserved: { label: 'Зарезервирован', color: 'text-violet-400', dot: 'bg-violet-400' },
};

const emptyCarForm = { name: '', year: '', plate: '', color: '', owner: '', status: 'available' as CarStatus, tag: '' };

export default function LeaderCabinet({ onNavigate }: LeaderCabinetProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Members — общий стор
  const [memberList, setMemberList] = useMembers();
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', role: '', password: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showMemberPassword, setShowMemberPassword] = useState<number | null>(null);
  const [showWarningModal, setShowWarningModal] = useState<number | null>(null);
  const [warningText, setWarningText] = useState('');
  const [confirmDeleteMember, setConfirmDeleteMember] = useState<number | null>(null);

  // Cars
  const [carList, setCarList] = useState<Car[]>(initialCars);
  const [showAddCar, setShowAddCar] = useState(false);
  const [carForm, setCarForm] = useState(emptyCarForm);
  const [confirmDeleteCar, setConfirmDeleteCar] = useState<number | null>(null);
  const [editStatusCar, setEditStatusCar] = useState<number | null>(null);

  // Member actions
  const addMember = () => {
    if (!newMember.name.trim()) return;
    setMemberList([...memberList, {
      id: Date.now(),
      name: newMember.name,
      role: newMember.role || 'Участник',
      status: 'pending',
      warnings: 0,
      password: newMember.password,
      generation: 3,
      bio: '',
      avatar: '👤',
      badge: 'Участник',
      badgeColor: 'from-blue-500 to-violet-600',
    }]);
    setNewMember({ name: '', role: '', password: '' });
    setShowNewPassword(false);
    setShowAddMember(false);
  };
  const removeMember = (id: number) => { setMemberList(memberList.filter(m => m.id !== id)); setConfirmDeleteMember(null); };
  const issueWarning = (id: number) => { setMemberList(memberList.map(m => m.id === id ? { ...m, warnings: m.warnings + 1 } : m)); setShowWarningModal(null); setWarningText(''); };

  // Photos
  const [photoList, setPhotoList] = useState<Photo[]>(initialPhotos);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [photoForm, setPhotoForm] = useState(emptyPhotoForm);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFileName, setPhotoFileName] = useState('');
  const [photoDragOver, setPhotoDragOver] = useState(false);
  const [photoLightbox, setPhotoLightbox] = useState<Photo | null>(null);
  const [confirmDeletePhoto, setConfirmDeletePhoto] = useState<number | null>(null);
  const photoFileRef = useRef<HTMLInputElement>(null);

  const handlePhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setPhotoFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };
  const addPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoPreview) return;
    setPhotoList([{ id: Date.now(), url: photoPreview, caption: photoForm.caption || photoFileName || 'Без названия', author: photoForm.author || 'Лидер', album: photoForm.album, date: new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }) }, ...photoList]);
    setPhotoPreview(null); setPhotoFileName(''); setPhotoForm(emptyPhotoForm); setShowAddPhoto(false);
  };
  const deletePhoto = (id: number) => { setPhotoList(photoList.filter(p => p.id !== id)); setConfirmDeletePhoto(null); if (photoLightbox?.id === id) setPhotoLightbox(null); };

  // Car actions
  const addCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carForm.name.trim() || !carForm.plate.trim()) return;
    setCarList([...carList, { id: Date.now(), name: carForm.name, year: carForm.year || new Date().getFullYear().toString(), plate: carForm.plate, color: carForm.color || 'Не указан', owner: carForm.owner || 'Семья Morris', status: carForm.status, tag: carForm.tag || 'Общий' }]);
    setCarForm(emptyCarForm);
    setShowAddCar(false);
  };
  const removeCar = (id: number) => { setCarList(carList.filter(c => c.id !== id)); setConfirmDeleteCar(null); };
  const changeCarStatus = (id: number, status: CarStatus) => { setCarList(carList.map(c => c.id === id ? { ...c, status } : c)); setEditStatusCar(null); };

  const [applications, reloadApps] = useApplications();
  const [viewApp, setViewApp] = useState<Application | null>(null);

  const approveApp = (app: Application) => {
    updateApplicationStatus(app.id, 'approved');
    setMemberList([...memberList, {
      id: Date.now(),
      name: app.name,
      role: 'Участник',
      status: 'active',
      warnings: 0,
      password: '',
      generation: 3,
      bio: app.about,
      avatar: '👤',
      badge: 'Участник',
      badgeColor: 'from-blue-500 to-violet-600',
    }]);
    reloadApps();
    setViewApp(null);
  };

  const rejectApp = (id: number) => {
    updateApplicationStatus(id, 'rejected');
    reloadApps();
    setViewApp(null);
  };

  const pendingCount = applications.filter(a => a.status === 'pending').length;

  const tabs = [
    { id: 'overview', label: 'Обзор', icon: 'LayoutDashboard' },
    { id: 'members', label: 'Состав', icon: 'Users' },
    { id: 'applications', label: 'Заявки', icon: 'ClipboardList', badge: pendingCount },
    { id: 'garage', label: 'Автопарк', icon: 'Car' },
    { id: 'photos', label: 'Фотоархив', icon: 'Image' },
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
              <span className="text-yellow-400 font-body text-sm font-semibold tracking-wide uppercase">Кабинет лидера</span>
            </div>
            <h1 className="font-display text-4xl text-white">Джеймс Моррис</h1>
          </div>
          <button onClick={() => onNavigate('home')} className="glass px-4 py-2 rounded-lg text-white/60 font-body text-sm hover:text-white/80 transition-colors flex items-center gap-2">
            <Icon name="LogOut" size={14} />
            Выйти
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 glass rounded-xl p-1.5 w-fit">
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
              {'badge' in tab && tab.badge > 0 && (
                <span className="ml-0.5 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-xs leading-none font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
              {[
                { label: 'Участников', value: memberList.length, color: 'from-blue-500 to-cyan-500', icon: 'Users' },
                { label: 'Активных', value: memberList.filter(m => m.status === 'active').length, color: 'from-green-500 to-emerald-500', icon: 'CheckCircle' },
                { label: 'Автомобилей', value: carList.length, color: 'from-violet-500 to-purple-600', icon: 'Car' },
                { label: 'Фотографий', value: photoList.length, color: 'from-pink-500 to-rose-500', icon: 'Image' },
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
                    { text: 'Оливия Моррис запросила вступление', time: '2 ч. назад', color: 'bg-blue-500' },
                    { text: 'Сара Моррис получила выговор', time: 'Вчера', color: 'bg-yellow-500' },
                    { text: 'Добавлено событие: Летний съезд', time: '3 дня назад', color: 'bg-green-500' },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${a.color} flex-shrink-0`} />
                      <span className="text-white/70 font-body text-sm flex-1">{a.text}</span>
                      <span className="text-white/30 font-body text-xs">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass gradient-border rounded-2xl p-6">
                <h3 className="font-body font-semibold text-white mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  <button onClick={() => { setActiveTab('members'); setShowAddMember(true); }} className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity text-left flex items-center gap-3">
                    <Icon name="UserPlus" size={16} /> Добавить участника
                  </button>
                  <button onClick={() => { setActiveTab('garage'); setShowAddCar(true); }} className="w-full py-2.5 px-4 glass text-white/70 font-body text-sm rounded-lg hover:bg-white/10 transition-all text-left flex items-center gap-3">
                    <Icon name="Car" size={16} /> Добавить автомобиль
                  </button>
                  <button onClick={() => { setActiveTab('photos'); setShowAddPhoto(true); }} className="w-full py-2.5 px-4 glass text-white/70 font-body text-sm rounded-lg hover:bg-white/10 transition-all text-left flex items-center gap-3">
                    <Icon name="ImagePlus" size={16} /> Добавить фото
                  </button>
                  <button onClick={() => setActiveTab('warnings')} className="w-full py-2.5 px-4 glass text-white/70 font-body text-sm rounded-lg hover:bg-white/10 transition-all text-left flex items-center gap-3">
                    <Icon name="AlertTriangle" size={16} /> Выдать выговор
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── MEMBERS ── */}
        {activeTab === 'members' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl text-white">Управление составом</h2>
              <button onClick={() => setShowAddMember(!showAddMember)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity">
                <Icon name="UserPlus" size={14} /> Добавить
              </button>
            </div>
            {showAddMember && (
              <div className="glass gradient-border rounded-2xl p-6 mb-6 animate-fade-in">
                <h3 className="font-body font-semibold text-white mb-4">Новый участник</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <input placeholder="Имя участника" value={newMember.name} onChange={e => setNewMember({ ...newMember, name: e.target.value })} className="glass rounded-lg px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                  <input placeholder="Роль (необязательно)" value={newMember.role} onChange={e => setNewMember({ ...newMember, role: e.target.value })} className="glass rounded-lg px-4 py-2.5 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div className="mb-4">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Пароль для входа</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      placeholder="Придумайте пароль участнику"
                      value={newMember.password}
                      onChange={e => setNewMember({ ...newMember, password: e.target.value })}
                      className="w-full glass rounded-lg px-4 py-2.5 pr-11 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      <Icon name={showNewPassword ? 'EyeOff' : 'Eye'} size={15} />
                    </button>
                  </div>
                  {newMember.password && (
                    <p className="text-white/30 font-body text-xs mt-1.5 flex items-center gap-1">
                      <Icon name="Shield" size={11} /> Пароль будет сохранён для этого участника
                    </p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={addMember} className="px-5 py-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90">Добавить</button>
                  <button onClick={() => { setShowAddMember(false); setShowNewPassword(false); }} className="px-5 py-2 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {memberList.map(member => (
                <div key={member.id} className="glass gradient-border rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{member.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-body font-medium text-sm">{member.name}</span>
                      <span className="text-white/40 font-body text-xs">{member.role}</span>
                      {member.warnings > 0 && <span className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400 border border-red-500/20">⚠️ {member.warnings} выговор</span>}
                    </div>
                    <span className={`text-xs font-body ${member.status === 'active' ? 'text-green-400' : 'text-yellow-400'}`}>{member.status === 'active' ? '● Активен' : '○ На рассмотрении'}</span>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 items-center">
                    {member.password ? (
                      <div className="relative group/pw">
                        <button
                          onClick={() => setShowMemberPassword(showMemberPassword === member.id ? null : member.id)}
                          className="p-2 glass rounded-lg text-violet-400/60 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                          title="Пароль"
                        >
                          <Icon name="KeyRound" size={14} />
                        </button>
                        {showMemberPassword === member.id && (
                          <div className="absolute right-0 top-10 z-20 glass gradient-border rounded-xl px-4 py-3 min-w-[180px] animate-scale-in shadow-xl">
                            <p className="text-white/40 font-body text-xs mb-1">Пароль участника</p>
                            <p className="text-white font-body text-sm font-mono tracking-wider">{member.password}</p>
                            <button onClick={() => setShowMemberPassword(null)} className="mt-2 text-white/30 font-body text-xs hover:text-white/60">Скрыть</button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="p-2 rounded-lg text-white/15" title="Пароль не задан">
                        <Icon name="KeyRound" size={14} />
                      </div>
                    )}
                    {member.status === 'pending' && (
                      <button
                        onClick={() => setMemberList(memberList.map(m => m.id === member.id ? { ...m, status: 'active' } : m))}
                        className="p-2 glass rounded-lg text-green-400/60 hover:text-green-400 hover:bg-green-500/10 transition-all"
                        title="Одобрить"
                      >
                        <Icon name="CheckCircle" size={14} />
                      </button>
                    )}
                    <button onClick={() => setShowWarningModal(member.id)} className="p-2 glass rounded-lg text-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all" title="Выговор"><Icon name="AlertTriangle" size={14} /></button>
                    <button onClick={() => setConfirmDeleteMember(member.id)} className="p-2 glass rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all" title="Удалить"><Icon name="Trash2" size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── APPLICATIONS ── */}
        {activeTab === 'applications' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white">Заявки на вступление</h2>
                <p className="text-white/40 font-body text-xs mt-1">
                  {applications.filter(a => a.status === 'pending').length} новых · {applications.length} всего
                </p>
              </div>
            </div>

            {applications.length === 0 ? (
              <div className="glass gradient-border rounded-2xl p-16 text-center">
                <div className="text-5xl mb-3">📋</div>
                <p className="text-white/40 font-body">Заявок пока нет</p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className="glass gradient-border rounded-xl p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {app.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-body font-medium text-sm">{app.name}</span>
                        <span className="text-white/40 font-body text-xs">{app.age} лет · {app.timezone}</span>
                      </div>
                      <span className={`text-xs font-body ${
                        app.status === 'pending' ? 'text-yellow-400' :
                        app.status === 'approved' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {app.status === 'pending' ? '○ На рассмотрении' : app.status === 'approved' ? '● Одобрена' : '✕ Отклонена'}
                      </span>
                      <span className="text-white/20 font-body text-xs ml-2">{app.createdAt}</span>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => setViewApp(app)}
                        className="p-2 glass rounded-lg text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                        title="Просмотр"
                      >
                        <Icon name="Eye" size={14} />
                      </button>
                      {app.status === 'pending' && (
                        <>
                          <button
                            onClick={() => approveApp(app)}
                            className="p-2 glass rounded-lg text-green-400/60 hover:text-green-400 hover:bg-green-500/10 transition-all"
                            title="Одобрить"
                          >
                            <Icon name="Check" size={14} />
                          </button>
                          <button
                            onClick={() => rejectApp(app.id)}
                            className="p-2 glass rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Отклонить"
                          >
                            <Icon name="X" size={14} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Просмотр заявки */}
            {viewApp && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setViewApp(null)} />
                <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto glass gradient-border rounded-3xl p-6 animate-fade-in">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-display text-xl text-white">Заявка: {viewApp.name}</h3>
                      <p className="text-white/40 font-body text-xs">{viewApp.createdAt}</p>
                    </div>
                    <button onClick={() => setViewApp(null)} className="p-2 glass rounded-xl text-white/40 hover:text-white/70 transition-colors">
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  <div className="space-y-3 text-sm font-body">
                    {[
                      { label: 'Возраст', val: viewApp.age },
                      { label: 'Часовой пояс', val: viewApp.timezone },
                      { label: 'Время в игре / день', val: viewApp.hoursPerDay },
                      { label: 'О себе', val: viewApp.about },
                      { label: 'Что ищет в организации', val: viewApp.lookingFor },
                      { label: 'Почему Family Morris', val: viewApp.whyJoin },
                      { label: 'Смена фамилии в 3 дня', val: viewApp.willChangeSurname === 'yes' ? 'Да' : 'Нет' },
                      { label: 'Согласен с правилами', val: viewApp.agreeRules === 'yes' ? 'Да' : 'Нет' },
                      { label: 'Прошлые организации', val: viewApp.prevOrgs },
                    ].map((row, i) => (
                      <div key={i} className="flex gap-3 py-2 border-b border-white/5 last:border-0">
                        <span className="text-white/40 w-40 flex-shrink-0">{row.label}</span>
                        <span className="text-white/80">{row.val}</span>
                      </div>
                    ))}
                    {viewApp.screenshotUrl && (
                      <div className="pt-2">
                        <p className="text-white/40 mb-2">Скрин статистики</p>
                        <img src={viewApp.screenshotUrl} alt="Статистика" className="w-full rounded-xl object-contain max-h-60" />
                      </div>
                    )}
                  </div>
                  {viewApp.status === 'pending' && (
                    <div className="flex gap-3 mt-5">
                      <button onClick={() => approveApp(viewApp)} className="flex-1 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-body text-sm rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                        <Icon name="Check" size={14} /> Одобрить
                      </button>
                      <button onClick={() => rejectApp(viewApp.id)} className="flex-1 py-2.5 glass text-red-400 border border-red-500/30 font-body text-sm rounded-xl hover:bg-red-500/10 flex items-center justify-center gap-2">
                        <Icon name="X" size={14} /> Отклонить
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── GARAGE ── */}
        {activeTab === 'garage' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white">Управление автопарком</h2>
                <p className="text-white/40 font-body text-xs mt-1">{carList.length} авто · {carList.filter(c => c.status === 'available').length} свободно</p>
              </div>
              <button onClick={() => setShowAddCar(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity">
                <Icon name="Plus" size={14} /> Добавить авто
              </button>
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { value: carList.filter(c => c.status === 'available').length, label: 'Свободно', dot: 'bg-green-400' },
                { value: carList.filter(c => c.status === 'in-use').length, label: 'В использовании', dot: 'bg-yellow-400' },
                { value: carList.filter(c => c.status === 'reserved').length, label: 'Зарезервировано', dot: 'bg-violet-400' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    <span className="font-display text-2xl gradient-text font-semibold">{s.value}</span>
                  </div>
                  <p className="text-white/30 font-body text-xs">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {carList.map(car => (
                <div key={car.id} className="glass gradient-border rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-600/15 border border-white/10 flex items-center justify-center text-2xl flex-shrink-0">
                      🚗
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-white font-body font-medium text-sm">{car.name}</span>
                        <span className="font-body text-xs font-semibold text-white/50 bg-white/8 px-2 py-0.5 rounded tracking-wider">{car.plate}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white/40 font-body text-xs">{car.year} · {car.color}</span>
                        <span className="text-white/30 font-body text-xs">👤 {car.owner}</span>
                      </div>
                    </div>

                    {/* Status selector */}
                    <div className="flex-shrink-0">
                      {editStatusCar === car.id ? (
                        <div className="flex gap-1.5">
                          {(['available', 'in-use', 'reserved'] as CarStatus[]).map(s => (
                            <button
                              key={s}
                              onClick={() => changeCarStatus(car.id, s)}
                              className={`p-1.5 rounded-lg transition-all ${car.status === s ? 'bg-white/15' : 'glass hover:bg-white/10'}`}
                              title={statusLabels[s].label}
                            >
                              <div className={`w-2.5 h-2.5 rounded-full ${statusLabels[s].dot}`} />
                            </button>
                          ))}
                          <button onClick={() => setEditStatusCar(null)} className="p-1.5 glass rounded-lg text-white/30 hover:text-white/60">
                            <Icon name="X" size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditStatusCar(car.id)}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-lg hover:bg-white/10 transition-all"
                          title="Изменить статус"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full ${statusLabels[car.status].dot}`} />
                          <span className={`font-body text-xs ${statusLabels[car.status].color}`}>{statusLabels[car.status].label}</span>
                        </button>
                      )}
                    </div>

                    <button onClick={() => setConfirmDeleteCar(car.id)} className="p-2 glass rounded-lg text-red-400/50 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PHOTOS ── */}
        {activeTab === 'photos' && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl text-white">Фотоархив</h2>
                <p className="text-white/40 font-body text-xs mt-1">{photoList.length} фотографий в архиве</p>
              </div>
              <button onClick={() => setShowAddPhoto(true)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm rounded-lg hover:opacity-90 transition-opacity">
                <Icon name="ImagePlus" size={14} /> Добавить фото
              </button>
            </div>

            {photoList.length === 0 ? (
              <div className="glass gradient-border rounded-2xl p-16 text-center">
                <div className="text-5xl mb-3">📷</div>
                <p className="text-white/40 font-body">Фотографий пока нет</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {photoList.map(photo => (
                  <div key={photo.id} className="relative group rounded-2xl overflow-hidden aspect-square cursor-pointer" onClick={() => setPhotoLightbox(photo)}>
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white font-body text-sm font-medium leading-tight truncate">{photo.caption}</p>
                      <p className="text-white/60 font-body text-xs mt-0.5">{photo.album} · {photo.date}</p>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); setConfirmDeletePhoto(photo.id); }}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/40"
                    >
                      <Icon name="Trash2" size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Album summary */}
            <div className="glass gradient-border rounded-xl p-5">
              <h3 className="font-body font-semibold text-white text-sm mb-3">По альбомам</h3>
              <div className="flex flex-wrap gap-2">
                {photoAlbums.map(album => {
                  const count = photoList.filter(p => p.album === album).length;
                  return (
                    <div key={album} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg">
                      <span className="text-white/70 font-body text-xs">{album}</span>
                      <span className="text-violet-400 font-body text-xs font-semibold">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── WARNINGS ── */}
        {activeTab === 'warnings' && (
          <div className="animate-fade-in">
            <h2 className="font-display text-2xl text-white mb-6">Журнал выговоров</h2>
            <div className="space-y-3">
              {memberList.filter(m => m.warnings > 0).map(member => (
                <div key={member.id} className="glass gradient-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">{member.name.charAt(0)}</div>
                      <div>
                        <span className="text-white font-body font-medium text-sm block">{member.name}</span>
                        <span className="text-white/40 font-body text-xs">{member.role}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400 border border-red-500/20 font-body">{member.warnings} выговор{member.warnings > 1 ? 'а' : ''}</span>
                  </div>
                  <button onClick={() => setShowWarningModal(member.id)} className="text-sm text-blue-400 hover:text-blue-300 font-body transition-colors">+ Добавить выговор</button>
                </div>
              ))}
              {memberList.filter(m => m.warnings > 0).length === 0 && (
                <div className="text-center py-16 text-white/30 font-body"><div className="text-5xl mb-3">✅</div><p>Выговоров нет — всё хорошо!</p></div>
              )}
              <div className="glass gradient-border rounded-xl p-5">
                <p className="text-white/50 font-body text-sm mb-3">Выдать выговор участнику:</p>
                <div className="flex flex-wrap gap-2">
                  {memberList.map(m => (
                    <button key={m.id} onClick={() => setShowWarningModal(m.id)} className="px-3 py-1.5 glass rounded-lg text-white/60 font-body text-xs hover:text-white hover:bg-white/10 transition-all">{m.name}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── WARNING MODAL ── */}
      {showWarningModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowWarningModal(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-md animate-scale-in">
            <h3 className="font-display text-2xl text-white mb-2">Выдать выговор</h3>
            <p className="text-white/50 font-body text-sm mb-4">{memberList.find(m => m.id === showWarningModal)?.name}</p>
            <textarea rows={4} placeholder="Причина выговора..." value={warningText} onChange={e => setWarningText(e.target.value)} className="w-full glass rounded-xl px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 border border-white/10 resize-none mb-4" />
            <div className="flex gap-3">
              <button onClick={() => issueWarning(showWarningModal)} className="flex-1 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-body text-sm rounded-lg hover:opacity-90">Выдать выговор</button>
              <button onClick={() => setShowWarningModal(null)} className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE MEMBER MODAL ── */}
      {confirmDeleteMember !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeleteMember(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-scale-in text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <h3 className="font-display text-2xl text-white mb-2">Удалить участника?</h3>
            <p className="text-white/50 font-body text-sm mb-5">{memberList.find(m => m.id === confirmDeleteMember)?.name} будет исключён из семьи.</p>
            <div className="flex gap-3">
              <button onClick={() => removeMember(confirmDeleteMember)} className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-body text-sm rounded-lg hover:opacity-90">Удалить</button>
              <button onClick={() => setConfirmDeleteMember(null)} className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD CAR MODAL ── */}
      {showAddCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddCar(false)} />
          <div className="relative glass gradient-border rounded-2xl p-7 w-full max-w-lg animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-2xl text-white">Добавить автомобиль</h3>
                <p className="text-white/40 font-body text-xs mt-0.5">Реестр семьи Morris</p>
              </div>
              <button onClick={() => setShowAddCar(false)} className="text-white/30 hover:text-white/60 transition-colors"><Icon name="X" size={18} /></button>
            </div>
            <form onSubmit={addCar} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Марка и модель *</label>
                  <input required placeholder="BMW 7 Series" value={carForm.name} onChange={e => setCarForm({ ...carForm, name: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Год выпуска</label>
                  <input placeholder="2024" value={carForm.year} onChange={e => setCarForm({ ...carForm, year: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Гос. номер *</label>
                  <input required placeholder="M 007 OR" value={carForm.plate} onChange={e => setCarForm({ ...carForm, plate: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Цвет</label>
                  <input placeholder="Midnight Black" value={carForm.color} onChange={e => setCarForm({ ...carForm, color: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Владелец</label>
                  <input placeholder="Джеймс Моррис" value={carForm.owner} onChange={e => setCarForm({ ...carForm, owner: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Категория</label>
                  <input placeholder="Лидер / Общий / ..." value={carForm.tag} onChange={e => setCarForm({ ...carForm, tag: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/60 font-body text-xs mb-1.5">Начальный статус</label>
                  <div className="flex gap-2">
                    {(['available', 'in-use', 'reserved'] as CarStatus[]).map(s => (
                      <button key={s} type="button" onClick={() => setCarForm({ ...carForm, status: s })} className={`flex-1 py-2 px-2 rounded-lg font-body text-xs transition-all flex items-center justify-center gap-1.5 ${carForm.status === s ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' : 'glass text-white/50 hover:text-white/80'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${statusLabels[s].dot}`} />
                        {statusLabels[s].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity">Добавить в реестр</button>
                <button type="button" onClick={() => setShowAddCar(false)} className="flex-1 py-3 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80 transition-colors">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── ADD PHOTO MODAL ── */}
      {showAddPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddPhoto(false)} />
          <div className="relative glass gradient-border rounded-2xl w-full max-w-lg animate-scale-in overflow-hidden">
            <div className="flex items-center justify-between px-7 pt-6 pb-4 border-b border-white/8">
              <div>
                <h3 className="font-display text-2xl text-white">Добавить фото</h3>
                <p className="text-white/40 font-body text-xs mt-0.5">Фотоархив Family Morris</p>
              </div>
              <button onClick={() => setShowAddPhoto(false)} className="text-white/30 hover:text-white/60 transition-colors"><Icon name="X" size={18} /></button>
            </div>
            <form onSubmit={addPhoto} className="px-7 py-6 space-y-4">
              <div
                className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer ${photoDragOver ? 'border-violet-500 bg-violet-500/10' : photoPreview ? 'border-green-500/40 bg-green-500/5' : 'border-white/15 hover:border-white/30 bg-white/3'}`}
                onDragOver={e => { e.preventDefault(); setPhotoDragOver(true); }}
                onDragLeave={() => setPhotoDragOver(false)}
                onDrop={e => { e.preventDefault(); setPhotoDragOver(false); const f = e.dataTransfer.files[0]; if (f) handlePhotoFile(f); }}
                onClick={() => photoFileRef.current?.click()}
              >
                <input ref={photoFileRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handlePhotoFile(f); }} />
                {photoPreview ? (
                  <div className="relative">
                    <img src={photoPreview} alt="preview" className="w-full h-48 object-cover rounded-2xl" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-2xl opacity-0 hover:opacity-100 transition-opacity">
                      <p className="text-white font-body text-sm flex items-center gap-2"><Icon name="RefreshCw" size={14} /> Заменить</p>
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-green-500/80 text-white font-body text-xs flex items-center gap-1.5"><Icon name="Check" size={11} /> Готово</div>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 border border-white/10 flex items-center justify-center">
                      <Icon name="ImagePlus" size={24} className="text-violet-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-white/70 font-body text-sm font-medium">Нажмите или перетащите файл</p>
                      <p className="text-white/30 font-body text-xs mt-1">PNG, JPG, WEBP</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Подпись</label>
                  <input placeholder="Название фото" value={photoForm.caption} onChange={e => setPhotoForm({ ...photoForm, caption: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
                <div>
                  <label className="block text-white/60 font-body text-xs mb-1.5">Автор</label>
                  <input placeholder="Имя" value={photoForm.author} onChange={e => setPhotoForm({ ...photoForm, author: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white placeholder-white/25 font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10" />
                </div>
              </div>
              <div>
                <label className="block text-white/60 font-body text-xs mb-1.5">Альбом</label>
                <select value={photoForm.album} onChange={e => setPhotoForm({ ...photoForm, album: e.target.value })} className="w-full glass rounded-xl px-4 py-2.5 text-white font-body text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 border border-white/10 bg-transparent">
                  {photoAlbums.map(a => <option key={a} value={a} className="bg-[#0e0f1e] text-white">{a}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={!photoPreview} className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-body text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  <Icon name="Upload" size={15} /> Добавить в архив
                </button>
                <button type="button" onClick={() => setShowAddPhoto(false)} className="flex-1 py-3 glass text-white/60 font-body text-sm rounded-xl hover:text-white/80 transition-colors">Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── PHOTO LIGHTBOX ── */}
      {photoLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setPhotoLightbox(null)}>
          <div className="relative max-w-3xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <img src={photoLightbox.url} alt={photoLightbox.caption} className="w-full max-h-[75vh] object-contain rounded-2xl" />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
              <p className="text-white font-body font-medium">{photoLightbox.caption}</p>
              <p className="text-white/50 font-body text-sm mt-0.5">{photoLightbox.author} · {photoLightbox.album} · {photoLightbox.date}</p>
            </div>
            <button onClick={() => setPhotoLightbox(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE PHOTO ── */}
      {confirmDeletePhoto !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeletePhoto(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-scale-in text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-display text-2xl text-white mb-2">Удалить фото?</h3>
            <p className="text-white/50 font-body text-sm mb-5">{photoList.find(p => p.id === confirmDeletePhoto)?.caption}</p>
            <div className="flex gap-3">
              <button onClick={() => deletePhoto(confirmDeletePhoto)} className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-body text-sm rounded-lg hover:opacity-90">Удалить</button>
              <button onClick={() => setConfirmDeletePhoto(null)} className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CAR MODAL ── */}
      {confirmDeleteCar !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeleteCar(null)} />
          <div className="relative glass gradient-border rounded-2xl p-6 w-full max-w-sm animate-scale-in text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-display text-2xl text-white mb-2">Удалить авто?</h3>
            <p className="text-white/50 font-body text-sm mb-5">{carList.find(c => c.id === confirmDeleteCar)?.name} будет удалён из реестра.</p>
            <div className="flex gap-3">
              <button onClick={() => removeCar(confirmDeleteCar)} className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-body text-sm rounded-lg hover:opacity-90">Удалить</button>
              <button onClick={() => setConfirmDeleteCar(null)} className="flex-1 py-2.5 glass text-white/60 font-body text-sm rounded-lg hover:text-white/80">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}