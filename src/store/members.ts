import { useState, useEffect } from 'react';

export type Member = {
  id: number;
  name: string;
  role: string;
  status: 'active' | 'pending';
  warnings: number;
  password: string;
  generation: number;
  bio: string;
  avatar: string;
  badge: string;
  badgeColor: string;
};

const STORAGE_KEY = 'morris_members';

export const defaultMembers: Member[] = [
  {
    id: 1, name: 'Уильям Моррис', role: 'Патриарх', status: 'active', warnings: 0, password: '',
    generation: 1, bio: 'Основатель семейной организации Morris. Человек, объединивший всех под одной крышей.',
    avatar: '👴', badge: 'Основатель', badgeColor: 'from-yellow-500 to-orange-500',
  },
  {
    id: 2, name: 'Элизабет Моррис', role: 'Матриарх', status: 'active', warnings: 0, password: '',
    generation: 1, bio: 'Хранитель традиций и семейной мудрости. Любимая бабушка для всего третьего поколения.',
    avatar: '👵', badge: 'Старейшина', badgeColor: 'from-violet-500 to-purple-600',
  },
  {
    id: 3, name: 'Джеймс Моррис', role: 'Лидер', status: 'active', warnings: 0, password: '',
    generation: 2, bio: 'Руководит семейной организацией. Отвечает за принятие ключевых решений.',
    avatar: '👨‍💼', badge: 'Администратор', badgeColor: 'from-blue-500 to-cyan-500',
  },
  {
    id: 4, name: 'Сара Моррис', role: 'Секретарь', status: 'active', warnings: 1, password: '',
    generation: 2, bio: 'Ведёт летопись семьи, организует встречи и хранит архив документов.',
    avatar: '👩‍💼', badge: 'Сотрудник', badgeColor: 'from-green-500 to-emerald-600',
  },
  {
    id: 5, name: 'Томас Моррис', role: 'Казначей', status: 'active', warnings: 0, password: '',
    generation: 2, bio: 'Управляет семейным фондом и финансовыми вопросами организации.',
    avatar: '👨‍💻', badge: 'Сотрудник', badgeColor: 'from-green-500 to-emerald-600',
  },
  {
    id: 6, name: 'Оливия Моррис', role: 'Участник', status: 'pending', warnings: 0, password: '',
    generation: 3, bio: 'Молодое и яркое поколение Morris. Отвечает за социальные медиа семьи.',
    avatar: '👩', badge: 'Участник', badgeColor: 'from-pink-500 to-rose-500',
  },
];

function loadMembers(): Member[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Member[];
  } catch (_e) {
    return defaultMembers;
  }
  return defaultMembers;
}

function saveMembers(list: Member[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_e) {
    // ignore
  }
}

// Simple reactive store via custom event
const CHANGE_EVENT = 'morris_members_change';

export function getMembers(): Member[] {
  return loadMembers();
}

export function setMembers(list: Member[]) {
  saveMembers(list);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useMembers(): [Member[], (list: Member[]) => void] {
  const [members, setLocal] = useState<Member[]>(loadMembers);

  useEffect(() => {
    const handler = () => setLocal(loadMembers());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const update = (list: Member[]) => {
    setMembers(list);
    setLocal(list);
  };

  return [members, update];
}