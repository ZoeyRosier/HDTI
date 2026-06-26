import { optionVectors } from '../data/questions';
import { animalVectors } from '../data/animals';

const CORE_QUESTIONS = new Set([3, 9, 11, 12, 15, 16]);
const TOTAL_WEIGHT = 22; // 6核心×2 + 10情景×1

function manhattanDistance(vecA, vecB) {
  return vecA.reduce((sum, val, i) => sum + Math.abs(val - vecB[i]), 0);
}

export function calcMatchRate(userVec, animalVec) {
  const dist = manhattanDistance(userVec, animalVec);
  return Math.round((1 - dist / 14) * 100);
}

/**
 * 基于实际距离分布计算匹配度（区分度更高的版本）
 * 分母 = 用户到最远动物的距离，兜底 60%
 */
export function calcMatchRateRelative(minDist, maxDist) {
  if (maxDist < 0.01) return 95; // 极端情况：所有动物距离都为0
  const raw = Math.round((1 - minDist / maxDist) * 100);
  return Math.max(60, Math.min(98, raw)); // 区间 [60%, 98%]
}

function calcLegacyScores(answers) {
  const scores = {
    "滇金丝猴": 0, "豺": 0, "黑颈鹤": 0, "雪豹": 0,
    "小熊猫": 0, "亚洲黑熊": 0, "林麝": 0, "羚牛": 0
  };
  const oddMap  = { A: "滇金丝猴", B: "豺", C: "黑颈鹤", D: "雪豹" };
  const evenMap = { A: "小熊猫", B: "亚洲黑熊", C: "林麝", D: "羚牛" };

  for (let q = 1; q <= 16; q++) {
    const answer = answers[`Q${q}`];
    if (!answer) continue;
    const map = q % 2 === 1 ? oddMap : evenMap;
    const animal = map[answer];
    if (animal) scores[animal] += CORE_QUESTIONS.has(q) ? 2 : 1;
  }
  return scores;
}

export function calculateResult(answers) {
  // 累计用户7维向量
  const userVecAccum = [0, 0, 0, 0, 0, 0, 0];

  for (let q = 1; q <= 16; q++) {
    const answer = answers[`Q${q}`];
    if (!answer) continue;
    const vec = optionVectors[`Q${q}`]?.[answer];
    if (!vec) continue;
    const weight = CORE_QUESTIONS.has(q) ? 2 : 1;
    vec.forEach((val, i) => { userVecAccum[i] += val * weight; });
  }

  // 归一化回1-3区间
  const userAvgVec = userVecAccum.map(v => v / TOTAL_WEIGHT);

  // ── 彩蛋检测（优先级严格从高到低）──

  // 优先级1：大熊猫SOFT
  if (answers.Q3 === "A" && answers.Q9 === "A" && answers.Q14 === "A") {
    return {
      result: "giant_panda",
      isEgg: true,
      eggType: "hidden",
      userVec: userAvgVec,
      matchRate: 88,
    };
  }

  // 优先级2-3用legacy分数判断
  const legacyScores = calcLegacyScores(answers);
  const snowScore   = legacyScores["雪豹"];
  const monkeyScore = legacyScores["滇金丝猴"];

  // 优先级2：极致形态（≥9分）
  if (snowScore >= 9 && monkeyScore >= 9) {
    const result = snowScore >= monkeyScore ? "snow_leopard_extreme" : "monkey_extreme";
    return { result, isEgg: true, eggType: "extreme", userVec: userAvgVec, matchRate: 95 };
  }
  if (snowScore >= 9) {
    return { result: "snow_leopard_extreme", isEgg: true, eggType: "extreme", userVec: userAvgVec, matchRate: 95 };
  }
  if (monkeyScore >= 9) {
    return { result: "monkey_extreme", isEgg: true, eggType: "extreme", userVec: userAvgVec, matchRate: 95 };
  }

  // 优先级3：双高组合（≥7分）
  const cloudTrigger    = legacyScores["雪豹"] >= 7 && legacyScores["林麝"] >= 7;
  const pheasantTrigger = legacyScores["黑颈鹤"] >= 7 && legacyScores["羚牛"] >= 7;

  if (cloudTrigger && pheasantTrigger) {
    const cloudSum    = legacyScores["雪豹"] + legacyScores["林麝"];
    const pheasantSum = legacyScores["黑颈鹤"] + legacyScores["羚牛"];
    const result = cloudSum >= pheasantSum ? "clouded_leopard" : "chinese_monal";
    return { result, isEgg: true, eggType: "combo", userVec: userAvgVec, matchRate: 90 };
  }
  if (cloudTrigger) {
    return { result: "clouded_leopard", isEgg: true, eggType: "combo", userVec: userAvgVec, matchRate: 90 };
  }
  if (pheasantTrigger) {
    return { result: "chinese_monal", isEgg: true, eggType: "combo", userVec: userAvgVec, matchRate: 90 };
  }

  // ── 主算法：曼哈顿距离 ──
  const distances = {};
  for (const [animalId, animalVec] of Object.entries(animalVectors)) {
    distances[animalId] = manhattanDistance(userAvgVec, animalVec);
  }

  const minDist = Math.min(...Object.values(distances));
  const topAnimals = Object.keys(distances).filter(
    id => Math.abs(distances[id] - minDist) < 0.001
  );

  let finalAnimalId = topAnimals[0];

  if (topAnimals.length > 1) {
    const q15Map = { A: "yunnan_snub_monkey", B: "dhole", C: "black_necked_crane", D: "snow_leopard" };
    const q8Map  = { A: "red_panda", B: "asian_black_bear", C: "forest_musk_deer", D: "takin" };

    const q15Animal = q15Map[answers.Q15];
    if (topAnimals.includes(q15Animal)) {
      finalAnimalId = q15Animal;
    } else {
      const q8Animal = q8Map[answers.Q8];
      if (topAnimals.includes(q8Animal)) {
        finalAnimalId = q8Animal;
      } else {
        finalAnimalId = topAnimals[Math.floor(Math.random() * topAnimals.length)];
      }
    }
  }

  // 匹配度：用实际距离分布计算，区分度更高
  const maxDist = Math.max(...Object.values(distances));
  const matchRate = calcMatchRateRelative(minDist, maxDist);

  return {
    result: finalAnimalId,
    isEgg: false,
    eggType: null,
    userVec: userAvgVec,
    matchRate,
    distances,
  };
}

