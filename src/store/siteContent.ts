import { useState, useEffect } from 'react';

export type SiteContent = {
  // Главная
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  // Контакты
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  contactAddressLabel: string;
  contactTelegram: string;
  // История
  historySubtitle: string;
  historyDescription: string;
  // Ценности
  values: { emoji: string; title: string; desc: string }[];
  // Хронология
  timeline: { year: string; title: string; desc: string }[];
};

const STORAGE_KEY = 'morris_site_content';
const CHANGE_EVENT = 'morris_site_content_change';

export const defaultContent: SiteContent = {
  heroTitle: 'Family',
  heroSubtitle: 'Morris',
  heroDescription: 'Единство, традиции и взаимная поддержка — основа нашей семьи. Мы строим будущее вместе.',
  contactEmail: '',
  contactPhone: '',
  contactAddress: 'Офис Приволжка',
  contactAddressLabel: 'Офис организации',
  contactTelegram: '',
  historySubtitle: 'Наше прошлое',
  historyDescription: 'Мы строим семью, основанную на взаимном уважении, любви и общих ценностях.',
  values: [
    { emoji: '🤝', title: 'Единство', desc: '' },
    { emoji: '⚖️', title: 'Честь', desc: '' },
    { emoji: '🌱', title: 'Рост', desc: '' },
    { emoji: '🏛️', title: 'Традиции', desc: '' },
    { emoji: '💡', title: 'Мудрость', desc: '' },
    { emoji: '❤️', title: 'Забота', desc: '' },
  ],
  timeline: [],
};

function load(): SiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultContent, ...JSON.parse(raw) };
  } catch (_e) {
    return defaultContent;
  }
  return defaultContent;
}

function save(c: SiteContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (_e) {
    // ignore
  }
}

export function getSiteContent(): SiteContent {
  return load();
}

export function useSiteContent(): [SiteContent, (c: SiteContent) => void] {
  const [content, setLocal] = useState<SiteContent>(load);

  useEffect(() => {
    const handler = () => setLocal(load());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const update = (c: SiteContent) => {
    save(c);
    setLocal(c);
  };

  return [content, update];
}
