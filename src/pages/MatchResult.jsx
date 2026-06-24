import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animalsMap } from '../data/animals';
import {
  loadMatchSession,
  getMatchResult,
  getInterpretationTier,
} from '../utils/match';
import { useI18n, LangToggle } from '../i18n';
import { AnimalAvatar } from './Match';

const PAGE_BG = '#F6F8F4';
const PRIMARY = '#4E6B53';
const ACCENT = '#F38B72';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export default function MatchResult() {
  const navigate = useNavigate();
  const { t, language, pickAnimal } = useI18n();
  const [displayRate, setDisplayRate] = useState(0);

  const session = useMemo(() => loadMatchSession(), []);

  const result = useMemo(() => {
    if (!session) return null;
    return getMatchResult(session.mineId, session.friendId, language);
  }, [session, language]);

  const mineAnimal = useMemo(
    () => (session ? pickAnimal(animalsMap[session.mineId]) : null),
    [session, language, pickAnimal],
  );
  const friendAnimal = useMemo(
    () => (session ? pickAnimal(animalsMap[session.friendId]) : null),
    [session, language, pickAnimal],
  );

  const tier = result ? getInterpretationTier(result.compatRate) : 'mid';

  useEffect(() => {
    if (!session || !result) {
      navigate('/match', { replace: true });
      return;
    }
    const target = result.compatRate;
    const start = performance.now();
    const duration = 900;
    let frame;
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      setDisplayRate(Math.round(target * p));
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [session, result, navigate]);

  if (!session || !result || !mineAnimal || !friendAnimal) return null;

  return (
    <div className="min-h-dvh pb-10" style={{ backgroundColor: PAGE_BG }}>
      {/* Hero result card */}
      <motion.div
        {...fadeUp(0)}
        className="relative px-6 pt-10 pb-10 text-white text-center shrink-0"
        style={{
          minHeight: 280,
          background: `linear-gradient(165deg, #2e4738 0%, ${PRIMARY} 50%, #3a5644 100%)`,
        }}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle variant="dark" />
        </div>

        <p className="text-[10px] uppercase tracking-[0.25em] text-white/45 font-mono mb-6">
          {t('match.resultArchiveBadge')}
        </p>

        <div className="flex items-center justify-center gap-4 md:gap-8 max-w-md mx-auto">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <AnimalAvatar code={mineAnimal.code} size="md" variant="dark" />
            <p className="text-sm font-bold mt-2 truncate max-w-full">{mineAnimal.name}</p>
          </div>

          <div className="flex flex-col items-center shrink-0">
            <motion.span
              className="text-5xl md:text-6xl font-bold font-num leading-none"
              style={{ color: ACCENT }}
            >
              {displayRate}
            </motion.span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest mt-1">
              {t('match.compatLabel')}
            </span>
          </div>

          <div className="flex flex-col items-center flex-1 min-w-0">
            <AnimalAvatar code={friendAnimal.code} size="md" variant="dark" />
            <p className="text-sm font-bold mt-2 truncate max-w-full">{friendAnimal.name}</p>
          </div>
        </div>

        <motion.h1
          {...fadeUp(0.25)}
          className="text-xl md:text-2xl font-bold mt-6"
        >
          {result.relationName}
        </motion.h1>

        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-wrap justify-center gap-2 mt-4"
        >
          {result.tags.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.08 }}
              className="text-xs px-3 py-1 rounded-full border border-white/25 bg-white/10 text-white/90"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      <div className="px-5 pt-8 pb-10 max-w-lg mx-auto w-full space-y-5">
        {/* 关系概览 */}
        <motion.section
          {...fadeUp(0.5)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-base font-bold text-[#23271d] mb-3">{t('match.overviewTitle')}</h2>
          <p className="text-[15px] text-[#4E6B53] leading-[1.75] font-medium">
            {result.desc}
          </p>
        </motion.section>

        {/* 关系标签 */}
        <motion.section
          {...fadeUp(0.58)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-sm font-bold text-[#23271d] mb-3">{t('match.tagsTitle')}</h2>
          <div className="flex flex-wrap gap-2">
            {result.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-[#eef3ea] text-[#4E6B53] border border-[#dce6d6]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.section>

        {/* 关系解读 */}
        <motion.section
          {...fadeUp(0.66)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-base font-bold text-[#23271d] mb-3">
            {t(`match.interpretTitle_${tier}`)}
          </h2>
          <p className="text-sm text-[#5f6a52] leading-relaxed">
            {t(`match.interpretBody_${tier}`, {
              nameA: mineAnimal.name,
              nameB: friendAnimal.name,
              rate: result.compatRate,
            })}
          </p>
        </motion.section>

        <motion.div {...fadeUp(0.74)} className="flex gap-3 pt-2">
          <button
            onClick={() => navigate('/match')}
            className="flex-1 py-3 rounded-2xl border border-[#e4e9dd] bg-white text-sm text-[#5f6a52] font-medium hover:border-[#4E6B53] transition-colors cursor-pointer"
          >
            {t('match.analyzeAgain')}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-2xl text-sm text-white font-medium cursor-pointer"
            style={{ backgroundColor: PRIMARY }}
          >
            {t('match.backHome')}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
