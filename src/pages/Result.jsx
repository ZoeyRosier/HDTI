import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { animalsMap, animals } from '../data/animals';
import { calculateResult, vecToLabel, getDimensionDesc, calcMatchRate, calcMatchRateRelative, normalizeDim } from '../utils/scoring';
import { readResultFromUrl, shareResult } from '../utils/share';
import { incrementAnimalCount, getAllCounts } from '../utils/supabase';
import { generatePoster } from '../utils/poster';

/** 7维度定义：分为4个模型类别 */
const DIMENSIONS = [
  { id: 0, code: 'D1', name: '探索倾向', category: '行为模型' },
  { id: 1, code: 'D2', name: '应激反应', category: '行为模型' },
  { id: 2, code: 'D3', name: '群体依赖', category: '社交模型' },
  { id: 3, code: 'D4', name: '社交主动性', category: '社交模型' },
  { id: 4, code: 'D5', name: '行动频率', category: '驱动模型' },
  { id: 5, code: 'D6', name: '领地意识', category: '驱动模型' },
  { id: 6, code: 'D7', name: '适应灵活度', category: '策略模型' },
];

/** 获取动物高清原图路径 */
function getAnimalIcon(code) {
  const filename = code.replace('?', '');
  return `/animals_icon/${filename}.png`;
}

/** IUCN 保护等级中文映射 */
const IUCN_LABELS = { CR: '极危', EN: '濒危', VU: '易危', NT: '近危', LC: '无危' };

/**
 * 根据稀有度百分比返回稀有度描述
 */
function getRarityLabel(pct) {
  if (pct <= 1) return '极稀有';
  if (pct <= 5) return '稀有';
  if (pct <= 10) return '珍稀';
  return '特别';
}

