/**
 * 横断山动物生态位档案 — 用于好友匹配关系路径判定。
 * 极致/隐藏形态通过 reuseScienceFrom 继承对应基础物种。
 */

/** @typedef {'apex_carnivore'|'pack_carnivore'|'ambush_carnivore'|'omnivore'|'large_herbivore'|'browser'|'folivore'|'bamboo_specialist'|'ground_bird'} TrophicLevel */

/**
 * @typedef {Object} EcologyProfile
 * @property {string[]} habitats
 * @property {[number, number]} elevation 米，近似活动海拔带
 * @property {TrophicLevel} trophic
 * @property {string[]} [prey] 基础物种 id
 * @property {string[]} [competitors] 基础物种 id
 * @property {{ zh: string, en: string }} niche 生态位简述
 */

/** @type {Record<string, EcologyProfile>} */
export const ecologyProfiles = {
  snow_leopard: {
    habitats: ['alpine_rock', 'alpine_snow', 'high_ridge'],
    elevation: [3500, 5500],
    trophic: 'apex_carnivore',
    prey: ['forest_musk_deer', 'takin'],
    competitors: ['clouded_leopard', 'dhole'],
    niche: { zh: '高寒裸岩顶级掠食者', en: 'apex predator of alpine scree' },
  },
  yunnan_snub_monkey: {
    habitats: ['alpine_conifer', 'canopy_forest'],
    elevation: [3000, 5000],
    trophic: 'folivore',
    competitors: ['asian_black_bear'],
    niche: { zh: '暗针叶林树冠灵长类', en: 'canopy primate of dark conifer forest' },
  },
  dhole: {
    habitats: ['montane_forest', 'forest_edge'],
    elevation: [2000, 4000],
    trophic: 'pack_carnivore',
    prey: ['forest_musk_deer', 'takin'],
    competitors: ['snow_leopard', 'clouded_leopard'],
    niche: { zh: '密林群猎配合者', en: 'cooperative forest pack hunter' },
  },
  black_necked_crane: {
    habitats: ['alpine_wetland', 'alpine_meadow'],
    elevation: [3000, 4500],
    trophic: 'ground_bird',
    niche: { zh: '高原湿地开阔地观察家', en: 'open wetland sentinel of the plateau' },
  },
  red_panda: {
    habitats: ['subalpine_forest', 'bamboo_understory'],
    elevation: [2000, 4000],
    trophic: 'bamboo_specialist',
    competitors: ['giant_panda', 'asian_black_bear'],
    niche: { zh: '亚高山竹丛节能者', en: 'subalpine bamboo understory specialist' },
  },
  asian_black_bear: {
    habitats: ['montane_forest', 'subalpine_forest', 'valley_forest'],
    elevation: [1500, 4000],
    trophic: 'omnivore',
    competitors: ['red_panda', 'takin', 'yunnan_snub_monkey'],
    niche: { zh: '山地杂食垂直迁徙者', en: 'seasonal montane omnivore migrant' },
  },
  forest_musk_deer: {
    habitats: ['mixed_forest', 'steep_scrub', 'forest_edge'],
    elevation: [2000, 4300],
    trophic: 'browser',
    niche: { zh: '针阔混交林隐伏食草者', en: 'shy browser of mixed forest and scrub' },
  },
  takin: {
    habitats: ['alpine_grass', 'rocky_slope', 'rhododendron_scrub'],
    elevation: [2500, 4500],
    trophic: 'large_herbivore',
    competitors: ['asian_black_bear'],
    niche: { zh: '高山草甸大型食草者', en: 'large herbivore of alpine meadows' },
  },
  giant_panda: {
    habitats: ['bamboo_forest', 'subalpine_forest'],
    elevation: [2000, 3500],
    trophic: 'bamboo_specialist',
    competitors: ['red_panda'],
    niche: { zh: '竹林特化大型食草者', en: 'bamboo-specialist mega-folivore' },
  },
  clouded_leopard: {
    habitats: ['mid_montane_forest', 'cloud_forest'],
    elevation: [1500, 3000],
    trophic: 'ambush_carnivore',
    prey: ['forest_musk_deer', 'red_panda'],
    competitors: ['snow_leopard', 'dhole'],
    niche: { zh: '中海拔树栖伏击者', en: 'mid-elevation arboreal ambusher' },
  },
  chinese_monal: {
    habitats: ['alpine_shrub', 'rhododendron_belt'],
    elevation: [3000, 4500],
    trophic: 'ground_bird',
    niche: { zh: '高山灌丛地栖雉类', en: 'ground-foraging pheasant of alpine scrub' },
  },
};

/** @param {string} animalId @param {import('./animals.js').animalsMap} animalsMap */
export function getBaseEcologyId(animalId, animalsMap) {
  const animal = animalsMap[animalId];
  if (!animal) return animalId;
  return animal.reuseScienceFrom ?? animalId;
}

/** @param {EcologyProfile} a @param {EcologyProfile} b */
export function habitatOverlapScore(a, b) {
  const setA = new Set(a.habitats);
  const setB = new Set(b.habitats);
  let inter = 0;
  for (const h of setA) {
    if (setB.has(h)) inter += 1;
  }
  const union = setA.size + setB.size - inter;
  return union === 0 ? 0 : inter / union;
}

/** @param {EcologyProfile} a @param {EcologyProfile} b */
export function elevationAdjacent(a, b) {
  const gap = Math.max(b.elevation[0] - a.elevation[1], a.elevation[0] - b.elevation[1]);
  return gap <= 800;
}

/** @param {EcologyProfile} a @param {EcologyProfile} b */
export function elevationOverlap(a, b) {
  const lo = Math.max(a.elevation[0], b.elevation[0]);
  const hi = Math.min(a.elevation[1], b.elevation[1]);
  if (hi <= lo) return 0;
  const span = Math.max(a.elevation[1] - a.elevation[0], b.elevation[1] - b.elevation[0], 1);
  return (hi - lo) / span;
}
