import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animals, animalsMap } from '../data/animals';
import { animalIconSrc } from '../utils/animalIcon';
import { vecToLabel, getDimensionDesc, calcMatchRate } from '../utils/scoring';
import { getGalleryHeroBg } from '../utils/galleryMeta';
import {
  getDimensionCategories,
  getDimensionLabel,
  dimensionsInCategory,
  getIucnLabel,
  getAnimalTheme,
  formatQuote,
} from '../utils/animalProfileMeta';
import ScienceCard from '../components/ScienceCard';
import { useI18n, LangToggle } from '../i18n';

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language, pickAnimal } = useI18n();

  const raw = animalsMap[id];
  const animal = raw ? pickAnimal(raw) : null;
  const isEggResult = Boolean(raw?.isEgg);
  const theme = raw ? getAnimalTheme(raw) : null;

  const scienceSource = raw?.reuseScienceFrom ? animalsMap[raw.reuseScienceFrom] : raw;
  const scienceAnimal = scienceSource ? pickAnimal(scienceSource) : null;
  const species = scienceAnimal?.species;

  useEffect(() => {
    if (!raw) navigate('/animals', { replace: true });
  }, [raw, navigate]);

  const similarAnimals = useMemo(() => {
    if (!raw?.vector) return [];
    return animals
      .filter((a) => a.id !== raw.id && a.vector)
      .map((a) => ({ ...a, match: calcMatchRate(raw.vector, a.vector) }))
      .sort((a, b) => b.match - a.match)
      .slice(0, 4);
  }, [raw]);

  if (!raw || !animal || !theme) return null;

  const heroBg = isEggResult ? theme.heroBg : getGalleryHeroBg(raw.id);

  const eggLabel =
    raw.eggType === 'hidden'
      ? t('result.eggHidden')
      : raw.eggType === 'extreme'
        ? t('result.eggExtreme')
        : raw.isEgg
          ? t('result.eggCombo')
          : null;

  return (
    <div className="min-h-dvh">
      {/* Hero — 与结果页同结构 */}
      <div
        className="min-h-dvh flex flex-col items-center justify-center relative px-4 py-10"
        style={{ background: heroBg }}
      >
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 py-4">
          <button
            type="button"
            onClick={() => navigate('/animals')}
            className="flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 cursor-pointer hover:bg-white/20 transition-colors"
          >
            <span className="text-xs text-white/60">{t('detail.backGallery')}</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50 tracking-wide hidden sm:inline">
              {t('detail.profileBadge')}
            </span>
            <LangToggle variant="dark" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          {isEggResult && eggLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block bg-white/15 text-white text-sm font-bold px-5 py-2 rounded-full border border-white/20">
                {eggLabel}
              </span>
            </motion.div>
          )}

          {!isEggResult && (
            <p className="font-mono text-[11px] text-white/50 tracking-[.15em] mb-6">
              {t('detail.profileMono')}
            </p>
          )}

          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] mx-auto mb-6">
            {isEggResult && theme.ringGradient && (
              <>
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{ background: theme.ringGradient, padding: '5px' }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: theme.heroBg }} />
                </div>
                <div
                  className="absolute inset-[-4px] rounded-full animate-[spin_4s_linear_infinite]"
                  style={{ background: theme.ringGradient, opacity: 0.85 }}
                />
                <div
                  className="absolute inset-[-4px] rounded-full blur-[6px]"
                  style={{ background: theme.ringGradient, opacity: 0.4 }}
                />
              </>
            )}
            <div
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-white/10"
              style={{ background: theme.circleBg }}
            >
              <img
                src={animalIconSrc(raw.code)}
                alt={animal.name}
                className="w-[80%] h-[80%] object-contain"
              />
            </div>
            <span className="absolute -top-1 right-4 text-lg">{isEggResult ? '🎉' : '❄️'}</span>
          </div>

          <h1
            className="text-[36px] md:text-[42px] font-black text-white mb-2 tracking-wide"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            {raw.code}
          </h1>

          <p className="text-base font-bold tracking-[.08em] mb-5" style={{ color: theme.accent }}>
            {animal.personalityName} · {animal.name}{language === 'zh' ? ` ${raw.nameEn?.toUpperCase?.()}` : ''}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {animal.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-white/90 font-medium px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-[15px] md:text-base text-white/75 leading-[1.9] mt-2 mb-8 italic whitespace-pre-line text-center">
            {formatQuote(animal.quote, language)}
          </p>

          <motion.button
            type="button"
            className="text-sm cursor-pointer bg-transparent border-0"
            style={{ color: theme.accent }}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            onClick={() => document.getElementById('animal-detail')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <p>{t('detail.scrollHint')}</p>
            <p className="mt-1">↓</p>
          </motion.button>
        </motion.div>
      </div>

      {/* Detail — 与结果页第二屏同结构 */}
      <div id="animal-detail" className="px-4 md:px-8 py-10" style={{ background: theme.sectionBg }}>
        <div className="max-w-[860px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[20px] p-6 border border-border"
            >
              <h3 className="text-base font-black text-text-heading mb-4 flex items-center gap-2">
                <span className="w-1 h-4 rounded-full" style={{ background: theme.headingColor }} />
                {t('detail.archetype')}
              </h3>
              <p className="text-[13.5px] text-text-body leading-[1.85] whitespace-pre-line">
                {animal.personalityDesc}
              </p>
            </motion.div>

            <div className="space-y-3">
              {species && (
                <>
                  <ScienceCard
                    emoji="🏔"
                    title={t('result.speciesProfile')}
                    subtitle="SPECIES FILE"
                    content={species.habitat}
                    defaultOpen
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="🧗"
                    title={t('result.survivalSkill')}
                    subtitle="SURVIVAL SKILLS"
                    content={species.skill}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="💡"
                    title={t('result.funFact')}
                    subtitle="DID YOU KNOW"
                    content={species.funFact}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="🚨"
                    title={t('result.conservation')}
                    subtitle="STATUS"
                    content={species.statusDesc}
                    badge={`${raw.conservationStatus} · ${getIucnLabel(raw.conservationStatus, language)}`}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                    defaultOpen
                  />
                </>
              )}
            </div>
          </div>

          {raw.iucnUrl && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-white rounded-[18px] border border-border p-5"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-[10px] bg-[#e8f5e9] flex items-center justify-center text-lg flex-none">🔗</span>
                <div className="flex-1 min-w-0">
                  <a
                    href={raw.iucnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-bold text-text-heading leading-snug hover:text-primary transition-colors cursor-pointer"
                  >
                    {(species?.iucnHook || t('result.iucnLink')).replace(/ →$/, ' ➡️')}
                  </a>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5 truncate" title={raw.iucnUrl}>
                    {raw.iucnUrl}
                  </p>
                </div>
                <a
                  href={raw.iucnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-lg hover:translate-x-1 transition-transform flex-none"
                >
                  →
                </a>
              </div>
            </motion.div>
          )}

          {animal.vector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-white rounded-[20px] border border-border p-6"
            >
              <h3 className="text-lg font-black text-text-heading mb-1">{t('detail.dimTitle')}</h3>
              <p className="text-[11px] text-text-muted font-mono tracking-wide mb-5">
                {t('detail.dimSubtitle')}
              </p>
              {(() => {
                const labels = vecToLabel(animal.vector);
                const categories = getDimensionCategories(language);
                return categories.map((cat) => (
                  <div key={cat} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px] font-bold" style={{ color: theme.headingColor }}>
                        {cat}
                      </span>
                      <div className="flex-1 h-px" style={{ background: theme.dividerColor }} />
                    </div>
                    <div className="space-y-4">
                      {dimensionsInCategory(cat, language).map((dim) => {
                        const level = labels[dim.id];
                        const desc = getDimensionDesc(dim.id, animal.vector[dim.id], language);
                        const badgeRgb = isEggResult ? theme.badgeRgb : '34,120,60';
                        const badgeBg =
                          level === 'H'
                            ? `rgba(${badgeRgb},0.22)`
                            : level === 'M'
                              ? `rgba(${badgeRgb},0.13)`
                              : `rgba(${badgeRgb},0.06)`;
                        return (
                          <div key={dim.id}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[13px] font-bold text-text-heading">
                                {dim.code} {getDimensionLabel(dim, language)}
                              </span>
                              <span
                                className="text-[11px] font-bold px-1.5 py-[1px] rounded-[4px] inline-flex items-center justify-center"
                                style={{ background: badgeBg, color: theme.headingColor }}
                              >
                                {level}
                              </span>
                            </div>
                            <p className="text-[12.5px] text-text-muted leading-relaxed pl-0.5">{desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ));
              })()}
            </motion.div>
          )}

          {similarAnimals.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-[20px] border p-6 bg-white"
              style={{ borderColor: isEggResult ? theme.dividerColor : undefined }}
            >
              <h3 className="text-lg font-black mb-1" style={{ color: theme.headingColor }}>
                {t('detail.similarTitle')}
              </h3>
              <p
                className="text-[11px] font-mono tracking-wide mb-5"
                style={{ color: isEggResult ? theme.accent : '#8a9379' }}
              >
                {t('detail.similarSubtitle')}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {similarAnimals.map((a) => {
                  const la = pickAnimal(a);
                  return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => navigate(`/animals/${a.id}`)}
                    className="flex flex-col items-center text-center p-3 rounded-[14px] border transition-colors cursor-pointer hover:border-primary-light"
                    style={{ borderColor: isEggResult ? theme.dividerColor : undefined }}
                  >
                    <div className="text-[11px] mb-1 text-text-muted">{la.name}</div>
                    <img
                      src={animalIconSrc(a.code)}
                      alt={la.name}
                      className="w-12 h-12 object-contain mb-2"
                    />
                    <div className="font-mono text-sm font-black" style={{ color: theme.headingColor }}>
                      {a.code}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>
                      {la.personalityName}
                    </div>
                  </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          <div className="mt-8 max-w-md mx-auto flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/animals')}
              className="flex-1 bg-white border border-border text-text-secondary py-3.5 rounded-[18px] text-sm font-medium hover:border-primary-light transition-colors cursor-pointer"
            >
              {t('detail.backGallery')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/match')}
              className="flex-1 py-3.5 rounded-[18px] text-sm text-white font-medium cursor-pointer hover:opacity-90 transition-opacity"
              style={{ background: theme.headingColor }}
            >
              {t('detail.match')}
            </button>
          </div>

          <div className="text-center mt-8 text-[11px] text-text-tertiary leading-[1.7]">
            {t('gallery.footer1')}
            <br />
            <span className="text-text-muted">{t('gallery.footer2')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
