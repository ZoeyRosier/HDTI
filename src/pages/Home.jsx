import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTotalCount } from '../utils/supabase';

export default function Home() {
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(null);
  const lastResult = JSON.parse(localStorage.getItem('hdti_result') || 'null');
  const hasHistory = lastResult && (Date.now() - lastResult.timestamp < 30 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    getTotalCount().then(count => {
      if (count !== null) setTotalCount(count);
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
    <div className="min-h-dvh flex flex-col">
      {/* Hero */}
      <div className="bg-primary-dark text-white px-6 pt-12 pb-10 flex flex-col items-center text-center">
        <div className="w-full max-w-md">
          {/* Mountain decoration placeholder */}
          <div className="h-20 mb-6 flex items-end justify-center">
            <svg viewBox="0 0 320 80" className="w-full h-full opacity-30">
              <polygon points="0,80 40,30 80,60 120,20 160,50 200,10 240,40 280,25 320,80" fill="currentColor" />
            </svg>
          </div>

          <span className="inline-block bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full mb-4">
            🌿 16题 · 13种动物人格
          </span>

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            测测你是横断山脉哪种动物？
          </h1>

          <p className="text-xs tracking-widest uppercase text-white/60 mb-6">
            WHICH HENGDUAN ANIMAL ARE YOU?
          </p>
        </div>
      </div>

      {/* Action area */}
      <div className="flex-1 px-6 py-8 flex flex-col items-center">
        <div className="w-full max-w-md space-y-4">
          <p className="text-text-secondary text-sm leading-relaxed text-center">
            16道情景小题，找到你的本命横断山兽。
            <br />
            它们都是这片秘境里，正在消失的生命。
          </p>

          {totalCount !== null && (
            <p className="text-center text-xs text-text-muted">
              🟢 已有 <span className="font-mono font-medium text-text-secondary">{totalCount.toLocaleString()}</span> 人完成测试
            </p>
          )}

          <button
            onClick={handleStart}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-medium text-base hover:bg-primary-dark transition-colors cursor-pointer"
          >
            ✦ 开始测试 START →
          </button>

          {hasHistory && (
            <button
              onClick={handleViewLast}
              className="w-full text-text-muted text-sm py-2 hover:text-text-secondary transition-colors cursor-pointer"
            >
              ↩ 查看上次结果
            </button>
          )}
        </div>

        {/* Bottom hook */}
        <div className="mt-auto pt-8 text-center text-xs text-text-muted space-y-1">
          <p>🌱 测完即解锁该物种保护科普</p>
          <p>每一次测试，都是一次微小的关注。</p>
        </div>
      </div>
    </div>
  );
}
