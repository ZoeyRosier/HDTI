import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalCount } from '../utils/supabase';
import { useI18n, LangToggle } from '../i18n';

export default function Home() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [totalCount, setTotalCount] = useState(null);
  const lastResult = JSON.parse(localStorage.getItem('hdti_result') || 'null');
  const hasHistory = lastResult && (Date.now() - lastResult.timestamp < 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    getTotalCount().then(count => {
      if (count !== null) setTotalCount(count);
    });
  }, []);

  function handleStart() {
    sessionStorage.removeItem('hdti_answers');
    navigate('/quiz');
  }

  function handleViewLast() {
    navigate(`/result?r=${lastResult.animalId}&m=${lastResult.matchRate}`);
  }

  return (
    <div className="min-h-dvh flex flex-col relative">
      <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
        <LangToggle variant="dark" />
      </div>

      {/* Hero */}
      <div className="bg-primary-dark text-white px-6 pt-12 pb-10 flex flex-col items-center text-center">
        <div className="w-full max-w-md">
          <div className="h-20 mb-6 flex items-end justify-center">
            <svg viewBox="0 0 320 80" className="w-full h-full opacity-30">
              <polygon points="0,80 40,30 80,60 120,20 160,50 200,10 240,40 280,25 320,80" fill="currentColor" />
            </svg>
          </div>

          <span className="inline-block bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full mb-4">
            {t('home.badge')}
          </span>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {t('home.title')}
          </h1>

          <p className="text-xs tracking-widest uppercase text-white/60 mb-6">
            {t('home.subtitle')}
          </p>
        </div>
      </div>

      {/* Action area */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        <div className="w-full max-w-md space-y-4">
          <p className="text-text-secondary text-sm leading-relaxed text-center whitespace-pre-line">
            {t('home.desc1')}
            <br />
            {t('home.desc2')}
          </p>

          {totalCount !== null && (
            <p className="text-center text-xs text-text-muted">
              {t('home.totalCount', { count: totalCount.toLocaleString() })}
            </p>
          )}

          <button
            onClick={handleStart}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-base hover:bg-primary-dark transition-colors cursor-pointer"
          >
            {t('home.start')}
          </button>

          {hasHistory && (
            <button
              onClick={handleViewLast}
              className="w-full text-text-muted text-sm py-2 hover:text-text-secondary transition-colors cursor-pointer"
            >
              {t('home.viewLast')}
            </button>
          )}
        </div>

        <div className="mt-auto pt-8 text-center text-xs text-text-muted space-y-1">
          <p>{t('home.hook1')}</p>
          <p>{t('home.hook2')}</p>
        </div>
      </div>
    </div>
  );
}
