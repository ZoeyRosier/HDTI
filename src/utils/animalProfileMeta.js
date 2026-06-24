/** 7维度定义：分为4个模型类别 */
export const DIMENSIONS = [
  { id: 0, code: 'D1', nameZh: '探索倾向', nameEn: 'Exploration', categoryZh: '行为模型', categoryEn: 'Behavioral Model' },
  { id: 1, code: 'D2', nameZh: '应激反应', nameEn: 'Stress Response', categoryZh: '行为模型', categoryEn: 'Behavioral Model' },
  { id: 2, code: 'D3', nameZh: '群体依赖', nameEn: 'Group Bond', categoryZh: '社交模型', categoryEn: 'Social Model' },
  { id: 3, code: 'D4', nameZh: '社交主动', nameEn: 'Social Drive', categoryZh: '社交模型', categoryEn: 'Social Model' },
  { id: 4, code: 'D5', nameZh: '行动频率', nameEn: 'Activity', categoryZh: '驱动模型', categoryEn: 'Drive Model' },
  { id: 5, code: 'D6', nameZh: '领地意识', nameEn: 'Territorial', categoryZh: '驱动模型', categoryEn: 'Drive Model' },
  { id: 6, code: 'D7', nameZh: '适应灵活', nameEn: 'Adaptability', categoryZh: '策略模型', categoryEn: 'Strategy Model' },
];

/** @param {'zh'|'en'} lang */
export function getDimensionCategories(lang) {
  const key = lang === 'en' ? 'categoryEn' : 'categoryZh';
  return [...new Set(DIMENSIONS.map((d) => d[key]))];
}

/** @param {typeof DIMENSIONS[0]} dim @param {'zh'|'en'} lang */
export function getDimensionLabel(dim, lang) {
  return lang === 'en' ? dim.nameEn : dim.nameZh;
}

/** @param {string} category @param {'zh'|'en'} lang */
export function dimensionsInCategory(category, lang) {
  const key = lang === 'en' ? 'categoryEn' : 'categoryZh';
  return DIMENSIONS.filter((d) => d[key] === category);
}

export const IUCN_LABELS = {
  zh: { CR: '极危', EN: '濒危', VU: '易危', NT: '近危', LC: '无危' },
  en: { CR: 'Critically Endangered', EN: 'Endangered', VU: 'Vulnerable', NT: 'Near Threatened', LC: 'Least Concern' },
};

/** @param {string} status @param {'zh'|'en'} lang */
export function getIucnLabel(status, lang) {
  return IUCN_LABELS[lang]?.[status] ?? status;
}

export const EGG_THEMES = {
  giant_panda: { heroBg: 'linear-gradient(180deg, #7a6528 0%, #5c4b1e 100%)', accent: '#C4956A', barFill: '#C4956A', circleBg: 'radial-gradient(circle, rgba(196,149,106,0.3) 0%, rgba(196,149,106,0.1) 70%)', sectionBg: '#faf6ef', headingColor: '#9a7b3c', dividerColor: '#e8d5b0', wildNumColor: '#C4956A', posterBg: 'linear-gradient(135deg, #9a7b3c, #7a6028)', badgeRgb: '154,123,60' },
  clouded_leopard: { heroBg: 'linear-gradient(180deg, #3b2d5e 0%, #271d42 100%)', accent: '#b89adb', barFill: '#b89adb', circleBg: 'radial-gradient(circle, rgba(184,154,219,0.25) 0%, rgba(184,154,219,0.08) 70%)', sectionBg: '#f8f5fc', headingColor: '#5e3d8a', dividerColor: '#e0d4f0', wildNumColor: '#8b5fbf', posterBg: 'linear-gradient(135deg, #5e3d8a, #3b2d5e)', badgeRgb: '94,61,138' },
  chinese_monal: { heroBg: 'linear-gradient(180deg, #5c3a6e 0%, #2e4738 100%)', accent: '#e8a0c8', barFill: 'linear-gradient(90deg, #e8a0c8, #a8d8ea, #b8e6a0)', circleBg: 'radial-gradient(circle, rgba(232,160,200,0.2) 0%, rgba(168,216,234,0.1) 70%)', sectionBg: '#faf5f8', headingColor: '#8a3d6e', dividerColor: '#f0d4e8', wildNumColor: '#c4669f', posterBg: 'linear-gradient(135deg, #8a3d6e, #2e6b5a)', badgeRgb: '138,61,110' },
  snow_leopard_extreme: { heroBg: 'linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)', accent: '#7ec8e3', barFill: '#7ec8e3', circleBg: 'radial-gradient(circle, rgba(126,200,227,0.25) 0%, rgba(126,200,227,0.08) 70%)', sectionBg: '#f4f9fc', headingColor: '#2c5d7a', dividerColor: '#d0e8f5', wildNumColor: '#3d8ab0', posterBg: 'linear-gradient(135deg, #2c5d7a, #1a252f)', badgeRgb: '44,93,122' },
  monkey_extreme: { heroBg: 'linear-gradient(180deg, #1a3a4a 0%, #0f2830 100%)', accent: '#4de8c2', barFill: '#4de8c2', circleBg: 'radial-gradient(circle, rgba(77,232,194,0.2) 0%, rgba(77,232,194,0.06) 70%)', sectionBg: '#f2fbf8', headingColor: '#1a6b5a', dividerColor: '#c8f0e4', wildNumColor: '#2a9b80', posterBg: 'linear-gradient(135deg, #1a6b5a, #0f2830)', badgeRgb: '26,107,90' },
};

