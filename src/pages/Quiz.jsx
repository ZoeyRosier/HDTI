import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/questions';
import { useI18n, LangToggle } from '../i18n';

function loadAnswers() {
  try {
    const saved = sessionStorage.getItem('hdti_answers');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function saveAnswers(answers) {
  sessionStorage.setItem('hdti_answers', JSON.stringify(answers));
}

export default function Quiz() {
  const navigate = useNavigate();
  const { t, language, pickQuestion } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(loadAnswers);
  const advanceTimerRef = useRef(null);

  const safeIndex = Math.min(currentIndex, questions.length - 1);
  const question = questions[safeIndex];
  const localized = useMemo(
    () => pickQuestion(question),
    [question, language, pickQuestion],
  );
  const totalQuestions = questions.length;
  const currentKey = `Q${question.id}`;
  const currentAnswer = answers[currentKey];

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const handleSelect = useCallback(
    (label) => {
      const key = `Q${question.id}`;

      setAnswers((prev) => {
        const next = { ...prev, [key]: label };
        saveAnswers(next);
        return next;
      });

      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      const isLastQuestion = currentIndex >= totalQuestions - 1;
      advanceTimerRef.current = setTimeout(() => {
        if (isLastQuestion) {
          navigate('/loading');
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, 300);
    },
    [currentIndex, totalQuestions, question.id, navigate],
  );

  const handleProgressClick = (index) => {
    if (index < currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigate('/');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentAnswer && currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col bg-bg-page">
      <div className="sticky top-0 z-10 bg-bg-page/95 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
        <button
          onClick={handleBack}
          className="text-text-muted hover:text-text-primary p-1 cursor-pointer"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 4L6 10L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="flex-1 flex items-center gap-1">
          {questions.map((q, i) => (
            <button
              key={q.id}
              onClick={() => handleProgressClick(i)}
              disabled={i >= currentIndex}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < currentIndex ? 'cursor-pointer' : 'cursor-default'
              } ${
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

      <div className="flex-1 px-5 py-6 flex flex-col max-w-lg mx-auto w-full pb-28">
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
                const isSelected = currentAnswer === opt.label;
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
                        <p
                          className={`text-sm leading-relaxed ${
                            isSelected ? 'text-primary-dark font-medium' : 'text-text-primary'
                          }`}
                        >
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

      <div className="fixed bottom-0 inset-x-0 z-10 bg-bg-page/95 backdrop-blur-sm border-t border-border px-5 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex-1 py-3 rounded-[18px] border border-border-button bg-bg-card text-text-body text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:border-primary-light cursor-pointer"
          >
            {t('quiz.prev')}
          </button>
          <button
            onClick={handleNext}
            disabled={!currentAnswer || currentIndex >= totalQuestions - 1}
            className="flex-1 py-3 rounded-[18px] bg-primary text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-dark cursor-pointer"
          >
            {t('quiz.next')}
          </button>
        </div>
      </div>
    </div>
  );
}
