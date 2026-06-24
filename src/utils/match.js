import { animals, animalsMap, animalVectors } from '../data/animals';
import { calculateResult, calcMatchRate } from './scoring';
import {
  matchPairs,
  fallbackCopy,
  pairKey,
  HIGH_COMPAT_THRESHOLD,
} from '../data/matchData';
import { pickLocaleCopy } from '../i18n/resolve';

const RESULT_TTL = 30 * 24 * 60 * 60 * 1000;

function getAnimalVector(animalId) {
  const animal = animalsMap[animalId];
  if (!animal) return null;
  return animalVectors[animalId] ?? animal.vector ?? null;
}

/** 两动物原型向量契合度（0–100） */
export function calcPairCompatibility(animalAId, animalBId) {
  const vecA = getAnimalVector(animalAId);
  const vecB = getAnimalVector(animalBId);
  if (!vecA || !vecB) return 65;
  return calcMatchRate(vecA, vecB);
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
  const key = pairKey(animalAId, animalBId);

  const preset = matchPairs.find((p) => pairKey(p.ids[0], p.ids[1]) === key);
  const copy = preset
    ? pickLocaleCopy(preset.locale, lang)
    : pickLocaleCopy(
        compatRate >= HIGH_COMPAT_THRESHOLD ? fallbackCopy.high.locale : fallbackCopy.low.locale,
        lang,
      );

  return {
    compatRate,
    isPreset: Boolean(preset),
    relationName: copy.relationName,
    tags: copy.tags,
    desc: copy.desc,
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
  if (rate >= 80) return 'high';
  if (rate >= 50) return 'mid';
  return 'low';
}
