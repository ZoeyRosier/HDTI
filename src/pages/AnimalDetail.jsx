import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animalsMap } from '../data/animals';
import { animalIconSrc } from '../utils/animalIcon';
import { animalGradients, getIucnStyle } from '../utils/galleryMeta';
import { useI18n, LangToggle } from '../i18n';

const DETAIL_DIMS = [
  { id: 0, code: 'D1', name: '探索倾向' },
  { id: 1, code: 'D2', name: '应激反应' },
  { id: 2, code: 'D3', name: '同伴依赖' },
  { id: 3, code: 'D4', name: '连接主动性' },
  { id: 4, code: 'D5', name: '活动性' },
  { id: 5, code: 'D6', name: '资源竞争' },
  { id: 6, code: 'D7', name: '探索开放' },
];

export default function AnimalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language, pickAnimal } = useI18n();

  const raw = animalsMap[id];
  const animal = useMemo(
    () => (raw ? pickAnimal(raw) : null),
    [raw, language, pickAnimal],
  );

  const scienceSource = raw?.reuseScienceFrom ? animalsMap[raw.reuseScienceFrom] : raw;
  const scienceAnimal = useMemo(
    () => (scienceSource ? pickAnimal(scienceSource) : null),
    [scienceSource, language, pickAnimal],
  );
  const species = scienceAnimal?.species;

  useEffect(() => {
    if (!raw) navigate('/animals', { replace: true });
  }, [raw, navigate]);

  if (!raw || !animal) return null;

  const iucn = getIucnStyle(raw.conservationStatus);
  const grad = animalGradients[raw.id] ?? animalGradients.snow_leopard;

  const eggLabel = raw.eggType === 'hidden'
    ? t('result.eggHidden')
    : raw.eggType === 'extreme'
    ? t('result.eggExtreme')
    : raw.isEgg
    ? t('result.eggCombo')
    : null;

  return (
    <div className="min-h-dvh bg-bg-page">
      {/* Hero */}
      <div
        className="relative px-6 pt-12 pb-8 text-white"
        style={{ background: grad }}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle variant="dark" />
        </div>

        <button
          type="button"
          onClick={() => navigate('/animals')}
          className="absolute top-3 left-3 md:top-4 md:left-4 w-8 h-8 rounded-[10px] bg-white/15 border border-white/20 flex items-center justify-center text-[15px] cursor-pointer hover:bg-white/25 transition-colors"
          aria-label={t('detail.backGallery')}
        >
          ←
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto text-center pt-6"
        >
          {eggLabel && (
            <span className="inline-block bg-accent-warm/30 text-accent-warm text-xs px-3 py-1 rounded-full mb-3">
              {eggLabel}
            </span>
          )}

          <div className="w-40 h-40 mx-auto mb-4 flex items-center justify-center">
            <img
              src={animalIconSrc(raw.code)}
              alt=""
              className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,.35)]"
            />
          </div>

          <h1 className="text-2xl font-bold mb-1">{animal.personalityName}</h1>
          <p className="font-mono text-sm tracking-widest text-white/80 mb-3">
            {raw.code} · {animal.name}
          </p>

          <span
            className={`inline-block text-[10px] font-extrabold px-2.5 py-1 rounded-xl ${iucn.bg} ${iucn.text}`}
          >
            IUCN · {raw.conservationStatus}
          </span>

          <div className="flex flex-wrap justify-center gap-2 mt-4 mb-4">
            {animal.tags.map((tag) => (
              <span
                key={tag}
                className="bg-white/15 text-white/90 text-xs px-2.5 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-base italic text-white/90">
            {t('result.quote', { quote: animal.quote })}
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h3 className="text-sm font-medium text-text-muted mb-3">
              {t('detail.archetype')}
            </h3>
            <p className="text-text-heading text-sm leading-relaxed whitespace-pre-line">
              {animal.personalityDesc}
            </p>
          </div>

          {animal.wildPopulation && !animal.wildPopulation.startsWith('【') && animal.wildPopulation !== 'TBD' && (
            <div className="rounded-2xl p-5 border border-[#f0c8b8] text-center" style={{ background: 'linear-gradient(135deg, #fdf2ed 0%, #fce8e0 100%)' }}>
              <p className="text-[#9a3c20] text-sm font-medium">
                {t('result.statsWild', { population: animal.wildPopulation })}
              </p>
            </div>
          )}

          {species && (
            <div className="space-y-3">
              <ScienceCard emoji="🏔" title={t('result.speciesProfile')} content={species.habitat} />
              <ScienceCard emoji="🧗" title={t('result.survivalSkill')} content={species.skill} />
              <ScienceCard emoji="💡" title={t('result.funFact')} content={species.funFact} defaultOpen />
              <ScienceCard
                emoji="🚨"
                title={t('result.conservation')}
                content={species.statusDesc}
                badge={raw.conservationStatus}
              />
            </div>
          )}

          {raw.iucnUrl && (
            <a
              href={raw.iucnUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs text-primary hover:text-primary-dark transition-colors"
            >
              {t('result.iucnLink')}
            </a>
          )}

          {/* 7维度标准画像 */}
          {raw.vector && (
            <div className="bg-bg-card rounded-2xl p-5 border border-border">
              <h3 className="text-sm font-bold text-text-heading mb-1">
                {t('detail.dimTitle')}
              </h3>
              <p className="text-[11px] text-text-muted font-mono tracking-wide mb-4">
                {t('detail.dimSub')}
              </p>
              <div className="space-y-3">
                {DETAIL_DIMS.map((dim) => {
                  const val = raw.vector[dim.id];
                  const lbl = val <= 1 ? 'L' : val >= 3 ? 'H' : 'M';
                  const pct = Math.round(((val - 1) / 2) * 100);
                  return (
                    <div key={dim.id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-text-heading">{dim.code} {dim.name}</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                          style={{
                            background: lbl === 'H' ? 'rgba(61,90,71,0.15)' : lbl === 'L' ? 'rgba(61,90,71,0.05)' : 'rgba(61,90,71,0.08)',
                            color: '#3D5A47',
                          }}
                        >
                          {lbl}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#e8ede4] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary/60"
                          style={{ width: `${Math.max(10, pct)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/animals')}
              className="flex-1 bg-bg-card border border-border text-text-secondary py-3 rounded-button text-sm hover:border-primary-light transition-colors cursor-pointer"
            >
              {t('detail.backGallery')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/match')}
              className="flex-1 bg-primary text-white py-3 rounded-button text-sm font-medium hover:bg-primary-dark transition-colors cursor-pointer"
            >
              {t('detail.match')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScienceCard({ emoji, title, content, badge, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  if (!content || content.startsWith('【') || content.includes('coming soon')) {
    return null;
  }

  return (
    <div className="bg-bg-card rounded-xl border border-border overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-text-heading">
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
            <div className="px-4 pb-4 text-sm text-text-body leading-relaxed whitespace-pre-line">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
