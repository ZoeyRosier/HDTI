import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTotalCount, getAllCounts } from '../utils/supabase';
import { baseAnimals } from '../data/animals';

/** 动物头像统一白色背景 */
const AVATAR_BG = '#ffffff';

/** 根据动物code获取缩略头像路径（150px，20-35KB） */
function getAnimalThumb(code) {
  const filename = code.replace('?', '');
  return `/animals_icon/thumb/${filename}.png`;
}

/**
 * 首页组件
 * 包含：导航栏、Hero卡片、排行榜、科普钩子、动物预览、页脚
 */
export default function Home() {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(null);
  const [rankings, setRankings] = useState(null);

  // 读取localStorage历史结果（30天有效）
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
      // 只取基础8只动物的排名
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
            <span className="text-xs text-text-muted font-medium">中 / EN</span>
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
            {/* 太阳 */}
            <div className="absolute right-10 top-[22px] w-[42px] h-[42px] rounded-full animate-[floaty_6s_ease-in-out_infinite]" style={{ background: 'radial-gradient(circle at 38% 36%,#f8f1d9,#eaddb4)', boxShadow: '0 0 0 8px rgba(245,235,202,.32)' }} />
            {/* 山层 */}
            <div className="absolute inset-x-0 bottom-0 h-[112px]" style={{ background: 'linear-gradient(95deg,#c2dcab,#aece93)', clipPath: 'polygon(0 56%,14% 31%,30% 53%,46% 21%,60% 47%,76% 25%,90% 45%,100% 35%,100% 100%,0 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[92px]" style={{ background: 'linear-gradient(95deg,#8fb872,#79a85f)', clipPath: 'polygon(0 60%,12% 39%,26% 62%,40% 33%,54% 58%,70% 35%,84% 60%,100% 43%,100% 100%,0 100%)' }} />
            <div className="absolute inset-x-0 bottom-0 h-[74px]" style={{ background: 'linear-gradient(100deg,#4c7250,#3D5A47)', clipPath: 'polygon(0 70%,16% 43%,30% 66%,44% 38%,58% 64%,72% 41%,88% 66%,100% 51%,100% 100%,0 100%)' }} />
            {/* 小鸟装饰 */}
            <div className="absolute left-[157px] top-[101px] w-[18px] h-[15px] bg-[#f1f6ec]" style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
            <div className="absolute left-[53px] top-[108px] w-[14px] h-[12px] bg-[#f1f6ec]" style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} />
            {/* 底部渐隐 */}
            <div className="absolute inset-x-0 bottom-0 h-[34px]" style={{ background: 'linear-gradient(180deg,transparent,rgba(255,255,255,.45))' }} />
          </div>

          {/* 内容区 */}
          <div className="px-[22px] py-5 pb-6 text-center">
            <span className="inline-block text-xs font-bold text-primary bg-bg-tag px-[13px] py-1.5 rounded-full mb-[15px]">
              🏔️ 16题 · 13种横断山动物
            </span>
            <h1 className="text-[27px] leading-[1.28] font-black text-text-heading tracking-[.005em]" style={{ textWrap: 'balance' }}>
              测测你是横断山脉<br />哪种动物？
            </h1>
            <div className="font-mono text-[10.5px] tracking-[.14em] text-[#9aab86] mt-[11px]">
              WHICH HENGDUAN ANIMAL ARE YOU?
            </div>
            <p className="text-[13.5px] leading-[1.7] text-text-secondary mt-[14px]" style={{ textWrap: 'pretty' }}>
              16 道情景小题，找到你的本命横断山兽。<br />
              它们都是这片秘境里，正在消失的生命。
            </p>

            {/* 测试人次 */}
            {totalCount !== null && (
              <div className="inline-flex items-center gap-[7px] mt-4 bg-bg-green-light rounded-full px-[14px] py-[7px]">
                <span className="w-2 h-2 rounded-full bg-[#5f9a3f] animate-pulse" />
                <span className="text-[12.5px] text-text-body">
                  已有 <b className="font-num font-extrabold text-primary">{totalCount.toLocaleString()}</b> 人完成测试
                </span>
              </div>
            )}

            {/* 开始测试按钮 */}
            <button
              onClick={handleStart}
              className="relative overflow-hidden w-full mt-[18px] bg-primary text-white rounded-[18px] py-4 border-none cursor-pointer shadow-[0_8px_18px_rgba(61,90,71,.3)] hover:bg-primary-dark transition-colors"
            >
              <span className="absolute top-0 left-0 w-[40%] h-full animate-[sheen_3.6s_ease-in-out_infinite]" style={{ background: 'linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent)' }} />
              <span className="relative flex items-center justify-center gap-2">
                <span className="text-base font-extrabold">开始测试</span>
                <span className="font-mono text-[11px] tracking-[.06em] text-[#bcd0a6] border-l border-white/25 pl-2">START →</span>
              </span>
            </button>

            {/* 好友匹配入口 */}
            <button
              onClick={() => navigate('/match')}
              className="w-full mt-3 bg-[#fff4eb] text-accent-warm-dark border border-[#f0d4b8] rounded-[18px] py-3.5 cursor-pointer hover:bg-[#ffeedd] hover:border-accent-warm transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-base">🐾</span>
              <span className="text-[15px] font-bold">测测你们的 CP 好友匹配</span>
              <span className="font-mono text-[11px] tracking-[.06em] text-accent-warm border-l border-[#f0d4b8] pl-2">MATCH →</span>
            </button>

            {/* 查看上次结果 */}
            {hasHistory && (
              <div className="flex justify-end mt-3">
                <button
                  onClick={handleViewLast}
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer inline-flex items-center gap-[5px]"
                >
                  ↻ 查看上次结果
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
            <span className="font-black text-[15px] text-text-heading">👑 本命兽排行</span>
            {rankings && (
              <span className="text-[11px] text-text-tertiary">
                已测 · <b className="font-num text-text-secondary">{rankings.total.toLocaleString()}</b>
              </span>
            )}
          </div>

          {rankings ? (
            <div className="space-y-[14px]">
              {rankings.items.map((item, idx) => {
                const animal = baseAnimals.find(a => a.id === item.id);
                if (!animal) return null;
                const medals = ['🥇', '🥈', '🥉'];
                const barWidths = ['100%', '79%', '66%'];
                const barColors = ['#3D5A47', '#6f8a4e', '#9bb079'];
                return (
                  <RankRow
                    key={item.id}
                    medal={medals[idx]}
                    code={animal.code}
                    name={animal.name}
                    personalityName={animal.personalityName}
                    quote={animal.quote}
                    pct={item.pct}
                    barWidth={barWidths[idx]}
                    barColor={barColors[idx]}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-[14px]">
              {/* 占位骨架屏 */}
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
            <span className="text-[12.5px] font-extrabold text-text-heading">🥚 隐藏彩蛋</span>
            <span className="font-mono text-[9.5px] text-accent-warm tracking-[.08em]">HIDDEN · 测中即解锁</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['NULL', 'GLOW', 'SLAY?', '5G', 'SOFT'].map(code => (
              <span key={code} className="inline-flex items-center gap-[5px] text-[11.5px] bg-[#f5e9da] border border-[#ecd6bb] text-accent-warm-dark px-[11px] py-1.5 rounded-[16px]">
                ✦ <b className="font-mono text-[11px]">{code}</b>
              </span>
            ))}
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
            测完即解锁<b className="text-primary">该物种保护科普</b><br />
            每一次测试，都是一次微小的关注。
          </div>
        </motion.div>

        {/* 动物预览滚动 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="bg-bg-card rounded-[20px] py-[18px] mt-[13px] shadow-[0_8px_22px_rgba(50,65,35,.07)]"
        >
          <div className="flex justify-between items-baseline px-[18px] mb-[14px]">
            <div>
              <div className="font-black text-[15px] text-text-heading">13 种横断山兽</div>
              <div className="text-[11px] text-text-tertiary mt-0.5">
                8 种基础 · <span className="text-accent-warm font-bold">5 种隐藏彩蛋</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/animals')}
              className="text-xs text-primary font-bold cursor-pointer hover:text-primary-dark transition-colors"
            >
              图鉴 →
            </button>
          </div>

          {/* 横向滚动 */}
          <div className="flex gap-[11px] overflow-x-auto px-[18px] pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {baseAnimals.slice(0, 4).map(animal => (
              <div key={animal.id} className="flex-none w-[74px] text-center">
                <div
                  className="w-[74px] h-[74px] rounded-[18px] overflow-hidden border border-border"
                  style={{ background: AVATAR_BG }}
                >
                  <img
                    src={getAnimalThumb(animal.code)}
                    alt={animal.name}
                    className="w-full h-full object-contain p-1.5"
                  />
                </div>
                <div className="text-[11.5px] text-text-body mt-1.5">{animal.name}</div>
              </div>
            ))}
            {/* 彩蛋占位 */}
            <div className="flex-none w-[74px] text-center">
              <div
                className="w-[74px] h-[74px] rounded-[18px] border-[1.5px] border-border-egg flex flex-col items-center justify-end pb-1.5"
                style={{ background: 'linear-gradient(135deg,#3c3a44 0%,#2c2a33 52%,#201f27 100%)', boxShadow: 'inset 0 -8px 14px rgba(0,0,0,.2)' }}
              >
                <span className="text-xs">✦</span>
                <span className="font-mono text-[8px] text-[#d9b483]">彩蛋</span>
              </div>
              <div className="text-[11.5px] text-accent-warm-dark mt-1.5 font-semibold">？？？</div>
            </div>
            {/* +N 入口 */}
            <div className="flex-none w-[74px] text-center">
              <div className="w-[74px] h-[74px] rounded-[18px] bg-[#eef2e8] border-[1.5px] border-dashed border-[#c5d2b3] flex items-center justify-center">
                <span className="font-num font-extrabold text-[13px] text-[#8aa06a]">+8</span>
              </div>
              <div className="text-[11.5px] text-text-tertiary mt-1.5">全部</div>
            </div>
          </div>
        </motion.div>

        {/* 页脚 */}
        <div className="text-center mt-[22px] text-[11px] text-text-tertiary leading-[1.7] pb-4">
          HDTI · 横断山脉动物人格测试<br />
          <span className="text-text-footer">科普 × 趣味 · 为横断山的生物多样性</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 排行榜单行组件
 */
function RankRow({ medal, code, name, personalityName, quote, pct, barWidth, barColor }) {
  return (
    <div className="flex items-center gap-[11px]">
      <div className="flex-none">
        <div
          className="w-10 h-10 rounded-full overflow-hidden p-[3px] border border-border"
          style={{ background: AVATAR_BG }}
        >
          <img
            src={getAnimalThumb(code)}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className="text-[13.5px] truncate">
            <span className="text-[13px] mr-0.5">{medal}</span>
            <b className="font-mono text-text-heading">{code}</b>
            <span className="text-[12.5px] text-text-muted"> · {personalityName} · {name}</span>
          </span>
          <span className="font-num font-extrabold text-[13.5px] text-primary ml-2 flex-none">{pct}%</span>
        </div>
        {quote && (
          <div className="text-[11.5px] text-text-muted mt-1 truncate">「{quote}」</div>
        )}
        <div className="h-1.5 bg-[#eaf0e2] rounded-full mt-1.5 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: barWidth, background: barColor }} />
        </div>
      </div>
    </div>
  );
}
