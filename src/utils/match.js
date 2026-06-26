import { animals, animalsMap, animalVectors } from '../data/animals';
import { calculateResult, calcMatchRate, vecToLabel } from './scoring';
import { generatePairCopy, getPairEcologySummary } from '../data/matchData';

const PAIR_DIMENSIONS = [
  { id: 0, code: 'D1', nameZh: '探索倾向', nameEn: 'Exploration' },
  { id: 1, code: 'D2', nameZh: '应激反应', nameEn: 'Stress Response' },
  { id: 2, code: 'D3', nameZh: '群体依赖', nameEn: 'Group Bond' },
  { id: 3, code: 'D4', nameZh: '社交主动', nameEn: 'Social Drive' },
  { id: 4, code: 'D5', nameZh: '行动频率', nameEn: 'Activity' },
  { id: 5, code: 'D6', nameZh: '领地意识', nameEn: 'Territorial' },
  { id: 6, code: 'D7', nameZh: '适应灵活', nameEn: 'Adaptability' },
];

const RESULT_TTL = 30 * 24 * 60 * 60 * 1000;

function getAnimalVector(animalId) {
  const animal = animalsMap[animalId];
  if (!animal) return null;
  return animalVectors[animalId] ?? animal.vector ?? null;
}

/** @param {string} animalAId @param {string} animalBId @param {'zh'|'en'} lang */
export function getPairDimensions(animalAId, animalBId, lang) {
  const vecA = getAnimalVector(animalAId);
  const vecB = getAnimalVector(animalBId);
  if (!vecA || !vecB) return [];

  const labelsA = vecToLabel(vecA);
  const labelsB = vecToLabel(vecB);

  return PAIR_DIMENSIONS.map((dim) => ({
    id: dim.id,
    code: dim.code,
    name: lang === 'en' ? dim.nameEn : dim.nameZh,
    valueA: vecA[dim.id],
    valueB: vecB[dim.id],
    levelA: labelsA[dim.id],
    levelB: labelsB[dim.id],
    gap: Math.abs(vecA[dim.id] - vecB[dim.id]),
  }));
}

/** 两动物原型向量契合度（0–100） — 基于所有动物对的距离分布归一化 */
export function calcPairCompatibility(animalAId, animalBId) {
  const vecA = getAnimalVector(animalAId);
  const vecB = getAnimalVector(animalBId);
  if (!vecA || !vecB) return 65;

  const dist = vecA.reduce((s, v, i) => s + Math.abs(v - vecB[i]), 0);

  // 所有8只基础动物对之间的距离范围：min≈0.34, max≈2.48
  // 线性映射到 [50%, 95%]
  const PAIR_DIST_MIN = 0.34;
  const PAIR_DIST_MAX = 2.48;
  const clamped = Math.max(PAIR_DIST_MIN, Math.min(PAIR_DIST_MAX, dist));
  const rate = Math.round(95 - ((clamped - PAIR_DIST_MIN) / (PAIR_DIST_MAX - PAIR_DIST_MIN)) * 45);
  return Math.max(50, Math.min(95, rate));
}

/**
 * 解析用户输入：结果链接 / 动物代号
 * @returns {{ ok: true, animalId: string, matchRate?: number, source: string } | { ok: false, error: string }}
 */
export function parseInput(raw) {
  const input = raw?.trim();
  if (!input) return { ok: false, error: 'empty' };

  // 结果链接（完整 URL 或含 ?r= 的片段）
  try {
    const url = input.includes('://')
      ? new URL(input)
      : new URL(input.startsWith('/') ? input : `/${input}`, window.location.origin);
    const r = url.searchParams.get('r');
    if (r && animalsMap[r]) {
      const m = parseInt(url.searchParams.get('m') ?? '', 10);
      return {
        ok: true,
        animalId: r,
        matchRate: Number.isNaN(m) ? undefined : m,
        source: 'url',
      };
    }
  } catch {
    // not a valid URL
  }

  const paramMatch = input.match(/[?&]r=([a-z_]+)(?:&[^&]*?m=(\d+)|.*?(?:^|&)m=(\d+))?/i);
  if (paramMatch?.[1] && animalsMap[paramMatch[1]]) {
    const rateStr = paramMatch[2] ?? paramMatch[3];
    return {
      ok: true,
      animalId: paramMatch[1],
      matchRate: rateStr ? parseInt(rateStr, 10) : undefined,
      source: 'url',
    };
  }

  // 动物代号（SOLO / WIFI / SLAY? 等）
  const codeInput = input.toUpperCase();
  const byCode = animals.find((a) => a.code.toUpperCase() === codeInput);
  if (byCode) {
    return { ok: true, animalId: byCode.id, source: 'code' };
  }

  return { ok: false, error: 'invalid' };
}

/** 读取当前用户最近一次测试结果 */
export function getSelfResult() {
  try {
    const stored = JSON.parse(localStorage.getItem('hdti_result') || 'null');
    if (stored?.animalId && Date.now() - stored.timestamp < RESULT_TTL) {
      return {
        animalId: stored.animalId,
        matchRate: stored.matchRate,
        animalCode: stored.animalCode,
      };
    }
  } catch {
    // ignore
  }

  try {
    const answersStr = sessionStorage.getItem('hdti_answers');
    if (answersStr) {
      const answers = JSON.parse(answersStr);
      if (Object.keys(answers).length === 16) {
        const { result, matchRate } = calculateResult(answers);
        const animal = animalsMap[result];
        return {
          animalId: result,
          matchRate,
          animalCode: animal?.code,
        };
      }
    }
  } catch {
    // ignore
  }

  return null;
}

/**
 * 查 CP 文案 + 计算契合度
 * @param {string} animalAId
 * @param {string} animalBId
 * @param {'zh' | 'en'} lang
 */
export function getMatchResult(animalAId, animalBId, lang) {
  const compatRate = calcPairCompatibility(animalAId, animalBId);
  const copy = generatePairCopy(animalAId, animalBId, lang, compatRate);
  const ecology = getPairEcologySummary(animalAId, animalBId, lang);
  const dimensions = getPairDimensions(animalAId, animalBId, lang);
  const alignedDims = dimensions.filter((d) => d.gap < 0.15).length;
  const divergentDims = dimensions.filter((d) => d.gap >= 0.35).length;

  return {
    compatRate,
    relationPath: copy.path,
    relationName: copy.relationName,
    tags: copy.tags,
    desc: copy.desc,
    ecology,
    dimensions,
    dimensionSummary: { aligned: alignedDims, divergent: divergentDims, total: dimensions.length },
  };
}

const MATCH_SESSION_KEY = 'hdti_match_session';

/** @param {{ mineId: string, friendId: string }} data */
export function saveMatchSession(data) {
  sessionStorage.setItem(MATCH_SESSION_KEY, JSON.stringify(data));
}

export function loadMatchSession() {
  try {
    const raw = sessionStorage.getItem(MATCH_SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data?.mineId && data?.friendId && animalsMap[data.mineId] && animalsMap[data.friendId]) {
      return data;
    }
  } catch {
    // ignore
  }
  return null;
}

/** @param {number} rate */
export function getInterpretationTier(rate) {
  if (rate >= 78) return 'high';
  if (rate >= 65) return 'mid';
  return 'low';
}
