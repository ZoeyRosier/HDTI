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
      userVec: userAvgVec.map(v => Math.round(v)),
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
    return { result, isEgg: true, eggType: "extreme", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 95 };
  }
  if (snowScore >= 9) {
    return { result: "snow_leopard_extreme", isEgg: true, eggType: "extreme", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 95 };
  }
  if (monkeyScore >= 9) {
    return { result: "monkey_extreme", isEgg: true, eggType: "extreme", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 95 };
  }

  // 优先级3：双高组合（≥7分）
  const cloudTrigger    = legacyScores["雪豹"] >= 7 && legacyScores["林麝"] >= 7;
  const pheasantTrigger = legacyScores["黑颈鹤"] >= 7 && legacyScores["羚牛"] >= 7;

  if (cloudTrigger && pheasantTrigger) {
    const cloudSum    = legacyScores["雪豹"] + legacyScores["林麝"];
    const pheasantSum = legacyScores["黑颈鹤"] + legacyScores["羚牛"];
    const result = cloudSum >= pheasantSum ? "clouded_leopard" : "chinese_monal";
    return { result, isEgg: true, eggType: "combo", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 90 };
  }
  if (cloudTrigger) {
    return { result: "clouded_leopard", isEgg: true, eggType: "combo", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 90 };
  }
  if (pheasantTrigger) {
    return { result: "chinese_monal", isEgg: true, eggType: "combo", userVec: userAvgVec.map(v => Math.round(v)), matchRate: 90 };
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

  // 匹配度：用户取整向量 vs 动物标准向量
  const intUserVec = userAvgVec.map(v => Math.round(v));
  const matchRate = calcMatchRate(intUserVec, animalVectors[finalAnimalId]);

  return {
    result: finalAnimalId,
    isEgg: false,
    eggType: null,
    userVec: intUserVec,
    matchRate,
    distances,
  };
}

export function vecToLabel(vec) {
  return vec.map(v => v <= 1.5 ? 'L' : v <= 2.5 ? 'M' : 'H');
}

export function getDimensionDesc(dimIndex, value) {
  const descs = [
    { L: "守熟悉领地，不涉足未知",   H: "主动进入陌生区域，不惧未知" },
    { L: "遇威胁优先撤退隐匿",       H: "遇威胁正面应对反击" },
    { L: "独立行动，不依赖群体",      H: "高度依赖群体，需要同伴" },
    { L: "被动划界，不主动社交",      H: "主动发出信号维持连接" },
    { L: "节能优先，以静制动",        H: "高频行动，持续推进" },
    { L: "让步转移，不正面争夺",      H: "坚守边界，强硬维护" },
    { L: "依赖已知模式，不轻易改变",  H: "主动寻找新路径，灵活调整" },
  ];
  const level = value <= 1.5 ? 'L' : value <= 2.5 ? 'M' : 'H';
  if (level === 'M') return '平衡型';
  return descs[dimIndex][level];
}
