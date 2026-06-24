/**
 * 动物代号 → public/animals_icon 插画路径
 * 文件名与 code 对应，SLAY? → SLAY.png
 */
export function animalIconSrc(code) {
  const file = code.replace(/\?/g, '');
  return `/animals_icon/${file}.png`;
}