export const DEFAULT_THEME = {
  heroBg: 'linear-gradient(180deg, #3D5A47 0%, #2e4738 100%)',
  accent: '#8fb872',
  barFill: '#8fb872',
  circleBg: 'radial-gradient(circle, rgba(143,184,114,0.2) 0%, rgba(143,184,114,0.08) 70%)',
  sectionBg: '#F5F7F2',
  headingColor: '#3D5A47',
  dividerColor: '#dce6d4',
  wildNumColor: '#c4663f',
  posterBg: '#3D5A47',
  badgeRgb: '34,120,60',
};

const EGG_RING_GRADIENTS = {
  giant_panda: 'conic-gradient(from 0deg, #C4956A, #f5d9a8, #9a7b3c, #f5d9a8, #C4956A)',
  clouded_leopard: 'conic-gradient(from 0deg, #b89adb, #6b3fa0, #e0c4f7, #6b3fa0, #b89adb)',
  chinese_monal: 'conic-gradient(from 0deg, #e8a0c8, #a8d8ea, #b8e6a0, #f0d080, #e8a0c8)',
  snow_leopard_extreme: 'conic-gradient(from 0deg, #7ec8e3, #ffffff, #4a9fbf, #ffffff, #7ec8e3)',
  monkey_extreme: 'conic-gradient(from 0deg, #4de8c2, #0a5e4a, #80fff0, #0a5e4a, #4de8c2)',
};

/** @param {{ id: string, isEgg?: boolean }} animal */
export function getAnimalTheme(animal) {
  const base = animal.isEgg ? (EGG_THEMES[animal.id] || EGG_THEMES.giant_panda) : DEFAULT_THEME;
  const ringGradient = animal.isEgg ? (EGG_RING_GRADIENTS[animal.id] || EGG_RING_GRADIENTS.giant_panda) : null;
  return { ...base, ringGradient };
}

/** @param {string} raw @param {'zh'|'en'} lang */
export function formatWildPopulation(raw, lang = 'zh') {
  if (!raw) return { number: '—', label: '' };
  const number = raw.replace(/[（(].+[）)]/g, '').trim();
  const paren = raw.match(/[（(](.+)[）)]/);
  if (lang === 'en') {
    return { number, label: paren ? paren[1] : 'In the wild' };
  }
  const label = paren
    ? (paren[1].includes('中国特有')
        ? '中国特有，野外仅剩'
        : `${paren[1]}仅剩`)
    : '野外仅剩';
  return { number, label };
}

/** @param {number} pct @param {(key: string) => string} t */
export function getRarityLabel(pct, t) {
  if (pct <= 1) return t('result.rarityUltra');
  if (pct <= 5) return t('result.rarityRare');
  if (pct <= 10) return t('result.rarityPrecious');
  return t('result.raritySpecial');
}

/** @param {string} quote @param {'zh'|'en'} lang */
export function formatQuote(quote, lang = 'zh') {
  const sep = lang === 'en' ? ', ' : '，';
  const parts = quote.split(lang === 'en' ? /,\s+/ : '，');
  if (parts.length > 2) {
    const wrap = lang === 'en' ? '"' : '「';
    const wrapEnd = lang === 'en' ? '"' : '」';
    return `${wrap}${parts.slice(0, 2).join(sep)}${sep}\n${parts.slice(2).join(sep)}${wrapEnd}`;
  }
  return lang === 'en' ? `"${quote}"` : `「${quote}」`;
}
