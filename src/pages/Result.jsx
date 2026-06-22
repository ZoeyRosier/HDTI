import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animalsMap } from '../data/animals';
import { calculateResult } from '../utils/scoring';
import { readResultFromUrl, shareResult } from '../utils/share';
import { incrementAnimalCount, getAllCounts } from '../utils/supabase';
import { useI18n, LangToggle } from '../i18n';

export default function Result() {
  const navigate = useNavigate();
  const { t, language, pickAnimal } = useI18n();
  const [stats, setStats] = useState(null);
  const [copyToast, setCopyToast] = useState(false);

  const resultData = useMemo(() => {
    const urlResult = readResultFromUrl();
    if (urlResult) {
      const animal = animalsMap[urlResult.animalId];
      if (animal) {
        return { animal, matchRate: urlResult.matchRate, isSharedView: true };
      }
    }

    const answersStr = sessionStorage.getItem('hdti_answers');
    if (answersStr) {
      const answers = JSON.parse(answersStr);
      if (Object.keys(answers).length === 16) {
        const { result, isEgg, eggType, matchRate, userVec } = calculateResult(answers);
        const animal = animalsMap[result];
        return { animal, matchRate, isSharedView: false, isEgg, eggType, userVec };
      }
    }

    return null;
  }, []);

  const animal = useMemo(
    () => (resultData ? pickAnimal(resultData.animal) : null),
    [resultData, language, pickAnimal],
  );

  useEffect(() => {
    if (!resultData) {
      navigate('/');
      return;
    }

    if (!resultData.isSharedView) {
      localStorage.setItem('hdti_result', JSON.stringify({
        animalId: resultData.animal.id,
        animalCode: resultData.animal.code,
        matchRate: resultData.matchRate,
        timestamp: Date.now()
      }));

      incrementAnimalCount(resultData.animal.id).then(myCount => {
        if (myCount !== null) {
          getAllCounts().then(allCounts => {
            if (allCounts) {
              const total = allCounts.reduce((sum, row) => sum + row.count, 0);
              const animalCount = allCounts.find(r => r.animal_id === resultData.animal.id)?.count || myCount;
              setStats({
                myCount,
                total,
                percentage: total > 0 ? (animalCount / total * 100).toFixed(1) : null
              });
            }
          });
        }
      });
    }
  }, [resultData, navigate]);

  if (!resultData || !animal) return null;

  const { matchRate, isSharedView } = resultData;

  const scienceSource = animal.reuseScienceFrom
    ? animalsMap[animal.reuseScienceFrom]
    : animal;
  const scienceAnimal = pickAnimal(scienceSource);
  const species = scienceAnimal?.species;

  async function handleShare() {
    const result = await shareResult({
      animalName: animal.name,
      animalCode: animal.code,
      matchRate,
      animalId: animal.id,
      t,
    });
    if (result.method === 'clipboard') {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
    }
  }

  const eggLabel = animal.eggType === 'hidden'
    ? t('result.eggHidden')
    : animal.eggType === 'extreme'
    ? t('result.eggExtreme')
    : t('result.eggCombo');

  return (
    <div className="min-h-dvh">
      <div className="min-h-dvh bg-primary-dark text-white px-6 py-10 flex flex-col items-center justify-center relative">
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle variant="dark" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md text-center"
        >
          {isSharedView && (
            <span className="inline-block bg-white/10 text-white/70 text-xs px-3 py-1 rounded-full mb-4">
              {t('result.sharedBadge')}
            </span>
          )}

          {animal.isEgg && (
            <span className="inline-block bg-accent-warm/20 text-accent-warm text-xs px-3 py-1 rounded-full mb-4">
              {eggLabel}
            </span>
          )}

          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">
            {t('result.heroLabel')}
          </p>

          <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-5xl font-mono font-bold text-white/30">
              {animal.code.charAt(0)}
            </span>
          </div>

          <h1 className="text-2xl font-bold mb-1">{animal.personalityName}</h1>
          <p className="font-mono text-sm tracking-widest text-white/70 mb-4">
            {animal.code} · {animal.name}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {animal.tags.map(tag => (
              <span key={tag} className="bg-white/10 text-white/80 text-xs px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-base italic text-white/90 mb-6">
            {t('result.quote', { quote: animal.quote })}
          </p>

          <div className="bg-white/5 rounded-xl p-4 mb-4">
            <p className="text-xs text-white/60 mb-2">
              {t('result.matchWith', { name: animal.name })}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${matchRate}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </div>
              <span className="font-mono text-lg font-bold">{matchRate}%</span>
            </div>
          </div>

          {stats && stats.percentage && (
            <p className="text-xs text-white/50">
              {t('result.rarity', { percent: stats.percentage, name: animal.name })}
            </p>
          )}

          <motion.p
            className="text-xs text-white/40 mt-8"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            {t('result.scrollHint')}
          </motion.p>
        </motion.div>
      </div>

      <div className="bg-bg-page px-6 py-10">
        <div className="max-w-md mx-auto space-y-8">
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-card rounded-2xl p-6 border border-border text-center"
            >
              <p className="text-text-secondary text-sm">
                {t('result.statsCount', {
                  count: stats.myCount.toLocaleString(),
                  name: animal.name,
                })}
              </p>
              <div className="w-12 h-px bg-border mx-auto my-4" />
              <p className="text-text-primary font-medium">
                {t('result.statsWild', { population: animal.wildPopulation })}
              </p>
              <p className="text-text-muted text-xs mt-3">
                {t('result.statsRank', {
                  count: stats.myCount.toLocaleString(),
                  name: animal.name,
                })}
              </p>
            </motion.div>
          )}

          <div>
            <h3 className="text-sm font-medium text-text-muted mb-3">{t('result.archetype')}</h3>
            <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line">
              {animal.personalityDesc}
            </p>
          </div>

          {species && (
            <div className="space-y-3">
              <ScienceCard emoji="🏔" title={t('result.speciesProfile')} content={species.habitat} />
              <ScienceCard emoji="🧗" title={t('result.survivalSkill')} content={species.skill} />
              <ScienceCard emoji="💡" title={t('result.funFact')} content={species.funFact} defaultOpen />
              <ScienceCard
                emoji="🚨"
                title={t('result.conservation')}
                content={species.statusDesc}
                badge={animal.conservationStatus}
              />
            </div>
          )}

          <a
            href={animal.iucnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-primary hover:text-primary-dark transition-colors"
          >
            {t('result.iucnLink')}
          </a>

          <div className="space-y-3 pt-4">
            <button
              onClick={handleShare}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              {t('result.share')}
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => { sessionStorage.removeItem('hdti_answers'); navigate('/'); }}
                className="flex-1 bg-bg-card border border-border text-text-secondary py-3 rounded-xl text-sm hover:border-primary-light transition-colors cursor-pointer"
              >
                {t('result.retake')}
              </button>
              {!isSharedView && (
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-bg-card border border-border text-text-secondary py-3 rounded-xl text-sm hover:border-primary-light transition-colors cursor-pointer"
                >
                  {t('result.home')}
                </button>
              )}
              {isSharedView && (
                <button
                  onClick={() => { sessionStorage.removeItem('hdti_answers'); navigate('/'); }}
                  className="flex-1 bg-bg-card border border-border text-text-secondary py-3 rounded-xl text-sm hover:border-primary-light transition-colors cursor-pointer"
                >
                  {t('result.iWantTest')}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-text-primary text-white text-sm px-4 py-2 rounded-lg shadow-lg"
          >
            {t('result.linkCopied')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ScienceCard({ emoji, title, content, badge, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <span>{emoji}</span>
          {title}
        </span>
        <span className="flex items-center gap-2">
          {badge && (
            <span className="text-xs bg-accent-warm/10 text-accent-warm px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
          <span className={`text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