// 各维度的实际可达范围（基于 optionVectors 加权计算）
const DIM_RANGES = [
  [1.27, 2.41], // D1 探索倾向
  [1.23, 2.64], // D2 应激反应
  [1.00, 2.55], // D3 同伴依赖
  [1.00, 2.18], // D4 连接主动性
  [1.36, 2.91], // D5 活动性
  [1.00, 2.86], // D6 资源竞争
  [1.55, 2.73], // D7 探索开放
];

/**
 * 将原始维度值归一化到 [1, 3]，基于该维度的实际可达范围
 */
export function normalizeDim(dimIndex, rawValue) {
  const [min, max] = DIM_RANGES[dimIndex];
  if (max - min < 0.01) return 2;
  return 1 + ((rawValue - min) / (max - min)) * 2;
}

export function vecToLabel(vec) {
  // L 40% / M 20% / H 40% — 归一化后阈值：L<1.8, M∈[1.8,2.2), H≥2.2
  return vec.map((v, i) => {
    const nv = normalizeDim(i, v);
    return nv < 1.8 ? 'L' : nv >= 2.2 ? 'H' : 'M';
  });
}

export function getDimensionDesc(dimIndex, value) {
  const descs = [
    { L: "舒适区钉子户，没事不出门，出门也带GPS。", M: "会探索，但得先确认退路在哪，安全感选手。", H: "未知区域自动吸引，别人还在查攻略你已经出发了。" },
    { L: "危险来了先消失，活着比赢更重要。", M: "先看一眼局势，值得打就打，不值得就优雅撤退。", H: "有人挑事？好，那就原地站住，正面接招。" },
    { L: "一个人待着不叫孤独，叫自由。", M: "能独处也能合群，但超过三天的团建会让你想跑。", H: "身边没人会心慌，有人在旁边才能安心做事。" },
    { L: "社交？等别人来找我吧，主动出击这事太累。", M: "不主动不拒绝，回消息看缘分，偶尔上线冒个泡。", H: "群里永远是你先说话，冷场超过5秒自动补位。" },
    { L: "能躺着绝不坐着，把能量留给真正重要的事。", M: "能动能静，状态看心情——偶尔卷偶尔摆。", H: "闲下来比忙着更难受，永远有下一件事在排队" },
    { L: "退一步海阔天空，没什么值得正面硬刚。", M: "多数时候和气生财，但碰到底线会突然变脸。", H: "我的东西就是我的，碰一下试试？后果自负。" },
    { L: "老办法用得好好的，为什么要换？换了万一翻车。", M: "该守规矩的时候守，该变通的时候也不死磕。", H: "此路不通？没关系，地图上还有七条备选路线。" },
  ];
  const nv = normalizeDim(dimIndex, value);
  const level = nv < 1.8 ? 'L' : nv >= 2.2 ? 'H' : 'M';
  return descs[dimIndex][level];
}
