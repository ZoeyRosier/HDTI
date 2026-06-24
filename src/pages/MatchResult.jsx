import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

function localizedField(animal, field, lang) {
  if (lang === 'en') {
    return animal[`${field}En`] ?? animal[field] ?? '';
  }
  return animal[field] ?? '';
}

function levelBadgeClass(level) {
  if (level === 'H') return 'bg-[#dce6d6] text-[#2e4738]';
  if (level === 'L') return 'bg-[#f0f2ec] text-[#8a9379]';
  return 'bg-[#eef3ea] text-[#4E6B53]';
}

function DimensionRow({ dim, mineLabel, friendLabel, gapText }) {
  const barA = Math.max(8, Math.round(((dim.valueA - 1) / 2) * 100));
  const barB = Math.max(8, Math.round(((dim.valueB - 1) / 2) * 100));

  return (
    <div className="py-3 border-b border-[#eef3ea] last:border-0">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-sm font-medium text-[#23271d]">
          {dim.code} {dim.name}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${dim.gap >= 0.7 ? 'bg-[#fde8e2] text-[#c4663f]' : 'bg-[#eef3ea] text-[#4E6B53]'}`}>
          {gapText}
        </span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold w-8 shrink-0 ${levelBadgeClass(dim.levelA)} px-1 py-0.5 rounded text-center`}>
            {dim.levelA}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-[#f0f2ec] overflow-hidden">
            <div className="h-full rounded-full bg-[#4E6B53]" style={{ width: `${barA}%` }} />
          </div>
          <span className="text-[10px] text-[#8a9379] w-10 text-right shrink-0">{mineLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold w-8 shrink-0 ${levelBadgeClass(dim.levelB)} px-1 py-0.5 rounded text-center`}>
            {dim.levelB}
          </span>
          <div className="flex-1 h-1.5 rounded-full bg-[#f0f2ec] overflow-hidden">
            <div className="h-full rounded-full bg-[#F38B72]" style={{ width: `${barB}%` }} />
          </div>
          <span className="text-[10px] text-[#8a9379] w-10 text-right shrink-0">{friendLabel}</span>
        </div>
      </div>
    </div>
  );
}

function ArchetypeCard({ animal, roleLabel, niche, lang }) {
  return (
    <div className="flex-1 min-w-0 rounded-[18px] border border-[#e8ede4] bg-[#F6F8F4] p-4">
      <p className="text-[10px] uppercase tracking-widest text-[#8a9379] font-mono mb-2">
        {roleLabel}
      </p>
      <p className="text-sm font-bold text-[#23271d] truncate">
        {localizedField(animal, 'name', lang)}
      </p>
      <p className="text-[11px] font-mono text-[#8a9379] mt-0.5">{animal.code}</p>
      <p className="text-xs text-[#4E6B53] font-medium mt-2">
        {localizedField(animal, 'personalityName', lang)}
      </p>
      <p className="text-xs text-[#5f6a52] leading-relaxed mt-2 line-clamp-3 italic">
        「{localizedField(animal, 'quote', lang)}」
      </p>
      <div className="mt-3 pt-3 border-t border-[#e4e9dd]">
        <p className="text-[10px] text-[#8a9379] uppercase tracking-wide mb-1">{niche.label}</p>
        <p className="text-xs text-[#5f6a52] leading-relaxed">{niche.value}</p>
      </div>
    </div>
  );
}

export default function MatchResult() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language, pickAnimal } = useI18n();
  const [displayRate, setDisplayRate] = useState(0);

  const session = useMemo(() => {
    const mineId = searchParams.get('mine');
    const friendId = searchParams.get('friend');
    if (
      mineId &&
      friendId &&
      animalsMap[mineId] &&
      animalsMap[friendId] &&
      mineId !== friendId
    ) {
      return { mineId, friendId };
    }
    return loadMatchSession();
  }, [searchParams]);

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
        className="relative px-6 pt-12 pb-14 md:pt-14 md:pb-16 text-white text-center shrink-0"
        style={{
          minHeight: 380,
          background: `linear-gradient(165deg, #2e4738 0%, ${PRIMARY} 50%, #3a5644 100%)`,
        }}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle variant="dark" />
        </div>

        <p className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/45 font-mono mb-4">
          {t('match.resultArchiveBadge')}
        </p>
        <p className="inline-block text-[11px] md:text-xs px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 font-mono tracking-wide mb-6">
          {result.ecology.pathLabel}
        </p>

        <div className="flex items-center justify-center gap-5 md:gap-10 max-w-lg mx-auto">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <AnimalAvatar code={mineAnimal.code} size="xl" variant="dark" />
            <p className="text-base md:text-lg font-bold mt-3 truncate max-w-full">
              {localizedField(mineAnimal, 'name', language)}
            </p>
          </div>

          <div className="flex flex-col items-center shrink-0 px-1">
            <motion.span
              className="text-6xl md:text-7xl font-bold font-num leading-none"
              style={{ color: ACCENT }}
            >
              {displayRate}
            </motion.span>
            <span className="text-xs text-white/50 uppercase tracking-widest mt-2">
              {t('match.compatLabel')}
            </span>
          </div>

          <div className="flex flex-col items-center flex-1 min-w-0">
            <AnimalAvatar code={friendAnimal.code} size="xl" variant="dark" />
            <p className="text-base md:text-lg font-bold mt-3 truncate max-w-full">
              {localizedField(friendAnimal, 'name', language)}
            </p>
          </div>
        </div>

        <motion.h1
          {...fadeUp(0.25)}
          className="text-xl md:text-2xl font-bold mt-6 md:mt-8 leading-snug"
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
        {/* 生态路径 */}
        <motion.section
          {...fadeUp(0.42)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-base font-bold text-[#23271d] mb-2">{t('match.pathTitle')}</h2>
          <p className="text-sm text-[#5f6a52] leading-relaxed mb-4">{result.ecology.pathHint}</p>
          {result.ecology.path === 'predator_prey' && result.ecology.hunterName && (
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#2e4738] text-white">
                {t('match.roleHunter')} · {result.ecology.hunterName}
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-[#eef3ea] text-[#4E6B53] border border-[#dce6d6]">
                {t('match.rolePrey')} · {result.ecology.preyName}
              </span>
            </div>
          )}
        </motion.section>

        {/* 双方原型 */}
        <motion.section
          {...fadeUp(0.48)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-base font-bold text-[#23271d] mb-4">{t('match.archetypeTitle')}</h2>
          <div className="flex gap-3">
            <ArchetypeCard
              animal={mineAnimal}
              roleLabel={t('match.archetypeMine')}
              niche={{ label: t('match.nicheLabel'), value: result.ecology.nicheA }}
              lang={language}
            />
            <ArchetypeCard
              animal={friendAnimal}
              roleLabel={t('match.archetypeFriend')}
              niche={{ label: t('match.nicheLabel'), value: result.ecology.nicheB }}
              lang={language}
            />
          </div>
        </motion.section>

        {/* 关系概览 */}
        <motion.section
          {...fadeUp(0.54)}
          className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
        >
          <h2 className="text-base font-bold text-[#23271d] mb-3">{t('match.overviewTitle')}</h2>
          <p className="text-[15px] text-[#4E6B53] leading-[1.75] font-medium">
            {result.desc}
          </p>
        </motion.section>

        {/* 核心维度对比 */}
        {result.dimensions.length > 0 && (
          <motion.section
            {...fadeUp(0.6)}
            className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]"
          >
            <h2 className="text-base font-bold text-[#23271d] mb-1">{t('match.dimTitle')}</h2>
            <p className="text-xs text-[#8a9379] mb-3">{t('match.dimSubtitle')}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.dimensionSummary.aligned > 0 && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#eef3ea] text-[#4E6B53]">
                  {t('match.dimAligned', { count: result.dimensionSummary.aligned })}
                </span>
              )}
              {result.dimensionSummary.divergent > 0 && (
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#fde8e2] text-[#c4663f]">
                  {t('match.dimDivergent', { count: result.dimensionSummary.divergent })}
                </span>
              )}
            </div>
            <div>
              {result.dimensions.map((dim) => (
                <DimensionRow
                  key={dim.id}
                  dim={dim}
                  mineLabel={t('match.dimLegendMine')}
                  friendLabel={t('match.dimLegendFriend')}
                  gapText={t(dim.gap >= 0.7 ? 'match.dimGapLarge' : 'match.dimGapSmall')}
                />
              ))}
            </div>
          </motion.section>
        )}

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
              nameA: localizedField(mineAnimal, 'name', language),
              nameB: localizedField(friendAnimal, 'name', language),
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
