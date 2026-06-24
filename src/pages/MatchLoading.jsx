import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadMatchSession } from '../utils/match';
import { useI18n, LangToggle } from '../i18n';

const PRIMARY = '#4E6B53';
const STEPS = ['step1', 'step2', 'step3', 'step4', 'step5'];

export default function MatchLoading() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!loadMatchSession()) {
      navigate('/match', { replace: true });
      return;
    }

    const timers = STEPS.map((_, i) =>
      setTimeout(() => setActiveStep(i + 1), (i + 1) * 500),
    );

    const done = setTimeout(() => navigate('/match/result', { replace: true }), 2600);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [navigate]);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 relative"
      style={{ background: `linear-gradient(180deg, #2e4738 0%, ${PRIMARY} 100%)` }}
    >
      <div className="absolute top-3 right-3 md:top-4 md:right-4">
        <LangToggle variant="dark" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-white"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-2xl">
          🔬
        </div>

        <h1 className="text-lg font-bold text-center mb-8">{t('match.loadingTitle')}</h1>

        <div className="space-y-3">
          {STEPS.map((key, i) => {
            const done = activeStep > i;
            const current = activeStep === i + 1;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: done || current ? 1 : 0.35, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3"
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${
                    done ? 'bg-white/90 text-[#4E6B53]' : 'bg-white/20 text-white/60'
                  }`}
                >
                  {done ? '✓' : '·'}
                </span>
                <span className={`text-sm ${done ? 'text-white' : 'text-white/50'}`}>
                  {t(`match.${key}`)}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/80 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