export default function Result() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [copyToast, setCopyToast] = useState(false);
  const [posterUrl, setPosterUrl] = useState(null);
  const [posterLoading, setPosterLoading] = useState(false);

  const [resultData] = useState(() => {
    const urlResult = readResultFromUrl();

    // 优先从 sessionStorage 计算（用户本人刚答完题）
    const answersStr = sessionStorage.getItem('hdti_answers')
      || localStorage.getItem('hdti_answers_backup');
    if (answersStr && (!urlResult || !urlResult.isPreview)) {
      try {
        const answers = JSON.parse(answersStr);
        if (Object.keys(answers).length === 16) {
          const { result, isEgg, eggType, matchRate, userVec } = calculateResult(answers);
          const animal = animalsMap[result];
          if (animal) return { animal, matchRate, isSharedView: false, isEgg, eggType, userVec };
        }
      } catch (e) {
        // fall through
      }
    }

    if (urlResult) {
      const animal = animalsMap[urlResult.animalId];
      if (animal) {
        return { animal, matchRate: urlResult.matchRate, isSharedView: true, isPreview: urlResult.isPreview };
      }
    }

    return null;
  });

  const hasCountedRef = useRef(false);

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

      if (sessionStorage.getItem('hdti_counted') === '1') {
        getAllCounts().then(allCounts => {
          if (allCounts) {
            const total = allCounts.reduce((sum, row) => sum + row.count, 0);
            const animalCount = allCounts.find(r => r.animal_id === resultData.animal.id)?.count || 0;
            setStats({ myCount: animalCount, total, percentage: total > 0 ? (animalCount / total * 100).toFixed(1) : null });
          }
        });
        return;
      }
      sessionStorage.setItem('hdti_counted', '1');

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

  const { animal, matchRate, isSharedView, isEgg, userVec, isPreview } = resultData;
  const isEggResult = animal.isEgg;

  // 各彩蛋动物独立配色，普通版绿色
  const EGG_THEMES = {
    giant_panda: { heroBg: 'linear-gradient(180deg, #7a6528 0%, #5c4b1e 100%)', accent: '#C4956A', barFill: '#C4956A', circleBg: 'radial-gradient(circle, rgba(196,149,106,0.3) 0%, rgba(196,149,106,0.1) 70%)', sectionBg: '#faf6ef', headingColor: '#9a7b3c', dividerColor: '#e8d5b0', wildNumColor: '#C4956A', posterBg: 'linear-gradient(135deg, #9a7b3c, #7a6028)', posterText: '生成我的金色海报', ringGradient: 'conic-gradient(from 0deg, #C4956A, #f5d9a8, #9a7b3c, #f5d9a8, #C4956A)', badgeRgb: '154,123,60' },
    clouded_leopard: { heroBg: 'linear-gradient(180deg, #3b2d5e 0%, #271d42 100%)', accent: '#b89adb', barFill: '#b89adb', circleBg: 'radial-gradient(circle, rgba(184,154,219,0.25) 0%, rgba(184,154,219,0.08) 70%)', sectionBg: '#f8f5fc', headingColor: '#5e3d8a', dividerColor: '#e0d4f0', wildNumColor: '#8b5fbf', posterBg: 'linear-gradient(135deg, #5e3d8a, #3b2d5e)', posterText: '生成我的暗夜海报', ringGradient: 'conic-gradient(from 0deg, #b89adb, #6b3fa0, #e0c4f7, #6b3fa0, #b89adb)', badgeRgb: '94,61,138' },
    chinese_monal: { heroBg: 'linear-gradient(180deg, #5c3a6e 0%, #2e4738 100%)', accent: '#e8a0c8', barFill: 'linear-gradient(90deg, #e8a0c8, #a8d8ea, #b8e6a0)', circleBg: 'radial-gradient(circle, rgba(232,160,200,0.2) 0%, rgba(168,216,234,0.1) 70%)', sectionBg: '#faf5f8', headingColor: '#8a3d6e', dividerColor: '#f0d4e8', wildNumColor: '#c4669f', posterBg: 'linear-gradient(135deg, #8a3d6e, #2e6b5a)', posterText: '生成我的彩虹海报', ringGradient: 'conic-gradient(from 0deg, #e8a0c8, #a8d8ea, #b8e6a0, #f0d080, #e8a0c8)', badgeRgb: '138,61,110' },
    snow_leopard_extreme: { heroBg: 'linear-gradient(180deg, #2c3e50 0%, #1a252f 100%)', accent: '#7ec8e3', barFill: '#7ec8e3', circleBg: 'radial-gradient(circle, rgba(126,200,227,0.25) 0%, rgba(126,200,227,0.08) 70%)', sectionBg: '#f4f9fc', headingColor: '#2c5d7a', dividerColor: '#d0e8f5', wildNumColor: '#3d8ab0', posterBg: 'linear-gradient(135deg, #2c5d7a, #1a252f)', posterText: '生成我的冰蓝海报', ringGradient: 'conic-gradient(from 0deg, #7ec8e3, #ffffff, #4a9fbf, #ffffff, #7ec8e3)', badgeRgb: '44,93,122' },
    monkey_extreme: { heroBg: 'linear-gradient(180deg, #1a3a4a 0%, #0f2830 100%)', accent: '#4de8c2', barFill: '#4de8c2', circleBg: 'radial-gradient(circle, rgba(77,232,194,0.2) 0%, rgba(77,232,194,0.06) 70%)', sectionBg: '#f2fbf8', headingColor: '#1a6b5a', dividerColor: '#c8f0e4', wildNumColor: '#2a9b80', posterBg: 'linear-gradient(135deg, #1a6b5a, #0f2830)', posterText: '生成我的霓虹海报', ringGradient: 'conic-gradient(from 0deg, #4de8c2, #0a5e4a, #80fff0, #0a5e4a, #4de8c2)', badgeRgb: '26,107,90' },
  };
  const DEFAULT_THEME = { heroBg: 'linear-gradient(180deg, #3D5A47 0%, #2e4738 100%)', accent: '#8fb872', barFill: '#8fb872', circleBg: 'radial-gradient(circle, rgba(143,184,114,0.2) 0%, rgba(143,184,114,0.08) 70%)', sectionBg: '#F5F7F2', headingColor: '#3D5A47', dividerColor: '#dce6d4', wildNumColor: '#c4663f', posterBg: '#3D5A47', posterText: '生成我的分享海报' };
  const theme = isEggResult ? (EGG_THEMES[animal.id] || EGG_THEMES.giant_panda) : DEFAULT_THEME;

  const scienceAnimal = animal.reuseScienceFrom ? animalsMap[animal.reuseScienceFrom] : animal;
  const species = scienceAnimal?.species;

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
    // 微信内置浏览器不支持 <a download>，提示用户长按保存
    const isWechat = /MicroMessenger/i.test(navigator.userAgent);
    if (isWechat) {
      // 微信中无法程序化下载，引导用户长按
      return;
    }
    const a = document.createElement('a');
    a.href = posterUrl;
    a.download = `HDTI_${animal.code}_海报.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const isWechat = /MicroMessenger/i.test(navigator.userAgent);

  // BGM 播放逻辑
  const audioRef = useRef(null);
  const [bgmPlaying, setBgmPlaying] = useState(false);

  useEffect(() => {
    if (!resultData || resultData.isPreview) return;
    const audio = new Audio('/audio/result-bgm.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // 尝试自动播放（用户之前已有手势操作）
    audio.play().then(() => {
      setBgmPlaying(true);
    }).catch(() => {
      // 浏览器阻止了自动播放，等待用户手动点击
      setBgmPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [resultData]);

  function toggleBgm() {
    const audio = audioRef.current;
    if (!audio) return;
    if (bgmPlaying) {
      audio.pause();
      setBgmPlaying(false);
    } else {
      audio.play().then(() => setBgmPlaying(true)).catch(() => {});
    }
  }

  return (
    <div className="min-h-dvh">
      {/* ========== 第一屏：英雄区 ========== */}
      <div className="min-h-dvh flex flex-col items-center relative px-4 pt-14 pb-8" style={{ background: theme.heroBg }}>

        {/* 顶部导航 */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-4 py-3">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5 cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/')}>
            <span className="text-xs">🐾</span>
            <span className="font-mono text-[11px] text-white/90 tracking-wide">HDTI</span>
            <span className="w-px h-3 bg-white/20" />
            <span className="text-[11px] text-white/60">首页</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-white/50 tracking-wide">
              {isPreview ? '档案 · PROFILE' : isEggResult ? '彩蛋 · EGG' : '结果 · RESULT'}
            </span>
            {!isPreview && (
              <button
                onClick={toggleBgm}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm cursor-pointer hover:bg-white/20 transition-colors"
                aria-label={bgmPlaying ? '静音' : '播放音乐'}
                title="山雀 — 万能青年旅店"
              >
                {bgmPlaying ? '🔊' : '🔇'}
              </button>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center flex-1 flex flex-col items-center justify-center"
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
                🎊 你触发了隐藏彩蛋
              </span>
              {stats && stats.percentage && (
                <p className="font-mono text-[11px] text-white/50 tracking-[.15em] mt-3">
                  RARE EGG · {stats.percentage}% UNLOCKED
                </p>
              )}
            </motion.div>
          )}

          {/* 副标题 */}
          {!isEggResult && (
            <p className="font-mono text-[11px] text-white/50 tracking-[.15em] mb-6">
              YOUR HENGDUAN ANIMAL
            </p>
          )}

          {/* 动物大图 */}
          <div className="relative w-[200px] h-[200px] md:w-[240px] md:h-[240px] mx-auto mb-5">
            {isEggResult && (
              <>
                {/* 最外层：实体渐变边框环 */}
                <div
                  className="absolute inset-[-10px] rounded-full"
                  style={{ background: theme.ringGradient, padding: '5px' }}
                >
                  <div className="w-full h-full rounded-full" style={{ background: theme.heroBg }} />
                </div>
                {/* 旋转光效层 */}
                <div
                  className="absolute inset-[-4px] rounded-full animate-[spin_4s_linear_infinite]"
                  style={{ background: theme.ringGradient, opacity: 0.85 }}
                />
                {/* 模糊辉光层 */}
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
          <p className="text-base font-bold tracking-[.08em] mb-4" style={{ color: theme.accent }}>
            {animal.personalityName} · {animal.name} {animal.nameEn.toUpperCase()}
          </p>

          {/* IUCN 保护等级 */}
          {animal.conservationStatus && (() => {
            const iucnColors = { CR: '#b91c1c', EN: '#c4663f', VU: '#d97706', NT: '#b8860b', LC: '#6b7280' };
            const color = iucnColors[animal.conservationStatus] || '#d97706';
            return (
              <div className="flex justify-center mb-4">
                <span
                  className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{ background: `${color}22`, color, border: `1px solid ${color}44` }}
                >
                  IUCN · {animal.conservationStatus} {IUCN_LABELS[animal.conservationStatus]}
                </span>
              </div>
            );
          })()}

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
          <div className="mb-5 w-full">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-sm text-white/70">与{animal.name}的匹配度</span>
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
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span className="text-sm">{isEggResult ? '🏆' : '🌿'}</span>
                <span className="text-xs text-white/80">
                  仅 <b className="font-num">{stats.percentage}%</b> 的人是{animal.name} · {getRarityLabel(parseFloat(stats.percentage))}
                </span>
              </div>
            </div>
          )}

          {/* 金句 */}
          <p className="text-[15px] md:text-base text-white/75 leading-[1.9] mt-2 mb-8 italic whitespace-pre-line text-center">
            {(() => {
              const parts = animal.quote.split('，');
              if (parts.length > 2) {
                return `"${parts.slice(0, 2).join('，')}，\n${parts.slice(2).join('，')}"`;
              }
              return `"${animal.quote}"`;
            })()}
          </p>

          {/* 下滑提示（可点击） */}
          <motion.div
            className="text-sm cursor-pointer"
            style={{ color: theme.accent }}
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            onClick={() => document.getElementById('result-detail')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <p>下滑，看 TA 的真实处境</p>
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
                  <p className="text-center text-xs text-text-muted mb-4 tracking-wide">
                    一个温柔的对比 · <span className="font-mono">A QUIET CONTRAST</span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex-1 text-center">
                      <div className="font-num text-[28px] font-extrabold text-text-heading">
                        {stats.myCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        人测出了{animal.name}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-border" />
                    <div className="flex-1 text-center">
                      <div className="font-num text-[28px] font-extrabold" style={{ color: theme.wildNumColor }}>
                        {animal.wildPopulation.replace(/[（(].+[）)]/g, '').trim()}
                      </div>
                      <div className="text-xs text-text-muted mt-1">
                        {animal.wildPopulation.match(/[（(](.+)[）)]/) ? animal.wildPopulation.match(/[（(](.+)[）)]/)[1].replace('中国特有', '中国特有，野外') + '仅剩' : '野外仅剩'}
                      </div>
                    </div>
                  </div>
                  {/* 情感文案 */}
                  <div className="mt-5 bg-bg-tag rounded-[14px] px-4 py-3 text-center">
                    <p className="text-[13px] text-text-body leading-relaxed">
                      屏幕里，{animal.name.replace(/[「「].+[」」]/g, '')}很常见。<br />
                      山林里，它正在变成一个数字。
                    </p>
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
                  你的横断山原型
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
                    title="物种档案"
                    subtitle="SPECIES FILE"
                    content={species.habitat}
                    defaultOpen
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="🧗"
                    title="生存绝技"
                    subtitle="SURVIVAL SKILLS"
                    content={species.skill}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="💡"
                    title="冷知识"
                    subtitle="DID YOU KNOW"
                    content={species.funFact}
                    isEgg={isEggResult}
                    accentColor={isEggResult ? theme.accent : undefined}
                  />
                  <ScienceCard
                    emoji="🚨"
                    title="保护现状"
                    subtitle="STATUS"
                    content={species.statusDesc}
                    badge={`${animal.conservationStatus} · ${IUCN_LABELS[animal.conservationStatus] || animal.conservationStatus}`}
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
                  href={animal.iucnUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-bold text-text-heading leading-snug hover:text-primary transition-colors cursor-pointer"
                >
                  {(species?.iucnHook || `了解${animal.name}的更多信息 →`).replace(/ →$/, ' ➡️')}
                </a>
                <p
                  className="text-[11px] text-text-muted font-mono mt-0.5 cursor-pointer hover:text-primary transition-colors truncate"
                  title="点击复制链接"
                  onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(animal.iucnUrl); setCopyToast(true); setTimeout(() => setCopyToast(false), 2000); }}
                >
                  {animal.iucnUrl}
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
          {(userVec || animal.vector) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 bg-white rounded-[20px] border border-border p-6"
            >
              <h3 className="text-lg font-black text-text-heading mb-1">7维度画像</h3>
              <p className="text-[11px] text-text-muted font-mono tracking-wide mb-5">
                {isPreview ? 'DIMENSION PROFILE · 该动物的标准维度画像' : 'DIMENSION PROFILE · 基于你的作答向量生成'}
              </p>

              {(() => {
                const displayVec = isPreview ? (animal.prdVector || animal.vector) : (userVec || animal.vector);
                const labels = vecToLabel(displayVec);
                const categories = [...new Set(DIMENSIONS.map(d => d.category))];
                return categories.map(cat => (
                  <div key={cat} className="mb-5 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[13px] font-bold" style={{ color: theme.headingColor }}>{cat}</span>
                      <div className="flex-1 h-px" style={{ background: theme.dividerColor }} />
                    </div>
                    <div className="space-y-4">
                      {DIMENSIONS.filter(d => d.category === cat).map(dim => {
                        const level = labels[dim.id];
                        const desc = getDimensionDesc(dim.id, displayVec[dim.id]);
                        const badgeRgb = isEggResult ? theme.badgeRgb : '34,120,60';
                        const badgeBg = level === 'H' ? `rgba(${badgeRgb},0.22)`
                          : level === 'M' ? `rgba(${badgeRgb},0.13)`
                          : `rgba(${badgeRgb},0.06)`;
                        const barPct = Math.max(10, Math.round((((dim.id === 2 || dim.id === 3) ? normalizeDim(dim.id, displayVec[dim.id]) : displayVec[dim.id]) - 1) / 2 * 100));
                        const barOpacity = 0.2 + (barPct / 100) * 0.6;
                        return (
                          <div key={dim.id}>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-[13px] font-bold text-text-heading">{dim.code} {dim.name}</span>
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
          {animal.vector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 rounded-[20px] border p-6"
              style={{ background: isEggResult ? theme.sectionBg : '#ffffff', borderColor: isEggResult ? theme.dividerColor : undefined }}
            >
              {(() => {
                const currentVec = (!isPreview && userVec) ? userVec : animal.vector;
                const dist = (a, b) => a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0);
                const candidates = animals
                  .filter(a => a.id !== animal.id && a.vector)
                  .map(a => ({ ...a, _dist: dist(currentVec, a.vector) }));
                const maxDist = Math.max(...candidates.map(a => a._dist));
                const sorted = candidates
                  .map(a => ({ ...a, match: Math.round((1 - a._dist / maxDist) * 100) }))
                  .sort((a, b) => a._dist - b._dist);

                const renderCard = (a, showMatch) => (
                  <div
                    key={a.id}
                    className="flex flex-col items-center text-center p-3 rounded-[14px] border transition-colors cursor-pointer"
                    style={{ borderColor: isEggResult ? theme.dividerColor : undefined, background: isEggResult ? '#ffffff' : undefined }}
                    onClick={() => navigate(`/result?r=${a.id}&preview=1`)}
                  >
                    <div className="text-[11px] mb-1" style={{ color: isEggResult ? theme.headingColor : '#8a9379' }}>{a.name}</div>
                    <img
                      src={`/animals_icon/${a.code.replace('?', '')}.png`}
                      alt={a.name}
                      className="w-12 h-12 object-contain mb-2"
                    />
                    <div className="font-mono text-sm font-black" style={{ color: theme.headingColor }}>{a.code}</div>
                    <div className="text-xs mt-0.5" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>{a.personalityName}</div>
                    {showMatch && (
                      <div className="text-sm font-black mt-1.5" style={{ color: theme.headingColor }}>{a.match <= 0 ? '≈0' : a.match}%</div>
                    )}
                  </div>
                );

                if (isPreview) {
                  return (
                    <>
                      <h3 className="text-lg font-black mb-1" style={{ color: theme.headingColor }}>相似人格</h3>
                      <p className="text-[11px] font-mono tracking-wide mb-3" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>SIMILAR TYPES · 与你最相近的横断山兽</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {sorted.slice(0, 4).map(a => renderCard(a, false))}
                      </div>
                    </>
                  );
                }

                const closestTwo = sorted.slice(0, 2);
                const farthestTwo = sorted.slice(-2).reverse();
                return (
                  <>
                    <h3 className="text-lg font-black mb-1" style={{ color: theme.headingColor }}>灵魂近亲</h3>
                    <p className="text-[11px] font-mono tracking-wide mb-3" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>KINDRED SPIRITS · 和你气质最像的横断山兽</p>
                    {matchRate < 70 && (
                      <p className="text-xs mb-4 px-2 py-2 rounded-lg" style={{ color: '#5f6a52', background: '#f0f4eb' }}>
                        你的特质比较均衡，和多种动物都有共鸣 ✦
                      </p>
                    )}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {closestTwo.map(a => renderCard(a, true))}
                    </div>
                    <h3 className="text-lg font-black mb-1" style={{ color: theme.headingColor }}>命运对角</h3>
                    <p className="text-[11px] font-mono tracking-wide mb-3" style={{ color: isEggResult ? theme.accent : '#8a9379' }}>POLAR OPPOSITES · 和你反差最大的横断山兽</p>
                    <div className="grid grid-cols-2 gap-3">
                      {farthestTwo.map(a => renderCard(a, true))}
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* 操作按钮 */}
          <div className="mt-8 max-w-md mx-auto space-y-3">
            {isPreview ? (
              <button
                onClick={() => { sessionStorage.removeItem('hdti_answers'); localStorage.removeItem('hdti_answers_backup'); navigate('/quiz'); }}
                className="w-full py-4 rounded-[18px] text-white font-bold text-base cursor-pointer transition-opacity hover:opacity-90"
                style={{ background: theme.posterBg }}
              >
                去测测你是哪种横断山兽 →
              </button>
            ) : (
              <>
                {/* 如果有待匹配的好友，显示回去匹配按钮 */}
                {(() => {
                  const pendingFriend = sessionStorage.getItem('hdti_match_pending_friend');
                  if (pendingFriend) {
                    return (
                      <button
                        onClick={() => {
                          sessionStorage.removeItem('hdti_match_pending_friend');
                          navigate(`/match?r=${pendingFriend}`);
                        }}
                        className="w-full py-4 rounded-[18px] text-white font-bold text-base cursor-pointer transition-opacity hover:opacity-90 shadow-[0_6px_16px_rgba(196,102,63,.25)]"
                        style={{ background: 'linear-gradient(135deg, #c4663f 0%, #a8502e 100%)' }}
                      >
                        🐾 测完了！回去和好友匹配
                      </button>
                    );
                  }
                  return null;
                })()}

                <button
                  onClick={handleShare}
                  disabled={posterLoading}
                  className="w-full py-4 rounded-[18px] text-white font-bold text-base cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-wait"
                  style={{ background: theme.posterBg }}
                >
                  {posterLoading ? '⏳ 海报生成中...' : `🎴 ${theme.posterText}`}
                </button>

                {/* 复制匹配链接 */}
                <button
                  onClick={() => {
                    const matchLink = `${window.location.origin}/match?r=${animal.id}`;
                    navigator.clipboard.writeText(matchLink).then(() => {
                      setCopyToast(true);
                      setTimeout(() => setCopyToast(false), 2000);
                    });
                  }}
                  className="w-full py-3 text-sm text-text-muted hover:text-primary transition-colors cursor-pointer text-center"
                >
                  📋 复制匹配链接，发给好友
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => { sessionStorage.removeItem('hdti_answers'); localStorage.removeItem('hdti_answers_backup'); navigate('/quiz'); }}
                    className="flex-1 bg-white border border-border text-text-secondary py-3.5 rounded-[18px] text-sm font-medium hover:border-primary-light transition-colors cursor-pointer"
                  >
                    ↻ 再测一次
                  </button>
                  <button
                    onClick={() => navigate('/animals')}
                    className="flex-1 bg-white border border-border text-text-secondary py-3.5 rounded-[18px] text-sm font-medium hover:border-primary-light transition-colors cursor-pointer"
                  >
                    探索其他动物 →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 页脚 */}
          <div className="text-center mt-8 text-[11px] text-text-tertiary leading-[1.7]">
            HDTI · 横断山脉动物人格测试<br />
            <span className="text-text-muted">🌿 了解，是保护的第一步</span><br />
            <span className="text-text-muted">🎵 BGM：山雀 — 万能青年旅店</span>
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
                {!isWechat && (
                <button
                  onClick={handleDownloadPoster}
                  className="flex-1 bg-white text-text-heading py-3 rounded-[14px] text-sm font-bold cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  保存图片
                </button>
                )}
                <button
                  onClick={() => setPosterUrl(null)}
                  className="flex-1 bg-white/20 text-white py-3 rounded-[14px] text-sm font-medium cursor-pointer hover:bg-white/30 transition-colors"
                >
                  关闭
                </button>
              </div>
              <p className="text-center text-white/60 text-xs mt-3">
                {isWechat ? '👆 长按上方图片，选择「保存到手机」' : '长按图片也可保存到相册'}
              </p>
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
            链接已复制 ✓
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** 科普手风琴卡片 */
function ScienceCard({ emoji, title, subtitle, content, badge, defaultOpen = false, isEgg, accentColor }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[18px] border border-border overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-[10px] bg-bg-tag flex items-center justify-center text-lg flex-none">
            {emoji}
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold text-text-heading">{title}</span>
            <span className="block font-mono text-[9px] tracking-[.1em]" style={{ color: accentColor || (isEgg ? '#C4956A' : '#8a9379') }}>
              {subtitle}
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] bg-accent-warm/10 text-accent-warm font-bold px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
          <span className={`text-text-muted text-sm transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
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
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-[13px] text-text-body leading-[1.8] whitespace-pre-line">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
