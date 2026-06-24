import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animalsMap, animals } from '../data/animals';
import { calculateResult, vecToLabel, getDimensionDesc, calcMatchRate } from '../utils/scoring';
import { readResultFromUrl, shareResult } from '../utils/share';
import { incrementAnimalCount, getAllCounts } from '../utils/supabase';
import { generatePoster } from '../utils/poster';
import { animalIconSrc } from '../utils/animalIcon';
import {
  getAnimalTheme,
  getDimensionCategories,
  getDimensionLabel,
  dimensionsInCategory,
  getIucnLabel,
  formatQuote,
  formatWildPopulation,
  getRarityLabel,
} from '../utils/animalProfileMeta';
import ScienceCard from '../components/ScienceCard';
import { useI18n, LangToggle } from '../i18n';

/** 获取动物高清原图路径 */
function getAnimalIcon(code) {
  return animalIconSrc(code);
}

export default function Result() {
  const navigate = useNavigate();
  const { t, language, pickAnimal } = useI18n();
  const [stats, setStats] = useState(null);
  const [copyToast, setCopyToast] = useState(false);
  const [posterUrl, setPosterUrl] = useState(null);
  const [posterLoading, setPosterLoading] = useState(false);

  const [resultData] = useState(() => {
    const urlResult = readResultFromUrl();
    if (urlResult) {
      const animal = animalsMap[urlResult.animalId];
      if (animal) {
        return { animal, matchRate: urlResult.matchRate, isSharedView: true, isPreview: urlResult.isPreview };
      }
    }

    const answersStr = sessionStorage.getItem('hdti_answers');
    if (answersStr) {
      try {
        const answers = JSON.parse(answersStr);
        if (Object.keys(answers).length === 16) {
          const { result, isEgg, eggType, matchRate, userVec } = calculateResult(answers);
          const animal = animalsMap[result];
          if (!animal) return null;
          return { animal, matchRate, isSharedView: false, isEgg, eggType, userVec };
        }
      } catch (e) {
        return null;
      }
    }

    return null;
  });

  useEffect(() => {
    if (!resultData) {
      navigate('/');
      return;
    }

    // 预览模式不计数、不加载统计
    if (resultData.isPreview) return;

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
                myCount: animalCount,
                total,
                percentage: total > 0 ? (animalCount / total * 100).toFixed(1) : null
              });
            }
          });
        }
      });
    } else {
      // shared view 也加载稀有度数据
      getAllCounts().then(allCounts => {
        if (allCounts) {
          const total = allCounts.reduce((sum, row) => sum + row.count, 0);
          const animalCount = allCounts.find(r => r.animal_id === resultData.animal.id)?.count || 0;
          setStats({
            myCount: animalCount,
            total,
            percentage: total > 0 ? (animalCount / total * 100).toFixed(1) : null
          });
        }
      });
    }
  }, [resultData, navigate]);

  if (!resultData) return null;

  const { animal: rawAnimal, matchRate, isSharedView, isEgg, userVec, isPreview } = resultData;
  const animal = pickAnimal(rawAnimal);
  const isEggResult = rawAnimal.isEgg;
  const theme = getAnimalTheme(rawAnimal);
  const ringGradient = theme.ringGradient;

  const scienceSource = rawAnimal.reuseScienceFrom ? animalsMap[rawAnimal.reuseScienceFrom] : rawAnimal;
  const scienceAnimal = pickAnimal(scienceSource);
  const species = scienceAnimal?.species;
  const wildPop = formatWildPopulation(animal.wildPopulation, language);
  const badgeLabel = isPreview
    ? t('result.badgePreview')
    : isEggResult
      ? t('result.badgeEgg')
      : t('result.badgeResult');

  async function handleShare() {
    setPosterLoading(true);
    try {
      const homeUrl = `${window.location.origin}/`;
      const url = await generatePoster({ animal, matchRate, homeUrl, stats });
      setPosterUrl(url);
    } catch (e) {
      console.error('海报生成失败', e);
      // 降级为文字分享
      const result = await shareResult(animal.name, animal.code, matchRate, animal.id);
      if (result.method === 'clipboard') {
        setCopyToast(true);
        setTimeout(() => setCopyToast(false), 2000);
      }
    } finally {
      setPosterLoading(false);
    }
  }

  function handleDownloadPoster() {
    if (!posterUrl) return;
    const a = document.createElement('a');
    a.href = posterUrl;
    a.download = `HDTI_${animal.code}_海报.png`;
    a.click();
  }

  return (
    <div className="min-h-dvh">
      {/* ========== 第一屏：英雄区 ========== */}
      <div className="min-h-dvh flex flex-col items-center justify-center relative px-4 py-10" style={{ background: theme.heroBg }}>

        {/* 顶部导航 */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-5 py-4">
          <div className="flex items-center gap-2 bg-white/10 rounded-full px-3.5 py-1.5 cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/')}>
            <span className="text-sm">🐾</span>
            <span className="font-mono text-xs text-white/90 tracking-wide">HDTI</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-xs text-white/60">{t('result.navHome')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-white/50 tracking-wide hidden sm:inline">
              {badgeLabel}
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
          {/* 彩蛋提示 */}
          {isEggResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block bg-white/15 text-white text-sm font-bold px-5 py-2 rounded-full border border-white/20">
                {t('result.eggCelebrate')}
              </span>
              {stats && stats.percentage && (
                <p className="font-mono text-[11px] text-white/50 tracking-[.15em] mt-3">
                  {t('result.eggRareMono', { percent: stats.percentage })}
                </p>
              )}
            </motion.div>
          )}

          {/* 副标题 */}
          {!isEggResult && (
            <p className="font-mono text-[11px] text-white/50 tracking-[.15em] mb-6">
              {t('result.heroMono')}
            </p>
          )}

          {/* 动物大图 */}
          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] mx-auto mb-6">
            {isEggResult && (
              <>
                {/* 最外层：实体渐变边框环 */}
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{ background: ringGradient, padding: '5px' }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: theme.heroBg }} />
                </div>
                {/* 旋转光效层 */}
                <div
                  className="absolute inset-[-4px] rounded-full animate-[spin_4s_linear_infinite]"
                  style={{ background: ringGradient, opacity: 0.85 }}
                />
                {/* 模糊辉光层 */}
                <div
                  className="absolute inset-[-4px] rounded-full blur-[6px]"
                  style={{ background: ringGradient, opacity: 0.4 }}
                />
              </>
            )}
            <div
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center border border-white/10"
              style={{ background: theme.circleBg }}
            >
              <img
                src={getAnimalIcon(animal.code)}
                alt={animal.name}
                className="w-[80%] h-[80%] object-contain"
              />
            </div>
            {/* 装饰元素 */}
            {isEggResult ? (
              <span className="absolute -top-1 right-4 text-xl">🎉</span>
            ) : (
              <span className="absolute -top-1 right-4 text-lg">❄️</span>
            )}
          </div>

          {/* 大标题：动物代号 */}
          <h1 className="text-[36px] md:text-[42px] font-black text-white mb-2 tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {animal.code}
          </h1>

          {/* 副标题：中文人格名 + 动物名（加粗+绿色系） */}
          <p className="text-base font-bold tracking-[.08em] mb-5" style={{ color: theme.accent }}>
            {animal.personalityName} · {animal.name}{language === 'zh' ? ` ${rawAnimal.nameEn?.toUpperCase?.()}` : ''}
          </p>

          {/* 标签（带背景色） */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {animal.tags.map(tag => (
              <span
                key={tag}
                className="text-xs text-white/90 font-medium px-3.5 py-1.5 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)' }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 匹配度 */}
          {!isPreview && (
          <div className="mb-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-white/70">{t('result.matchWith', { name: animal.name })}</span>
              <span className="font-num text-[28px] font-extrabold text-white">
                {matchRate}<span className="text-base text-white/70">%</span>
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <motion.div
                className="h-full rounded-full"
                style={{ background: theme.barFill }}
                initial={{ width: 0 }}
                animate={{ width: `${matchRate}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </div>
          </div>
          )}

          {/* 稀有度 */}
          {!isPreview && stats && stats.percentage && (
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
              <span className="text-sm">{isEggResult ? '🏆' : '🌿'}</span>
              <span className="text-xs text-white/80" dangerouslySetInnerHTML={{
                __html: t('result.rarityPeople', {
                  percent: stats.percentage,
                  name: animal.name,
                  label: getRarityLabel(parseFloat(stats.percentage), t),
                }),
              }} />
            </div>
          )}

          {/* 金句 */}
          <p className="text-[15px] md:text-base text-white/75 leading-[1.9] mt-2 mb-8 italic whitespace-pre-line text-center">
            {formatQuote(animal.quote, language)}
          </p>

          {/* 下滑提示（可点击） */}
          <motion.div
            className="text-sm cursor-pointer"
            style={{ color: theme.accent }}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            onClick={() => document.getElementById('result-detail')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <p>{t('result.scrollHint')}</p>
            <p className="mt-1">↓</p>
          </motion.div>
        </motion.div>
      </div>

      {/* ========== 第二屏：详情区 ========== */}
      <div
        id="result-detail"
        className="px-4 md:px-8 py-10"
        style={{ background: theme.sectionBg }}
      >
        <div className="max-w-[860px] mx-auto">

          {/* 双栏布局（桌面端） */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* 左栏 */}
            <div className="space-y-5">
              {/* 数据对比卡 */}
              {!isPreview && stats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-[20px] p-6 border border-border"
                >
                  <p className="text-center text-xs text-text-muted mb-4 tracking-wide" dangerouslySetInnerHTML={{ __html: t('result.contrastTitle') }} />
                  <div className="flex items-center">
                    <div className="flex-1 text-center">
                      <div className="font-num text-[28px] font-extrabold text-text-heading">
                        {stats.myCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {t('result.peopleGot', { name: animal.name })}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="flex-1 text-center">
                      <div className="font-num text-[28px] font-extrabold" style={{ color: theme.wildNumColor }}>
                        {wildPop.number}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {wildPop.label}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 bg-bg-tag rounded-[14px] px-4 py-3 text-center">
                    <p
                      className="text-[13px] text-text-body leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: t('result.contrastEmotional', {
                          name: animal.name.replace(/[「「].+[」」]/g, ''),
                        }),
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* 人格解读 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-[20px] p-6 border border-border"
              >
                <h3 className="text-base font-black text-text-heading mb-4 flex items-center gap-2">
                  <span className="w-1 h-4 rounded-full" style={{ background: theme.headingColor }} />
                  {t('result.archetype')}
                </h3>
                <p className="text-[13.5px] text-text-body leading-[1.85] whitespace-pre-line">
                  {animal.personalityDesc}
                </p>
              </motion.div>
            </div>

            {/* 右栏：科普卡片 */}
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
                    badge={`${rawAnimal.conservationStatus} · ${getIucnLabel(rawAnimal.conservationStatus, language)}`}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                    defaultOpen
                  />
                </>
              )}
            </div>
          </div>

          {/* IUCN 权威信源入口 */}
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
                  href={rawAnimal.iucnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-text-heading leading-snug hover:text-primary transition-colors cursor-pointer"
                >
                  {(species?.iucnHook || t('result.iucnMore', { name: animal.name })).replace(/ →$/, ' ➡️')}
                </a>
                <p
                  className="text-[11px] text-text-muted font-mono mt-0.5 cursor-pointer hover:text-primary transition-colors truncate"
                  title="点击复制链接"
                  onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(rawAnimal.iucnUrl); setCopyToast(true); setTimeout(() => setCopyToast(false), 2000); }}
                >
                  {rawAnimal.iucnUrl}
                </p>
              </div>
              <a
                href={animal.iucnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-lg hover:translate-x-1 transition-transform flex-none"
              >→</a>
            </div>
          </motion.div>

          {/* 7维度画像 */}
          {(userVec || rawAnimal.vector) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-white rounded-[20px] border border-border p-6"
            >
              <h3 className="text-lg font-black text-text-heading mb-1">{t('result.dimTitle')}</h3>
              <p className="text-[11px] text-text-muted font-mono tracking-wide mb-5">
                {isPreview ? t('detail.dimSubtitle') : t('result.dimSubtitleUser')}
              </p>

              {(() => {
                const displayVec = isPreview ? rawAnimal.vector : (userVec || rawAnimal.vector);
                const labels = vecToLabel(displayVec);
                const categories = getDimensionCategories(language);
                return categories.map(cat => (
                  <div key={cat} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px] font-bold" style={{ color: theme.headingColor }}>{cat}</span>
                      <div className="flex-1 h-px" style={{ background: theme.dividerColor }} />
                    </div>
                    <div className="space-y-4">
                      {dimensionsInCategory(cat, language).map(dim => {
                        const level = labels[dim.id];
                        const desc = getDimensionDesc(dim.id, displayVec[dim.id], language);
                        const badgeRgb = isEggResult ? theme.badgeRgb : '34,120,60';
                        const badgeBg = level === 'H' ? `rgba(${badgeRgb},0.22)`
                          : level === 'M' ? `rgba(${badgeRgb},0.13)`
                          : `rgba(${badgeRgb},0.06)`;
                        const barPct = Math.max(10, Math.round(((displayVec[dim.id] - 1) / 2) * 100));
                        const barOpacity = 0.2 + (barPct / 100) * 0.6;
                        return (
                          <div key={dim.id}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[13px] font-bold text-text-heading">{dim.code} {getDimensionLabel(dim, language)}</span>
                              <span
                                className="text-[11px] font-bold px-1.5 py-[1px] rounded-[4px] inline-flex items-center justify-center"
                                style={{ background: badgeBg, color: theme.headingColor }}
                              >
                                {level}
                              </span>
                            </div>
                            {!isPreview && (
                            <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background: `rgba(${badgeRgb},0.08)` }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: `rgba(${badgeRgb},${barOpacity})` }}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${barPct}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: dim.id * 0.05 }}
                              />
                            </div>
                            )}
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

          {/* 相似动物人格 */}
          {rawAnimal.vector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-[20px] border p-6"
              style={{ background: isEggResult ? theme.sectionBg : '#ffffff', borderColor: isEggResult ? theme.dividerColor : undefined }}
            >
              <h3 className="text-lg font-black mb-1" style={{ color: theme.headingColor }}>{t('result.similarTitle')}</h3>
              <p className="text-[11px] font-mono tracking-wide mb-5" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>{t('result.similarSubtitle')}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(() => {
                  const currentVec = rawAnimal.vector;
                  const similar = animals
                    .filter(a => a.id !== rawAnimal.id && a.vector)
                    .map(a => ({ raw: a, localized: pickAnimal(a), match: calcMatchRate(currentVec, a.vector) }))
                    .sort((a, b) => b.match - a.match)
                    .slice(0, 4);
                  return similar.map(({ raw: a, localized: la }) => (
                    <div
                      key={a.id}
                      className="flex flex-col items-center text-center p-3 rounded-[14px] border transition-colors cursor-pointer"
                      style={{ borderColor: isEggResult ? theme.dividerColor : undefined, background: isEggResult ? '#ffffff' : undefined }}
                      onClick={() => navigate(`/animals/${a.id}`)}
                    >
                      <div className="text-[11px] mb-1" style={{ color: isEggResult ? theme.headingColor : '#8a9379' }}>{la.name}</div>
                      <img
                        src={`/animals_icon/${a.code.replace('?', '')}.png`}
                        alt={la.name}
                        className="w-12 h-12 object-contain mb-2"
                      />
                      <div className="font-mono text-sm font-black" style={{ color: theme.headingColor }}>{a.code}</div>
                      <div className="text-xs mt-0.5" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>{la.personalityName}</div>
                    </div>
                  ));
                })()}
              </div>
            </motion.div>
          )}

          {/* 操作按钮 */}
          <div className="mt-8 max-w-md mx-auto space-y-3">
            {isPreview ? (
              <button
                onClick={() => { sessionStorage.removeItem('hdti_answers'); navigate('/quiz'); }}
                className="w-full py-4 rounded-[18px] text-white font-bold text-base cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: theme.posterBg }}
              >
                {t('result.previewCta')}
              </button>
            ) : (
              <>
                <button
                  onClick={handleShare}
                  disabled={posterLoading}
                  className="w-full py-4 rounded-[18px] text-white font-bold text-base cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-wait"
                  style={{ background: theme.posterBg }}
                >
                  {posterLoading ? t('result.posterLoading') : `🎴 ${isEggResult ? t('result.posterBtnEgg') : t('result.posterBtn')}`}
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => { sessionStorage.removeItem('hdti_answers'); navigate('/quiz'); }}
                    className="flex-1 bg-white border border-border text-text-secondary py-3.5 rounded-[18px] text-sm font-medium hover:border-primary-light transition-colors cursor-pointer"
                  >
                    {t('result.retake')}
                  </button>
                  <button
                    onClick={() => navigate('/animals')}
                    className="flex-1 bg-white border border-border text-text-secondary py-3.5 rounded-[18px] text-sm font-medium hover:border-primary-light transition-colors cursor-pointer"
                  >
                    {t('result.exploreAnimals')}
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="text-center mt-8 text-[11px] text-text-tertiary leading-[1.7]">
            {t('gallery.footer1')}<br />
            <span className="text-text-muted">{t('result.footerTagline')}</span>
          </div>
        </div>
      </div>

      {/* 海报预览弹窗 */}
      <AnimatePresence>
        {posterUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setPosterUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-[320px] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={posterUrl} alt="分享海报" className="w-full rounded-[16px] shadow-2xl" />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleDownloadPoster}
                  className="flex-1 bg-white text-text-heading py-3 rounded-[14px] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  {t('result.posterSave')}
                </button>
                <button
                  onClick={() => setPosterUrl(null)}
                  className="flex-1 bg-white/20 text-white py-3 rounded-[14px] text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors"
                >
                  {t('result.posterClose')}
                </button>
              </div>
              <p className="text-center text-white/60 text-xs mt-3">{t('result.posterHint')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {copyToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-text-heading text-white text-sm px-5 py-2.5 rounded-full shadow-lg z-50"
          >
            {t('result.linkCopied')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
