import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScienceCard({
  emoji,
  title,
  subtitle,
  content,
  badge,
  defaultOpen = false,
  isEgg,
  accentColor,
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (!content || content.startsWith('【') || content.includes('coming soon')) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-[18px] border border-border overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-[10px] bg-bg-tag flex items-center justify-center text-lg flex-none">
            {emoji}
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold text-text-heading">{title}</span>
            {subtitle && (
              <span
                className="block font-mono text-[9px] tracking-[.1em]"
                style={{ color: accentColor || (isEgg ? '#C4956A' : '#8a9379') }}
              >
                {subtitle}
              </span>
            )}
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
