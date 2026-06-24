/**
 * 好友匹配 CP 组合文案 — 10 对预设 + 高/低契合度兜底。
 * ids 无序，查表时按字母序归一化。
 */

export const HIGH_COMPAT_THRESHOLD = 70;

export const matchPairs = [
  {
    ids: ['snow_leopard', 'yunnan_snub_monkey'],
    locale: {
      zh: {
        relationName: '雪山信号塔',
        tags: ['一静一动', '互相补位', '默契留白'],
        desc: '一个负责把场子连起来，一个负责在关键处精准落子。你们未必天天黏在一起，但彼此都知道：有对方在，局势就稳。',
      },
      en: {
        relationName: 'Alpine Signal Tower',
        tags: ['Stillness & motion', 'Cover each other', 'Quiet sync'],
        desc: 'One wires the room together; the other lands the decisive move. You may not cling daily, but both know: when the other is there, the ground feels steady.',
      },
    },
  },
  {
    ids: ['snow_leopard', 'forest_musk_deer'],
    locale: {
      zh: {
        relationName: '林缘守望者',
        tags: ['距离感美学', '慢热深交', '各自有界'],
        desc: '你们都擅长把自己藏好，也都对"边界"极其敏感。靠近需要耐心，但一旦建立信任，这份关系反而异常牢固——因为谁都不会轻易越线。',
      },
      en: {
        relationName: 'Forest Edge Watch',
        tags: ['Distance as art', 'Slow-burn trust', 'Clear borders'],
        desc: 'You both hide well and feel boundaries sharply. Closeness takes patience — but once trust lands, the bond is unusually solid, because neither crosses lines lightly.',
      },
    },
  },
  {
    ids: ['dhole', 'yunnan_snub_monkey'],
    locale: {
      zh: {
        relationName: '群聊发动机',
        tags: ['行动派 × 气氛组', '效率与温度', '1+1>2'],
        desc: '一个把信号发出去，一个把队伍拉起来。你们在一起，事情推进快，场子也不会冷——是典型"能把一群人带上路"的组合。',
      },
      en: {
        relationName: 'Group Chat Engine',
        tags: ['Action × vibe', 'Speed & warmth', '1+1>2'],
        desc: 'One sends the signal; one rallies the troop. Together you move fast without freezing the room — a pair that can actually lead a group forward.',
      },
    },
  },
  {
    ids: ['black_necked_crane', 'red_panda'],
    locale: {
      zh: {
        relationName: '云端慢生活',
        tags: ['远观与近守', '低消耗相处', '各自舒适圈'],
        desc: '一个习惯在高处看清全局，一个更在意把眼前的小日子过稳。你们不会互相消耗，相处节奏偏慢，但恰好都能在对方面前放松下来。',
      },
      en: {
        relationName: 'Cloud-Top Slow Living',
        tags: ['Wide view × cozy nest', 'Low-drain bond', 'Shared ease'],
        desc: 'One reads the big picture from above; one guards a steady little world nearby. You rarely drain each other — slow rhythm, real ease.',
      },
    },
  },
  {
    ids: ['asian_black_bear', 'takin'],
    locale: {
      zh: {
        relationName: '山脊双盾',
        tags: ['守成组合', '资源与韧性', '长期主义'],
        desc: '一个擅长把好处留住，一个擅长在逆风里扛住。你们都不爱折腾，但极其可靠——适合一起把一件事慢慢做成。',
      },
      en: {
        relationName: 'Ridge Twin Shields',
        tags: ['Steady pair', 'Hold & endure', 'Long game'],
        desc: 'One keeps what matters; one holds the line in headwind. Neither loves chaos — but together you are dependable, built for slow wins.',
      },
    },
  },
  {
    ids: ['dhole', 'forest_musk_deer'],
    locale: {
      zh: {
        relationName: '暗影协作',
        tags: ['明与暗', '分工清晰', '互补型搭档'],
        desc: '一个在前线配合推进，一个在幕后保持警觉。你们像同一支小队里的不同位置——不必抢镜，但缺了谁都不行。',
      },
      en: {
        relationName: 'Shadow Teamwork',
        tags: ['Light & shade', 'Clear roles', 'Complementary'],
        desc: 'One pushes upfront in sync; one stays alert behind the scenes. Different positions, same squad — neither needs the spotlight, both are essential.',
      },
    },
  },
  {
    ids: ['red_panda', 'forest_musk_deer'],
    locale: {
      zh: {
        relationName: '静音同盟',
        tags: ['低噪社交', '尊重边界', '慢热同频'],
        desc: '你们都不属于"一见面就热络"的类型，但恰好都懂什么叫舒适的距离。相处没有表演成分，反而容易成为彼此最放松的朋友。',
      },
      en: {
        relationName: 'Quiet Alliance',
        tags: ['Low-noise bond', 'Boundary respect', 'Slow sync'],
        desc: 'Neither of you performs instant warmth — but you both know comfortable distance. No show, just ease — the friendship where you actually exhale.',
      },
    },
  },
  {
    ids: ['black_necked_crane', 'takin'],
    locale: {
      zh: {
        relationName: '高原双稳',
        tags: ['视野 × 定力', '理性搭档', '少言默契'],
        desc: '一个看得远，一个站得稳。你们对话可能不多，但决策层面常常意外一致——是那种"不用解释也懂"的理性组合。',
      },
      en: {
        relationName: 'Plateau Dual Steady',
        tags: ['Vision × grit', 'Rational pair', 'Quiet alignment'],
        desc: 'One sees far; one stands firm. Words may be few, yet decisions often align — the rational duo that gets it without long explanations.',
      },
    },
  },
  {
    ids: ['snow_leopard', 'black_necked_crane'],
    locale: {
      zh: {
        relationName: '高空双视角',
        tags: ['冷静观察', '独立并行', '关键时刻同频'],
        desc: '你们都习惯先看清，再行动。日常各走各路，但在重要关头往往能给出高度一致的判断——像两台不同焦距的望远镜，对准同一片雪山。',
      },
      en: {
        relationName: 'High-Altitude Dual Lens',
        tags: ['Cool observers', 'Parallel paths', 'Sync at crunch time'],
        desc: 'You both look first, move second. Daily life runs parallel — yet at crunch time your reads often match, like two lenses on the same mountain range.',
      },
    },
  },
  {
    ids: ['yunnan_snub_monkey', 'asian_black_bear'],
    locale: {
      zh: {
        relationName: '热闹与囤粮',
        tags: ['外向 × 内敛', '社交与守成', '互相取经'],
        desc: '一个天生会连接人，一个天生会守住阵地。你们的生活节奏不同，但彼此身上都有对方缺的那一块——聊深了会发现互补得很有意思。',
      },
      en: {
        relationName: 'Buzz & Storehouse',
        tags: ['Outward × inward', 'Connect & hold', 'Mutual learn'],
        desc: 'One connects by instinct; one holds ground by instinct. Different rhythms — yet each has what the other lacks. Go deeper and the complementarity gets interesting.',
      },
    },
  },
];

