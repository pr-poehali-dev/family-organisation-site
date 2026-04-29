import { useState, useEffect } from 'react';

export type OrgSettings = {
  foundedYear: string;
  meetingsCount: number;
};

const STORAGE_KEY = 'morris_org_settings';
const CHANGE_EVENT = 'morris_org_settings_change';

const defaults: OrgSettings = {
  foundedYear: '2025',
  meetingsCount: 0,
};

export function getOrgSettings(): OrgSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch (_e) {
    return defaults;
  }
  return defaults;
}

export function saveOrgSettings(s: OrgSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (_e) {
    // ignore
  }
}

export function useOrgSettings(): [OrgSettings, (s: OrgSettings) => void] {
  const [settings, setLocal] = useState<OrgSettings>(getOrgSettings);

  useEffect(() => {
    const handler = () => setLocal(getOrgSettings());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const update = (s: OrgSettings) => {
    saveOrgSettings(s);
    setLocal(s);
  };

  return [settings, update];
}
