import QRCode from 'qrcode';

const W = 1080;
const H = 1480;

const POSTER_COLORS = {
  giant_panda: ['#8a6e32', '#6b5424', '#4a3a18'],
  clouded_leopard: ['#4a3870', '#3b2d5e', '#261c40'],
  chinese_monal: ['#5c4a6e', '#4a3860', '#2e2440'],
  snow_leopard_extreme: ['#3a5568', '#2c3e50', '#1a252f'],
  monkey_extreme: ['#2a5048', '#1a3a4a', '#0f2830'],
};
const DEFAULT_BG = ['#4a6a55', '#3D5A47', '#283d30'];

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * 生成分享海报
 */
export async function generatePoster({ animal, matchRate, homeUrl, stats }) {
  const bgColors = (animal.isEgg && POSTER_COLORS[animal.id]) || DEFAULT_BG;

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // ── 背景 ──
  const bgGrad = ctx.createLinearGradient(0, 0, W * 0.3, H);
  bgGrad.addColorStop(0, bgColors[0]);
  bgGrad.addColorStop(0.44, bgColors[1]);
  bgGrad.addColorStop(1, bgColors[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 斜线纹理
  ctx.save();
  ctx.globalAlpha = 0.04;
  for (let i = -H; i < W + H; i += 48) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + H, H);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  ctx.restore();

  // 顶部光晕
  const topGlow = ctx.createRadialGradient(W / 2, -60, 0, W / 2, -60, 500);
  topGlow.addColorStop(0, 'rgba(190,217,160,0.12)');
  topGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = topGlow;
  ctx.fillRect(0, 0, W, 500);

  const px = 70;

  // ── 品牌行 ──
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Space Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('🐾 HDTI', px, 100);

  ctx.fillStyle = '#bcd0a6';
  ctx.font = '400 32px "Noto Sans SC", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('横断山脉动物人格', W - px, 100);

  // ── 动物头像 ──
  const circleX = W / 2;
  const circleY = 380;
  const circleR = 210;

  // 圆形背景（与结果页 theme.circleBg 一致）
  const CIRCLE_COLORS = {
    giant_panda: ['rgba(196,149,106,0.35)', 'rgba(196,149,106,0.12)'],
    clouded_leopard: ['rgba(184,154,219,0.3)', 'rgba(184,154,219,0.1)'],
    chinese_monal: ['rgba(232,160,200,0.25)', 'rgba(168,216,234,0.1)'],
    snow_leopard_extreme: ['rgba(126,200,227,0.3)', 'rgba(126,200,227,0.1)'],
    monkey_extreme: ['rgba(77,232,194,0.25)', 'rgba(77,232,194,0.08)'],
  };
  const defaultCircle = ['rgba(143,184,114,0.25)', 'rgba(143,184,114,0.1)'];
  const circleColors = (animal.isEgg && CIRCLE_COLORS[animal.id]) || defaultCircle;

  ctx.save();
  ctx.beginPath();
  ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
  ctx.clip();

  // 先填充深色底
  ctx.fillStyle = bgColors[1];
  ctx.fillRect(circleX - circleR, circleY - circleR, circleR * 2, circleR * 2);

  // 叠加 radial gradient（与结果页一致）
  const innerGrad = ctx.createRadialGradient(circleX, circleY, 0, circleX, circleY, circleR);
  innerGrad.addColorStop(0, circleColors[0]);
  innerGrad.addColorStop(0.7, circleColors[1]);
  innerGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = innerGrad;
  ctx.fillRect(circleX - circleR, circleY - circleR, circleR * 2, circleR * 2);

  const iconFile = animal.code.replace('?', '');
  const animalImg = await loadImage(`/animals_icon/${iconFile}.png`);
  const imgSize = circleR * 1.7;
  ctx.drawImage(animalImg, circleX - imgSize / 2, circleY - imgSize / 2, imgSize, imgSize);
  ctx.restore();

  // 彩蛋动物渐变边框环
  if (animal.isEgg) {
    const RING_COLORS = {
      giant_panda: ['#C4956A', '#f5d9a8', '#9a7b3c', '#f5d9a8', '#C4956A'],
      clouded_leopard: ['#b89adb', '#6b3fa0', '#e0c4f7', '#6b3fa0', '#b89adb'],
      chinese_monal: ['#e8a0c8', '#a8d8ea', '#b8e6a0', '#f0d080', '#e8a0c8'],
      snow_leopard_extreme: ['#7ec8e3', '#ffffff', '#4a9fbf', '#ffffff', '#7ec8e3'],
      monkey_extreme: ['#4de8c2', '#0a5e4a', '#80fff0', '#0a5e4a', '#4de8c2'],
    };
    const ringColors = RING_COLORS[animal.id] || RING_COLORS.giant_panda;
    const ringW = 6;
    const ringR = circleR + ringW / 2 + 4;
    const segments = ringColors.length;
    const segAngle = (Math.PI * 2) / segments;

    for (let i = 0; i < segments; i++) {
      ctx.beginPath();
      ctx.arc(circleX, circleY, ringR, segAngle * i - Math.PI / 2, segAngle * (i + 1) - Math.PI / 2);
      ctx.strokeStyle = ringColors[i];
      ctx.lineWidth = ringW;
      ctx.stroke();
    }

    // 外层辉光
    ctx.beginPath();
    ctx.arc(circleX, circleY, ringR, 0, Math.PI * 2);
    ctx.strokeStyle = ringColors[0] + '40';
    ctx.lineWidth = 12;
    ctx.filter = 'blur(6px)';
    ctx.stroke();
    ctx.filter = 'none';
  } else {
    // 基础动物白色细边框
    ctx.beginPath();
    ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // ── 主标题：动物代号 ──
  let y = circleY + circleR + 120;
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 108px "Nunito", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '0.06em';
  ctx.fillText(animal.code, W / 2, y);

  // ── 副标题：人格名 · 中文名 ENGLISH NAME ──
  y += 90;
  const displayName = animal.name.replace(/[「「].+[」」]/g, '');
  ctx.fillStyle = '#cfe0bf';
  ctx.font = '700 38px "Space Mono", monospace';
  ctx.fillText(`${animal.personalityName} · ${displayName} ${animal.nameEn.toUpperCase()}`, W / 2, y);

  // ── Tags ──
  y += 72;
  const tags = animal.tags || [];
  ctx.font = '500 34px "Noto Sans SC", sans-serif';
  const tagPadH = 36;
  const tagGap = 22;
  const tagH = 76;

  const tagWidths = tags.map(t => ctx.measureText(`#${t}`).width + tagPadH * 2);
  const totalTagW = tagWidths.reduce((s, w) => s + w, 0) + tagGap * (tags.length - 1);
  let tagStartX = (W - totalTagW) / 2;

  tags.forEach((tag, i) => {
    const tw = tagWidths[i];
    roundRect(ctx, tagStartX, y, tw, tagH, tagH / 2);
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill();

    ctx.fillStyle = '#eaf2e3';
    ctx.textAlign = 'center';
    ctx.fillText(`#${tag}`, tagStartX + tw / 2, y + tagH / 2 + 12);
    tagStartX += tw + tagGap;
  });

  // ── 金句（斜体，按宽度自动换行） ──
  y += tagH + 80;
  ctx.fillStyle = '#f0f4e9';
  ctx.font = 'italic 42px "Noto Sans SC", sans-serif';
  ctx.textAlign = 'center';
  const quoteText = `"${animal.quote}"`;
  const maxQuoteW = W - px * 2;
  if (ctx.measureText(quoteText).width > maxQuoteW) {
    // 在标点处找最佳断点
    const breakChars = ['，', '。', '；', '：', '！', '？', '、'];
    const mid = Math.floor(quoteText.length / 2);
    let breakIdx = -1;
    for (let offset = 0; offset < mid; offset++) {
      if (breakChars.includes(quoteText[mid + offset])) { breakIdx = mid + offset; break; }
      if (breakChars.includes(quoteText[mid - offset])) { breakIdx = mid - offset; break; }
    }
    if (breakIdx > 0) {
      ctx.fillText(quoteText.slice(0, breakIdx + 1), W / 2, y);
      y += 60;
      ctx.fillText(quoteText.slice(breakIdx + 1), W / 2, y);
    } else {
      ctx.fillText(quoteText, W / 2, y);
    }
  } else {
    ctx.fillText(quoteText, W / 2, y);
  }

  // ── 分割线 ──
  y += 58;
  ctx.beginPath();
  ctx.moveTo(px, y);
  ctx.lineTo(W - px, y);
  ctx.strokeStyle = 'rgba(255,255,255,0.16)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // ── 底部：二维码 + 文字（垂直居中于分割线到画布底部之间） ──
  const divLineY = y;
  const qrSize = 190;
  const qrBlockH = qrSize + 24;
  const remainingSpace = H - divLineY;
  y = divLineY + (remainingSpace - qrBlockH) / 2;

  const qrDataUrl = await QRCode.toDataURL(homeUrl, {
    width: qrSize * 2,
    margin: 1,
    color: { dark: '#283d30', light: '#ffffff' },
  });
  const qrImg = await loadImage(qrDataUrl);

  const qrX = px;
  roundRect(ctx, qrX, y, qrSize + 24, qrSize + 24, 32);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.drawImage(qrImg, qrX + 12, y + 12, qrSize, qrSize);

  // 右侧文字
  const textX = qrX + qrSize + 24 + 42;
  const textCenterY = y + (qrSize + 24) / 2;
  ctx.textAlign = 'left';

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px "Noto Sans SC", sans-serif';
  ctx.fillText('扫码测你的横断山兽', textX, textCenterY - 38);

  ctx.fillStyle = '#b9c39c';
  ctx.font = '400 34px "Noto Sans SC", sans-serif';
  ctx.fillText('13 种濒危动物人格 · 中英双语', textX, textCenterY + 14);

  // 第三行：与XX匹配度 82% · 仅 12.4% 测出
  ctx.font = '400 34px "Noto Sans SC", sans-serif';
  ctx.fillStyle = '#b9c39c';
  const line3a = `与${displayName}匹配度 `;
  ctx.fillText(line3a, textX, textCenterY + 66);
  const line3aW = ctx.measureText(line3a).width;
  ctx.fillStyle = '#e6f0d6';
  ctx.font = 'bold 34px "Nunito", sans-serif';
  ctx.fillText(`${matchRate}%`, textX + line3aW, textCenterY + 66);
  if (stats?.percentage) {
    const numW = ctx.measureText(`${matchRate}%`).width;
    ctx.fillStyle = '#b9c39c';
    ctx.font = '400 34px "Noto Sans SC", sans-serif';
    ctx.fillText(` · 仅 `, textX + line3aW + numW, textCenterY + 66);
    const midW = ctx.measureText(` · 仅 `).width;
    ctx.fillStyle = '#e6f0d6';
    ctx.font = 'bold 34px "Nunito", sans-serif';
    ctx.fillText(`${stats.percentage}%`, textX + line3aW + numW + midW, textCenterY + 66);
    const pctW = ctx.measureText(`${stats.percentage}%`).width;
    ctx.fillStyle = '#b9c39c';
    ctx.font = '400 34px "Noto Sans SC", sans-serif';
    ctx.fillText(` 测出`, textX + line3aW + numW + midW + pctW, textCenterY + 66);
  }

  // 导出
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(URL.createObjectURL(blob));
    }, 'image/png');
  });
}
