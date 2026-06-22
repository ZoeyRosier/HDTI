import { animalsMap, animalNameToId } from '../data/animals';

const CORE_QUESTIONS = [3, 9, 11, 12, 15, 16];
const ODD_MAP = { A: "滇金丝猴", B: "豺", C: "黑颈鹤", D: "雪豹" };
const EVEN_MAP = { A: "小熊猫", B: "亚洲黑熊", C: "林麝", D: "羚牛" };

export function calculateResult(answers) {
  const scores = {
    "滇金丝猴": 0, "豺": 0, "黑颈鹤": 0, "雪豹": 0,
    "小熊猫": 0, "亚洲黑熊": 0, "林麝": 0, "羚牛": 0
  };

  for (let q = 1; q <= 16; q++) {
    const answer = answers[`Q${q}`];
    if (!answer) continue;
    const map = q % 2 === 1 ? ODD_MAP : EVEN_MAP;
    const animal = map[answer];
    const points = CORE_QUESTIONS.includes(q) ? 2 : 1;
    scores[animal] += points;
  }

  // 彩蛋优先级1：大熊猫 VIP#0
  if (answers.Q3 === "A" && answers.Q9 === "A" && answers.Q14 === "A") {
    return { result: "大熊猫", isEgg: true, eggType: "hidden", scores };
  }

  // 彩蛋优先级2：极致形态（≥9分）
  const snowScore = scores["雪豹"];
  const monkeyScore = scores["滇金丝猴"];

  if (snowScore >= 9 && monkeyScore >= 9) {
    const result = snowScore >= monkeyScore ? "雪豹极致形态" : "滇金丝猴极致形态";
    return { result, isEgg: true, eggType: "extreme", scores };
  }
  if (snowScore >= 9) return { result: "雪豹极致形态", isEgg: true, eggType: "extreme", scores };
  if (monkeyScore >= 9) return { result: "滇金丝猴极致形态", isEgg: true, eggType: "extreme", scores };

  // 彩蛋优先级3：双高组合（≥7分）
  const cloudTrigger = scores["雪豹"] >= 7 && scores["林麝"] >= 7;
  const pheasantTrigger = scores["黑颈鹤"] >= 7 && scores["羚牛"] >= 7;

  if (cloudTrigger && pheasantTrigger) {
    const cloudSum = scores["雪豹"] + scores["林麝"];
    const pheasantSum = scores["黑颈鹤"] + scores["羚牛"];
    const result = cloudSum >= pheasantSum ? "云豹" : "绿尾虹雉";
    return { result, isEgg: true, eggType: "combo", scores };
  }
  if (cloudTrigger) return { result: "云豹", isEgg: true, eggType: "combo", scores };
  if (pheasantTrigger) return { result: "绿尾虹雉", isEgg: true, eggType: "combo", scores };

  // 普通结果：最高分
  const maxScore = Math.max(...Object.values(scores));
  const topAnimals = Object.keys(scores).filter(a => scores[a] === maxScore);

  if (topAnimals.length === 1) {
    return { result: topAnimals[0], isEgg: false, eggType: null, scores };
  }

  // 并列决胜
  const q15Map = { A: "滇金丝猴", B: "豺", C: "黑颈鹤", D: "雪豹" };
  const q15Animal = q15Map[answers.Q15];
  if (topAnimals.includes(q15Animal)) {
    return { result: q15Animal, isEgg: false, eggType: null, scores };
  }

  const q8Map = { A: "小熊猫", B: "亚洲黑熊", C: "林麝", D: "羚牛" };
  const q8Animal = q8Map[answers.Q8];
  if (topAnimals.includes(q8Animal)) {
    return { result: q8Animal, isEgg: false, eggType: null, scores };
  }

  const random = topAnimals[Math.floor(Math.random() * topAnimals.length)];
  return { result: random, isEgg: false, eggType: null, scores };
}

export function calculateMatchRate(animalName) {
  const animalId = animalNameToId[animalName];
  const animal = animalsMap[animalId];
  if (!animal || !animal.vector) return null;

  // P0阶段：维度映射表待补，暂用固定值展示
  // TODO: 等维度映射表完成后，用用户向量 vs 动物标准向量计算曼哈顿距离
  // 临时方案：基于得分比例生成一个合理范围的匹配度
  return null;
}

export function calculateMatchRateFromScores(animalName, scores) {
  // 临时方案：将该动物得分转换为匹配度百分比
  // 满分11分，映射到60%-95%区间
  const score = scores[animalName] || 0;
  const maxPossible = 11;
  const rate = Math.round(60 + (score / maxPossible) * 35);
  return Math.min(rate, 95);
}
