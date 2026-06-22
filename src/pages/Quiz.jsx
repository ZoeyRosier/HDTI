import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import { useI18n, LangToggle } from '../i18n';

export default function Quiz() {
  const navigate = useNavigate();
  const { t, language, pickQuestion } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const question = questions[currentIndex];
  const localized = useMemo(
    () => pickQuestion(question),
    [question, language, pickQuestion],
  );
  const totalQuestions = questions.length;

  const handleSelect = useCallback((label) => {
    const key = `Q${question.id}`;
    setAnswers(prev => ({ ...prev, [key]: label }));

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setIsSubmitting(true);
        const finalAnswers = { ...answers, [key]: label };
        sessionStorage.setItem('hdti_answers', JSON.stringify(finalAnswers));
        setTimeout(() => navigate('/result'), 1500);
      }
    }, 300);
  }, [currentIndex, totalQuestions, answers, question.id, navigate]);

  const handleProgressClick = (index) => {
    if (index < currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-primary-dark text-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-4xl">
            🐾
          </div>
          <p className="text-lg font-medium mb-4">{t('quiz.submitting')}</p>
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

  return (
    <div className="min-h-dvh flex flex-col bg-bg-page">
      <div className="sticky top-0 z-10 bg-bg-page/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <button onClick={handleBack} className="text-text-muted hover:text-text-primary p-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="flex-1 flex items-center gap-1">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => handleProgressClick(i)}
              className={`h-1.5 flex-1 rounded-full transition-colors cursor-pointer ${
                i < currentIndex
                  ? 'bg-primary'
                  : i === currentIndex
                  ? 'bg-primary-light'
                  : 'bg-border'
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-mono text-text-muted min-w-[3rem] text-right">
          {String(currentIndex + 1).padStart(2, '0')}/{totalQuestions}
        </span>

        <LangToggle />
      </div>

      <div className="flex-1 px-5 py-6 flex flex-col max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${question.id}-${language}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <p className="text-xs uppercase tracking-widest text-text-muted mb-3 font-mono">
              {t('quiz.questionLabel')} {String(question.id).padStart(2, '0')}
            </p>

            <h2 className="text-xl font-bold text-text-primary mb-6 leading-snug">
              {localized.text}
            </h2>

            <div className="space-y-3 mt-auto">
              {localized.options.map((opt, i) => {
                const isSelected = answers[`Q${question.id}`] === opt.label;
                return (
                  <motion.button
                    key={opt.label}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.label)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                        : 'border-border bg-bg-card hover:border-primary-light'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{question.emoji[i]}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-relaxed ${isSelected ? 'text-primary-dark font-medium' : 'text-text-primary'}`}>
                          {opt.text}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="text-primary flex-shrink-0">✓</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-xs text-text-muted mt-6">
          {t('quiz.hint')}
        </p>
      </div>
    </div>
  );
}