export const fallbackCopy = {
  high: {
    locale: {
      zh: {
        relationName: '同频旅伴',
        tags: ['向量相近', '自然默契', '少磨合'],
        desc: '你们的横断山原型在多个维度上高度接近——不必刻意迎合，很多反应和节奏会自然对上。这种契合不是偶然，是底层行为模式真的相似。',
      },
      en: {
        relationName: 'Same-Frequency Companions',
        tags: ['Close vectors', 'Natural sync', 'Low friction'],
        desc: 'Your Hengduan archetypes align across many dimensions — little need to perform. Much of your rhythm matches naturally; the fit reflects similar underlying patterns.',
      },
    },
  },
  low: {
    locale: {
      zh: {
        relationName: '异轨探索者',
        tags: ['差异明显', '互相扩容', '需要翻译'],
        desc: '你们的原型向量差异较大——这意味着摩擦也可能更大，但也意味着彼此能带对方看见完全不同的横断山切面。需要多一点耐心，但未必是坏事。',
      },
      en: {
        relationName: 'Cross-Track Explorers',
        tags: ['Clear differences', 'Mutual stretch', 'Needs translation'],
        desc: 'Your archetype vectors diverge — more friction, but also entirely different views of the mountains. It takes patience, and that is not necessarily a bad thing.',
      },
    },
  },
};

/** @param {string} idA @param {string} idB */
export function pairKey(idA, idB) {
  return [idA, idB].sort().join('|');
}
