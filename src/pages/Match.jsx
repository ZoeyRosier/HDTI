import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { animalsMap, baseAnimals } from '../data/animals';
import { parseInput, saveMatchSession } from '../utils/match';
import { generateShareUrl } from '../utils/share';
import { animalIconSrc } from '../utils/animalIcon';
import { useI18n, LangToggle } from '../i18n';

const PAGE_BG = '#F6F8F4';
const PRIMARY = '#4E6B53';
const ACCENT = '#F38B72';

export default function Match() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { t, language, pickAnimal } = useI18n();

  const [friendId, setFriendId] = useState(null);
  const [friendLinkInput, setFriendLinkInput] = useState('');
  const [friendLinkError, setFriendLinkError] = useState('');
  const [mineInput, setMineInput] = useState('');
  const [mineError, setMineError] = useState('');

  useEffect(() => {
    const r = searchParams.get('r');
    if (r && animalsMap[r]) {
      setFriendId(r);
    }
  }, [searchParams]);

  useEffect(() => {
    const selfStored = (() => {
      try {
        return JSON.parse(localStorage.getItem('hdti_result') || 'null');
      } catch {
        return null;
      }
    })();
    if (selfStored?.animalId) {
      setMineInput(generateShareUrl(selfStored.animalId, selfStored.matchRate ?? 0));
    }
  }, []);

  // 判断用户是否已有自己的测试结果
  const hasOwnResult = Boolean(mineInput);

  const friendAnimal = useMemo(
    () => (friendId ? pickAnimal(animalsMap[friendId]) : null),
    [friendId, language, pickAnimal],
  );

  const heroAnimals = baseAnimals.slice(0, 6);

  function handleFriendLinkConfirm() {
    setFriendLinkError('');
    const parsed = parseInput(friendLinkInput);
    if (!parsed.ok) {
      setFriendLinkError(t('match.errorInvalid'));
      return;
    }
    setFriendId(parsed.animalId);
  }

  function handleStart() {
    setMineError('');
    if (!friendId) {
      setFriendLinkError(t('match.errorNoFriend'));
      return;
    }
    const mineParsed = parseInput(mineInput);
    if (!mineParsed.ok) {
      setMineError(t('match.errorInvalid'));
      return;
    }
    if (mineParsed.animalId === friendId) {
      setMineError(t('match.errorSame'));
      return;
    }

    saveMatchSession({ mineId: mineParsed.animalId, friendId });
    navigate('/match/loading');
  }

  function handleGoTest() {
    // 记住朋友的动物ID，测完后回来自动识别
    if (friendId) {
      sessionStorage.setItem('hdti_match_pending_friend', friendId);
    }
    sessionStorage.removeItem('hdti_answers');
    localStorage.removeItem('hdti_answers_backup');
    navigate('/quiz');
  }

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: PAGE_BG }}>
      {/* Hero */}
      <div
        className="relative px-6 pt-10 pb-10 text-white overflow-hidden shrink-0"
        style={{ background: `linear-gradient(160deg, #2e4738 0%, ${PRIMARY} 45%, #3d5a47 100%)` }}
      >
        <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
          <LangToggle variant="dark" />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-white/60 hover:text-white text-sm mb-8 cursor-pointer"
        >
          ← {t('common.back')}
        </button>

        <div className="max-w-lg mx-auto text-center relative z-[1]">
          <div className="flex justify-center items-end gap-2 mb-6 h-16">
            {heroAnimals.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/15 border border-white/25 overflow-hidden flex items-center justify-center"
                style={{ marginBottom: i % 2 === 0 ? 0 : 8 }}
              >
                <img
                  src={animalIconSrc(a.code)}
                  alt={a.code}
                  className="w-full h-full object-contain p-0.5"
                />
              </motion.div>
            ))}
          </div>

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-mono mb-3">
            {t('match.labBadge')}
          </p>
          <h1 className="text-2xl md:text-[1.65rem] font-bold leading-snug mb-2">
            {t('match.labTitle')}
          </h1>
          <p className="text-sm text-white/75 leading-relaxed">{t('match.labSubtitle')}</p>
        </div>

        <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <svg viewBox="0 0 400 120" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="0,120 60,40 120,80 180,30 240,70 300,20 360,55 400,120" fill="white" />
          </svg>
        </div>
      </div>

      {/* Body — 与结果页相同：Hero 与浅色内容区分离，保留间距 */}
      <div className="flex-1 px-5 pt-8 pb-10 max-w-lg mx-auto w-full space-y-5">
        {/* Friend card */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4]">
          <p className="text-xs uppercase tracking-widest text-[#8a9379] font-mono mb-4">
            {t('match.friendCardLabel')}
          </p>

          {friendAnimal ? (
            <div className="flex flex-col items-center text-center">
              <AnimalAvatar code={friendAnimal.code} size="lg" />
              <p className="text-lg font-bold text-[#23271d] mt-3">{friendAnimal.name}</p>
              <p className="text-xs font-mono text-[#8a9379] tracking-wider mt-1">
                {friendAnimal.code} · {friendAnimal.personalityName}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-[#5f6a52] text-center leading-relaxed">
                {t('match.friendEmptyHint')}
              </p>
              <input
                type="text"
                value={friendLinkInput}
                onChange={(e) => { setFriendLinkInput(e.target.value); setFriendLinkError(''); }}
                placeholder={t('match.friendPlaceholder')}
                className={`w-full px-4 py-3 rounded-2xl border bg-[#F6F8F4] text-sm outline-none transition-colors ${
                  friendLinkError ? 'border-[#F38B72]' : 'border-[#e4e9dd] focus:border-[#4E6B53]'
                }`}
              />
              {friendLinkError && (
                <p className="text-xs text-[#F38B72]">{friendLinkError}</p>
              )}
              <button
                onClick={handleFriendLinkConfirm}
                className="w-full py-2.5 rounded-2xl border border-[#e4e9dd] text-sm text-[#4E6B53] font-medium hover:bg-[#F6F8F4] transition-colors cursor-pointer"
              >
                {t('match.identifyFriend')}
              </button>
            </div>
          )}
        </div>

        {/* Mine input — 区分有结果 / 无结果两种状态 */}
        {hasOwnResult ? (
          <div className="bg-white rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border border-[#e8ede4] space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#23271d] mb-1.5">
                {t('match.mineInputLabel')}
              </label>
              <input
                type="text"
                value={mineInput}
                onChange={(e) => { setMineInput(e.target.value); setMineError(''); }}
                placeholder={t('match.minePlaceholder')}
                className={`w-full px-4 py-3 rounded-2xl border bg-[#F6F8F4] text-sm outline-none transition-colors ${
                  mineError ? 'border-[#F38B72]' : 'border-[#e4e9dd] focus:border-[#4E6B53]'
                }`}
              />
              {mineError ? (
                <p className="text-xs text-[#F38B72] mt-1.5">{mineError}</p>
              ) : (
                <p className="text-xs text-[#8a9379] mt-1.5">{t('match.inputHint')}</p>
              )}
            </div>

            <button
              onClick={handleStart}
              className="w-full py-3.5 rounded-2xl text-white font-medium transition-opacity hover:opacity-90 cursor-pointer"
              style={{ backgroundColor: ACCENT }}
            >
              {t('match.startAnalysis')}
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-[24px] p-6 shadow-[0_8px_32px_rgba(78,107,83,0.08)] border-2 border-dashed border-[#b8c9a8] text-center space-y-4"
            style={{ background: 'linear-gradient(160deg, #f4f9f0 0%, #eaf3e3 100%)' }}
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
              🐾
            </div>
            <div>
              <p className="text-lg font-bold text-[#2e4738]">
                {t('match.noResultTitle')}
              </p>
              <p className="text-sm text-[#5f6a52] mt-1.5 leading-relaxed">
                {t('match.noResultDesc')}
              </p>
            </div>
            <button
              onClick={handleGoTest}
              className="w-full py-4 rounded-2xl text-white font-bold text-base transition-opacity hover:opacity-90 cursor-pointer shadow-[0_6px_16px_rgba(61,90,71,.25)]"
              style={{ background: `linear-gradient(135deg, ${PRIMARY} 0%, #3d6b4a 100%)` }}
            >
              {t('match.goTestBtn')}
            </button>
            <p className="text-xs text-[#8a9379]">
              {t('match.goTestHint')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export function AnimalAvatar({ code, size = 'md', variant = 'light' }) {
  const sizes = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-24 h-24',
    xl: 'w-28 h-28 md:w-32 md:h-32',
  };
  const shell =
    variant === 'dark'
      ? 'bg-white/15 border-white/25'
      : 'bg-[#eef3ea] border-[#dce6d6]';

  return (
    <div
      className={`${sizes[size]} rounded-full overflow-hidden flex items-center justify-center border-2 shrink-0 ${shell}`}
    >
      <img
        src={animalIconSrc(code)}
        alt={code}
        className="w-[88%] h-[88%] object-contain"
      />
    </div>
  );
}
