/**
 * 好友匹配关系文案 — 基于生态路径为全部动物组合程序化生成。
 * 路径：捕食链 / 生境重叠 / 资源相邻 / 潜在竞争 / 生态位分化
 * 契合度后缀与 scoring.calcMatchRate 的向量距离公式对齐。
 */

import { animalsMap } from './animals';
import {
  ecologyProfiles,
  getBaseEcologyId,
  habitatOverlapScore,
  elevationAdjacent,
  elevationOverlap,
} from './ecologyProfiles';

export const HIGH_COMPAT_THRESHOLD = 78;

/** @typedef {'predator_prey'|'habitat_overlap'|'adjacent_resources'|'potential_competition'|'niche_differentiation'|'morph_variant'} RelationPath */

/** @param {string} idA @param {string} idB */
export function pairKey(idA, idB) {
  return [idA, idB].sort().join('|');
}

/** @param {string} key */
function hashKey(key) {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** @param {string} id */
function getProfile(id) {
  const baseId = getBaseEcologyId(id, animalsMap);
  return ecologyProfiles[baseId] ?? ecologyProfiles.forest_musk_deer;
}

/**
 * @param {string} idA
 * @param {string} idB
 * @returns {{ path: RelationPath, hunter?: string, prey?: string, overlap?: number }}
 */
export function resolveRelationPath(idA, idB) {
  const baseA = getBaseEcologyId(idA, animalsMap);
  const baseB = getBaseEcologyId(idB, animalsMap);
  const ecoA = getProfile(idA);
  const ecoB = getProfile(idB);

  if (idA !== idB && baseA === baseB) {
    return { path: 'morph_variant' };
  }

  if (ecoA.prey?.includes(baseB)) {
    return { path: 'predator_prey', hunter: idA, prey: idB };
  }
  if (ecoB.prey?.includes(baseA)) {
    return { path: 'predator_prey', hunter: idB, prey: idA };
  }

  const competitors =
    ecoA.competitors?.includes(baseB) ||
    ecoB.competitors?.includes(baseA) ||
    (ecoA.trophic === ecoB.trophic &&
      ecoA.trophic !== 'ground_bird' &&
      habitatOverlapScore(ecoA, ecoB) >= 0.25);

  if (competitors) {
    return { path: 'potential_competition' };
  }

  const overlap = habitatOverlapScore(ecoA, ecoB);
  const elevOverlap = elevationOverlap(ecoA, ecoB);

  if (overlap >= 0.33 || elevOverlap >= 0.45) {
    return { path: 'habitat_overlap', overlap: Math.max(overlap, elevOverlap) };
  }

  if (
    elevationAdjacent(ecoA, ecoB) ||
    (elevOverlap > 0 && ecoA.trophic !== ecoB.trophic)
  ) {
    return { path: 'adjacent_resources' };
  }

  return { path: 'niche_differentiation' };
}

/** @param {string} id @param {'zh'|'en'} lang */
function animalName(id, lang) {
  const animal = animalsMap[id];
  if (!animal) return id;
  return lang === 'en' ? (animal.nameEn ?? animal.name) : animal.name;
}

/** @param {string} id @param {'zh'|'en'} lang */
function firstTag(id, lang) {
  const animal = animalsMap[id];
  if (!animal) return '';
  if (lang === 'en') {
    return animal.personalityNameEn ?? animal.tags?.[0] ?? '';
  }
  return animal.tags?.[0] ?? '';
}

const PATH_META = {
  predator_prey: {
    pathTags: {
      zh: ['捕食链上下', '追迹与警觉', '动线错位'],
      en: ['Trophic ladder', 'Pursuit & alert', 'Offset trajectories'],
    },
    names: {
      zh: ['雪峰追迹线', '林缘伏击局', '高山猎场', '明暗动线', '裸岩追逐赛', '追迹者与闪避者', '顶级掠食场'],
      en: ['Alpine Pursuit Line', 'Forest-Edge Ambush', 'High-Mountain Hunt', 'Light & Shadow Tracks', 'Scree Chase', 'Tracker & Evader', 'Apex Predator Field'],
    },
    descs: {
      zh: [
        '{hunter}与{prey}在横断山的食物链上本就处于上下位——一个习惯锁定目标、精准出手，一个靠灵敏与退路求生。放到关系里，这像「一个推进、一个避险」的配合：推进的人未必咄咄逼人，避险的人也不是逃避，而是各自把最擅长的生存策略带到了这段连接里。',
        '在生态上，{hunter}是{hunterNiche}，{prey}是{preyNiche}。你们之间天然存在「观察—反应」的张力：一方读场、一方走位。理解这种结构，反而少了很多「谁该让谁」的误会——你们本来就不是同一种节奏。',
        '{hunter}负责把局势推向关键节点，{prey}负责在关键节点前保留余地。这不是谁压制谁，而是横断山里最古老的协作型张力：没有闪避，就没有追迹的意义；没有追迹，闪避也无处安放。',
      ],
      en: [
        '{hunter} and {prey} sit on different rungs of the Hengduan food web — one locks on and strikes clean, the other survives on reflex and exit routes. In human terms: one pushes, one holds space. Neither is "the villain"; you each brought your native survival strategy into this bond.',
        'Ecologically, {hunter} is {hunterNicheEn}; {prey} is {preyNicheEn}. Your bond carries a built-in observe–react tension. Name that structure and much of the "who should yield" friction fades — you were never the same rhythm to begin with.',
        '{hunter} drives toward the decisive moment; {prey} keeps margin before it arrives. Not domination — the oldest cooperative tension in these mountains: pursuit needs evasion; evasion needs something worth responding to.',
      ],
    },
  },
  habitat_overlap: {
    pathTags: {
      zh: ['同域共生', '生境重叠', '共享山谷'],
      en: ['Shared range', 'Habitat overlap', 'Same valley'],
    },
    names: {
      zh: ['同谷邻居', '重叠生境', '共享山脉带', '平行栖息线', '山谷双栖', '同域旅伴', '生态重叠区'],
      en: ['Same-Valley Neighbors', 'Overlapping Range', 'Shared Mountain Belt', 'Parallel Habitat Lines', 'Dual Valley Dwellers', 'Range Companions', 'Ecological Overlap Zone'],
    },
    descs: {
      zh: [
        '{nameA}与{nameB}的活动带在横断山高度重叠——你们很可能在同一片山谷里各自生活，却走不同的日常动线。这意味着很多场景无需翻译：相似的气候、相似的节奏背景，让彼此的存在感天然可理解。',
        '生境重叠不等于时刻黏在一起。{nameA}（{tagA}）和{nameB}（{tagB}）更像「同一条山脉上的两种住法」：共享环境，但各自占住不同的细节位。靠近时很顺，分开时也不觉得断裂。',
        '你们共享相当比例的山地环境，因此许多反应不是巧合，而是被同一套生态背景塑造的。差异主要在「怎么占用这片空间」——这往往比跨物种的磨合成本低得多。',
      ],
      en: [
        '{nameA} and {nameB} overlap heavily on the Hengduan map — likely the same valley, different daily routes. Much needs no translation: similar climate, similar backdrop, naturally readable presence.',
        'Overlap is not constant togetherness. {nameA} ({tagAEn}) and {nameB} ({tagBEn}) are two ways of living on one range — shared environment, different detail niches. Close feels easy; apart does not feel broken.',
        'You share a large slice of montane context, so aligned reactions are often ecology, not luck. The gap is how each of you occupies that space — usually cheaper to bridge than cross-biome pairs.',
      ],
    },
  },
  adjacent_resources: {
    pathTags: {
      zh: ['资源相邻', '海拔衔接', '上下游补给'],
      en: ['Adjacent resources', 'Elevation handoff', 'Up-down supply'],
    },
    names: {
      zh: ['海拔交接带', '上下游邻居', '资源邻接区', '垂直相邻线', '补给接力带', '林线交接处', '相邻生态位'],
      en: ['Elevation Handoff Zone', 'Upslope–Downslope Neighbors', 'Resource Adjacency', 'Vertical Adjacent Line', 'Supply Relay Belt', 'Treeline Junction', 'Neighboring Niches'],
    },
    descs: {
      zh: [
        '{nameA}与{nameB}在海拔与资源上相邻而不完全重叠——像上游与下游、林冠与林缘的关系。你们各自占有不同的资源层，却会在季节更替或边界地带自然相遇。这种结构很适合「互相补资源、但不抢同一块地」。',
        '相邻意味着频繁照面，但不意味着竞争同一份午餐。{nameA}偏{nicheA}，{nameB}偏{nicheB}：一个在某一海拔带深耕，另一个在衔接带等待接力。关系里，这常表现为「你有的我没有，我有的你刚好缺」。',
        '你们不是住在完全相同的房间，而是住在同一栋楼的相邻层。日常可能各忙各的，但一到需要跨界信息或资源时，彼此就成了最近的接口——不必强行同化，相邻本身就是价值。',
      ],
      en: [
        '{nameA} and {nameB} sit adjacent in elevation and resources — upslope and downslope, canopy and edge. Different layers, natural meetings at seasonal shifts or border zones. Built for complement, not fighting over the same plate.',
        'Adjacency means frequent crossing paths, not the same lunch. {nameA} leans {nicheAEn}; {nameB} leans {nicheBEn} — one deep in a band, one at the handoff. In friendship: "you have what I lack, I hold what you need next."',
        'Not the same room — adjacent floors in one building. Daily life runs parallel, but cross-floor intel and resources make you the nearest port. No need to merge; adjacency is the value.',
      ],
    },
  },
  potential_competition: {
    pathTags: {
      zh: ['潜在竞争', '资源张力', '同层博弈'],
      en: ['Potential competition', 'Resource tension', 'Same-layer rivalry'],
    },
    names: {
      zh: ['同层竞合', '资源角力场', '生态位挤压', '平行竞争者', '同域不同招', '张力共生', '竞合双极'],
      en: ['Competitive Coexistence', 'Resource Tension Field', 'Niche Squeeze', 'Parallel Rivals', 'Same Range, Different Moves', 'Tension Symbiosis', 'Competitive Dual Pole'],
    },
    descs: {
      zh: [
        '{nameA}与{nameB}在横断山可能争夺相近的资源或空间——同类食谱、重叠的活动带，或同一层级的生态角色。这不是「合不来」，而是需要更多边界感：谁先动、谁退让、怎么分地盘，都要比别的组合更说清楚。',
        '潜在竞争的关系里，摩擦往往来自「太像了」而不是「太不同」。{nameA}（{tagA}）和{nameB}（{tagB}）各自有主招，也都会在对方的地盘边缘试探。学会把竞争变成互相砥砺，这段关系会非常有成长密度。',
        '你们像在同一片资源池边喝水的两种大型兽——彼此都强大，也都敏感。完全无视对方不现实，硬碰硬也损耗大。最稳的策略是错开时段、错开动线，把竞争留在「互相看得起」的层面。',
      ],
      en: [
        '{nameA} and {nameB} may contest similar resources or space — overlapping diet, range, or trophic tier. Not "incompatible" — just needs clearer borders: who moves first, who yields, how turf is split.',
        'Friction here often comes from similarity, not difference. {nameA} ({tagAEn}) and {nameB} ({tagBEn}) each have a signature move and test each other at range edges. Turn rivalry into sharpening and the bond gets dense with growth.',
        'Like two strong drinkers at the same pool — powerful, alert. Ignoring each other is unrealistic; head-on costs too much. Best play: stagger timing and routes; keep competition at the level of mutual respect.',
      ],
    },
  },
  niche_differentiation: {
    pathTags: {
      zh: ['生态位分化', '异轨互补', '跨带连接'],
      en: ['Niche differentiation', 'Cross-track complement', 'Belt connector'],
    },
    names: {
      zh: ['异轨探索者', '跨带互补线', '分化共生', '不同海拔的相遇', '生态位错位', '远距同山', '异层连接'],
      en: ['Cross-Track Explorers', 'Cross-Belt Complement', 'Differentiated Symbiosis', 'Cross-Altitude Meet', 'Niche Offset', 'Distant Same Range', 'Cross-Layer Link'],
    },
    descs: {
      zh: [
        '{nameA}与{nameB}在横断山占据明显不同的生态位——不同的海拔偏好、食性策略或活动空间。你们带来的不是「同款答案」，而是彼此缺失的那条山脉切面。相处需要一点翻译，但扩容也最大。',
        '生态位分化意味着：你们很少抢同一块地，却可能因迁徙、季节或偶然事件在同一条山脊上相遇。{nameA}偏{nicheA}，{nameB}偏{nicheB}——差异是主线，互补是礼物。',
        '如果把横断山看成多层系统，你们分属不同子系统，因此摩擦未必大，但「互相读懂」需要主动。一旦读懂，对方能带你看见完全不同的生存逻辑——这是分化型关系最稀缺的价值。',
      ],
      en: [
        '{nameA} and {nameB} hold clearly different niches — altitude, diet, or movement space. You do not bring the same answers; you bring missing facets of the range. Translation takes work; expansion is the payoff.',
        'Differentiation means rarely fighting over the same ground, yet meeting on one ridge through season, migration, or chance. {nameA} leans {nicheAEn}; {nameB} leans {nicheBEn} — difference is the plot; complement is the gift.',
        'Picture the Hengduan as stacked subsystems — you live in different ones, so friction may stay low, but reading each other takes intent. Once you do, the other shows you an entirely different survival logic — the rare prize of differentiated bonds.',
      ],
    },
  },
  morph_variant: {
    pathTags: {
      zh: ['同种异相', '原型共振', '形态变体'],
      en: ['Same species variant', 'Archetype resonance', 'Morph line'],
    },
    names: {
      zh: ['同山双相', '原型共振', '一脉两态', '同种变体', '镜像生态位', '双形态共存', '本命与极致'],
      en: ['Twin Phase Same Range', 'Archetype Resonance', 'One Line, Two Forms', 'Species Variant', 'Mirrored Niche', 'Dual Morph Coexistence', 'Base & Extreme'],
    },
    descs: {
      zh: [
        '{nameA}与{nameB}共享同一横断山原型，只是表达强度不同——像同一物种的标准型与极致型。你们对世界的底层扫描方式高度相似，差异主要在「出招力度」与「外显频率」。',
        '同种变体关系里，共鸣来得很快，但也容易互相照见不想面对的部分。你们像同一生态位的两种曝光——一个日常态，一个峰值态——理解这一点，就能少很多「你怎么不像我以为的那样」的错愕。',
        '生态上你们占据几乎相同的位点，人格上却可能是同一原型的不同档位。这意味着：默契成本极低，区分感需要主动维护——否则容易变成「太像而无聊」或「镜像竞争」。',
      ],
      en: [
        '{nameA} and {nameB} share one Hengduan archetype at different intensities — standard form and extreme form. You scan the world similarly; the gap is output level and visible frequency.',
        'Variant bonds resonate fast but mirror what each prefers not to see. Same niche, two exposures — daily mode and peak mode. Name that and you skip much of the "you are not who I thought" shock.',
        'Ecologically nearly the same slot; personality may be different gears on one prototype. Sync is cheap; distinction needs upkeep — or the bond slips into "too alike" or mirror rivalry.',
      ],
    },
  },
};

/** @type {Record<RelationPath, { zh: { label: string, hint: string }, en: { label: string, hint: string } }>} */
export const RELATION_PATH_LABELS = {
  predator_prey: {
    zh: { label: '捕食链关系', hint: '食物链上下位——一方追迹锁定，一方警觉闪避，动线天然错位。' },
    en: { label: 'Trophic Chain', hint: 'Different rungs on the food web — pursuit meets evasion, trajectories offset by design.' },
  },
  habitat_overlap: {
    zh: { label: '生境重叠', hint: '活动带高度重叠——同一片山谷，不同的日常动线。' },
    en: { label: 'Habitat Overlap', hint: 'Shared range — same valley, different daily routes.' },
  },
  adjacent_resources: {
    zh: { label: '资源相邻', hint: '海拔与资源层相邻——上下游、林冠与林缘的接力关系。' },
    en: { label: 'Adjacent Resources', hint: 'Adjacent elevation bands — upslope/downslope handoff, not the same niche.' },
  },
  potential_competition: {
    zh: { label: '潜在竞争', hint: '相近资源或生态角色——需要更清晰的边界与错开策略。' },
    en: { label: 'Potential Competition', hint: 'Overlapping resources or roles — clearer borders and timing help.' },
  },
  niche_differentiation: {
    zh: { label: '生态位分化', hint: '明显不同的海拔、食性与活动空间——差异是主线，互补是礼物。' },
    en: { label: 'Niche Differentiation', hint: 'Distinct altitude, diet, and range — difference is the plot, complement is the gift.' },
  },
  morph_variant: {
    zh: { label: '同种异相', hint: '共享同一原型，表达强度不同——标准型与极致型。' },
    en: { label: 'Species Variant', hint: 'Same archetype, different intensity — standard form and extreme form.' },
  },
};

/**
 * @param {string} idA
 * @param {string} idB
 * @param {'zh'|'en'} lang
 */
export function getPairEcologySummary(idA, idB, lang) {
  const resolved = resolveRelationPath(idA, idB);
  const pathCopy = RELATION_PATH_LABELS[resolved.path][lang];
  const ecoA = getProfile(idA);
  const ecoB = getProfile(idB);

  return {
    path: resolved.path,
    pathLabel: pathCopy.label,
    pathHint: pathCopy.hint,
    nicheA: ecoA.niche[lang],
    nicheB: ecoB.niche[lang],
    hunterId: resolved.hunter ?? null,
    preyId: resolved.prey ?? null,
    hunterName: resolved.hunter ? animalName(resolved.hunter, lang) : null,
    preyName: resolved.prey ? animalName(resolved.prey, lang) : null,
  };
}

const COMPAT_SUFFIX = {
  high: {
    zh: ' 人格向量上你们也高度重叠，生态结构天然能转化成默契——别人还在磨合，你们已经出发了。',
    en: ' Your personality vectors overlap heavily — this ecological structure naturally becomes sync. Others are still calibrating; you two already left.',
  },
  low: {
    zh: ' 人格向量差异大意味着：你们吵不起来（吵的频道都不一样），但能互相打开全新视角。',
    en: ' Big vector gap means: you can barely argue (different frequencies), but you open entirely new angles for each other.',
  },
  mid: {
    zh: '',
    en: '',
  },
};

/**
 * @param {string} idA
 * @param {string} idB
 * @param {'zh'|'en'} lang
 * @param {number} [compatRate]
 */
export function generatePairCopy(idA, idB, lang, compatRate = 65) {
  const resolved = resolveRelationPath(idA, idB);
  const path = resolved.path;
  const meta = PATH_META[path];
  const key = pairKey(idA, idB);
  const h = hashKey(`${key}|${path}`);

  const hunterId = resolved.hunter ?? idA;
  const preyId = resolved.prey ?? idB;
  const ecoA = getProfile(idA);
  const ecoB = getProfile(idB);

  const ctx = {
    nameA: animalName(idA, lang),
    nameB: animalName(idB, lang),
    hunter: animalName(hunterId, lang),
    prey: animalName(preyId, lang),
    tagA: firstTag(idA, lang),
    tagB: firstTag(idB, lang),
    tagAEn: firstTag(idA, 'en'),
    tagBEn: firstTag(idB, 'en'),
    nicheA: ecoA.niche.zh,
    nicheB: ecoB.niche.zh,
    nicheAEn: ecoA.niche.en,
    nicheBEn: ecoB.niche.en,
    hunterNiche: getProfile(hunterId).niche.zh,
    preyNiche: getProfile(preyId).niche.zh,
    hunterNicheEn: getProfile(hunterId).niche.en,
    preyNicheEn: getProfile(preyId).niche.en,
  };

  const fill = (tpl) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => ctx[k] ?? '');

  const names = meta.names[lang];
  const descs = meta.descs[lang];
  const pathTags = meta.pathTags[lang];

  const relationName = names[h % names.length];
  const desc = fill(descs[h % descs.length]);

  const compatTier =
    compatRate >= HIGH_COMPAT_THRESHOLD ? 'high' : compatRate >= 65 ? 'mid' : 'low';
  const suffix = COMPAT_SUFFIX[compatTier][lang];

  const tags = [
    pathTags[h % pathTags.length],
    pathTags[(h + 1) % pathTags.length],
    compatRate >= HIGH_COMPAT_THRESHOLD
      ? lang === 'zh'
        ? '向量同频'
        : 'Vector sync'
      : compatRate < 65
        ? lang === 'zh'
          ? '反差CP'
          : 'Contrast duo'
        : lang === 'zh'
          ? '中等磨合'
          : 'Moderate tuning',
  ];

  return {
    path,
    relationName,
    tags,
    desc: desc + suffix,
  };
}
