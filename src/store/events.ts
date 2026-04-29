import { useState, useEffect } from 'react';

export type FamilyEvent = {
  id: number;
  date: string;
  title: string;
  location: string;
  type: string;
  typeColor: string;
  desc: string;
  upcoming: boolean;
};

const STORAGE_KEY = 'morris_events';
const CHANGE_EVENT = 'morris_events_change';

const defaultEvents: FamilyEvent[] = [
  {
    id: 1,
    date: '15 Июня 2026',
    title: 'Летний семейный съезд',
    location: 'Усадьба Моррис, Подмосковье',
    type: 'Ежегодный',
    typeColor: 'from-blue-500 to-cyan-500',
    desc: 'Главное мероприятие года. Все ветви семьи собираются вместе, подводим итоги и строим планы.',
    upcoming: true,
  },
  {
    id: 2,
    date: '12 Сентября 2026',
    title: 'День основания организации',
    location: 'Онлайн + Москва',
    type: 'Памятный',
    typeColor: 'from-yellow-500 to-orange-500',
    desc: 'Праздник в честь основания Family Morris. Торжественная часть и награждение отличившихся.',
    upcoming: true,
  },
];

function load(): FamilyEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as FamilyEvent[];
  } catch (_e) {
    return defaultEvents;
  }
  return defaultEvents;
}

function save(list: FamilyEvent[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (_e) {
    // ignore
  }
}

export function getEvents(): FamilyEvent[] {
  return load();
}

export function useEvents(): [FamilyEvent[], (list: FamilyEvent[]) => void] {
  const [events, setLocal] = useState<FamilyEvent[]>(load);

  useEffect(() => {
    const handler = () => setLocal(load());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const update = (list: FamilyEvent[]) => {
    save(list);
    setLocal(list);
  };

  return [events, update];
}

// Роли, которым разрешено управлять событиями
export const MANAGER_ROLES = ['лидер', 'заместитель', 'зам', 'co-leader', 'патриарх', 'матриарх', 'администратор'];

export function canManageEvents(role: string): boolean {
  return MANAGER_ROLES.some(r => role.toLowerCase().includes(r));
}
