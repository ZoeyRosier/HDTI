import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useI18n, LangToggle } from '../i18n';

export default function Loading() {
  const navigate = useNavigate();
  const { t } = useI18n();

  useEffect(() => {
    const answers = sessionStorage.getItem('hdti_answers')
      || localStorage.getItem('hdti_answers_backup');
    const timer = setTimeout(() => {
      navigate(answers ? '/result' : '/');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-primary-dark text-white px-6 relative">
      <div className="absolute top-3 right-3 md:top-4 md:right-4">
        <LangToggle variant="dark" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-4xl">
          🐾
        </div>
        <p className="text-lg font-medium mb-4">{t('loading.message')}</p>
        <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-white/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
}
