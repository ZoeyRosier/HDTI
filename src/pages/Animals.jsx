import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { baseAnimals, animals } from '../data/animals';
import { animalIconSrc } from '../utils/animalIcon';
import { animalGradients, getIucnStyle, getAnimalIconConfig } from '../utils/galleryMeta';
import { useI18n, LangToggle } from '../i18n';

const eggAnimals = animals.filter((a) => a.isEgg);

export default function Animals() {
  const navigate = useNavigate();
  const { t, pickAnimal } = useI18n();

  return (
    <div
      className="min-h-dvh pb-10"
      style={{
        background:
          'radial-gradient(120% 50% at 50% 0%, #f8faf5 0%, #eef3ea 60%, #e9efe2 100%)',
      }}
    >
      <div className="w-full max-w-[430px] md:max-w-[720px] lg:max-w-[980px] mx-auto px-4 md:px-6 lg:px-[30px] pt-3.5">
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle />
        </div>

        {/* Top bar */}
        <div className="flex items-center mb-5 mt-1 px-0.5">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="w-8 h-8 rounded-[10px] bg-bg-card border border-border flex items-center justify-center text-[15px] shadow-[0_2px_8px_rgba(50,65,35,.05)] cursor-pointer hover:bg-bg-tag transition-colors"
              aria-label={t('common.back')}
            >
              ←
            </button>
            <span className="font-black text-[17px] text-text-heading">
              {t('gallery.title')}
            </span>
          </div>
        </div>

        {/* Base section */}
        <div className="flex items-baseline gap-2.5 mb-3.5 px-0.5">
          <span className="font-black text-base text-text-heading">
            {t('gallery.baseTitle')}
          </span>
          <span className="font-mono text-[10px] text-text-tertiary tracking-wider">
            {t('gallery.baseSubtitle')}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[13px] md:gap-4 lg:gap-[18px]">
          {baseAnimals.map((raw, i) => {
            const animal = pickAnimal(raw);
            const iucn = getIucnStyle(raw.conservationStatus);
            const grad = animalGradients[raw.id] ?? animalGradients.snow_leopard;
            const iconCfg = getAnimalIconConfig(raw.id);

            return (
              <motion.button
                key={raw.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => navigate(`/animals/${raw.id}`)}
                className="text-left bg-bg-card rounded-[18px] overflow-hidden shadow-[0_6px_18px_rgba(50,65,35,.07)] cursor-pointer transition-[transform,box-shadow] duration-[180ms] hover:-translate-y-[3px] hover:shadow-[0_10px_24px_rgba(50,65,35,.1)]"
              >
                <div
                  className="relative aspect-square flex items-end justify-center pb-2.5 overflow-hidden"
                  style={{ background: grad }}
                >
                  <img
                    src={animalIconSrc(raw.code)}
                    alt=""
                    className="absolute inset-0 m-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,.25)]"
                    style={{
                      width: iconCfg.size,
                      height: iconCfg.size,
                      objectPosition: iconCfg.objectPosition ?? 'center',
                      transform: [
                        iconCfg.scale && `scale(${iconCfg.scale})`,
                        iconCfg.translateY && `translateY(${iconCfg.translateY})`,
                      ].filter(Boolean).join(' ') || undefined,
                    }}
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 text-[9.5px] font-extrabold px-2 py-0.5 rounded-xl ${iucn.bg} ${iucn.text}`}
                  >
                    {raw.conservationStatus}
                  </span>
                  <span className="relative font-mono text-sm font-bold tracking-wider text-white/95 drop-shadow-[0_1px_3px_rgba(0,0,0,.3)]">
                    {raw.code}
                  </span>
                </div>
                <div className="px-3 pt-2.5 pb-3">
                  <div className="font-extrabold text-base text-text-heading">{animal.name}</div>
                  <div className="text-xs text-text-muted mt-1 truncate">
                    {animal.tags.join(' · ')}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Egg teaser */}
        <div className="mt-[26px] bg-gradient-to-br from-[#fbf4ea] to-[#f6ecdc] border border-[#efe0cd] rounded-[20px] p-5 px-[18px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[17px]">🎁</span>
            <span className="font-black text-base text-[#8a5a2c]">
              {t('gallery.eggTitle')}
            </span>
          </div>
          <p className="text-[12.5px] text-[#a9854f] leading-relaxed mb-4">
            {t('gallery.eggDesc')}
          </p>
          <div className="grid grid-cols-5 gap-[9px]">
            {eggAnimals.map((egg) => (
              <div key={egg.id} className="text-center">
                <div className="aspect-square rounded-[15px] bg-gradient-to-br from-[#3c3a44] to-[#23222b] border-[1.5px] border-accent-warm shadow-[inset_0_-6px_12px_rgba(0,0,0,.3)] flex flex-col items-center justify-center gap-0.5">
                  <span className="text-[15px]">✦</span>
                  <span className="font-mono text-[9px] text-[#e0bd86]">{egg.code}</span>
                </div>
                <div className="text-[10px] text-[#b08a52] mt-1.5">？？？</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-2.5 mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-bg-card border border-border text-text-secondary py-3 px-2 rounded-button text-sm font-medium hover:border-primary-light transition-colors cursor-pointer whitespace-nowrap"
          >
            {t('gallery.backHome')}
          </button>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem('hdti_answers');
              localStorage.removeItem('hdti_answers_backup');
              navigate('/quiz');
            }}
            className="flex-[1.4] border-none cursor-pointer bg-primary text-white rounded-button py-3 px-2 font-extrabold text-sm shadow-[0_8px_18px_rgba(61,90,71,.28)] hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            {t('gallery.cta')}
          </button>
        </div>

        <p className="text-center mt-[22px] text-[11px] text-text-disabled leading-relaxed">
          {t('gallery.footer1')}
          <br />
          <span className="text-text-footer">{t('gallery.footer2')}</span>
        </p>
      </div>
    </div>
  );
}
