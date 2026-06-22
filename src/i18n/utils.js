/** 替换文案中的 `{key}` 占位符。 */
export function interpolate(str, vars) {
  if (!vars || typeof str !== 'string') return str;
  return str.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`);
}

/** 用点分 key 从语言字典中取值。 */
export function lookupMessage(dict, key) {
  return key.split('.').reduce((obj, part) => obj?.[part], dict);
}
