export function generateShareUrl(animalId, matchRate) {
  const params = new URLSearchParams({
    r: animalId,
    m: String(matchRate),
  });
  return `${window.location.origin}/result?${params.toString()}`;
}

export function readResultFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const r = params.get('r');
  const m = params.get('m');
  if (r) {
    return { animalId: r, matchRate: parseInt(m) || 0, isSharedView: true };
  }
  return null;
}

export async function shareResult({ animalName, animalCode, matchRate, animalId, t }) {
  const shareUrl = generateShareUrl(animalId, matchRate);
  const shareData = {
    title: t('share.title'),
    text: t('share.text', { code: animalCode, name: animalName, rate: matchRate }),
    url: shareUrl,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch {
      // User cancelled or share failed, fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(`${shareData.text}\n${shareUrl}`);
    return { success: true, method: 'clipboard' };
  } catch {
    return { success: false };
  }
}
