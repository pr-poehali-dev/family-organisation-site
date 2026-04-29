export type Application = {
  id: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  // Основные поля
  name: string;
  age: string;
  timezone: string;
  about: string;
  screenshotUrl: string;
  hoursPerDay: string;
  // Доп. инфо
  lookingFor: string;
  whyJoin: string;
  willChangeSurname: 'yes' | 'no' | '';
  agreeRules: 'yes' | 'no' | '';
  prevOrgs: string;
};

const STORAGE_KEY = 'morris_applications';
const CHANGE_EVENT = 'morris_applications_change';

export function getApplications(): Application[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Application[];
  } catch (_e) {
    return [];
  }
  return [];
}

export function saveApplications(list: Application[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (_e) {
    // ignore
  }
}

export function addApplication(app: Omit<Application, 'id' | 'createdAt' | 'status'>): Application {
  const list = getApplications();
  const newApp: Application = {
    ...app,
    id: Date.now(),
    createdAt: new Date().toLocaleDateString('ru-RU'),
    status: 'pending',
  };
  saveApplications([...list, newApp]);
  return newApp;
}

export function updateApplicationStatus(id: number, status: Application['status']) {
  const list = getApplications();
  saveApplications(list.map(a => a.id === id ? { ...a, status } : a));
}

import { useState, useEffect } from 'react';

export function useApplications(): [Application[], () => void] {
  const [apps, setApps] = useState<Application[]>(getApplications);

  const reload = () => setApps(getApplications());

  useEffect(() => {
    window.addEventListener(CHANGE_EVENT, reload);
    return () => window.removeEventListener(CHANGE_EVENT, reload);
  }, []);

  return [apps, reload];
}
