import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTotalCount, getAllCounts } from '../utils/supabase';
import { animals, baseAnimals } from '../data/animals';
import { useI18n, LangToggle } from '../i18n';

/** 动物头像统一白色背景 */
const AVATAR_BG = '#ffffff';

/** 根据动物code获取缩略头像路径（150px，20-35KB） */
function getAnimalThumb(code) {
  const filename = code.replace('?', '');
  return `/animals_icon/thumb/${filename}.png`;
}

export default function Home() {
  const navigate = useNavigate();
  const { t, pickAnimal } = useI18n();
  const [totalCount, setTotalCount] = useState(null);
  const [rankings, setRankings] = useState(null);
  const [eggStats, setEggStats] = useState(null);
  const [faqOpen, setFaqOpen] = useState(true);
  const [dimOpen, setDimOpen] = useState(true);

  const lastResult = JSON.parse(localStorage.getItem('hdti_result') || 'null');
  const hasHistory = lastResult && (Date.now() - lastResult.timestamp < 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    getTotalCount().then(count => {
      if (count !== null) setTotalCount(count);
    });
    getAllCounts().then(data => {
      if (!data) return;
      const total = data.reduce((sum, row) => sum + row.count, 0);
      if (total === 0) return;
      const baseIds = new Set(baseAnimals.map(a => a.id));
      const ranked = data
        .filter(row => baseIds.has(row.animal_id))
        .map(row => ({
          id: row.animal_id,
          count: row.count,
          pct: ((row.count / total) * 100).toFixed(1),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      setRankings({ items: ranked, total });

      const eggAnimals = animals.filter(a => a.isEgg);
      const eggData = eggAnimals.map(a => {
        const row = data.find(r => r.animal_id === a.id);
        return { id: a.id, code: a.code, pct: row ? ((row.count / total) * 100).toFixed(1) : '0.0' };
      });
      setEggStats(eggData);
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
    <div className="min-h-dvh" style={{ background: 'radial-gradient(120% 60% at 50% 0%, #f8faf5 0%, #eef3ea 58%, #e9efe2 100%)' }}>
      <div className="w-full max-w-[430px] md:max-w-[720px] mx-auto px-4 md:px-6 py-[18px]">

        {/* 顶部导航 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-[18px]"
        >
          <div className="flex items-center gap-[9px] bg-bg-card border border-border rounded-full px-[15px] py-2 shadow-[0_3px_10px_rgba(50,65,35,.06)]">
            <span className="text-[15px]">🐾</span>
            <span className="font-mono text-sm tracking-[.02em] text-primary">HDTI</span>
            <span className="w-px h-[13px] bg-border-divider" />
            <LangToggle />
          </div>
        </motion.div>

        {/* Hero 卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="bg-bg-card rounded-[24px] overflow-hidden shadow-[0_14px_38px_rgba(50,65,35,.1)]"
        >
          {/* 山脉插画区 */}
          <div className="relative h-[158px] overflow-hidden" style={{ background: 'linear-gradient(180deg,#eaf3e3 0%,#dfeccf 100%)' }}>
            <div className="absolute right-10 top-[22px] w-[42px] h-[42px] rounded-full animate-[floaty_6s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 38% 36%,#f8f1d9,#eaddb4)', boxShadow: '0 0 0 8px rgba(245,235,202,.32)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[112px]" style={{ background: 'linear-gradient(95deg,#c2dcab,#aece93)', clipPath: 'polygon(0 56%,14% 31%,30% 53%,46% 21%,60% 47%,76% 25%,90% 45%,100% 35%,100% 100%,0 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[92px]" style={{ background: 'linear-gradient(95deg,#8fb872,#79a85f)', clipPath: 'polygon(0 60%,12% 39%,26% 62%,40% 33%,54% 58%,70% 35%,84% 60%,100% 43%,100% 100%,0 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[74px]" style={{ background: 'linear-gradient(100deg,#4c7250,#3D5A47)', clipPath: 'polygon(0 70%,16% 43%,30% 66%,44% 38%,58% 64%,72% 41%,88% 66%,100% 51%,100% 100%,0 100%)' }} />
            <div className="absolute left-[157px] top-[101px] w-[18px] h-[15px] bg-[#f1f6ec]" style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
            <div className="absolute left-[53px] top-[108px] w-[14px] h-[12px] bg-[#f1f6ec]" style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[34px]" style={{ background: 'linear-gradient(180deg,transparent,rgba(255,255,255,.45))' }} />
          </div>

          {/* 内容区 */}
          <div className="px-[22px] py-5 pb-6 text-center">
            <span className="inline-block text-xs font-bold text-primary bg-bg-tag px-[13px] py-1.5 rounded-full mb-[15px]">
              {t('home.badge')}
            </span>
            <h1 className="text-[27px] leading-[1.28] font-black text-text-heading tracking-[.005em]" style={{ textWrap: 'balance' }}>
              {t('home.title').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
            </h1>
            <div className="font-mono text-[10.5px] tracking-[.14em] text-[#9aab86] mt-[11px]">
              {t('home.titleSub')}
            </div>
            <p className="text-[13.5px] leading-[1.7] text-text-secondary mt-[14px]" style={{ textWrap: 'pretty' }}>
              {t('home.desc').split('\n').map((line, i) => <span key={i}>{i > 0 && <br />}{line}</span>)}
            </p>

            {/* 测试人次 */}
            {totalCount !== null && (
              <div className="inline-flex items-center gap-[7px] mt-4 bg-bg-green-light rounded-full px-[14px] py-[7px]">
                <span className="w-2 h-2 rounded-full bg-[#5f9a3f] animate-pulse" />
                <span className="text-[12.5px] text-text-body" dangerouslySetInnerHTML={{ __html: t('home.totalCount', { count: totalCount.toLocaleString() }) }} />
              </div>
            )}

            {/* 开始测试按钮 */}
            <button
              onClick={handleStart}
              className="relative overflow-hidden w-full mt-[18px] bg-primary text-white rounded-[18px] py-4 border-none cursor-pointer shadow-[0_8px_18px_rgba(61,90,71,.3)] hover:bg-primary-dark transition-colors"
            >
              <span className="absolute top-0 left-0 w-[40%] h-full animate-[sheen_3.6s_ease-in-out_infinite]" style={{ background: 'linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent)' }} />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-base font-extrabold">{t('home.start')}</span>
                <span className="font-mono text-[11px] tracking-[.06em] text-[#bcd0a6] border-l border-white/25 pl-2">{t('home.startSub')}</span>
              </span>
            </button>

            {/* 好友匹配入口 */}
            <button
              onClick={() => navigate('/match')}
              className="w-full mt-3 bg-[#c4663f] text-white border border-[#a8502e] rounded-[18px] py-3.5 cursor-pointer hover:bg-[#b05a36] hover:border-[#943f22] transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-base">🐾</span>
              <span className="text-[15px] font-bold">{t('home.matchBtn')}</span>
              <span className="font-mono text-[11px] tracking-[.06em] text-white/70 border-l border-white/25 pl-2">{t('home.matchSub')}</span>
            </button>

            {/* 查看上次结果 */}
            {hasHistory && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleViewLast}
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer inline-flex items-center gap-[5px]"
                >
                  {t('home.viewLast')}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* 排行榜卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-bg-card rounded-[20px] p-[18px] mt-[13px] shadow-[0_8px_22px_rgba(50,65,35,.07)]"
        >
          <div className="flex justify-between items-baseline mb-[15px]">
            <span className="font-black text-[15px] text-text-heading">{t('home.rankTitle')}</span>
            {rankings && (
              <span className="text-[11px] text-text-tertiary" dangerouslySetInnerHTML={{ __html: t('home.rankTotal', { count: rankings.total.toLocaleString() }) }} />
            )}
          </div>

          {rankings ? (
            <RankList rankings={rankings} />
          ) : (
            <div className="space-y-[14px]">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-[11px]">
                  <div className="w-10 h-10 rounded-full bg-bg-tag animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-bg-tag rounded animate-pulse w-3/4" />
                    <div className="h-1.5 bg-bg-tag rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 彩蛋提示 */}
          <div className="border-t border-dashed border-border my-[15px]" />
          <div className="flex items-center gap-1.5 mb-[11px]">
            <span className="text-[12.5px] font-extrabold text-text-heading">{t('home.eggLabel')}</span>
            <span className="font-mono text-[9.5px] text-accent-warm tracking-[.08em]">{t('home.eggSub')}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(eggStats || [{ code: 'NULL' }, { code: 'GLOW' }, { code: 'SLAY?' }, { code: '5G' }, { code: 'SOFT' }]).map(egg => {
              const pctVal = parseFloat(egg.pct) || 0;
              const intensity = Math.min(pctVal / 20, 1);
              const bgFrom = `rgba(245,233,218,${0.4 + intensity * 0.6})`;
              const bgTo = `rgba(236,195,150,${0.2 + intensity * 0.8})`;
              return (
              <span
                key={egg.code}
                className="inline-flex items-baseline gap-[5px] text-[11.5px] border border-[#ecd6bb] text-accent-warm-dark px-[11px] py-1.5 rounded-[16px]"
                style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
              >
                ✦ <b className="font-mono text-[11px]">{egg.code}</b>
                {egg.pct && egg.pct !== '0.0' && <span className="font-num text-[11px] font-bold text-accent-warm">{egg.pct}%</span>}
              </span>
              );
            })}
          </div>
        </motion.div>

        {/* 科普钩子 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="flex items-center gap-[11px] bg-bg-card rounded-[18px] px-4 py-[13px] mt-[13px] shadow-[0_6px_18px_rgba(50,65,35,.06)]"
        >
          <div className="w-[38px] h-[38px] rounded-[12px] bg-bg-tag flex items-center justify-center text-[19px] flex-none animate-[drift_5s_ease-in-out_infinite]">
            🌱
          </div>
          <div className="text-[12.5px] leading-[1.55] text-text-body">
            <span dangerouslySetInnerHTML={{ __html: t('home.hook1') }} /><br />
            {t('home.hook2')}
          </div>
        </motion.div>

        {/* 动物预览 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="bg-bg-card rounded-[20px] py-[18px] mt-[13px] shadow-[0_8px_22px_rgba(50,65,35,.07)]"
        >
          <div className="flex justify-between items-baseline px-[18px] mb-[14px]">
            <div>
              <div className="font-black text-[15px] text-text-heading">{t('home.animalTitle')}</div>
              <div className="text-[11px] text-text-tertiary mt-0.5" dangerouslySetInnerHTML={{ __html: t('home.animalSub').replace('<span>', '<span class="text-accent-warm font-bold">') }} />
            </div>
            <button
              onClick={() => navigate('/animals')}
              className="text-xs text-primary font-bold cursor-pointer hover:text-primary-dark transition-colors"
            >
              {t('home.animalGallery')}
            </button>
          </div>

          {/* 动物卡片网格 */}
          <div className="grid grid-cols-5 gap-2.5 px-[18px]">
            {baseAnimals.slice(0, 4).map((raw) => {
              const animal = pickAnimal(raw);
              return (
              <div
                key={raw.id}
                className="flex flex-col items-center text-center p-2.5 rounded-[16px] border border-border bg-white cursor-pointer hover:border-primary-light hover:shadow-sm transition-all"
                onClick={() => navigate(`/result?r=${raw.id}&preview=1`)}
              >
                <div className="text-[11px] text-text-muted mb-1 whitespace-nowrap">{animal.name}</div>
                <div className="w-[52px] h-[52px] flex items-center justify-center mb-1.5">
                  <img
                    src={getAnimalThumb(raw.code)}
                    alt={animal.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-mono text-[13px] font-black text-text-heading whitespace-nowrap">{raw.code}</div>
                <div className="text-[10.5px] text-text-muted mt-0.5 whitespace-nowrap">{animal.personalityName}</div>
              </div>
              );
            })}
            {/* 彩蛋占位 */}
            <div
              className="flex flex-col items-center justify-center text-center p-2.5 rounded-[16px] border-[1.5px] border-[#5a5660]"
              style={{ background: 'linear-gradient(135deg,#3c3a44 0%,#2c2a33 52%,#201f27 100%)' }}
            >
              <span className="text-lg mb-1">✦</span>
              <span className="font-mono text-[10px] text-[#d9b483] whitespace-nowrap">{t('home.animalEggCard')}</span>
              <span className="font-mono text-[13px] text-[#d9b483] font-bold mt-1">{t('home.animalEggCode')}</span>
            </div>
          </div>
        </motion.div>

        {/* 算法透明 & 常见问题 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="bg-bg-card rounded-[20px] p-[18px] mt-[13px] shadow-[0_8px_22px_rgba(50,65,35,.07)]"
        >
          <button
            onClick={() => setFaqOpen(!faqOpen)}
            className="w-full flex justify-between items-center cursor-pointer"
            style={{ marginBottom: faqOpen ? '15px' : 0 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-black text-[15px] text-text-heading">{t('home.faqTitle')}</span>
              <span className="font-mono text-[9.5px] text-text-tertiary tracking-[.08em]">{t('home.faqSub')}</span>
            </div>
            <span className="text-xs font-bold text-primary">{faqOpen ? t('home.collapse') : t('home.expand')}</span>
          </button>

          {faqOpen && (<>
          <FaqItem title={t('home.faq1Title')} defaultOpen>
            <p dangerouslySetInnerHTML={{ __html: t('home.faq1P1') }} />
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('home.faq1P2') }} />
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('home.faq1P3') }} />
            <div className="mt-2 pl-3 border-l-2 border-primary/20 space-y-1">
              {t('home.faq1Levels').split('|').map((lvl, i) => <p key={i}><b>{lvl}</b></p>)}
            </div>
            <p className="mt-2">{t('home.faq1P4')}</p>
          </FaqItem>

          <FaqItem title={t('home.faq2Title')}>
            <p dangerouslySetInnerHTML={{ __html: t('home.faq2P1') }} />
            <p className="mt-2" dangerouslySetInnerHTML={{ __html: t('home.faq2P2') }} />
            <p className="mt-2">{t('home.faq2P3')}</p>
            <p className="mt-1 pl-3 text-[11.5px] text-text-muted" dangerouslySetInnerHTML={{ __html: t('home.faq2Calc') }} />
            <p className="mt-2"><code className="text-[11px] bg-bg-tag px-1.5 py-0.5 rounded">{t('home.faq2P4')}</code></p>
            <p className="mt-2">{t('home.faq2P5')}</p>
          </FaqItem>

          <FaqItem title={t('home.faq3Title')}>
            <p dangerouslySetInnerHTML={{ __html: t('home.faq3P1') }} />
            <p className="mt-2">{t('home.faq3P2')}</p>
          </FaqItem>

          <FaqItem title={t('home.faq4Title')}>
            <p dangerouslySetInnerHTML={{ __html: t('home.faq4P1') }} />
            <p className="mt-2">{t('home.faq4P2')}</p>
          </FaqItem>

          <FaqItem title={t('home.faq5Title')}>
            <p dangerouslySetInnerHTML={{ __html: t('home.faq5P1') }} />
            <p className="mt-2">{t('home.faq5P2')}</p>
          </FaqItem>
          </>)}
        </motion.div>

        {/* 7维度深度解析 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="bg-bg-card rounded-[20px] p-[18px] mt-[13px] shadow-[0_8px_22px_rgba(50,65,35,.07)]"
        >
          <button
            onClick={() => setDimOpen(!dimOpen)}
            className="w-full flex justify-between items-center cursor-pointer"
            style={{ marginBottom: dimOpen ? '15px' : 0 }}
          >
            <div className="flex items-center gap-2">
              <span className="font-black text-[15px] text-text-heading">{t('home.dimTitle')}</span>
              <span className="font-mono text-[9.5px] text-text-tertiary tracking-[.08em]">{t('home.dimSub')}</span>
            </div>
            <span className="text-xs font-bold text-primary">{dimOpen ? t('home.collapse') : t('home.expand')}</span>
          </button>

          {dimOpen && (<>
          <p className="text-[12.5px] text-text-body leading-[1.75]">{t('home.dimP1')}</p>
          <p className="text-[12.5px] text-text-body leading-[1.75] mt-2" dangerouslySetInnerHTML={{ __html: t('home.dimP2') }} />
          <div className="mt-3 bg-bg-tag rounded-[12px] px-4 py-3">
            <p className="text-[11.5px] font-bold text-text-heading mb-1.5">{t('home.dimAcademic')}</p>
            <p className="text-[11.5px] text-text-body leading-[1.7]">{t('home.dimAcademicP1')}</p>
            <p className="text-[11px] text-text-muted leading-[1.6] mt-1.5 italic">{t('home.dimAcademicRef')}</p>
            <a href="https://doi.org/10.1111/j.1469-185X.2007.00010.x" target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:text-primary-dark transition-colors mt-1 inline-block">doi:10.1111/j.1469-185X.2007.00010.x →</a>
          </div>

          <FaqItem title={t('home.dimBehaviorTitle')}>
            <p><b className="text-text-heading">{t('home.dimD1Title')}</b>{t('home.dimD1Sub')}</p>
            <p className="mt-1">{t('home.dimD1H')}</p>
            <p className="mt-1">{t('home.dimD1L')}</p>
            <p className="mt-1">{t('home.dimD1M')}</p>

            <p className="mt-3"><b className="text-text-heading">{t('home.dimD2Title')}</b>{t('home.dimD2Sub')}</p>
            <p className="mt-1" dangerouslySetInnerHTML={{ __html: t('home.dimD2H') }} />
            <p className="mt-1">{t('home.dimD2L')}</p>
          </FaqItem>

          <FaqItem title={t('home.dimSocialTitle')}>
            <p><b className="text-text-heading">{t('home.dimD3Title')}</b>{t('home.dimD3Sub')}</p>
            <p className="mt-1">{t('home.dimD3H')}</p>
            <p className="mt-1">{t('home.dimD3L')}</p>

            <p className="mt-3"><b className="text-text-heading">{t('home.dimD4Title')}</b>{t('home.dimD4Sub')}</p>
            <p className="mt-1" dangerouslySetInnerHTML={{ __html: t('home.dimD4H') }} />
            <p className="mt-1">{t('home.dimD4L')}</p>
          </FaqItem>

          <FaqItem title={t('home.dimDriveTitle')}>
            <p><b className="text-text-heading">{t('home.dimD5Title')}</b>{t('home.dimD5Sub')}</p>
            <p className="mt-1">{t('home.dimD5H')}</p>
            <p className="mt-1">{t('home.dimD5L')}</p>

            <p className="mt-3"><b className="text-text-heading">{t('home.dimD6Title')}</b>{t('home.dimD6Sub')}</p>
            <p className="mt-1">{t('home.dimD6H')}</p>
            <p className="mt-1">{t('home.dimD6L')}</p>

            <p className="mt-3"><b className="text-text-heading">{t('home.dimD7Title')}</b>{t('home.dimD7Sub')}</p>
            <p className="mt-1">{t('home.dimD7H')}</p>
            <p className="mt-1">{t('home.dimD7L')}</p>
          </FaqItem>

          <div className="border-t border-dashed border-border mt-3 pt-3">
            <p className="text-[12.5px] text-text-body leading-[1.75]"><b>{t('home.dimFooter1')}</b> {t('home.dimFooter2')}</p>
            <p className="text-[12.5px] text-text-body leading-[1.75] mt-2">{t('home.dimFooter3')}</p>
          </div>
          </>)}
        </motion.div>

        {/* 页脚 */}
        <div className="text-center mt-[22px] text-[11px] text-text-tertiary leading-[1.7] pb-4">
          {t('home.footer1')}<br />
          <span className="text-text-footer">{t('home.footer2')}</span>
        </div>
      </div>
    </div>
  );
}

/** FAQ 手风琴项 */
function FaqItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3.5 cursor-pointer text-left"
      >
        <span className="text-[13.5px] font-bold text-text-heading">{title}</span>
        <span className="text-text-muted text-sm flex-none ml-2">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="pb-4 text-[12.5px] text-text-body leading-[1.75]">
          {children}
        </div>
      )}
    </div>
  );
}

/** 排行榜列表（双语） */
function RankList({ rankings }) {
  const { pickAnimal, language } = useI18n();
  const medals = ['🥇', '🥈', '🥉'];
  const barWidths = ['100%', '79%', '66%'];
  const barColors = ['#3D5A47', '#6f8a4e', '#9bb079'];

  return (
    <div className="space-y-[14px]">
      {rankings.items.map((item, idx) => {
        const animal = pickAnimal(baseAnimals.find(a => a.id === item.id));
        if (!animal) return null;
        const raw = baseAnimals.find(a => a.id === item.id);
        const displayName = animal.name;
        const displayPersonality = animal.personalityName;
        const displayQuote = animal.quote;
        const iconFile = raw.code.replace('?', '');
        return (
          <div key={item.id} className="flex items-center gap-[11px]">
            <div className="flex-none">
              <div
                className="w-12 h-12 rounded-full overflow-hidden p-[3px] border border-border"
                style={{ background: AVATAR_BG }}
              >
                <img
                  src={`/animals_icon/${iconFile}.png`}
                  alt={displayName}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <span className="text-[13.5px] truncate">
                  <span className="text-[13px] mr-0.5">{medals[idx]}</span>
                  <b className="font-mono text-text-heading">{animal.code}</b>
                  <span className="text-[12.5px] text-text-muted"> · {displayPersonality} · {displayName}</span>
                </span>
                <span className="font-num font-extrabold text-[13.5px] text-primary ml-2 flex-none">{item.pct}%</span>
              </div>
              {displayQuote && (
                <div className="text-[11.5px] text-text-muted mt-1 truncate">
                  {language === 'en' ? `"${displayQuote}"` : `「${displayQuote}」`}
                </div>
              )}
              <div className="h-1.5 bg-[#eaf0e2] rounded-full mt-1.5 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: barWidths[idx], background: barColors[idx] }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
