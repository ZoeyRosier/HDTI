/**
 * i18n 入口
 *
 * 目录结构：
 *   locales/zh.js, locales/en.js  — 页面 UI 文案          → t('home.title')
 *   resolve.js                    — 数据实体的 pickAnimal / pickQuestion
 *   data/animals.js, questions.js — 业务文案在 locale.{zh,en}
 *
 * 用法：
 *   const { t, language, pickAnimal, pickQuestion } = useI18n();
 */

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import zh from './locales/zh.js';
import en from './locales/en.js';
import { interpolate, lookupMessage } from './utils.js';
import { pickAnimal, pickQuestion, DEFAULT_LOCALE } from './resolve.js';

const LANG_KEY = 'hdti_lang';
const uiLocales = { zh, en };

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(
    () => localStorage.getItem(LANG_KEY) || DEFAULT_LOCALE,
  );

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
  }, []);

  const t = useCallback(
    (key, vars) => {
      const msg = lookupMessage(uiLocales[language], key);
      if (msg == null) return key;
      return interpolate(msg, vars);
    },
    [language],
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      pickAnimal: (animal) => pickAnimal(animal, language),
      pickQuestion: (question) => pickQuestion(question, language),
    }),
    [language, setLanguage, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

const LANG_OPTIONS = [
  { code: 'zh', label: '中' },
  { code: 'en', label: 'EN' },
];

const LANG_TOGGLE_STYLES = {
  light: {
    shell: 'bg-bg-card/95 backdrop-blur-sm border-border shadow-[0_2px_8px_rgba(50,65,35,0.06)] md:shadow-[0_4px_14px_rgba(50,65,35,0.08)]',
    slider: 'bg-primary shadow-[0_1px_4px_rgba(50,65,35,0.15)] md:shadow-[0_2px_8px_rgba(50,65,35,0.18)]',
    active: 'text-white',
    inactive: 'text-text-muted hover:text-text-body',
  },
  dark: {
    shell: 'bg-white/10 backdrop-blur-md border-white/20 shadow-[0_2px_10px_rgba(0,0,0,0.12)] md:shadow-[0_4px_16px_rgba(0,0,0,0.18)]',
    slider: 'bg-white/95 shadow-[0_1px_6px_rgba(0,0,0,0.1)] md:shadow-[0_2px_10px_rgba(0,0,0,0.12)]',
    active: 'text-primary-dark',
    inactive: 'text-white/55 hover:text-white/85',
  },
};

/** @param {{ variant?: 'light' | 'dark' }} props */
export function LangToggle({ variant = 'light' }) {
  const { language, setLanguage } = useI18n();
  const styles = LANG_TOGGLE_STYLES[variant];
  const activeIndex = LANG_OPTIONS.findIndex((o) => o.code === language);

  return (
    <div
      role="group"
      aria-label="语言切换"
      className={`relative flex shrink-0 rounded-[22px] md:rounded-[30px] border p-0.5 md:p-1 ${styles.shell}`}
    >
      <motion.div
        className={`absolute top-0.5 bottom-0.5 md:top-1 md:bottom-1 rounded-[18px] md:rounded-[26px] ${styles.slider}`}
        initial={false}
        animate={{ left: activeIndex === 0 ? '2px' : 'calc(50%)' }}
        style={{ width: 'calc(50% - 2px)' }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      />
      {LANG_OPTIONS.map(({ code, label }) => {
        const isActive = language === code;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLanguage(code)}
            className={`relative z-10 min-w-[1.75rem] px-2 py-0.5 text-[10px] md:min-w-[2.75rem] md:px-3.5 md:py-1.5 md:text-xs font-medium tracking-wide transition-colors cursor-pointer ${
              isActive ? styles.active : styles.inactive
            } ${code === 'en' ? 'font-mono' : ''}`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export { pickAnimal, pickQuestion, DEFAULT_LOCALE, SUPPORTED_LOCALES } from './resolve.js';
