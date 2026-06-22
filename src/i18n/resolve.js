/**
 * 从数据实体（动物、题目）解析双语文案。
 *
 * 数据约定（见 src/data/animals.js、questions.js）：
 *   entity.locale.zh  — 中文文案
 *   entity.locale.en  — 英文文案
 *
 * 语言无关字段（id、code、vector 等）保留在实体根层。
 */

/** @typedef {'zh' | 'en'} 语言代码 */

export const DEFAULT_LOCALE = 'zh';
export const SUPPORTED_LOCALES = ['zh', 'en'];

export function pickLocaleCopy(block, lang, fallback = DEFAULT_LOCALE) {
  if (!block) return undefined;
  return block[lang] ?? block[fallback];
}

/** 按语言展平动物记录。 */
export function pickAnimal(animal, lang) {
  if (!animal?.locale) return animal;
  const { locale, ...meta } = animal;
  return { ...meta, ...pickLocaleCopy(locale, lang) };
}

/** 按语言展平题目记录。 */
export function pickQuestion(question, lang) {
  const qCopy = pickLocaleCopy(question.locale, lang);
  return {
    text: qCopy.text,
    options: question.options.map((opt) => ({
      label: opt.label,
      text: pickLocaleCopy(opt.locale, lang).text,
    })),
  };
}
