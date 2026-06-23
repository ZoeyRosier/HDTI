import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTotalCount, getAllCounts } from '../utils/supabase';
import { animals, baseAnimals } from '../data/animals';

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
  const [eggStats, setEggStats] = useState(null);
  const [faqOpen, setFaqOpen] = useState(true);
  const [dimOpen, setDimOpen] = useState(false);

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

      // 彩蛋动物百分比
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
              className="w-full mt-3 bg-[#c4663f] text-white border border-[#a8502e] rounded-[18px] py-3.5 cursor-pointer hover:bg-[#b05a36] hover:border-[#943f22] transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-base">🐾</span>
              <span className="text-[15px] font-bold">测测你们的 CP 好友匹配</span>
              <span className="font-mono text-[11px] tracking-[.06em] text-white/70 border-l border-white/25 pl-2">MATCH →</span>
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
            测完即解锁<b className="text-primary">该物种保护科普</b><br />
            每一次测试，都是一次微小的关注。
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

          {/* 动物卡片网格 */}
          <div className="grid grid-cols-5 gap-2.5 px-[18px]">
            {baseAnimals.slice(0, 4).map(animal => (
              <div
                key={animal.id}
                className="flex flex-col items-center text-center p-2.5 rounded-[16px] border border-border bg-white cursor-pointer hover:border-primary-light hover:shadow-sm transition-all"
                onClick={() => navigate(`/result?r=${animal.id}&preview=1`)}
              >
                <div className="text-[11px] text-text-muted mb-1 whitespace-nowrap">{animal.name}</div>
                <div className="w-[52px] h-[52px] flex items-center justify-center mb-1.5">
                  <img
                    src={getAnimalThumb(animal.code)}
                    alt={animal.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="font-mono text-[13px] font-black text-text-heading whitespace-nowrap">{animal.code}</div>
                <div className="text-[10.5px] text-text-muted mt-0.5 whitespace-nowrap">{animal.personalityName}</div>
              </div>
            ))}
            {/* 彩蛋占位 */}
            <div
              className="flex flex-col items-center justify-center text-center p-2.5 rounded-[16px] border-[1.5px] border-[#5a5660]"
              style={{ background: 'linear-gradient(135deg,#3c3a44 0%,#2c2a33 52%,#201f27 100%)' }}
            >
              <span className="text-lg mb-1">✦</span>
              <span className="font-mono text-[10px] text-[#d9b483] whitespace-nowrap">隐藏彩蛋</span>
              <span className="font-mono text-[13px] text-[#d9b483] font-bold mt-1">？？？</span>
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
              <span className="font-black text-[15px] text-text-heading">🔍 算法透明 & FAQ</span>
              <span className="font-mono text-[9.5px] text-text-tertiary tracking-[.08em]">HOW IT WORKS</span>
            </div>
            <span className="text-xs font-bold text-primary">{faqOpen ? '收起 ↑' : '展开 ↓'}</span>
          </button>

          {faqOpen && (<>
          <FaqItem title="16 道题背后的数据结构" defaultOpen>
            <p>HDTI 的界面看起来很简单——16 道题，每道 4 个选项，点点点就完事了。但在你点"下一题"的那几秒钟里，后台已经在悄悄搭建一个关于你的行为模型了。</p>
            <p className="mt-2">首先要明白一个核心结构：这 16 道题<b>不是随机排列的</b>。它们被精确分配到 7 个行为维度上，其中 6 道是「核心题」，权重翻倍。每个选项背后都藏着一组 7 维向量——你选的不是 ABCD，而是在告诉系统你在每个维度上偏哪边。</p>
            <p className="mt-2">16 道题做完，系统手里有了一串加权累加后的原始向量。接下来把它归一化回 <b>1-3 的区间</b>，就得到了你的 7 维人格画像。每个维度被归为三档：</p>
            <div className="mt-2 pl-3 border-l-2 border-primary/20 space-y-1">
              <p><b>≤1.5</b> → L（Low，低）</p>
              <p><b>1.5-2.5</b> → M（Medium，中）</p>
              <p><b>≥2.5</b> → H（High，高）</p>
            </div>
            <p className="mt-2">这 7 个字母组合起来，就是你的「人格 DNA」——HDTI 所有后续计算的输入。</p>
          </FaqItem>

          <FaqItem title="模式匹配：你的 DNA 对比 8 种标准模板">
            <p>拿到你的人格 DNA 之后，系统要做的事情是：把它和 <b>8 种基础动物的标准 DNA</b> 逐一比较，找出最像你的那个。</p>
            <p className="mt-2">比较的方法用的是<b>曼哈顿距离（Manhattan Distance）</b>。先把 L/M/H 映射成数字：L=1，M=2，H=3。然后把你的 7 维数字串和动物标准的 7 维数字串逐位相减，取绝对值，再加总。</p>
            <p className="mt-2">举个例子。假设你的向量是 <code className="text-[11px] bg-bg-tag px-1.5 py-0.5 rounded">[2,3,1,2,2,3,3]</code>，拿它和雪豹 SOLO 的标准向量 <code className="text-[11px] bg-bg-tag px-1.5 py-0.5 rounded">[2,3,1,1,2,3,3]</code> 比较：</p>
            <p className="mt-1 pl-3 text-[11.5px] text-text-muted">逐位差异：|2-2|+|3-3|+|1-1|+|2-1|+|2-2|+|3-3|+|3-3| = <b className="text-text-heading">1</b></p>
            <p className="mt-2">然后转换成匹配度：<code className="text-[11px] bg-bg-tag px-1.5 py-0.5 rounded">round((1 - 1/14) × 100)% = 93%</code>。距离越小，匹配度越高。理论最大距离是 14（7 个维度每个差 2），所以除以 14 做归一化。</p>
            <p className="mt-2">距离最小的动物，就是你的本命横断山兽。如果有并列？系统会用特定核心题的选择做决胜。</p>
          </FaqItem>

          <FaqItem title="彩蛋动物和「极致形态」">
            <p>除了 8 种基础动物，系统里还藏着 <b>5 种隐藏彩蛋</b>。它们不走曼哈顿距离的常规通道——而是由特殊的答题模式触发。</p>
            <p className="mt-2">比如，某些核心题如果你全部选了同一个极端倾向，或者两种看似矛盾的动物分数同时被你拉到极高，系统就会判定你触发了彩蛋路径。具体哪几道题、什么组合？不公开。测中即解锁，测不中也不亏——你已经有一只属于你的本命兽了。</p>
          </FaqItem>

          <FaqItem title="我的数据安全吗？">
            <p><b>所有计算都在你的浏览器里跑。</b>没有后端接口，没有数据库存你的答案，没有任何人能看到你选了什么。</p>
            <p className="mt-2">服务器唯一记录的是：「又有一个人测出了雪豹」这种匿名计数。分享链接里只有动物 ID 和匹配度，不含你的答题记录。换句话说，就算有人截获了你的分享链接，他们也只能知道你是哪只动物，不知道你是怎么变成它的。</p>
          </FaqItem>

          <FaqItem title="HDTI 准确吗？">
            <p>HDTI 是一款以横断山脉 13 种濒危动物为载体的<b>趣味人格测试</b>，不是心理学临床量表。它的核心目的是：让你在 2 分钟内和一只真实存在的濒危动物产生连接，然后顺便了解一下它的真实处境。</p>
            <p className="mt-2">如果你觉得结果很准——很好，说明我们的维度设计没白费；如果你觉得不准——也很好，说明你比一个 7 维向量要复杂得多。这本身就是一件值得高兴的事。</p>
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
              <span className="font-black text-[15px] text-text-heading">📐 7 维度深度解析</span>
              <span className="font-mono text-[9.5px] text-text-tertiary tracking-[.08em]">DIMENSIONS</span>
            </div>
            <span className="text-xs font-bold text-primary">{dimOpen ? '收起 ↑' : '展开 ↓'}</span>
          </button>

          {dimOpen && (<>
          <p className="text-[12.5px] text-text-body leading-[1.75]">拿到 HDTI 结果之后，大多数人的注意力都在四字母代码上——SOLO、WI-FI、TANK，多有辨识度。但如果你只看动物不看维度，就像拿到体检报告只看"正常/异常"的大字结论，把后面几页指标全扔了。真正有意思的东西，藏在那 7 个维度里。</p>
          <p className="text-[12.5px] text-text-body leading-[1.75] mt-2">HDTI 把行为拆成了 <b>7 个维度</b>，分属 3 组行为模型。每个维度有三个档位：<b>L</b>（Low，低）、<b>M</b>（Medium，中）、<b>H</b>（High，高）。这三个字母不是成绩单——不是 H 就好、L 就差。它们描述的是你在某个行为层面上的<b>偏好方向</b>，就像你习惯用左手还是右手，没有高下之分。</p>
          <div className="mt-3 bg-bg-tag rounded-[12px] px-4 py-3">
            <p className="text-[11.5px] font-bold text-text-heading mb-1.5">📚 学术框架</p>
            <p className="text-[11.5px] text-text-body leading-[1.7]">基于 Réale et al. (2007) 提出的动物人格五大维度：Boldness（大胆性）、Exploration（探索性）、Activity（活动性）、Aggressiveness（攻击性）、Sociability（社群性）。HDTI 将大胆性拆为 D1+D2，社群性拆为 D3+D4，形成 7 维度模型。</p>
            <p className="text-[11px] text-text-muted leading-[1.6] mt-1.5 italic">Réale, D., Reader, S. M., Sol, D., et al. (2007). Integrating animal temperament within ecology and evolution. <i>Biological Reviews</i>, 82(2), 291-318.</p>
            <a href="https://doi.org/10.1111/j.1469-185X.2007.00010.x" target="_blank" rel="noopener noreferrer" className="text-[11px] text-primary hover:text-primary-dark transition-colors mt-1 inline-block">doi:10.1111/j.1469-185X.2007.00010.x →</a>
          </div>

          <FaqItem title="行为模型：你和环境的关系（D1 & D2）">
            <p><b className="text-text-heading">D1 环境探索倾向</b>——你的脚比脑子快，还是脑子比脚快？</p>
            <p className="mt-1">D1 为 H 的人，看到一条没走过的路，第一反应是"走走看"。不是鲁莽，是对未知区域有天然的吸引力，别人还在查攻略你已经出发了。雪豹 SOLO 在这个维度上偏中——不是不探索，是先在高处把地形看完了再决定去不去。</p>
            <p className="mt-1">D1 为 L 的人更像林麝 GHOST：熟悉的路线走了八百遍也不腻，因为每一步都是确定的，确定的东西让人安心。不是胆小，是你的安全阈值比别人高——要确认"这里没问题"才会往前。</p>
            <p className="mt-1">M 呢？会探索，但得先确认退路在哪。既不是闭着眼往前冲，也不是钉在原地不动。大多数人其实都在 M 附近。</p>

            <p className="mt-3"><b className="text-text-heading">D2 应激反应模式</b>——危险来了，你的身体先做了什么？</p>
            <p className="mt-1">注意，这里测的不是你"想"怎么做，是你的<b>第一反应</b>。D2 为 H 的人，被人踩了一脚，嘴上还没说话呢，身体已经转过来了。羚牛 TANK 和亚洲黑熊 MINE 在这里都偏高——不是暴脾气，是"被威胁→正面回应"这个回路特别短。</p>
            <p className="mt-1">D2 为 L 的人更像林麝 GHOST：感知到不对劲的速度比任何人都快，但第一反应不是怼回去，而是瞬间消失。在别人还没反应过来的时候，你已经规划好了三条退路。这不是怂，这是"保命优先级极高"的生存策略。</p>
          </FaqItem>

          <FaqItem title="社交模型：你和人群的关系（D3 & D4）">
            <p><b className="text-text-heading">D3 同伴依赖度</b>——一个人待三天，你是充电完毕还是快要发疯？</p>
            <p className="mt-1">D3 为 H 的人，身边没人会心慌。不是没有独立能力，而是有人在旁边这件事本身就是一种"系统在线"的信号。滇金丝猴 WI-FI 在这里拉满——它们在自然界里就是靠上百只猴子抱团取暖才能活过冬天。</p>
            <p className="mt-1">D3 为 L 的人，一个人待着不叫孤独，叫自由。你的能量恢复机制是"把人清空"，不是"把人填满"。小熊猫 REST 就是这个维度的代言人：有边界感，预热时间长，但一旦进入舒适区，温热得很。</p>

            <p className="mt-3"><b className="text-text-heading">D4 连接主动性</b>——群里冷场 5 秒，你是补位的那个人吗？</p>
            <p className="mt-1">D4 测的不是你"社不社恐"，而是你<b>主动发出社交信号</b>的频率。D4 为 H 的人是天然的场子发动机——话题快断了你顺手接，有人被晾着你第一个注意到。豺 COO 全维度几乎拉满，D4 也是 H：它们在野外靠类似鸟鸣的"口哨声"在密林中保持联系，本质上就是在持续广播"我在这儿"。</p>
            <p className="mt-1">D4 为 L？不是你不会社交，是你觉得"主动出击"这件事太累了。等别人来找你吧——找到了说明缘分到了，找不到说明不必要。</p>
          </FaqItem>

          <FaqItem title="驱动 & 策略模型：能量、底线、选择（D5-D7）">
            <p><b className="text-text-heading">D5 活动性</b>——闲下来对你来说是奖励还是惩罚？</p>
            <p className="mt-1">这个维度测的是你的"基础代谢型人格"。D5 为 H 的人，闲下来比忙着更难受——永远有下一件事在排队，手停了脑子也不停。豺 COO 和亚洲黑熊 MINE 都是 H：一个靠高频行动打团战，一个靠不停觅食保持安全感。</p>
            <p className="mt-1">D5 为 L 就是小熊猫 REST 的哲学：能躺着绝不坐着。不是懒，是你的能耗管理系统极其精密——无效的忙碌会被自动归类为"高耗低效"，然后你就开始犯困了。这不是摸鱼，这是进化出来的自我保护。</p>

            <p className="mt-3"><b className="text-text-heading">D6 资源竞争策略</b>——碰了你的东西，你的反应有多快、多烈？</p>
            <p className="mt-1">D6 高的人有一张非常清晰的内心地图，上面标着"我的"和"不是我的"。一旦有人把手伸过界——无论是时间、资源还是某条你从没明说的底线——切换速度会让对方一瞬间不确定刚才那个好说话的你是不是幻觉。亚洲黑熊 MINE 和雪豹 SOLO 都在这里偏高。</p>
            <p className="mt-1">D6 为 L 的人，退一步海阔天空不是口号，是你真实的能量分配策略。不是没底线，是你的底线画得更靠后——大多数事情在你看来都不值得正面硬刚。滇金丝猴 WI-FI 在这里偏低：群居动物的妥协不是软弱，是长期合作的入场券。</p>

            <p className="mt-3"><b className="text-text-heading">D7 探索性/开放性</b>——计划被打乱，你需要多久切换到 Plan B？</p>
            <p className="mt-1">D7 为 H 的人，脑子里永远有七条备选路线。此路不通？好，0.5 秒后已经在走另一条了。黑颈鹤 CCTV 和亚洲黑熊 MINE 在这里都是 H——一个靠灵活观察把一切变量纳入视野，一个靠随季节垂直迁徙来适应环境变化。</p>
            <p className="mt-1">D7 为 L 的人，老办法用得好好的，为什么要换？换了万一翻车呢？不是保守，是你对"已验证方案"有极高的信任度。羚牛 TANK 在这里是 L：推不动我的东西，我就一直推，直到它动了为止。换路？不存在的。</p>
          </FaqItem>

          <div className="border-t border-dashed border-border mt-3 pt-3">
            <p className="text-[12.5px] text-text-body leading-[1.75]"><b>别把维度当诊断书。</b>L、M、H 没有好坏。D1 为 L 不代表你胆小，可能只是你对环境的敏感度更高——这种敏感在很多场景下反而是优势。D6 为 H 不代表你攻击性强，可能只是你对"属于我的东西"有更清晰的认知。</p>
            <p className="text-[12.5px] text-text-body leading-[1.75] mt-2">维度的价值不在于告诉你"你哪里有问题"，而在于帮你看清自己的偏好模式。你可以拿着 7 个维度的得分去跟朋友对比——"原来你 D3 这么低，难怪你总一个人待着"——这种对话本身就是 HDTI 最有意思的部分。</p>
          </div>
          </>)}
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

/** 维度说明行 */
function DimRow({ code, name, desc }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[11px] font-bold text-primary flex-none">{code}</span>
      <span className="text-[12.5px] font-bold text-text-heading flex-none">{name}</span>
      <span className="text-[12px] text-text-muted">{desc}</span>
    </div>
  );
}

/**
 * 排行榜单行组件
 */
function RankRow({ medal, code, name, personalityName, quote, pct, barWidth, barColor }) {
  const iconFile = code.replace('?', '');
  return (
    <div className="flex items-center gap-[11px]">
      <div className="flex-none">
        <div
          className="w-12 h-12 rounded-full overflow-hidden p-[3px] border border-border"
          style={{ background: AVATAR_BG }}
        >
          <img
            src={`/animals_icon/${iconFile}.png`}
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
