/** 图鉴卡片视觉元数据（渐变、emoji 占位） */
export const animalGradients = {
  snow_leopard: 'linear-gradient(150deg,#7fa9d6,#46699a)',
  yunnan_snub_monkey: 'linear-gradient(150deg,#e2b65a,#9a7528)',
  dhole: 'linear-gradient(150deg,#cf8a5a,#9c5630)',
  black_necked_crane: 'linear-gradient(150deg,#9aa9b4,#5e6e7a)',
  red_panda: 'linear-gradient(150deg,#e09a5c,#bd6a2c)',
  asian_black_bear: 'linear-gradient(150deg,#4a4a52,#26262e)',
  forest_musk_deer: 'linear-gradient(150deg,#8a9270,#5c6147)',
  takin: 'linear-gradient(150deg,#6fae97,#356959)',
  giant_panda: 'linear-gradient(150deg,#8a9a7a,#5a6a4a)',
  clouded_leopard: 'linear-gradient(150deg,#6a7a8a,#3a4a5a)',
  chinese_monal: 'linear-gradient(150deg,#7a9a6a,#4a6a3a)',
  snow_leopard_extreme: 'linear-gradient(150deg,#7fa9d6,#46699a)',
  monkey_extreme: 'linear-gradient(150deg,#e2b65a,#9a7528)',
};

export const animalEmojis = {
  snow_leopard: '🐆',
  yunnan_snub_monkey: '🐒',
  dhole: '🦊',
  black_necked_crane: '🦢',
  red_panda: '🦝',
  asian_black_bear: '🐻',
  forest_musk_deer: '🦌',
  takin: '🐂',
  giant_panda: '🐼',
  clouded_leopard: '🐆',
  chinese_monal: '🦚',
  snow_leopard_extreme: '🐆',
  monkey_extreme: '🐒',
};

export const IUCN_STYLES = {
  EN: { bg: 'bg-iucn-en-bg', text: 'text-iucn-en-text' },
  VU: { bg: 'bg-iucn-vu-bg', text: 'text-iucn-vu-text' },
  NT: { bg: 'bg-iucn-nt-bg', text: 'text-iucn-nt-text' },
};

export function getIucnStyle(status) {
  return IUCN_STYLES[status] ?? IUCN_STYLES.VU;
}

/** 卡片插画配置（默认 72%；scale/objectPosition 用于裁切 PNG 白边等） */
export const animalIconConfig = {
  snow_leopard: { size: '76%', scale: 1.1, objectPosition: '50% 56%', translateY: '-8px' },
  black_necked_crane: { size: '88%' },
};

export function getAnimalIconConfig(id) {
  return animalIconConfig[id] ?? { size: '72%' };
}
